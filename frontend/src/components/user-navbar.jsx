import { Link } from "react-router-dom";

function UserNavbar() {
  return <>
    <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">User Panel</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <Link to="/user" class="nav-link active" href="#">Account</Link>
            <Link to="/user" class="nav-link" href="#">Profile</Link>
            <Link to="/user" class="nav-link" href="#">Logout</Link>
          </div>
        </div>
      </div>
    </nav>
  </>;
}

export default UserNavbar;
