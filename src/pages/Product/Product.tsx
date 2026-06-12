import { useParams } from 'react-router-dom';
import './product.css';
import { useState } from 'react';
import { fetchProductById } from '../../services/ProductApi';
import { useEffect } from 'react';
import Button from '../../components/Buttons/Button';
import { useNavigate } from 'react-router-dom';
import { addCartItems } from '../../services/cartApi';
import withErrorHandling from '../../hoc/withErrorHandling';
import withLoader from '../../hoc/withLoader';

interface ProductDetails {
  productItems: any;
  message: string;
  stockForm: boolean;
  setStockForm: (value: boolean) => void;
  setStock: (value: number) => void;
  handleAddCart: (product_id: number, variant_id: number) => void;
}

function OneProductDetails({
  productItems,
  message,
  stockForm,
  setStockForm,
  setStock,
  handleAddCart,
}: ProductDetails) {
  const item = productItems;

  const [selectedVariantItem, setSelectedVariantItem] = useState({
    color: '',
    size: '',
  });

  const filteredColor =
    productItems?.variants?.filter(
      (color: any) => color.color === selectedVariantItem.color
    ) || [];

  const filteredSize =
    filteredColor?.filter(
      (size: any) => size.size === selectedVariantItem.size
    ) || [];

  console.log(filteredSize);

  return (
    <>
      <div className="container">
        <h1 className="product-heading">Product Details</h1>

        <div className="product-veriants">
          <div className="product_img">
            {' '}
            <img src={item?.image} />{' '}
          </div>

          <div>
            <h3>{item?.product_name}</h3>
            <p>{item?.description}</p>
            <div className="variants">
              <select
                value={selectedVariantItem.color}
                onChange={(event) =>
                  setSelectedVariantItem({
                    color: event.target.value,
                    size: '',
                  })
                }
              >
                <option value="" disabled>
                  -- Color --
                </option>
                {productItems?.variants?.map((item: any) => (
                  <option>{item.color}</option>
                ))}
              </select>

              <select
                value={selectedVariantItem.size}
                onChange={(event) =>
                  setSelectedVariantItem({
                    ...selectedVariantItem,
                    size: event.target.value,
                  })
                }
              >
                <option value="" disabled>
                  -- Size --
                </option>
                {filteredColor?.map((item: any) => (
                  <option>{item.size}</option>
                ))}
              </select>

              {filteredSize.length > 0 && (
                <div>
                  <p>Price: ₹{filteredSize[0].price}</p>
                  <p>Stock: {filteredSize[0].stock}</p>
                </div>
              )}
            </div>
          </div>

          <Button
            text="Add to cart"
            onClick={() => setStockForm(true)}
          ></Button>

          {stockForm && (
            <div className="overlay">
              <div className="add-items-in-cart-form">
                <form>
                  <label>Stock</label>

                  <input
                    type="number"
                    min={1}
                    onChange={(e) => setStock(Number(e.target.value))}
                  />

                  <div className="confirm-Cancel-btn">
                    <Button
                      text="confirm"
                      onClick={() =>
                        handleAddCart(
                          filteredSize[0].product_id,
                          filteredSize[0].variant_id
                        )
                      }
                    />
                    <Button text="cancel" onClick={() => setStockForm(false)} />
                  </div>
                  <p className="error">{message}</p>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const EnhancedProducts = withLoader(withErrorHandling(OneProductDetails));

const ProductContainer = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const productId = Number(id);

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<Error | null>(null);
  const [message, setMessage] = useState('');
  const [productItems, setProductItems] = useState<any>([]);
  const [stock, setStock] = useState<number>();

  const [stockForm, setStockForm] = useState(false);

  const productData = async () => {
    try {
      setLoading(true);
      const data = await fetchProductById(productId);
      console.log(data);
      setProductItems(data);
    } catch (error) {
      setServerError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    productData();
  }, []);

  const handleAddCart = async (product_id: number, variant_id: number) => {
    try {
      if (!stock || stock < 1) {
        setMessage('Please enter valid stock');
        return;
      }

      setLoading(true);
      setMessage('');

      const payload = {
        product_id: product_id,
        variant_id: variant_id,
        quantity: stock,
      };
      console.log('payload', payload);
      const data = await addCartItems(payload);
      alert(data.message);
      setStockForm(false);
      navigate('/cart');
    } catch (error) {
      setServerError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <EnhancedProducts
      loading={loading}
      serverError={serverError}
      message={message}
      productItems={productItems}
      stockForm={stockForm}
      setStockForm={setStockForm}
      setStock={setStock}
      handleAddCart={handleAddCart}
    />
  );
};

export default ProductContainer;
