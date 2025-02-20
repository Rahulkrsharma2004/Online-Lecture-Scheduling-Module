import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-blue-600">
        Welcome to the Course Management System
      </h1>
      <p className="text-lg text-gray-700 mb-4">
        Manage and enroll in courses with ease.
      </p>
      <div className="flex space-x-4">
        <Link
          to="/courses"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          View Courses
        </Link>
        {user?.role === "admin" && (
          <Link
            to="/dashboard"
            className="px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
          >
            Admin Dashboard
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;
