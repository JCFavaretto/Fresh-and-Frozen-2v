import { Carousel } from "antd";
import React, { useState } from "react";
import ProductCard from "../ProductCard";
import Modal from "components/Modal";

import "components/Web/CarouselOfertas/CarouselOfertas.scss";

function CarouselOfertas({ productos }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const settings = {
    arrows: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="carousel">
      <Modal
        title={modalTitle}
        isVisible={modalVisible}
        setIsVisible={setModalVisible}
      >
        {modalContent}
      </Modal>
      <h1 className="carousel__titulo">Encontra las mejores ofertas!</h1>
      <Carousel {...settings} className="carousel__actual-carousel">
        {productos.map((item) => {
          return (
            <ProductCard
              key={item.id}
              producto={item}
              setModalVisible={setModalVisible}
              setModalTitle={setModalTitle}
              setModalContent={setModalContent}
            />
          );
        })}
      </Carousel>
    </div>
  );
}

export default CarouselOfertas;
