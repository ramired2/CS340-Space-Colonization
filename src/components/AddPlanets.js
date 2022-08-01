import React, {useState, useRef, useEffect} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const AddPlanets = () => {
    
    const [name, setname] = useState("");
    const [colonized, setcolonized] = useState("");
    const [ownerID, setownerID] = useState("");
    const [systemID, setsystemID] = useState("");

    const [data, updateData] = useState([])
    const [nationDropdown, setnationDropdown] = useState([]);
    const [systemDropdown, setsystemDropdown] = useState([]);

    useEffect(() => {
      dropddownNations()
      dropdownSations()
    }, []);

  
  //   // return page
    let link = "/planets"
  
    const history = useHistory();
  
  //   // API call for creating a new tree
    const createEmpty = async(e) => {
  
      e.preventDefault();
      await axios.post('https://cs340-spacecol-api.herokuapp.com/addplanet', {
        method:'POST',
        headers: { 'Content-Type': 'application/json'},
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
      const result = await axios ("https://cs340-spacecol-api.herokuapp.com/dropdownsystems", {
        headers: { 'Content-Type': 'application/json'},
      })
      .then(result => setsystemDropdown(result.data))
      .catch(err => console.log(err));
  
      console.log(systemDropdown)
    }

    // dropdown nations
    const dropddownNations = async() => {
      const result = await axios ("https://cs340-spacecol-api.herokuapp.com/dropdownNations", {
        headers: { 'Content-Type': 'application/json'},
      })
      .then(result => setnationDropdown(result.data))
      .catch(err => console.log(err));
  
      console.log(nationDropdown)
    }

    const nameRef = useRef()
    const nationRef = useRef()
    const systemIDRef = useRef()
    const colonizedRef = useRef()

    function handleAddPerson(e){
      const names = nameRef.current.value
      const nationName = nationRef.current.value
      const systemID = systemIDRef.current.value
      const colonized = colonizedRef.current.value

      if (names === '' || nationName === '' || systemID === '' || colonized === '') return

      updateData(prevData => {
        return [...prevData, {planetID: 1, planetName: names, nationName: nationName, systemID: systemID, colonized: colonized}]
      })

      console.log(name)
      nameRef.current.value = null
      nationRef.current.value = null
      systemIDRef.current.value = null
      colonizedRef.current.value = null
    }
  
  
    return (
      <div className='content centerDiv formContent'>
        <form id="target" action={link} encType="multipart/form-data" onSubmit={createEmpty}>
          <label className='subtopic text'>Add a Planet</label>
          <div className='formContainer'>
            <div><input className='indivItem formItem' ref={nameRef} type="text" placeholder="Planet Name" value={name} onChange={(e) => setname(e.target.value)}/></div>
          </div>
          <div className='dropdownList editAddbtn'>
                <select id = "ownerID" className='dropdown' ref={nationRef} onChange={(e) => setownerID(e.target.value)}>
                    <option className='indivItem formItem' value={"NULL"} >Planet Owner</option>
                    {/* <option className='indivItem formItem' value={"empty"} >Remove Current Nation</option> */}
                    {nationDropdown.map((item, index) => (
                      <option key={index} className='indivItem formItem' value={item.nationID} >{item.nationName}</option>
                    ))}
                </select>
            </div>
          <div className='dropdownList editAddbtn'>
                  <select id = "colonizedStat" className='dropdown' ref={colonizedRef} onChange={e => setcolonized(e.target.value)}>
                      <option className='indivItem formItem' value={"empty"} >Colonized Status</option>
                      <option className='indivItem formItem' value={1} >No</option>
                      <option className='indivItem formItem' value={0} >Yes</option>
                  </select>
          </div>
          <div className='dropdownList editAddbtn'>
                    <select id = "ownerID" className='dropdown' ref={systemIDRef} onChange={(e) => setsystemID(e.target.value)}>
                        <option className='indivItem formItem' value={"empty"} >Star System</option>
                        {systemDropdown.map((item, idx) => (
                          <option key={idx} className='indivItem formItem' value={item.systemID} >{item.systemName}</option>
                        ))}
                    </select>
            </div>
          <div className='buttonsInline'>
            <button className='btns indivItem formItem' onClick={() => {history.push(link);}}>Back</button>
            <button className="btns indivItem formItem" type="submit"  onClick={ handleAddPerson }>Add Planet</button>
          </div>
        </form>
        
      </div>
      );
    }
    
    
    export default AddPlanets;