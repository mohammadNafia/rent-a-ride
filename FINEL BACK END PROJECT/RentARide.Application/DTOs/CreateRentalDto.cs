namespace RentARide.Application.DTOs;

public class CreateRentalDto
{
    public Guid VehicleId { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public List<Guid> AmenityIds { get; set; } = new();
}
