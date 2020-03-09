using Deliverables.Api.Requests;
using Deliverables.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Deliverables.Api.Mapper
{
    public static class Mapper
    {
        public static Deliverable CreateDeliverableToDeliverable(CreateDeliverable createDeliverable)
        {
            return new Deliverable
            {
                Id = createDeliverable.Id,
                CreatedTime = createDeliverable.CreatedTime,
                Name = createDeliverable.Name,
                CustomerId = "1",
                CustomerFirstName = "Bob",
                CustomerLastName = "Sbdy",
                StartLocationLatitude = createDeliverable.Start,
                StartLocationLongitude = createDeliverable.Start,
                DestinationLocationLatitude = createDeliverable.End,
                DestinationLocationLongitude = createDeliverable.End,
                Accepted = false,
                Delivering = false,
                Delivered = false
            };
        }
    }
}
