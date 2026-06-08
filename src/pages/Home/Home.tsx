import './Home.css';
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import {fetchProductDetails} from "../../services/ProductApi";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import withErrorHandling from '../../hoc/withErrorHandling';
import withLoader from '../../hoc/withLoader';

interface HomeProps {
  products: any[]
}

function Home({products}:HomeProps){
   const navigate = useNavigate();
  return(
      <div className='home-page'>
        <Navbar />
    <div className='container'>
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
    </div>
    <Footer />
    </div>
  )
}

const EnhancedHome = withLoader(withErrorHandling(Home))


function HomeContainer() {
  const [products, setProducts] = useState<any[]>([]);

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

return(
  <EnhancedHome 
  products = {products}
  />
)
}

export default HomeContainer;