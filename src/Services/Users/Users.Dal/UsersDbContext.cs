using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using Users.Domain;

namespace Users.Dal
{
    public class UsersDbContext : IdentityDbContext<ApplicationUser>
    {
        public UsersDbContext(DbContextOptions<UsersDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

    }
}
