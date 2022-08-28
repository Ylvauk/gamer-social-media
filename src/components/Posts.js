import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AddPost from './AddPost';
import EditPost from './EditPost';
import DeletePost from './DeletePost';

const Posts=()=>{
    const { id } = useParams()
    const [postList,setPostList]=useState([])
    const [changeCount, setChangeCount]=useState(0)

    useEffect(() => {
        const fetchData=async () =>{
            await axios.get(`https://glacial-forest-84300.herokuapp.com/posts`)
            .then((res) => {
                setPostList(res.data)
            })
        }
        fetchData()
            .catch(console.error)
    },[id,changeCount])

    return (
        <div >
        {localStorage.getItem('id') ?
                <AddPost 
                    id={id}
                    changeCount={changeCount}
                    setChangeCount={setChangeCount}
                />
            : <Link to="/" >Sign In to Leave a Review!</Link>
            }
            {postList.map((post) => (
                <div key={post._id} >
                    <h3 >{post.title}</h3>
                    <p >{post.body}</p>
                    {post.toString() === localStorage.getItem('id') ? 
                        <div >
                            <div className="del-review">
                                <DeletePost 
                                    foodTruckId={id}
                                    post={post}
                                    changeCount={changeCount}
                                    setChangeCount={setChangeCount}
                                />
                            </div>
                            <div className='edit-review'>
                                <EditPost 
                                    post ={post}
                                    changeCount={changeCount}
                                    setChangeCount={setChangeCount}
                                />
                            </div>
                        </div>
                        : null
                    }
                </div>
            ))}
        </div>
    );
};

export default Posts;