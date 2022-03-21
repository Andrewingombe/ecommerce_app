import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
import { useEffect, useReducer } from "react";
import axios from "axios";
import data from "../data";
import logger from "use-reducer-logger";

//Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };

    case "FETCH_SUCCESS":
      return { ...state, loading: false, products: action.payload };

    case "FETCH_FAILURE":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const HomePage = () => {
  // const [products, setProducts] = useState([]);
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      // const result = await axios.get("http://localhost:5000/api/products");
      // setProducts(result.data);
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("http://localhost:5000/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        console.log(result.data);
      } catch (error) {
        dispatch({ type: "FETCH_FAILURE", payload: error.message });
      }
    };

    fetchData();
  }, []);

  // console.log(products);

  return (
    <div>
      <h1>Featured Products</h1>
      <div className="products">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          data.products.map((product) => (
            <div className="product" key={product.slug}>
              <Link to={`/product/${product.slug}`}>
                <img src={product.image} alt={product.name} />
              </Link>

              <div className="product-info">
                <Link to={`/product/${product.slug}`}>
                  <p>{product.name}</p>
                </Link>

                <p>
                  <strong>${product.price}</strong>
                </p>

                <button>Add to Cart</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
