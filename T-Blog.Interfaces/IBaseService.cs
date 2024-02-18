using SqlSugar;
using System.Linq.Expressions;

namespace T_Blog.Interfaces
{
    public interface IBaseService<T> where T : class,new()
    {
        Task<bool> CreateAsync(T entity);

        Task<bool> CreateAsync(T[] enumerable);

        Task<bool> DeleteByIdAsync(int id);

        Task<bool> EditAsync(T entity);

        Task<T> FindByIdAsync(int id);

        Task<IEnumerable<T>> QueryAsync(Expression<Func<T, bool>> expression);

        Task<IEnumerable<T>> QueryAllAsync(CancellationToken? token = default);

        Task<IEnumerable<T>> QueryPageAsync(int page, int size, RefAsync<int> total);

        Task<IEnumerable<T>> QueryPageAsync(Expression<Func<T, bool>> expression, int page, int size, RefAsync<int> total);

        void ExecuteCommand(string cmd);
    }
}