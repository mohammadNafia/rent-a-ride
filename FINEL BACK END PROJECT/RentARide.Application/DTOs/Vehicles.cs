namespace RentARide.Application.DTOs.Vehicles;
using RentARide.Domain.Enums;
public class VehicleDto
{
    public Guid Id { get; set; }
    public string Model { get; set; } = null!;
    public int Year { get; set; }
    public string LicensePlate { get; set; } = null!;
    public decimal DailyPrice { get; set; }
    public VehicleStatus Status { get; set; }
    public string VehicleTypeName { get; set; } = null!;
    public Guid VehicleTypeId { get; set; }
    public DateTime CreatedAt { get; set; }
}
