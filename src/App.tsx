import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Main } from "components/Main";
import { FormPage } from "components/Form";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="form" element={<FormPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
