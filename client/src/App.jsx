import { useState, useEffect } from "react";
import Card from "./components/Card/Card";
import axios from "axios";
function App() {
  const [bricks, setBricks] = useState([]);
  const [value, setValue] = useState("");
  useEffect(() => {
    const fetchBricks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/bricks");
        console.log(res.data);
        setBricks(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBricks();
  }, []);
  const handlePrice = (e) => {
    e.preventDefault();
    const fetchBricksByPrice = async () => {
      try {
        const res = await axios.get("http://localhost:8800/bricks/price");
        setBricks(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBricksByPrice();
  };
  const handleSearch = (e) => {
    e.preventDefault();
    const fetchBricks = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/bricks/search/?value=${value}`
        );
        console.log(res.data);
        setBricks(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBricks();
  };
  return (
    <div className="wrapper">
      <div className="navbar">
        <button onClick={handlePrice}>Sort by Price</button>
        <div>
          <input
            type="text"
            placeholder="Enter your search term"
            onChange={(e) => setValue(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
      {bricks.length < 1 ? (
        <h1>Product Not found</h1>
      ) : (
        <div className="bricks-container">
          {bricks.map((brick) => (
            <Card key={brick.title} brick={brick} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
