using SqlSugar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace T_Blog.Entity
{
    public class BaseEntity
    {
        [SugarColumn(IsPrimaryKey = true,IsIdentity =true)]
        public int Id { get; set; }
    }
}
