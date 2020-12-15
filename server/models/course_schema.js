const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    title: {
        type: String
    },
    level: {
        type: String
    },
    language: {
        type: String
    },
    instructor: {
        type: String
    },
    quality: {
        type: String
    },
    category: {
        type: String
    },
    subcategory: {
        type: String
    },
    subject: {
        type: String
    },
    playlistLink: {
        type: String
    },
    playlistID: {
        type: String
    },
    playlist: {
        noOfVideos: {
            type: String
        },
        description: {
            type: String
        },
        videos: [{
            ID: {
                type: String
            },
            title: {
                type: String
            }, 
            url: {
                type: String
            },
            description: {
                type: String
            },
            thumbnail: {
                url: {
                    type: String
                },
                width: {
                    type: Number
                }, 
                height: {
                    type: Number
                }
            },
        }]
    }														
});

module.exports = mongoose.model('Course', courseSchema);