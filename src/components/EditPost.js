import axios from "axios"
import { useState } from "react"

const EditPost = ({post, changeCount, setChangeCount}) => {
    const [edit, setEdit] = useState(false)
    const [editedPost, setEditedPost] = useState(post)

    const handleChange = (e) => {
        setEditedPost({...editedPost, [e.target.id]: e.target.value})
    }
    const editPost = () => {
        setEdit(!edit)
    }
    const handleEdit = (id) => {
        setEditedPost({...editedPost, postId: id})
        axios({
            method: 'put',
            url:`https://young-anchorage-22001.herokuapp.com/reviews/${id}`,
            data:editedPost,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` 
            }
        })
        .then(() => {
            setChangeCount(changeCount + 1)
            editPost()
        })
        .catch(console.error)
    } 
    return( 
        <>
            <button type="button" onClick={editPost}>Edit Post</button>
            {edit ?
            <form>
                <label>Edit Title</label>
                <input
                    className='border'
                    type='text'
                    id='title'
                    value={editedPost.title}
                    onChange={handleChange}>
                </input>
                <label htmlFor="body">Edit Body</label>
                <textarea 
                    type='text'
                    id='body'
                    value={editedPost.body}
                    onChange={handleChange}
                    >
                </textarea>
                <button type="button" onClick={() => handleEdit(post._id)}>Submit Changes</button>
            </form>
            : null
            }
        </>
    )
}

export default EditPost;