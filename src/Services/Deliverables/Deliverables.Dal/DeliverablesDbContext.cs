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

            AddDeliverables(modelBuilder);
        }

        
        private void AddDeliverables(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Deliverable>().HasData(
                new Deliverable
                {
                    Id = "123-test-deliverable-456",
                    CreatedTime = 1,
                    Name = "Test",
                    CustomerId = "cus1",
                    CustomerFirstName = "Cus",
                    CustomerLastName = "TomerOne",
                    StartLocationLatitude = 47.515249,
                    StartLocationLongitude = 19.147091,
                    DestinationLocationLatitude = 47.525249,
                    DestinationLocationLongitude = 19.157091,
                    Accepted = false,
                    Delivering = false,
                    Delivered = false,
                    CourierId = "cou1",
                    CourierFirstName = "Cou",
                    CourierLastName = "RierOne"
                });
        }
    }
}
