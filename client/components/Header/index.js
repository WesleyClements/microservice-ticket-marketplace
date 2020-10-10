import Link from 'next/link';
import { Navbar, Nav } from 'react-bootstrap';

const Header = ({ currentUser }) => {
  return (
    <Navbar light="true" bg="light">
      <Link href="/" passHref>
        <Navbar.Brand>GitTix</Navbar.Brand>
      </Link>
      <Nav as="ul" className="ml-auto">
        {(currentUser
          ? [{ text: 'Sign Out', href: '/auth/signout' }]
          : [
              { text: 'Sign In', href: '/auth/signin' },
              { text: 'Sign Up', href: '/auth/signup' },
            ]
        ).map(({ href, text, onClick }, i) => (
          <Nav.Item as="li">
            <Link href={href} passHref key={'link' + i}>
              <Nav.Link>{text}</Nav.Link>
            </Link>
          </Nav.Item>
        ))}
      </Nav>
    </Navbar>
  );
};

export default Header;
