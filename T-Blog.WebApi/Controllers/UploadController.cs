using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
namespace T_Blog.WebApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> UploadCovers()
        {
            var file = Request.Form.Files.FirstOrDefault();
            if (file != null)
            { 
                var path =AppContext.BaseDirectory+ $"Covers\\{Guid.NewGuid().ToString()}" ;
                var fs = new FileStream(path, FileMode.Create);
                await fs.CopyToAsync(fs);
                return Ok(path);
            }
            return NotFound("No file!");
            
        }
    }
}
