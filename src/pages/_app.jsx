import React from "react";
import { Layout } from "../components/Layout";
import "semantic-ui-css/semantic.min.css";

export default ({ Component, pageProps }) => {
  if (Component.getLayout) {
    return (Component.getLayout(<Component {...pageProps}/>));
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};
