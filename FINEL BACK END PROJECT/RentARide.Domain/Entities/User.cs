using RentARide.Domain.Enums;
using RentARide.Domain.Interfaces;
using RentARide.Domain.Common;


namespace RentARide.Domain.Entities;

public class User : BaseEntity, IAuditable, ISoftDeletable
{
    
    public string FirstName { get; set; }=null!;
    public string LastName { get; set; }=null!;
    public string Email { get; set; }=null!;
    public string PasswordHash { get; set; }=null!;
    public UserRole Role { get; set; }
    public DateTime? LastModifiedAt { get; set; }
    public bool IsDeleted { get; set; }
}


