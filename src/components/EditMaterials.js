import React, {useState, useEffect, useRef} from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { Link } from 'react-router-dom';

const EditMaterials = (props) => {
  const [name, setName] = useState("");
  const [value, setvalue] = useState("");
  const [units, setunits] = useState("");

  const id = props.match.params.id;

  useEffect(() => {
    preload();
  }, []);

//   // return page
  let link = "/materials"

  const history = useHistory();

//   // API call for creating a new tree
  const createEmpty = async(e) => {

    e.preventDefault();
    await axios.post('http://localhost:5000/editmaterial', {
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

  const preload = async() => {
    await axios ('http://localhost:5000/getmatlsbyID/'+ id, {
      method:'GET',
      headers: { 'Content-Type': 'application/json'},
    }).then(result => {

      setName(result.data[0]['materialName'])
      setvalue(result.data[0]['value'])
      setunits(result.data[0]['units'])

    })
    .catch(err => console.log(err));
  };


  return (
    <div className='content centerDiv formContent'>
      <form id="target" action={link} encType="multipart/form-data" onSubmit={createEmpty}>
        <label className='subtopic text'>Edit a Material</label>
        <div className='formContainer'>
          <div><input className='indivItem formItem' type="text" defaultValue = {name} value = {name} name = "oof" placeholder="Material Name" onChange={(e) => setName(e.target.value)}/></div>
          <div><input className='indivItem formItem' type="text" defaultValue = {value} value = {value}  name = "oof" placeholder="Value" onChange={(e) => setvalue(e.target.value)}/></div>
          <div><input className='indivItem formItem' type="text" defaultValue = {units} value = {units}  name = "oof" placeholder="Units" onChange={(e) => setunits(e.target.value)}/></div>
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