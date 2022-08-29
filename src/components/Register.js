import {useState, useRef, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const USER_REGEX=/^[A-z][A-z0-0-_]{3,23}$/;
const PWD_REGEX=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[?!@#$%]).{8,24}$/;

const Register = () => {
    const userRef= useRef()
    const errRef= useRef()

    const [user, setUser]= useState('')
    const [validName,setValidName]=useState(false)
    const [userFocus, setUserFocus]=useState(false)
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [validPassword,setValidPassword]=useState(false)
    const [passwordFocus,setPasswordFocus]=useState(false)
    const [matchPassword,setMatchPassword]=useState('')
    const [validMatch, setValidMatch]=useState(false)
    const [matchFocus,setMatchFocus]=useState(false)
    const [errorMessage,setErrorMessage]=useState('')
    const [success, setSuccess]=useState(false)

    useEffect(() => {
        userRef.current.focus();
        }, [])

        useEffect(() => {
            setValidName(USER_REGEX.test(user))
        },[])

        useEffect(() => {
            setValidPassword(PWD_REGEX.test(password))
            setValidMatch(password === matchPassword)
        },[password,matchPassword])

        const initialNewUser= {
            username: user,
            email: email,
            password: password,
        }

        const [newUser,setNewUser]=useState(initialNewUser)

        const handleSubmit=async (event)=>{
            event.preventDefault()
            const registerUser = {
                username: user,
                email: email,
                password: password,
            }
        const version1= USER_REGEX.test(user)
        const version2= USER_REGEX.test(password)
        if(!version1 || !version2){
            setErrorMessage('Invalid')
            return
        }
        try {
            await axios({
                method: 'post',
                url: 'https://glacial-forest-84300.herokuapp.com/users/signup',
                data:registerUser
            })
            .then((res)=>{
                if(res.status === 201) setSuccess(true)
            })
            setEmail('')
            setUser('')
            setPassword('')
            setMatchPassword('')
        } catch (err){
            if(!err?.response){
                setErrorMessage('No response')
            } else {
                setErrorMessage('Registration Failed')
            } errRef.current.focus()
        }
    }
    return (
        <div className=' bg-slate-200 flex flex-col justify-center items-center p-0'>
            <div id="errorMessage" ref={errRef} className='flex flex-col justify-center items-center'>{errorMessage}</div>
            <div className='flex flex-col justify-center items-center'>
            <h1 className='block uppercase tracking-wide text-gray-700 text-lg font-bold mt-4 mb-10'>Sign Up</h1>
            <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center'>
                <label htmlFor='username' className='font-bold'>Username: </label>
                <input
                    className='border'
                    type='text'
                    id='username'
                    ref={userRef}
                    autoComplete='off'
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                 />
                <p className=' flex flex-col justify-center items-center'>
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Only underscores and hyphens allowed.
                </p>
                <label htmlFor='email' className='font-bold'>Email: </label>
                <input
                    className='border'
                    type='text'
                    id='email'
                    autoComplete='off'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />
                <label htmlFor='password' className='font-bold'>Password: </label>
                <input
                    className='border'
                    type='password'
                    id='password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => setPasswordFocus(false)}
                />
                <p className='flex flex-col justify-center items-center'>
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, <br />
                            a number and a special character.<br />
                            Allowed special characters: ? ! @ # $ %
                </p>
                <label htmlFor="confirm_pwd" className='font-bold'>Confirm Password:</label>
                <input
                    className='border'
                    type="password"
                    id="confirm_password"
                    onChange={(e) => setMatchPassword(e.target.value)}
                    value={matchPassword}
                    required
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                />
                <p className='flex flex-col justify-center items-center'> 
                    Must match the first password input field.
                </p>

                <button className='flex flex-col justify-center items-center bg-[#ADD8E6] shadow-lg flex-shrink-0 py-1 px-5 mb-5 border rounded-lg'>Sign Up</button>
                </form>
                <Link to='/main'>continue as guest</Link>
        </div>
           {success &&
                <div className='flex flex-col justify-center items-center'>
                    <p>Successfully Registered!</p>
                    <Link to="/">continue to sign in</Link>
                </div>
            }
            <div className=' flex flex-col justify-center items-center'>
                <h1 >Returning User?</h1>
                <Link to="/" className='font-bold underline'>Sign In</Link>
            </div>
        </div>
    );
}
    export default Register