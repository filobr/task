import { FC, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Main } from "components/Main";
import { FormPage } from "components/Form";

export interface starWarsDataType {
  name: string;
  vehicles: [];
  created: string;
}

const App: FC = () => {
  const [starWarsData, setStarWarsData] = useState<starWarsDataType[]>([]);

  const handleNewStarWarsData = (data: starWarsDataType) =>
    setStarWarsData([...starWarsData, data]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Main handleNewStarWarsData={handleNewStarWarsData} />}
        />
        <Route path="form" element={<FormPage starWarsData={starWarsData} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
