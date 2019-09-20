import React, { useContext } from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
} from 'reactstrap';

import { FirebaseContext, signIn, signOut } from './FirebaseAuth';

const App: React.FC = () => {
  const { uid, displayName, photoURL } = useContext(FirebaseContext);

  return (
    <>
      <Navbar light expand>
        <Container>
          <NavbarBrand href="/">さくせん</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              {!!photoURL ? (
                <img
                  className="nes-avatar"
                  src={photoURL!}
                  alt=""
                  style={{ imageRendering: 'pixelated' }}
                />
              ) : (
                <i className="nes-icon twitter"></i>
              )}
            </NavItem>
            {!!uid && (
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {displayName}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem header>Option 1</DropdownItem>
                  <DropdownItem onClick={signOut}>ログアウト</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>たいかい</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            )}
            {!uid && (
              <NavItem>
                <NavLink onClick={signIn}>ログイン</NavLink>
              </NavItem>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default App;
