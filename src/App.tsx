import store from "./ChalkTalk/store";
import { Provider } from "react-redux";
import ChalkTalk from "./ChalkTalk";

import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
export default function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="/Home" />} />
            <Route path="/Home/*" element={<ChalkTalk />} />
          </Routes>
        </div>
      </Provider>
    </HashRouter >
  );
}
