using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RentARide.Domain.Entities;

namespace RentARide.Infrastructure.Configurations;

public class VehicleMaintenanceConfiguration : IEntityTypeConfiguration<VehicleMaintenance>
{
    public void Configure(EntityTypeBuilder<VehicleMaintenance> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Description)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(x => x.LastMaintenanceDate)
            .IsRequired();

        builder.Property(x => x.NextMaintenanceDue)
            .IsRequired();
        builder.HasIndex(x => x.VehicleId)
            .IsUnique();
    }
}
            