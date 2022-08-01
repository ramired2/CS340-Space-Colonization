import React, {useState, useEffect, useRef} from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { Link } from 'react-router-dom';

const AddNations = () => {
  const [name, setName] = useState("");
  const [numCol, setNumCol] = useState("");
  const [numShip, setNumShip] = useState("");

  const [data, updateData] = useState([])

//   // return page
  let link = "/nations"

  let getLink = "https://cs340-spacecol-api.herokuapp.com/addnation"

  const history = useHistory();

//   // API call for creating a new tree
  const createEmpty = async(e) => {

    e.preventDefault();
    await axios.post(getLink, {
      method:'POST',
      headers: { 'Content-Type': 'application/json'},
      name: name,   
      numColonized: numCol,
      numShips: numShip,
    });
    
    // redirects user back to their works page
    history.push(link);
  }


  const nameRef = useRef()
  const numColRef = useRef()
  const numShipRef = useRef()

  function handleAddPerson(e){
    const names = nameRef.current.value
    const colonized = numColRef.current.value
    const ships = numShipRef.current.value

    if (name === '' || colonized === '' || ships === '') return

    updateData(prevData => {
      return [...prevData, {nationID: 1, nationName: names, conquestsQuantity: colonized, shipQuantity: ships}]
    })

    console.log(name)
    nameRef.current.value = null
    numColRef.current.value = null
    numShipRef.current.value = null
  }


  return (
    <div className='content centerDiv formContent'>
      <form id="target" action={link} encType="multipart/form-data" onSubmit={createEmpty}>
        <label className='subtopic text'>Add a Nation</label>
        <div className='formContainer'>
          <div><input className='indivItem formItem' ref={nameRef} type="text" placeholder="Nation name" value={name} onChange={(e) => setName(e.target.value)}/></div>
          <div><input className='indivItem formItem' ref={numShipRef} type="text" placeholder="Ship quantity" value={numShip} onChange={(e) => setNumShip(e.target.value)}/></div>
          <div><input className='indivItem formItem' ref={numColRef} type="text" placeholder="Colonized planets quantity" value={numCol} onChange={(e) => setNumCol(e.target.value)}/></div>
        </div>
          <button className='btns indivItem formItem' onClick={() => {history.push(link)}}>Back</button>
          <button className="btns indivItem formItem" type="submit"  onClick={ handleAddPerson } >Add Nation</button>
      </form>
      
    </div>
  );
}


export default AddNations;