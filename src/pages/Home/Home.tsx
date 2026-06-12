import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { fetchProductDetails } from '../../services/ProductApi';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import withErrorHandling from '../../hoc/withErrorHandling';
import withLoader from '../../hoc/withLoader';

interface HomeProps {
  products: any[];
}

function Home({ products }: HomeProps) {
  const navigate = useNavigate();
  return (
    <div className="home-page">
      <Navbar />
      <div className="container">
        <div className="products">
          {products.map((product: any) => (
            <div
              className="product-card"
              key={product.product_id}
              onClick={() => navigate(`/products/${product.product_id}`)}
            >
              <div className="product_img">
                <img src={product.image_url} />
              </div>
              <h3>{product.product_name}</h3>
              <p className="uppercase">{product.description}</p>
              <p>
                Discount percentage:{' '}
                {product.discount_percentage ? product.discount_percentage : 0}%
              </p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

const EnhancedHome = withLoader(withErrorHandling(Home));

function HomeContainer() {
  const [products, setProducts] = useState<any[]>([]);
  const [serverError, setServerError] = useState<any>();
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProductDetails();
      setProducts(data);
      console.log(data);
    } catch (error) {
      setServerError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <EnhancedHome
      products={products}
      serverError={serverError}
      loading={loading}
    />
  );
}

export default HomeContainer;
