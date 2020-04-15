using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Users.Domain;

namespace Users.Dal
{
    public class Seed
    {
        public static async void Initialize(IServiceProvider serviceProvider)
        {
            var context = serviceProvider.GetRequiredService<UsersDbContext>();
            var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();

            if (context.Users.Any())
            {
                return;
            }

            IdentityRole roleCourier = new IdentityRole() { Id = "1", Name = "Courier", NormalizedName = "COURIER" };
            IdentityRole roleCustomer = new IdentityRole() { Id = "2", Name = "Customer", NormalizedName = "CUSTOMER" };

            await roleManager.CreateAsync(roleCourier);
            await roleManager.CreateAsync(roleCustomer);

            ApplicationUser courier1 = new ApplicationUser
            {
                Id = "cou1",
                Email = "courier1@gmail.com",
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = "courier1@gmail.com",
                FirstName = "Cou",
                LastName = "RierOne"
            };

            await userManager.CreateAsync(courier1, "password0");
            await userManager.AddToRoleAsync(courier1, "Courier");

            ApplicationUser customer1 = new ApplicationUser
            {
                Id = "cus1",
                Email = "customer1@gmail.com",
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = "customer1@gmail.com",
                FirstName = "Cus",
                LastName = "TomerOne"
            };

            await userManager.CreateAsync(customer1, "password1");
            await userManager.AddToRoleAsync(customer1, "Customer");

            ApplicationUser customer2 = new ApplicationUser
            {
                Id = "cus2",
                Email = "customer2@gmail.com",
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = "customer2@gmail.com",
                FirstName = "Cus",
                LastName = "TomerTwo"
            };

            await userManager.CreateAsync(customer2, "password2");
            await userManager.AddToRoleAsync(customer2, "Customer");
        }
    }
}
