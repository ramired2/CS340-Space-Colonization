import React, {useState, useRef, useEffect} from 'react';
import axios from 'axios';

const Homepage = () => {

  const [data, setdata] = useState([]);

  useEffect(() => {
    allPlanets()
    
  }, []);

  const allPlanets = async() => {
    const result = await axios ("https://cs340-spacecol-api.herokuapp.com/dropdownNations", {
      headers: { 'Content-Type': 'application/json'},
    })
    .then(result => setdata(result.data))
    .catch(err => console.log(err));

    console.log(data)
  }

  return(
  <div className="centerDiv">
    <div className="content">
      <h1 className="subtopic text">Space Colonization</h1>

      <div>
         <h4 className='subsubtopic'>Nations participating in the Space Colonization of xx34</h4>
        <ul>
          {data.map((item, idx) => (
              <li key={idx} className='centerIt text'>{item.nationName}</li>
              ))}
        </ul>
      </div>
     

      <h4 className='subsubtopic'>Our Mission Statement</h4>
      <p className='description text'>
        With improved technology and fewer natural resources on Earth, nations 
        are sending their people to outer space to begin claiming different 
        planets and finding what natural resources can be found in these newly 
        colonized planets. With all these nations rushing to colonize a planet 
        it is becoming increasingly difficult for the UN to keep track of who 
        owns what planet and prevent nations from sending unnecessary amounts 
        of ships on voyages so that other nations may have the opportunity to 
        colonize a planet. </p>
        
        <p className='description text'>Wanting to avoid conflicts such as space wars and 
        allow all 1500 nations a more equal opportunity to partake in conquests, 
        the UN is in need of a web database that will help them keep track and 
        plan ongoing space colonization initiatives without conflicts happening 
        between nations regarding ownership of planets or resources. Due to the 
        vast size of space and the complexity of precise locations in space, the 
        UN is requiring that planets be categorized by their star systems and 
        their star types in order to make it simpler to plan voyages and track 
        how many planets have been colonized in that star system.</p>

      <h4 className='subsubtopic'>Regulations</h4>
        <p className='description text'>As per UN mandates, each planet can 
        currently be owned by a single 
        nation and each nation can own at most five planets. The first nation 
        to travel to a planet is granted ownership and is allowed to retrieve 
        natural resources found on the planet. As of now, no planet is exempt 
        from being able to be colonized. In order to prevent the rampant 
        inequality that caused the Crisis of the 21st Century, the UN mandates 
        that each nation may only export at most 7 natural resources from their 
        conquests. Nations can use the database to track what natural resources 
        have been found on a planet. From these natural resources, nations 
        further want to keep track of the materials their colonized planets 
        have produced and have available to export. Moreover, in order to give 
        a better opportunity to nations that cannot afford the expensive ships 
        or their maintenance fees to travel to space, all nations must have ten 
        or fewer ships in their ownership. As of now, only 67 nations are 
        formally participating in the space colonization race with a total of 
        140 planets colonized so far and 60 natural resources claimed as of 
        recent.</p>
      <div>
      </div>
      
    </div>
  </div>
  );
}


export default Homepage;
