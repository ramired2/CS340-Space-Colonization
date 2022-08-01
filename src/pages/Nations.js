import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const Nations = () => {
  const [viewOpt, setViewOpt] = useState("all");
  const [orderBy, setorderBy] = useState("asc");

  const [data, setdata] = useState([]);
  // nationID, nationName, colonized, ships

  const history = useHistory();

  useEffect(() => {
    allNations()
  }, []);
  

  const redirToEdit = (id) => {
    let link = "/nationsedit/" + id
    history.push(link)
  }

  const deleteData = async(id) => {
    // API call
    console.log("wants to delete id: ", id)

    await axios.delete (`https://cs340-spacecol-api.herokuapp.com/deletenation/${id}`, {
    headers: { 'Content-Type': 'application/json'}
    })
    .catch(err => console.log(err));
    allNations()
  }

  const allNations = async() => {
    const result = await axios ("https://cs340-spacecol-api.herokuapp.com/allnations/" + orderBy, {
      headers: { 'Content-Type': 'application/json'},
    })
    .then(result => setdata(result.data))
    .catch(err => console.log(err));

    console.log(data)
  }

  const getShips = async(shipStat) => {
    console.log("order by ", orderBy)
    const result = await axios ("https://cs340-spacecol-api.herokuapp.com/getOwnShips/" + orderBy + "/" + shipStat, {
      headers: { 'Content-Type': 'application/json'},
    })
    .then(result => setdata(result.data))
    .catch(err => console.log(err));

    console.log(data)
  }

  const genFormat = () => {
    return <table className='resTable'>
            <thead>
              <tr>
                <td className='resItem resHeader'>Nation Name</td>
                <td className='resItem resHeader'>Ships Owned</td>
                <td className='resItem resHeader'>Planets Colonized</td>
                <td className='resItem resHeader'>Edit</td>
                <td className='resItem resHeader'>Delete</td>
              </tr>
            </thead>

            {data.map((item, idx) => (
              <tr key={idx} className="text">
                    <td className='resItem'>{item.nationName}</td>
                    <td className='resItem'>{item.shipQuantity}</td>
                    <td className='resItem'>{item.conquestsQuantity}</td>
                    <td><button className='btns' onClick={() => {redirToEdit(item.nationID)}}>edit</button></td>
                    <td><button className='btns' onClick={() => {deleteData(item.nationID)}}>delete</button></td>
              
              </tr>
            ))}

            </table>
  }

  const viewingOpt = () => {
    // console.log(viewOpt, orderBy)
    
    // API call based on options chosen
    if (viewOpt == "all") {
      console.log("API call for all nations")
      // allNations()
      // console.log(data)
    }
    else if (viewOpt == "noShips"){
      console.log("API call for has no ships")
      getShips("ns")
      setViewOpt("all")
    }
    else if (viewOpt == "ships") {
      console.log("API call for has ships")
      getShips("hs")
      setViewOpt("all")
    }
      return genFormat()
  }

  return(
  <div className="centerDiv">
    <div className="content">
      <h1 className="subtopic text">Nations Browsing</h1>

      <p className="description text">Browse though the UN member nations participating in the colonization project.</p>
    
      <div className="dropdownList">
        <select className='dropdown' onChange={e => setViewOpt(e.target.value)} id ="viewOpt">
          <option className='view' defaultValue={'all'} value={"all"}>View all Nations</option>
          <option className='view' value={"noShips"}>Nations without ships</option>
          <option className='view' value={"ships"}>Nations with ships</option>
          {/* <option className='view' value={"hasColonized"}>Nations without colonized planets</option>
          <option className='view' value={"noColonized"}>Nations with colonized planets</option> */}
        </select>

        <select className='dropdown' onChange={e => setorderBy(e.target.value)} id ="viewOpt">
          <option className='view' defaultValue={'asc'} value={"orderby"}>Order by</option>
          <option className='view' value={"asc"}>Ascending</option>
          <option className='view' value={"desc"}>Descending</option>
        </select>
        <button className='btns adding' onClick={() => {history.push("/nationsadd")}}>+</button>
      </div>

      <div className='showingRes'>
        {viewingOpt()}
      </div>
      
    </div>
  </div>
  );
}


export default Nations;
