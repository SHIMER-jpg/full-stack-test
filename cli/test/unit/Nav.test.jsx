
import { fireEvent, render, screen } from '@testing-library/react';
import { wrapWithStore } from './store.util';
import { Nav } from "../../src/components/Nav"


describe("File Table ", () => {
  it("renders", () => {
    render(wrapWithStore(<Nav />))
    const nav = screen.getByText("CSV Consumer CLI")
    expect(nav)
  })
  it("renders an error alert when it exists", () => {
    render(wrapWithStore(<Nav />,
      {
        preloadedState: {
          error: {
            message: "This is a random error message"
          }
        }
      }))
    const alert = screen.getByText("This is a random error message")
    expect(alert)
  })
})

