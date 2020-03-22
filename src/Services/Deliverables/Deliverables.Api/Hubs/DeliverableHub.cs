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
        public async Task CreateDeliverable(Deliverable deliverable)
        {
            await Clients.Others.SendAsync("DeliverableCreated", deliverable);
        }

        public async Task UpdateDeliverable(Deliverable deliverable)
        {
            await Clients.Others.SendAsync("DeliverableUpdated", deliverable);
        }
    }
}
