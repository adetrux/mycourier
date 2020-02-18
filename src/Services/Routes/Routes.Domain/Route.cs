using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Routes.Domain
{
    public class Route
    {
        public int Id { get; set; }
        public string CostumerId { get; set; }
        public string CostumerFirstName { get; set; }
        public string CostumerLastName { get; set; }
        public int StartLocationLatitude { get; set; }
        public int StartLocationLongitude { get; set; }
        public int DestinationLocationLatitude { get; set; }
        public int DestinationLocationLongitude { get; set; }
        public string CourierId { get; set; }
        public string CourierFirstName { get; set; }
        public string CourierLastName { get; set; }
        public bool Accepted { get; set; }
        public bool Delivered { get; set; }
    }
}
