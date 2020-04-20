import React from "react";
import { Provider } from "react-redux";
import { Root } from "./src/Root";
import { store } from "./src/shared/store/store";

export default function App() {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}
