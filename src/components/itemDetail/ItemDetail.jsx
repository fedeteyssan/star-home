import ItemCount from "../itemCount/ItemCount";
import { Card, Button, Row, Col} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ItemDetail.scss";
import { useCart } from "../../context/CartContext";


const ItemDetail = ({item}) => {

    const { cart } = useCart();
    const itemInCart = cart.find((product)=> product.id===item.id);

    return (
		<Card key={item.id} style={{ width: "50rem", marginTop:"10rem", padding:"2rem", border:"solid #ffb11f"}}>
            <Row>
                <Col>
                    <Card.Img variant="top" src={item.pictureURL} style={{width: "200px"}}/>
                </Col>
                <Col>
                    <Card.Body style={{height:"30rem", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"space-around"}}>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text style={{textAlign:"center"}}>
                            {item.description}
                            <br/><br/>
                            $ {item.price}
                        </Card.Text>
                            <ItemCount item={item} /> 
                            {itemInCart? 
                            <>
                                <div>
                                    <div className="card-buttons">
                                        <Link to="/cart"><Button variant="primary">Ver carrito </Button></Link>
                                        <Link to="/"><Button variant="primary">Seguir comprando </Button></Link>
                                    </div>
                                </div>
                            </>
                            :<></>
                            } 
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    )
};

export default ItemDetail;
