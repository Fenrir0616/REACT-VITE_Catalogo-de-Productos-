import { useState, useEffect} from 'react';
import ProductCard from '../components/product-card';
import Sidebar from '../components/sidebar';
import PaginationComponent from '../components/pagination';
import { Container, Row, Col } from 'react-bootstrap';
import useStore from '../store';

const HomePage = ({ categories }) => {
  const products = useStore((state) => state.products); 
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filters, setFilters] = useState({ category: '', minPrice: '', maxPrice: '' });

  // Filtrar productos
  useEffect(() => {
    const filterProducts = () => {
      let newFilteredProducts = products;

      if (filters.category) {
        newFilteredProducts = newFilteredProducts.filter(
          (product) => product.categoryId === parseInt(filters.category)
        );
      }

      if (filters.minPrice) {
        newFilteredProducts = newFilteredProducts.filter(
          (product) => product.price >= parseFloat(filters.minPrice)
        );
      }

      if (filters.maxPrice) {
        newFilteredProducts = newFilteredProducts.filter(
          (product) => product.price <= parseFloat(filters.maxPrice)
        );
      }

      setFilteredProducts(newFilteredProducts);
    };

    filterProducts();
  }, [products, filters]);

  const handleFilter = (filters) => {
    setFilters(filters);
    setCurrentPage(1);
  };

  // Calcular el ídx 
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);



  return (
    <Container fluid>
      <h1 className='text-center w-100'>Todos los productos</h1>
      <Row className="g-0">
        <Col md={3}>
          <Sidebar categories={categories} onFilter={handleFilter} />
        </Col>
        <Col md={9} className="p-3">
          <Row>
            {currentProducts.map(producto => (
              <Col key={producto.id} sm={12} md={6} lg={4} className="d-flex align-items-stretch mb-4">
                <ProductCard producto={producto} />
              </Col>
            ))}
          </Row>
          <PaginationComponent 
            totalPages={totalPages} 
            currentPage={currentPage} 
            onPageChange={setCurrentPage} 
          />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
