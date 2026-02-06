using RentARide.Domain.Entities;

namespace RentARide.Application.Interfaces;

public interface IVehicleRepository : IGenericRepository<Vehicle>
{
    IQueryable<Vehicle> Query();
}
