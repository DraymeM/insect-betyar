import React from "react";
import { Modal, Button } from "react-bootstrap";
import { FaTrash, FaExclamationTriangle } from "react-icons/fa";

interface DeleteItemModalProps {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
}

const DeleteItemModal: React.FC<DeleteItemModalProps> = ({
  show,
  onHide,
  onConfirm,
}) => (
  <Modal
    show={show}
    onHide={onHide}
    centered
    contentClassName="bg-dark text-light"
  >
    <Modal.Header
      closeButton
      closeVariant="white"
      className="border-secondary bg-dark"
    >
      <Modal.Title className="d-flex align-items-center">
        <FaExclamationTriangle className="text-warning me-2" />
        Termék törlése
      </Modal.Title>
    </Modal.Header>
    <Modal.Body className="bg-dark">
      <p>Biztosan törölni szeretnéd ezt a terméket a kosárból?</p>
    </Modal.Body>
    <Modal.Footer className="border-secondary bg-dark">
      <Button variant="secondary" onClick={onHide}>
        Mégse
      </Button>
      <Button variant="danger" onClick={onConfirm}>
        <FaTrash className="me-1" /> Törlés
      </Button>
    </Modal.Footer>
  </Modal>
);
export default DeleteItemModal;
