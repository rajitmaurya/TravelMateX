import "./HotelImages.css";

export const HotelImages = ({ singleHotel }) => {
  const { image, imageArr } = singleHotel;

  return (
    <div className="hotel-images-container">
      <img className="primary-img" src={image} alt="hotel" />
        {imageArr &&
          imageArr.map((image) => (
            <img
              key={image}
              className="hotel-img"
              src={image}
              alt="hotel"
            />
          ))}
    </div>
  );
};

