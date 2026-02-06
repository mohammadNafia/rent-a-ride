using BCrypt.Net;
using RentARide.Application.Common;
using RentARide.Application.DTOs;
using RentARide.Application.Interfaces;
using RentARide.Domain.Entities;
using RentARide.Domain.Enums;
using Mapster;

namespace RentARide.Application.Services;

public class AuthService
{
    private readonly IGenericRepository<User> _userRepo;
    private readonly IJwtTokenGenerator _tokenGenerator;
    private readonly IUnitOfWork _unitOfWork;

    public AuthService(
        IGenericRepository<User> userRepo,
        IJwtTokenGenerator tokenGenerator,
        IUnitOfWork unitOfWork)
    {
        _userRepo = userRepo;
        _tokenGenerator = tokenGenerator;
        _unitOfWork = unitOfWork;
    }

    public async Task<ServiceResult<string>> RegisterAsync(RegisterDto dto)
    {
        var existingUser = await _userRepo.FindAsync(u => u.Email == dto.Email);
        if (existingUser != null)
            return ServiceResult<string>.Failure("Email already in use");

        var user = new User
        {
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            Email = dto.Email,
            Role = dto.Role ?? UserRole.Customer,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password)
        };

        await _userRepo.AddAsync(user);
        await _unitOfWork.SaveChangesAsync();

        return ServiceResult<string>.Success("User registered successfully");
    }

    public async Task<ServiceResult<string>> LoginAsync(string email, string password)
    {
        var user = await _userRepo.FindAsync(u => u.Email == email);

        if (user is null)
            return ServiceResult<string>.Failure("Invalid credentials");

        if (!BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            return ServiceResult<string>.Failure("Invalid credentials");

        var token = _tokenGenerator.GenerateToken(user);

        return ServiceResult<string>.Success(token);
    }
}
