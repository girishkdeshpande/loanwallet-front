import Logo from "D:/loanwallet-front/src/Assets/Images/favicon.png";
import Logo1 from "D:/loanwallet-front/src/Assets/Images/v-square_02.png";
import "../../Styles/HomePage.css";

const HomeCarousel = () => {
  return (
    <>
      <div className="col-12 ">
        <div id="demo" className="carousel slide" data-bs-ride="carousel">
          {/* <!-- Indicators/dots --> */}
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#homeCarousel"
              data-bs-slide-to="0"
              className="active"
            ></button>
            <button
              type="button"
              data-bs-target="#homeCarousel"
              data-bs-slide-to="1"
            ></button>
            <button
              type="button"
              data-bs-target="#homeCarousel"
              data-bs-slide-to="2"
            ></button>
          </div>

          {/* <!-- The slideshow/carousel --> */}
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src={Logo}
                alt="Los Angeles"
                className="d-block custom_img mx-auto"
              />
            </div>
            <div className="carousel-item">
              <img
                src={Logo1}
                alt="Chicago"
                className="d-block custom_img mx-auto"
              />
            </div>
          </div>

          {/* <!-- Left and right controls/icons --> */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#homeCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#homeCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
      </div>
    </>
  );
};
export default HomeCarousel;
