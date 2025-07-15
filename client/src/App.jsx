import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Body } from "./components/Body"
import Login from "./components/Login"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import {Profile} from "./components/Profile"
import Feed from "./components/Feed"
import Logout from "./components/Logout"
function App() {


  return (
    <>
    <Provider store={appStore} >
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/"  element={<Body/>}>
          <Route />
          <Route path="/login" element={<Login/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/feed" element={<Feed/>}/>
          <Route path="/logout" element={<Logout/>}/>
        </Route>  
      </Routes>

    </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
