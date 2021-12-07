
import { useState } from "react";
import {useHistory} from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { Row, Col,Form, Button, Container } from "react-bootstrap";
import {getFirestore} from "../../firebase"
import { addDoc, collection, updateDoc, doc } from "@firebase/firestore";
import Swal from 'sweetalert2';
import "./Checkout.scss";


const Checkout = () => {

    const { cart, calculatePurchaseValue, clearCart } = useCart();
    const history = useHistory();
    
    const[flag, setFlag]= useState(false);
    
    const [buyer, setBuyer] = useState({
        name:"",
        email:"",
        emailCheck:"",
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

        event.preventDefault();

        const nameFormat = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
        const emailFormat = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        const adressFormat = /^[A-Za-z-0-99999999']/;

        if(buyer.name==="" || buyer.email==="" || buyer.emailCheck==="" || buyer.adress===""){
            Swal.fire("Por favor completar todos los datos")
        }else{
            if(!buyer.name.match(nameFormat)){
                Swal.fire("Por favor ingrese su nombre en un formato valido")
            }else{
                if(!buyer.email.match(emailFormat)){
                    Swal.fire("Por favor ingrese su email en un formato valido")
                }else{
                    if(buyer.email!==buyer.emailCheck){
                        Swal.fire("Los mails no son iguales")
                    }else{
                        if(!buyer.adress.match(adressFormat)){
                            Swal.fire("Por favor ingrese su dirección correctamente")
                        }else{
                            const orders= collection(db, "orders");
                            addDoc(orders, newOrder).then(({ id }) => {
                                setOrderID(id);
                            });
        
                            cart.forEach((item) => {
                                updateDoc(doc( db, "items", item.id), {stock: item.stock - item.pickedQuantity});
                            })

                            setFlag(true);
                        }
                    }
                }
            }
        }
        
	};

    const onHandleConfirm = () =>{
        history.push('/')
        clearCart();
    }

    return(
        <Container className="form-container">

            {flag
            ?<div className="modal-purchase">
                <p>
                    {`Muchas gracias ${newOrder.buyer.name} por tu compra, tu orden es la ${orderID} por un valor de $${newOrder.total} para la dirección ${newOrder.buyer.adress}. Te enviamos la factura a ${newOrder.buyer.email}`}
                </p>
                <button onClick={onHandleConfirm}> Adios y que la fuerza te acompañe</button>
            </div>
            :
            <Form>
                <Form.Group className="form-group" controlId="formularioNombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Nombre Apellido" name="name" onChange={fillBuyerInfo} required />
                </Form.Group>
                <Row>
                    <Form.Group as={Col} className="form-group" controlId="formularioMail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="ejemplo@gmail.com" name="email" onChange={fillBuyerInfo} required/>
                    </Form.Group>
                    <Form.Group as={Col} className="form-group" controlId="formularioMail">
                        <Form.Label>Confirmar email</Form.Label>
                        <Form.Control type="email" placeholder="ejemplo@gmail.com" name="emailCheck" onChange={fillBuyerInfo} required/>
                    </Form.Group>
                </Row>
            
                <Form.Group className="form-group" controlId="formGridAddress1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="Dirección" name="adress" onChange={fillBuyerInfo} required/>
                </Form.Group>
            
                <Button variant="primary" type="submit" className="submit-btn" onClick={onHandleSubmit} >Finalizar compra</Button>
            </Form>
            }
        </Container>
        
    );
};

export default Checkout;


