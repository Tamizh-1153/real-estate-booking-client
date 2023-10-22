import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import Website from "./pages/Website"
import { Suspense, useState } from "react"
import Layout from "./components/layout/Layout"
import Properties from "./pages/properties/Properties"
import { QueryClient, QueryClientProvider } from "react-query"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Property from "./pages/property/Property"
import UserDetails from "./context/UserDetails"
import Bookings from "./pages/Bookings/Bookings"
import Favorites from "./pages/Favorites/Favorites"

function App() {
  const queryClient = new QueryClient()
  const [userDetails, setUserDetails] = useState({
    favorites: [],
    bookings: [],
    token: null,
  })

  return (
    <UserDetails.Provider value={{userDetails,setUserDetails}}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Website />} />
                <Route path="/properties">
                  <Route index element={<Properties />} />
                  <Route path=":id" element={<Property />} />
                </Route>
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/favorites" element={<Favorites />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
        <ToastContainer />
      </QueryClientProvider>
    </UserDetails.Provider>
  )
}

export default App
