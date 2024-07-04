import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import useStore from '../store';
import ProductCard from '../components/product-card';
import EditProductModal from '../components/editProductModal';

const MyProductsPage = () => {
  const products = useStore((state) => state.products);
  const deleteProduct = useStore((state) => state.deleteProduct);
  const editProduct = useStore((state) => state.editProduct);

  const userId = 'usuario1'; 
  const userProducts = products.filter(product => product.userId === userId);

  const [showEditModal, setShowEditModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const handleEditClick = (product) => {
    setCurrentProduct(product);
    setShowEditModal(true);
  };

  const handleDeleteClick = (productId) => {
    deleteProduct(productId);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    editProduct(currentProduct);
    setShowEditModal(false);
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Mis Productos</h2>
      <Row>
        {userProducts.map(producto => (
          <Col key={producto.id} sm={12} md={6} lg={4} className="d-flex align-items-stretch mb-4">
            <ProductCard producto={producto} />
            <div className="d-flex flex-column">
              <Button variant="warning" className="mb-2" onClick={() => handleEditClick(producto)}>Editar</Button>
              <Button variant="danger" onClick={() => handleDeleteClick(producto.id)}>Eliminar</Button>
            </div>
          </Col>
        ))}
      </Row>

      <EditProductModal 
        show={showEditModal} 
        handleClose={() => setShowEditModal(false)} 
        product={currentProduct} 
        handleEditChange={handleEditChange} 
        handleEditSubmit={handleEditSubmit} 
      />
    </Container>
  );
};

export default MyProductsPage;
