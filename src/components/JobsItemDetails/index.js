import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {IoMdStar} from 'react-icons/io'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FaExternalLinkAlt} from 'react-icons/fa'

import Header from '../Header'
import SimilarJobs from '../SimilarJobs'

import './index.css'

const jobItemDetailApi = {
  loader: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobsItemDetails extends Component {
  state = {jobItemDetailList: [], jobDetailsApi: jobItemDetailApi.loader}

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        jobDetails: data.job_details,
        similarJobs: data.similar_jobs,
      }
      this.setState({
        jobItemDetailList: updatedData,
        jobDetailsApi: jobItemDetailApi.success,
      })
    } else {
      this.setState({
        jobItemDetailList: [],
        jobDetailsApi: jobItemDetailApi.failure,
      })
    }
  }

  static renderLifeAtCompany(updatedJob) {
    const {lifeAtCompany} = updatedJob
    const updatedLifeAtCompany = {
      imageUrl: lifeAtCompany.image_url,
      description: lifeAtCompany.description,
    }

    const {imageUrl, description} = updatedLifeAtCompany

    return (
      <div className="job-life-at-company-card">
        <h1 className="job-life-at-company-heading">Life at Company</h1>
        <div className="job-life-at-company-description-image-card">
          <p className="job-life-at-company-description">{description}</p>
          <img
            className="job-life-at-company-image"
            src={imageUrl}
            alt="life at company"
          />
        </div>
      </div>
    )
  }

  static renderSkills(updatedJob) {
    const {skills} = updatedJob

    return (
      <div className="job-item-detail-skills-card">
        <h1 className="job-item-detail-skills-heading">Skills</h1>
        <ul className="job-item-detail-skills-list">
          {skills.map(eachSkill => {
            const skill = {
              imageUrl: eachSkill.image_url,
              name: eachSkill.name,
            }
            const {name, imageUrl} = skill

            return (
              <li key={name} className="job-item-detail-skill-item">
                <img
                  className="job-item-detail-skill-img"
                  src={imageUrl}
                  alt={name}
                />
                <p className="job-item-detail-skill-name">{name}</p>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  static renderDescription(updatedJob) {
    const {jobDescription, companyWebsiteUrl} = updatedJob

    return (
      <div className="job-item-detail-description-card">
        <div className="job-description-website-card">
          <h1 className="job-item-description-heading">Description</h1>
          <a
            className="job-company-website-link"
            href={companyWebsiteUrl}
            target="_blank"
            rel="noreferrer"
          >
            Visit <FaExternalLinkAlt className="job-company-website-icon" />
          </a>
        </div>
        <p className="job-item-description">{jobDescription}</p>
      </div>
    )
  }

  static renderLocationSalary(updatedJob) {
    const {location, employmentType, packagePerAnnum} = updatedJob
    return (
      <div className="job-item-location-salary-card">
        <div className="job-item-location-employ-type-card">
          <p className="job-item-location">
            <MdLocationOn className="job-item-location-icon" /> {location}
          </p>
          <p className="job-item-employ-type">
            <BsBriefcaseFill className="job-item-employ-icon" />{' '}
            {employmentType}
          </p>
        </div>
        <p className="job-item-package">{packagePerAnnum}</p>
      </div>
    )
  }

  static renderJobImageName(updatedJob) {
    const {rating, title, companyLogoUrl} = updatedJob
    return (
      <div className="job-item-logo-name-card">
        <img
          className="job-item-logo"
          src={companyLogoUrl}
          alt="job details company logo"
        />
        <div>
          <h1 className="job-item-title">{title}</h1>
          <div className="job-item-rating-card">
            <IoMdStar className="job-item-rating-icon" />
            <p className="job-item-rating">{rating}</p>
          </div>
        </div>
      </div>
    )
  }

  renderSuccess = () => {
    const {jobItemDetailList} = this.state
    const {jobDetails} = jobItemDetailList
    const updatedJob = {
      id: jobDetails.id,
      title: jobDetails.title,
      location: jobDetails.location,
      rating: jobDetails.rating,
      skills: jobDetails.skills,
      companyLogoUrl: jobDetails.company_logo_url,
      companyWebsiteUrl: jobDetails.company_website_url,
      employmentType: jobDetails.employment_type,
      jobDescription: jobDetails.job_description,
      lifeAtCompany: jobDetails.life_at_company,
      packagePerAnnum: jobDetails.package_per_annum,
    }
    const {similarJobs} = jobItemDetailList
    return (
      <>
        <div className="job-item-details">
          <div className="job-item-details-card">
            {this.renderJobImageName(updatedJob)}
            {this.renderLocationSalary(updatedJob)}
            <hr className="horizontal-lines" />
            {this.renderDescription(updatedJob)}
            {this.renderSkills(updatedJob)}
            {this.renderLifeAtCompany(updatedJob)}
          </div>
        </div>
        <SimilarJobs similarJobs={similarJobs} />
      </>
    )
  }

  onClickFailure = () => {
    this.setState({jobDetailsApi: jobItemDetailApi.loader}, this.getJobsList)
  }

  renderFailure = () => (
    <div className="job-item-detail-failure-card">
      <img
        className="job-item-detail-failure-img"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="job-item-detail-failure-heading">
        Oops! Something Went Wrong
      </h1>
      <p className="job-item-detail-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        onClick={this.onClickFailure}
        className="job-item-detail-failure-button"
        type="button"
      >
        Retry
      </button>
    </div>
  )

  renderJobItemDetails = () => {
    const {jobDetailsApi} = this.state

    if (jobDetailsApi === jobItemDetailApi.failure) {
      return this.renderFailure()
    }

    return this.renderSuccess()
  }

  static renderLoader() {
    return (
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    )
  }

  render() {
    const {jobDetailsApi} = this.state
    return (
      <div className="job-item-detail-container">
        <Header />
        {jobDetailsApi === jobItemDetailApi.loader
          ? this.renderLoader()
          : this.renderJobItemDetails()}
      </div>
    )
  }
}

export default JobsItemDetails
