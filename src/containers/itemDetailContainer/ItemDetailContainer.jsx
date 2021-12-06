import "./ItemDetailContainer.scss";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemDetail from "../../components/itemDetail/ItemDetail";
import {getFirestore} from "../../firebase"
import { doc, getDoc} from "@firebase/firestore";


const ItemDetailContainer = () => {
	
	const{ itemID } = useParams();
    const [products, setProducts] = useState(null);

	useEffect(() => {
		const db = getFirestore();
		const item = doc(db, "items", itemID);
		getDoc(item).then((snapshot) => {
		  if (snapshot.exists()) {
			const gotProduct = {...snapshot.data(), id: item.id};
			setProducts(gotProduct)
		  }
		});
	  }, [itemID]);

	return(
        <>
			{products ? <ItemDetail item={products}/> : <p className="Loader">Cargando producto</p>}
		</>
    ) 
};

export default ItemDetailContainer;