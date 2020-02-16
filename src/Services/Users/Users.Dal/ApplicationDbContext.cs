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
                    Id = "1",
                    UserName = "Customer1",
                    FirstName = "A",
                    LastName = "A"
                },
                new ApplicationUser
                {
                    Id = "2",
                    UserName = "Customer2",
                    FirstName = "B",
                    LastName = "B"
                },
                new ApplicationUser
                {
                    Id = "3",
                    UserName = "Courier3",
                    FirstName = "C",
                    LastName = "C"
                },
                new ApplicationUser
                {
                    Id = "4",
                    UserName = "Courier4",
                    FirstName = "D",
                    LastName = "D"
                });
        }
    }
}
