using Deliverables.Dal;
using Deliverables.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Deliverables.Api.Services
{
    public class DeliverablesService : IDeliverablesService
    {
        private readonly IDeliverablesRepository _deliverablesRepository;

        public DeliverablesService(IDeliverablesRepository deliverablesRepository)
        {
            _deliverablesRepository = deliverablesRepository;
        }
        public async Task<IEnumerable<Deliverable>> GetDeliverables(string userId, string userRole)
        {
            switch (userRole)
            {
                case "Courier":
                    return (await _deliverablesRepository.GetDeliverables())
                        .Where(d => d.Accepted == false || d.CourierId == userId);
                case "Customer":
                    return (await _deliverablesRepository.GetDeliverables())
                        .Where(d => d.CustomerId == userId);
                default:
                    throw new Exception("Role does not exist.");
            }

            throw new NotImplementedException();
        }
    }
}
