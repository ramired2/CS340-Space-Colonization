import React, {useState} from 'react';

const StarSystems = () => {
  const [viewOpt, setViewOpt] = useState("all");
  const [system, setSystem] = useState("which");
  // console.log(viewOpt)

  const redirToEdit = () => {
    window.location.href="http://localhost:3000/starsystemsedit"
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
                    <select className='dropdown' onChange={e => setSystem(e.target.value)} id ="viewOpt">
                    <option className='view'  defaultValue={'which'} value={"which"}>Pick a star system</option>
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
                    <p className='resItem resHeader'>System Name</p>
                    <p className='resItem'>adkvjnd</p>
                    <p className='resItem'>avdkjnl</p>
                  </div>

                  <div className='row'>
                    <p className='resItem resHeader'>Star Type</p>
                    <p className='resItem'>Red Dwarf</p>
                    <p className='resItem'>White Dwarf</p>
                  </div>
                  
                  <div className='row'>
                    <p className='resItem resHeader'>distance</p>
                    <p className='resItem'>3</p>
                    <p className='resItem'>2</p>
                  </div>
                  
                  <div className='row'>
                    <p className='resItem resHeader'>Total Planets</p>
                    <p className='resItem'>5</p>
                    <p className='resItem'>8</p>
                  </div>

                  <div className='row'>
                    <p className='resItem resHeader'>Total Colonized Planets</p>
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
      <h1 className="subtopic text">Browsing Star Systems</h1>

      {/* <button onClick={() => {viewingOpt();}}>see which opt chosen</button> */}

      <div className="dropdownList">
        <select className='dropdown' onChange={e => setViewOpt(e.target.value)} id ="viewOpt">
          <option className='view'  defaultValue={'all'} value={"all"}>View all star systems</option>
          <option className='view'  value={"specific"}>View number colonized planets by star systems</option>
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


export default StarSystems;
