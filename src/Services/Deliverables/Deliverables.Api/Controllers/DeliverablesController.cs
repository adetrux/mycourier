using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Deliverables.Api.Requests;
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
        public ActionResult<IEnumerable<Deliverable>> GetDeliverables()
        {
            return _deliverablesRepository.GetDeliverables().Result.ToArray();
        }

        [HttpPost("create")]
        public async Task CreateDeliverable([FromBody] CreateDeliverable createDeliverable)
        {
            Deliverable deliverable = Mapper.Mapper.CreateDeliverableToDeliverable(createDeliverable);
            await _deliverablesRepository.CreateDeliverable(deliverable);
        }
    }
}