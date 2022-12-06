import { useState, useEffect} from "react";

import Card from "../components/Card";

const Home = () => {
  const [cards, setCard] = useState([]);

  const getData = async () => {
    const resp = await fetch('https://db.ygoprodeck.com/api/v7/randomcard.php');
    const data = await resp.json();

    return setCard(data);
  }

  useEffect(() => {
   getData();
  }, []);

  return (
    <>
      {cards && (
        <Card card={cards} />
      )}
    </>

  )
}

export default Home;