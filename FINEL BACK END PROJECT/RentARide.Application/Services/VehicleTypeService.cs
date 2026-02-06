using Microsoft.Extensions.Caching.Memory;
using RentARide.Application.Common;
using RentARide.Application.DTOs;
using RentARide.Application.Interfaces;
using RentARide.Domain.Entities;
using Mapster;

namespace RentARide.Application.Services;

public class VehicleTypeService
{
    private readonly IGenericRepository<VehicleType> _repository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMemoryCache _cache;
    private const string CacheKey = "vehicle_types";

    public VehicleTypeService(
        IGenericRepository<VehicleType> repository,
        IUnitOfWork unitOfWork,
        IMemoryCache cache)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
        _cache = cache;
    }

    public async Task<ServiceResult<List<VehicleTypeDto>>> GetAllAsync()
    {
        if (!_cache.TryGetValue(CacheKey, out List<VehicleTypeDto>? types))
        {
            var entities = await _repository.GetAllAsync();
            types = entities.Adapt<List<VehicleTypeDto>>();
            
            var cacheOptions = new MemoryCacheEntryOptions()
                .SetSlidingExpiration(TimeSpan.FromHours(1));

            _cache.Set(CacheKey, types, cacheOptions);
        }

        return ServiceResult<List<VehicleTypeDto>>.Success(types!);
    }

    public async Task<ServiceResult<Guid>> AddAsync(VehicleTypeDto dto)
    {
        var entity = dto.Adapt<VehicleType>();
        await _repository.AddAsync(entity);
        await _unitOfWork.SaveChangesAsync();

        _cache.Remove(CacheKey);

        return ServiceResult<Guid>.Success(entity.Id);
    }

    public async Task<ServiceResult<bool>> DeleteAsync(Guid id)
    {
        var entity = await _repository.GetByIdAsync(id);
        if (entity == null)
            return ServiceResult<bool>.Failure("Type not found");

        _repository.Delete(entity);
        await _unitOfWork.SaveChangesAsync();

        _cache.Remove(CacheKey);

        return ServiceResult<bool>.Success(true);
    }
}
