import store from "./Rocks/store";
import { Provider } from "react-redux";
import Rocks from "./Rocks";

import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
export default function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="Rocks" />} />
            <Route path="/Rocks/*" element={<Rocks />} />
          </Routes>
        </div>
      </Provider>
    </HashRouter >
  );
}
