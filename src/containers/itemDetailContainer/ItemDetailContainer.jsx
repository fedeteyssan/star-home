import "./ItemDetailContainer.scss";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemDetail from "../../components/itemDetail/ItemDetail";
import {getFirestore} from "../../firebase"
import { doc, getDoc} from "@firebase/firestore";
import loader2 from "../../assets/loader2.gif"


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
        <div className="item-detail-container">
			{products 
			? <ItemDetail item={products}/> 
			: <div className="card-loader">
				<img src={loader2} alt=""/>
				<p>...Buscando producto...</p>
			  </div>}
		</div>
    ) 
};

export default ItemDetailContainer;