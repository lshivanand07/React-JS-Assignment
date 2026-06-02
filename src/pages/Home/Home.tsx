import './Home.css';
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import fetchProductDetails from "../../services/ProductApi";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Home() {
  const [products, setProducts] = useState<any[]>([]);
 const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const data = await fetchProductDetails();
      setProducts(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className='container'>
      <Navbar />

      <div className="products">
        {products.map((product: any) => (
          <div className="product-card" key={product.product_id} onClick={()=>navigate(`/products/${product.product_id}`)}>
            <div className='product_img'><img src={product.image_url}/></div>
            <h3>product_id: {product.product_id}</h3>
            <h3>{product.product_name}</h3>
            <p>{product.description}</p>
            <p>stock: {product.stock}</p>
            <p>Size: {product.size}</p>
            <p>Color: {product.color}</p>
            <p>₹{product.price}</p>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default Home;