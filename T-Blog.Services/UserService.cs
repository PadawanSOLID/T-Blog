using SqlSugar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using T_Blog.Entity;
using T_Blog.Interfaces;

namespace T_Blog.Services
{
    public class UserService : BaseService<User>, IUserService
    {
        public UserService(ISqlSugarClient client) : base(client)
        {
        }
    }
}
