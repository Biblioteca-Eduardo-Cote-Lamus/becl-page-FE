import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CustomToast = () => {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      toastStyle={{
        fontSize: '14px',
        padding: '12px',
        minHeight: '48px'
      }}
      icon={({ type }) => {
        return (
          <div style={{ fontSize: '12px', display: 'flex', alignItems: 'center', width: '16px', height: '16px' }}>
            {type === 'success' && '✅'}
            {type === 'error' && '❌'}
            {type === 'info' && 'ℹ️'}
            {type === 'warning' && '⚠️'}
          </div>
        );
      }}
    />
  );
};

export const toastConfig = {
  success: {
    style: {
      background: '#EDF7ED',
      color: '#1E4620',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
  },
  error: {
    style: {
      background: '#FDEDED',
      color: '#5F2120',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
  },
  info: {
    style: {
      background: '#E5F6FD',
      color: '#014361',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
  },
  warning: {
    style: {
      background: '#FFF4E5',
      color: '#663C00',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
  }
};