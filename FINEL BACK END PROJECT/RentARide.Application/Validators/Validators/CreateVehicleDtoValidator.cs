using FluentValidation;
using RentARide.Application.DTOs.Vehicles;

namespace RentARide.Application.Validators;

public class CreateVehicleDtoValidator : AbstractValidator<CreateVehicleDto>
{
    public CreateVehicleDtoValidator()
    {
        RuleFor(x => x.Model)
            .NotEmpty()
            .MaximumLength(100);

        RuleFor(user => user.Year)
            .GreaterThan(1900)
            .LessThanOrEqualTo(DateTime.Now.Year);

        RuleFor(x => x.DailyPrice)
            .GreaterThan(0);

        RuleFor(x => x.VehicleTypeId)
            .NotEmpty();
    }
}
