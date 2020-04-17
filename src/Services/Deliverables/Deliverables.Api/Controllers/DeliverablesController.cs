using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Deliverables.Api.Services;
using Deliverables.Dal;
using Deliverables.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Deliverables.Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DeliverablesController : ControllerBase
    {
        private readonly IDeliverablesRepository _deliverablesRepository;
        private readonly IDeliverablesService _deliverablesService;

        public DeliverablesController(
            IDeliverablesRepository deliverablesRepository,
            IDeliverablesService deliverablesService)
        {
            _deliverablesRepository = deliverablesRepository;
            _deliverablesService = deliverablesService;
        }

        [Authorize]
        [HttpGet]
        public ActionResult<IEnumerable<Deliverable>> GetDeliverables()
        {
            string userId = User.FindFirst("Id").Value;
            string userRole = User.FindFirst("Role").Value;

            return _deliverablesService.GetDeliverables(userId, userRole).Result.ToArray();
        }

        [Authorize(Policy = "Customer")]
        [HttpPost("create")]
        public async Task CreateDeliverable([FromBody] Deliverable deliverable)
        {
            string customerId = User.FindFirst("Id").Value;
            string customerUserName = User.Identity.Name;

            await _deliverablesService.CreateDeliverable(deliverable, customerId, customerUserName);
        }

        [Authorize(Policy = "Courier")]
        [HttpPut("{id}")]
        public async Task UpdateDeliverable(string id, [FromBody] Deliverable deliverable)
        {
            await _deliverablesRepository.UpdateDeliverable(id, deliverable);
        }
    }
}