import React from 'react'

function Video(props) {
    return (
        <div className="video">
            <h4>Title: {props.video.title}</h4>
            <img src={props.video.thumbnail.url} />
            <h4>{JSON.stringify(props.video)}</h4>
        </div>
    )
}

function Playlist(props) {
    return (
        <div className="playlist">
            <h2>Playlist Data</h2>
            <div className="videos">
            {
                props.playlist.videos.map(video => {
                    return <Video video={video} />                
                })
            }
            </div>
        </div>
    )
}


export default Playlist