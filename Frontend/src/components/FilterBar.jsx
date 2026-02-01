import React, { useState } from 'react';
import { Button, Form, InputGroup, Row, Col } from 'react-bootstrap';

const FilterBar = ({ filters, onFilterChange, onAdd, onRefresh }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleApplyFilters = () => {
    onFilterChange(localFilters);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      category: '',
      isActive: '',
      searchTerm: ''
    };
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleApplyFilters();
    }
  };

  return (
    <div className="action-bar">
      <div className="d-flex gap-2">
        <Button variant="primary" onClick={onAdd}>
          ➕ Добавить
        </Button>
        <Button variant="outline-secondary" onClick={onRefresh}>
          🔄 Обновить
        </Button>
      </div>

      <div className="filter-section flex-grow-1">
        <Row className="g-2 align-items-center w-100">
          <Col xs={12} md={4}>
            <InputGroup size="sm">
              <InputGroup.Text>🔍</InputGroup.Text>
              <Form.Control
                type="text"
                name="searchTerm"
                placeholder="Поиск по названию или описанию..."
                value={localFilters.searchTerm}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
              />
            </InputGroup>
          </Col>

          <Col xs={6} md={2}>
            <Form.Select
              size="sm"
              name="category"
              value={localFilters.category}
              onChange={handleInputChange}
            >
              <option value="">Все категории</option>
              <option value="Тестовая">Тестовая</option>
              <option value="Демо">Демо</option>
              <option value="Рабочая">Рабочая</option>
              <option value="Архив">Архив</option>
            </Form.Select>
          </Col>

          <Col xs={6} md={2}>
            <Form.Select
              size="sm"
              name="isActive"
              value={localFilters.isActive}
              onChange={handleInputChange}
            >
              <option value="">Все статусы</option>
              <option value="true">Активные</option>
              <option value="false">Неактивные</option>
            </Form.Select>
          </Col>

          <Col xs={12} md={4}>
            <div className="d-flex gap-2">
              <Button
                variant="success"
                size="sm"
                onClick={handleApplyFilters}
                className="flex-grow-1"
              >
                Применить
              </Button>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={handleResetFilters}
              >
                Сбросить
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default FilterBar;
