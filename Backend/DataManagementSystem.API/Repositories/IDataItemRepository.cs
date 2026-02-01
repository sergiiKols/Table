using DataManagementSystem.API.Models;

namespace DataManagementSystem.API.Repositories
{
    /// <summary>
    /// Интерфейс репозитория для работы с DataItem
    /// </summary>
    public interface IDataItemRepository
    {
        Task<IEnumerable<DataItem>> GetAllAsync();
        Task<DataItem?> GetByIdAsync(int id);
        Task<IEnumerable<DataItem>> GetFilteredAsync(string? category, bool? isActive, string? searchTerm);
        Task<DataItem> CreateAsync(DataItem item);
        Task<DataItem?> UpdateAsync(int id, DataItem item);
        Task<bool> DeleteAsync(int id);
        Task<bool> ExistsAsync(int id);
    }
}
