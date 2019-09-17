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
} from 'reactstrap';

import { FirebaseContext, signIn, signOut } from './FirebaseAuth';

const App: React.FC = () => {
  const { uid, displayName } = useContext(FirebaseContext);

  return (
    <>
      <Navbar light expand>
        <NavbarBrand href="/">さくせん</NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <i className="nes-icon twitter"></i>
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
      </Navbar>
    </>
  );
};

export default App;
