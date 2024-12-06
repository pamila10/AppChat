import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="header">
      <div className="container">
        <div className="bl">
          {authUser && (
            <>
              <Link to={"/profile"} className={`btn btn-sm`}>
                <span>Profile</span>
              </Link>
              <button onClick={logout} className="btn">
                <span>Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
export default Navbar;