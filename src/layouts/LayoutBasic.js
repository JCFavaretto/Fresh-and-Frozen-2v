import React from "react";
import { Layout } from "antd";
import LoadRouters from "components/LoadRouters";

import "layouts/LayoutBasic.scss";

function LayoutBasic(props) {
  const { routes } = props;
  const { Content, Footer } = Layout;
  return (
    <Layout>
      <h2>Menu </h2>
      <Layout>
        <Content>
          <LoadRouters routes={routes} />
        </Content>
        <Footer>Juan Cruz Favaretto</Footer>
      </Layout>
    </Layout>
  );
}

export default LayoutBasic;
