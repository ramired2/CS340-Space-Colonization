import React, {useState} from 'react';

const Nations = () => {
  const [viewOpt, setViewOpt] = useState("all");
  const [orderBy, setorderBy] = useState("asc");

  const [data, setdata] = useState(null);
  

  const redirToEdit = () => {
    window.location.href="http://localhost:3000/nationsedit"
  }

  const genFormat = () => {
    return <div>
            <div className='indivItem'>
              <div className='row'>
                <p className='resItem resHeader'>Nation Name</p>
                <p className='resItem'>Canada</p>
                <p className='resItem'>MX</p>
              </div>
              
              <div className='row'>
                <p className='resItem resHeader'>Ships Owned</p>
                <p className='resItem'>3</p>
                <p className='resItem'>2</p>
              </div>
              
              <div className='row'>
                <p className='resItem resHeader'>Planets Colonized</p>
                <p className='resItem'>1</p>
                <p className='resItem'>3</p>
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
    // console.log(viewOpt, orderBy)
    
    // API call based on options chosen
    if (viewOpt == "all") {
      console.log("API call for all nations")
    }
    else if (viewOpt == "noShips"){
      console.log("API call for has no ships")
    }
    else if (viewOpt == "ships") {
      console.log("API call for has ships")
    }
    else if (viewOpt == "hadColonized"){
      console.log("API call for colonized planets")
    }
    else {
      console.log("API call for no colonized planets")
    }
    
    // return data depending on the option chosen
    // HARD CODED DATA
      return genFormat()
  }

  return(
  <div className="centerDiv">
    <div className="content">
      <h1 className="subtopic text">Nations Browsing</h1>
    
      <div className="dropdownList">
        <select className='dropdown' onChange={e => setViewOpt(e.target.value)} id ="viewOpt">
          <option className='view' defaultValue={'all'} value={"all"}>View all Nations</option>
          <option className='view' value={"noShips"}>Nations without ships</option>
          <option className='view' value={"ships"}>Nations with ships</option>
          <option className='view' value={"hasColonized"}>Nations without colonized planets</option>
          <option className='view' value={"noColonized"}>Nations with colonized planets</option>
        </select>

        <select className='dropdown' onChange={e => setorderBy(e.target.value)} id ="viewOpt">
          <option className='view' defaultValue={'orderby'} value={"orderby"}>Order by</option>
          <option className='view' value={"asc"}>Ascending</option>
          <option className='view' value={"desc"}>Descending</option>
        </select>
      </div>

      <div className='showingRes'>
        {viewingOpt()}
      </div>
      
    </div>
  </div>
  );
}


export default Nations;
