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
        <div className='h-3/5 overflow-auto bg-slate-200'>
        {localStorage.getItem('id') ?
                <AddPost 
                    id={id}
                    changeCount={changeCount}
                    setChangeCount={setChangeCount}
                />
                : <Link to="/" className='text-[#7ed957] font-bold'>Sign In to Leave a Post!</Link>
            }
            {postList.map((post) => (
                <div key={post._id} className='mb-10 p-5 border bg-white'>
                    <h3 className='font-bold text-lg py-1'>{post.title}</h3>
                    <p className='text-m py-2 border-b'>{post.body}</p>
                    {console.log(post.user)}
                    {post.user.toString() === localStorage.getItem('id') ? 
                        <div className='edit-delete flex flex-col'>
                            <div className="del-post font-bold text-xs">
                                <DeletePost 
                                    post={post}
                                    changeCount={changeCount}
                                    setChangeCount={setChangeCount}
                                />
                            </div>
                            <div className='edit-post font-bold text-xs'>
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