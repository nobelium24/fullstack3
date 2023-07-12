import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ViewUsers = () => {
    const [data2, setData2] = useState([])
    let navigate = useNavigate()
    const viewUsers = () => {
        const uri = "http://localhost:5003/users/viewUsers"
        axios.get(uri, {
            headers:{
                Authorization:`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RSYW1AZ21haWwuY29tIiwiaWF0IjoxNjg5MTY1Nzc2LCJleHAiOjE2ODkxNjU4OTZ9.uxGYFW11fmIhpHV81vlrtdZhtsy0IMiEYkZuV3rkprQ`
            }
        }).then((res) => {
            // let ram = res.data
            setData2(res.data)
            // console.log(ram, 33)
            // console.log(data2)

        }).then(console.log(data2))
            .catch((err) => {
                console.log(err)
                navigate("/")
            })
    }
    return (
        <>
            <div className='mx-auto container row'>
                <div className='col-sm-8 shadow-lg p-5 mx-auto'>
                    <h6 className='text-muted display-6 text-center'>View Users</h6>
                    <button className='btn btn-dark' onClick={viewUsers}>Click Me</button>
                    {data2.map((i) => (
                        <div>
                            <p>Name: {i.userName}</p>
                            <p>Email: {i.email}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ViewUsers