using Microsoft.EntityFrameworkCore;
using Routes.Domain;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Routes.Dal
{
    public class RoutesRepository : IRoutesRepository
    {
        private RoutesDbContext _context;

        public RoutesRepository(RoutesDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Route>> GetRoutes()
        {
            return await _context.Routes.ToListAsync();
        }
    }
}
