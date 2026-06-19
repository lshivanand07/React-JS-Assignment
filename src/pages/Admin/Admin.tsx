import withErrorHandling from '../../hoc/withErrorHandling';
import withLoader from '../../hoc/withLoader';
import logo from '../../assets/logo.png';
import Button from '../../components/Buttons/Button';
import './Admin.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchAllUser } from '../../services/userApi';
import DataTable from 'react-data-table-component';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { fetchProductDetails } from '../../services/ProductApi';
import { fetchFlipkartRecords } from '../../services/dashboardApi';
import { allOrders } from '../../services/ordersApi';

const customStyles = {
  headRow: {
    style: {
      backgroundColor: 'rgb(196, 196, 237)',
      fontWeight: 'bold',
      minHeight: '50px',
    },
  },
};

interface AdminProps {
  adminLogout: () => void;
  filterRecord: (value: string) => void;
  getUsersByRole: (value: string) => void;
  getProducts: () => void;
  getOrders: () => void;
  getDashboardRecord: () => void;
  showDashboard: boolean;
  dashboardRecord: any;
  filterData: any[];
  columns: any[];
}

function AdminPage({
  adminLogout,
  filterRecord,
  getUsersByRole,
  getProducts,
  getOrders,
  getDashboardRecord,
  dashboardRecord,
  showDashboard,
  filterData,
  columns,
}: AdminProps) {
  return (
    <>
      <header>
        <div className="container">
          <div className="admin-navbar">
            <div className="logo">
              <img src={logo} alt="Flipkart logo" />
            </div>
            <Button text="Logout" onClick={adminLogout}></Button>
          </div>
        </div>
      </header>
      <div className="container">
        <div className="admin-pannel">
          <div className="sidebar">
            <div className="buttons-div" onClick={getDashboardRecord}>
              Dashboard
            </div>
            <div className="buttons-div" onClick={() => getUsersByRole('')}>
              Users
            </div>
            <div className="buttons-div" onClick={getProducts}>
              Products
            </div>
            <div className="buttons-div" onClick={getOrders}>
              Orders
            </div>
            <div
              className="buttons-div"
              onClick={() => getUsersByRole('customer')}
            >
              Customers
            </div>
            <div
              className="buttons-div"
              onClick={() => getUsersByRole('seller')}
            >
              Sellers
            </div>
            <div className="buttons-div" onClick={adminLogout}>
              Logout
            </div>
          </div>
          <div className="table-container">
            <Breadcrumbs />

            {showDashboard && (
              <div className="admin-dashboard">
                <div className="flipkart-record">
                  <h2>Total Revenue</h2>
                  <h3>₹: {dashboardRecord?.totalRevenue}</h3>
                </div>
                <div className="flipkart-record">
                  <h2>Total Products</h2>
                  <h3>{dashboardRecord?.totalProducts}</h3>
                </div>
                <div className="flipkart-record">
                  <h2>Total Orders</h2>
                  <h3>{dashboardRecord?.totalOrders}</h3>
                </div>
                <div className="flipkart-record">
                  <h2>Total Users</h2>
                  <h3>{dashboardRecord?.totalUsers}</h3>
                </div>
                <div className="flipkart-record">
                  <h2>Total Customers</h2>
                  <h3>{dashboardRecord?.totalCustomers}</h3>
                </div>
                <div className="flipkart-record">
                  <h2>Total Sellers</h2>
                  <h3>{dashboardRecord?.totalSellers}</h3>
                </div>
              </div>
            )}

            {!showDashboard && (
              <>
                <div className="filter-table">
                  <input
                    type="text"
                    placeholder="Search here"
                    onChange={(event) => filterRecord(event.target.value)}
                  />
                </div>
                <DataTable
                  columns={columns}
                  data={filterData}
                  customStyles={customStyles}
                  pagination
                  paginationPerPage={5}
                  paginationRowsPerPageOptions={[5, 10, 20, 50]}
                  responsive
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const EnhancedAdmin = withLoader(withErrorHandling(AdminPage));

const userColumns = [
  { name: 'ID', selector: (row: any) => row.User_id, sortable: true },
  {
    name: 'Name',
    selector: (row: any) => row.user_name?.toLowerCase(),
    sortable: true,
  },
  { name: 'Email', selector: (row: any) => row.email, sortable: true },
  { name: 'DOB', selector: (row: any) => row.dob, sortable: true },
  { name: 'Age', selector: (row: any) => row.age, sortable: true },
  { name: 'Phone', selector: (row: any) => row.phone },
  { name: 'Role', selector: (row: any) => row.role },
];

const productColumns = [
  { name: 'ID', selector: (row: any) => row.product_id, sortable: true },
  {
    name: 'image',
    selector: (row: any) => (
      <img src={row.image_url} alt={row.product_name} width="50" height="50" />
    ),
  },
  {
    name: 'Name',
    selector: (row: any) => row.product_name?.toLowerCase(),
    sortable: true,
  },
  {
    name: 'Description',
    selector: (row: any) => row.description,
    width: '200px',
  },
  {
    name: 'Discount %',
    selector: (row: any) =>
      row.discount_percentage ? row.discount_percentage : '0.00',
  },
  { name: 'Stock', selector: (row: any) => row.stock, sortable: true },
];

const orderColumns = [
  { name: 'ID', selector: (row: any) => row.order_id, sortable: true },
  {
    name: 'User',
    selector: (row: any) => row.user_name?.toLowerCase(),
    sortable: true,
  },
  {
    name: 'Product',
    selector: (row: any) => row.product_name?.toLowerCase(),
    sortable: true,
  },
  { name: 'quantity', selector: (row: any) => row.quantity, sortable: true },
  {
    name: 'order date',
    selector: (row: any) => row.order_date?.toLowerCase(),
    sortable: true,
  },
  {
    name: 'Status',
    selector: (row: any) => row.order_status?.toLowerCase(),
    sortable: true,
  },
  {
    name: 'total_amount',
    selector: (row: any) => row.total_amount,
    sortable: true,
  },
];

function AdminContainer() {
  const location = useLocation();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [filterData, setFilterData] = useState<any[]>([]);
  const [columns, setColumns] = useState(userColumns);
  const [showDashboard, setShowDashboard] = useState(false);
  const [dashboardRecord, setDashboardRecord] = useState<any>(null);

  function adminLogout() {
    localStorage.removeItem('userToken');
    navigate('/login');
  }

  function filterRecord(searchValue: string) {
    const newRecord = data.filter((record: any) =>
      Object.values(record).some((value) =>
        String(value).toLowerCase().includes(searchValue.toLowerCase())
      )
    );
    setFilterData(newRecord);
  }

  async function getUsersByRole(role?: string) {
    try {
      setLoading(true);
      const users = await fetchAllUser();

      if (!role) {
        navigate('/admin/users');
        setData(users[0]);
        setFilterData(users[0]);
        setColumns(userColumns);
        setShowDashboard(false);
        return;
      }

      const filteredUsers = users[0]?.filter(
        (users: any) => users.role === role
      );
      setData(filteredUsers);
      setFilterData(filteredUsers);
      navigate(`/admin/${role}`);
      setColumns(userColumns);
      setShowDashboard(false);
    } catch (error) {
      setServerError(error);
    } finally {
      setLoading(false);
    }
  }

  async function getProducts() {
    try {
      setLoading(true);
      const products = await fetchProductDetails();
      console.log(products);
      setData(products);
      setFilterData(products);
      setColumns(productColumns);
      navigate('/admin/products');
      setShowDashboard(false);
    } catch (error) {
      setServerError(error);
    } finally {
      setLoading(false);
    }
  }

  async function getDashboardRecord() {
    try {
      setLoading(true);
      const data = await fetchFlipkartRecords();
      console.log('data ', data);
      setDashboardRecord(data);
      setShowDashboard(true);
      navigate('/admin/dashboard');
    } catch (error) {
      setServerError(error);
    } finally {
      setLoading(false);
    }
  }

  async function getOrders() {
    try {
      setLoading(true);
      const orders = await allOrders();
      console.log('data ', orders);
      setData(orders);
      setFilterData(orders);
      setShowDashboard(false);
      setColumns(orderColumns);
      navigate('/admin/orders');
    } catch (error) {
      setServerError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setShowDashboard(true);
    if (location.pathname === '/admin/users') {
      getUsersByRole('');
    }
    if (location.pathname === '/admin/customer') {
      getUsersByRole('customer');
    }
    if (location.pathname === '/admin/seller') {
      getUsersByRole('seller');
    }
    if (location.pathname === '/admin/products') {
      getProducts();
    }
    if (location.pathname === '/admin/orders') {
      getOrders();
    }
    if (
      location.pathname === '/admin/dashboard' ||
      location.pathname === '/admin'
    ) {
      getDashboardRecord();
    }
  }, [location.pathname]);

  return (
    <EnhancedAdmin
      serverError={serverError}
      loading={loading}
      adminLogout={adminLogout}
      filterRecord={filterRecord}
      getUsersByRole={getUsersByRole}
      getProducts={getProducts}
      getOrders={getOrders}
      getDashboardRecord={getDashboardRecord}
      dashboardRecord={dashboardRecord}
      showDashboard={showDashboard}
      filterData={filterData}
      columns={columns}
    />
  );
}

export default AdminContainer;
