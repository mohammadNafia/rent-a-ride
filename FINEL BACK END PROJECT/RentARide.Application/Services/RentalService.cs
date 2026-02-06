using RentARide.Application.Common;
using RentARide.Application.DTOs;
using RentARide.Application.Interfaces;
using RentARide.Domain.Entities;
using RentARide.Domain.Enums;
using Mapster;
using System.Linq.Expressions;

namespace RentARide.Application.Services;

public class RentalService
{
    private readonly IGenericRepository<Rental> _rentalRepo;
    private readonly IGenericRepository<Vehicle> _vehicleRepo;
    private readonly IGenericRepository<Amenity> _amenityRepo;
    private readonly IHolidayService _holidayService;
    private readonly IUnitOfWork _unitOfWork;

    public RentalService(
        IGenericRepository<Rental> rentalRepo,
        IGenericRepository<Vehicle> vehicleRepo,
        IGenericRepository<Amenity> amenityRepo,
        IHolidayService holidayService,
        IUnitOfWork unitOfWork)
    {
        _rentalRepo = rentalRepo;
        _vehicleRepo = vehicleRepo;
        _amenityRepo = amenityRepo;
        _holidayService = holidayService;
        _unitOfWork = unitOfWork;
    }

    public async Task<ServiceResult<Guid>> BookRentalAsync(Guid userId, CreateRentalDto dto)
    {
        var vehicle = await _vehicleRepo.GetByIdAsync(dto.VehicleId);
        if (vehicle == null)
            return ServiceResult<Guid>.Failure("Vehicle not found");

        if (vehicle.Status != VehicleStatus.Available)
            return ServiceResult<Guid>.Failure("Vehicle is not available");

        bool isBooked = await _rentalRepo.ExistsAsync(r => 
            r.VehicleId == dto.VehicleId && 
            r.Status == RentalStatus.Active &&
            dto.StartDate <= r.EndDate && dto.EndDate >= r.StartDate);

        if (isBooked)
            return ServiceResult<Guid>.Failure("Vehicle is already rented for this period");

        var days = (dto.EndDate - dto.StartDate).Days;
        if (days <= 0) return ServiceResult<Guid>.Failure("Invalid duration");

        decimal totalPrice = days * vehicle.DailyPrice;

        var amenities = new List<Amenity>();
        if (dto.AmenityIds != null && dto.AmenityIds.Any())
        {
             foreach(var aid in dto.AmenityIds)
             {
                 var am = await _amenityRepo.GetByIdAsync(aid);
                 if(am != null)
                 {
                     amenities.Add(am);
                     totalPrice += am.Price; 
                 }
             }
        }

        if (await _holidayService.IsPublicHolidayAsync(dto.StartDate))
        {
            totalPrice += totalPrice * 0.10m;
        }

        var rental = new Rental
        {
            UserId = userId,
            VehicleId = dto.VehicleId,
            StartDate = dto.StartDate,
            EndDate = dto.EndDate,
            TotalPrice = totalPrice,
            Status = RentalStatus.Active
        };
        
        await _rentalRepo.AddAsync(rental);
        await _unitOfWork.SaveChangesAsync();
        
        return ServiceResult<Guid>.Success(rental.Id);
    }

    public async Task<ServiceResult<PaginatedList<RentalDto>>> GetMyHistoryAsync(Guid userId, int pageNumber, int pageSize)
    {
        var allRentals = await _rentalRepo.GetAllAsync();
        var userRentals = allRentals.Where(r => r.UserId == userId).OrderByDescending(r => r.CreatedAt).ToList();

        var count = userRentals.Count;
        var items = userRentals
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToList();
            
        var dtos = items.Adapt<List<RentalDto>>();
        
        return ServiceResult<PaginatedList<RentalDto>>.Success(new PaginatedList<RentalDto>(dtos, count, pageNumber, pageSize));
    }
}
