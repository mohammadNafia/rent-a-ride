using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RentARide.API.Wrappers;
using RentARide.Application.Common;
using RentARide.Application.DTOs;
using RentARide.Application.DTOs.Vehicles;
using RentARide.Application.Services;
using RentARide.Domain.Enums;

namespace RentARide.API.Controllers;

[ApiController]
[Route("api/vehicles")]
public class VehicleController : ControllerBase
{
    private readonly VehicleService _service;

    public VehicleController(VehicleService service)
    {
        _service = service;
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> Browse(
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] Guid? typeId = null,
        [FromQuery] decimal? minPrice = null,
        [FromQuery] decimal? maxPrice = null,
        [FromQuery] VehicleStatus? status = null,
        [FromQuery] string? searchTerm = null)
    {
        var result = await _service.BrowseAsync(pageNumber, pageSize, typeId, minPrice, maxPrice, status, searchTerm);
        return Ok(ApiResponse<PaginatedList<VehicleDto>>.Success(result.Data!));
    }

    [HttpGet("{id}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetById(Guid id)
    {
        var result = await _service.GetByIdAsync(id);
        if (!result.IsSuccess)
            return NotFound(ApiResponse<string>.Fail(result.Error!));

        return Ok(ApiResponse<VehicleDto>.Success(result.Data!));
    }

    [HttpPost]
    [Authorize(Policy = "AdminOnly")]
    public async Task<IActionResult> Create(CreateVehicleDto dto)
    {
        var result = await _service.CreateAsync(dto);
        if (!result.IsSuccess)
            return BadRequest(ApiResponse<string>.Fail(result.Error!));

        return Ok(ApiResponse<Guid>.Success(result.Data, "Vehicle created successfully"));
    }

    [HttpPut("{id}/price")]
    [Authorize(Policy = "AdminOnly")]
    public async Task<IActionResult> UpdatePrice(Guid id, UpdateVehiclePriceDto dto)
    {
        var result = await _service.UpdatePriceAsync(id, dto.DailyPrice);
        if (!result.IsSuccess)
            return NotFound(ApiResponse<string>.Fail(result.Error!));

        return Ok(ApiResponse<bool>.Success(true, "Price updated successfully"));
    }

    [HttpPut("{id}/status")]
    [Authorize(Policy = "AdminOnly")]
    public async Task<IActionResult> UpdateStatus(Guid id, UpdateVehicleStatusDto dto)
    {
        var result = await _service.UpdateStatusAsync(id, dto.Status);
        if (!result.IsSuccess)
            return NotFound(ApiResponse<string>.Fail(result.Error!));

        return Ok(ApiResponse<bool>.Success(true, "Vehicle status updated successfully"));
    }

    [HttpDelete("{id}")]
    [Authorize(Policy = "AdminOnly")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var result = await _service.DeleteAsync(id);
        if (!result.IsSuccess)
            return NotFound(ApiResponse<string>.Fail(result.Error!));

        return Ok(ApiResponse<bool>.Success(true, "Vehicle soft-deleted successfully"));
    }
}
