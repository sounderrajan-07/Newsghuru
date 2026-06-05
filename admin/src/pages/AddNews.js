import { useState } from "react";
import API from "../config/api";
import "../styles/AddNews.css";


function AddNews() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  // TEXT CHANGE
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // IMAGE CHANGE
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newsData = new FormData();

      newsData.append("title", formData.title);
      newsData.append("description", formData.description);
      newsData.append("category", formData.category.toLowerCase());
      newsData.append("image", image);

      await API.post("/api/news", newsData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("News Added Successfully 🎉");

      // RESET FORM
      setFormData({
        title: "",
        description: "",
        category: "",
        
      });

      setImage(null);
      setPreview("");
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Upload Failed ❌");
    }
  };

  return (
    <div className="add-news-page">
      <div className="add-news-container">
        <h1 className="add-news-title">Add News</h1>

        <form onSubmit={handleSubmit} className="add-news-form">

          {/* TITLE */}
          <input
            type="text"
            name="title"
            placeholder="News Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          {/* DESCRIPTION */}
          <textarea
            name="description"
            placeholder="News Description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          {/* IMAGE */}
          <div className="image-upload-box">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />

            {preview && (
              <img
                src={preview}
                alt="preview"
                className="preview-image"
              />
            )}
          </div>

          {/* CATEGORY */}
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="breaking">Breaking</option>
            <option value="tamil">Tamil</option>
            <option value="india">India</option>
            <option value="politics">Politics</option>
            <option value="sports">Sports</option>
            <option value="business">Business</option>
            <option value="education">Education</option>
            <option value="world">World</option>
          </select>

         

          {/* BUTTON */}
          <button type="submit" className="upload-btn">
            Upload News
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddNews;