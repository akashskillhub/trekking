import axios from "axios"
import config from "../config"
import { useEffect } from "react"
import { useState } from "react"
const Dashboard = () => {
  const [allUSers, setAllUSers] = useState([])
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(`${config.BACKEND_URL}/api/admin/users`)
      console.log(data)
      setAllUSers(data.result)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllUsers()
  }, [])
  return <>
    <div className="container">
      <table class="table table-dark table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Mobile</th>
            <th scope="col">Avatar</th>
            <th scope="col">Active</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            allUSers.map(item => <tr>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.mobile}</td>
              <td>
                <img src={item.avatar} height={100} alt="" />
              </td>
              <td>
                {item.isActive ? "Active" : "In-Active"}
              </td>
              <td>
                <button type="button" class="btn btn-danger">Block</button>
                <button type="button" class="btn btn-success">Un-Block</button>
              </td>
            </tr>)

          }
        </tbody>
      </table>
    </div>
  </>
}

export default Dashboard