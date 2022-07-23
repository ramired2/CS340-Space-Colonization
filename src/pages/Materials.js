import React, {useState} from 'react';

const Materials = () => {
  const [viewOpt, setViewOpt] = useState("all");
  const [specific, setspecific] = useState("specific");
  // console.log(viewOpt)

  const redirToEdit = () => {
    window.location.href="http://localhost:3000/materialsedit"
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
      </div>

      <div className='showingRes'>
        {viewingOpt()}
      </div>
      
    </div>
  </div>
  );
}


export default Materials;
