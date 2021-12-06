import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./ItemCount.scss";
import { useCart } from "../../context/CartContext";


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
            alert("LLegaste al límite de unidades");
        };
        
    };
    
    
    
    //El ItemCount (hijo) recibe como parámetro onAdd del ItemDetail (padre) la función AddToCart, que ejecutará al hacer click en el botón de Añadir al carrito

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