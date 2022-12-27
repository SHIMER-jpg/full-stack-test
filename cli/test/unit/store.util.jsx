import { Provider } from 'react-redux'
import { setupStore } from "../../src/redux/store";

export function wrapWithStore(
  children,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    setSpy = null
  } = {}
) {

  if (setSpy) setSpy(store)
  return <Provider store={store}>{children}</Provider>;
}
