import React, {useState} from 'react';
import { useHistory } from "react-router-dom";

const Ships = () => {
  const [viewOpt, setViewOpt] = useState("all");
  const [nation, setNation] = useState("which");
  // console.log(viewOpt)

  
  const history = useHistory();
  

  const redirToEdit = (id) => {
    history.push("/shipsedit/" + id)
  }

  const deleteData = (id) => {
    // API call
    console.log("wants to delete id: ", id)
  }

  const genFormat = () => {
    return <table className='resTable'>
            <thead>
              <tr>
                <td className='resItem resHeader'>Ship Name</td>
                <td className='resItem resHeader'>Nation</td>
                <td className='resItem resHeader'>Ship Speed</td>
                <td className='resItem resHeader'>Ship Capacity</td>
                  <td className='resItem resHeader'>Edit</td>
                  <td className='resItem resHeader'>Delete</td>
              </tr>
            </thead>

            {/* would map out data here */}
            <tbody>
              <tr>
                <td className='resItem'>Bacchus</td>
                <td className='resItem'>Mexico</td>
                <td className='resItem'>5</td>
                <td className='resItem'>10</td>
                <td><button className='btns' onClick={() => {redirToEdit()}}>edit</button></td>
                <td><button className='btns' onClick={() => {deleteData()}}>delete</button></td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td className='resItem'>Pinta</td>
                <td className='resItem'>Mexico</td>
                <td className='resItem'>2</td>
                <td className='resItem'>16</td>
                <td><button className='btns' onClick={() => {redirToEdit()}}>edit</button></td>
                <td><button className='btns' onClick={() => {deleteData()}}>delete</button></td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td className='resItem'>Guatemala</td>
                <td className='resItem'>Bacchus</td>
                <td className='resItem'>5.2</td>
                <td className='resItem'>10</td>
                <td><button className='btns' onClick={() => {redirToEdit()}}>edit</button></td>
                <td><button className='btns' onClick={() => {deleteData()}}>delete</button></td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td className='resItem'>Albatross</td>
                <td className='resItem'>Canada</td>
                <td className='resItem'>7</td>
                <td className='resItem'>5</td>
                <td><button className='btns' onClick={() => {redirToEdit()}}>edit</button></td>
                <td><button className='btns' onClick={() => {deleteData()}}>delete</button></td>
              </tr>
            </tbody>
          </table>
  }

  const viewingOpt = () => {
    var e = document.getElementById("viewOpt");

    console.log(viewOpt)
    
    // API call based on options chosen

    // if wants to view a specific nations ships
      if (viewOpt == 'specific') {
        // prompt user for nation with another dropdown
        return <div>
                  <div className="dropdownList">
                    <select className='dropdown' onChange={e => setNation(e.target.value)} id ="viewOpt">
                    <option className='view'  defaultValue={'which'} value={"which"}>Pick a nation</option>
                      <option className='view' value={"all"}>Canada</option>
                      <option className='view'  value={"specific"}>Guatemala</option>
                      <option className='view'  value={"specific"}>Mexico</option>
                    </select>
                  </div>

                  {/* once a nation is chosen API call then output appropriate data */}
                  {nation != "which"? genFormat(): null}
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
      <h1 className="subtopic text">Browsing Ships</h1>

      <p className="description text">Browse through spaceships owned by UN member nations.</p>

      <div className="dropdownList">
        <select className='dropdown' onChange={e => setViewOpt(e.target.value)} id ="viewOpt">
          <option className='view'  defaultValue={'all'} value={"all"}>View all ships</option>
          <option className='view'  value={"specific"}>View Ships from a specific nation</option>
        </select>
        <button className='btns adding' onClick={() => {history.push("/shipsadd")}}>+</button>
      </div>

      <div className='showingRes'>
        {viewingOpt()}
        {/* {console.log(viewOpt)} */}
      </div>
      
    </div>
  </div>
  );
}


export default Ships;
