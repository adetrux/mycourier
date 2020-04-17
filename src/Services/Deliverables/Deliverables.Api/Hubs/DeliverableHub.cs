using Deliverables.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace Deliverables.Api.Hubs
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class DeliverableHub : Hub
    {
        public async Task CreateDeliverable(Deliverable deliverable)
        {
            await Clients.Others.SendAsync("DeliverableCreated", deliverable);
        }

        public async Task UpdateDeliverable(Deliverable deliverable)
        {
            await Clients.User(deliverable.CustomerUserName).SendAsync("DeliverableUpdated", deliverable);
        }
    }
}
