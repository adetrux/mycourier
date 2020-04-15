using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Deliverables.Api.Requests
{
    public class UpdateDeliverable
    {
        public string Id { get; set; }
        public long CreatedTime { get; set; }
        public string Name { get; set; }
        public int Start { get; set; }
        public int End { get; set; }
        public bool Accepted { get; set; }
        public bool Delivering { get; set; }
        public bool Delivered { get; set; }
        public string CourierId { get; set; }
        public string CourierFirstName { get; set; }
        public string CourierLastName { get; set; }
    }
}
