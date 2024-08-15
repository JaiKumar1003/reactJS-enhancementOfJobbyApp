import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const apiProfileView = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class UserProfile extends Component {
  state = {
    profileView: apiProfileView.loading,
    userProfile: '',
  }

  componentDidMount() {
    this.getUserProfile()
  }

  getUserProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedDate = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileView: apiProfileView.success,
        userProfile: updatedDate,
      })
    } else {
      this.setState({profileView: apiProfileView.failure})
    }
  }

  renderApiProfileSuccessView = () => {
    const {userProfile} = this.state
    const {profileImageUrl, name, shortBio} = userProfile
    return (
      <div className="user-profile-bg">
        <img
          className="user-profile-logo"
          src={profileImageUrl}
          alt="profile"
        />
        <h1 className="user-profile-name">{name}</h1>
        <p className="user-profile-bio">{shortBio}</p>
      </div>
    )
  }

  onClickFailure = () => {
    this.setState({profileView: apiProfileView.loading}, this.getUserProfile)
  }

  renderApiProfileFailureView = () => (
    <div className="profile-failure-card">
      <button
        onClick={this.onClickFailure}
        className="profile-failure-button"
        type="button"
      >
        Retry
      </button>
    </div>
  )

  renderApiProfileView = () => {
    const {profileView} = this.state

    if (profileView === apiProfileView.failure) {
      return this.renderApiProfileFailureView()
    }
    return this.renderApiProfileSuccessView()
  }

  // eslint-disable-next-line class-methods-use-this
  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {profileView} = this.state
    return (
      <div className="profile-container">
        {profileView === apiProfileView.loading
          ? this.renderLoader()
          : this.renderApiProfileView()}
      </div>
    )
  }
}

export default UserProfile
