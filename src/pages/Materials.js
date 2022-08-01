import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const Materials = () => {
  const [viewOpt, setViewOpt] = useState("all");
  const [specific, setspecific] = useState("which");
  const [nations, setnations] = useState([]);
  const [planets, setplanets] = useState([]);
  // console.log(viewOpt)

  const [data, setdata] = useState([]);
  const [planetData, setplanetData] = useState([]);
  const [nationData, setnationData] = useState([]);

  const history = useHistory();

  useEffect(() => {
    allMaterials()
    dropdownNations()
    dropdownPlanets()
  }, []);

  const redirToEdit = (id) => {
    let link = "/materialsedit/" + id
    history.push(link)
  }

  const deleteData = async(id) => {
    // API call
    console.log("wants to delete id: ", id)

    await axios.delete (`https://cs340-spacecol-api.herokuapp.com/deleteMaterial/${id}`, {
    headers: { 'Content-Type': 'application/json'}
    })
    .catch(err => console.log(err));
    allMaterials()
  }

  const allMaterials = async() => {
    const result = await axios ("https://cs340-spacecol-api.herokuapp.com/allmaterials", {
      headers: { 'Content-Type': 'application/json'},
    })
    .then(result => setdata(result.data))
    .catch(err => console.log(err));

    console.log(data)
  }

    // avail nations dropdown
    const dropdownNations = async() => {
      const result = await axios ("https://cs340-spacecol-api.herokuapp.com/dropdownNations", {
        headers: { 'Content-Type': 'application/json'},
      })
      .then(result => setnations(result.data))
      .catch(err => console.log(err));
  
      console.log(data)
    }

    // avail nations dropdown
    const dropdownPlanets = async() => {
      const result = await axios ("https://cs340-spacecol-api.herokuapp.com/dropdownPlanets", {
        headers: { 'Content-Type': 'application/json'},
      })
      .then(result => setplanets(result.data))
      .catch(err => console.log(err));
  
      console.log(data)
    }

    const materialsPerPlanet = async() => {
      const result = await axios ("https://cs340-spacecol-api.herokuapp.com/materialPerPlanet/" + specific, {
        headers: { 'Content-Type': 'application/json'},
      })
      .then(result => setdata(result.data))
      .catch(err => console.log(err));
  
      console.log(data)
    }

    const materialsPerNation = () => {
      console.log(specific)

      const result = axios ("https://cs340-spacecol-api.herokuapp.com/materialPerNation/" + specific, {
        headers: { 'Content-Type': 'application/json'},
      })
      .then(result => setnationData(result.data))
      .catch(err => console.log(err));
  
      console.log(data)
    }


  const planetTable = () => {
    return <table className='resTable'>
              <thead>
                <tr>
                  <td className='resItem resHeader'>Material</td>
                  <td className='resItem resHeader'>Value (units)</td>
                  <td className='resItem resHeader'>Planet</td>
                  <td className='resItem resHeader'>Edit</td>
                  <td className='resItem resHeader'>Delete</td>
                </tr>
              </thead>

              {data.map((item, idx) => (
                <tr key={idx} className="text">
                  <td className='resItem'>{item.materialName}</td>
                  <td className='resItem'>{item.pricePer}</td>
                  <td className='resItem'>{item.planetName}</td>
                  <td><button className='btns' onClick={() => {redirToEdit(item.materialID)}}>edit</button></td>
                  <td><button className='btns' onClick={() => {deleteData(item.materialID)}}>delete</button></td>
                </tr>
              ))}
              
          </table>
  }

  const nationTable = () => {
    return <table className='resTable'>
              <thead>
                <tr>
                  <td className='resItem resHeader'>Material</td>
                  <td className='resItem resHeader'>Value (units)</td>
                  <td className='resItem resHeader'>Edit</td>
                  <td className='resItem resHeader'>Delete</td>
                </tr>
              </thead>

              {nationData.map((item, index) => (
                <tr key={index} className="text">
                  <td className='resItem'>{item.materialName}</td>
                  <td className='resItem'>{item.pricePer}</td>
                  <td><button className='btns' onClick={() => {redirToEdit(item.materialID)}}>edit</button></td>
                  <td><button className='btns' onClick={() => {deleteData(item.materialID)}}>delete</button></td>
                </tr>
              ))}
          </table>
  }

  // 1 is view all, 2 is view planet, 3 is view nation
  const genFormat = () => {
    return <table className='resTable'>
              <thead>
                <tr>
                  <td className='resItem resHeader'>Material</td>
                  <td className='resItem resHeader'>Value (units)</td>
                  <td className='resItem resHeader'>Edit</td>
                  <td className='resItem resHeader'>Delete</td>
                </tr>
              </thead>

              {data.map((item, idx) => (
                <tr key={idx} className="text">
                  <td className='resItem'>{item.materialName}</td>
                  <td className='resItem'>{item.pricePer}</td>
                  <td><button className='btns' onClick={() => {redirToEdit(item.materialID)}}>edit</button></td>
                  <td><button className='btns' onClick={() => {deleteData(item.materialID)}}>delete</button></td>
                </tr>
              ))}
          </table>
  }

  const specificData = () => {
    // API call for data -- output data
    if ((viewOpt == "nation" || viewOpt == "planet") && specific != "which") {
      if (viewOpt == "nation") {
        materialsPerNation()
        setspecific("which")
        return nationTable() 
      }
      else {
        materialsPerPlanet()
        setspecific("which")
        return planetTable()
      }
    }
  }

  const viewingOpt = () => {
    console.log(viewOpt)
    if (viewOpt == 'nation') {
      // prompt user for nation with another dropdown
      return <div>
                <div className="dropdownList">
                  <select className='dropdown' onChange={e => setspecific(e.target.value)} id ="viewOpt">
                  <option className='view'  defaultValue={'which'} value={"which"}>Pick a nation</option>
                    {nations.map((item, index) => (
                  <option key={index} className='view'  value={item.nationID}>{item.nationName}</option>
                ))}
                </select>
                </div>
                
                {specific != "which"? materialsPerNation(): null}
                {specific != "which"? setViewOpt("which"): null}
                {specific != "which"? planetTable(): null}
             </div>
    }
    else if (viewOpt == 'planet' ) {
      // prompt user for nation with another dropdown
      return <div>
                <div className="dropdownList">
                  <select className='dropdown' onChange={e => setspecific(e.target.value)} id ="viewOpt">
                  <option className='view'  defaultValue={'which'} value={"which"}>Pick a planet</option>
                  {planets.map((item, index) => (
                  <option key={index} className='view'  value={item.planetID}>{item.planetName}</option>
                ))}
                  </select>
                </div>
                
                {specific != "which"? materialsPerNation(): null}
                {specific != "which"? setViewOpt("which"): null}
                {specific != "which"? planetTable(): null}
             </div>
    }
  
  else {
    // return all ships and nations 
    return genFormat()
  }

  }

  return(
  <div className="centerDiv">
    <div className="content">
      <h1 className="subtopic text">Browsing Materials</h1>

      <p className="description text">Browse through materials discovered by the UN Colonization Agency.</p>

      <div className="dropdownList">
        <select className='dropdown' onChange={e => setViewOpt(e.target.value)} id ="viewOpt">
          <option className='view'  defaultValue={'all'} value={"all"}>View all materials</option>
          <option className='view'  value={"nation"}>View materials from a specific nation</option>
          <option className='view'  value={"planet"}>View materials from a specific planet</option>
        </select>
        <button className='btns adding' onClick={() => {history.push("/materialsadd")}}>+</button>
      </div>

      <div className='showingRes'>
        {viewingOpt()}
      </div>
      
    </div>
  </div>
  );
}


export default Materials;
