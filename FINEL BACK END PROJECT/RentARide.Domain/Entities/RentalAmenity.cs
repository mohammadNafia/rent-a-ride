using RentARide.Domain.Common;

namespace RentARide.Domain.Entities;

public class RentalAmenity : BaseEntity
{
    public Guid RentalId { get; set; }
    
    public Guid AmenityId { get; set; }
}
