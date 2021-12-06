
import { useState } from "react";
import { Row, Col,Form, Button, Container } from "react-bootstrap";
import {getFirestore} from "../../firebase"
import { addDoc, collection } from "@firebase/firestore";
import "./Checkout.scss";


const Checkout = ({cart, totalValue}) => {

    const [buyer, setBuyer] = useState({
        buyerName:"",
        buyerEmail:"",
        buyerAdress:""
    });


	const fillBuyerInfo = (event) => {
		setBuyer({ ...buyer, [event.target.name]: event.target.value });
	};

    const db = getFirestore();
	const date = new Date();
	const purchaseDate = date.toLocaleDateString();

	const onHandleSubmit = (event) => {
		event.preventDefault();

		const newOrder = {
			buyer,
			items: [...cart],
            total: totalValue,
			purchaseDate,
		};

		const orders= collection(db, "orders");

		addDoc(orders, newOrder).then(({ id }) => {
			
		});
	};

    return(
        <Container className="form-container">
            <Form>
                <Form.Group className="form-group" controlId="formularioNombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Nombre Apellido" name="buyerName" onChange={fillBuyerInfo} required/>
                </Form.Group>
                <Row>
                    <Form.Group as={Col} className="form-group" controlId="formularioMail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="ejemplo@gmail.com" name="buyerEmail" onChange={fillBuyerInfo} required/>
                    </Form.Group>
                    <Form.Group as={Col} className="form-group" controlId="formularioMail">
                        <Form.Label>Confirmar email</Form.Label>
                        <Form.Control type="email" placeholder="ejemplo@gmail.com"  onChange={fillBuyerInfo} required/>
                    </Form.Group>
                </Row>
            
                <Form.Group className="form-group" controlId="formGridAddress1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="Dirección" name="buyerAdress" onChange={fillBuyerInfo} required/>
                </Form.Group>
            
                <Button variant="primary" type="submit" className="submit-btn" onClick={onHandleSubmit} >Finalizar compra</Button>
            </Form>
        </Container>
        
    );
};

export default Checkout;


