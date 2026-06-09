import { useParams } from 'react-router-dom';
import './product.css'
import { useState } from 'react';
import { fetchProductById } from '../../services/ProductApi';
import { useEffect } from 'react';
import Button from '../../components/Buttons/Button';
import { useNavigate } from 'react-router-dom';
import {addCartItems} from '../../services/cartApi'
import withErrorHandling from '../../hoc/withErrorHandling';
import withLoader from '../../hoc/withLoader';

interface ProductProps {
  productItems: any[];
  loading: boolean;
  setSelectedItem : (value: any)=> void
  handleAddCart : (event: React.SyntheticEvent<HTMLElement>)=> void
  stockForm: boolean; setStockForm : ( value: boolean)=> void
  setStock  : (value: number) => void
  message : string
}

function OneProductDetails ({productItems, loading, setSelectedItem, handleAddCart, stockForm, setStockForm, setStock, message}:ProductProps) {
 return(
 <>
 {
         <div className='container'>
    <h1 className='product-heading'>Products</h1>
   <div className='product-veriants'>
    {productItems?.map((item: any) => (
        <div className='product'>
       <div className='product_img'><img src={item.image_url}/></div>
        <div>
        <h3>{item.product_name}</h3>
        <p>{item.description}</p>
        <p>stock: {item.stock}</p>
        <p>Size: {item.size}</p>
        <p>Color: {item.color}</p>
        <p>₹{item.price}</p>
        <p>Discount_percentage: {item.discount_percentage}%</p>
        <div>
           <Button text='add cart' disabled={loading} onClick={()=>{setSelectedItem(item); setStockForm(true) }} ></Button>
        </div>
        </div>
      </div>
    ))}
    </div>
  </div>
    }
    {
     stockForm && 
     <div className='overlay'>
      <div className='add-items-in-cart-form'>
        <form >
            <label htmlFor="stock">Stock</label>
            <input type="number" min={1} id="stock"  placeholder='Enter Number of stock' onChange={(event)=>setStock(Number(event.target.value))}/>
            <div className='confirm-Cancel-btn'>
            <Button text='confirm'  onClick={handleAddCart} disabled={loading}></Button>
            <Button text='Cancel' onClick={()=>setStockForm(false)}></Button>
            </div>
            <p className="error">{message}</p>
        </form>
     </div>
     </div>
    }
 </>
 )
}

const EnhancedProducts = withLoader(withErrorHandling(OneProductDetails))

const ProductContainer = () => {
    
  const navigate = useNavigate()
  const { id } = useParams();
  const productId = Number(id)

  const [productItems, setProductItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<Error | null>(null);
  const [message, setMessage] = useState('');
  const [stock, setStock] = useState<number>();
  const [stockForm, setStockForm] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const productData = async () => {
    try {
      setLoading(true);
      const data = await fetchProductById(productId);
      setProductItems(data[0]);

    } catch (error) {
      setServerError(error as Error);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    productData();
  }, []);

const handleAddCart = async (event: React.SyntheticEvent<HTMLElement>) => {
    
  try {
    event.preventDefault()
     if (!stock || stock < 1) {
    setMessage("Please enter valid stock");
    return;
  }

  setLoading(true);
   setMessage('')
    const data = await addCartItems(
      selectedItem.product_id,
      stock,
      selectedItem.variant_id
    );
    alert(data.message)
    setStockForm(false);
    navigate("/cart");

  } catch (error) {
     setServerError(error as Error);
  } finally {
    setLoading(false);
  }
};

  return (
     <EnhancedProducts
     loading = {loading}
     serverError = {serverError}
     productItems = {productItems}
     setSelectedItem = {setSelectedItem}
     handleAddCart = {handleAddCart}
     stockForm = {stockForm}
     setStockForm= {setStockForm}
     setStock = {setStock}
     message = {message}
     />
  )
};

export default ProductContainer;