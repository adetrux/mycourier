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
                    Id = "1-test-deliverable",
                    CreatedTime = 1,
                    Name = "Test1",
                    CustomerId = "cus1",
                    CustomerUserName = "customer1@gmail.com",
                    StartLocationLatitude = 47.515249,
                    StartLocationLongitude = 19.147091,
                    DestinationLocationLatitude = 47.525249,
                    DestinationLocationLongitude = 19.157091,
                    CourierId = null,
                    Accepted = false,
                    Delivering = false,
                    Delivered = false
                },
                new Deliverable
                {
                    Id = "2-test-deliverable",
                    CreatedTime = 2,
                    Name = "Test2",
                    CustomerId = "cus1",
                    CustomerUserName = "customer1@gmail.com",
                    StartLocationLatitude = 47.495249,
                    StartLocationLongitude = 19.147091,
                    DestinationLocationLatitude = 47.525249,
                    DestinationLocationLongitude = 19.177091,
                    CourierId = null,
                    Accepted = false,
                    Delivering = false,
                    Delivered = false
                },
                new Deliverable
                {
                    Id = "3-test-deliverable",
                    CreatedTime = 3,
                    Name = "Test3",
                    CustomerId = "cus2",
                    CustomerUserName = "customer2@gmail.com",
                    StartLocationLatitude = 47.515249,
                    StartLocationLongitude = 19.127091,
                    DestinationLocationLatitude = 47.525249,
                    DestinationLocationLongitude = 19.137091,
                    CourierId = null,
                    Accepted = false,
                    Delivering = false,
                    Delivered = false
                });
        }
    }
}
