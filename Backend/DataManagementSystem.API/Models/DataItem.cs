using System.ComponentModel.DataAnnotations;

namespace DataManagementSystem.API.Models
{
    /// <summary>
    /// Универсальная модель данных для управления записями
    /// </summary>
    public class DataItem
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Название обязательно для заполнения")]
        [StringLength(200, ErrorMessage = "Название не должно превышать 200 символов")]
        public string Name { get; set; } = string.Empty;

        [StringLength(1000, ErrorMessage = "Описание не должно превышать 1000 символов")]
        public string? Description { get; set; }

        [Required(ErrorMessage = "Категория обязательна для заполнения")]
        [StringLength(100, ErrorMessage = "Категория не должна превышать 100 символов")]
        public string Category { get; set; } = string.Empty;

        [Range(0, double.MaxValue, ErrorMessage = "Значение должно быть положительным")]
        public decimal Value { get; set; }

        public bool IsActive { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }
    }
}
