using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Deliverables.Dal;
using Deliverables.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Deliverables.Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DeliverablesController : ControllerBase
    {
        private readonly IDeliverablesRepository _deliverablesRepository;

        public DeliverablesController(IDeliverablesRepository deliverablesRepository)
        {
            _deliverablesRepository = deliverablesRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<Deliverable>> GetDeliverables()
        {
            return await _deliverablesRepository.GetDeliverables().ConfigureAwait(false);
        }
    }
}