using RentARide.Domain.Common;
using RentARide.Domain.Interfaces;


namespace RentARide.Domain.Entities;
public class Amenity : BaseEntity, ISoftDeletable
{
    
    public string Name { get; set; } = null!;
    
    public decimal Price { get; set; }

    public bool IsDeleted { get; set; }
}