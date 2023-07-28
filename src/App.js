import React, { lazy, Suspense } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
import './App.scss'
import DefaultLayout from './components/layout/DefaultLayout'
import AdminLogin from './components/AdminLogin/AdminLogin'
import RegisterUser from './components/RegisterUser/RegisterUser'
const Login = React.lazy(() => import('./components/Login/Login'))
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Suspense>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/adminlogin" name="Login Page" element={<AdminLogin />} />
            <Route path="/freelancerregister" element={<RegisterUser />}> </Route>
            <Route path="/clientregister" element={<RegisterUser />}> </Route>
            <Route path="/recruiterregister" element={<RegisterUser />}> </Route>
            {/* <Route path="/resetpassword" element={<ForgetPassword />}></Route> */}
            {/* <Route
              path="/forgotpassword"
              element={<ForgotPasswordEmail />}
            ></Route> */}
            <Route path="*" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </BrowserRouter >
    </>
  )
}

export default App
