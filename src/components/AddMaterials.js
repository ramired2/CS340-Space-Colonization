import React, {useState, useEffect, useRef} from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { Link } from 'react-router-dom';

const AddMaterials = () => {
//   const [parent, setParent] = useState("");
//   const [planetID, setplanetID] = useState(null);
  const [name, setName] = useState("");
  const [value, setvalue] = useState(null);
  const [units, setunits] = useState(null);

  const [tonatl, settonatl] = useState(false);


//   // return page
  let link = "/materials"

  const history = useHistory();

//   // API call for creating a new tree
  const createEmpty = async(e) => {

    e.preventDefault();
    await axios.post('https://cs340-spacecol-api.herokuapp.com/addmaterial', {
      method:'POST',
      headers: { 'Content-Type': 'application/json'},
      name: name,   
      value: value,
      units: units
    });
    
//     // redirects user back to their works page
    if (tonatl == false) {
      history.push(link);
    }
    else {
      history.push("/natladd");
    }
    
  }


  const parentRef = useRef()


  return (
    <div className='content centerDiv formContent'>
      <form id="target" action={link} encType="multipart/form-data" onSubmit={createEmpty}>
        <label className='subtopic text'>Add a Material</label>
        <div className='formContainer'>
          <div><input className='indivItem formItem' ref={parentRef} type="text" placeholder="System Name" name="Ship Name" value={name} onChange={(e) => setName(e.target.value)}/></div>
          <div><input className='indivItem formItem' ref={parentRef} type="text" placeholder="Value" name="0" value={value} onChange={(e) => setvalue(e.target.value)}/></div>
          <div><input className='indivItem formItem' ref={parentRef} type="text" placeholder="Units" name="0" value={units} onChange={(e) => setunits(e.target.value)}/></div>
        </div>
        <button className="btns indivItem formItem" type="submit" onClick={() => {settonatl(true)}}>Add material and go to add a new natural resource</button>
        <div className='buttonsInline'>
          <button className='btns indivItem formItem' onClick={() => {history.push(link);}}>Back</button>
          <button className="btns indivItem formItem" type="submit"  /* onClick={/* handleAddPerson } */>Add material</button>
        </div>
      </form>
      
    </div>
  );
}


export default AddMaterials;