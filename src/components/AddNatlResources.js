import React, {useState, useEffect, useRef} from 'react';
import { useHistory } from "react-router-dom";
// import axios from 'axios';
import { Link } from 'react-router-dom';

const AddNatlResources = (props) => {
//   const [parent, setParent] = useState("");
//   const [materialID, setmaterialID] = useState(null);
  const [name, setName] = useState("");
  const [materialID, setmaterialID] = useState("");
  const [planetID, setplanetID] = useState("");
  const [natlQuantity, setnatlQuantity] = useState(10000);

//   // return page
  let link = "http://localhost:3000/natl"

//   const history_ = useHistory();

//   // API call for creating a new tree
  const createEmpty = async(e) => {

//     e.preventDefault();
//     // await axios.post('http://localhost:5000/', {
//     //   method:'POST',
//     //   headers: { 'Content-Type': 'application/json'},
//     //   natlID: natlID, // props
//     //   name: name,   
//     //   materialID: materialID,
//     //   planetID: planetID,
//      //  natlQuantity: natlQuantity
//     // });
    
//     // redirects user back to their works page
//     window.location.href="http://localhost:3000/natl"
  }


  const parentRef = useRef()


  return (
    <div className='content centerDiv formContent'>
      <form id="target" action={link} encType="multipart/form-data" onSubmit={createEmpty}>
        <label className='subtopic text'>Add a Natural Resource</label>
        <div className='formContainer'>
          <div><input className='indivItem formItem' ref={parentRef} type="text" placeholder="Natural Resource Name" name="Ship Name" value={name} onChange={(e) => setName(e.target.value)}/></div>
          <div className='dropdownList editAddbtn'>
                <select id = "materialID" className='dropdown'>
                    <option className='indivItem formItem' value={materialID} onChange={(e) => setmaterialID(e.target.value)}>Rubber</option>
                    <option className='indivItem formItem' value={materialID} onChange={(e) => setmaterialID(e.target.value)}>Minerals</option>
                </select>
          </div>
          <div className='dropdownList editAddbtn'>
                <select id = "planetID" className='dropdown'>
                    <option className='indivItem formItem' value={planetID} onChange={(e) => setplanetID(e.target.value)}>Saturn</option>
                    <option className='indivItem formItem' value={planetID} onChange={(e) => setplanetID(e.target.value)}>Earth</option>
                </select>
          </div>
          <div>Quantity (kgs)<input className='indivItem formItem' ref={parentRef} type="number" min = "0" placeholder="Quantity" value={natlQuantity} onChange={(e) => setnatlQuantity(e.target.value)}/></div>
        </div>
        <div className='buttonsInline'>
          <button className='btns indivItem formItem' onClick={() => {window.location.href="http://localhost:3000/natl"}}>Back</button>
          <button className="btns indivItem formItem" type="submit"  /* onClick={/* handleAddPerson } */>Add Natural Resource</button>
        </div>
      </form>
      
    </div>
  );
}


export default AddNatlResources;