import { Toast, ToastContainer } from "react-bootstrap";

export const CustomToast = ({ show, onClose, message, bg }) => {
  return (
    <ToastContainer position="top-right" className="p-3">
      <Toast onClose={onClose} show={show} delay={2000} autohide bg={bg}>
        <Toast.Body className="text-white">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};
