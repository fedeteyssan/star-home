import React from "react";
import "./CartWidget.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../../context/CartContext";


const CartWidget = () => {

    const{ cart } = useCart();
    const reducer = (previousValue, currentValue) => previousValue + currentValue.pickedQuantity;

    const unitsInCart = cart.reduce(reducer,0);

    return (
        <div className="cart-widget">
            <FontAwesomeIcon icon={faShoppingBasket} style={{fontSize:"2.5rem", color:"white"}} />
            <span>{unitsInCart}</span>
        </div>
    )
}
export default CartWidget;