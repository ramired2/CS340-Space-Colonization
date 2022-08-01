import React, {useState, useEffect, useRef} from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { Link } from 'react-router-dom';

const EditMaterials = (props) => {
//   const [parent, setParent] = useState("");
//   const [materialID, setmaterialID] = useState(null);
  const [name, setName] = useState("");
  const [value, setvalue] = useState("");
  const [units, setunits] = useState("");

  const id = props.match.params.id;

//   // return page
  let link = "/materials"

  const history = useHistory();

//   // API call for creating a new tree
  const createEmpty = async(e) => {

    e.preventDefault();
    await axios.post('https://cs340-spacecol-api.herokuapp.com/editmaterial', {
      method:'POST',
      headers: { 'Content-Type': 'application/json'},
      materialID: id, // props
      name: name,   
      value: value,
      units: units
    });
    
    // redirects user back to their works page
    history.push(link);
  }


  const parentRef = useRef()


  return (
    <div className='content centerDiv formContent'>
      <form id="target" action={link} encType="multipart/form-data" onSubmit={createEmpty}>
        <label className='subtopic text'>Edit a Material</label>
        <div className='formContainer'>
          <div><input className='indivItem formItem' ref={parentRef} type="text" placeholder="System Name" name="Ship Name" value={name} onChange={(e) => setName(e.target.value)}/></div>
          <div><input className='indivItem formItem' ref={parentRef} type="text" placeholder="Value" name="0" value={value} onChange={(e) => setvalue(e.target.value)}/></div>
          <div><input className='indivItem formItem' ref={parentRef} type="text" placeholder="Units" name="0" value={units} onChange={(e) => setunits(e.target.value)}/></div>
        </div>
        <div className='buttonsInline'>
          <button className='btns indivItem formItem' onClick={() => {history.push(link);}}>Back</button>
          <button className="btns indivItem formItem" type="submit"  /* onClick={/* handleAddPerson } */>Edit system</button>
        </div>
      </form>
      
    </div>
  );
}


export default EditMaterials;