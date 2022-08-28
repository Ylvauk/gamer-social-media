import React, { useState } from "react";
import axios from "axios";

const AddPost = ({id, changeCount, setChangeCount}) => {
    const initialPostState = {
        title: '',
        body: '',
        user: localStorage.getItem('id'),
    }
    const [myPost, setMyPost] = useState(initialPostState)
    const handleChange = (e) => {
        setMyPost({...myPost, [e.target.id]: e.target.value})
    }
    const handleSubmit = (e) => {
        console.log(myPost)
        e.preventDefault();
		axios({
            method: 'post',
            url:`https://glacial-forest-84300.herokuapp.com/posts`, 
            data: myPost,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` 
            }
        })
        .then(() => {
            setChangeCount(changeCount + 1)
        })
        .catch((err) => {console.log(err)})
        setMyPost(initialPostState)
	};

    return (
        <form>
            <p>leave a Post!</p>
                <label htmlFor="title">Post Title</label>
                <input 
                    className="border" 
                    id="title"
                    value={myPost.title}
                    onChange={handleChange}>
                </input>
                <label htmlFor="body">Body</label>
                <textarea
                    type='text'
                    id="body"
                    value={myPost.body}
                    onChange={handleChange}>
                </textarea>
                <button 
                    onClick={handleSubmit}
                    onChange={(e) => setMyPost(e.target.value)}
                >Submit Post</button>
        </form>
    )
}

export default AddPost