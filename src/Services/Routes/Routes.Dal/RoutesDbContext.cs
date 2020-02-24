using Microsoft.EntityFrameworkCore;
using Routes.Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace Routes.Dal
{
    public class RoutesDbContext : DbContext
    {
        public RoutesDbContext(DbContextOptions<RoutesDbContext> options) : base(options)
        {

        }

        public DbSet<Route> Routes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            AddRoutes(modelBuilder);
        }

        private void AddRoutes(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Route>().HasData(
                new Route
                {
                    Id = 1,
                    CostumerId = "23108de4-5574-4961-a949-50bf5579f150",
                    CostumerFirstName = "A",
                    CostumerLastName = "A",
                    StartLocationLatitude = 1,
                    StartLocationLongitude = 1,
                    DestinationLocationLatitude = 10,
                    DestinationLocationLongitude = 10,
                    Accepted = false,
                    Delivering = false,
                    Delivered = false,
                    CourierId = null,
                    CourierFirstName = null,
                    CourierLastName = null
                });
        }
    }
}
