import React, {useState} from 'react';

const StarTypes  = () => {
  const [viewOpt, setViewOpt] = useState("all");
  // console.log(viewOpt)

  const redirToEdit = () => {
    window.location.href="http://localhost:3000/startypesedit"
  }

  const viewingOpt = () => {
    var e = document.getElementById("viewOpt");
    // setViewOpt(e.value)

    // console.log(e.value)
    // console.log(viewOpt)
    
    // API call based on options chosen
    // if (e.value == "all") {}
    
    // return data depending on the option chosen
      return <div>
                <div className='indivItem'>
                  <div className='row'>
                    <p className='resItem resHeader'>Star Type</p>
                    <p className='resItem'>White Dwarf</p>
                    <p className='resItem'>Red Drawf</p>
                  </div>

                  <div className='row'>
                    <p className='resHeader'>Edit</p>
                    {/* need to associate an ID to the indiv edits */}
                    <button className='btns resItem' onClick={() => {redirToEdit()}}>edit</button>
                    <button className='btns resItem' onClick={() => {redirToEdit()}}>edit</button>
                  </div>
                </div>
              </div>
    

  }

  return(
  <div className="centerDiv">
    <div className="content">
      <h1 className="subtopic text">Browsing Star Types</h1>

      {/* <button onClick={() => {viewingOpt();}}>see which opt chosen</button> */}

      <div className="dropdownList">
        <select className='dropdown' value ={"all"} id ="viewOpt">
          <option className='view' defaultValue={'all'} value={"all"}>View all star types</option>
        </select>
      </div>

      <div className='showingRes'>
        {viewingOpt()}
      </div>
      
    </div>
  </div>
  );
}


export default StarTypes;
