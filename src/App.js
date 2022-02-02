/* eslint-disable no-unused-vars */
import react, { useState } from 'react';
import axios from 'axios';


function App() {


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);

  console.log(usernameReg, passwordReg);

  const handleRegister = () => {
    axios.post('http://localhost:3001/register', {
      username: usernameReg,
      password: passwordReg,
    })
      .then((response) => {
        console.log(response)
      })
      .catch(error => console.log(error));
  }


  const handleLogin = () => {
    axios.post('http://localhost:3001/login', {
      username: username,
      password: password,
    })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        setLoginStatus(true);
      })
      .catch(error => {
        console.log(error)
        setLoginStatus(false);
      });
  }

  const isUserAuthenticated = () => {
    axios.get('http://localhost:3001/authenticated', {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    }).then((response) => {
      console.log(response);
    });
  };


  return (
    <div className="App">


      <div style={{ display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: 'center', rowGap: "0.8rem", marginTop: "5rem" }}>
        <h1>Register</h1>
        <label>Username:</label>
        <input type="text" placeholder="user" onChange={(e) => setUsernameReg(e.target.value)} />

        <label>Senha:</label>
        <input type="password" placeholder="password" onChange={(e) => setPasswordReg(e.target.value)} />
        <button onClick={handleRegister} type="submit">Register</button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: 'center', rowGap: "0.8rem", marginTop: "4rem" }}>
        <h1>LOGIN</h1>
        <label>Username:</label>
        <input type="text" placeholder="user" onChange={(e) => setUsername(e.target.value)} />

        <label>Senha:</label>
        <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" onClick={handleLogin} >Login</button >

        {loginStatus && (
          <button onClick={isUserAuthenticated} style={{ background: 'red', cursor: 'pointer', color: 'white', marginTop: '2rem', width: '50%', fontSize: '1.5rem', border: 'none', borderRadius: '10px', padding: '15px 20px' }}>Check if you are authenticated</button>
        )}
      </div>



    </div>

  );
}

export default App;
