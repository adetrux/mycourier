using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Tracking.Api.Hubs
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class TrackingHub : Hub
    {
        public async Task SendActualLocation(List<string> deliveringToCustomerIds, double? actualLatitude, double? actualLongitude)
        {
            string courierUserName = Context.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            await Clients.Users(deliveringToCustomerIds).SendAsync("ActualLocationSent", courierUserName, actualLatitude, actualLongitude);
        }
    }
}
