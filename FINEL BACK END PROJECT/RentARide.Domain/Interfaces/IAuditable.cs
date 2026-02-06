namespace RentARide.Domain.Interfaces;

public interface IAuditable 
{
    DateTime? LastModifiedAt  { get; set; }
}