using Microsoft.AspNetCore.SignalR.Client;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Tracking.Api.Model;

namespace MobileSimulator
{
    public class Simulator
    {
        private double actualLatitude = 47.505249;
        private double actualLongitude = 19.137091;
        private double latitudeStepDistance = 0;
        private double longitudeStepDistance = 0;

        private readonly Deliverable deliverable;
        private bool delivering = false;
        private bool delivered = false;

        private readonly string baseUrl = "http://localhost:5080";
        private readonly string token;

        private List<string> deliveringToCustomerIds;

        private HubConnection deliverableHubConnection;
        private HubConnection trackingHubConnection;

        public Simulator()
        {
            deliverable = getSampleDeliverable();

            token = getToken();

            buildHubConnectionsAsync();
        }

        public async Task StartAsync()
        {
            Deliverable updatedDeliverable = getSampleDeliverable();
            updatedDeliverable.Accepted = true;
            updatedDeliverable.CourierId = "cou1";
            updatedDeliverable.CourierUserName = "courier1@gmail.com";

            await updateDeliverable(updatedDeliverable);
            await deliverableHubConnection.InvokeAsync("UpdateDeliverable", updatedDeliverable);

            deliveringToCustomerIds = await getDeliveringToCustomerIds();

            computeStepDistances();

            await simulateMoving(move, 1);

            var state = getState(delivering, delivered);
            Console.WriteLine($"position(lat, long): ({actualLatitude}, {actualLongitude})\tstate: {state}");
        }

        private void computeStepDistances()
        {
            latitudeStepDistance = (deliverable.StartLocationLatitude - actualLatitude) / 20;
            longitudeStepDistance = (deliverable.StartLocationLongitude - actualLongitude) / 20;
        }

        private async Task simulateMoving(Action action, int seconds)
        {
            while (!delivered)
            {
                var state = getState(delivering, delivered);
                action();
                var newState = getState(delivering, delivered);
                Console.WriteLine($"position(lat, long): ({actualLatitude}, {actualLongitude})\tstate: {newState}");

                await setLocation(new Location { Latitude = actualLatitude, Longitude = actualLongitude });
                await trackingHubConnection.InvokeAsync("SendActualLocation",
                    deliveringToCustomerIds,
                    actualLatitude,
                    actualLongitude);

                if (state.Equals("accepted") && newState.Equals("delivering"))
                {
                    Deliverable updatedDeliverable = getSampleDeliverable();
                    updatedDeliverable.CourierId = "cou1";
                    updatedDeliverable.CourierUserName = "courier1@gmail.com";
                    updatedDeliverable.Accepted = true;
                    updatedDeliverable.Delivering = true;

                    await updateDeliverable(updatedDeliverable);
                    await deliverableHubConnection.InvokeAsync("UpdateDeliverable", updatedDeliverable);
                }

                if (newState.Equals("delivered") && state.Equals("delivering"))
                {
                    Deliverable updatedDeliverable = getSampleDeliverable();
                    updatedDeliverable.CourierId = "cou1";
                    updatedDeliverable.CourierUserName = "courier1@gmail.com";
                    updatedDeliverable.Accepted = true;
                    updatedDeliverable.Delivering = true;
                    updatedDeliverable.Delivered = true;

                    await updateDeliverable(updatedDeliverable);
                    await deliverableHubConnection.InvokeAsync("UpdateDeliverable", updatedDeliverable);

                    await trackingHubConnection.InvokeAsync("SendActualLocation",
                        deliveringToCustomerIds,
                        null,
                        null);
                }

                await Task.Delay(TimeSpan.FromSeconds(seconds));
            }
        }

        private void move()
        {
            if (actualLatitude >= deliverable.DestinationLocationLatitude && actualLongitude >= deliverable.DestinationLocationLongitude)
            {
                delivered = true;
            }
            else if (actualLatitude >= deliverable.StartLocationLatitude && actualLongitude >= deliverable.StartLocationLongitude)
            {
                delivering = true;
                actualLatitude += latitudeStepDistance;
                actualLongitude += longitudeStepDistance;
            }
            else
            {
                actualLatitude += latitudeStepDistance;
                actualLongitude += longitudeStepDistance;
            }

        }

        private string getToken()
        {
            LoginRequest loginRequest = new LoginRequest
            {
                Email = "courier1@gmail.com",
                Password = "password0"
            };

            using var client = new HttpClient();
            var data = createDataFromObject(loginRequest);

            var response = client.PostAsync($"{baseUrl}/users/login", data);
            var responseAsString = response.Result.Content.ReadAsStringAsync().Result;
            string token = JsonConvert.DeserializeObject<LoginResponse>(responseAsString).Token;

            return token;
        }

        private async Task updateDeliverable(Deliverable deliverable)
        {
            HttpClient client = getClient();
            var data = createDataFromObject(deliverable);
            await client.PutAsync($"{baseUrl}/deliverables/{deliverable.Id}", data);
        }

        private async Task<List<string>> getDeliveringToCustomerIds()
        {
            HttpClient client = getClient();

            var response = await client.GetAsync($"{baseUrl}/deliverables/delivering");
            var responseAsString = response.Content.ReadAsStringAsync().Result;
            return JsonConvert.DeserializeObject<List<string>>(responseAsString);
        }

        private async Task setLocation(Location location)
        {
            HttpClient client = getClient();
            var data = createDataFromObject(location);

            await client.PutAsync($"{baseUrl}/tracking/locations", data);
        }

        private string getState(bool delivering, bool delivered)
        {
            if (!delivering && !delivered) return "accepted";
            else if (delivering && !delivered) return "delivering";
            else return "delivered";
        }

        private HttpClient getClient()
        {
            var client = new HttpClient();
            client.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);

            return client;
        }

        private StringContent createDataFromObject<T>(T objectToData)
        {
            var json = JsonConvert.SerializeObject(objectToData);
            var data = new StringContent(json, Encoding.UTF8, "application/json");

            return data;
        }

        private async void buildHubConnectionsAsync()
        {
            deliverableHubConnection = new HubConnectionBuilder()
                .WithUrl($"{baseUrl}/deliverables/deliverableHub", options =>
                {
                    options.AccessTokenProvider = () => Task.FromResult(token);
                })
                .WithAutomaticReconnect()
                .Build();

            await deliverableHubConnection.StartAsync();

            trackingHubConnection = new HubConnectionBuilder()
                .WithUrl($"{baseUrl}/tracking/trackingHub", options =>
                {
                    options.AccessTokenProvider = () => Task.FromResult(token);
                })
                .WithAutomaticReconnect()
                .Build();

            await trackingHubConnection.StartAsync();
        }

        private Deliverable getSampleDeliverable()
        {
            return new Deliverable
            {
                Id = "1-test-deliverable",
                CreatedTime = 1,
                Name = "Test1",
                CustomerId = "cus1",
                CustomerUserName = "customer1@gmail.com",
                StartLocationLatitude = 47.515249,
                StartLocationLongitude = 19.147091,
                DestinationLocationLatitude = 47.525249,
                DestinationLocationLongitude = 19.157091,
                CourierId = null,
                CourierUserName = null,
                Accepted = false,
                Delivering = false,
                Delivered = false,
            };
        }
    }
}
