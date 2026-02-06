using Microsoft.AspNetCore.Mvc;
using RentARide.Application.DTOs;
using RentARide.Application.Services;

namespace RentARide.API.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;

    public AuthController(AuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto dto)
    {
        var result = await _authService.RegisterAsync(dto);
        if (!result.IsSuccess)
        {
            return BadRequest(RentARide.API.Wrappers.ApiResponse<string>.Fail(result.Error!));
        }
        return Ok(RentARide.API.Wrappers.ApiResponse<string>.Success(result.Data!, "Registration successful"));
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var result = await _authService.LoginAsync(dto.Email, dto.Password);
        if (!result.IsSuccess)
        {
            return Unauthorized(RentARide.API.Wrappers.ApiResponse<string>.Fail(result.Error!));
        }
        return Ok(RentARide.API.Wrappers.ApiResponse<object>.Success(new { token = result.Data }, "Login successful"));
    }
}
