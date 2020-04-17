using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace Tracking.Api.Hubs
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class TrackingHub : Hub
    {
        public async Task SendActualLocation(string deliverableId, string customerUserName, double? actualLatitude, double? actualLongitude)
        {
            await Clients.User(customerUserName).SendAsync("ActualLocationSent",
                deliverableId,
                actualLatitude,
                actualLongitude);
        }
    }
}
