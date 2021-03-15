import React, { useEffect, useState } from "react";

import CarouselOfertas from "components/Web/CarouselOfertas";
import logo from "assets/img/banner.png";
import { getOnSaleProductsFire } from "Fire/product";

import "pages/Web/Home/Home.scss";

function Home() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    getOnSaleProductsFire(setProductos);
  }, []);

  return (
    <div className="home" style={{ minHeight: "82vh" }}>
      <div className="home__banner-hero">
        <img src={logo} alt="F&F" />
      </div>
      <div className="home__carousel">
        <CarouselOfertas productos={productos} />
      </div>
    </div>
  );
}

export default Home;
