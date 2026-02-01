using System.ComponentModel.DataAnnotations;

namespace DataManagementSystem.API.DTOs
{
    /// <summary>
    /// DTO для создания нового элемента данных
    /// </summary>
    public class CreateDataItemDto
    {
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
    }

    /// <summary>
    /// DTO для обновления элемента данных
    /// </summary>
    public class UpdateDataItemDto
    {
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

        public bool IsActive { get; set; }
    }

    /// <summary>
    /// DTO для ответа с данными элемента
    /// </summary>
    public class DataItemResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string Category { get; set; } = string.Empty;
        public decimal Value { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
