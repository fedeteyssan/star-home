
import "./ItemListContainer.scss";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import ItemList from "../../components/itemList/ItemList";
import {getFirestore} from "../../firebase"
import { collection, query, where, getDocs} from "@firebase/firestore";


const ItemListContainer = (props) => {
    
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
       <Container fluid className="itemListContainer">
           <h1>
               {props.greetings}
           </h1>
           <div className="itemList">
               <ItemList items={products}/>  
           </div>
        </Container>
    );
};

export default ItemListContainer;