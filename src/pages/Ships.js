import React, {useState} from 'react';

const Ships = () => {
  const [viewOpt, setViewOpt] = useState("all");
  const [nation, setNation] = useState("which");
  // console.log(viewOpt)

  const redirToEdit = () => {
    window.location.href="http://localhost:3000/shipsedit"
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
                    <label>Pick a nation</label>
                    <select className='dropdown' onChange={e => setNation(e.target.value)} id ="viewOpt">
                    <option className='view'  defaultValue={'which'} value={"which"}>Pick a nation</option>
                      <option className='view' value={"all"}>Canada</option>
                      <option className='view'  value={"specific"}>MX</option>
                    </select>
                  </div>

                  {/* once a nation is chosen send appropriate data */}
               </div>
      }
    
    else {
      // return all ships and nations 
      return <div>
                <div className='indivItem'>
                  <div className='row'>
                    <p className='resItem resHeader'>Ship Name</p>
                    <p className='resItem'>adkvjnd</p>
                    <p className='resItem'>avdkjnl</p>
                  </div>
                  
                  <div className='row'>
                    <p className='resItem resHeader'>Ship Speed</p>
                    <p className='resItem'>3</p>
                    <p className='resItem'>2</p>
                  </div>
                  
                  <div className='row'>
                    <p className='resItem resHeader'>Ship Capacity</p>
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

  return(
  <div className="centerDiv">
    <div className="content">
      <h1 className="subtopic text">Browsing Ships</h1>

      {/* <button onClick={() => {viewingOpt();}}>see which opt chosen</button> */}

      <div className="dropdownList">
        <select className='dropdown' onChange={e => setViewOpt(e.target.value)} id ="viewOpt">
          <option className='view'  defaultValue={'all'} value={"all"}>View all ships</option>
          <option className='view'  value={"specific"}>View Ships from a specific nation</option>
        </select>
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
