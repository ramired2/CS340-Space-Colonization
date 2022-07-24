import React, {useState} from 'react';

const Materials = () => {
  const [viewOpt, setViewOpt] = useState("all");
  const [specific, setspecific] = useState("specific");
  // console.log(viewOpt)

  const redirToEdit = () => {
    window.location.href="http://localhost:3000/materialsedit"
  }

  const redirToAdd = () => {
    window.location.href="http://localhost:3000/materialsadd"
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
                  <td className='resItem resHeader'>Value (units)</td>
                  <td className='resItem resHeader'>Planet</td>
                  <td className='resItem resHeader'>Edit</td>
                  <td className='resItem resHeader'>Delete</td>
                </tr>
              </thead>

              {/* would map out data here */}
              <tbody>
                <tr>
                  <td className='resItem'>adkvjnd</td>
                  <td className='resItem'>3</td>
                  <td className='resItem'>1</td>
                  <td><button className='btns' onClick={() => {redirToEdit()}}>edit</button></td>
                  <td><button className='btns' onClick={() => {deleteData()}}>delete</button></td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td className='resItem'>adkvjnd</td>
                  <td className='resItem'>3</td>
                  <td className='resItem'>1</td>
                  <td><button className='btns' onClick={() => {redirToEdit()}}>edit</button></td>
                  <td><button className='btns' onClick={() => {deleteData()}}>delete</button></td>
                </tr>
              </tbody>
          </table>
  }

  const specificData = () => {
    // API call for data -- output data
    if ((viewOpt == "nation" || viewOpt == "planet") && specific != "which") {
      return genFormat()
    }
  }

  const viewingOpt = () => {
    
    if (viewOpt == 'nation') {
      // prompt user for nation with another dropdown
      return <div>
                <div className="dropdownList">
                  <select className='dropdown' onChange={e => setspecific(e.target.value)} id ="viewOpt">
                  <option className='view'  defaultValue={'which'} value={"which"}>Pick a nation</option>
                    <option className='view' value={"all"}>Canada</option>
                    <option className='view'  value={"specific"}>MX</option>
                  </select>
                </div>
                
                {specificData()}
             </div>
    }
    else if (viewOpt == 'planet' ) {
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
        <button className='btns adding' onClick={() => {redirToAdd()}}>+</button>
      </div>

      <div className='showingRes'>
        {viewingOpt()}
      </div>
      
    </div>
  </div>
  );
}


export default Materials;
