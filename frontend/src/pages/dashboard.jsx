import axios from "axios"
import config from "../config"
import { useEffect } from "react"
import { useState } from "react"
import { toast } from "react-toastify"
const Dashboard = () => {
  const [allUSers, setAllUSers] = useState([])
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(`${config.BACKEND_URL}/api/admin/users`, { withCredentials: "includes" })
      console.log(data)
      setAllUSers(data.result)
    } catch (error) {
      console.log(error)
    }
  }

  const handleBlockAccount = async user_id => {
    try {
      await axios.post(`${config.BACKEND_URL}/api/admin/block/${user_id}`, {}, { withCredentials: "includes" })
      toast.success("account block")
      getAllUsers()
    } catch (error) {
      console.log(error)
      toast.error("unable to block account")
    }
  }
  const handleunBlockAccount = async user_id => {
    try {
      await axios.post(`${config.BACKEND_URL}/api/admin/unblock/${user_id}`, {}, { withCredentials: "includes" })
      toast.success("account unblock")
      getAllUsers()
    } catch (error) {
      console.log(error)
      toast.error("unable to unblock account")
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
            allUSers.map(item => <tr className={!item.isactive && 'table-danger'}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.mobile}</td>
              <td>
                <img src={item.avatar} height={100} alt="" />
              </td>
              <td>
                {item.isactive ? "Active" : "In-Active"}
              </td>
              <td>
                {
                  item.isactive
                    ? <button onClick={() => handleBlockAccount(item.id)} type="button" class="btn btn-outline-danger">Block</button>
                    : <button onClick={() => handleunBlockAccount(item.id)} type="button" class="btn btn-success">Un-Block</button>
                }


              </td>
            </tr>)

          }
        </tbody>
      </table>
    </div>
  </>
}

export default Dashboard