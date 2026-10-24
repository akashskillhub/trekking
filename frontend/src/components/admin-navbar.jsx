import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../App";
import { toast } from "react-toastify";

function AdminNavbar() {
  const { user, setUser } = useContext(AuthContext)
  const handleLogout = async () => {
    try {
      localStorage.removeItem("user")
      setUser(null)
    } catch (error) {
      console.log(error)
      toast.error('unable to logout')
    }
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/admin">Admin Panel</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminNavbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="adminNavbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/admin">Dashboard</Link>
            </li>

            {
              user && <li className="nav-link">
                <div class="dropdown">
                  <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" >
                    welcome {user.name}
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li><button onClick={handleLogout} class="dropdown-item text-danger">Logout</button></li>
                  </ul>
                </div>
              </li>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
