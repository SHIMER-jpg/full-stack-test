import { fireEvent, render, screen } from '@testing-library/react';
import { FilesTable } from "../../src/components/FilesTable"
import { wrapWithStore } from './store.util';


describe("File Table ", () => {
  it("renders all the headers", () => {
    render(wrapWithStore(<FilesTable />))
    const fileNameHeader = screen.getByText("File Name")
    const textHeader = screen.getByText("Text")
    const numberHeader = screen.getByText("Number")
    const hexHeder = screen.getByText("Hex")
    expect(fileNameHeader)
    expect(textHeader)
    expect(numberHeader)
    expect(hexHeder)
  })
  it("renders a file with its lines", () => {
    render(wrapWithStore(<FilesTable />, {
      preloadedState: {
        files: {
          list: [{
            file: "test1.csv",
            lines: [{ text: "Some text", number: 1, hex: "A0F0F" }]
          }]
        }
      }
    }))
    const fileDetail = screen.getByText("test1.csv")
    const textDetail = screen.getByText("Some text")
    const numberDetail = screen.getByText("1")
    const hexDetail = screen.getByText("A0F0F")
    expect(fileDetail)
    expect(textDetail)
    expect(numberDetail)
    expect(hexDetail)
  })
})

