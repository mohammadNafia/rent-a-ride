using System.Net.Http.Json;
using RentARide.Application.DTOs;
using RentARide.Application.Interfaces;

namespace RentARide.Infrastructure.External;

public class HolidayService : IHolidayService
{
    private readonly HttpClient _httpClient;

    public HolidayService(HttpClient httpClient)
    {
        _httpClient = httpClient;
        if (_httpClient.BaseAddress == null)
        {
             _httpClient.BaseAddress = new Uri("https://date.nager.at/");
        }
    }

    public async Task<bool> IsPublicHolidayAsync(DateTime date)
    {
        var year = date.Year;

        var holidays = await _httpClient
            .GetFromJsonAsync<List<PublicHolidayDto>>(
                $"api/v3/PublicHolidays/{year}/DE");

        if (holidays is null)
            return false;

        return holidays.Any(h => h.Date.Date == date.Date);
    }
}
