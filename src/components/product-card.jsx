import { categorias } from "../data" 
import { Card, Button} from 'react-bootstrap'
function ProductCard({producto}){
  
  const {id,name,categoryId,userId,description,quantity,price,createdAt} = producto
  const productCategory = categorias.filter(categoria => categoria.id === categoryId) 
  console.log(productCategory)

  return (
    <Card className="h-100" style={{ width: '18rem', margin: '10px' }}>
      <Card.Body className="d-flex flex-column">
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <div className="mt-auto">
          <Card.Text>
            <strong>Precio: </strong>${price}
          </Card.Text>
          <Card.Text>
            <strong>Cantidad: </strong>{quantity}
          </Card.Text>
          <Button variant="primary">Ver Producto</Button>
        </div>
      </Card.Body>
    </Card>
  );
}




export default ProductCard;
