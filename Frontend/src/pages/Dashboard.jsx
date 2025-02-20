import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CourseList from "../components/CourseList";
import CourseForm from "../components/CourseForm";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user || user.role !== "admin") {
    return (
      <div className="text-center mt-10">
        <h2 className="text-red-500 text-xl font-semibold">
          Access Denied: Admins Only
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Admin Dashboard
      </h1>
      <div className="flex flex-col items-center">
        <CourseForm />
        <CourseList />
        <Link
          to="/"
          className="mt-4 px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
