import React, {useState, useEffect} from 'react'
import './styles.css'

function Course(props) {
    return (
        <div className="course">
            {JSON.stringify(props.course)}
            <button onClick={() => fetchPlaylist(props.course.playlistID)}>Fetch playlist data</button>
        </div>
    )

    function fetchPlaylist(id) {
        fetch(`http://localhost:9000/api/playlist/${id}`)
        .then(res => res.json())
        .then(res => {
            props.setPlaylist(res)
        })
    }
}


export default Course