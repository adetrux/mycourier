using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using Users.Domain;

namespace Users.Dal
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            AddApplicationUsers(modelBuilder);
        }

        private void AddApplicationUsers(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ApplicationUser>().HasData(
                new ApplicationUser
                {
                    Email = "customer1@gmail.com",
                    SecurityStamp = Guid.NewGuid().ToString(),
                    UserName = "customer1@gmail.com",
                    FirstName = "A",
                    LastName = "A"
                },
                new ApplicationUser
                {
                    Email = "customer2@gmail.com",
                    SecurityStamp = Guid.NewGuid().ToString(),
                    UserName = "customer2@gmail.com",
                    FirstName = "B",
                    LastName = "B"
                },
                new ApplicationUser
                {
                    Email = "courier3@gmail.com",
                    SecurityStamp = Guid.NewGuid().ToString(),
                    UserName = "courier3@gmail.com",
                    FirstName = "C",
                    LastName = "C"
                },
                new ApplicationUser
                {
                    Email = "courier4@gmail.com",
                    SecurityStamp = Guid.NewGuid().ToString(),
                    UserName = "courier4@gmail.com",
                    FirstName = "D",
                    LastName = "D"
                });
        }
    }
}
