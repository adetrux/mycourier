using Deliverables.Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Deliverables.Dal
{
    public class DeliverablesRepository : IDeliverablesRepository
    {
        private DeliverablesDbContext _context;

        public DeliverablesRepository(DeliverablesDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Deliverable>> GetDeliverables()
        {
            return await _context.Deliverables.ToListAsync();
        }
    }
}
