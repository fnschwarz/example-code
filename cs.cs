using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

// Attribute declaration
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class InfoAttribute : Attribute
{
    public string Description { get; }
    public InfoAttribute(string description) => Description = description;
}

// Enum with explicit underlying type and flags
[Flags]
public enum Permissions : byte
{
    None = 0,
    Read = 1 << 0,    // 1
    Write = 1 << 1,   // 2
    Execute = 1 << 2, // 4
    All = Read | Write | Execute
}

// Generic interface with covariance and contravariance
public interface IRepository<in TKey, out TValue>
{
    TValue GetById(TKey id);
    IEnumerable<TValue> GetAll();
}

// Concrete class implementing interface
[Info("User repository implementation")]
public class UserRepository : IRepository<int, User>
{
    private readonly Dictionary<int, User> _users = new();

    public UserRepository()
    {
        _users[1] = new User(1, "Alice", Permissions.Read | Permissions.Write);
        _users[2] = new User(2, "Bob", Permissions.Read);
    }

    public User GetById(int id) => _users.TryGetValue(id, out var user) ? user : null;

    public IEnumerable<User> GetAll() => _users.Values;
}

// Immutable record type (C# 9+)
public record User(int Id, string Name, Permissions Permissions);

// Static class with extension method
public static class UserExtensions
{
    public static bool HasPermission(this User user, Permissions permission)
    {
        return (user.Permissions & permission) == permission;
    }
}

class Program
{
    // Async Main method
    static async Task Main(string[] args)
    {
        var repository = new UserRepository();

        // Lambda expression and LINQ query
        var usersWithWriteAccess = repository.GetAll()
            .Where(u => u.HasPermission(Permissions.Write))
            .OrderBy(u => u.Name)
            .ToList();

        Console.WriteLine("Users with Write permission:");
        usersWithWriteAccess.ForEach(user => Console.WriteLine($"- {user.Name}"));

        // Pattern matching with switch expression
        User user = repository.GetById(1);
        string accessLevel = user switch
        {
            { Permissions: Permissions.All } => "Full Access",
            { Permissions: Permissions.Read | Permissions.Write } => "Read & Write Access",
            { Permissions: Permissions.Read } => "Read-Only Access",
            null => "User not found",
            _ => "Unknown Access"
        };
        Console.WriteLine($"User {user?.Name ?? "N/A"} has: {accessLevel}");

        // Exception handling with try-catch-finally
        try
        {
            int result = Divide(10, 0);
            Console.WriteLine($"Result: {result}");
        }
        catch (DivideByZeroException ex)
        {
            Console.Error.WriteLine($"Exception caught: {ex.Message}");
        }
        finally
        {
            Console.WriteLine("Execution finished.");
        }

        // Regular expression usage
        string pattern = @"\b[A-Z][a-z]+\b";
        string input = "Alice and Bob are working on CSharp";
        foreach (Match match in Regex.Matches(input, pattern))
        {
            Console.WriteLine($"Matched word: {match.Value}");
        }

        // Using nullable types and null-coalescing operator
        int? nullableInt = null;
        Console.WriteLine($"Value or default: {nullableInt ?? -1}");
    }

    static int Divide(int numerator, int denominator)
    {
        return numerator / denominator;
    }
}
