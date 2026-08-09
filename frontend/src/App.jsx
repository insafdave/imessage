import { useEffect, useState } from 'react';
import { ThemeProvider } from "./context/ThemeContext";
import { WallpaperProvider } from "./context/WallPapersContext";
import { Routes, Route, Navigate } from 'react-router';
import ChatPage from './pages/ChatPage';
import AuthPage from './pages/AuthPage';
import { useAuth } from "@clerk/react";
import PageLoader from './components/PageLoader';
import { useAuthStore } from './store/useAuthStore';

import { Toaster } from "react-hot-toast";

function App() {
  const [count, setCount] = useState(0);
  const {isSignedIn, isLoaded } = useAuth();

  //option 1
  //const {checkAuth,isCheckingAuth,clearAuth} = useAuthStore();

  //option 2 - better for perfomance
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn) checkAuth();
    else clearAuth();
  },[checkAuth,clearAuth,isLoaded,isSignedIn]);

  if (!isLoaded || (isSignedIn && isCheckingAuth)) return <PageLoader />;

  return (
    <ThemeProvider>
    <WallpaperProvider>
        <Routes>
          <Route path="/" element={isSignedIn ? <ChatPage /> : <Navigate to={"/auth"} replace />} />
          <Route path="/auth" element={!isSignedIn ? <AuthPage /> : <Navigate to={"/"} replace />} />

        </Routes>
        <Toaster />
       </WallpaperProvider>
    </ThemeProvider>
  )
};

export default App;
