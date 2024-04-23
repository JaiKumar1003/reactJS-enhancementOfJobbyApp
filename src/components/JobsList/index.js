import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {IoMdStar} from 'react-icons/io'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const apiJobsList = {
  loader: 'LOADER',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const JobsList = props => {
  const renderLocationSalary = eachJob => {
    const {location, employmentType, packagePerAnnum} = eachJob
    return (
      <div className="job-location-salary-card">
        <div className="job-location-employ-type-card">
          <p className="job-location">
            <MdLocationOn className="job-location-icon" /> {location}
          </p>
          <p className="job-employ-type">
            <BsBriefcaseFill className="job-employ-icon" /> {employmentType}
          </p>
        </div>
        <p className="job-package">{packagePerAnnum}</p>
      </div>
    )
  }

  const renderJobImageName = eachJob => {
    const {rating, title, companyLogoUrl} = eachJob
    return (
      <div className="job-logo-name-card">
        <img className="job-logo" src={companyLogoUrl} alt="company logo" />
        <div>
          <h1 className="job-title">{title}</h1>
          <div className="job-rating-card">
            <IoMdStar className="job-rating-icon" />
            <p className="job-rating">{rating}</p>
          </div>
        </div>
      </div>
    )
  }

  const renderNoJobsList = () => (
    <>
      <img
        className="no-jobs-img"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-description">
        We could not find any jobs. Try other filters.
      </p>
    </>
  )

  const renderSuccessView = () => {
    const {jobsList} = props

    if (jobsList.length < 1) {
      return <div className="no-jobs-card">{renderNoJobsList()}</div>
    }

    return (
      <ul className="jobs-list">
        {jobsList.map(eachJob => {
          const {id, jobDescription} = eachJob

          return (
            <li key={id} className="job-item">
              <Link to={`/jobs/${id}`} className="job-link">
                <div className="job-item-card">
                  {renderJobImageName(eachJob)}
                  {renderLocationSalary(eachJob)}
                  <hr className="horizontal-lines" />
                  <h1 className="job-description-heading">Description</h1>
                  <p className="job-description">{jobDescription}</p>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    )
  }

  const onClickFailure = () => {
    const {onClickFailureJobs} = props
    onClickFailureJobs()
  }

  const renderFailureView = () => (
    <div className="job-failure-card">
      <img
        className="job-failure-img"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="job-failure-heading">Oops! Something Went Wrong</h1>
      <p className="job-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        onClick={onClickFailure}
        className="job-failure-button"
        type="button"
      >
        Retry
      </button>
    </div>
  )

  const renderJobsList = () => {
    const {jobsApiView} = props
    if (jobsApiView === apiJobsList.failure) {
      return renderFailureView()
    }
    return renderSuccessView()
  }

  const renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  const {jobsApiView, jobsList} = props
  return (
    <>
      {jobsList.length > 0 && (
        <hr className="horizontal-lines horizontal-lines-jobs-list" />
      )}
      {jobsApiView === apiJobsList.loader ? renderLoader() : renderJobsList()}
    </>
  )
}

export default JobsList
