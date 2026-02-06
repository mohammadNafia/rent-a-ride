using RentARide.Domain.Enums;

namespace RentARide.Application.DTOs
{
    public class RegisterDto    
    {
       
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
    public UserRole? Role { get; set; }

    }
}
