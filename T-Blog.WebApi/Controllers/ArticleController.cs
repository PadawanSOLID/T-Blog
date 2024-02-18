using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using T_Blog.Entity;
using T_Blog.WebApi.Models;

namespace T_Blog.WebApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        IEnumerable<Channel> ChannelList { get; set; } = new List<Channel>()
        {
            new(0,"A"),
            new(1,"B"),
            new(2,"C"),
            new(3,"D"),
            new(4,"E"),
            new(5,"F"),
            new(6,"G"),
            new(7,"H"),
            new(8,"I"),
            new(9,"J")
        };
        [HttpGet]
        public IActionResult Channels()
        {
            return Ok(ChannelList);
        }
        public int Seed = 0;
        public List<Article> Articles { get; set; }

        [HttpPost]
        public IActionResult Create([FromBody] ArticleData articleData)
        {
            var article = new Article()
            {
                Channel_Id = articleData.Channel_Id,
                Title = articleData.Title,
                Content = articleData.Content,
                CoverType = articleData.Cover.Type,
                Images = articleData.Cover.Images
            };
            Articles.Add(article);
            Seed++;
            return Ok("Article Created!");
        }
    }
    public class ArticleData
    {
        public string Title { get; set; }
        public int Channel_Id { get; set; }
        public string Content { get; set; }
        public Cover Cover { get; set; }
    }
}
