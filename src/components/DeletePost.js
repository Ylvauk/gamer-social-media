import { useState } from "react";
import axios from "axios";

const DeletePost = ({postId, post, changeCount, setChangeCount}) => {
    const handleDelete = (postId) => {
        axios({method:'delete',
            url:``,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` 
            }
        })
        .then(() => {setChangeCount(changeCount + 1)})
    }
    const [checkDelete, setCheckDelete] = useState(false)

    const checkForDelete = () => {
        setCheckDelete(!checkDelete)
    }
    const exitDelete = () => {
        setCheckDelete(false)
    }
    return(
        <div className="del-review">
            <button type="button" onClick={checkForDelete}>Delete Review</button>
            {checkDelete ? 
                <div>
                <p>Are you sure you want to delete ?</p>
                <button onClick={() => handleDelete(post._id)}>Confirm</button>
                <button onClick={exitDelete}>Cancel</button>
                </div> 
                : 
                null
            }
        </div>
    )
}

export default DeletePost