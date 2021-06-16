import { useEffect, useState } from 'react'
import {useHistory} from 'react-router-dom'

export default () => {

    useEffect(() => localStorage.removeItem('auth'))
    const history = useHistory()
    const [user, setUser] = useState({username:'', password:''})

    const handleChange = (e) => {
        const {id, value} = e.target
        setUser(user => ({
            ...user,
            [id] : value
        }))
    }

    const Login = () => {
        if(user.username !== "root" && user.password !== "password")
        {
            alert('Username / Password salah')
            return;
        }

        localStorage.setItem('auth', JSON.stringify(user))
        return history.push('/')
    }

    return <>
        <div>
            <div>
                    <div>
                        <label>Username</label>
                        <div>
                            <input
                                id="username"
                                type="text" 
                                placeholder="username" 
                                required 
                                value={user.username}
                                onChange={handleChange}></input>
                        </div>
                    </div>
                    <div >
                        <label >Password</label>
                        <div>
                            <input 
                                id="password"
                                type="password" 
                                placeholder="password" 
                                required 
                                value={user.password}
                                onChange={handleChange}></input>
                        </div>
                    </div>
                    <button type="submit" onClick={()=> Login()}>Login</button>
            </div>
        </div>
    </>
}