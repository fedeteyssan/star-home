import "./ItemList.scss";
import Item from "../item/Item";
import { Spinner, Button } from "react-bootstrap";

/*El componente ItemList (hijo) recibe como parámetro "items" del ItemListContainer (padre) el array de objetos (productos), el cual va a mapear y 
para cada uno de sus productos,los va a renderizar en el componente Item, pasandolos como props */

const ItemList = ({items}) =>{
    return(
      <>
        {items.length
          ? items.map((products) => <Item item={products} key={products.id}/>)
          : <Button variant="warning" disabled><Spinner as="span" animation="border" size="sm" role="status"aria-hidden="true"/>
              Cargando productos...
            </Button>
        }
      </>
    );
};

export default ItemList;