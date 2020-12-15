const express = require('express');
const router = express.Router();
const csvToJSON = require('csvtojson');
const axios = require('axios');

//Course schema
const Course = require('../models/course_schema');

const API_KEY = process.env.API_KEY;

//Recursively calls itself to return all videos from next pages also
function getVideos(playlistID, pageToken, videos = []) {
	var url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=35&playlistId=${playlistID}&pageToken=${pageToken}&key=${API_KEY}`;
	return axios.get(url)
	.then(response => {
            //Extract data from response and store as [] of videos
			response.data.items.forEach(video => {
				var newVideo = {
					ID: video.snippet.resourceId.videoId,
					title: video.snippet.title,
					url: 'https://www.youtube.com/watch?v='+video.snippet.resourceId.videoId,
					description: video.snippet.description,
					thumbnail: video.snippet.thumbnails.default
				}
				videos.push(newVideo);
			});
        
        //If response is last page, return videos    
		if (response.data.nextPageToken == undefined) {
			return videos
        }
        //If more videos are left, fetch again using token
		else {
            //Recursively return all videos
			return getVideos(playlistID, response.data.nextPageToken, videos);	
	}});
}

//Return playlist data
function createAPI(playlistID, playlist = {}) {
	var pageToken = '';

    //retrieve all videos and save to playlist
	return getVideos(playlistID, pageToken)
	.then(videos => {
		console.log(videos.length);
		playlist = {videos: videos, noOfVideos: videos.length};
		return playlist;
	});
}

//Route to import data and save to DB
router.post('/generate/data', (req, res) => {
    console.log('hi');
    //Import courses from local csv file
	csvToJSON().fromFile('sheet.csv')
	.then(courses => {
		courses.forEach(course => {
            //Fetch data for each playlist
			createAPI(course['Playlist ID']).then(playlist => {
				const newCourse = new Course({
					title: course.Title,
					level: course.Level,
					language: course.Language,
					instructor: course.Instructor,
					quality: course.Quality,
					category: course.Category,
					subcategory: course.Subcategory,
                    subject: course.Subject,
                    playlistID: course['Playlist ID'],
                    playlistLink: course['Playlist Link'],
					playlist: playlist
                });

                //Save course (withh playlist data) to DB
				newCourse.save()
				.catch(err => {
                    res.send('error');
					console.log('Error: ', err.message);
				});
			});
        });

		res.send('success');
	})
	.catch(err => {
        res.send('error');
        console.log('Error: ', err.message);
    });
});

//API to send details of each course
router.get('/courses', (req, res) => {
    Course.find({}, {playlist: 0}, (err, courses) => {
        if (err) {
            res.send('error');
			console.log('Error: ', err.message);
        }
        else {
            res.json(courses);
        }
    })
});

//API to send playlist data based on id
router.get('/playlist/:playlistID', (req, res) => {
    Course.findOne({playlistID: req.params.playlistID}, (err, playlist) => {
        if (err) {
            res.send('error');
			console.log('Error: ', err.message);
        }
        else {
            res.json(playlist.playlist);
        }
    })
});

module.exports = router;