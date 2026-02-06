using RentARide.Domain.Entities;

public interface IJwtTokenGenerator
{
    string GenerateToken(User user);
}
