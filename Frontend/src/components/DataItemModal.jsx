import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

const DataItemModal = ({ show, item, onHide, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    value: 0,
    isActive: true
  });

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || '',
        description: item.description || '',
        category: item.category || '',
        value: item.value || 0,
        isActive: item.isActive !== undefined ? item.isActive : true
      });
    } else {
      setFormData({
        name: '',
        description: '',
        category: '',
        value: 0,
        isActive: true
      });
    }
    setErrors({});
  }, [item, show]);

  const validate = () => {
    const newErrors = {};

    if (!formData.name || formData.name.trim() === '') {
      newErrors.name = 'Название обязательно для заполнения';
    } else if (formData.name.length > 200) {
      newErrors.name = 'Название не должно превышать 200 символов';
    }

    if (formData.description && formData.description.length > 1000) {
      newErrors.description = 'Описание не должно превышать 1000 символов';
    }

    if (!formData.category || formData.category.trim() === '') {
      newErrors.category = 'Категория обязательна для заполнения';
    } else if (formData.category.length > 100) {
      newErrors.category = 'Категория не должна превышать 100 символов';
    }

    if (formData.value < 0) {
      newErrors.value = 'Значение должно быть положительным';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Очистить ошибку для этого поля
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSaving(true);
    try {
      await onSave({
        ...formData,
        value: parseFloat(formData.value)
      });
    } catch (err) {
      console.error('Error saving:', err);
      setErrors({ submit: 'Ошибка при сохранении данных' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {item ? '✏️ Редактировать запись' : '➕ Добавить новую запись'}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {errors.submit && (
            <Alert variant="danger">{errors.submit}</Alert>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Название <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              isInvalid={!!errors.name}
              placeholder="Введите название"
              maxLength={200}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Описание</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              isInvalid={!!errors.description}
              placeholder="Введите описание (необязательно)"
              maxLength={1000}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              {formData.description.length}/1000 символов
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Категория <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              isInvalid={!!errors.category}
              placeholder="Введите категорию"
              maxLength={100}
            />
            <Form.Control.Feedback type="invalid">
              {errors.category}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Значение <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              name="value"
              value={formData.value}
              onChange={handleChange}
              isInvalid={!!errors.value}
              placeholder="Введите значение"
            />
            <Form.Control.Feedback type="invalid">
              {errors.value}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="switch"
              id="isActive"
              name="isActive"
              label="Активен"
              checked={formData.isActive}
              onChange={handleChange}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide} disabled={saving}>
            Отмена
          </Button>
          <Button variant="primary" type="submit" disabled={saving}>
            {saving ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default DataItemModal;
