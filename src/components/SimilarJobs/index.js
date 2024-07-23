import {IoMdStar} from 'react-icons/io'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobs = props => {
  const {similarJobs} = props

  const renderLocationSalary = eachJob => {
    const {location, employmentType} = eachJob
    return (
      <div className="similar-jobs-location-employ-type-card">
        <p className="similar-jobs-location">
          <MdLocationOn className="similar-jobs-location-icon" /> {location}
        </p>
        <p className="similar-jobs-employ-type">
          <BsBriefcaseFill className="similar-jobs-employ-icon" />{' '}
          {employmentType}
        </p>
      </div>
    )
  }

  const renderJobImageName = eachJob => {
    const {rating, title, companyLogoUrl} = eachJob
    return (
      <div className="similar-jobs-logo-name-card">
        <img
          className="similar-jobs-logo"
          src={companyLogoUrl}
          alt="similar job company logo"
        />
        <div>
          <h1 className="similar-jobs-title">{title}</h1>
          <div className="similar-jobs-rating-card">
            <IoMdStar className="similar-jobs-rating-icon" />
            <p className="similar-jobs-rating">{rating}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="similar-jobs-container">
      <h1 className="similar-jobs-heading">Similar Jobs</h1>
      <ul className="similar-jobs-list">
        {similarJobs.map(eachSimilarJob => {
          const updatedSimilarJob = {
            id: eachSimilarJob.id,
            title: eachSimilarJob.title,
            location: eachSimilarJob.location,
            rating: eachSimilarJob.rating,
            companyLogoUrl: eachSimilarJob.company_logo_url,
            employmentType: eachSimilarJob.employment_type,
            jobDescription: eachSimilarJob.job_description,
          }
          const {id, jobDescription} = updatedSimilarJob
          return (
            <li key={id} className="similar-jobs-item">
              <div className="similar-jobs-card">
                {renderJobImageName(updatedSimilarJob)}
                <h1 className="similar-jobs-description-heading">
                  Description
                </h1>
                <p className="similar-jobs-description">{jobDescription}</p>
                {renderLocationSalary(updatedSimilarJob)}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default SimilarJobs
