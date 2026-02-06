using RentARide.Domain.Enums;
using RentARide.Domain.Interfaces;
using RentARide.Domain.Common;

namespace RentARide.Domain.Entities;

public class Vehicle : BaseEntity, IAuditable, ISoftDeletable
{
    public string Model { get; set; } = null!;
    
    public int Year { get; set; }
    
    public string LicensePlate { get; set; } = null!;
    
    public decimal DailyPrice { get; set; }
    
    public VehicleStatus Status { get; set; }

    public Guid VehicleTypeId { get; set; }
    public VehicleType VehicleType { get; set; } = null!;

    public DateTime? LastModifiedAt { get; set; }
    
    public bool IsDeleted { get; set; }
}