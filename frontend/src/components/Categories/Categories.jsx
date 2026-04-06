import axios from "axios";
import { useEffect, useState } from "react";
import { useCategory, useFilter } from "../../context";
import Carousel from 'react-elastic-carousel';
import "./Categories.css";

export const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isCatLoading, setIsCatLoading] = useState(false);
  const { hotelCategory, setHotelCategory } = useCategory();

  const { filterDispatch } = useFilter();

  const handleFilterClick = () => {
    filterDispatch({
      type: "SHOW_FILTER_MODAL",
    });
  };

  useEffect(() => {
    (async () => {
      try {
        setIsCatLoading(true);
        const { data } = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/api/category`
        );
        setCategories(data);
        setIsCatLoading(false);
      } catch (err) {
        console.log(err);
        setIsCatLoading(false);
      }
    })();
  }, []);

  const handleCategoryClick = (category) => {
    setHotelCategory(category);
  };

  return (
    <section className="categories d-flex gap">
      {isCatLoading ? (
        <div className="d-flex gap" style={{ flexGrow: 1, overflow: 'hidden' }}>
          {[...Array(8)].map((_, i) => (
            <div key={i} className="skeleton-text item" style={{ width: '80px', height: '24px', flexShrink: 0 }}></div>
          ))}
        </div>
      ) : (
        <Carousel className="carousel" itemsToShow={9} itemsToScroll={6} pagination={false}>
          {
            categories && categories.map(({ _id, category }) => <span key={_id} className={`${category === hotelCategory ? "category-color" : ""} item`} onClick={() => handleCategoryClick(category)}>{category}</span>)
          }
        </Carousel>
      )}
      <div>
        <button
          className="button btn-filter d-flex align-center gap-small cursor-pointer"
          onClick={handleFilterClick}
        >
          <span className="material-icons-outlined">filter_alt</span>
          <span>Filter</span>
        </button>
      </div>

    </section>
  );
};

