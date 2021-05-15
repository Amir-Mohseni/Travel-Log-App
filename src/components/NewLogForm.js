import React from 'react'

export default function NewLogForm({ changeNewLogData, createNewLog, newMarkerErr }) {
  return (
    <div>

      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>

      <div className="input-wrapper">
        <label htmlFor="title">Title:</label>
        <input onChange={ (event) => changeNewLogData( 'title', event.target.value ) } type="text" id="title" name="title" />
      </div>

      <div className="input-wrapper">
        <label htmlFor="desc">Description:</label>
        <input onChange={ (event) => changeNewLogData( 'description', event.target.value ) } type="text" id="desc" name="desc" />
      </div>

      <div className="input-wrapper">
        <label htmlFor="comment">Comments:</label>
        <input onChange={ (event) => changeNewLogData( 'comments', event.target.value ) } type="text" id="comment" name="comment" />
      </div>

      <div className="input-wrapper">
        <label htmlFor="image">Image URL:</label>
        <input onChange={ (event) => changeNewLogData( 'image', event.target.value ) } type="text" id="image" name="image" />
      </div>

      <div className="input-wrapper">
        <label htmlFor="date">Visit Date:</label>
        <input onChange={ (event) => changeNewLogData( 'visitDate', event.target.value ) } type="date" id="date" name="date" />
      </div>

      <button className="addNewMarkerBtn" onClick={createNewLog}>Add New Marker</button>
      <small className="new-marker-err">{newMarkerErr}</small>

    </div>
  )
}
