
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Item = ({item}) =>{

    return(
        <Card key={item.id} style={{ width: "18rem", height:"30rem", fontSize:"1rem", margin:"1rem"}}>
            <Link to={`/item/${item.id}`}>
                <Card.Img variant="top" src={item.pictureURL} style={{maxHeight: "200px"}}/>
            </Link>
            <Card.Body style={{height:"15rem", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"space-around"}}>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>$ {item.price}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Item;