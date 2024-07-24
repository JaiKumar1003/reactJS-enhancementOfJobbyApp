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
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
      </li>
      <li className="header-home-jobs-card">
        <Link to="/" className="common-link">
          <button
            aria-label="home button"
            type="button"
            className="header-common-button header-common-sm"
          >
            <TiHome className="header-icons" />
          </button>
          <p className="header-lg-home">Home</p>
        </Link>
        <Link to="/jobs" className="common-link">
          <button
            aria-label="jobs button"
            type="button"
            className="header-common-button header-common-sm"
          >
            <BsBriefcaseFill className="header-icons" />
          </button>
          <p className="header-lg-jobs">Jobs</p>
        </Link>
      </li>
      <li>
        <button
          aria-label="logout button"
          onClick={onClickLogout}
          type="button"
          className="header-common-button header-lg-logout-button"
        >
          <FiLogOut className="header-icons" />
          <span className="logout-text">Logout</span>
        </button>
      </li>
    </ul>
  )

  return <div className="header-container">{renderDesktopView()}</div>
}

export default withRouter(Header)
