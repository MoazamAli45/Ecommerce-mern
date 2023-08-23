import "./App.css";
import Layout from "./customer/components/Layout/Layout";

import CustomerRoutes from "./customer/Routes/CustomerRoutes";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          {/*  For Customers Only */}
          <Route path="/*" element={<CustomerRoutes />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
