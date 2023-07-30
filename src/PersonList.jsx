import { useState } from "react";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import MyVerticallyCenteredModal from "./UpdatePerson";

export const PersonList = ({ persons, onUpdatePerson, handleDeletePerson }) => {
  const [modalShow, setModalShow] = useState(false);
  const [editPerson, seteditPerson] = useState("");

  const handleEdit = (task) => {
    seteditPerson(task);
    setModalShow(true);
  };
  const handleUpdate = (updatedPerson) => {
    onUpdatePerson(updatedPerson);
    setModalShow(false);
  };

  const handleDelete = (person) => {
    handleDeletePerson(person);
  };
  return (
    <>
      <div className="my-3 mx-2">
        <h3 className="text-center my-3">Employee details</h3>
        <Row className="text-center justify-content-md-center">
          <Col lg="6">
            <div className="table-responsive">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>S.no</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Email</th>
                    <th>D.O.B</th>
                    <th>Edit/Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {persons &&
                    persons.map((person, index) => {
                      return (
                        <tr key={person.id}>
                          <td>{index + 1}</td>
                          <td>{person.name}</td>
                          <td>{person.role}</td>
                          <td>{person.email}</td>
                          <td>{person.dob}</td>
                          <td>
                            <Button
                              onClick={() => handleEdit(person)}
                              className="mx-2"
                            >
                              <i className="bi bi-pencil-square"></i>
                            </Button>
                            <Button
                              className="btn-danger"
                              onClick={() => handleDelete(person)}
                            >
                              <i className="bi bi-trash3"></i>
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </div>
      <MyVerticallyCenteredModal
        person={editPerson}
        show={modalShow}
        onHide={() => setModalShow(false)}
        onUpdate={handleUpdate}
      />
    </>
  );
};
