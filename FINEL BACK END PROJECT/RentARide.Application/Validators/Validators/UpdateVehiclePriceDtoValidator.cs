using FluentValidation;
using RentARide.Application.DTOs;

namespace RentARide.Application.Validators;

public class UpdateVehiclePriceDtoValidator : AbstractValidator<UpdateVehiclePriceDto>
{
    public UpdateVehiclePriceDtoValidator()
    {
        RuleFor(x => x.DailyPrice)
            .GreaterThan(0);
    }
}
