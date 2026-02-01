import React from 'react';
import { Table, Button, Badge, Spinner } from 'react-bootstrap';

const DataTable = ({ items, loading, onEdit, onDelete }) => {
  if (loading) {
    return (
      <div className="loading-spinner">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Загрузка...</span>
        </Spinner>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📋</div>
        <h4>Нет данных для отображения</h4>
        <p>Добавьте новую запись, нажав кнопку "Добавить" выше</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatValue = (value) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB'
    }).format(value);
  };

  return (
    <div className="table-responsive">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ width: '5%' }}>ID</th>
            <th style={{ width: '20%' }}>Название</th>
            <th style={{ width: '25%' }}>Описание</th>
            <th style={{ width: '12%' }}>Категория</th>
            <th style={{ width: '12%' }}>Значение</th>
            <th style={{ width: '8%' }}>Статус</th>
            <th style={{ width: '13%' }}>Дата создания</th>
            <th style={{ width: '15%' }}>Действия</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} onDoubleClick={() => onEdit(item)} style={{ cursor: 'pointer' }}>
              <td>{item.id}</td>
              <td><strong>{item.name}</strong></td>
              <td>{item.description || '-'}</td>
              <td>
                <Badge bg="info">{item.category}</Badge>
              </td>
              <td>{formatValue(item.value)}</td>
              <td>
                <Badge bg={item.isActive ? 'success' : 'secondary'}>
                  {item.isActive ? 'Активен' : 'Неактивен'}
                </Badge>
              </td>
              <td className="text-muted small">{formatDate(item.createdAt)}</td>
              <td>
                <div className="action-buttons">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => onEdit(item)}
                    title="Редактировать"
                  >
                    ✏️ Изменить
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => onDelete(item.id)}
                    title="Удалить"
                  >
                    🗑️ Удалить
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="text-muted mt-3">
        <small>Всего записей: {items.length}</small>
        <br />
        <small>💡 Совет: дважды кликните по строке для быстрого редактирования</small>
      </div>
    </div>
  );
};

export default DataTable;
