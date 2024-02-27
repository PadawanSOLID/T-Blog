using SqlSugar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using T_Blog.Entity;
using T_Blog.Interfaces;

namespace T_Blog.Services
{
    public class BaseService<T> : SimpleClient<T>, IBaseService<T> where T : class, new()
    {
        public BaseService(ISqlSugarClient client) : base(client)
        {
            Context.DbMaintenance.CreateDatabase();
            Context.CodeFirst.InitTables<Article>();
            Context.CodeFirst.InitTables<User>();
        }
        public async Task<bool> CreateAsync(T entity)
        {
            return await base.InsertAsync(entity);
        }

        public async Task<bool> CreateAsync(T[] enumerable)
        {
            return await base.InsertRangeAsync(enumerable.ToArray());
        }

        public async Task<bool> DeleteByIdAsync(int id)
        {
            return await base.DeleteByIdAsync(id);
        }

        public async Task<bool> EditAsync(T entity)
        {
            return await base.UpdateAsync(entity);
        }

        public void ExecuteCommand(string cmd)
        {
            Context.Ado.ExecuteCommand(cmd);
        }

        public async Task<T> FindByIdAsync(int id)
        {
            return await base.GetByIdAsync(id);
        }

        public async Task<IEnumerable<T>> QueryAllAsync(CancellationToken? token = null)
        {
            return token is null ?
                await base.GetListAsync() :
                await base.GetListAsync(token.Value);
        }

        public async Task<IEnumerable<T>> QueryAsync(Expression<Func<T, bool>> expression)
        {
            return await base.GetListAsync(expression);
        }

        public async Task<IEnumerable<T>> QueryPageAsync(int page, int size, RefAsync<int> total)
        {
            return await base.Context.Queryable<T>().ToPageListAsync(page, size, total);
        }

        public async Task<IEnumerable<T>> QueryPageAsync(Expression<Func<T, bool>> expression, int page, int size, RefAsync<int> total)
        {
            return await base.Context.Queryable<T>().Where(expression).ToPageListAsync(page, size, total);
        }
    }
}
