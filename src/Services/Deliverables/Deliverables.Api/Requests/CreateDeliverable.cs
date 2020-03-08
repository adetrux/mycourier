using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Deliverables.Api.Requests
{
    public class CreateDeliverable
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int Start { get; set; }
        public int End { get; set; }
        public bool Accepted { get; set; }
        public bool Delivering { get; set; }
        public bool Delivered { get; set; }
    }
}
