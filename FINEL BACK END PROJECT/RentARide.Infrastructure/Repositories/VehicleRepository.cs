using RentARide.Application.Interfaces;
using RentARide.Domain.Entities;
using RentARide.Infrastructure.Data;

namespace RentARide.Infrastructure.Repositories;

public class VehicleRepository : GenericRepository<Vehicle>, IVehicleRepository
{
    public VehicleRepository(AppDbContext context) : base(context)
    {
    }

    public IQueryable<Vehicle> Query()
        => _context.Vehicles;
}
