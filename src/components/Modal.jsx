import { XMarkIcon } from "@heroicons/react/24/outline";

import PropTypes from "prop-types";

const Modal = ({ title, content, isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="z-50 fixed inset-0 flex items-center justify-center bg-gray-950 bg-opacity-75">
      <div className="bg-white rounded-lg shadow-lg p-6 inline-block">
        <div className="flex flex-row justify-between items-center align-middle">
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <button onClick={onClose} className="text-white px-4 py-2 rounded">
            <XMarkIcon className="size-12 text-red-500" />
          </button>
        </div>
        <div className="mb-4">{content}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
