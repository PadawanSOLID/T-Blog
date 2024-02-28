using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SqlSugar;
using T_Blog.Entity;
using T_Blog.Interfaces;
using T_Blog.WebApi.Models;

namespace T_Blog.WebApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        public List<int> WillNew { get; set; } = new();
        public List<int> WontNew { get; set; }


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

        [HttpGet]
        public async Task<IActionResult> Articles(string status = null, string channel_id = null, string begin_pubdate = null, string end_pubdate = null, int page = 1, int per_page = 4)
        {
           // var a =await _articleService.QueryAllAsync();
            var query = sqlSugarClient.Queryable<Article>()
             .WhereIF(status != null, n => n.Status == int.Parse(status))
             .WhereIF(channel_id != null, n => n.Channel_Id == int.Parse(channel_id))
             .WhereIF(begin_pubdate != null, n => DateTime.Parse(n.CreateTime) > DateTime.Parse(begin_pubdate))
             .WhereIF(end_pubdate != null, n => DateTime.Parse(n.CreateTime) > DateTime.Parse(end_pubdate)).ToPageList(page, per_page); 

            return Ok(query);
        }
    

        private readonly IArticleService _articleService;
        private readonly ISqlSugarClient sqlSugarClient;

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ArticleData articleData)
        {
            var article = new Article()
            {
                Status = 1,
                Channel_Id = articleData.Channel_Id,
                Title = articleData.Title,
                Content = articleData.Content,
                CoverType = articleData.Cover.Type,
                Images = string.Join(";", articleData.Cover.Images),
                CreateTime = DateTime.Now.ToString(),
            };
            var r = await _articleService.CreateAsync(article);
            if (r)
            {
                return Ok("Article Created!");
            }
            else
            {
                return BadRequest("Failed to create!");
            }

        }
        public ArticleController(IArticleService articleService,ISqlSugarClient sqlSugarClient)
        {
            this._articleService = articleService;
            this.sqlSugarClient = sqlSugarClient;
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
