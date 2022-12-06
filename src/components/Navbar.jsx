import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import {data} from "./db/data";

import SearchInput from "./SearchInput";


import './Navbar.css';

const Navbar = () => {

  const [db, setData] = useState([]);
  const [valueArchetype, setArchetype] = useState("");
  const [valueType, setType] = useState("");
  const [valueRace, setRace] = useState("");
  const [valueLevel, setLevel] = useState("");
  const [valueLink, setLink] = useState("");

  const navigate = useNavigate();

  const getValueSelect = e => {
    e.preventDefault();

    if (valueArchetype || valueType || valueRace || valueLevel || valueLink != '') {

      navigate(`/search?q=${valueArchetype}${valueType}${valueRace}${valueLevel}${valueLink}`);
      setArchetype("");
      setType("");
      setRace("");
      setLevel("");
      setLink("");
    }

  }

  useEffect(() => {
    setData(data);
  }, []);

  return (
    <nav id="navbar">
      <div className="container-header">
        <h1>
          <Link to='/'>Yugipedia</Link>
        </h1>
        <div className="input-search-wrapper">
          <SearchInput/>
        </div>
      </div>

      <h2>Search cards by groups: </h2>

      {db.length > 0 && (

        <form onSubmit={getValueSelect}>
          <div className="container-select">
            <select id="select-Archetypes" value={valueArchetype} onChange={valueOption => setArchetype(valueOption.target.value)}>
              <option value="">Archetypes</option>
              {db[0].archetypes?.map((el, index) => {
                return <option value={`archetype=${el}`} key={index}>{el}</option>
              })}
            </select>
            <select id="select-types" value={valueType} onChange={valueOption => setType(valueOption.target.value)}>
              <option value="">Types</option>
              {db[0].types?.map((el, index) => {
                return <option value={`type=${el}`} key={index}>{el}</option>
              })}
            </select>
            <select id="select-race" value={valueRace} onChange={valueOption => setRace(valueOption.target.value)}>
              <option value="">Race</option>
              {db[0].race?.map((el, index) => {
                return <option value={`race=${el}`} key={index}>{el}</option>
              })}
            </select>
            <select id="select-level" value={valueLevel} onChange={valueOption => setLevel(valueOption.target.value)}>
              <option value="">Level</option>
              {db[0].level?.map((el, index) => {
                return <option value={`level=${el}`} key={index}>{el}</option>
              })}
            </select>
            <select id="select-link" value={valueLink} onChange={valueOption => setLink(valueOption.target.value)}>
              <option value="">Link</option>
              {db[0].link?.map((el, index) => {
                return <option value={`link=${el}`} key={index}>{el}</option>
              })}
            </select>
          </div>
          <button type="submit">Search</button>
        </form>

      )}

    </nav>
  )
}

export default Navbar;