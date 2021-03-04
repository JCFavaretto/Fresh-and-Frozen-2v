import { Carousel } from "antd";
import React, { useState } from "react";
import ProductCard from "../ProductCard";
import Modal from "components/Modal";

function CarouselOfertas({ productos }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const settings = {
    autoplay: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: true,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
        },
      },

      {
        breakpoint: 996,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    <>
      <Modal
        title={modalTitle}
        isVisible={modalVisible}
        setIsVisible={setModalVisible}
      >
        {modalContent}
      </Modal>
      <h1 className="pagina-productos__titulo">Las mejores ofertas!</h1>
      <Carousel {...settings}>
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
    </>
  );
}

export default CarouselOfertas;
