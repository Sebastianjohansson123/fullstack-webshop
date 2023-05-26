import { useNavigate, useParams } from 'react-router-dom';
import AdminProductForm from '../components/AdminProductForm';
import { useProducts } from '../contexts/ProductsContext';

// Makes sure correct product is given the form when editing a product
function AdminUpdateDatabase() {
  const navigate = useNavigate();
  const params = useParams();
  const {  products } = useProducts();
  const product = products.find(p => p.id === params.id);

  const handleSave = () => {
    navigate('/admin');
  };

  return <AdminProductForm product={product} onSave={handleSave} />;
}

export default AdminUpdateDatabase;
