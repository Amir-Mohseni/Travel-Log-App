import React from 'react'
import NewLogForm from './NewLogForm'
import { Popup } from 'react-map-gl';

export default function AddMarkerPopup({ newMarkerInfo, setShowAddMarkerPopup, setNewMarkerInfo, changeNewMarker, createNewMarker, newMarkerErr }) {
  return (
    <div>
      {
        <Popup 
          latitude={newMarkerInfo.latitude}
          longitude={newMarkerInfo.longitude}
          closeButton={true}
          closeOnClick={false}
          onClose={ () => {
            setShowAddMarkerPopup(false)
            setNewMarkerInfo({})
          } }
          anchor="top"
          >
            <div className="new-marker-popup">

              <NewLogForm changeNewLogData={changeNewMarker} createNewLog={createNewMarker} newMarkerErr={newMarkerErr} />

            </div>
        </Popup>
      }
    </div>
  )
}
