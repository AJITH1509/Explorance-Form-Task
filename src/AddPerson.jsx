import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { PersonList } from "./PersonList";
import Dropdown from "react-bootstrap/Dropdown";

export const AddPerson = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  //for errors
  const [nameError, setNameError] = useState("");
  const [roleError, setRoleError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [dobError, setDobError] = useState("");
  //state of all person
  const [persons, setPersons] = useState([
    {
      name: "ajith",
      role: "Fullstack Developer",
      email: "ajithmuthu799@gmail.com",
      dob: "1997-09-15",
    },
  ]);
  //this data for dropdown
  const roles = [
    "Frontend Developer",
    "Backend Developer",
    "Fullstack Developer",
    "Other",
  ];

  //update the person
  const handleUpdatePerson = (updatedPerson) => {
    const updatedIndex = persons.findIndex(
      (person) => person.id === updatedPerson.id
    );
    const updatedPersons = [...persons];
    updatedPersons[updatedIndex] = updatedPerson;
    setPersons(updatedPersons);
  };
  //delete the person
  const handleDelete = (person) => {
    const updatedPersons = persons.filter((p) => p.name !== person.name);
    setPersons(updatedPersons);
  };
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

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if the form is valid
    if (!isFormValid()) {
      return;
    }

    // Form is valid, proceed with creating a new person
    const newPerson = {
      name,
      role,
      email,
      dob,
    };
    setPersons([...persons, newPerson]);
    setName("");
    setRole("");
    setEmail("");
    setDob(null);
  };
  return (
    <div>
      <h1 className="heading">Explorance Form</h1>
      <Row className=" justify-content-md-center">
        <Col lg="4" mb="3" sm="3">
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
                  <Dropdown.Toggle
                    className="bg-primary"
                    variant="secondary"
                    id="role-dropdown"
                  >
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

            <div className="text-end">
              <Button
                className="btn-sm"
                onClick={handleSubmit}
                variant="success"
                type="submit"
              >
                Submit
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
      <PersonList
        persons={persons}
        handleDeletePerson={handleDelete}
        onUpdatePerson={handleUpdatePerson}
      />
    </div>
  );
};
