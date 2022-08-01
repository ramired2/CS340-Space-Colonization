import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const EditPlanets = (props) => {
    //   const [parent, setParent] = useState("");
      const [name, setname] = useState("");
      const [colonized, setcolonized] = useState("");
      const [ownerID, setownerID] = useState("");
      const [systemID, setsystemID] = useState("");

      const [nationDropdown, setnationDropdown] = useState([]);
      const [systemDropdown, setsystemDropdown] = useState([]);

      useEffect(() => {
        dropddownNations()
        dropdownSations()
      }, []);

    
    //   // return page
      let link = "/planets"
      
      const id = props.match.params.id;
      let getLink = '/editplanet/' + id
      const history = useHistory();
    
    //   // API call for creating a new tree
    const createEmpty = async(e) => {
      e.preventDefault();
      await axios.post("/editplanet", {
          method:'POST',
          headers: { 'Content-Type': 'application/json'},
          planetID: id,
          nationID: ownerID, 
          name: name,
          systemID: systemID,
          colonized: colonized
        });
        
        // redirects user back to their works page
        history.push(link);
      }

      // dropdown system IDS
      const dropdownSations = async() => {
        const result = await axios ("/dropdownsystems", {
          headers: { 'Content-Type': 'application/json'},
        })
        .then(result => setsystemDropdown(result.data))
        .catch(err => console.log(err));
    
        console.log(systemDropdown)
      }

      // dropdown nations
      const dropddownNations = async() => {
        const result = await axios ("/dropdownNations", {
          headers: { 'Content-Type': 'application/json'},
        })
        .then(result => setnationDropdown(result.data))
        .catch(err => console.log(err));
    
        console.log(nationDropdown)
      }
  
      return (
        <div className='content centerDiv formContent'>
          <form id="target" action={link} encType="multipart/form-data" onSubmit={createEmpty}>
            <label className='subtopic text'>Edit a Planet</label>
            <div className='formContainer'>
              <div><input className='indivItem formItem' /* ref={parentRef} */ type="text" placeholder="Planet Name" value={name} onChange={(e) => setname(e.target.value)}/></div>
            </div>
            <div className='dropdownList editAddbtn'>
                <select id = "ownerID" className='dropdown' onChange={(e) => setownerID(e.target.value)}>
                    <option className='indivItem formItem' value={"NULL"} >Planet Owner</option>
                    {/* <option className='indivItem formItem' value={"empty"} >Remove Current Nation</option> */}
                    {nationDropdown.map((item, index) => (
                      <option key={index} className='indivItem formItem' value={item.nationID} >{item.nationName}</option>
                    ))}
                </select>
            </div>
            <div className='dropdownList editAddbtn'>
                    <select id = "colonizedStat" className='dropdown' onChange={(e) => setcolonized(e.target.value)}>
                        <option className='indivItem formItem' value={"empty"} >Colonized Status</option>
                        <option className='indivItem formItem' value={1} >Yes</option>
                        <option className='indivItem formItem' value={0} >No</option>
                    </select>
            </div>
            <div className='dropdownList editAddbtn'>
                    <select id = "ownerID" className='dropdown' onChange={(e) => setsystemID(e.target.value)}>
                        <option className='indivItem formItem' value={"empty"} >Star System</option>
                        {systemDropdown.map((item, idx) => (
                          <option key={idx} className='indivItem formItem' value={item.systemID} >{item.systemName}</option>
                        ))}
                    </select>
            </div>
            <div className='buttonsInline'>
              <button className='btns indivItem formItem' onClick={() => {history.push(link);}}>Back</button>
              <button className="btns indivItem formItem" type="submit">Edit Planet</button>
            </div>
          </form>
          
        </div>
      );
    }
    
    
    export default EditPlanets;