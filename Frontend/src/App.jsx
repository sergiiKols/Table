import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import DataTable from './components/DataTable';
import DataItemModal from './components/DataItemModal';
import FilterBar from './components/FilterBar';
import { dataService } from './services/dataService';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    isActive: '',
    searchTerm: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await dataService.getAll();
      setItems(data);
    } catch (err) {
      setError('Ошибка при загрузке данных: ' + err.message);
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = async (newFilters) => {
    setFilters(newFilters);
    try {
      setLoading(true);
      setError(null);
      const data = await dataService.getFiltered(
        newFilters.category || null,
        newFilters.isActive === '' ? null : newFilters.isActive === 'true',
        newFilters.searchTerm || null
      );
      setItems(data);
    } catch (err) {
      setError('Ошибка при фильтрации данных: ' + err.message);
      console.error('Error filtering data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingItem(null);
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Вы уверены, что хотите удалить этот элемент?')) {
      return;
    }

    try {
      await dataService.delete(id);
      await loadData();
    } catch (err) {
      setError('Ошибка при удалении: ' + err.message);
      console.error('Error deleting item:', err);
    }
  };

  const handleSave = async (formData) => {
    try {
      if (editingItem) {
        await dataService.update(editingItem.id, formData);
      } else {
        await dataService.create(formData);
      }
      setShowModal(false);
      await loadData();
    } catch (err) {
      setError('Ошибка при сохранении: ' + err.message);
      console.error('Error saving item:', err);
      throw err;
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingItem(null);
  };

  return (
    <div className="app-container">
      <Container fluid>
        <div className="header">
          <h1>Система Управления Данными</h1>
          <p className="mb-0">Универсальная платформа для управления записями</p>
        </div>

        <div className="main-content">
          <FilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            onAdd={handleAdd}
            onRefresh={loadData}
          />

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <DataTable
            items={items}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        <DataItemModal
          show={showModal}
          item={editingItem}
          onHide={handleCloseModal}
          onSave={handleSave}
        />
      </Container>
    </div>
  );
}

export default App;
