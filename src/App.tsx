import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./page/Login";
import DashboardLayoutBasic from "./page/DashboardLayout";
import ProtectedRoute from "./auth/routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayoutBasic />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
