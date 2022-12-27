import React, { useState } from "react";
import {
  Container, Form,
  Button,
  Row,
  Col
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setError, clearError } from "../redux/files/errorSlice";
import { searchFiles, fetchFiles } from "../redux/files/filesSlice";

export function SearchBar() {
  const [filter, setFilter] = useState("");
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
  const files = useSelector((state) => state.files);
  const isLoading = files.list.length === 0

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!filter) dispatch(fetchFiles(filter));
      else dispatch(searchFiles(filter));
    } catch (e) {
      dispatch(setError("There was an error fetching the requested file"));
      setFilter("");
    }
  };

  const handleChange = (e) => {
    setFilter(e.target.value);
    if (error.message)
      dispatch(clearError());
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <br />
          <Row>
            <Col>
              <Form.Control type="text" value={filter} onChange={handleChange} placeholder="File name" disabled={isLoading} />
            </Col>
            <Col>
              <Button variant="primary" type="submit" disabled={isLoading}>
                Search
              </Button>
            </Col>
            <Col></Col>
          </Row>
        </Form.Group>
      </Form>
    </Container>);

}
