import { Modal, Button, Form } from 'react-bootstrap';
import { categorias } from '../data';

const EditProductModal = ({ show, handleClose, product, handleEditChange, handleEditSubmit }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {product && (
          <Form onSubmit={handleEditSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del Producto</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={product.name}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                as="select"
                name="categoryId"
                value={product.categoryId}
                onChange={handleEditChange}
                required
              >
                <option value="">Selecciona una Categoría</option>
                {categorias.map(categoria => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nombre}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción del producto</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={product.description}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={product.quantity}
                onChange={handleEditChange}
                required
                min="0"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={product.price}
                onChange={handleEditChange}
                required
                min="0"
                step="0.01"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Guardar Cambios
            </Button>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default EditProductModal;
