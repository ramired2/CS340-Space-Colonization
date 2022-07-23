import React, {useState} from 'react';

const NatlResources = () => {
  const [viewOpt, setViewOpt] = useState("all");
  const [specific, setspecific] = useState("which");
  // console.log(viewOpt)

  const redirToEdit = () => {
    window.location.href="http://localhost:3000/natledit"
  }

  const genFormat = () => {
    return <div>
            <div className='indivItem'>
            <div className='row'>
                <p className='resItem resHeader'>Material</p>
                <p className='resItem'>adkvjnd</p>
                <p className='resItem'>avdkjnl</p>
              </div>
              
              <div className='row'>
                <p className='resItem resHeader'>Planet</p>
                <p className='resItem'>1</p>
                <p className='resItem'>3</p>
              </div>

              <div className='row'>
                <p className='resItem resHeader'>Quantity</p>
                <p className='resItem'>3</p>
                <p className='resItem'>2</p>
              </div>

              <div className='row'>
                <p className='resItem resHeader'>Edit</p>
                <button className='btns resItem ptr' onClick={() => {redirToEdit()}}>edit</button>
                <button className='btns resItem ptr' onClick={() => {redirToEdit()}}>edit</button>
              </div>
            </div>
          </div>
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

      <div className="dropdownList">
        <select className='dropdown' onChange={e => setViewOpt(e.target.value)} id ="viewOpt">
          <option className='view'  defaultValue={'all'} value={"all"}>View all natural resources</option>
          <option className='view'  value={"nations"}>Resources from a specific nation</option>
          <option className='view'  value={"materials"}>Resources by planets</option>
        </select>
      </div>

      <div className='showingRes'>
        {viewingOpt()}
      </div>
      
    </div>
  </div>
  );
}


export default NatlResources;
