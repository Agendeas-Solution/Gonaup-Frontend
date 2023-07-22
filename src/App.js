import React, { lazy, Suspense } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom'
import './App.scss'
import DefaultLayout from './components/layout/DefaultLayout'
import AdminLogin from './components/AdminLogin/AdminLogin'
import ClientRegister from './components/ClientRegister/ClientRegister'
import FreelancerRegister from './components/FreelancerRegister/FreelancerRegister'
// import { clearLoginToken } from './services/storage'
// import SideBar from './components/SideBar/SideBar'
// import Header from './components/Header/Header'
// import { Context as ContextSnackbar } from './context/pageContext'
const Login = React.lazy(() => import('./components/Login/Login'))
// const DefaultLayout = React.lazy(() =>
//   import('./components/layout/DefaultLayout'),
// )
// const ForgetPassword = React.lazy(() =>
//   import('./components/ForgetPassword/ForgetPassword'),
// )
// const ForgotPasswordEmail = React.lazy(() =>
//   import('./components/ForgotPasswordEmail/ForgotPasswordEmail'),
// )
// const SignUp = React.lazy(() => import('./components/SignUp/SignUp'))

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Suspense>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/adminlogin" name="Login Page" element={<AdminLogin />} />
            <Route path="/clientregister" element={<ClientRegister />}> </Route>
            <Route path="/freelancerregister" element={<FreelancerRegister />}></Route>
            {/* <Route path="/resetpassword" element={<ForgetPassword />}></Route> */}
            {/* <Route
              path="/forgotpassword"
              element={<ForgotPasswordEmail />}
            ></Route> */}
            {/* <Route path="/signup" element={<SignUp />}></Route> */}
            <Route path="*" element={<DefaultLayout />} />
            {/* <Route path="*" element={<DefaultLayout />} /> */}
          </Routes>
        </Suspense>
      </BrowserRouter >
    </>
  )
}

export default App
