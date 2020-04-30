using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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
            string userId = GetUserId();
            string userUserName = GetUserName();
            string userRole = GetUserRole();

            return _deliverablesService.GetDeliverables(userId, userUserName, userRole).Result.ToArray();
        }

        [Authorize(Policy = "Courier")]
        [HttpGet("delivering")]
        public ActionResult<IEnumerable<string>> GetDeliveringToCustomerIds()
        {
            string courierUserName = GetUserName();

            return _deliverablesService.GetDeliveringToCustomerIds(courierUserName).Result.ToArray();
        }

        [Authorize(Policy = "Customer")]
        [HttpPost("create")]
        public async Task CreateDeliverable([FromBody] Deliverable deliverable)
        {
            string customerId = GetUserId();
            string customerUserName = GetUserName();

            await _deliverablesService.CreateDeliverable(deliverable, customerId, customerUserName);
        }

        [Authorize(Policy = "Courier")]
        [HttpPut("{id}")]
        public async Task UpdateDeliverable(string id, [FromBody] Deliverable deliverable)
        {
            string courierUserName = GetUserName();
            deliverable.CourierUserName = courierUserName;

            await _deliverablesRepository.UpdateDeliverable(id, deliverable);
        }

        private string GetUserId()
        {
            return User.FindFirst("Id").Value;
        }

        private string GetUserName()
        {
            return User.FindFirst(ClaimTypes.NameIdentifier).Value;
        }

        private string GetUserRole()
        {
            return User.FindFirst("Role").Value;
        }
    }
}