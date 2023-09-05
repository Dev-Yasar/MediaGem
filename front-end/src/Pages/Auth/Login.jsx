
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./Auth.css"
function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function loginUser(event) {
		const fetchUrl = "your url here"
		event.preventDefault()
		const response = await fetch(fetchUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})

		const data = await response.json()

		if (data.user) {
			localStorage.setItem('token', data.user)
			toast('Login successful')
			window.location.href = '/home'
		} else {
			alert('Please check your username and password')
		}
	}

	return (
	<div> 
	<div className='MAINauth' >

	<ToastContainer />
	<div className="form-container">
  <p className="title">Login</p>
  <form className="form" onSubmit={loginUser}>
    <div className="input-group">
      <label htmlFor="username">Email</label>
      <input type="email" name="username" 	onChange={(e) => setEmail(e.target.value)} placeholder="Enter yout email" />
    </div>
    <div className="input-group">
      <label htmlFor="password">Password</label>
      <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
    </div>
    <button className="sign"> Log in</button>
  </form>

  <p className="signup">
    Don't have an account? 
    <a rel="noopener noreferrer" href="/register" className="">
       Regsiter
    </a>
  </p>
</div>

	{/* <div class="form-container">
	    <p>Welcome,Admin</p>
	<form class="form" onSubmit={loginUser}>
	    <label>Email</label>
	    <input type="text" class="input" 	onChange={(e) => setEmail(e.target.value)} placeholder="Enter yout email"/>
	    <label>Password</label>
	    <input type="password" class="input"  onChange={(e) => setPassword(e.target.value)} placeholder="Password"/> 
	    <button className='AuthBtn'>Login</button>
	</form>
	</div> */}
	</div>
	</div>
	)
}

export default Login