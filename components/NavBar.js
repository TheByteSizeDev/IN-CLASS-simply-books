/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import {
  Navbar, Container, Nav,
} from 'react-bootstrap';
import { useRouter } from 'next/router';

export default function NavBar() {
  const [filter, setFilter] = useState('');
  const router = useRouter();

  const onSearch = (event) => {
    event.preventDefault();
    if (filter !== '') {
      router.push(`/search/${filter}`);
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>📚 Simply Books 📚</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="ml-auto">
            <input placeholder="Let's Search" onChange={(event) => setFilter(event.target.value)} />
            <button type="submit" onClick={(event) => onSearch(event)}>Search</button>
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/">
              <Nav.Link>Books</Nav.Link>
            </Link>
            <Link passHref href="/book/new">
              <Nav.Link>Create Book</Nav.Link>
            </Link>
            <Link passHref href="/authors">
              <Nav.Link>Authors</Nav.Link>
            </Link>
            <Link passHref href="/author/new">
              <Nav.Link>Create Author</Nav.Link>
            </Link>
            <Link passHref href="/profile">
              <Nav.Link>Profile</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
