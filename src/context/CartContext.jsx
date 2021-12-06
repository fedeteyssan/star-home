import { createContext, useContext, useState } from 'react';


const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }) => {
	
	const [cart, setCart] = useState([]);

    const addItem = (item, counter) => {	
		const isInCart = cart.some((product) => product.id === item.id);
        
		if (item.stock > 0) {
			if (!isInCart) {
				const itemToAdd = { ...item, pickedQuantity: counter};
				setCart([...cart, itemToAdd]);  
			} else {
				const newCart = cart.map((product)=>  product.id===item.id 
				?{...product, pickedQuantity: product.pickedQuantity+counter}
				:product);
				setCart(newCart);
			}
		}
	};

    const removeItem = (id) => {
		setCart(cart.filter((item) => item.id !== id));
	};

    const clearCart = () => {
		setCart([]);
	};

	const calculatePurchaseValue = cart.reduce((previousValue, currentValue) => previousValue + currentValue.pickedQuantity*currentValue.price,0);


    return (
		<CartContext.Provider value={{ addItem, removeItem, clearCart, cart, calculatePurchaseValue}}>
			{children}
		</CartContext.Provider>
    );
}

export default CartProvider;