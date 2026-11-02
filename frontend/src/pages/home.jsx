import { useEffect, useState } from "react";
import config from "../config";
import axios from "axios";

function Home() {
  const [allTrek, setAllTrek] = useState([])
  const api = axios.create({ baseURL: `${config.BACKEND_URL}/api/public`, withCredentials: "includes" })
  const fetchTreks = async () => {
    try {
      const { data } = await api.get("/treks")
      console.log(data)
      setAllTrek(data.result)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTreks()
  }, [])
  return <>
    {/* cloudinary | S3 */}
    <div className="container">
      <div className="row">
        {
          allTrek.map(item => <div className="col-sm-4">
            <div class="card">
              <div class="card-body">
                <h6>{item.name}</h6>
                <span class="badge text-bg-primary">{item.difficulty}</span>
                <h6>{item.location}</h6>
                <p>{item.duration}</p>
                <p>{item.availableslots}</p>
                <p>{item.status}</p>
                <div className="d-flex justify-content-between">
                  <span>{item.startdate}</span>
                  <span>{item.enddate}</span>
                </div>
              </div>
            </div>
          </div>)
        }
      </div>
    </div>

  </>
}

export default Home;
