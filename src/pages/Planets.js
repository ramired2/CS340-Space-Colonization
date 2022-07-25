import React, {useState} from 'react';

const Planets = () => {
  const [viewOpt, setViewOpt] = useState("all");
  const [specific, setspecific] = useState("which");
  // console.log(viewOpt)

  const redirToEdit = () => {
    window.location.href="https://cs340-space-colonization.herokuapp.com/planetsedit"
  }

  const deleteData = (id) => {
    // API call
    console.log("wants to delete id: ", id)
  }

  const redirToAdd = () => {
    window.location.href="https://cs340-space-colonization.herokuapp.com/planetsadd"
    
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

              {/* would map out data here */}
              <tbody>
                <tr>
                  <td className='resItem'>Proxima Centauri b</td>
                  <td className='resItem'>Mexico</td>
                  <td className='resItem'>Proxima Centauri</td>
                  <td className='resItem'>Yes</td>
                  <td><button className='btns' onClick={() => {redirToEdit()}}>edit</button></td>
                  <td><button className='btns' onClick={() => {deleteData()}}>delete</button></td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td className='resItem'>Anunnaki</td>
                  <td className='resItem'>Mexico</td>
                  <td className='resItem'>Aldebaran</td>
                  <td className='resItem'>Yes</td>
                  <td><button className='btns' onClick={() => {redirToEdit()}}>edit</button></td>
                  <td><button className='btns' onClick={() => {deleteData()}}>delete</button></td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td className='resItem'>Proxima Centauri d</td>
                  <td className='resItem'>Guatemala</td>
                  <td className='resItem'>Proxima Centauri</td>
                  <td className='resItem'>Yes</td>
                  <td><button className='btns' onClick={() => {redirToEdit()}}>edit</button></td>
                  <td><button className='btns' onClick={() => {deleteData()}}>delete</button></td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td className='resItem'>Cancri e</td>
                  <td className='resItem'>Canada</td>
                  <td className='resItem'>Sirius B</td>
                  <td className='resItem'>Yes</td>
                  <td><button className='btns' onClick={() => {redirToEdit()}}>edit</button></td>
                  <td><button className='btns' onClick={() => {deleteData()}}>delete</button></td>
                </tr>
              </tbody>
          </table>
  }

  const specificData = () => {
    if (viewOpt == "nations" && specific != "which") {
      return genFormat()
    }
    else if (viewOpt == "materials" && specific != "which") {
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
  else {
    // return all ships and nations 
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
          <option className='view'  defaultValue={'all'} value={"all"}>View all planets</option>
          <option className='view'  value={"nations"}>Planets from a specific nation</option>
          <option className='view'  value={"colonized"}>Uncolonized Planets</option>
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


export default Planets;
