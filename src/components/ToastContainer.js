import { ToastContainer as ToastifyContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastContainer = (props) => <ToastifyContainer position={toast.POSITION.BOTTOM_RIGHT} limit={5} {...props} />;

export default ToastContainer;