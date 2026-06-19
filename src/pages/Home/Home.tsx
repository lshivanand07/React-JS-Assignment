import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { fetchProductDetails } from '../../services/ProductApi';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import withErrorHandling from '../../hoc/withErrorHandling';
import withLoader from '../../hoc/withLoader';
import { useDispatch, useSelector } from 'react-redux';
import { setProduct } from '../../redux/slices/productSlice';

interface HomeProps {
  products: any[];
  navigate: any;
  message: string;
}

function Home({ products, navigate, message }: HomeProps) {
  return (
    <div className="home-page">
      <Navbar />
      <div className="container">
        <div className="products">
          {Array.isArray(products) &&
            products?.map((product) => (
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
                  {product.discount_percentage
                    ? product.discount_percentage
                    : 0}
                  %
                </p>
              </div>
            ))}
        </div>

        {!products && message && <h3>{message}</h3>}
      </div>
      <Footer />
    </div>
  );
}

const EnhancedHome = withLoader(withErrorHandling(Home));

function HomeContainer() {
  const navigate = useNavigate();
  const location = useLocation();
  const productName = location.state?.product_name;
  const [serverError, setServerError] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.product.productItem);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProductDetails();
      dispatch(setProduct(data));
    } catch (error) {
      setServerError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!productName) return;

    const matchedProduct = products.find((element: any) =>
      element.product_name.toLowerCase().includes(productName.toLowerCase())
    );

    if (!matchedProduct) {
      setMessage('Product not found');
      return;
    }
    navigate(`/products/${matchedProduct.product_id}`);
  }, [productName, products]);

  return (
    <EnhancedHome
      products={products}
      serverError={serverError}
      loading={loading}
      navigate={navigate}
      message={message}
    />
  );
}

export default HomeContainer;
