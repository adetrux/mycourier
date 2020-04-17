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
        }

        public async Task CreateDeliverable(Deliverable deliverable, string customerId, string customerUserName)
        {
            Deliverable deliverableToCreate = new Deliverable
            {
                Id = deliverable.Id,
                CreatedTime = deliverable.CreatedTime,
                Name = deliverable.Name,
                CustomerId = customerId,
                CustomerUserName = customerUserName,
                StartLocationLatitude = deliverable.StartLocationLatitude,
                StartLocationLongitude = deliverable.StartLocationLongitude,
                DestinationLocationLatitude = deliverable.DestinationLocationLatitude,
                DestinationLocationLongitude = deliverable.DestinationLocationLongitude,
                Accepted = deliverable.Accepted,
                Delivering = deliverable.Delivering,
                Delivered = deliverable.Delivered
            };

            await _deliverablesRepository.CreateDeliverable(deliverableToCreate);
        }
    }
}
