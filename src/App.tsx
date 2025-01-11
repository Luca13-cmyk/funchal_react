import { Route, Routes } from "react-router-dom";
import Home from "./_root/pages/Home";
import RootLayout from "./_root/RootLayout";
import Car from "./_root/pages/Car";
import YourInfo from "./_root/pages/YourInfo";

function App() {
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/car/:id" element={<Car />} />
          <Route path="/your-info" element={<YourInfo />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
