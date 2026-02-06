using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RentARide.API.Wrappers;
using RentARide.Application.DTOs;
using RentARide.Application.Services;
using System.Security.Claims;
using RentARide.Application.Common;

namespace RentARide.API.Controllers;

[ApiController]
[Route("api/rentals")]
[Authorize]
public class RentalsController : ControllerBase
{
    private readonly RentalService _service;

    public RentalsController(RentalService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<IActionResult> Book(CreateRentalDto dto)
    {
        var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(userIdString, out var userId)) 
        {
             return Unauthorized(ApiResponse<string>.Fail("Invalid User Id"));
        }

        var result = await _service.BookRentalAsync(userId, dto);

        if (!result.IsSuccess)
            return BadRequest(ApiResponse<string>.Fail(result.Error!));

        return Ok(ApiResponse<Guid>.Success(result.Data, "Rental booked successfully"));
    }

    [HttpGet("my-history")]
    public async Task<IActionResult> GetMyHistory([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
    {
         var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(userIdString, out var userId)) 
             return Unauthorized(ApiResponse<string>.Fail("Invalid User Id"));

        var result = await _service.GetMyHistoryAsync(userId, pageNumber, pageSize);
        
        return Ok(ApiResponse<PaginatedList<RentalDto>>.Success(result.Data!));
    }
}
