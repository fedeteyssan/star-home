
import "./ItemListContainer.scss";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import ItemList from "../../components/itemList/ItemList";
import {getFirestore} from "../../firebase"
import { collection, query, where, getDocs} from "@firebase/firestore";
//import catalogue from "../../catalogue.json";


const ItemListContainer = (props) => {
    
    const{ categoryID } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
		const db = getFirestore();

        const q = query(collection(db, "items"));

        //Si no está definida ninguna categoría en la ruta, que no filtre
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


    /*const getProducts = (dataBase) => 
        new Promise((resolve, reject) => {
            setTimeout(() => {
                if (dataBase) {
                    resolve(dataBase);
                } else {
                    reject("No se han encontrado productos");
                };
            }, 2000);
    });

    useEffect(() => {
        getProducts(catalogue)
        .then((result) => {
            categoryID
            ? setProducts(result.filter((product) => product.category === categoryID))
            : setProducts(catalogue);
        })
        .catch((err) => console.log(err));
    }, [categoryID]);*/


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