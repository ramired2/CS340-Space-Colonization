import React, {useState, useEffect, useRef} from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { Link } from 'react-router-dom';

const AddNatlResources = () => {
  const [name, setName] = useState("");
  const [materialID, setmaterialID] = useState("");
  const [planetID, setplanetID] = useState("");
  const [natlQuantity, setnatlQuantity] = useState(10000);

  const [data, updateData] = useState([])
  const [planetDropdown, setplanetDropdown] = useState([]);
  const [materialsdropdown, setmaterialsdropdown] = useState([]);

  useEffect(() => {
    dropddownPlanets()
    dropddownMaterials()
  }, []);

//   // return page
  let link = "/natl"

  const history = useHistory();

//   // API call for creating a new tree
  const createEmpty = async(e) => {

    e.preventDefault();
    await axios.post('https://cs340-spacecol-api.herokuapp.com/addnatl', {
      method:'POST',
      headers: { 'Content-Type': 'application/json'},
      // name: name,   
      materialID: materialID,
      planetID: planetID,
      natlQuantity: natlQuantity
    });
    
//     // redirects user back to their works page
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


  const nameRef = useRef()
  const planetidRef = useRef()
  const natlquantRef = useRef()

  function handleAddPerson(e){
    const materialid = nameRef.current.value
    const planetid = planetidRef.current.value
    const natlquantity = natlquantRef.current.value

    if (materialid === '' || planetid === '' || natlquantity === '') return

    updateData(prevData => {
      return [...prevData, {natlResourcesID: 1, materialID: materialid, planetID: planetid, natlQuantity: natlquantity}]
    })

    console.log(name)
    nameRef.current.value = null
    planetidRef.current.value = null
    natlquantRef.current.value = null
  }


  return (
    <div className='content centerDiv formContent'>
      <form id="target" action={link} encType="multipart/form-data" onSubmit={createEmpty}>
        <label className='subtopic text'>Add a Natural Resource</label>
        <div className='formContainer'>
          <div className='dropdownList editAddbtn'>
                <select id = "materialID" className='dropdown' ref={nameRef} onChange={(e) => setmaterialID(e.target.value)}>
                <option className='indivItem formItem' value={null} >Material</option>
                {materialsdropdown.map((item, idx) => (
                      <option key={idx} className='indivItem formItem' value={item.materialID} >{item.materialName}</option>
                    ))}
                </select>
          </div>
          <div className='dropdownList editAddbtn'>
                <select id = "planetID" className='dropdown' ref={planetidRef} onChange={(e) => setplanetID(e.target.value)}>
                <option className='indivItem formItem' value={null} >Planet</option>
                {planetDropdown.map((item, index) => (
                      <option key={index} className='indivItem formItem' value={item.planetID} >{item.planetName}</option>
                    ))}
                </select>
          </div>
          <div>Quantity (kgs)<input className='indivItem formItem' ref={natlquantRef} type="number" min = "0" placeholder="Quantity" value={natlQuantity} onChange={(e) => setnatlQuantity(e.target.value)}/></div>
        </div>
        <p className='text'>Material doesn't exist yet? </p>
        <button className="btns indivItem formItem" onClick={() => {history.push("/materialsadd")}}>Add a new Material</button>
        <div className='buttonsInline'>
          <button className='btns indivItem formItem' onClick={() => {history.push(link)}}>Back</button>
          <button className="btns indivItem formItem" type="submit" onClick={ handleAddPerson }>Add Natural Resource</button>
        </div>
      </form>
      
    </div>
  );
}


export default AddNatlResources;