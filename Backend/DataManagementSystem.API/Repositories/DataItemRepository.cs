using DataManagementSystem.API.Data;
using DataManagementSystem.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DataManagementSystem.API.Repositories
{
    /// <summary>
    /// Репозиторий для работы с DataItem, реализует паттерн Repository
    /// </summary>
    public class DataItemRepository : IDataItemRepository
    {
        private readonly ApplicationDbContext _context;

        public DataItemRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<DataItem>> GetAllAsync()
        {
            return await _context.DataItems
                .OrderByDescending(x => x.CreatedAt)
                .ToListAsync();
        }

        public async Task<DataItem?> GetByIdAsync(int id)
        {
            return await _context.DataItems.FindAsync(id);
        }

        public async Task<IEnumerable<DataItem>> GetFilteredAsync(string? category, bool? isActive, string? searchTerm)
        {
            var query = _context.DataItems.AsQueryable();

            if (!string.IsNullOrWhiteSpace(category))
            {
                query = query.Where(x => x.Category == category);
            }

            if (isActive.HasValue)
            {
                query = query.Where(x => x.IsActive == isActive.Value);
            }

            if (!string.IsNullOrWhiteSpace(searchTerm))
            {
                query = query.Where(x => 
                    x.Name.Contains(searchTerm) || 
                    (x.Description != null && x.Description.Contains(searchTerm)));
            }

            return await query
                .OrderByDescending(x => x.CreatedAt)
                .ToListAsync();
        }

        public async Task<DataItem> CreateAsync(DataItem item)
        {
            item.CreatedAt = DateTime.UtcNow;
            _context.DataItems.Add(item);
            await _context.SaveChangesAsync();
            return item;
        }

        public async Task<DataItem?> UpdateAsync(int id, DataItem item)
        {
            var existingItem = await _context.DataItems.FindAsync(id);
            if (existingItem == null)
            {
                return null;
            }

            existingItem.Name = item.Name;
            existingItem.Description = item.Description;
            existingItem.Category = item.Category;
            existingItem.Value = item.Value;
            existingItem.IsActive = item.IsActive;
            existingItem.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return existingItem;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var item = await _context.DataItems.FindAsync(id);
            if (item == null)
            {
                return false;
            }

            _context.DataItems.Remove(item);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ExistsAsync(int id)
        {
            return await _context.DataItems.AnyAsync(x => x.Id == id);
        }
    }
}
