import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import CarouselOfertas from "components/Web/CarouselOfertas";
import logo from "assets/img/banner2.png";
import { getOnSaleProductsFire } from "Fire/product";

import "pages/Web/Home/Home.scss";
import {
  ArrowRightOutlined,
  CreditCardOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Button, Spin, List } from "antd";
import { getLastPost } from "Fire/blog";
import PostCard from "components/Web/PostCard";

function Home() {
  const [productos, setProductos] = useState([]);
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOnSaleProductsFire(setProductos);
    getLastPost(setPost, setLoading);
  }, []);

  return (
    <>
      <Helmet>
        <title>Inicio | Pescaderia Fresh&Frozen</title>
        <meta
          name="description"
          content="Inicio Home Fresh&Frozen Pescaderia"
        />
      </Helmet>
      <div className="home" style={{ minHeight: "82vh" }}>
        <div className="home__banner-hero">
          <img src={logo} alt="F&F" />
        </div>

        <div className="home__mini-banner">
          <ShoppingOutlined className="home__mini-banner-icon" />
          <div className="home__mini-banner-texto">
            <p>Hacemos envios de Lunes a Viernes</p>
            <p>sin cargo!</p>
            <p>Disponible solo para Mar del Plata.</p>
          </div>
        </div>

        <div className="home__carousel">
          <CarouselOfertas productos={productos} />
          <Link to="/productos/promociones" className="home__carousel-link">
            <Button size="large" ghost>
              Mirá todas nuestras ofertas!
              <ArrowRightOutlined />
            </Button>
          </Link>
        </div>

        <div className="home__mini-banner-alt">
          <CreditCardOutlined className="home__mini-banner-alt-icon" />
          <div className="home__mini-banner-texto">
            <p>Aceptamos tarjetas de crédito.</p>
            <p>Hasta 3 cuotas sin interés</p>
          </div>
        </div>

        <div className="home__banner-blog">
          <h3 className="home__banner-blog-titulo">Mira nuestro blog :D</h3>
          {loading ? (
            <Spin style={{ margin: "0 auto", display: "block" }} />
          ) : (
            post && (
              <List
                dataSource={post}
                renderItem={(post) => <PostCard post={post} />}
              />
            )
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
