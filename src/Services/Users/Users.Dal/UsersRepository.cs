using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Users.Domain;

namespace Users.Dal
{
    public class UsersRepository : IUsersRepository
    {
        private readonly UsersDbContext _context;

        public UsersRepository(UsersDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<ApplicationUser>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }
    }
}
