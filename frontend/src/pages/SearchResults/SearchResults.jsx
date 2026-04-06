import { Fragment, useEffect, useState } from "react";
import { HotelCard, Navbar, Alert } from "../../components";
import { useDate, useCategory, useAlert } from "../../context";
import { HotelSkeleton } from "../../components/Skeleton/HotelSkeleton";
import axios from "axios";

export const SearchResults = () => {
  const { destination } = useDate();
  const { hotelCategory } = useCategory();
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { alert } = useAlert();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/api/hotels?category=${hotelCategory}`
        );
        setHotels(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    })();
  }, [destination, hotelCategory]);

  const filteredSearchResults = hotels.filter(
    ({ city, address, state }) =>
      address.toLowerCase() === destination.toLowerCase() ||
      city.toLowerCase() === destination.toLowerCase() ||
      state.toLowerCase() === destination.toLowerCase()
  );

  return (
    <Fragment>
      <Navbar />
      <section className="main d-flex align-center wrap gap-larger">
        {isLoading ? (
          [...Array(4)].map((_, i) => <HotelSkeleton key={i} />)
        ) : filteredSearchResults && filteredSearchResults.length > 0 ? (
          filteredSearchResults.map((hotel) => (
            <HotelCard key={hotel._id} hotel={hotel} />
          ))
        ) : (
          <div className="d-flex align-center justify-center w-100" style={{ height: '50vh' }}>
            <h3 className="alert-text">Nothing Found for "{destination}"</h3>
          </div>
        )}
      </section>
      {alert.open && <Alert />}
    </Fragment>
  );
};

