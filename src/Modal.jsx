import './Modal.css';

const Modal = ({ isOpen, onClose, children, footer }) => {
  return (
    <div className="container">
      <div className={`modal ${isOpen ? 'open' : ''}`}>
        <div className="modal-overlay" onClick={onClose}></div>
        <div className="rpgui-container framed-golden-2">
          <div className="modal-content">
            <span data-testid="close-modal" className="close" onClick={onClose}>
              &times;
            </span>
            {children}
            {footer && <div className="modal-footer">{footer}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
