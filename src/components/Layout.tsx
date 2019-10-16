import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Rollbar from 'rollbar';

import Header from './Header';
import AdBanner from './AdBanner';

interface LayoutProps {
  title?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  useState(
    new Rollbar({
      accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
      captureUncaught: true,
      captureUnhandledRejections: true,
      payload: {
        environment: process.env.NODE_ENV,
      },
    })
  );

  return (
    <>
      <Header />
      <Container>
        {!!title && <h1 className="text-center my-5">{title}</h1>}
        <Row>
          <Col
            xs={{ size: 10, offset: 1 }}
            md={{ size: 8, offset: 2 }}
            lg={{ size: 6, offset: 3 }}
            className="px-0 text-center"
          >
            {children}
          </Col>
        </Row>
        <div className="text-center mb-5">
          <AdBanner />
        </div>
        <p className="text-center">
          <a
            href="https://chickenknife.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none"
          >
            (c) Chicken Knife
          </a>
        </p>
      </Container>
    </>
  );
};

export default Layout;
