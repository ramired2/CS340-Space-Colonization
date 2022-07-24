import React, {useState} from 'react';

const NatlResources = () => {
  const [viewOpt, setViewOpt] = useState("all");
  const [specific, setspecific] = useState("which");
  // console.log(viewOpt)

  const redirToEdit = () => {
    window.location.href="http://localhost:3000/natledit"
  }

  const deleteData = (id) => {
    // API call
    console.log("wants to delete id: ", id)
  }

  const redirToAdd = () => {
    window.location.href="http://localhost:3000/natladd"
    
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
                  <td className='resItem'>Venus</td>
                  <td className='resItem'>1</td>
                  <td><button className='btns' onClick={() => {redirToEdit()}}>edit</button></td>
                  <td><button className='btns' onClick={() => {deleteData()}}>delete</button></td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td className='resItem'>Minerals</td>
                  <td className='resItem'>mars</td>
                  <td className='resItem'>2</td>
                  <td><button className='btns' onClick={() => {redirToEdit()}}>edit</button></td>
                  <td><button className='btns' onClick={() => {deleteData()}}>delete</button></td>
                </tr>
              </tbody>
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
        <button className='btns adding' onClick={() => {redirToAdd()}}>+</button>
      </div>

      <div className='showingRes'>
        {viewingOpt()}
      </div>
      
    </div>
  </div>
  );
}


export default NatlResources;
