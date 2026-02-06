using RentARide.Domain.Enums;

namespace RentARide.Application.DTOs.Vehicles;

public class UpdateVehicleStatusDto
{
    public VehicleStatus Status { get; set; }
}
