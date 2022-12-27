import { fireEvent, render, screen } from '@testing-library/react';
import { SearchBar } from "../../src/components/SearchBar"
import { setupStore } from '../../src/redux/store';
import { wrapWithStore } from './store.util';


describe("Search Bar ", () => {

  it("renders", () => {
    render(wrapWithStore(<SearchBar />))
    const input = screen.getByPlaceholderText("File name")
    const button = screen.getByText("Search")
    expect(input)
    expect(button)
  })
  it("initially is disabled", () => {
    render(wrapWithStore(<SearchBar />))
    const input = screen.getByPlaceholderText("File name")
    const button = screen.getByText("Search")
    expect(input).toBeDisabled()
    expect(button).toBeDisabled()
  })
  it("Gets enabled if the files are loaded", () => {
    render(wrapWithStore(<SearchBar />, {
      preloadedState: {
        files: {
          list: [{ file: "someFile" }]
        }
      }
    }))
    const input = screen.getByPlaceholderText("File name")
    const button = screen.getByText("Search")
    expect(input).toBeEnabled()
    expect(button).toBeEnabled()
  })
  it("Handles Changes", () => {
    render(wrapWithStore(<SearchBar />, {
      preloadedState: {
        files: {
          list: [{ file: "someFile" }]
        }
      }
    }))
    const input = screen.getByPlaceholderText("File name")
    fireEvent.change(input, { target: { value: 'someText' } })
    expect(input).toHaveValue("someText")
  })
  it("Submits the file to search for", () => {
    let spy
    const setSpy = (store) => spy = jest.spyOn(store, "dispatch")
    render(wrapWithStore(<SearchBar />, {
      preloadedState: {
        files: {
          list: [{ file: "someFile" }]
        }
      },
      setSpy
    }))

    const input = screen.getByPlaceholderText("File name")
    const button = screen.getByText("Search")
    fireEvent.change(input, { target: { value: 'someText' } })
    fireEvent.click(button)
    expect(spy.mock.calls.length).toEqual(1)
  })
})

