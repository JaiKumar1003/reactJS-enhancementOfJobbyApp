import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = () => {
  return (
    <div className="home-container">
      <Header />
      <div className="home-content-card">
        <h1 className="home-heading">Find The Job That Fits Your Life</h1>
        <p className="home-description">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your ability and potential.
        </p>
        <Link to="/jobs" className="common-link">
          <button type="button" className="home-find-jobs-button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home
