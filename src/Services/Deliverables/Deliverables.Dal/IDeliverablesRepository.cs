using Deliverables.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Deliverables.Dal
{
    public interface IDeliverablesRepository
    {
        Task<IEnumerable<Deliverable>> GetDeliverables();
    }
}
