import React from "react";
import { Container, Button, Form, Row, Col } from "react-bootstrap";

const Registration = props => {
  return (
    <Container fluid="sm">
      
      <Row>
        <Col sm={4}>
        <h2 className="blog-main-title mb-3">Accedi</h2>
      <Form className="mt-5">
      <Form.Group controlId="blog-form" className="mt-3">
        <Form.Label>Indirizzo email</Form.Label>
        <Form.Control
          size="lg"
          placeholder="example@xxxx.com"
          name="email"
        />
      </Form.Group>
      <Form.Group controlId="blog-category" className="mt-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          size="lg"
          name="password"
        >
        </Form.Control>
      </Form.Group>
      <Form.Group className="d-flex mt-3 justify-content-end">
        <Button type="reset" size="lg" variant="outline-dark">
          Reset
        </Button>
        <Button
          type="button"
          size="lg"
          variant="dark"
          style={{
            marginLeft: "1em",
          }}
        >
          Accedi
        </Button>
      </Form.Group>
    </Form>
    </Col>
    </Row>
    </Container>
   
  );
};

export default Registration;
