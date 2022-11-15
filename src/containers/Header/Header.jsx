import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import LoginPopup from "../../components/LoginPopup/LoginPopup";
import RegisterPopup from "../../components/RegisterPopup/RegisterPopup";
import { auth, logout } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logoDark from "../../images/logo-dark.png";
import logoWhite from "../../images/logo-white.png";
import { Link } from "react-router-dom";
import "./header.css";
import { useSelector, useDispatch } from 'react-redux'
import {changeTheme} from "../../redux/darkThemeSlice";

function Header() {
  const [user] = useAuthState(auth);
  const [showLoginMenu, setShowLoginMenu] = useState(false);
  const [showRegisterMenu, setShowRegisterMenu] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchRespond, setSearchRespond] = useState([]);
  const [showSearchlist, setShowSearchlist] = useState(false);
  const profilePhoto = "https://graph.facebook.com/5544168012334199/picture";
  const darkTheme = useSelector((state) => state.darkTheme.value);
  const dispatch = useDispatch()
  useEffect(() => {
    if (searchInput.length < 2) {
      setSearchRespond([]);
      setShowSearchlist(false);
      return;
    }
    setShowSearchlist(true);
    const timer = setTimeout(() => {
      fetch(`https://api.coingecko.com/api/v3/search?query=${searchInput}`)
        .then((respond) => respond.json())
        .then((data) => setSearchRespond(data.coins));
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleClose = (what) => {
    if (what === "login") setShowLoginMenu(false);
    if (what === "register") {
      setShowRegisterMenu(false);
    }
    if (what === "registerWithPopup") {
      setShowRegisterMenu(false);
      toast.info("Successfully Register");
    }
  };

  return (
    <>
      <div className="sticky-top waznehed" />
      <div className={darkTheme ? "fixed-top" : "header__container fixed-top"}>
        {showLoginMenu === true ? (
          <Modal
            show={showLoginMenu}
            onHide={() => handleClose("login")}
            dialogClassName="modal-width"
          >
            <Modal.Header
              closeButton
              closeVariant={darkTheme ? "white" : null}
              style={{
                background: darkTheme ? "#2c2b2e" : "",
                color: darkTheme ? "white" : null,
              }}
            >
              <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <LoginPopup handleClose={handleClose} darkTheme={darkTheme} />
          </Modal>
        ) : null}
        {showRegisterMenu === true ? (
          <Modal show={showRegisterMenu} onHide={() => handleClose("register")}>
            <Modal.Header
              closeButton
              closeVariant={darkTheme ? "white" : null}
              style={{
                background: darkTheme ? "#2c2b2e" : "",
                color: darkTheme ? "white" : null,
              }}
            >
              <Modal.Title>Register</Modal.Title>
            </Modal.Header>
            <RegisterPopup handleClose={handleClose} darkTheme={darkTheme} />
          </Modal>
        ) : null}
        <Navbar
          collapseOnSelect
          expand="md  px-3  "
          style={{
            background: darkTheme ? "#141316" : null,
            minHeight: "115px",
          }}
          className={darkTheme ? "navbar-dark navbaro-darko" : "navbaro-lighto"}
        >
          <div className="container-fluid  d-flex align-items-center responsive-navbar justify-content-between">
            <Navbar.Brand
              href="/"
              style={{ fontSize: "30px", fontWeight: "700" }}
              className={
                darkTheme
                  ? " d-flex align-items-center me-xxl-5 text-decoration-none text-white"
                  : " d-flex align-items-center me-5 text-decoration-none"
              }
            >
              <img
                src={darkTheme ? logoDark : logoWhite}
                alt="logo"
                style={{ width: "60px", height: "60px    " }}
              />
              <h1 className="site-title">CryptoCoin</h1>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav bg-white" />
            <Navbar.Collapse
              id="responsive-navbar-nav"
              style={{ zIndex: "1010" }}
              className="responsive-navbar-search"
            >
              <div
                className="me-lg-auto justify-content-center user-select-none ps-xxl-4 ms-xxl-4 welcome-responsive"
                style={{ maxHeight: "115px" }}
              >
                <h2
                  className={
                    darkTheme
                      ? "m-0 text-white welcome-title-responsive welcome-clamp fs-3"
                      : "welcome-title-responsive m-0 welcome-clamp"
                  }
                >
                  Welcome
                </h2>
                <p className={darkTheme ? "siema text-white-50" : "siema"}>
                  Here is the information about all crypto currencies, Login to
                  get more options
                </p>
              </div>
              {user !== null ? (
                <Nav className="d-flex align-items-center justify-content-center justify-content-lg-end ms-auto ms-auto responsive-collapse-menu">
                  <form
                    style={{ position: "relative" }}
                    className="  mb-3 mb-lg-0 me-lg-3"
                    role="search"
                  >
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Search..."
                      aria-label="Search"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      style={{
                        background: darkTheme ? "#262528" : "",
                        border: darkTheme ? "none" : "",
                        color: darkTheme ? "white" : "",
                        maxWidth: "300px",
                      }}
                    />

                    <div
                      style={{
                        position: "absolute",
                        maxHeight: "300px",
                        background: darkTheme ? "#2c2b2e" : "white",
                        width: "315px",
                        top: "50px",
                        right: "0px",
                        cursor: "pointer",
                        zIndex: "1040",
                      }}
                      className={
                        showSearchlist
                          ? "overflow-auto p-3 d-flex flex-column shadow rounded-4"
                          : "d-none"
                      }
                    >
                      {searchRespond.length !== 0
                        ? searchRespond.map((item) => (
                            <Link
                                to="Currencies/ListOfAll"
                              style={{
                                textDecoration: "none",
                                color: darkTheme ? "white" : "black",
                              }}
                            >
                              <div
                                className={
                                  darkTheme
                                    ? "d-flex justify-content-between hover-search-list-dark py-3 px-2 rounded-2"
                                    : "d-flex justify-content-between hover-search-list py-3 px-2 rounded-2"
                                }
                              >
                                <div>
                                  <img
                                    src={item.thumb}
                                    className="me-3"
                                    alt="logo"
                                  />
                                  <span className="fw-semibold">
                                    {item.name}
                                  </span>
                                </div>
                                <span className="">{item.symbol}</span>
                              </div>
                            </Link>
                          ))
                        : null}
                    </div>
                  </form>
                  <NavDropdown
                    menuVariant={darkTheme ? "dark" : null}
                    href="#"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    title={
                      <img
                        src={
                          user.photoURL !== null ? user.photoURL : profilePhoto
                        }
                        alt="Profile"
                        width="32"
                        height="32"
                        className="rounded-circle"
                      />
                    }
                    drop="left"
                    style={{ position: "relative" }}
                  >
                    <NavDropdown.Item href="#action/3.1">
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      Settings
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      href="#action/3.4"
                      onClick={() => logout()}
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              ) : (
                <div className="d-flex gap-3 align-content-center flex-column flex-md-row align-items-center">
                  <form
                    style={{ position: "relative" }}
                    className=" me-lg-3 w-100 mb-md-0 mb-3"
                    role="search"
                  >
                    <input
                      type="search"
                      className="form-control w-100"
                      placeholder="Search..."
                      aria-label="Search"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      style={{
                        background: darkTheme ? "#262528" : "",
                        border: darkTheme ? "none" : "",
                        color: darkTheme ? "white" : "",
                        zIndex: "1040",
                        minWidth: "250px",
                        //                                            width:"315px"
                      }}
                    />

                    <div
                      style={{
                        position: "absolute",
                        maxHeight: "300px",
                        background: darkTheme ? "#2c2b2e" : "white",
                        width: "315px",
                        top: "50px",
                        right: "0px",
                        cursor: "pointer",
                      }}
                      className={
                        showSearchlist
                          ? "overflow-auto p-3 d-flex flex-column shadow rounded-4"
                          : "d-none"
                      }
                    >
                      {searchRespond.length !== 0
                        ? searchRespond.map((item) => (
                            <Link
                              to={`/Currencies/AdvancedInfo/${item.id}`}
                              style={{
                                textDecoration: "none",
                                color: darkTheme ? "white" : "black",
                              }}
                            >
                              <div
                                className={
                                  darkTheme
                                    ? "d-flex justify-content-between hover-search-list-dark py-3 px-2 rounded-2"
                                    : "d-flex justify-content-between hover-search-list py-3 px-2 rounded-2"
                                }
                              >
                                <div>
                                  <img
                                    src={item.thumb}
                                    className="me-3"
                                    alt="logo"
                                  />
                                  <span className="fw-semibold">
                                    {item.name}
                                  </span>
                                </div>
                                <span className="">{item.symbol}</span>
                              </div>
                            </Link>
                          ))
                        : null}
                    </div>
                  </form>
                  <div className="w-100 d-flex gap-3  align-items-center mb-md-0 mb-4">
                    <button
                      type="button"
                      className="btn me-2 btn-outline-primary text-primary fw-semibold hover-button-login button-login-logout w-50 w-md-0"
                      style={{
                        outline: "1px solid rgba(13,110,253)",
                        minWidth: "63px",
                      }}
                      onClick={() => setShowLoginMenu(true)}
                    >
                      Login
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary bg-primary text-white fw-semibold button-login-logout w-50 w-md-0"
                      style={{ minWidth: "84px" }}
                      onClick={() => setShowRegisterMenu(true)}
                    >
                      Sign-up
                    </button>
                  </div>
                </div>
              )}
              <div className="header__menu-responsive">
                  <Link to="Currencies/listOfAll"  style={{
                      textDecoration: "none",
                      color: darkTheme ? "white" : "black",
                  }}>
                <div
                  className="d-flex flex-fill  align-items-center"
                  style={{
                    color: darkTheme ? "white" : null,
                    borderBottom: "1px solid gray",
                    cursor: "pointer",
                    height: "50px",
                  }}
                >
                  <h5 className="m-0">List Of All</h5>
                </div>
                  </Link>
                <div
                  className="d-flex flex-fill align-items-center justify-content-between"
                  style={{
                    color: darkTheme ? "white" : null,
                    borderBottom: "1px solid gray",
                    cursor: "pointer",
                    height: "50px",
                  }}
                >
                  <h5 className="m-0">Most Popular</h5>
                  <i className="bi bi-caret-down-fill d-flex align-items-center fs-3"></i>
                </div>
                <div
                  className="d-flex flex-fill align-items-center justify-content-between"
                  style={{
                    color: darkTheme ? "white" : null,
                    borderBottom: "1px solid gray",
                    cursor: "pointer",
                    height: "50px",
                  }}
                >
                  <h5 className="m-0">Favourites</h5>
                  <i className="bi bi-caret-down-fill d-flex align-items-center fs-3"></i>
                </div>
                  <Link to="Currencies/Trending"
                      style={{
                          textDecoration: "none",
                          color: darkTheme ? "white" : "black",
                      }}>
                <div
                  className="d-flex flex-fill align-items-center "
                  style={{
                    color: darkTheme ? "white" : null,
                    borderBottom: "1px solid gray",
                    cursor: "pointer",
                    height: "50px",
                  }}
                >

                  <h5 className="m-0">Trending</h5>
                </div>
                  </Link>
                  <Link to="/Contact"
                      style={{
                          textDecoration: "none",
                          color: darkTheme ? "white" : "black",
                      }}>

                <div
                  className="d-flex flex-fill align-items-center "
                  style={{
                    color: darkTheme ? "white" : null,
                    borderBottom: "1px solid gray",
                    cursor: "pointer",
                    height: "50px",
                  }}
                >
                  <h5 className="m-0">Contact Us</h5>

                </div>
                  </Link>
                <div
                  className="d-flex flex-fill align-items-center mb-3 justify-content-between"
                  style={{
                    color: darkTheme ? "white" : null,
                    borderBottom: "1px solid gray",
                    cursor: "pointer",
                    height: "50px",
                  }}
                >
                  <h5 className="m-0">Dark Theme</h5>
                    <div className="d-flex justify-content-center orm-check form-switch">
                    <input
                        checked={darkTheme ? true : false}
                        onClick={() => dispatch(changeTheme())
                    }
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                        style={{ cursor: "pointer", paddingLeft: "30px" }}
                    />
                        </div>
                </div>
                <div className="testowanie"></div>
              </div>
            </Navbar.Collapse>
          </div>
        </Navbar>
      </div>
    </>
  );
}

export default Header;
