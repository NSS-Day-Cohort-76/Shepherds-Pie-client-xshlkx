import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import { PizzaForm } from "./PizzaForm";

export const AddPizzaOffCanvas = ({ orderId, onPizzaAdded }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button onClick={handleShow}>Add Pizza</Button>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Pizza Builder</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <PizzaForm
            className="pizza-form"
            orderId={Number(orderId)}
            onClose={handleClose}
            onPizzaAdded={(newPizza) => {
              onPizzaAdded?.(newPizza);
              handleClose();
            }}
          />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
