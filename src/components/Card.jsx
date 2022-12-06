import { Link } from "react-router-dom";

import './Card.css';

const Card = ({card}) => {
  return (
    <div className="render-card">
          <p>{card.name}</p>
          <img src={card.card_images?.map(el => el.image_url)} alt={card.name}/>
          <span><b>Description: </b>{card.desc}</span>
          <Link to={`/card/${card.id}`}>Details</Link>
        </div>
  )
}

export default Card;