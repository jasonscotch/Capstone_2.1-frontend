import skelly from './skelly.gif';
import './Modal.css';

const LoadingModal = () => {
  return (
     <div className="container">
        <div className="modal.open">
        <div className="rpgui-container framed">
            <div className="modal-content">
                <h2>Loading</h2>
                <img src={skelly} alt='Loading'/>
            </div>
        </div>
        </div>
    </div>
  );
};

export default LoadingModal;

