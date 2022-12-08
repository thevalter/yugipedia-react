import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import Card from "../components/Card";

import './Search.css';

const Search = () => {

    const [searchParams] = useSearchParams();

    const [cards, setCards] = useState([]);
    const [search, setSearch] = useState('');
    const query = searchParams.get("q");

    const getData = async (url) => {
        const resp = await fetch(url);
        const json = await resp.json();

        setCards(json.data);
    }

    const filterCards = cards.filter(card => card.name.toLowerCase().includes(search));

    useEffect(() => {
        const cardUrl = `https://db.ygoprodeck.com/api/v7/cardinfo.php?${query}`;
        getData(cardUrl);
    }, [query]);

    return (
        <div className="search-container">
            <div className="input-filter-wrapper">
                <input type="text" autoComplete="off" placeholder="Filter cards..." onChange={_.debounce(e => setSearch(e.target.value.toLowerCase()), 200)} />
                {cards.length === 0 && <p>Loading...</p>}
                {filterCards.length > 0 && <p>Results: {filterCards.length}</p>}
            </div>
            <div className="card-container">
                {filterCards.length > 0 && (
                    filterCards?.map(card => <Card key={card.id} card={card} />)
                )}
                {filterCards.length === 0 && search != '' && <p>Not results found for: <span>{search}</span></p>}

            </div>
        </div>
    )
}

export default Search