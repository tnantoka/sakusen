import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Header from './Header';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col xs={12} md={{ size: 8, offset: 2 }} className="px-0 text-center">
            {children}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Layout;
