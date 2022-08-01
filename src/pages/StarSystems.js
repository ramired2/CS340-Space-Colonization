import React, {useState} from 'react';
import { useHistory } from "react-router-dom";



const StarSystems = () => {
  const [viewOpt, setViewOpt] = useState("all");
  const [distance, setdistance] = useState(null);
  // console.log(viewOpt)
  
  const history = useHistory();

  const redirToEdit = (id) => {
      history.push("/starsystemsedit/" + id)
  }

  const deleteData = (id) => {
    // API call
    console.log("wants to delete id: ", id)
  }
  const genFormat = () => {
    return <table className='resTable'>
              <thead>
                <tr>
                  <td className='resItem resHeader'>System Name</td>
                  <td className='resItem resHeader'>Star Type</td>
                  <td className='resItem resHeader'>Distance</td>
                  <td className='resItem resHeader'>Total Planets</td>
                  <td className='resItem resHeader'>Total Colonized Planets</td>
                  <td className='resItem resHeader'>Edit</td>
                  <td className='resItem resHeader'>Delete</td>
                </tr>
              </thead>

              {/* would map out data here */}
              <tbody>
                <tr>
                  <td className='resItem'>Proxima Centauri</td>
                  <td className='resItem'>Red Dwarf Star</td>
                  <td className='resItem'>4</td>
                  <td className='resItem'>3</td>
                  <td className='resItem'>0</td>
                  <td><button className='btns' onClick={() => {redirToEdit()}}>edit</button></td>
                  <td><button className='btns' onClick={() => {deleteData()}}>delete</button></td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td className='resItem'>Aldebaran</td>
                  <td className='resItem'>Red Giant Star</td>
                  <td className='resItem'>2</td>
                  <td className='resItem'>2</td>
                  <td className='resItem'>0</td>
                  <td><button className='btns' onClick={() => {redirToEdit()}}>edit</button></td>
                  <td><button className='btns' onClick={() => {deleteData()}}>delete</button></td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td className='resItem'>Sirius B</td>
                  <td className='resItem'>White Dwarf Star</td>
                  <td className='resItem'>5</td>
                  <td className='resItem'>2</td>
                  <td className='resItem'>0</td>
                  <td><button className='btns' onClick={() => {redirToEdit()}}>edit</button></td>
                  <td><button className='btns' onClick={() => {deleteData()}}>delete</button></td>
                </tr>
              </tbody>
          </table>
  }

  const viewingOpt = () => {
    var e = document.getElementById("viewOpt");

    // console.log(viewOpt)
    
    // API call based on options chosen

    // if wants to view a specific nations ships
      if (viewOpt == 'specific') {
        // prompt user for nation with another dropdown
        return <div>
                  <div className="dropdownList">
                  <div><input className='indivItem formItem' type="number" min = "0" placeholder="Distance (ly)" value={distance} onChange={(e) => setdistance(e.target.value)}/>(ly)</div>
                  </div>

                  {/* once a nation is chosen send appropriate data */}
                  {distance != null? genFormat(): null}
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
      <h1 className="subtopic text">Browsing Star Systems</h1>

      <p className="description text">Browse through star systems known to the UN Colonization Agency.</p>


      <div className="dropdownList">
        <select className='dropdown' onChange={e => setViewOpt(e.target.value)} id ="viewOpt">
          <option className='view'  defaultValue={'all'} value={"all"}>View all star systems</option>
          <option className='view'  value={"specific"}>Minimum distance from Sol</option>
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


export default StarSystems;
