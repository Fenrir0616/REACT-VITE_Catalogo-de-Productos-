import React, { useState } from 'react';
const Sidebar = ({ categories, onFilter }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleFilter = () => {
    onFilter({ category: selectedCategory, minPrice, maxPrice });
  };

  return (
    <div className="border-right ps-0" id="sidebar-wrapper">
      <div className="sidebar-heading">Filtrar Productos</div>
      <div className="list-group list-group-flush">
        <div className="list-group-item">
          <label htmlFor="category">Categoría</label>
          <select
            className="form-control"
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Todos</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="list-group-item">
          <label htmlFor="minPrice">Precio Mínimo</label>
          <input
            type="number"
            className="form-control"
            id="minPrice"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>
        <div className="list-group-item">
          <label htmlFor="maxPrice">Precio Máximo</label>
          <input
            type="number"
            className="form-control"
            id="maxPrice"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        <div className="list-group-item">
          <button className="btn btn-primary btn-block" onClick={handleFilter}>
            Aplicar filtros
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
