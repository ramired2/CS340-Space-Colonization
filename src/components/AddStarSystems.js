import React, {useState, useEffect, useRef} from 'react';
import { useHistory } from "react-router-dom";
// import axios from 'axios';
import { Link } from 'react-router-dom';

const AddStarSystems = (props) => {
//   const [parent, setParent] = useState("");
//   const [starID, setstarID] = useState(null);
  const [name, setName] = useState("");
  const [starID, setstarID] = useState("");
  const [distance, setdistance] = useState(null);
  const [numPlanets, setnumPlanets] = useState(null);
  const [numColonized, setNumColonized] = useState(null);

//   // return page
  let link = "http://localhost:3000/starsystems"

//   const history_ = useHistory();

//   // API call for creating a new tree
  const createEmpty = async(e) => {

//     e.preventDefault();
//     // await axios.post('http://localhost:5000/', {
//     //   method:'POST',
//     //   headers: { 'Content-Type': 'application/json'},
//     //   starID: starID, // props
//     //   name: name,   
//     //   distance: distance,
//     //   numPlanets: numPlanets,
//      //  numColonized: numColonized
//     // });
    
//     // redirects user back to their works page
//     window.location.href="http://localhost:3000/starsystems"
  }


  const parentRef = useRef()


  return (
    <div className='content centerDiv formContent'>
      <form id="target" action={link} encType="multipart/form-data" onSubmit={createEmpty}>
        <label className='subtopic text'>Add a Star System</label>
        <div className='formContainer'>
          <div className='dropdownList editAddbtn'>
                <select id = "ownerID" className='dropdown'>
                    <option className='indivItem formItem' value={starID} onChange={(e) => setstarID(e.target.value)}>Red Dwarf</option>
                    <option className='indivItem formItem' value={starID} onChange={(e) => setstarID(e.target.value)}>White Dwarf</option>
                </select>
          </div>
          <div><input className='indivItem formItem' ref={parentRef} type="text" placeholder="System Name" name="Ship Name" value={name} onChange={(e) => setName(e.target.value)}/></div>
          <div><input className='indivItem formItem' ref={parentRef} type="text" placeholder="Distance" name="0" value={distance} onChange={(e) => setdistance(e.target.value)}/></div>
          <div><input className='indivItem formItem' ref={parentRef} type="text" placeholder="Planets Count" name="0" value={numPlanets} onChange={(e) => setnumPlanets(e.target.value)}/></div>
          <div><input className='indivItem formItem' ref={parentRef} type="text" placeholder="Colonized Count" name="0" value={numColonized} onChange={(e) => setNumColonized(e.target.value)}/></div>
        </div>
        <div className='buttonsInline'>
          <button className='btns indivItem formItem' onClick={() => {window.location.href="http://localhost:3000/starsystems"}}>Back</button>
          <button className="btns indivItem formItem" type="submit"  /* onClick={/* handleAddPerson } */>Add system</button>
        </div>
      </form>
      
    </div>
  );
}


export default AddStarSystems;