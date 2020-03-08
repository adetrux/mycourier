using Deliverables.Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Deliverables.Dal
{
    public class DeliverablesDbContext : DbContext
    {
        public DeliverablesDbContext(DbContextOptions<DeliverablesDbContext> options) : base(options)
        {

        }

        public DbSet<Deliverable> Deliverables { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // AddDeliverables(modelBuilder);
        }

        /*
        private void AddDeliverables(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Deliverable>().HasData(
                new Deliverable
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
        }*/
    }
}
