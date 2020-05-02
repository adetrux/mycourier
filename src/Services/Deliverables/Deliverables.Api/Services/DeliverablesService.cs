using Deliverables.Dal;
using Deliverables.Domain;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Tracking.Api.Model;

namespace Deliverables.Api.Services
{
    public class DeliverablesService : IDeliverablesService
    {
        private readonly IDeliverablesRepository _deliverablesRepository;

        public DeliverablesService(IDeliverablesRepository deliverablesRepository)
        {
            _deliverablesRepository = deliverablesRepository;
        }
        public async Task<IEnumerable<Deliverable>> GetDeliverables(
            string userId, string userName, string userRole, string token)
        {
            switch (userRole)
            {
                case "Courier":
                    var deliverablesForCourier =
                        (await _deliverablesRepository.GetDeliverables())
                        .Where(d => d.Accepted == false || d.CourierUserName == userName);

                    Location location = await GetCourierLocation(token);
                    double? latitude = location.Latitude;
                    double? longitude = location.Longitude;

                    if (latitude.HasValue && longitude.HasValue)
                    {
                        deliverablesForCourier.Where(d =>
                        (Math.Sqrt(
                            Math.Pow(Math.Abs((double)(d.StartLocationLatitude - latitude)), 2) +
                            Math.Pow(Math.Abs((double)(d.StartLocationLongitude - longitude)), 2))) < 0.2);

                        deliverablesForCourier.OrderBy(d =>
                            (Math.Sqrt(
                                Math.Pow(Math.Abs((double)(d.StartLocationLatitude - latitude)), 2) +
                                Math.Pow(Math.Abs((double)(d.StartLocationLongitude - longitude)), 2))));
                    }
                    
                    return deliverablesForCourier;

                    //return (await _deliverablesRepository.GetDeliverables())
                    //    .Where(d => d.Accepted == false || d.CourierUserName == userName);
                case "Customer":
                    return (await _deliverablesRepository.GetDeliverables())
                        .Where(d => d.CustomerId == userId);
                default:
                    throw new Exception("Role does not exist.");
            }
        }

        public async Task<IEnumerable<string>> GetDeliveringToCustomerIds(string courierUserName)
        {
            var deliverables = (await _deliverablesRepository.GetDeliverables())
                .Where(d => d.CourierUserName == courierUserName)
                .Where(d => d.Accepted == true && d.Delivered == false);

            var ids = new List<string>();
            foreach (var d in deliverables)
            {
                ids.Add(d.CustomerUserName);
            }

            return ids;
        }

        public async Task CreateDeliverable(Deliverable deliverable, string customerId, string customerUserName)
        {
            deliverable.CustomerId = customerId;
            deliverable.CustomerUserName = customerUserName;

            await _deliverablesRepository.CreateDeliverable(deliverable);
        }

        private async Task<Location> GetCourierLocation(string token)
        {
            var client = new HttpClient();
            client.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);

            var response = await client.GetAsync("http://tracking.api/tracking/locations");
            var responseAsString = response.Content.ReadAsStringAsync().Result;
            Location location = JsonConvert.DeserializeObject<Location>(responseAsString);

            return location;
        }
    }
}
