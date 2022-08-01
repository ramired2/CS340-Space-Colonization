import React, {useState, useEffect, useRef} from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { Link } from 'react-router-dom';

const EditProduced = (props) => {
//   const [parent, setParent] = useState("");
//   const [materialID, setmaterialID] = useState(null);
  const [name, setName] = useState("");
  const [materialID, setmaterialID] = useState("");
  const [planetID, setplanetID] = useState("");
  const [prodQuantity, setprodQuantity] = useState("");

  const id = props.match.params.id;

//   // return page
  let link = "/produced"

  const history = useHistory();

//   // API call for creating a new tree
  const createEmpty = async(e) => {

    e.preventDefault();
    await axios.post('https://cs340-spacecol-api.herokuapp.com/', {
      method:'POST',
      headers: { 'Content-Type': 'application/json'},
      prodID: id, // props
      name: name,   
      materialID: materialID,
      planetID: planetID,
      prodQuantity: prodQuantity
    });
    
//     // redirects user back to their works page
      history.push(link);
  }


  const parentRef = useRef()


  return (
    <div className='content centerDiv formContent'>
      <form id="target" action={link} encType="multipart/form-data" onSubmit={createEmpty}>
        <label className='subtopic text'>Edit a Produced Material</label>
        <div className='formContainer'>
          <div><input className='indivItem formItem' ref={parentRef} type="text" placeholder="Produced Material Name" name="Name" value={name} onChange={(e) => setName(e.target.value)}/></div>
          <div className='dropdownList editAddbtn'>
                <select id = "materialID" className='dropdown editAddbtn'>
                    <option className='indivItem formItem' value={materialID} onChange={(e) => setmaterialID(e.target.value)}>Rubber</option>
                    <option className='indivItem formItem' value={materialID} onChange={(e) => setmaterialID(e.target.value)}>Minerals</option>
                </select>
          </div>
          <div className='dropdownList editAddbtn'>
                <select id = "planetID" className='dropdown editAddbtn'>
                    <option className='indivItem formItem' value={planetID} onChange={(e) => setplanetID(e.target.value)}>Saturn</option>
                    <option className='indivItem formItem' value={planetID} onChange={(e) => setplanetID(e.target.value)}>Earth</option>
                </select>
          </div>
          <div><input className='indivItem formItem' ref={parentRef} type="text" placeholder="Quantity" min = "0" value={prodQuantity} onChange={(e) => setprodQuantity(e.target.value)}/></div>
        </div>
        <div className='buttonsInline'>
          <button className='btns indivItem formItem' onClick={() => {history.push(link);}}>Back</button>
          <button className="btns indivItem formItem" type="submit"  /* onClick={/* handleAddPerson } */>Edit Produced Material</button>
        </div>
      </form>
      
    </div>
  );
}


export default EditProduced;