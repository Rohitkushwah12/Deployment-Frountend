import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import UserForm from "./Components/UserForm";
import UserList from "./Components/UserList";
import Auth from "./Components/Auth";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Login} />
        <Route
          path="/user"
          element={
            <Auth>
              <UserForm />
            </Auth>
          }
        />
        <Route
          path="/users"
          element={
            <Auth>
              <UserList />
            </Auth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
