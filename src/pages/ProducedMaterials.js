import React, {useState} from 'react';
import { useHistory } from "react-router-dom";

const ProducedMaterials = () => {
  const [viewOpt, setViewOpt] = useState("all");
  const [specific, setspecific] = useState("which");
  // console.log(viewOpt)

  const history = useHistory();

  

  const redirToEdit = (id) => {
    history.push("/prodedit/" + id)
  }

  const deleteData = (id) => {
    // API call
    console.log("wants to delete id: ", id)
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

              {/* would map out data here */}
              <tbody>
                <tr>
                  <td className='resItem'>rubber</td>
                  <td className='resItem'>Anunnaki</td>
                  <td className='resItem'>4</td>
                  <td><button className='btns' onClick={() => {redirToEdit()}}>edit</button></td>
                  <td><button className='btns' onClick={() => {deleteData()}}>delete</button></td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td className='resItem'>Rubber</td>
                  <td className='resItem'>Cancri e</td>
                  <td className='resItem'>2</td>
                  <td><button className='btns' onClick={() => {redirToEdit()}}>edit</button></td>
                  <td><button className='btns' onClick={() => {deleteData()}}>delete</button></td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td className='resItem'>Minerals</td>
                  <td className='resItem'>Proxima Centauri d</td>
                  <td className='resItem'>6</td>
                  <td><button className='btns' onClick={() => {redirToEdit()}}>edit</button></td>
                  <td><button className='btns' onClick={() => {deleteData()}}>delete</button></td>
                </tr>
              </tbody>
          </table>
  }

  const specificData = () => {
    if (viewOpt == "nations" && specific != "which") {
      // GET API DATA THEN
      return genFormat()
    }
    else if (viewOpt == "materials" && specific != "which") {
      // GET API DATA THRN 
      return genFormat()
    }
  }

  const viewingOpt = () => {
    var e = document.getElementById("viewOpt");
    
    if (viewOpt == 'nations' ) {
      // prompt user for nation with another dropdown
      return <div>
                <div className="dropdownList">
                  <select className='dropdown' onChange={e => setspecific(e.target.value)} id ="viewOpt">
                  <option className='view'  defaultValue={'which'} value={"which"}>Pick a nation</option>
                    <option className='view' value={"can"}>Canada</option>
                    <option className='view'  value={"mx"}>MX</option>
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
                  <option className='view' value={"can"}>Venus</option>
                  <option className='view'  value={"mx"}>Mars</option>
                </select>
              </div>
              
              {specificData()}
           </div>
  }
  else {
    // return all ships and nations 
    return  genFormat()
  }

  }

  return(
  <div className="centerDiv">
    <div className="content">
      <h1 className="subtopic text">Browsing Produced Materials</h1>

      <p className="description text">Browse through resources that have been 
        produced by exsisting colonies. These resources have been successfully 
        expiled and stockpiled and are ready for export.</p>

      <div className="dropdownList">
        <select className='dropdown' onChange={e => setViewOpt(e.target.value)} id ="viewOpt">
          <option className='view'  defaultValue={'all'} value={"all"}>View all Produced Materials</option>
          <option className='view'  value={"nations"}>Produced materials from a specific nation</option>
          <option className='view'  value={"materials"}>Produced materials from a planet</option>
        </select>
        <button className='btns adding' onClick={() => {history.push("/prodadd")}}>+</button>
      </div>

      <div className='showingRes'>
        {viewingOpt()}
      </div>
      
    </div>
  </div>
  );
}


export default ProducedMaterials;
