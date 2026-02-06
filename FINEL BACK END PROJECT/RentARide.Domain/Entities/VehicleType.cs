using RentARide.Domain.Common;
using RentARide.Domain.Interfaces;


namespace RentARide.Domain.Entities;

public class VehicleType : BaseEntity, ISoftDeletable
{
    public string Name { get; set; } = null!;
    
    public string? Description { get; set; }

    public bool IsDeleted { get; set; }
}
