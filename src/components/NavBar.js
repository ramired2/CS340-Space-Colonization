import React, {useState, useEffect, Fragment} from 'react';

function Navbar(props) {  
    return (
            <div className="nav">
              <div className="navLogo">
                <img className="logo"  src="/European_Space_Camp_logo.jpg" alt="Space Colonization Logo" />
              </div>
  
              <div className="navLinks">
                <ul className="nav_list">
                  <div className='navList'>
                  <li id="nav_item" className="active"><a href="/">Home</a></li>
                  <li id="nav_item"><a href="/nations">Nations</a></li>
                  <li id="nav_item"><a href="/ships">Ships</a></li>
                  <li id="nav_item" className='longWord'><a href="/startypes">Star Types</a></li>
                  <li id="nav_item" className='longWord'><a href="/starsystems">Star Systems</a></li>
                  <li id="nav_item"><a href="/materials">Materials</a></li>
                  <li id="nav_item"><a href="/planets">Planets</a></li>
                  <li id="nav_item" className='longWord'><a href="/natl">Natural Resources</a></li>
                  <li id="nav_item" className='longWord'><a href="/produced">Produced Materials</a></li>
                  </div>
                </ul>
              </div>
           </div>
          );
  
  }
  
  export default Navbar;
  