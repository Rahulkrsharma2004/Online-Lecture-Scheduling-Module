import { useEffect, useState } from "react";
import API from "../utils/axiosInstance";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await API.get("/courses");
        setCourses(response.data);
      } catch (err) {
        setError("Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Available Courses</h2>
      {loading && <p>Loading courses...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-3">
        {courses.map((course) => (
          <li key={course._id} className="p-3 border rounded shadow">
            <h3 className="text-lg font-bold">{course.title}</h3>
            <p>{course.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;
