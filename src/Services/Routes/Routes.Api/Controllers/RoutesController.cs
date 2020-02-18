using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Routes.Dal;
using Routes.Domain;

namespace Routes.Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class RoutesController : ControllerBase
    {
        private readonly IRoutesRepository _routesRepository;

        public RoutesController(IRoutesRepository routesRepository)
        {
            _routesRepository = routesRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<Route>> GetRoutes()
        {
            return await _routesRepository.GetRoutes().ConfigureAwait(false);
        }
    }
}