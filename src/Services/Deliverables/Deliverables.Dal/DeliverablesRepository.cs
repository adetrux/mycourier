using Deliverables.Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
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
            return await _context.Deliverables.OrderByDescending(d => d.CreatedTime).ToListAsync();
        }

        public async Task CreateDeliverable(Deliverable deliverable)
        {
            await _context.Deliverables.AddAsync(deliverable);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateDeliverable(string id, Deliverable deliverable)
        {
            var deliverableToUpdate = await _context.Deliverables.SingleOrDefaultAsync(d => d.Id.Equals(id));
            if (deliverableToUpdate != null)
            {
                _context.Entry(deliverableToUpdate).CurrentValues.SetValues(deliverable);
                await _context.SaveChangesAsync();
            }
        }
    }
}
