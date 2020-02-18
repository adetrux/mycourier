using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Routes.Domain
{
    [Owned]
    public class Location
    {
        public int Latitude { get; set; }
        public int Longitude { get; set; }
    }
}
