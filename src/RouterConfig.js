import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./components/home/Home";
import SignUp from "./components/signup/SignUp";
import SignIn from "./components/signin/SignIn";
import Trips from "./components/trips/Trips";
import TripDetails from "./components/TripDetails/Tripdetail";
import BusDetails from "./components/buses/BusDetails";
import HotelDetails from "./components/hotels/HotelDetails";
import PickupPointsDetails from "./components/pickuppoints/Pickup"; 
import ProtectedRoute from "./components/protected/ProtectedRoute";
import UserBookings from "./components/UserBookings/UserBookings.js"
import AdminSignIn from "./components/adminSign/adminsign.js"
import TripForm from "./components/tripcreate/createTrip.js";
import HotelForm from "./components/hotel/HotelForm.js";
import BusForm from "./createBus/BusForm.js";
import PickupPointForm from "./components/createPickup/PickUpForm.js";
import AdminHome from "./components/adminHome/AdminHome.js";
import Contact from "./components/contact/contactUs.js";
import About from "./components/AboutPage/about.js";
import UpdateTripForm from "./components/TripUpdate/TripUpdateForm.js"
import TripDeleteForm from "./components/TripDeleteForm.js";
import {UpdateBusForm,DeleteBusForm} from "./components/BusUpdateDelete.js"
import { DeleteHotelForm , UpdateHotelForm } from "./components/HotelUpdateDelete.js";
import {UpdatePickupPointForm , DeletePickupPointForm} from "./components/PickupUpdateDelete.js"

function RouteConfig() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer position="top-center" autoClose={3000} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/register" element={<SignUp />} />
          <Route path="/user/login" element={<SignIn />} />
          <Route path="/admin/login" element={<AdminSignIn />} />
          <Route path="/trip/alltrips" element={<Trips />} />
          <Route path="/trip/create" element={<TripForm />} />
          <Route path="/create/hotel" element={<HotelForm />} />
          <Route path="/create/bus" element={<BusForm />} />
          <Route path="/pickupPoint/create" element={<PickupPointForm />} />
          <Route path="/pickup/delete" element={<DeletePickupPointForm />} />
          <Route path="/pickup/update" element={<UpdatePickupPointForm />} />
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/trip/update" element={<UpdateTripForm />} />
          <Route path="/trip/delete" element={<TripDeleteForm />} />
          <Route path="/bus/delete" element={<DeleteBusForm />} />
          <Route path="/hotel/delete" element={<DeleteHotelForm />} />
          <Route path="/bus/update" element={<UpdateBusForm />} />
          <Route path="/hotel/update" element={<UpdateHotelForm />} />

          {/* Protected Routes */}
          {/* <Route element={<ProtectedRoute />}> */}
            <Route path="/trip/:id" element={<TripDetails />} />
            <Route path="/buses/:id" element={<BusDetails />} />
            <Route path="/hotels/:id" element={<HotelDetails />} />
            <Route path="/PickupPoints/:id" element={<PickupPointsDetails />} />
            <Route path="/userbookings" element={<UserBookings/>} />
    
        
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default RouteConfig;
