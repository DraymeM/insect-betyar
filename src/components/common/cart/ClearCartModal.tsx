import React from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { FaTrash, FaExclamationTriangle } from "react-icons/fa";

interface ClearCartModalProps {
  show: boolean;
  onHide: () => void;
  onConfirm: () => Promise<void> | void; // Now accepts async functions
  isLoading: boolean;
}

const ClearCartModal: React.FC<ClearCartModalProps> = ({
  show,
  onHide,
  onConfirm,
  isLoading,
}) => {
  return (
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
          Kosár ürítése
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="bg-dark">
        {isLoading ? (
          <div className="text-center py-3">
            <Spinner animation="border" variant="danger" />
            <p className="mt-2 mb-0">Kosár törlése folyamatban...</p>
          </div>
        ) : (
          <>
            <p>Biztosan törölni szeretnéd az összes terméket a kosárból?</p>
            <p className="text-warning">
              <FaExclamationTriangle className="me-1" />
              Ez a művelet nem vonható vissza!
            </p>
          </>
        )}
      </Modal.Body>

      <Modal.Footer className="border-secondary bg-dark">
        <Button variant="secondary" onClick={onHide} disabled={isLoading}>
          Mégse
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={isLoading}>
          {isLoading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                className="me-2"
              />
              Törlés...
            </>
          ) : (
            <>
              <FaTrash className="me-1" /> Mindent töröl
            </>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ClearCartModal;
