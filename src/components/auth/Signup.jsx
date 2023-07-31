import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [credential, setCredentials] = useState({name:"", email: "", password: "" });
    let history = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res1 = fetch("http://localhost:3002/user/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: credential.name , email: credential.email, password: credential.password })
        })
        const json = await (await res1).json()
        console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authtoken)
           if (localStorage.getItem('token')) {
            history('/');
           }
          

            // props.showAlert("Account Created Successfully","success")

        } else {
            // props.showAlert("Invalid Credentials","danger")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credential, [e.target.name]: e.target.value })
    }
  return (
    <div className='container'>
       
         <br></br>
         <h2>Sign Up</h2>
            <form onSubmit={handleSubmit} >
            <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control"  onChange={onChange} id="name" name='name' />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control"  onChange={onChange} id="email" name='email' aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control"  onChange={onChange} id="password" name='password' />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" onChange={onChange} id="cpassword" name='cpassword' />
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
    </div>
  )
}

export default Signup