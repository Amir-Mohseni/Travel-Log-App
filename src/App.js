import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL from 'react-map-gl';
import FirstTimeModal from './components/FirstTimeModal'
import RenderMarkers from './components/RenderMarkers'
import AddMarkerPopup from './components/AddMarkerPopup'
import mapboxgl from 'mapbox-gl';

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const App = () => {

  // Initializing States
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 42,
    longitude: -100,
    zoom: 4
  });
  const [markers,setMarkers] = useState([])
  const [showPopup,setshowPopup] = useState(false)
  const [showAddMarkerPopup,setShowAddMarkerPopup] = useState(false)
  const [newMarkerInfo,setNewMarkerInfo] = useState({})
  const [newMarkerErr,setNewMarkerErr] = useState('')
  const [firstVisit,setFirstVisit] = useState(false)
  const [showAgain,setShowAgain] = useState(true)

  // Fetching Entry logs from API and initializing first time visit module
  useEffect( () => {

    loadLogs()

    const isFirstTime = localStorage.getItem('haveBeenVisited') || false

    if( !isFirstTime ) setFirstVisit(true)

  },[])

  // Function for fetching travel logs
  const loadLogs = async () => {
    let AllMarkers = await fetch( `${process.env.REACT_APP_MARKER_API}/api/logs`)
    AllMarkers = await AllMarkers.json()
    setMarkers(AllMarkers.markers)
  }

  // Extracting new marker coordinations for creating new marker with api
  const showAddMarker = (event) => {

    const [lng,lat] = event.lngLat
    setNewMarkerInfo({ longitude: lng, latitude: lat })
    setShowAddMarkerPopup(true)

  }

  // Runs everytime form inputs for new travel log changes and updates the state
  const changeNewMarker = (name,value) => {
    if( !name.length || !value.length ){
      return
    }
    setNewMarkerInfo({ ...newMarkerInfo, [name]: value })
  }

  // Validate and send post request for creating new marker
  const createNewMarker = async () => {

    if( 
      !newMarkerInfo.title
    ) {
      setNewMarkerErr('Title of the new marker should be provided.')
      return
    }

    let addNewMarker = await fetch( `${process.env.REACT_APP_MARKER_API}/api/add`, {
      method: 'POST',
      body: JSON.stringify(newMarkerInfo),
      headers: {
        "Content-Type": "application/json"
      }
    })
    addNewMarker = await addNewMarker.json()

    if( addNewMarker._id ){
      setMarkers([ ...markers, newMarkerInfo ])
    }

    setShowAddMarkerPopup(false)
    setNewMarkerInfo({})

  }

  // Closes first time modal and saves new variable in local storage if user checked 'Dont show again' checkbox
  const closeOpeningModal = () => {

    if( !showAgain ) localStorage.setItem('haveBeenVisited',true)
    setFirstVisit(false)

  }

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/iliya-mh/ckoo5fjsrb35c17qeukklg2x7"
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapboxApiAccessToken={process.env.REACT_APP_MAP_GL_TOKEN}
      onDblClick={showAddMarker}
    >
      { 
        firstVisit && <FirstTimeModal showAgain={showAgain} setShowAgain={setShowAgain} closeOpeningModal={closeOpeningModal} />
      }

      {
        <RenderMarkers markers={markers} showPopup={showPopup} setshowPopup={setshowPopup} />
      }

      {
        showAddMarkerPopup !== false && 
        <AddMarkerPopup 
          newMarkerInfo={newMarkerInfo} 
          setShowAddMarkerPopup={setShowAddMarkerPopup} 
          setNewMarkerInfo={setNewMarkerInfo}
          changeNewMarker={changeNewMarker}
          createNewMarker={createNewMarker}
          newMarkerErr={newMarkerErr}
        />
      }

    </ReactMapGL>
  );
}

export default App