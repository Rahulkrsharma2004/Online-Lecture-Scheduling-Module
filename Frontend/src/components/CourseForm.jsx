import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCourse } from "../redux/courseSlice";

const CourseForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.course);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) {
      alert("All fields are required!");
      return;
    }
    dispatch(addCourse({ title, description }));
    setTitle("");
    setDescription("");
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Add New Course</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <textarea
          placeholder="Course Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Course"}
        </button>
      </form>
    </div>
  );
};

export default CourseForm;
