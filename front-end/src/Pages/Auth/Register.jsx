import { useState } from 'react'
import { useNavigate } from 'react-router-dom';


function Register() {
	const navigate = useNavigate();
 
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function registerUser(event) {
		const fetchUrl = "your url here"
		event.preventDefault()
		const response = await fetch(fetchUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				email,
				password,
			}),
		})

		const data = await response.json()

		if (data.status === 'ok') {
			navigate('/home');
			
		}
	}

	return (
        <div>
	<div className='MAINauth' >

	<div className="form-container">
  <p className="title">Register</p>
  <form className="form" onSubmit={registerUser}>
  <div className="input-group">
      <label htmlFor="username">Username</label>
      <input type="text" name="username" 	onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
    </div>
    <div className="input-group">
      <label htmlFor="username">Email</label>
      <input type="email" name="username" 	onChange={(e) => setEmail(e.target.value)} placeholder="Enter yout email" />
    </div>
    <div className="input-group">
      <label htmlFor="password">Password</label>
      <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
    </div>
    <button className="sign">Register</button>
  </form>

  <p className="signup">
    Already have an account? 
    <a rel="noopener noreferrer" href="/register" className="">
       Login
    </a>
  </p>
</div>
	</div>
     </div>
	)
}

export default Register