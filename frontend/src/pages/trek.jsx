import axios from "axios"
import config from "../config"
import { toast } from "react-toastify"

const Trek = () => {
    const api = axios.create({ baseURL: `${config.BACKEND_URL}/api/admin`, withCredentials: "includes" })

    const fetchTreks = async () => {
        try {

            const { data } = await api.get("/trek")
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const addTrek = async trekData => {
        try {
            const { data } = await api.post("/create-trek", trekData)
            toast.success("trek create success")
        } catch (error) {
            console.log(error)
            toast.error("unable to create trek")
        }
    }

    const modifyTrek = async trekData => {
        try {
            const { data } = await api.put("/update-trek/1", trekData)
            toast.success("trek update success")
        } catch (error) {
            console.log(error)
            toast.error("unable to update trek")
        }
    }

    const removeTrek = async trekData => {
        try {
            const { data } = await api.delete("/delete-trek/1")
            toast.success("trek delete success")
        } catch (error) {
            console.log(error)
            toast.error("unable to delete trek")
        }
    }
    return <>
        <button onClick={() => fetchTreks()}>get</button>
        <button onClick={() => addTrek()}>add</button>
        <button onClick={() => modifyTrek()}>update</button>
        <button onClick={() => removeTrek()}>delete</button>
    </>
}

export default Trek