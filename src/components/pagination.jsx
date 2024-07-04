import { Pagination } from 'react-bootstrap';

const PaginationComponent = ({ totalPages, currentPage, onPageChange }) => {
  const items = [];

  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => onPageChange(number)}>
        {number}
      </Pagination.Item>,
    );
  }

  return (
    <Pagination>{items}</Pagination>
  );
};

export default PaginationComponent;