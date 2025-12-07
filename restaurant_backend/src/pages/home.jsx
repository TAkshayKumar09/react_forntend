import axios from "axios";
import { useState, useEffect } from "react";

export const Home = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const data = await axios.get(
      "https://django-project-y3ss.onrender.com/get_menu/"
    );
    setData(data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px",
        padding: "20px",
      }}
    >
      {data.map((post) => {
        return (
          <div
            key={post.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "15px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              transition: "0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.03)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={post.image}
              alt={post.name}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
            <h2 style={{ margin: "10px 0", fontSize: "20px" }}>{post.name}</h2>
            <p style={{ fontSize: "14px", color: "#555" }}>{post.description}</p>
            <p style={{ fontWeight: "bold", marginTop: "8px", fontSize: "18px" }}>
              <b>₹ {post.price}</b>
            </p>
          </div>
        );
      })}
    </div>
  );
};
