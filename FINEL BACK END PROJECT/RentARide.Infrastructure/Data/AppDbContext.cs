using Microsoft.EntityFrameworkCore;
using RentARide.Domain.Entities;
using RentARide.Domain.Interfaces;

namespace RentARide.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
        AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
    }
    public DbSet<VehicleMaintenance> VehicleMaintenances => Set<VehicleMaintenance>();

    public DbSet<User> Users => Set<User>();
    public DbSet<Vehicle> Vehicles => Set<Vehicle>();
    public DbSet<VehicleType> VehicleTypes => Set<VehicleType>();
    public DbSet<Rental> Rentals => Set<Rental>();
    public DbSet<Amenity> Amenities => Set<Amenity>();
    public DbSet<RentalAmenity> RentalAmenities => Set<RentalAmenity>();
    public DbSet<AuditLog> AuditLogs => Set<AuditLog>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);

        modelBuilder.Entity<User>().HasQueryFilter(u => !u.IsDeleted);
        modelBuilder.Entity<Vehicle>().HasQueryFilter(v => !v.IsDeleted);
        modelBuilder.Entity<VehicleType>().HasQueryFilter(vt => !vt.IsDeleted);
        modelBuilder.Entity<Amenity>().HasQueryFilter(a => !a.IsDeleted);
    }
}
