import React, {useState} from 'react'
import axios from 'axios'

import Courses from './Courses'

function Home () {
    const [isGenerated, setIsGenerated] = useState(false);
    const [viewCourses, setViewCourses] = useState(false);
    const [courses, setCourses] = useState([]);

    return (
        <div className="Home">
            <h1>SuperSkool || Backend Intern || Assignment</h1>

            {
                !isGenerated ? 
                (
                    <>
                    <div className="disclaimer">Click on the generate API button only once to upload data from CSV to mongoDB</div>
                    <button onClick={ () => generateAPI() }> Generate API </button>

                    <div className="disclaimer">If data is already generated, and you are reloading: </div>
                    <button onClick={ () => setIsGenerated(true) }> Click here</button>
                    </>
                ) 
                : 
                (
                    <>
                    <div className="disclaimer">Successfully generated data. Now click on Fetch Courses to view course details</div>
                    <button onClick={ () => setViewCourses(true) }> Fetch Course Details </button>

                    { viewCourses &&
                    <Courses courses={courses} setCourses={setCourses} />
                    }
                    </>
                )
            }
        </div>
    ) 

    function generateAPI() {
        axios.post('http://localhost:9000/api/generate/data/')
        .then(res => {
            if (res.data === 'success')
                setIsGenerated(true)
        })
        .catch(err => {
            console.log(err.message)
        });
    }
}

export default Home