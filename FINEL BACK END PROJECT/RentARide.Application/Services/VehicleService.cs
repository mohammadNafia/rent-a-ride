using RentARide.Application.Common;
using RentARide.Application.DTOs;
using RentARide.Application.DTOs.Vehicles;
using RentARide.Application.Interfaces;
using RentARide.Domain.Entities;
using RentARide.Domain.Enums;
using Mapster;
using Microsoft.EntityFrameworkCore;

namespace RentARide.Application.Services;

public class VehicleService
{
    private readonly IVehicleRepository _vehicleRepo;
    private readonly IGenericRepository<VehicleType> _typeRepo;
    private readonly IUnitOfWork _unitOfWork;

    public VehicleService(
        IVehicleRepository vehicleRepo,
        IGenericRepository<VehicleType> typeRepo,
        IUnitOfWork unitOfWork)
    {
        _vehicleRepo = vehicleRepo;
        _typeRepo = typeRepo;
        _unitOfWork = unitOfWork;
    }

    public async Task<ServiceResult<Guid>> CreateAsync(CreateVehicleDto dto)
    {
        var typeExists = await _typeRepo.GetByIdAsync(dto.VehicleTypeId);
        if (typeExists == null)
            return ServiceResult<Guid>.Failure("Vehicle Type not found");

        var vehicle = dto.Adapt<Vehicle>();
        vehicle.Status = VehicleStatus.Available;

        await _vehicleRepo.AddAsync(vehicle);
        await _unitOfWork.SaveChangesAsync();

        return ServiceResult<Guid>.Success(vehicle.Id);
    }

    public async Task<ServiceResult<bool>> UpdatePriceAsync(Guid id, decimal newPrice)
    {
        var vehicle = await _vehicleRepo.GetByIdAsync(id);
        if (vehicle == null)
            return ServiceResult<bool>.Failure("Vehicle not found");

        vehicle.DailyPrice = newPrice;
        _vehicleRepo.Update(vehicle);
        await _unitOfWork.SaveChangesAsync();

        return ServiceResult<bool>.Success(true);
    }

    public async Task<ServiceResult<bool>> DeleteAsync(Guid id)
    {
        var vehicle = await _vehicleRepo.GetByIdAsync(id);
        if (vehicle == null)
            return ServiceResult<bool>.Failure("Vehicle not found");

        _vehicleRepo.Delete(vehicle);
        await _unitOfWork.SaveChangesAsync();

        return ServiceResult<bool>.Success(true);
    }

    public async Task<ServiceResult<bool>> UpdateStatusAsync(Guid id, VehicleStatus status)
    {
        var vehicle = await _vehicleRepo.GetByIdAsync(id);
        if (vehicle == null)
            return ServiceResult<bool>.Failure("Vehicle not found");

        vehicle.Status = status;
        _vehicleRepo.Update(vehicle);
        await _unitOfWork.SaveChangesAsync();

        return ServiceResult<bool>.Success(true);
    }

    public async Task<ServiceResult<VehicleDto>> GetByIdAsync(Guid id)
    {
        var vehicle = await _vehicleRepo.Query()
            .Include(v => v.VehicleType)
            .FirstOrDefaultAsync(v => v.Id == id);

        if (vehicle == null)
            return ServiceResult<VehicleDto>.Failure("Vehicle not found");

        var dto = vehicle.Adapt<VehicleDto>();
        return ServiceResult<VehicleDto>.Success(dto);
    }

    public async Task<ServiceResult<PaginatedList<VehicleDto>>> BrowseAsync(
        int pageNumber, 
        int pageSize,
        Guid? typeId = null,
        decimal? minPrice = null,
        decimal? maxPrice = null,
        VehicleStatus? status = null,
        string? searchTerm = null)
    {
        var query = _vehicleRepo.Query()
            .Include(v => v.VehicleType)
            .AsNoTracking();

        if (typeId.HasValue)
            query = query.Where(v => v.VehicleTypeId == typeId.Value);

        if (minPrice.HasValue)
            query = query.Where(v => v.DailyPrice >= minPrice.Value);

        if (maxPrice.HasValue)
            query = query.Where(v => v.DailyPrice <= maxPrice.Value);

        if (status.HasValue)
            query = query.Where(v => v.Status == status.Value);

        if (!string.IsNullOrWhiteSpace(searchTerm))
            query = query.Where(v => v.Model.Contains(searchTerm) || v.LicensePlate.Contains(searchTerm));

        query = query.OrderByDescending(v => v.CreatedAt);

        var count = await query.CountAsync();
        var items = await query
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ProjectToType<VehicleDto>()
            .ToListAsync();

        return ServiceResult<PaginatedList<VehicleDto>>.Success(
            new PaginatedList<VehicleDto>(items, count, pageNumber, pageSize));
    }
}
