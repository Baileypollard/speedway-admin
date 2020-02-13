import React, { Component } from "react";
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { nav } from '../Styles/nav.css'
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import { withAuthentication } from '../Session';
import NavBarLogo from '../../images/logo.jpg'

class NavigationBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      auth:this.props.auth,
      selectedLink: '',
    }

    this.logout = this.logout.bind(this)
    this.isSelected = this.isSelected.bind(this)
  }

  logout() {
    this.props.firebase.doSignOut()
  }

  isSelected(linkName) {
    return linkName === this.state.selectedLink
  }

  getLinkList() {
    let linkList =  ['Dashboard', 'Races', 'Test 3', 'Test 4']
    return linkList
  }

  render() {
    return (
      <div>
        <Navbar bg="dark" expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Navbar.Brand href="#home">
              <span>Looney Speed Way</span>
            </Navbar.Brand>
            <Nav className="mr-auto">
              {
                this.getLinkList().map((linkString, index) =>
                  <Link
                    key={index}
                    onClick={event => this.setState({ selectedLink: linkString })}
                    className={`ml-3 ${this.isSelected(linkString) ? 'NavElemSelected' : 'NavElem'}`}
                    name={linkString}
                    to={'/' + linkString}>
                    {linkString.replace(/\/new/, '').split(/(?=[A-Z])/).join(' ')}
                  </Link>
                )
              }
            </Nav>
            {
                <Button
                  onClick={this.logout}
                  className="mt-2 ml-2 LogOutButton"
                  variant="outline-secondary"
                  size="sm">
                  LOGOUT
                </Button>
            }
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default withAuthentication(NavigationBar);
