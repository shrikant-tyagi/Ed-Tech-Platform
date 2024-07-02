import { Routes , Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home"
import Navbar from "./components/common/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OpenRoute from "./components/cors/Auth/OpenRoute";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import About from "./pages/About";
import VerifyEmail from './pages/VerifyEmail'
import Dashboard from './pages/Dashboard'
import PrivateRoute from "./components/cors/Auth/PrivateRoute";
import MyProfile from "./components/cors/Dashboard/MyProfile";
import Error from "./components/common/Error";
import EnrolledCourses from "./components/cors/Dashboard/EnrolledCourses";
import Settings from "./components/cors/Dashboard/Settings/index";
import { ACCOUNT_TYPE } from "./utils/constants";
import AddCourse from "./components/cors/Dashboard/AddCourse";
import { useSelector } from "react-redux";

function App() {

  const {user} = useSelector((state) => state.profile);

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter z-[-200]">
      <Navbar/>

      <Routes>
        <Route path="/" element={<Home/>} />

        <Route path="/signup"
            element={
              <OpenRoute>
                <Signup/>
              </OpenRoute>
            } />

        <Route path="/login"
            element={
              <OpenRoute>
                <Login/>
              </OpenRoute>
            } />

        <Route path="/forgot-password"
            element={
              <OpenRoute>
                <ForgotPassword/>
              </OpenRoute>
            } />

        <Route path="/updated-password/:id"
            element={
              <OpenRoute>
                <UpdatePassword/>
              </OpenRoute>
            } />

        <Route path="/about"
            element={
                <About/>
            } />

        <Route path="/verify-email"
            element={
              <OpenRoute>
                <VerifyEmail/>
              </OpenRoute>
            } />

        <Route
            element={
              <PrivateRoute>
                 <Dashboard/>
              </PrivateRoute>
            }>

            <Route path="/dashboard/my-profile" index element={<MyProfile/>} />

            <Route path="/dashboard/settings" element={<Settings/>} />

            <Route path="/dashboard/my-courses" element={<Error/>} />

            {
              user?.accountType === ACCOUNT_TYPE.STUDENT && 
              <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses/>} />
            }

            {
              user.accountType === ACCOUNT_TYPE.INSTRUCTOR &&
              <Route path="/dashboard/add-course" element={<AddCourse/>} />
            }

{
              user?.accountType === ACCOUNT_TYPE.STUDENT && 
              <Route path="/dashboard/purchase-history" element={<EnrolledCourses/>} />
            }

            
    
        </Route>

        {/* TO BE ROUTED AS A CHILD ROUTE --- FOR WORKING PURPOSE ONLY */}

        <Route path='*' element={<Error/>} />
            
      </Routes>

    </div>
  );
}

export default App;