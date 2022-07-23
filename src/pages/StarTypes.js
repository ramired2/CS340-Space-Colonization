import React, {useState} from 'react';

const StarTypes  = () => {
  const [viewOpt, setViewOpt] = useState("all");
  // console.log(viewOpt)

  const redirToEdit = () => {
    window.location.href="http://localhost:3000/startypesedit"
  }

  const genFormat = () => {
    return <div>
                <div className='indivItem'>
                  <div className='row'>
                    <p className='resItem resHeader'>Star Type</p>
                    <p className='resItem'>White Dwarf</p>
                    <p className='resItem'>Red Drawf</p>
                  </div>

                  <div className='row'>
                    <p className='resItem resHeader'>Edit</p>
                    {/* need to associate an ID to the indiv edits */}
                    <button className='btns resItem' onClick={() => {redirToEdit()}}>edit</button>
                    <button className='btns resItem' onClick={() => {redirToEdit()}}>edit</button>
                  </div>
                </div>
              </div>
  }

  const viewingOpt = () => {
    // return data depending on the option chosen
    return genFormat()
  }

  return(
  <div className="centerDiv">
    <div className="content">
      <h1 className="subtopic text">Browsing Star Types</h1>

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
