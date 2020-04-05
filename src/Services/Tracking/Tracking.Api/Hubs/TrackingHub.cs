using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tracking.Api.Hubs
{
    public class TrackingHub : Hub
    {
        public async Task SendActualLocation(double? actualLatitude, double? actualLongitude)
        {
            await Clients.Others.SendAsync("ActualLocationSent", actualLatitude, actualLongitude);
        }
    }
}
