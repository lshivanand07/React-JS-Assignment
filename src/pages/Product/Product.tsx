import { useParams } from 'react-router-dom';
import './product.css'
import { useState } from 'react';
import fetchProductById from '../../services/getOneProductApi'
import Loader from '../../components/Loader/Loader';
import ErrorHandling from '../../components/ErrorHandle/Error';
import { useEffect } from 'react';
import Button from '../../components/Buttons/Button';
import { useNavigate } from 'react-router-dom';
import {addCartItems} from '../../services/cartApi'

const ProductDetails = () => {
    
  const navigate = useNavigate()
  const { id } = useParams();
  const productId = Number(id)

  const [productItems, setProductItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [message, setMessage] = useState('');
  const [stock, setStock] = useState<number>();

  const [stockForm, setStockForm] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const productData = async () => {
    try {
      setLoading(true);
      setServerError(false);

      const data = await fetchProductById(productId);

      console.log(data);
      setProductItems(data);
      
    } catch (error) {
      setServerError(true);

      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    productData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (serverError) {
    return <ErrorHandling message={message} />;
  }


  
   const handleAddCart = async (event: React.SyntheticEvent<HTMLElement>) => {
     const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first");
    navigate("/login");
    return;
  }

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
     setServerError(true);
     if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage('Something went wrong');
      }
    
      if (serverError) {
    return <ErrorHandling message={message} />;
  }
  } finally {
    setLoading(false);
  }
};


  return (
    <>
    {
         <div className='container'>
    <h1 className='product-heading'>Products</h1>
   <div className='product-veriants'>
    {productItems[0]?.map((item: any) => (
        <div className='product'>
       <div className='product_img'><img src={item.image_url}/></div>
        <div>
        <h3>{item.product_name}</h3>
        <p>{item.description}</p>
        <p>stock: {item.stock}</p>
        <p>Size: {item.size}</p>
        <p>Color: {item.color}</p>
        <p>₹{item.price}</p>
        <div>
           <Button text='add cart' disabled={loading} onClick={()=>{setSelectedItem(item);setStockForm(true)}} ></Button>
        </div>
        </div>
      </div>
    ))}
    </div>
  </div>
    }
    {
     stockForm && 
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
    }
    </>
  )
};

export default ProductDetails;