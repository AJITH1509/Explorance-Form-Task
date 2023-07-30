import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";

const MyVerticallyCenteredModal = (props) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState(null);
  //for errors
  const [nameError, setNameError] = useState("");
  const [roleError, setRoleError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [dobError, setDobError] = useState("");

  const roles = [
    "Frontend Developer",
    "Backend Developer",
    "Fullstack Developer",
    "Other",
  ];

  useEffect(() => {
    // Set the state with the initial values from the props.person when the modal is opened
    if (props.person) {
      setName(props.person.name);
      setRole(props.person.role);
      setEmail(props.person.email);
      setDob(props.person.dob);
    }
  }, [props.person]);
  // Function to check if the form fields are valid
  const isFormValid = () => {
    let isValid = true;

    // Check if the name field is filled
    if (!name) {
      setNameError("Name is required");
      isValid = false;
    } else {
      setNameError("");
    }

    // Check if the role field is filled
    if (!role) {
      setRoleError("Role is required");
      isValid = false;
    } else {
      setRoleError("");
    }

    // Check if the email field is filled and has a valid format
    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Check if the dob field is filled
    if (!dob) {
      setDobError("Date of Birth is required");
      isValid = false;
    } else {
      setDobError("");
    }

    return isValid;
  };

  // Function to check for a valid email format
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleUpdate = () => {
    if (!isFormValid()) {
      return;
    }

    const updatedPerson = {
      ...props.person,
      name,
      role,
      email,
      dob,
    };
    props.onUpdate(updatedPerson);
    props.onHide();
  };
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Person
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="add-form" className=" mx-5">
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
            {nameError && (
              <div className="error-message">
                <i className="bi bi-exclamation-triangle-fill"></i>
                <span className="error-text">{nameError}</span>
              </div>
            )}
          </Form.Group>
          <div className="roles-dob-container">
            <Form.Group className="mb-3">
              <Dropdown className="small-dropdown">
                <Dropdown.Toggle variant="secondary" id="role-dropdown">
                  {role || "Select Role"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {roles.map((roleOption) => (
                    <Dropdown.Item
                      key={roleOption}
                      onClick={() => setRole(roleOption)}
                    >
                      {roleOption}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              {roleError && (
                <div className="error-message">
                  <i className="bi bi-exclamation-triangle-fill"></i>
                  <span className="error-text">{roleError}</span>
                </div>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                placeholder="DOB"
              />
              {dobError && (
                <div className="error-message">
                  <i className="bi bi-exclamation-triangle-fill"></i>
                  <span className="error-text">{dobError}</span>
                </div>
              )}
            </Form.Group>
          </div>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            {emailError && (
              <div className="error-message">
                <i className="bi bi-exclamation-triangle-fill"></i>
                <span className="error-text">{emailError}</span>
              </div>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button onClick={props.onHide}>Close</Button> */}
        <Button onClick={handleUpdate} variant="primary" type="submit">
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MyVerticallyCenteredModal;
