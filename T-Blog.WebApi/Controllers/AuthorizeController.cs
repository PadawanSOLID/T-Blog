using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using T_Blog.WebApi.Models;

namespace T_Blog.WebApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthorizeController : ControllerBase
    {
        private readonly IOptionsSnapshot<JWTOption> _jwtOption;

        public AuthorizeController(IOptionsSnapshot<JWTOption> jwtOption)
        {
            _jwtOption = jwtOption;
        }

        [HttpPost]
        public IActionResult Login([FromBody]LoginData loginData)
        {
            string username = loginData.Mobile;
            List<Claim> claims = new()
            {
                new(ClaimTypes.Name, username),
                new(ClaimTypes.Role, "admin")
            };
            string key = _jwtOption.Value.SecKey;
            DateTime expire = DateTime.Now.AddHours(1);
            byte[] secBytes = Encoding.UTF8.GetBytes(key);
            var secKey = new SymmetricSecurityKey(secBytes);
            var credentials = new SigningCredentials(secKey, SecurityAlgorithms.HmacSha256Signature);
            var tokenDescriptor = new JwtSecurityToken(claims: claims, expires: expire, signingCredentials: credentials);
            string jwt = new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
            return Ok(jwt);
        }

        [HttpGet]
        [Authorize]
        public IActionResult Profile()
        {
            var name= this.User.FindFirst(ClaimTypes.Name).Value;
            return Ok(name);    
        }
    }
    public class LoginData
    {
        public string Mobile { get; set; }
        public string Valid { get; set; }
    }
}
