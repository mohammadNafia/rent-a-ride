using RentARide.Domain.Common;


namespace RentARide.Domain.Entities;

public class AuditLog : BaseEntity
{
    public string EntityName { get; set; } = null!;
    
    public Guid EntityId { get; set; }

    public string ActionType { get; set; } = null!; 
    // Added / Modified / Deleted

    public string OldValues { get; set; } = null!;
    
    public string NewValues { get; set; } = null!;
}