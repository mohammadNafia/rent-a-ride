using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Diagnostics;
using RentARide.Domain.Entities;
using RentARide.Domain.Interfaces;
using System.Text.Json;
using System.Linq;

namespace RentARide.Infrastructure.Interceptors;

public class AuditLogInterceptor : SaveChangesInterceptor
{
    public override InterceptionResult<int> SavingChanges(
        DbContextEventData eventData,
        InterceptionResult<int> result)
    {
        if (eventData.Context is null)
            return result;

        var auditLogs = new List<AuditLog>();

        foreach (var entry in eventData.Context.ChangeTracker.Entries())
        {
            if (entry.Entity is AuditLog)
                continue;

            if (entry.State == EntityState.Added ||
                entry.State == EntityState.Modified ||
                entry.State == EntityState.Deleted)
            {
                if (entry.Entity is not IAuditable && entry.State == EntityState.Modified)
                    continue;

                var auditLog = new AuditLog
                {
                    EntityName = entry.Entity.GetType().Name,
                    EntityId = GetEntityId(entry),
                    ActionType = entry.State.ToString(),
                    OldValues = GetOldValues(entry),
                    NewValues = GetNewValues(entry)
                };

                auditLogs.Add(auditLog);
            }
        }

        if (auditLogs.Any())
        {
            eventData.Context.Set<AuditLog>().AddRange(auditLogs);
        }

        return result;
    }

    private static Guid GetEntityId(EntityEntry entry)
    {
        var idProperty = entry.Properties
            .FirstOrDefault(p => p.Metadata.Name == "Id");

        return idProperty is not null
            ? (Guid)idProperty.CurrentValue!
            : Guid.Empty;
    }

    private static string GetOldValues(EntityEntry entry)
    {
        var oldValues = new Dictionary<string, object?>();

        foreach (var prop in entry.Properties)
        {
            if (prop.IsModified)
            {
                oldValues[prop.Metadata.Name] = prop.OriginalValue;
            }
        }

        return JsonSerializer.Serialize(oldValues);
    }

    private static string GetNewValues(EntityEntry entry)
    {
        var newValues = new Dictionary<string, object?>();

        foreach (var prop in entry.Properties)
        {
            if (prop.IsModified || entry.State == EntityState.Added)
            {
                newValues[prop.Metadata.Name] = prop.CurrentValue;
            }
        }

        return JsonSerializer.Serialize(newValues);
    }
}
