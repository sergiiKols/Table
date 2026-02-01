using DataManagementSystem.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DataManagementSystem.API.Data
{
    /// <summary>
    /// Контекст базы данных для Entity Framework Core
    /// </summary>
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<DataItem> DataItems { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Конфигурация таблицы DataItems
            modelBuilder.Entity<DataItem>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Description).HasMaxLength(1000);
                entity.Property(e => e.Category).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Value).HasColumnType("decimal(18,2)");
                // PostgreSQL функция для текущего времени
                // Для SQL Server используйте: GETUTCDATE()
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("NOW()");

                // Создание индексов для оптимизации поиска
                entity.HasIndex(e => e.Category);
                entity.HasIndex(e => e.IsActive);
                entity.HasIndex(e => e.CreatedAt);
            });

            // Seed данные для тестирования
            modelBuilder.Entity<DataItem>().HasData(
                new DataItem
                {
                    Id = 1,
                    Name = "Пример записи 1",
                    Description = "Это первая тестовая запись в системе",
                    Category = "Тестовая",
                    Value = 100.50m,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                },
                new DataItem
                {
                    Id = 2,
                    Name = "Пример записи 2",
                    Description = "Вторая тестовая запись для демонстрации",
                    Category = "Демо",
                    Value = 250.75m,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                },
                new DataItem
                {
                    Id = 3,
                    Name = "Пример записи 3",
                    Description = "Третья запись с другой категорией",
                    Category = "Тестовая",
                    Value = 50.00m,
                    IsActive = false,
                    CreatedAt = DateTime.UtcNow
                }
            );
        }
    }
}
