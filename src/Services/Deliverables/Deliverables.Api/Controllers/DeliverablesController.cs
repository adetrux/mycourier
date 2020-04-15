using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Deliverables.Api.Requests;
using Deliverables.Dal;
using Deliverables.Domain;
using Microsoft.AspNetCore.Authorization;
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

        [Authorize]
        [HttpGet]
        public ActionResult<IEnumerable<Deliverable>> GetDeliverables()
        {
            return _deliverablesRepository.GetDeliverables().Result.ToArray();
        }

        [Authorize(Policy = "Customer")]
        [HttpPost("create")]
        public async Task CreateDeliverable([FromBody] Deliverable deliverable)
        {
            await _deliverablesRepository.CreateDeliverable(deliverable);
        }

        [Authorize(Policy = "Courier")]
        [HttpPut("{id}")]
        public async Task UpdateDeliverable(string id, [FromBody] Deliverable deliverable)
        {
            await _deliverablesRepository.UpdateDeliverable(id, deliverable);
        }
    }
}