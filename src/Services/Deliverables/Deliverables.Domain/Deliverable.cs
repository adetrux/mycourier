using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Deliverables.Domain
{
    public class Deliverable
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Id { get; set; }
        public long CreatedTime { get; set; }
        public string Name { get; set; }
        public string CustomerId { get; set; }
        public string CustomerFirstName { get; set; }
        public string CustomerLastName { get; set; }
        public int StartLocationLatitude { get; set; }
        public int StartLocationLongitude { get; set; }
        public int DestinationLocationLatitude { get; set; }
        public int DestinationLocationLongitude { get; set; }
        public string CourierId { get; set; }
        public string CourierFirstName { get; set; }
        public string CourierLastName { get; set; }
        public bool Accepted { get; set; }
        public bool Delivering { get; set; }
        public bool Delivered { get; set; }
    }
}
