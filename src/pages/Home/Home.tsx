/* eslint-disable @typescript-eslint/no-explicit-any */
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
import MobileMenu from '../../components/MobileMenu/MobileMenu';
import Button from '../../components/Buttons/Button';

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
                <div className="product_images">
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
          {products.length === 0 && message && (
            <>
              <div className="product-not-found-div">
                <h3>{message}</h3>
                <Button text="Home Page" onClick={() => navigate('/')}></Button>
              </div>
            </>
          )}
        </div>
      </div>
      <MobileMenu />
      <Footer />
    </div>
  );
}

const EnhancedHome = withLoader(withErrorHandling(Home));

function HomeContainer() {
  const navigate = useNavigate();
  const location = useLocation();
  let productName = location.state?.product_name;
  const [serverError, setServerError] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [searchProducts, setSearchProducts] = useState<any[]>([]);

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
    if (!productName) {
      setSearchProducts(Array.isArray(products) ? products : []);
      return;
    }

    const productList = Array.isArray(products) ? products : [];

    const matchedProducts = productList.filter((product: any) =>
      product.product_name?.toLowerCase().includes(productName.toLowerCase())
    );

    setSearchProducts(matchedProducts);

    if (matchedProducts.length === 0) {
      setMessage('Product not found');
      productName = '';
    } else {
      setMessage('');
    }
  }, [productName, products]);

  return (
    <EnhancedHome
      products={searchProducts}
      serverError={serverError}
      loading={loading}
      navigate={navigate}
      message={message}
    />
  );
}

export default HomeContainer;
