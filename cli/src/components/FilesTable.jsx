import React from "react";
import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";


const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>File Name</th>
        <th>Text</th>
        <th>Number</th>
        <th>Hex</th>
      </tr>
    </thead>
  );
}


const TableRow = ({ file, text, number, hex }) => {
  return (
    <tr>
      <td>{file}</td>
      <td>{text}</td>
      <td>{number}</td>
      <td>{hex}</td>
    </tr>
  );
}


const TableBody = ({ fileList }) => {
  return (
    <tbody>
      {fileList.map(({ file, lines }) =>
        lines.map(({
          text,
          number,
          hex
        }, index) =>
          <TableRow
            key={index}
            file={file}
            text={text}
            number={number}
            hex={hex}
          />
        ))}
    </tbody>);
}


export const FilesTable = () => {
  const files = useSelector((state) => state.files);
  return (
    <Container>
      <Table striped bordered hover>
        <TableHeader />
        {files.list.length > 0 &&
          <TableBody fileList={files.list} />
        }
      </Table>
    </Container>
  )
}
