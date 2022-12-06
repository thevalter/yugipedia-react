import {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { BiSearchAlt2 } from "react-icons/bi";

import './SearchInput.css';

const SearchInput = () => {
    const [value, setValue] = useState("");
    const [data, setData] = useState([]);

    const onChange = (event) => {
      setValue(event.target.value);
    };
  
    const onSearch = (searchTerm) => {
      setValue(searchTerm);
    };

    useEffect(() => {
        fetch('../db/ids.json').then(res => res.json()).then(json => setData(json));
      }, []);
  
    return (
        <div className="search-id-container">
          <div className="search-inner">
            <input type="text" value={value} onChange={onChange} placeholder="Search card from id..."/>
            <Link onClick={() => onSearch(value)} to={`/card/${value.replace(/\D/g, '')}`}><BiSearchAlt2/> </Link>
          </div>
          <div className="dropdown">
            {data
              .filter((item) => {
                const searchTerm = value.toLowerCase();
                const cardName = item.name.toLowerCase();
  
                return (
                  searchTerm &&
                  cardName.includes(searchTerm) &&
                  cardName !== searchTerm
                );
              })
              .slice(0, 10)
              .map((item) => (
                <div
                  onClick={() => onSearch(`${item.name} (${item.id})`)}
                  className="dropdown-row"
                  key={item.id}
                >
                  {`${item.name} (${item.id})`}
                </div>
              ))}
          </div>
        </div>
    );
}

export default SearchInput;