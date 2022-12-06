import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import './CardId.css';

const CardId = () => {
  const { id } = useParams();
  const [card, setCard] = useState(null);

  const getData = async () => {
    const resp = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}`);
    const json = await resp.json();

    return json.data.map(el => setCard(el));
  }

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <div className="card-expanded">
      {card && (
        <>
          <div className="img-wrapper">
            <img src={card.card_images?.map(el => el.image_url)} />
          </div>
          <div className="content-wrapper">
            <p>Name: {card.name}</p>
            {card.archetype && (<p>Archetype: {card.archetype}</p>)}
            <p>Attribute: {card.attribute}</p>
            <p>Race: {card.race}</p>
            <p>Type: {card.type}</p>
            {card.linkmarkers && (<p>Linkmarkers: {card.linkmarkers.map((el, index) => <span key={index}>{el}</span>)}</p>)}
            {card.linkval && (<p>Level: {card.linkval}</p>)}
            {card.level &&(<p>Level: {card.level}</p>)}
            {card.atk && (<p>Atk: {card.atk}</p>)}
            {card.def && (<p>Def: {card.def}</p>)}
            <p>Description: {card.desc}</p>
            <p className="prices-sets">Card prices </p>
            <div className="p-info">
              <p>Amazon: {card.card_prices?.map(el => el.amazon_price)}</p>
              <p>Cardmarket: {card.card_prices?.map(el => el.cardmarket_price)}</p>
              <p>Coolstuffinc: {card.card_prices?.map(el => el.coolstuffinc_price)}</p>
              <p>Ebay: {card.card_prices?.map(el => el.ebay_price)}</p>
              <p>Tcgplayer: {card.card_prices?.map(el => el.tcgplayer_price)}</p>
            </div>
            <p className="prices-sets">Card sets </p>
            <div className="p-info">
              <p>Code: {card.card_sets?.map(el => el.set_code)}</p>
              <p>Name: {card.card_sets?.map(el => el.set_name)}</p>
              <p>Price: {card.card_sets?.map(el => el.set_price)}</p>
              <p>Rarity: {card.card_sets?.map(el => el.set_rarity)}</p>
              <p>Rarity code: {card.card_sets?.map(el => el.set_rarity_code)}</p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default CardId;
