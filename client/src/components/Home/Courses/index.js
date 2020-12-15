import React, {useState, useEffect} from 'react'
import Course from './Course'
import Playlist from './Playlist'

function Courses(props) {
    const [playlist, setPlaylist] = useState(false)

    useEffect(() => {
        fetch('http://localhost:9000/api/courses')
        .then(res => res.json())
        .then(res => {
            console.log(res)
            props.setCourses(res)
        })
    }, [])

    return (
        <div className="courses">
            <h2>Courses</h2>
            <div className="disclaimer">Click on the fetch playlist data button to retrieve data from playlist api</div>
                    
            {props.courses.map(course => {
                return <Course course={course} playlist={playlist} setPlaylist={setPlaylist}/>
            })}

            {
                playlist && <Playlist playlist={playlist} setPlaylist={setPlaylist}/>
            }
        </div>
    )
}

export default Courses