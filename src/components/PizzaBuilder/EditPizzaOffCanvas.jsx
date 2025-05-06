import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { PizzaForm } from "./PizzaForm";

export const EditPizzaOffCanvas = ({ pizza, onClose, onPizzaUpdated }) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    onClose();
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Edit Pizza</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <PizzaForm
          pizza={pizza} // Pass the current pizza to the form
          onClose={handleClose}
          onPizzaUpdated={onPizzaUpdated}
        />
      </Offcanvas.Body>
    </Offcanvas>
  );
};
