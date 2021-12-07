
import "./ItemListContainer.scss";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import Item from "../../components/item/Item.jsx";
import loader from "../../assets/loader.gif"
import {getFirestore} from "../../firebase"
import { collection, query, where, getDocs} from "@firebase/firestore";


const ItemListContainer = () => {
    
    const{ categoryID } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
		const db = getFirestore();

        const q = query(collection(db, "items"));
       
        if (!categoryID) {getDocs(q).then((snapshot) => {
            setProducts(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
        });
        } else {
            const q = query(
              collection(db, "items"),
              where("category", "==", categoryID)
            );
            getDocs(q).then((snapshot) => {
              setProducts(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
            });
        }
    }, [categoryID]);

    return (
       <Container fluid className="item-list-container">
            {products.length
          ? products.map((product) => <Item item={product} key={product.id}/>)
          : <div className="loader">
              <img src={loader} alt="" className="loader-img"/>
              <p>Rastreando productos</p>
            </div>  
        }
        </Container>
    );
};

export default ItemListContainer;