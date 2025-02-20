import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <nav className="p-4 bg-blue-600 text-white flex justify-between">
      <h1 className="text-xl font-bold">Online Courses</h1>
      <div>
        {user ? (
          <>
            <span className="mr-4">Welcome, {user.name}</span>
            <button onClick={() => dispatch(logoutUser())} className="bg-red-500 px-4 py-1 rounded">Logout</button>
          </>
        ) : (
          <a href="/login" className="bg-green-500 px-4 py-1 rounded">Login</a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
