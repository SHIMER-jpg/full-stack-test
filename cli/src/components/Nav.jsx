import React from "react";
import {
  Container,
  Navbar,
  Alert
} from 'react-bootstrap'
import { useSelector } from "react-redux";


export function Nav() {
  const error = useSelector((state) => state.error);
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand>CSV Consumer CLI</Navbar.Brand>
        </Container>
      </Navbar>
      {error.message && (
        <Alert variant="danger">
          <Container>{error.message}</Container>
        </Alert>
      )}
    </>
  );
}
