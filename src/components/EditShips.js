import React, {useState, useEffect, useRef} from 'react';
import { useHistory } from "react-router-dom";
// import axios from 'axios';
import { Link } from 'react-router-dom';

const EditNations = (props) => {
//   const [parent, setParent] = useState("");
//   const [nationID, setNationID] = useState(null);
  const [name, setName] = useState("");
  const [nationID, setNationID] = useState("");
  const [speed, setSpeed] = useState(null);
  const [capacity, setCapacity] = useState(null);

//   // return page
  let link = "http://localhost:3000/ships"

//   const history_ = useHistory();

//   // API call for creating a new tree
  const createEmpty = async(e) => {

//     e.preventDefault();
//     // await axios.post('http://localhost:5000/', {
//     //   method:'POST',
//     //   headers: { 'Content-Type': 'application/json'},
//     //   nationID: nationID, // props
//     //   name: name,   
//     //   speed: speed,
//     //   capacity: capacity,
//     // });
    
//     // redirects user back to their works page
//     window.location.href="http://localhost:3000/ships"
  }


  const parentRef = useRef()


  return (
    <div className='content centerDiv formContent'>
      <form id="target" action={link} encType="multipart/form-data" onSubmit={createEmpty}>
        <label className='subtopic text'>Edit a Ship</label>
        <div className='formContainer'>
          <div className='dropdownList'>
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
          <button className='btns indivItem formItem' onClick={() => {window.location.href="http://localhost:3000/ships"}}>Back</button>
          <button className="btns indivItem formItem" type="submit"  /* onClick={/* handleAddPerson } */>Edit Ship</button>
        </div>
      </form>
      
    </div>
  );
}


export default EditNations;