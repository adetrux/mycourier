using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Users.Domain;

namespace Users.Dal
{
    public class UsersRepository : IUsersRepository
    {
        public async Task<IEnumerable<ApplicationUser>> GetUsers()
        {
            return await Task.Run(() => TestUsers());
        }

        IEnumerable<ApplicationUser> TestUsers()
        {
            return new List<ApplicationUser>()
            {
                new ApplicationUser
                {
                    Id = "1", UserName = "Customer1", FirstName = "A", LastName = "A"
                },
                new ApplicationUser
                {
                    Id = "2", UserName = "Customer2", FirstName = "B", LastName = "B"
                },
                new ApplicationUser
                {
                    Id = "3", UserName = "Courier3", FirstName = "C", LastName = "C"
                },
                new ApplicationUser
                {
                    Id = "4", UserName = "Courier4", FirstName = "D", LastName = "D"
                },
            };
        }
    }
}
