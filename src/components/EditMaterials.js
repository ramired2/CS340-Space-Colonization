import React, {useState, useEffect, useRef} from 'react';
import { useHistory } from "react-router-dom";
// import axios from 'axios';
import { Link } from 'react-router-dom';

const EditMaterials = (props) => {
//   const [parent, setParent] = useState("");
//   const [planetID, setplanetID] = useState(null);
  const [name, setName] = useState("");
  const [planetID, setplanetID] = useState("");
  const [value, setvalue] = useState(null);
  const [units, setunits] = useState(null);

//   // return page
  let link = "http://localhost:3000/materials"

//   const history_ = useHistory();

//   // API call for creating a new tree
  const createEmpty = async(e) => {

//     e.preventDefault();
//     // await axios.post('http://localhost:5000/', {
//     //   method:'POST',
//     //   headers: { 'Content-Type': 'application/json'},
//     //   planetID: planetID, // props
//     //   name: name,   
//     //   distance: distance,
//     //   value: value,
//      //  units: units
//     // });
    
//     // redirects user back to their works page
//     window.location.href="http://localhost:3000/materials"
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
          <button className='btns indivItem formItem' onClick={() => {window.location.href="http://localhost:3000/materials"}}>Back</button>
          <button className="btns indivItem formItem" type="submit"  /* onClick={/* handleAddPerson } */>Edit system</button>
        </div>
      </form>
      
    </div>
  );
}


export default EditMaterials;