using Mapster;
using RentARide.Domain.Entities;
using RentARide.Application.DTOs;

namespace RentARide.Application.Mapping;

public class VehicleTypeMapping : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<VehicleType, VehicleTypeDto>();
    }
}