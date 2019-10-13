import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
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

import { FirebaseContext, signIn, signOut, deactivate } from '../FirebaseAuth';

const App: React.FC = () => {
  const { uid, displayName, photoURL, screenName } = useContext(
    FirebaseContext
  );

  const onClickDeactivate = () => {
    if (!window.confirm('全てのデータを削除して退会します。よろしいですか？')) {
      return;
    }
    deactivate();
  };

  return (
    <>
      <Navbar light expand>
        <Container className="px-sm-3">
          <NavbarBrand tag={Link} to="/">
            さくせん
          </NavbarBrand>
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
                  ＠{screenName}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem header>{displayName}</DropdownItem>
                  <DropdownItem tag={Link} to="/">
                    ホーム
                  </DropdownItem>
                  <DropdownItem tag={Link} to="/new">
                    さくせんをねる
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={signOut}>ログアウト</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={onClickDeactivate}>
                    <span className="text-danger">退会</span>
                  </DropdownItem>
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
