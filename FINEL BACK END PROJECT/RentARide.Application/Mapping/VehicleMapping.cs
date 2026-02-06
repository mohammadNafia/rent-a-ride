using Mapster;
using RentARide.Application.DTOs.Vehicles;
using RentARide.Domain.Entities;
using RentARide.Domain.Enums;

namespace RentARide.Application.Mapping;

public class VehicleMapping : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<Vehicle, VehicleDto>()
            .Map(dest => dest.VehicleTypeName, src => src.VehicleType.Name)
            .Map(dest => dest.VehicleTypeId, src => src.VehicleTypeId);

        config.NewConfig<CreateVehicleDto, Vehicle>()
            .Map(dest => dest.Status, _ => VehicleStatus.Available);
    }
}
