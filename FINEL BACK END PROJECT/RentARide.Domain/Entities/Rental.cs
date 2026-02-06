
using RentARide.Domain.Common;
using RentARide.Domain.Enums;
using RentARide.Domain.Interfaces;

namespace RentARide.Domain.Entities;


public class Rental : BaseEntity, IAuditable
{
    public Guid UserId { get; set; }
    
    public Guid VehicleId { get; set; }

    public DateTime StartDate { get; set; }
    
    public DateTime EndDate { get; set; }

    public decimal TotalPrice { get; set; }

    public RentalStatus Status { get; set; }

    public DateTime? LastModifiedAt { get; set; }
}