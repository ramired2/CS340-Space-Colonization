import React, {useState} from 'react';

const Nations = () => {
  const [viewOpt, setViewOpt] = useState("all");
  const [orderBy, setorderBy] = useState("asc");

  const [data, setdata] = useState(null);
  

  const redirToEdit = () => {
    window.location.href="http://localhost:3000/nationsedit"
  }

  const deleteData = (id) => {
    // API call
    console.log("wants to delete id: ", id)
  }

  const redirToAdd = () => {
    window.location.href="http://localhost:3000/nationsadd"
    
  }

  const genFormat = () => {
    return <table className='resTable'>
            <thead>
              <tr>
                <td className='resItem resHeader'>Nation Name</td>
                <td className='resItem resHeader'>Ships Owned</td>
                <td className='resItem resHeader'>Planets Colonized</td>
                <td className='resItem resHeader'>Edit</td>
                <td className='resItem resHeader'>Delete</td>
              </tr>
            </thead>

            {/* would map out data here */}
            <tbody>
              <tr>
                <td className='resItem'>Canada</td>
                <td className='resItem'>5</td>
                <td className='resItem'>2</td>
                <td><button className='btns' onClick={() => {redirToEdit()}}>edit</button></td>
                <td><button className='btns' onClick={() => {deleteData()}}>delete</button></td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td className='resItem'>Mx</td>
                <td className='resItem'>3</td>
                <td className='resItem'>1</td>
                <td><button className='btns' onClick={() => {redirToEdit()}}>edit</button></td>
                <td><button className='btns' onClick={() => {deleteData()}}>delete</button></td>
              </tr>
            </tbody>
          </table>
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

      <p className="description text">Browse though the UN member nations participating in the colonization project.</p>
    
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
        <button className='btns adding' onClick={() => {redirToAdd()}}>+</button>
      </div>

      <div className='showingRes'>
        {viewingOpt()}
      </div>
      
    </div>
  </div>
  );
}


export default Nations;
