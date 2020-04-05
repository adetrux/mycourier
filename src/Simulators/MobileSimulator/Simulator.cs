using Microsoft.AspNetCore.SignalR.Client;
using System;
using System.Collections.Generic;
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
        private HubConnection deliverableHubConnection;
        private HubConnection trackingHubConnection;

        public Simulator()
        {
            deliverable = sampleDeliverable();

            buildHubConnections();
        }

        public async Task StartAsync()
        {
            Deliverable updatedDeliverable = sampleDeliverable();
            updatedDeliverable.Accepted = true;
            await deliverableHubConnection.InvokeAsync("UpdateDeliverable", updatedDeliverable);

            computeStepDistances();

            await simulateMoving(move, 1);

            var state = getState(delivering, delivered);
            Console.WriteLine($"position(lat, long): ({actualLatitude}, {actualLongitude})\tstate: {state}");
        }

        private void buildHubConnections()
        {
            deliverableHubConnection = new HubConnectionBuilder()
                .WithUrl("http://localhost:5080/deliverables/deliverableHub")
                .WithAutomaticReconnect()
                .Build();

            deliverableHubConnection.StartAsync();

            trackingHubConnection = new HubConnectionBuilder()
                .WithUrl("http://localhost:5080/tracking/trackingHub")
                .WithAutomaticReconnect()
                .Build();

            trackingHubConnection.StartAsync();
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
                await trackingHubConnection.InvokeAsync("SendActualLocation", actualLatitude, actualLongitude);
                
                if (state.Equals("accepted") && newState.Equals("delivering"))
                {
                    Deliverable updatedDeliverable = sampleDeliverable();
                    updatedDeliverable.Accepted = true;
                    updatedDeliverable.Delivering = true;
                    await deliverableHubConnection.InvokeAsync("UpdateDeliverable", updatedDeliverable);
                }

                if (newState.Equals("delivered") && state.Equals("delivering"))
                {
                    Deliverable updatedDeliverable = sampleDeliverable();
                    updatedDeliverable.Accepted = true;
                    updatedDeliverable.Delivering = true;
                    updatedDeliverable.Delivered = true;
                    await deliverableHubConnection.InvokeAsync("UpdateDeliverable", updatedDeliverable);
                    await trackingHubConnection.InvokeAsync("SendActualLocation", null, null);
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
                Id = "123-test-deliverable-456",
                CreatedTime = 1111111111,
                Name = "Test",
                CustomerId = "23108de4-5574-4961-a949-50bf5579f150",
                CustomerFirstName = "Bob",
                CustomerLastName = "White",
                StartLocationLatitude = 47.515249,
                StartLocationLongitude = 19.147091,
                DestinationLocationLatitude = 47.525249,
                DestinationLocationLongitude = 19.157091,
                Accepted = false,
                Delivering = false,
                Delivered = false,
            };
        }
    }
}
