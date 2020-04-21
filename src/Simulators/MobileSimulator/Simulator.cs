using Microsoft.AspNetCore.SignalR.Client;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace MobileSimulator
{
    public class Simulator
    {
        public double actualLatitude = 47.505249;
        public double actualLongitude = 19.137091;
        private readonly Deliverable deliverable;
        private double latitudeStepDistance = 0;
        private double longitudeStepDistance = 0;
        private bool delivering = false;
        private bool delivered = false;

        private readonly HttpClient httpClient = new HttpClient();
        private string token;

        private List<string> deliveringToCustomerIds;

        private HubConnection deliverableHubConnection;
        private HubConnection trackingHubConnection;

        public Simulator()
        {
            deliverable = sampleDeliverable();

            token = getToken();

            deliveringToCustomerIds = getDeliveringToCustomerIds();

            buildHubConnectionsAsync();
        }

        public async Task StartAsync()
        {
            Deliverable updatedDeliverable = sampleDeliverable();
            updatedDeliverable.Accepted = true;
            updatedDeliverable.CourierId = "cou1";
            updatedDeliverable.CourierUserName = "courier1@gmail.com";
            await deliverableHubConnection.InvokeAsync("UpdateDeliverable", updatedDeliverable);

            computeStepDistances();

            await simulateMoving(move, 1);

            var state = getState(delivering, delivered);
            Console.WriteLine($"position(lat, long): ({actualLatitude}, {actualLongitude})\tstate: {state}");
        }

        private string getToken()
        {
            LoginRequest loginRequest = new LoginRequest
            {
                Email = "courier1@gmail.com",
                Password = "password0"
            };

            var json = JsonConvert.SerializeObject(loginRequest);
            var data = new StringContent(json, Encoding.UTF8, "application/json");
            var response = httpClient.PostAsync("http://localhost:5080/users/login", data);
            var responseAsString = response.Result.Content.ReadAsStringAsync().Result;
            LoginResponse loginResponse = JsonConvert.DeserializeObject<LoginResponse>(responseAsString);
            string token = loginResponse.Token;
            Console.WriteLine(token);
            return token;
        }

        private List<string> getDeliveringToCustomerIds()
        {
            httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);
            var response = httpClient.GetAsync("http://localhost:5080/deliverables/delivering");
            var responseAsString = response.Result.Content.ReadAsStringAsync().Result;
            return JsonConvert.DeserializeObject<List<string>>(responseAsString);
        }

        private async void buildHubConnectionsAsync()
        {
            deliverableHubConnection = new HubConnectionBuilder()
                .WithUrl("http://localhost:5080/deliverables/deliverableHub", options =>
                {
                    options.AccessTokenProvider = () => Task.FromResult(token);
                })
                .WithAutomaticReconnect()
                .Build();

            await deliverableHubConnection.StartAsync();

            trackingHubConnection = new HubConnectionBuilder()
                .WithUrl("http://localhost:5080/tracking/trackingHub", options =>
                {
                    options.AccessTokenProvider = () => Task.FromResult(token);
                })
                .WithAutomaticReconnect()
                .Build();

            await trackingHubConnection.StartAsync();
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
                await trackingHubConnection.InvokeAsync("SendActualLocation",
                    deliveringToCustomerIds,
                    actualLatitude,
                    actualLongitude);
                
                if (state.Equals("accepted") && newState.Equals("delivering"))
                {
                    Deliverable updatedDeliverable = sampleDeliverable();
                    updatedDeliverable.CourierId = "cou1";
                    updatedDeliverable.CourierUserName = "courier1@gmail.com";
                    updatedDeliverable.Accepted = true;
                    updatedDeliverable.Delivering = true;
                    await deliverableHubConnection.InvokeAsync("UpdateDeliverable", updatedDeliverable);
                }

                if (newState.Equals("delivered") && state.Equals("delivering"))
                {
                    Deliverable updatedDeliverable = sampleDeliverable();
                    updatedDeliverable.CourierId = "cou1";
                    updatedDeliverable.CourierUserName = "courier1@gmail.com";
                    updatedDeliverable.Accepted = true;
                    updatedDeliverable.Delivering = true;
                    updatedDeliverable.Delivered = true;
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

        private string getState(bool delivering, bool delivered)
        {
            if (!delivering && !delivered) return "accepted";
            else if (delivering && !delivered) return "delivering";
            else return "delivered";
        }

        private Deliverable sampleDeliverable()
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
