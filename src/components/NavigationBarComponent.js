import { useState } from "react";

// Dependencies
import { Link } from "react-router-dom";

// Navigation bar component
const NavigationBarComponent = () => {
  // States
  const [hamburgerMenuOpened, setHamburgerMenuOpened] = useState(false);

  return (
    <nav className="navigation-bar-component">
      <div className="container">
        <div className="mobile-logo">
          <Link to="/">BUY THE DIP</Link>
        </div>

        <button
          className="hamburger-menu-open-btn"
          onClick={() => {
            setHamburgerMenuOpened(true);
          }}
        >
          <svg
            width="25"
            height="15"
            viewBox="0 0 25 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.9167 0H1.79166C1.1013 0 0.541656 0.559644 0.541656 1.25C0.541656 1.94036 1.1013 2.5 1.79166 2.5H19.9167C20.607 2.5 21.1667 1.94036 21.1667 1.25C21.1667 0.559644 20.607 0 19.9167 0Z"
              fill="white"
            />
            <path
              d="M23.0416 6.24976H4.91663C4.22627 6.24976 3.66663 6.80938 3.66663 7.49976C3.66663 8.19013 4.22627 8.74976 4.91663 8.74976H23.0416C23.732 8.74976 24.2916 8.19013 24.2916 7.49976C24.2916 6.80938 23.732 6.24976 23.0416 6.24976Z"
              fill="white"
            />
            <path
              d="M19.9167 12.5002H1.79166C1.1013 12.5002 0.541656 13.0599 0.541656 13.7502C0.541656 14.4406 1.1013 15.0002 1.79166 15.0002H19.9167C20.607 15.0002 21.1667 14.4406 21.1667 13.7502C21.1667 13.0599 20.607 12.5002 19.9167 12.5002Z"
              fill="white"
            />
          </svg>
        </button>

        <div
          className={
            hamburgerMenuOpened
              ? "navigation-bar-elements active"
              : "navigation-bar-elements"
          }
        >
          <button
            className="hamburger-menu-close-btn"
            onClick={() => {
              setHamburgerMenuOpened(false);
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_289_77)">
                <path
                  d="M15.1203 13.4548L2.81893 1.15341C2.35039 0.684867 1.59074 0.684867 1.12219 1.15341C0.653647 1.62195 0.653647 2.38161 1.12219 2.85015L13.4236 15.1515C13.8921 15.6201 14.6518 15.6201 15.1203 15.1515C15.5889 14.683 15.5889 13.9234 15.1203 13.4548Z"
                  fill="white"
                />
                <path
                  d="M13.1498 0.848476L0.848384 13.1498C0.379844 13.6184 0.379844 14.3781 0.848384 14.8466C1.31693 15.3151 2.07659 15.3151 2.54513 14.8466L14.8465 2.54522C15.3151 2.07668 15.3151 1.31702 14.8465 0.848476C14.378 0.379935 13.6183 0.379935 13.1498 0.848476Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_289_77">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>

          <div className="navigation-bar-elements-left">
            <ul>
              <li>
                <Link
                  className="logo-main"
                  onClick={() => {
                    setHamburgerMenuOpened(false);
                  }}
                  to="/"
                >
                  BUY THE DIP
                </Link>
              </li>
            </ul>
          </div>

          <div className="navigation-bar-elements-right">
            <ul>
              <li>
                <Link
                  onClick={() => {
                    setHamburgerMenuOpened(false);
                  }}
                  to="/"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  onClick={() => {
                    setHamburgerMenuOpened(false);
                  }}
                  to="/team"
                >
                  TEAM
                </Link>
              </li>

              <li>
                <Link
                  onClick={() => {
                    setHamburgerMenuOpened(false);
                  }}
                  to="/about"
                >
                  ABOUT
                </Link>
              </li>

              <li>
                <Link
                  onClick={() => {
                    setHamburgerMenuOpened(false);
                  }}
                  to="/roadmap"
                >
                  ROADMAP
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Export
export default NavigationBarComponent;
