import React, { useState } from 'react'
import axios from 'axios'

const App = () => {
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const register = () => {
    const data = { userName, email, password }
    const uri = "http://localhost:5003/users/register"
    console.log(data)
    axios.post(uri, data).then((response) => {
      console.log(response)
      alert(response.data.message)
    }).catch((err) => {
      console.log(err)
    })
  }



  return (
    <>
      <div className='mx-auto container row'>
        <div className='col-sm-8 shadow-lg p-5 mx-auto'>
          <h6 className='text-muted display-6 text-center'>Sign UP</h6>
          <input placeholder='User name' type="text" className=" my-2 form-control w-100" onChange={(e) => { setUserName(e.target.value) }} />
          <input placeholder='Email' type="text" className=" my-2 form-control w-100" onChange={(e) => { setEmail(e.target.value) }} />
          <input placeholder='Password' type="text" className=" my-2 form-control w-100" onChange={(e) => { setPassword(e.target.value) }} />
          <button className=' my-2 btn btn-dark' onClick={register}>Submit</button>
        </div>
      </div>
    </>
  )
}

export default App