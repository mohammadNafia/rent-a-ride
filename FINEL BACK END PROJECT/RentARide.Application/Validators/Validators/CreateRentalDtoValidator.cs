using FluentValidation;
using RentARide.Application.DTOs;

namespace RentARide.Application.Validators;

public class CreateRentalDtoValidator : AbstractValidator<CreateRentalDto>
{
    public CreateRentalDtoValidator()
    {
        RuleFor(x => x.VehicleId)
            .NotEmpty();

        RuleFor(x => x.StartDate)
            .LessThan(x => x.EndDate);

        RuleFor(x => x.StartDate)
            .GreaterThanOrEqualTo(DateTime.Today);
    }
}
