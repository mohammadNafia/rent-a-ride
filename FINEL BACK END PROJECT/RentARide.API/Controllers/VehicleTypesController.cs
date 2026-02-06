using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RentARide.API.Wrappers;
using RentARide.Application.DTOs;
using RentARide.Application.Services;

namespace RentARide.API.Controllers;

[ApiController]
[Route("api/vehicles/types")]
public class VehicleTypesController : ControllerBase
{
    private readonly VehicleTypeService _service;

    public VehicleTypesController(VehicleTypeService service)
    {
        _service = service;
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetAll()
    {
        var result = await _service.GetAllAsync();
        return Ok(ApiResponse<List<VehicleTypeDto>>.Success(result.Data!));
    }

    [HttpPost]
    [Authorize(Policy = "AdminOnly")]
    public async Task<IActionResult> Add(VehicleTypeDto dto)
    {
        var result = await _service.AddAsync(dto);
        if(!result.IsSuccess)
            return BadRequest(ApiResponse<string>.Fail(result.Error!));
            
        return Ok(ApiResponse<Guid>.Success(result.Data, "Vehicle Type added"));
    }

    [HttpDelete("{id}")]
    [Authorize(Policy = "AdminOnly")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var result = await _service.DeleteAsync(id);
        if(!result.IsSuccess)
             return BadRequest(ApiResponse<string>.Fail(result.Error!));
             
        return Ok(ApiResponse<bool>.Success(true, "Vehicle Type deleted"));
    }
}
