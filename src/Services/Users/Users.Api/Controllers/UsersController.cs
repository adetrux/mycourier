using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Users.Api.Requests;
using Users.Dal;
using Users.Domain;

namespace Users.Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUsersRepository _usersRepository;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _configuration;

        public UsersController(
            IUsersRepository usersRepository,
            UserManager<ApplicationUser> userManager,
            IConfiguration configuration)
        {
            _usersRepository = usersRepository;
            _userManager = userManager;
            _configuration = configuration;
        }

        [HttpGet]
        public async Task<IEnumerable<ApplicationUser>> GetUsers()
        {
            return await _usersRepository.GetUsers().ConfigureAwait(false);
        }

        [Route("login")]
        [HttpPost]
        public async Task<ActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user != null && await _userManager.CheckPasswordAsync(user, request.Password))
            {
                var claims = new[] {
                    new Claim("Id", user.Id),
                    new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim("IsCourier", _userManager.IsInRoleAsync(user, "Courier").Result.ToString())
                };
                var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:SigningKey"]));

                int expiryInMinutes = Convert.ToInt32(_configuration["Jwt:ExpiryInMinutes"]);

                var token = new JwtSecurityToken(
                    issuer: _configuration["Jwt:Site"],
                    audience: _configuration["Jwt:Site"],
                    expires: DateTime.UtcNow.AddMinutes(expiryInMinutes),
                    claims: claims,
                    signingCredentials: new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256)
                );

                return Ok(
                    new
                    {
                        token = new JwtSecurityTokenHandler().WriteToken(token),
                        expiration = token.ValidTo,
                        isCourier = _userManager.IsInRoleAsync(user, "Courier").Result.ToString()
                    }
                );
            }
            return Unauthorized();
        }
    }
}