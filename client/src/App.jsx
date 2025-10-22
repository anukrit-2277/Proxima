import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Body } from "./components/Body"
import Login from "./components/Login"
import Signup from "./components/Signup"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import { Profile } from "./components/Profile"
import Feed from "./components/Feed"
import Connections from "./components/Connections"
import Requests from "./components/Requests"
import Logout from "./components/Logout"
import Landing from "./components/Landing"

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body/>}>
              <Route index element={<Feed/>} />
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/feed" element={<Feed/>}/>
              <Route path="/connections" element={<Connections/>}/>
              <Route path="/requests" element={<Requests/>}/>
              <Route path="/logout" element={<Logout/>}/>
            </Route>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
