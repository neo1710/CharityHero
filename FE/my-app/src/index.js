import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ChakraProvider,extendTheme } from '@chakra-ui/react'
const customTheme = extendTheme({
  components: {
    Progress: {
      baseStyle: {
        filledTrack: {
          bg: '#01a95d'
        },
        track:{
          bg:"#e6f6ef"
        }
      }
    },  Radio: {
      baseStyle: {
        icon: {
          // Change the color of the radio button itself
          color: 'red',
        },
        label: {
          // Change the color of the label text
          color: 'black',
        },
      },
      // ... other variants if needed
    }
  }
})
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider theme={customTheme}>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
