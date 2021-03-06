import "./CartWidget.scss";
import React from "react";
import { useCart } from "../../context/CartContext";
import cartIcon from "../../assets/cart.png";



const CartWidget = () => {

    const{ cart } = useCart();
    const reducer = (previousValue, currentValue) => previousValue + currentValue.pickedQuantity;

    const unitsInCart = cart.reduce(reducer,0);

    return (
        <div className="cart-widget">
            <img src={cartIcon} alt="" />
            <span>{unitsInCart}</span>
        </div>
    )
}
export default CartWidget;