import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';

const NatlResources = () => {
  const [viewOpt, setViewOpt] = useState("all");
  const [specific, setspecific] = useState("which");

  const [data, setdata] = useState([]);
  const [planetDropdown, setplanetDropdown] = useState([]);
  const [nationDropdown, setnationDropdown] = useState([]);
  // console.log(viewOpt)

  const history = useHistory();

  useEffect(() => {
    allnatl()
    dropddownPlanets()
    dropddownNations()
  }, []);

  const redirToEdit = (id) => {
    history.push("/natledit/" + id)
  }

  const deleteData = async(id) => {
    // API call
    console.log("wants to delete id: ", id)

    await axios.delete (`https://cs340-spacecol-api.herokuapp.com/deleteNatl/${id}`, {
    headers: { 'Content-Type': 'application/json'}
    })
    .catch(err => console.log(err));
    allnatl()
  }

  const allnatl = async() => {
    const result = await axios ("https://cs340-spacecol-api.herokuapp.com/allnatl", {
      headers: { 'Content-Type': 'application/json'},
    })
    .then(result => setdata(result.data))
    .catch(err => console.log(err));

    console.log(data)
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
     const dropddownNations = async() => {
      const result = await axios ("/dropdownNations", {
        headers: { 'Content-Type': 'application/json'},
      })
      .then(result => setnationDropdown(result.data))
      .catch(err => console.log(err));
  
      console.log(nationDropdown)
    }

  const genFormat = () => {
    return <table className='resTable'>
              <thead>
                <tr>
                  <td className='resItem resHeader'>Material</td>
                  <td className='resItem resHeader'>Planet</td>
                  <td className='resItem resHeader'>Quantity</td>
                  <td className='resItem resHeader'>Edit</td>
                  <td className='resItem resHeader'>Delete</td>
                </tr>
              </thead>

              {data.map((item, idx) => (
              <tr key={idx} className="text">
                  <td className='resItem'>{item.materialName}</td>
                  <td className='resItem'>{item.planetName}</td>
                  <td className='resItem'>{item.natlQuantity}</td>
                  <td><button className='btns' onClick={() => {redirToEdit(item.natlResourcesID)}}>edit</button></td>
                  <td><button className='btns' onClick={() => {deleteData(item.natlResourcesID)}}>delete</button></td>
                </tr>
              ))}
              
          </table>
  }

  const specificData = () => {
    if (viewOpt == "nations" && specific != "which") {
      // API CALL 
      return genFormat()
    }
    else if (viewOpt == "materials" && specific != "which") {
      // API CALL 
      return genFormat()
    }
  }

  const viewingOpt = () => {
    if (viewOpt == 'nations' ) {
      // prompt user for nation with another dropdown
      return <div>
                <div className="dropdownList">
                  <select className='dropdown' onChange={e => setspecific(e.target.value)} id ="viewOpt">
                  <option className='view'  defaultValue={'which'} value={"which"}>Pick a nation</option>
                  {nationDropdown.map((item, index) => (
                      <option key={index} className='indivItem formItem' value={item.nationID} >{item.nationName}</option>
                    ))}
                  </select>
                </div>
                
                {specificData()}
                
             </div>
    }
  else if (viewOpt == 'materials' ) {
    // prompt user for nation with another dropdown
    return <div>
              <div className="dropdownList">
                <select className='dropdown' onChange={e => setspecific(e.target.value)} id ="viewOpt">
                <option className='view'  defaultValue={'which'} value={"which"}>Pick a planet</option>
                {planetDropdown.map((item, index) => (
                      <option key={index} className='indivItem formItem' value={item.planetID} >{item.planetName}</option>
                    ))}
                </select>
              </div>
              
              {specificData()}
           </div>
  }
  else {
    // return all ships and nations 
    // API CALL 
    return genFormat()
  }

  }

  return(
  <div className="centerDiv">
    <div className="content">
      <h1 className="subtopic text">Browsing Natural Resources</h1>

      <p className="description text">Browse through natural resource deposits 
        discovered by the UN Colonization Agency and view its specific information. 
        This data can be used to plan member states future colonization goals.</p>

      <div className="dropdownList">
        <select className='dropdown' onChange={e => setViewOpt(e.target.value)} id ="viewOpt">
          <option className='view'  defaultValue={'all'} value={"all"}>View all natural resources</option>
          <option className='view'  value={"nations"}>Resources from a specific nation</option>
          <option className='view'  value={"materials"}>Resources by planets</option>
        </select>
        <button className='btns adding' onClick={() => {history.push("/natladd")}}>+</button>
      </div>

      <div className='showingRes'>
        {viewingOpt()}
      </div>
      
    </div>
  </div>
  );
}


export default NatlResources;
