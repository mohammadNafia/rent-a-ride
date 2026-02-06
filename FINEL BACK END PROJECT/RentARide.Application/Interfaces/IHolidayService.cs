public interface IHolidayService
{
    Task<bool> IsPublicHolidayAsync(DateTime date);
}
