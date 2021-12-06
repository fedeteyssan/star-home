import "./Cart.scss";
import { useCart } from "../../context/CartContext";
import { Button, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import ItemCount from "../itemCount/ItemCount";

const Cart = () =>{

    const { cart, removeItem, clearCart } = useCart();

    const calculatePurchaseValue = cart.reduce((previousValue, currentValue) => previousValue + currentValue.pickedQuantity*currentValue.price,0);

    return (
        cart.length
        ?(
            <div className="cart-container">
                <h1>Productos seleccionados en el carrito</h1>
                <div className="cart-summary">
                    {cart.map((itemInCart) => {
                        return(
                            <Row key={itemInCart.id}>
                                <Col>
                                    <Image src={itemInCart.pictureURL} style={{width: "100px"}}/>
                                </Col>
                                <Col>
                                    <h2>{itemInCart.name}</h2>
                                    <p>{itemInCart.pickedQuantity} x $ {itemInCart.price}</p>
                                </Col>
                                <Col>
                                    <ItemCount item={itemInCart} />
                                </Col>
                                <Col>
                                    <Button onClick={()=>removeItem(itemInCart.id)}>Eliminar</Button>
                                </Col>
                            </Row>
                        );
                    })}

                    <p className="total-price">
                        <strong>TOTAL: $
                        {calculatePurchaseValue}
                        </strong>
                    </p>

                    <div className="cart-buttons">
                        <Button variant="danger" onClick={clearCart}>Vaciar carrito</Button>
					    <Link to="/checkout"><Button variant="success">Ir al checkout</Button></Link>
			        </div>
                </div>
            </div>
        ):
        <div className="empty-cart">
			<Row>
				<Col>
					<p>Buu, tu carrito está vacío 😔</p>
				</Col>
			</Row>
			<Row>
				<Col>
					<Link to="/">
						<Button variant="secondary"><strong>Buscar tus Wica!</strong></Button>
					</Link>
				</Col>
			</Row>
		</div>
    )
}
export default Cart;

