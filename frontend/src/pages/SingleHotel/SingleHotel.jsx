import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth, useDate, useAlert } from "../../context";
import {
  FinalPrice,
  HotelDetails,
  HotelImages,
  Navbar,
  AuthModal,
  ProfileDropDown,
  SearchStayWithDate,
  Alert
} from "../../components";
import "./SingleHotel.css";

export const SingleHotel = () => {
  const { id } = useParams();
  const [singleHotel, setSingleHotel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { isAuthModalOpen, isDropDownModalOpen } = useAuth();
  const { isSearchModalOpen } = useDate();
  const { alert } = useAlert();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/api/hotels/${id}`
        );
        setSingleHotel(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    })();
  }, [id]);

  if (isLoading || !singleHotel) {
    return (
      <div className="relative">
        <Navbar />
        <div className="d-flex align-center justify-center" style={{ height: "80vh" }}>
          <h3 className="alert-text">Loading Hotel Details...</h3>
        </div>
      </div>
    );
  }

  const { name, state } = singleHotel;

  return (
    <div className="relative">
      <Navbar />
      <main className="single-hotel-page">
        <p className="hotel-name-add">
          {name}, {state}
        </p>
        <HotelImages singleHotel={singleHotel} />
        <div className="d-flex">
          <HotelDetails singleHotel={singleHotel} />
          <FinalPrice singleHotel={singleHotel} />
        </div>
      </main>
      {isSearchModalOpen && <SearchStayWithDate />}
      {isDropDownModalOpen && <ProfileDropDown />}
      {isAuthModalOpen && <AuthModal />}
      {alert.open && <Alert />}
    </div>
  );
};

