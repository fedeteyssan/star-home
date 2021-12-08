import "./Cart.scss";
import { useCart } from "../../context/CartContext";
import { Button, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import ItemCount from "../itemCount/ItemCount";


const Cart = () =>{

    const { cart, removeItem, clearCart, calculatePurchaseValue } = useCart();

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
                                    <Image src={itemInCart.pictureURL} style={{width: "10rem"}}/>
                                </Col>
                                <Col>
                                    <h4>{itemInCart.name}</h4>
                                    <p>Precio: $ {itemInCart.price}</p>
                                </Col>
                                <Col>
                                    <ItemCount item={itemInCart} />
                                </Col>
                                <Col>
                                    <p>$ {itemInCart.pickedQuantity*itemInCart.price}</p>
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
            <p>¡Oh no... los jawas saquearon tu carrito! </p>
			<Link to="/">
				<button variant="secondary"><strong>Busca nuevos productos</strong></button>
			</Link>
		</div>
    )
}
export default Cart;

