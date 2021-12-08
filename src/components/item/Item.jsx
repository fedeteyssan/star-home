
import { Link } from "react-router-dom";
import "./Item.scss";

const Item = ({item}) =>{

    return(
        <div className="item-card" key={item.id}>
            <Link to={`/item/${item.id}`}>
                <img className="item-img" alt="" src={item.pictureURL} />
            </Link>
            <div className="item-box">
                <h3>{item.name}</h3>
                <p>$ {item.price}</p>
            </div>
        </div>
    );
};

export default Item;