import "./ItemCount.scss";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useCart } from "../../context/CartContext";
import Swal from 'sweetalert2';


const ItemCount = ({item}) => {

    const {cart,addItem,removeItem} = useCart();

    const itemInCart = cart.find((product)=> product.id===item.id);
    const initial = itemInCart? itemInCart.pickedQuantity:1;

    const [counter,setCounter] = useState(initial);
    const [flag, setFlag] =useState(false);

    const onDecrease = () =>{
        if(counter>1){
            setCounter(counter-1);
            addItem(item,-1)
        }else{
            setFlag(false);
            removeItem(item.id)
        };
    };

    const onIncrease = () =>{
        if((counter<item.stock) ){
            setCounter(counter+1);
            addItem(item,1)
        }else{
            Swal.fire("LLegaste al límite de unidades");
        };
        
    };
    
    
    return (

        <div className="add-quantity">
            
            {(flag || itemInCart)
            ?
            <div className="counter">
               <button onClick={onDecrease}>-</button>
               <p>{counter}</p>
               <button onClick={onIncrease}>+</button>
            </div>
            :<Button variant="primary" onClick={()=> {addItem(item,1);setFlag(true)}}>Añadir al carrito</Button>
            }
        </div>
    )
}
export default ItemCount;