import React, {useState, useEffect, useRef} from 'react';
import { useHistory } from "react-router-dom";
// import axios from 'axios';
import { Link } from 'react-router-dom';

const EditNations = (props) => {
//   const [parent, setParent] = useState("");
//   const [nationID, setNationID] = useState(null);
  const [name, setName] = useState("");
  const [numCol, setNumCol] = useState(null);
  const [numShip, setNumShip] = useState(null);

//   // return page
  let link = "https://cs340-space-colonization.herokuapp.com/nations"

//   const history_ = useHistory();

//   // API call for creating a new tree
  const createEmpty = async(e) => {

//     e.preventDefault();
//     // await axios.post('http://localhost:5000/', {
//     //   method:'POST',
//     //   headers: { 'Content-Type': 'application/json'},
//     //   nationID: nationID, 
//     //   name: name,   
//     //   numColonized: numCol,
//     //   numShips: numShip,
//     // });
    
//     // redirects user back to their works page
//     window.location.href="https://cs340-space-colonization.herokuapp.com/nations"
  }


  const parentRef = useRef()


  return (
    <div className='content centerDiv formContent'>
      <form id="target" action={link} encType="multipart/form-data" onSubmit={createEmpty}>
        <label className='subtopic text'>Edit a Nation</label>
        <div className='formContainer'>
          <div><input className='indivItem formItem' ref={parentRef} type="text" placeholder="Nation name" name="Nation Name" value={name} onChange={(e) => setName(e.target.value)}/></div>
          <div><input className='indivItem formItem' ref={parentRef} type="text" placeholder="Ship quantity" name="0" value={numShip} onChange={(e) => setNumShip(e.target.value)}/></div>
          <div><input className='indivItem formItem' ref={parentRef} type="text" placeholder="Colonized planets quantity" name="0" value={numCol} onChange={(e) => setNumCol(e.target.value)}/></div>
        </div>
          <button className='btns indivItem formItem' onClick={() => {window.location.href="https://cs340-space-colonization.herokuapp.com/nations"}}>Back</button>
          <button className="btns indivItem formItem" type="submit"  /* onClick={/* handleAddPerson } */>Edit Nation</button>
      </form>
      
    </div>
  );
}


export default EditNations;