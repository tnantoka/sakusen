import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Header from './Header';

interface LayoutProps {
  title?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  return (
    <>
      <Header />
      <Container>
        {!!title && <h1 className="text-center">{title}</h1>}
        <Row>
          <Col
            xs={{ size: 10, offset: 1 }}
            sm={{ size: 8, offset: 2 }}
            lg={{ size: 6, offset: 3 }}
            className="px-0 text-center"
          >
            {children}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Layout;
