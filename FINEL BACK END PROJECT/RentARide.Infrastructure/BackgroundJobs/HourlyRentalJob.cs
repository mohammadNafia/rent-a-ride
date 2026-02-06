using Microsoft.Extensions.Logging;
using RentARide.Application.Interfaces;
using RentARide.Domain.Entities;
using RentARide.Domain.Enums;

namespace RentARide.Infrastructure.BackgroundJobs;

public class HourlyRentalJob
{
    private readonly IGenericRepository<Rental> _rentalRepo;
    private readonly ILogger<HourlyRentalJob> _logger;

    public HourlyRentalJob(IGenericRepository<Rental> rentalRepo, ILogger<HourlyRentalJob> logger)
    {
        _rentalRepo = rentalRepo;
        _logger = logger;
    }

    public async Task CheckOverdueRentalsAsync()
    {
       
        var allRentals = await _rentalRepo.GetAllAsync();
        var overdue = allRentals.Where(r => 
            r.Status == RentalStatus.Active && 
            r.EndDate < DateTime.UtcNow)
            .ToList();

        foreach (var rental in overdue)
        {
            _logger.LogWarning("Rental {Id} is overdue. User {UserId} has not returned the car.", rental.Id, rental.UserId);
        }
    }
}
