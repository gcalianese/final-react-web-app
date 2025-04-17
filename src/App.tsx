import store from "./ChalkTalk/store";
import { Provider } from "react-redux";
import ChalkTalk from "./ChalkTalk";
import NavBar from "./ChalkTalk/NavBar";

import { HashRouter, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <div>
          <NavBar />
          <Routes>
            <Route path="/*" element={<ChalkTalk />} />
          </Routes>
        </div>
      </Provider>
    </HashRouter >
  );
}
