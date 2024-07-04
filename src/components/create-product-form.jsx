import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { categorias } from '../data'
import useStore from '../store';




const CreateProductForm = () => {
  const [product, setProduct] = useState({
    id:'',
    name: '',
    userId:'usuario1',
    categoryId: '',
    description: '',
    quantity: 0,
    price: 0,
    createdAt:'',
    updatedAt:''
  });
  
  const [errors, setErrors] = useState({});
  const addProduct = useStore((state) => state.addProduct);

  const validateForm = () => {
    let formErrors = {};
    if (!product.name) formErrors.name = 'El nombre es requerido';
    if (!product.categoryId) formErrors.categoryId = 'La categoría es requerida';
    if (!product.description) formErrors.description = 'La descripción es requerida';
    if (product.quantity < 0) formErrors.quantity = 'La cantidad no puede ser negativa';
    if (product.price < 0) formErrors.price = 'El precio no puede ser negativo';
    return formErrors;
  };



  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const newProduct = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    addProduct(newProduct);
    setProduct({
      id: '',
      name: '',
      categoryId: '',
      description: '',
      quantity: 0,
      price: 0,
      createdAt: '',
      updatedAt: ''
    });
    setErrors({});
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Crear Producto Nuevo</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre del Producto</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Categoría</Form.Label>
          <Form.Control
            as="select"
            name="categoryId"
            value={product.categoryId}
            onChange={handleChange}
            required
            isInvalid={!!errors.categoryId}
          >
            <option value="">Selecciona una Categoría</option>
            {categorias.map(categoria => (
              <option value={categoria.id} key={categoria.id}>{categoria.nombre}</option>
            ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid">{errors.categoryId}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Descripción del producto</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={product.description}
            onChange={handleChange}
            required
            isInvalid={!!errors.description}
          />
          <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Cantidad</Form.Label>
          <Form.Control
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            required
            min="0"
            isInvalid={!!errors.quantity}
          />
          <Form.Control.Feedback type="invalid">{errors.quantity}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            isInvalid={!!errors.price}
          />
          <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Crear Producto
        </Button>
      </Form>
    </Container>
  );
};
export default CreateProductForm;
