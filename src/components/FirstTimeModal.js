import React from 'react'

export default function FirstTimeModal({ showAgain, setShowAgain, closeOpeningModal }) {
  return (
    <div className="fist-visit-wrapper">
      <div className="fist-visit-modal">
        <h1>Welcome to my travel journal</h1>
        <p>This is my personal travel journal which I keep record of visited places or places I want to visit in the future. You are welocme to take a look at my entry logs. If you wish to add a place, double click on the place you intend to add and fill in the information for it. Happy sightseeing!</p>
        
        <div className="dont-show-again">
          <input type="checkbox" onChange={ () => setShowAgain(!showAgain) } name="dontshowagain" id="dontshowagain" />
          <label htmlFor="dontshowagain">Dont show this again.</label>
        </div>

        <button className="gotitbtn" onClick={closeOpeningModal} >Got it</button>
        
      </div>
    </div>
  )
}
