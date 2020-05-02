using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;
using Tracking.Api.Model;

namespace Tracking.Api.Controllers
{
    [Route("tracking/[controller]")]
    [ApiController]
    public class LocationsController : ControllerBase
    {
        private readonly IMemoryCache _memoryCache;
        private readonly IDistributedCache _distributedCache;

        public LocationsController(IMemoryCache memoryCache, IDistributedCache distributedCache)
        {
            _memoryCache = memoryCache;
            _distributedCache = distributedCache;
        }

        [Authorize]
        [HttpGet]
        public ActionResult<Location> GetLocation()
        {
            string userUserName = GetUserName();

            //if (!_memoryCache.TryGetValue(userUserName, out Location location))
            //{
            //    location = new Location();
            //}

            //return location;

            Location location;
            string serializedLocation;

            byte[] encodedLocation = _distributedCache.GetAsync(userUserName).Result;

            if (encodedLocation != null)
            {
                serializedLocation = Encoding.UTF8.GetString(encodedLocation);
                location = JsonConvert.DeserializeObject<Location>(serializedLocation);
            }
            else
            {
                location = new Location();
            }

            return location;
        }

        [Authorize]
        [HttpPut]
        public async Task SetLocation([FromBody] Location location)
        {
            string userUserName = GetUserName();

            //_memoryCache.Set(userUserName, location);

            string serializedLocation = JsonConvert.SerializeObject(location);
            byte[] encodedLocation = Encoding.UTF8.GetBytes(serializedLocation);

            await _distributedCache.SetAsync(userUserName, encodedLocation);
        }

        private string GetUserName()
        {
            return User.FindFirst(ClaimTypes.NameIdentifier).Value;
        }
    }
}