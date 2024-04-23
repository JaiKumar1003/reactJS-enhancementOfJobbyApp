import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Header from '../Header'
import UserProfile from '../UserProfile'
import JobsList from '../JobsList'

import './index.css'

const apiJobsList = {
  loader: 'LOADER',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    jobsApiView: apiJobsList.loader,
    seachInput: '',
    employmentType: '',
    salaryRange: '',
  }

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    const {employmentType, salaryRange, seachInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${salaryRange}&search=${seachInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const {jobs} = data
      const updatedJobs = jobs.map(eachJob => ({
        id: eachJob.id,
        title: eachJob.title,
        location: eachJob.location,
        rating: eachJob.rating,
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
        packagePerAnnum: eachJob.package_per_annum,
      }))
      this.setState({jobsList: updatedJobs, jobsApiView: apiJobsList.success})
    } else {
      this.setState({jobsList: [], jobsApiView: apiJobsList.failure})
    }
  }

  onChangeSalaryRange = event => {
    this.setState(
      {salaryRange: event.target.id, jobsApiView: apiJobsList.loader},
      this.getJobsList,
    )
  }

  renderSalaryRange = () => {
    const {salaryRanges} = this.props
    return (
      <div className="salary-range-card">
        <form className="salary-form">
          <h1 className="salary-form-heading">Salary Range</h1>
          <ul className="salary-list">
            {salaryRanges.map(eachType => {
              const {label, salaryRangeId} = eachType
              return (
                <li className="salary-radio-card" key={salaryRangeId}>
                  <input
                    onChange={this.onChangeSalaryRange}
                    name="salaryRange"
                    type="radio"
                    className="salary-radio"
                    id={salaryRangeId}
                  />
                  <label className="salary-radio-label" htmlFor={salaryRangeId}>
                    {label}
                  </label>
                </li>
              )
            })}
          </ul>
        </form>
      </div>
    )
  }

  onChangeEmployType = event => {
    const {employmentType} = this.state
    const {id, checked} = event.target

    let updatedEmploymentType = ''

    if (checked) {
      updatedEmploymentType = employmentType ? `${employmentType},${id}` : id
    } else {
      updatedEmploymentType = employmentType
        .split(',')
        .filter(typeId => typeId !== id)
        .join(',')
    }
    this.setState(
      {employmentType: updatedEmploymentType, jobsApiView: apiJobsList.loader},
      this.getJobsList,
    )
  }

  renderTypesOfEmployment = () => {
    const {employmentTypes} = this.props

    return (
      <div className="employment-input-card">
        <h1 className="employment-heading">Type of Employment</h1>
        <ul className="employment-list">
          {employmentTypes.map(eachSalaryRange => {
            const {label, employmentTypeId} = eachSalaryRange

            return (
              <li className="employment-checkbox-card" key={employmentTypeId}>
                <input
                  onChange={this.onChangeEmployType}
                  className="employment-checkbox"
                  id={employmentTypeId}
                  type="checkbox"
                />
                <label
                  className="employment-checkbox-label"
                  htmlFor={employmentTypeId}
                >
                  {label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickSearchIcon = () => {
    this.setState({jobsApiView: apiJobsList.loader}, this.getJobsList)
  }

  onKeyDownSearch = event => {
    if (event.key === 'Enter') {
      this.setState({jobsApiView: apiJobsList.loader}, this.getJobsList)
    }
  }

  onChangeSearch = event => {
    this.setState({seachInput: event.target.value})
  }

  onClickFailureBtn = () => {
    this.setState({jobsApiView: apiJobsList.loader}, this.getJobsList)
  }

  render() {
    const {jobsApiView, jobsList} = this.state

    return (
      <div className="jobs-container">
        <Header />
        <div className="jobs-body-card">
          <div className="jobs-employment-salary-container">
            <div className="jobs-search-card search-input-sm">
              <input
                onKeyDown={this.onKeyDownSearch}
                onChange={this.onChangeSearch}
                className="jobs-search-input"
                type="search"
                placeholder="Search"
              />
              <button
                onClick={this.onClickSearchIcon}
                className="jobs-search-icon-button"
                type="button"
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <UserProfile />
            <hr className="horizontal-lines" />
            {this.renderTypesOfEmployment()}
            <hr className="horizontal-lines" />
            {this.renderSalaryRange()}
          </div>
          <div className="jobs-list-container">
            <div className="jobs-search-card search-input-lg">
              <input
                onKeyDown={this.onKeyDownSearch}
                onChange={this.onChangeSearch}
                className="jobs-search-input"
                type="search"
                placeholder="Search"
              />
              <button
                onClick={this.onClickSearchIcon}
                className="jobs-search-icon-button"
                type="button"
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <JobsList
              jobsList={jobsList}
              onClickFailureJobs={this.onClickFailureBtn}
              jobsApiView={jobsApiView}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
