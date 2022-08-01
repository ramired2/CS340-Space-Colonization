import React, {useState, useEffect, useRef} from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { Link } from 'react-router-dom';

const EditNatlResources = (props) => {
  const [name, setName] = useState("");
  const [materialID, setmaterialID] = useState("");
  const [planetID, setplanetID] = useState("");
  const [natlQuantity, setnatlQuantity] = useState(10000);

  const [planetDropdown, setplanetDropdown] = useState([]);
  const [materialsdropdown, setmaterialsdropdown] = useState([]);

  useEffect(() => {
    dropddownPlanets()
    dropddownMaterials()
  }, []);

  const id = props.match.params.id;

//   // return page
  let link = "/natl"

  const history = useHistory();

//   // API call for creating a new tree
  const createEmpty = async(e) => {

    e.preventDefault();
    await axios.post('https://cs340-spacecol-api.herokuapp.com/editnatl', {
      method:'POST',
      headers: { 'Content-Type': 'application/json'},
      natlID: id, // props
      materialID: materialID,
      planetID: planetID,
      natlQuantity: natlQuantity
    });
    
    // redirects user back to their works page
    history.push(link)
  }

  // dropdown planets
  const dropddownPlanets = async() => {
    const result = await axios ("https://cs340-spacecol-api.herokuapp.com/dropdownPlanets", {
      headers: { 'Content-Type': 'application/json'},
    })
    .then(result => setplanetDropdown(result.data))
    .catch(err => console.log(err));

    console.log(planetDropdown)
  }

    // dropdown nations
    const dropddownMaterials = async() => {
      const result = await axios ("https://cs340-spacecol-api.herokuapp.com/dropdownMaterials", {
        headers: { 'Content-Type': 'application/json'},
      })
      .then(result => setmaterialsdropdown(result.data))
      .catch(err => console.log(err));
  
      console.log(planetDropdown)
    }


  return (
    <div className='content centerDiv formContent'>
      <form id="target" action={link} encType="multipart/form-data" onSubmit={createEmpty}>
        <label className='subtopic text'>Edit a Natural Resource</label>
        <div className='formContainer'>
          <div className='dropdownList editAddbtn'>
                <select id = "materialID" className='dropdown' onChange={(e) => setmaterialID(e.target.value)}>
                <option className='indivItem formItem' value={null} >Material</option>
                  {materialsdropdown.map((item, idx) => (
                        <option key={idx} className='indivItem formItem' value={item.materialID} >{item.materialName}</option>
                      ))}
                </select>
          </div>
          <div className='dropdownList editAddbtn'>
          <select id = "planetID" className='dropdown' onChange={(e) => setplanetID(e.target.value)}>
                <option className='indivItem formItem' value={null} >Planet</option>
                {planetDropdown.map((item, index) => (
                      <option key={index} className='indivItem formItem' value={item.planetID} >{item.planetName}</option>
                    ))}
                </select>
                </div>
          <div>Quantity (kgs)<input className='indivItem formItem' type="number" placeholder="Quantity" min = "0" value={natlQuantity} onChange={(e) => setnatlQuantity(e.target.value)}/></div>
        </div>
        <div className='buttonsInline'>
          <button className='btns indivItem formItem' onClick={() => {history.push(link)}}>Back</button>
          <button className="btns indivItem formItem" type="submit">Edit Natural Resource</button>
        </div>
      </form>
      
    </div>
  );
}


export default EditNatlResources;