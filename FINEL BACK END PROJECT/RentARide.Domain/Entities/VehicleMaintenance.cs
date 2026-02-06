using RentARide.Domain.Common;
using RentARide.Domain.Interfaces;

namespace RentARide.Domain.Entities;

public class VehicleMaintenance : BaseEntity, IAuditable
{
    public Guid VehicleId { get; set; }

    public string Description { get; set; } = null!;

    public DateTime LastMaintenanceDate { get; set; }

    public DateTime NextMaintenanceDue { get; set; }

    public DateTime? LastModifiedAt { get; set; }
}