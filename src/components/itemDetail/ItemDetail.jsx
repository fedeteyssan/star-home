import ItemCount from "../itemCount/ItemCount";
import { Button,} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ItemDetail.scss";
import { useCart } from "../../context/CartContext";


const ItemDetail = ({item}) => {

    const { cart } = useCart();
    const itemInCart = cart.find((product)=> product.id===item.id);

    return (
		<div className="item-detail-card"key={item.id}>
            <img className="detail-img" alt="" variant="top" src={item.pictureURL}/>
            <div className="detail-body">
                <h2>{item.name}</h2>
                <p>
                    {item.description}
                    <br/><br/>
                    Precio: $ {item.price}
                    <br/><br/>
                    Stock: {item.stock} u
                </p>
                <ItemCount item={item} /> 
                {itemInCart? 
                    <>
                        <div>
                            <div className="card-buttons">
                                <Link to="/"><Button variant="danger">Seguir comerciando </Button></Link>
                                <Link to="/cart"><Button variant="danger">Ver carrito espacial</Button></Link>
                            </div>
                        </div>
                    </>
                    :<></>
                } 
                </div>
        </div>
    )
};

export default ItemDetail;
