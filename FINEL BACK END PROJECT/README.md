# Rent-A-Ride Backend API

A .NET 9.0 Web API for vehicle rental management.

## Features

- 🚗 Vehicle management (CRUD operations)
- 📅 Rental booking with date validation
- 🔐 JWT Authentication (User/Admin roles)
- 📊 Background jobs with Hangfire
- 🗓️ Public holiday integration
- 🛡️ Clean Architecture pattern

## Tech Stack

- **Framework:** ASP.NET Core 9.0
- **Database:** PostgreSQL
- **ORM:** Entity Framework Core
- **Background Jobs:** Hangfire
- **Authentication:** JWT Bearer tokens
- **Mapping:** Mapster
- **Validation:** FluentValidation

## Getting Started

### Prerequisites

- .NET 9.0 SDK
- PostgreSQL database
- Visual Studio 2022 or VS Code

### Configuration

1. Update `appsettings.json` with your database connection string
2. Update JWT settings in `appsettings.json`

### Run the API

```bash
cd RentARide.API
dotnet run
```

API will be available at: `http://localhost:5112`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token

### Vehicles

- `GET /api/vehicles` - List all vehicles (paginated)
- `GET /api/vehicles/{id}` - Get vehicle by ID
- `POST /api/vehicles` - Create vehicle (Admin)
- `PUT /api/vehicles/{id}/price` - Update price (Admin)
- `DELETE /api/vehicles/{id}` - Delete vehicle (Admin)

### Rentals

- `GET /api/rentals` - Get user's rentals
- `POST /api/rentals` - Book a vehicle
- `DELETE /api/rentals/{id}` - Cancel rental

### Vehicle Types

- `GET /api/vehicletypes` - List vehicle types
- `POST /api/vehicletypes` - Create type (Admin)

## Project Structure

```
RentARide.sln
├── RentARide.API/          # Web API layer
├── RentARide.Application/  # Business logic & DTOs
├── RentARide.Domain/       # Entities & interfaces
└── RentARide.Infrastructure/ # Data access & external services
```

## License

MIT
