import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const EditPlanets = (props) => {
    //   const [parent, setParent] = useState("");
      const [name, setname] = useState("");
      const [colonized, setcolonized] = useState("");
      const [ownerID, setownerID] = useState("");
      const [systemID, setsystemID] = useState("");

      const [ownername, setownername] = useState("");
      const [systemname, setsystemname] = useState("");

      const [nationDropdown, setnationDropdown] = useState([]);
      const [systemDropdown, setsystemDropdown] = useState([]);

      useEffect(() => {
        dropddownNations()
        dropdownSations()
        preload();
      }, []);

    
    //   // return page
      let link = "/planets"
      
      const id = props.match.params.id;
      let getLink = 'http://localhost:5000/editplanet/' + id
      const history = useHistory();
    
    //   // API call for creating a new tree
    const createEmpty = async(e) => {

      console.log("sys id is ")
      console.log(systemID)

      e.preventDefault();
      await axios.post("http://localhost:5000/editplanet", {
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

      const preload = async() => {
        await axios ('http://localhost:5000/getplsnetsbyID/'+ id, {
          method:'GET',
          headers: { 'Content-Type': 'application/json'},
        }).then(result => {
    
          setname(result.data[0]['planetName'])
          setcolonized(result.data[0]['nationName'])
          setownerID(result.data[0]['nationID'])
          setsystemID(result.data[0]['systemID'])

          setownername(result.data[0]['nationName'])
          setsystemname(result.data[0]['systemName'])

          console.log(result.data[0])
    
        })
        .catch(err => console.log(err));
      };

      // dropdown system IDS
      const dropdownSations = async() => {
        const result = await axios ("http://localhost:5000/dropdownsystems", {
          headers: { 'Content-Type': 'application/json'},
        })
        .then(result => setsystemDropdown(result.data))
        .catch(err => console.log(err));
    
        console.log(systemDropdown)
      }

      // dropdown nations
      const dropddownNations = async() => {
        const result = await axios ("http://localhost:5000/dropdownNations", {
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
              <div><input className='indivItem formItem' type="text" placeholder="Planet Name" value={name} onChange={(e) => setname(e.target.value)}/></div>
            </div>
            <div className='dropdownList editAddbtn'>
                <select id = "ownerID" className='dropdown' onChange={(e) => setownerID(e.target.value)}>
                    <option className='indivItem formItem' value={ownerID} >{ownername == null? "no owner": ownername}</option>
                    <option className='indivItem formItem' value={0} >{"Remove owner"}</option>
                    {nationDropdown.map((item, index) => (
                      <option key={index} className='indivItem formItem' value={item.nationID} >{item.nationName}</option>
                    ))}
                </select>
            </div>
            <div className='dropdownList editAddbtn'>
                    {/* <label>Colonized Status: </label> */}
                    <select id = "colonizedStat" className='dropdown' onChange={(e) => setcolonized(e.target.value)}>
                    <option className='indivItem formItem' value={colonized} >{colonized == 1? "no" : "yes"}</option>
                        <option className='indivItem formItem' value={1} >yes</option>
                      <option className='indivItem formItem' value={0} >no</option>
                    </select>
            </div>
            <div className='dropdownList editAddbtn'>
                    <select id = "ownerID" className='dropdown' onChange={(e) => setsystemID(e.target.value)}>
                        <option className='indivItem formItem' value={systemID} >{systemname}</option>
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