using Deliverables.Api.Requests;
using Deliverables.Domain;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Deliverables.Api.Hubs
{
    public class DeliverableHub : Hub
    {
        public async Task CreateDeliverable(CreateDeliverable createDeliverable)
        {
            Deliverable deliverable = Mapper.Mapper.CreateDeliverableToDeliverable(createDeliverable);
            await Clients.All.SendAsync("DeliverableCreated", deliverable);
        }
    }
}
