using System;
using System.Collections.Generic;
using System.Text;

namespace MobileSimulator
{
    public class Deliverable
    {
        public string Id { get; set; }
        public long CreatedTime { get; set; }
        public string Name { get; set; }
        public string CustomerId { get; set; }
        public string CustomerFirstName { get; set; }
        public string CustomerLastName { get; set; }
        public double StartLocationLatitude { get; set; }
        public double StartLocationLongitude { get; set; }
        public double DestinationLocationLatitude { get; set; }
        public double DestinationLocationLongitude { get; set; }
        public string CourierId { get; set; }
        public string CourierFirstName { get; set; }
        public string CourierLastName { get; set; }
        public bool Accepted { get; set; }
        public bool Delivering { get; set; }
        public bool Delivered { get; set; }
    }
}
