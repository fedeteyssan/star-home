import "./ItemList.scss";
import Item from "../item/Item";
import { Spinner, Button } from "react-bootstrap";


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