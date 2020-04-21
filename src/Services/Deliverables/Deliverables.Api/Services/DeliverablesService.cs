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
        public async Task<IEnumerable<Deliverable>> GetDeliverables(string userId, string userName, string userRole)
        {
            switch (userRole)
            {
                case "Courier":
                    return (await _deliverablesRepository.GetDeliverables())
                        .Where(d => d.Accepted == false || d.CourierUserName == userName);
                case "Customer":
                    return (await _deliverablesRepository.GetDeliverables())
                        .Where(d => d.CustomerId == userId);
                default:
                    throw new Exception("Role does not exist.");
            }
        }

        public async Task<string[]> GetDeliveringToCustomerIds(string courierUserName)
        {
            var deliverables = (await _deliverablesRepository.GetDeliverables())
                .Where(d => d.CourierUserName == courierUserName)
                .Where(d => d.Accepted == true && d.Delivered == false);

            var ids = new List<string>();
            foreach (var d in deliverables)
            {
                ids.Add(d.CustomerUserName);
            }

            return ids.ToArray();
        }

        public async Task CreateDeliverable(Deliverable deliverable, string customerId, string customerUserName)
        {
            deliverable.CustomerId = customerId;
            deliverable.CustomerUserName = customerUserName;

            await _deliverablesRepository.CreateDeliverable(deliverable);
        }
    }
}
