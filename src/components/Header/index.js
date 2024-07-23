import {withRouter, Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import {TiHome} from 'react-icons/ti'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const {history} = props
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const renderDesktopView = () => (
    <ul className="header-list">
      <li>
        <Link to="/" className="common-link">
          <img
            className="website-logo-lg"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
      </li>
      <li className="header-lg-home-jobs-card">
        <Link to="/" className="common-link">
          <p className="header-lg-home">Home</p>
        </Link>
        <Link to="/jobs" className="common-link">
          <p className="header-lg-jobs">Jobs</p>
        </Link>
      </li>
      <li>
        <button
          type="button"
          className="header-lg-logout-button header-common-button"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </li>
    </ul>
  )

  const renderMobileView = () => (
    <>
      <Link to="/" className="common-link">
        <img
          className="website-logo-sm"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>
      <div>
        <Link to="/" className="common-link">
          <button
            aria-label="home button"
            type="button"
            className="header-common-button"
          >
            <TiHome className="header-icons" />
          </button>
        </Link>
        <Link to="/jobs" className="common-link">
          <button
            aria-label="jobs button"
            type="button"
            className="header-common-button"
          >
            <BsBriefcaseFill className="header-icons" />
          </button>
        </Link>
        <button
          aria-label="logout button"
          onClick={onClickLogout}
          type="button"
          className="header-common-button"
        >
          <FiLogOut className="header-icons" />
        </button>
      </div>
    </>
  )

  return (
    <>
      <div className="header-container-sm">{renderMobileView()}</div>
      <div className="header-container-lg">{renderDesktopView()}</div>
    </>
  )
}

export default withRouter(Header)
