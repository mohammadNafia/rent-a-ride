using RentARide.Domain.Enums;

namespace RentARide.Application.DTOs.Vehicles;

public class CreateVehicleDto
{
    public string Model { get; set; } = null!;
    public int Year { get; set; }
    public string LicensePlate { get; set; } = null!;
    public decimal DailyPrice { get; set; }
    public Guid VehicleTypeId { get; set; }
}