import React from 'react'
import { Marker, Popup } from 'react-map-gl';

export default function RenderMarkers({ markers, showPopup, setshowPopup, showMarkersText }) {
  return (
    <div>
      {
        markers.map( marker => (
          <div key={`${marker._id}_div`}>
            <Marker key={marker._id} latitude={marker.latitude} longitude={marker.longitude}>
              <div className="marker-div" onClick={ () => setshowPopup(marker) } >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <h3>{ showMarkersText ? marker.title : '' }</h3>
              </div>
            </Marker>
            {
              showPopup !== false && <Popup 
              latitude={showPopup.latitude}
              longitude={showPopup.longitude}
              closeButton={true}
              closeOnClick={false}
              onClose={ () => setshowPopup(false) }
              anchor="top"
              key={`${marker._id}_popup`}
              >
                <div className="marker-popup">
                  <h4> {showPopup.title}</h4>
                  <p> {showPopup.description}</p>
                  <div className="visited-rate">
                    <small >Visited on: { new Date(showPopup.visitDate).toLocaleDateString() }</small>
                    <small >Rate: { showPopup.rating }/10</small>
                  </div>
                  <div className="marker-img">
                    <img src={showPopup.image} alt={showPopup.title} />
                  </div>
                </div>
              </Popup>
            }
          </div>
        ))
      }
    </div>
  )
}
