import { Navigate, Route, Routes } from "react-router-dom";
import {Toaster} from "react-hot-toast";
import Footer from "./components/Footer";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { useAuthStore } from "./store/authUser";
import { useEffect } from "react";
import { Loader } from "lucide-react";

function App() {
  const {user, isCheckingAuth, authCheck} = useAuthStore();
  console.log(user);
  useEffect(() => {
    authCheck();
  }, []);

  if(isCheckingAuth) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className="animate-spin text-red-500 size-10"/>
        </div>
      </div>
    )
  }

  return (
    <>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={!user ? <LoginPage /> : <Navigate to={"/"} />} />
      <Route path="/signup" element={!user? <SignupPage /> : <Navigate to={"/"} />} />
    </Routes>
    <Toaster />
    <Footer/>
    </>
  );
}

export default App;
