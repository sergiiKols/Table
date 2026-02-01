using DataManagementSystem.API.DTOs;
using DataManagementSystem.API.Models;
using DataManagementSystem.API.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace DataManagementSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataItemsController : ControllerBase
    {
        private readonly IDataItemRepository _repository;
        private readonly ILogger<DataItemsController> _logger;

        public DataItemsController(IDataItemRepository repository, ILogger<DataItemsController> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        /// <summary>
        /// Получить все элементы данных
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DataItemResponseDto>>> GetAll()
        {
            try
            {
                var items = await _repository.GetAllAsync();
                var response = items.Select(MapToResponseDto);
                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при получении всех элементов");
                return StatusCode(500, "Внутренняя ошибка сервера");
            }
        }

        /// <summary>
        /// Получить элемент по ID
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<DataItemResponseDto>> GetById(int id)
        {
            try
            {
                var item = await _repository.GetByIdAsync(id);
                if (item == null)
                {
                    return NotFound($"Элемент с ID {id} не найден");
                }

                return Ok(MapToResponseDto(item));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при получении элемента с ID {Id}", id);
                return StatusCode(500, "Внутренняя ошибка сервера");
            }
        }

        /// <summary>
        /// Получить отфильтрованные элементы
        /// </summary>
        [HttpGet("filter")]
        public async Task<ActionResult<IEnumerable<DataItemResponseDto>>> GetFiltered(
            [FromQuery] string? category,
            [FromQuery] bool? isActive,
            [FromQuery] string? searchTerm)
        {
            try
            {
                var items = await _repository.GetFilteredAsync(category, isActive, searchTerm);
                var response = items.Select(MapToResponseDto);
                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при фильтрации элементов");
                return StatusCode(500, "Внутренняя ошибка сервера");
            }
        }

        /// <summary>
        /// Создать новый элемент
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<DataItemResponseDto>> Create([FromBody] CreateDataItemDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var item = new DataItem
                {
                    Name = dto.Name,
                    Description = dto.Description,
                    Category = dto.Category,
                    Value = dto.Value,
                    IsActive = dto.IsActive
                };

                var createdItem = await _repository.CreateAsync(item);
                var response = MapToResponseDto(createdItem);

                return CreatedAtAction(nameof(GetById), new { id = createdItem.Id }, response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при создании элемента");
                return StatusCode(500, "Внутренняя ошибка сервера");
            }
        }

        /// <summary>
        /// Обновить существующий элемент
        /// </summary>
        [HttpPut("{id}")]
        public async Task<ActionResult<DataItemResponseDto>> Update(int id, [FromBody] UpdateDataItemDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var item = new DataItem
                {
                    Name = dto.Name,
                    Description = dto.Description,
                    Category = dto.Category,
                    Value = dto.Value,
                    IsActive = dto.IsActive
                };

                var updatedItem = await _repository.UpdateAsync(id, item);
                if (updatedItem == null)
                {
                    return NotFound($"Элемент с ID {id} не найден");
                }

                return Ok(MapToResponseDto(updatedItem));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при обновлении элемента с ID {Id}", id);
                return StatusCode(500, "Внутренняя ошибка сервера");
            }
        }

        /// <summary>
        /// Удалить элемент
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var result = await _repository.DeleteAsync(id);
                if (!result)
                {
                    return NotFound($"Элемент с ID {id} не найден");
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при удалении элемента с ID {Id}", id);
                return StatusCode(500, "Внутренняя ошибка сервера");
            }
        }

        // Helper method для маппинга
        private static DataItemResponseDto MapToResponseDto(DataItem item)
        {
            return new DataItemResponseDto
            {
                Id = item.Id,
                Name = item.Name,
                Description = item.Description,
                Category = item.Category,
                Value = item.Value,
                IsActive = item.IsActive,
                CreatedAt = item.CreatedAt,
                UpdatedAt = item.UpdatedAt
            };
        }
    }
}
