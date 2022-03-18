import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { BrowserRouter } from "react-router-dom";

import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(() => ({
  birds: [
    {
      name: "robin",
      views: 1
    }
  ],
  languages: [
    { value: "hi", label: "Hindi" },
    { value: "es", label: "Spanish" },
    { value: "zh", label: "Mandarin" },
    { value: "en", label: "English" }
  ],
  language_chosen: 0
}));

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  rootElement
);
