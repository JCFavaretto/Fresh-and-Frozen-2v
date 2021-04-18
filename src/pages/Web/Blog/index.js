import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Col, Row, Spin } from "antd";
import { Helmet } from "react-helmet";

import BlogList from "components/Web/BlogList";
import { getPostsFire } from "Fire/blog";

import "pages/Web/Blog/Blog.scss";
import PostInfo from "components/Web/PostInfo";

function Blog() {
  const { id } = useParams();
  const [posts, setPosts] = useState(null);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPostsFire(setPosts, setLoading);
  }, []);

  useEffect(() => {
    if (id && posts) {
      posts.forEach((post) => {
        if (post.id === id) {
          setPost(post);
        }
      });
    }
  }, [posts, id]);

  return (
    <>
      <Helmet>
        <title>
          {id && post ? post.title : "Blog"} | Pescaderia Fresh&Frozen
        </title>
        <meta name="description" content="Nosotros Fresh&Frozen Pescaderia" />
      </Helmet>
      <Row style={{ minHeight: "82vh" }}>
        <Col xs={1} sm={2} lg={4}></Col>
        <Col xs={22} sm={20} lg={16}>
          <div className="blog">
            {loading ? (
              <>
                <h3 className="blog__titulo"> Cargando.. </h3>
                <Spin style={{ display: "block", margin: "0 auto" }} />
              </>
            ) : (
              <>
                {id ? (
                  <h3 className="blog__titulo"> {post && post.title} </h3>
                ) : (
                  <h3 className="blog__titulo"> Blog </h3>
                )}

                {id ? <PostInfo post={post} /> : <BlogList posts={posts} />}
              </>
            )}
          </div>
        </Col>
        <Col xs={1} sm={2} lg={4}></Col>
      </Row>
    </>
  );
}

export default Blog;
