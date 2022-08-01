import React, {useState, useEffect, useRef} from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { Link } from 'react-router-dom';

const AddShips = () => {
//   const [parent, setParent] = useState("");
//   const [nationID, setNationID] = useState(null);
  const [name, setName] = useState("");
  const [nationID, setNationID] = useState("");
  const [speed, setSpeed] = useState(null);
  const [capacity, setCapacity] = useState(null);

//   // return page
  let link = "/ships"

  const history = useHistory();

//   // API call for creating a new tree
  const createEmpty = async(e) => {

    e.preventDefault();
    await axios.post('https://cs340-spacecol-api.herokuapp.com/', {
      method:'POST',
      headers: { 'Content-Type': 'application/json'},
      nationID: nationID,
      name: name,   
      speed: speed,
      capacity: capacity,
    });
    
//     // redirects user back to their works page
      history.push(link)
  }


  const parentRef = useRef()


  return (
    <div className='content centerDiv formContent'>
      <form id="target" action={link} encType="multipart/form-data" onSubmit={createEmpty}>
        <label className='subtopic text'>Add a Ship</label>
        <div className='formContainer'>
          <div className='dropdownList editAddbtn'>
                <select id = "ownerID" className='dropdown'>
                    <option className='indivItem formItem' value={nationID} onChange={(e) => setNationID(e.target.value)}>Canada</option>
                    <option className='indivItem formItem' value={nationID} onChange={(e) => setNationID(e.target.value)}>MX</option>
                </select>
          </div>
          <div><input className='indivItem formItem' ref={parentRef} type="text" placeholder="Ship name" name="Ship Name" value={name} onChange={(e) => setName(e.target.value)}/></div>
          <div><input className='indivItem formItem' ref={parentRef} type="text" placeholder="Ship speed" name="0" value={speed} onChange={(e) => setSpeed(e.target.value)}/></div>
          <div><input className='indivItem formItem' ref={parentRef} type="text" placeholder="Ship capacity" name="0" value={capacity} onChange={(e) => setCapacity(e.target.value)}/></div>
        </div>
        <div className='buttonsInline'>
          <button className='btns indivItem formItem' onClick={() => {history.push(link)}}>Back</button>
          <button className="btns indivItem formItem" type="submit"  /* onClick={/* handleAddPerson } */>Add Ship</button>
        </div>
      </form>
      
    </div>
  );
}


export default AddShips;