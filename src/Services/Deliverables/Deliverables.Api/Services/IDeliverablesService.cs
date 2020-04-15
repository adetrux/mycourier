using Deliverables.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Deliverables.Api.Services
{
    public interface IDeliverablesService
    {
        Task<IEnumerable<Deliverable>> GetDeliverables(string userId, string userRole);
    }
}
