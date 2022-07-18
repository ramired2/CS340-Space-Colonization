import React, {useState} from 'react';

const NatlResources = () => {
  const [viewOpt, setViewOpt] = useState("all");
  const [specific, setspecific] = useState("which");
  // console.log(viewOpt)

  const redirToEdit = () => {
    window.location.href="http://localhost:3000/natledit"
  }

  const specificData = () => {
    if (viewOpt == "nations" && specific != "which") {
      return <div>
            <div className='indivItem'>
              <div className='row'>
                <p className='resItem resHeader'>Material</p>
                <p className='resItem'>adkvjnd</p>
                <p className='resItem'>avdkjnl</p>
              </div>
              
              <div className='row'>
                <p className='resItem resHeader'>Value (units)</p>
                <p className='resItem'>3</p>
                <p className='resItem'>2</p>
              </div>
              
              <div className='row'>
                <p className='resItem resHeader'>Planet</p>
                <p className='resItem'>1</p>
                <p className='resItem'>3</p>
              </div>

              <div className='row'>
                <p className='resHeader'>Edit</p>
                {/* need to associate an ID to the indiv edits */}
                <button className='btns resItem ptr' onClick={() => {redirToEdit()}}>edit</button>
                <button className='btns resItem ptr' onClick={() => {redirToEdit()}}>edit</button>
              </div>
            </div>
          </div>
    }
    else if (viewOpt == "materials" && specific != "which") {
      return <div>
            <div className='indivItem'>
              <div className='row'>
                <p className='resItem resHeader'>Material</p>
                <p className='resItem'>adkvjnd</p>
                <p className='resItem'>avdkjnl</p>
              </div>
              
              <div className='row'>
                <p className='resItem resHeader'>Value (units)</p>
                <p className='resItem'>3</p>
                <p className='resItem'>2</p>
              </div>
              
              <div className='row'>
                <p className='resItem resHeader'>Planet</p>
                <p className='resItem'>1</p>
                <p className='resItem'>3</p>
              </div>

              <div className='row'>
                <p className='resHeader'>Edit</p>
                {/* need to associate an ID to the indiv edits */}
                <button className='btns resItem ptr' onClick={() => {redirToEdit()}}>edit</button>
                <button className='btns resItem ptr' onClick={() => {redirToEdit()}}>edit</button>
              </div>
            </div>
          </div>
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
    return <div>
            <div className='indivItem'>
              <div className='row'>
                <p className='resItem resHeader'>Planet name</p>
                <p className='resItem'>adkvjnd</p>
                <p className='resItem'>avdkjnl</p>
              </div>
              
              <div className='row'>
                <p className='resItem resHeader'>Nation</p>
                <p className='resItem'>3</p>
                <p className='resItem'>2</p>
              </div>
              
              <div className='row'>
                <p className='resItem resHeader'>Star system</p>
                <p className='resItem'>1</p>
                <p className='resItem'>3</p>
              </div>

              <div className='row'>
                <p className='resItem resHeader'>Colonized</p>
                <p className='resItem'>yes</p>
                <p className='resItem'>no</p>
              </div>

              <div className='row'>
                <p className='resHeader'>Edit</p>
                {/* need to associate an ID to the indiv edits */}
                <button className='btns resItem ptr' onClick={() => {redirToEdit()}}>edit</button>
                <button className='btns resItem ptr' onClick={() => {redirToEdit()}}>edit</button>
              </div>
            </div>
          </div>
  }

  }

  return(
  <div className="centerDiv">
    <div className="content">
      <h1 className="subtopic text">Browsing Planets</h1>

      {/* <button onClick={() => {viewingOpt();}}>see which opt chosen</button> */}

      <div className="dropdownList">
        <select className='dropdown' onChange={e => setViewOpt(e.target.value)} id ="viewOpt">
          <option className='view'  defaultValue={'all'} value={"all"}>View all planets</option>
          <option className='view'  value={"nations"}>View planets from a specific nation</option>
          <option className='view'  value={"materials"}>View all materials from a planet</option>
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
