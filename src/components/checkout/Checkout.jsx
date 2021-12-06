
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { Row, Col,Form, Button, Container } from "react-bootstrap";
import {getFirestore} from "../../firebase"
import { addDoc, collection, updateDoc, doc } from "@firebase/firestore";
import "./Checkout.scss";


const Checkout = () => {

    const { cart, calculatePurchaseValue } = useCart();
    
    const[flag, setFlag]= useState(false);
    
    const [buyer, setBuyer] = useState({
        name:"",
        email:"",
        checkMail:"",
        adress:""
    });

    const[orderID, setOrderID]=useState(null);

    const date = new Date();
	
    const purchaseDate = date.toLocaleDateString();
    
    const newOrder = {
        buyer,
        items: [...cart],
        total: calculatePurchaseValue,
        purchaseDate,
    };

	const fillBuyerInfo = (event) => {
		setBuyer({ ...buyer, [event.target.name]: event.target.value });
	};

    const db = getFirestore();

	const onHandleSubmit = (event) => {

		const orders= collection(db, "orders");

        if(buyer.email===buyer.checkMail){
            addDoc(orders, newOrder).then(({ id }) => {
                setFlag(true);
                setOrderID(id);
            });
        }else{
            alert("Los mails no son iguales")
        }
		
        cart.forEach((item) => {
            updateDoc(doc( db, "items", item.id), {stock: item.stock - item.pickedQuantity});
        })

        
        event.preventDefault();
	};

    return(
        <Container className="form-container">

            {flag
            ?<div className="modal-purchase">
                <p>
                    {`Muchas gracias ${newOrder.buyer.name} por tu compra, tu orden es la ${orderID} por un valor de $${newOrder.total} para la dirección ${newOrder.buyer.adress}. Te enviamos la factura a ${newOrder.buyer.email}`}
                </p>
            </div>
            :
            <Form>
                <Form.Group className="form-group" controlId="formularioNombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control required type="text" placeholder="Nombre Apellido" name="name" onChange={fillBuyerInfo} />
                </Form.Group>
                <Row>
                    <Form.Group as={Col} className="form-group" controlId="formularioMail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="ejemplo@gmail.com" name="email" onChange={fillBuyerInfo} />
                    </Form.Group>
                    <Form.Group as={Col} className="form-group" controlId="formularioMail">
                        <Form.Label>Confirmar email</Form.Label>
                        <Form.Control type="email" placeholder="ejemplo@gmail.com" name="checkMail" onChange={fillBuyerInfo} />
                    </Form.Group>
                </Row>
            
                <Form.Group className="form-group" controlId="formGridAddress1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control required type="text" placeholder="Dirección" name="adress" onChange={fillBuyerInfo} />
                </Form.Group>
            
                <Button variant="primary" type="submit" className="submit-btn" onClick={onHandleSubmit} >Finalizar compra</Button>
            </Form>
            }
        </Container>
        
    );
};

export default Checkout;


