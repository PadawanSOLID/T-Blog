using SqlSugar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using T_Blog.Entity;

namespace T_Blog.Interfaces
{
    public interface IArticleService:IBaseService<Article>
    {
         ISqlSugarClient Context { get; }
    }
}
