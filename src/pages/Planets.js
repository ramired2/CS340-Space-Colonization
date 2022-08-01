import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const Planets = () => {
  const [viewOpt, setViewOpt] = useState("all");
  const [specific, setspecific] = useState("which");
  const [data, setdata] = useState([]);
  const [nations, setnations] = useState([]);
  const [showDropdown, setshowDropdown] = useState(false);

  // console.log(viewOpt)

  const history = useHistory();

  useEffect(() => {
    allPlanets()
    dropdownNations()
  }, []);

  const redirToEdit = (id) => {
    let link = "/planetsedit/" + id
    history.push(link)
  }

  const deleteData = async(id) => {
    // API call
    console.log("wants to delete id: ", id)

    await axios.delete (`https://cs340-spacecol-api.herokuapp.com/deletePlanet/${id}`, {
    headers: { 'Content-Type': 'application/json'}
    })
    .catch(err => console.log(err));
    allPlanets()
  }

  const allPlanets = async() => {
    const result = await axios ("https://cs340-spacecol-api.herokuapp.com/allplanets", {
      headers: { 'Content-Type': 'application/json'},
    })
    .then(result => setdata(result.data))
    .catch(err => console.log(err));

    console.log(data)
  }

  const uncolonizedPlanets = async() => {
    const result = await axios ("https://cs340-spacecol-api.herokuapp.com/uncolonizedPlanets", {
      headers: { 'Content-Type': 'application/json'},
    })
    .then(result => setdata(result.data))
    .catch(err => console.log(err));

    console.log(data)
  }

  const planetsPerNation = () => {

    console.log("wanna see planets from nationID: ", specific)

    const result = axios ("https://cs340-spacecol-api.herokuapp.com/planetsPerNation/" + specific, {
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

  const genFormat = () => {
    return <table className='resTable'>
              <thead>
                <tr>
                  <td className='resItem resHeader'>Planet Name</td>
                  <td className='resItem resHeader'>Nation</td>
                  <td className='resItem resHeader'>Star System</td>
                  <td className='resItem resHeader'>Colonized</td>
                  <td className='resItem resHeader'>Edit</td>
                  <td className='resItem resHeader'>Delete</td>
                </tr>
              </thead>

              {data.map((item, idx) => (
              <tr key={idx} className="text">
                  <td className='resItem'>{item.planetName}</td>
                  <td className='resItem'>{item.nationName}</td>
                  <td className='resItem'>{item.systemName}</td>
                  <td className='resItem'>{item.colonized == 1? "yes":"no"}</td>
                  <td><button className='btns' onClick={() => {redirToEdit(item.planetID)}}>edit</button></td>
                  <td><button className='btns' onClick={() => {deleteData(item.planetID)}}>delete</button></td>
                </tr>
              ))}
              
          </table>
  }

  const specificData = () => {
    if (viewOpt == "colonized") {
      uncolonizedPlanets()
      setViewOpt("all")
      setspecific("which")
      return genFormat()
    }
    else if (specific != "which") {
      planetsPerNation()
      setspecific("which")
      setViewOpt("all")
      return genFormat()
    }
  }

  const dropdownShow = () => {
    return <div className="dropdownList">
                <select className='dropdown' onChange={e => setspecific(e.target.value)} id ="viewOpt">
                <option className='view'  defaultValue={'which'} value={"which"}>Pick a nation</option>
                {nations.map((item, index) => (
                  <option key={index} className='view'  value={item.nationID}>{item.nationName}</option>
                ))}
                </select>
              </div>
  }

  const viewingOpt = () => {
    if (viewOpt == 'nations') {
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
              {specific != "which"? planetsPerNation(): null}
              {specific != "which"? setViewOpt("which"): null}
              {specific != "which"? genFormat(): null}
      </div>
    }
  else {
    if (viewOpt == 'colonized') {
      specificData();
    }
    // return all ships and nations
    {console.log(viewOpt)}
    return genFormat()
  }

  }

  return(
  <div className="centerDiv">
    <div className="content">
      <h1 className="subtopic text">Browsing Planets</h1>

      <p className="description text">Browse through planets discovered by the UN Colonization Agency.</p>

      <div className="dropdownList">
        <select className='dropdown' onChange={e => setViewOpt(e.target.value)} id ="viewOpt">
          <option className='view'  defaultValue={'all'} value={"all"} /* onClick={() => {allPlanets();}} */>View all planets</option>
          <option className='view'  value={"nations"}>Planets from a specific nation</option>
          <option className='view'  value={"colonized"}>Uncolonized Planets</option>
        </select>
        <button className='btns adding' onClick={() => {history.push("/planetsadd")}}>+</button>
      </div>

      <div className='showingRes'>
        {viewingOpt()}
      </div>
      
    </div>
  </div>
  );
}


export default Planets;
