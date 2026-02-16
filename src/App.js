import BannerCardItem from './components/BannerCardItem'

import './App.css'

const bannerCardsList = [
  {
    id: 1,
    headerText: 'The Seasons Latest',
    description: 'Get the seasons all latest designs in a flick of your hand',
    className: 'card-1',
  },
  {
    id: 2,
    headerText: 'Our New Designs',
    description:
      'Get the designs developed by our in-house team all for yourself',
    className: 'card-2',
  },
  {
    id: 3,
    headerText: 'Insiders',
    description: 'Get the top class products for yourself with an extra off',
    className: 'card-3',
  },
]

const App = () => (
  <div className="app-container">
    <ul className="banner-cards-list">
      {bannerCardsList.map(eachBanner => (
        <BannerCardItem bannerDetails={eachBanner} key={eachBanner.id} />
      ))}
    </ul>
  </div>
)
export default App

import './App.css'
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import {Link} from 'react-router-dom'

const apiStatus = {loading: 'Loading', failure: 'Failure', success: 'Success'}

class App extends Component {
  state = {status: apiStatus.loading, itemsArray: []}

  componentDidMount = () => {
    this.renderData()
  }

  renderData = async () => {
    const url = 'https://apis.ccbp.in/te/courses'
    const options = {method: 'GET'}
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      this.setState({itemsArray: data.courses, status: apiStatus.success})
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  renderLoading = () => {
    console.log()
    return (
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="black" height="50" width="50" />
      </div>
    )
  }

  renderFailure = () => {
    console.log()
    return (
      <div>
        <h1>Ooops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for.</p>
        <button type="button" onClick={this.renderData()}>
          Retry
        </button>
      </div>
    )
  }

  renderSuccess = () => {
    const {itemsArray} = this.state
    return (
      <div>
        <h1>Courses</h1>
        <ul>
          {itemsArray.map(eachItem => (
            <Link className="link" to={`${eachItem.id}`}>
              {' '}
              <li key={eachItem.id}>
                <img src={eachItem.logo_url} alt={eachItem.name} />
                <p>{eachItem.name} </p>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {status} = this.state
    const renderBasedOnStatus = () => {
      switch (status) {
        case apiStatus.loading:
          return this.renderLoading()
        case apiStatus.failure:
          return this.renderFailure()
        case apiStatus.success:
          return this.renderSuccess()
        default:
          return null
      }
    }
    return (
      <div>
        <div className="cardNavbar">
          {' '}
          <Link className="link" to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
              alt=" website logo"
            />
          </Link>
        </div>
        {renderBasedOnStatus()}
      </div>
    )
  }
}

export default App
import './App.css'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

const apiStatus = {loading: 'Loading', failure: 'Failure', success: 'Success'}

class ItemDetails extends Component {
  state = {item: [], status: apiStatus.loading}

  componentDidMount = () => {
    this.renderData()
  }

  renderData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const options = {method: 'GET'}
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      this.setState({item: data.course_details, status: apiStatus.success})
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  renderNav = () => (
    <div className="cardNavbar">
      <Link className="link" to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
          alt=" website logo"
        />
      </Link>
    </div>
  )

  renderLoading = () => {
    console.log()
    return (
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="black" height="50" width="50" />
      </div>
    )
  }

  render() {
    const {item, status} = this.state
    return (
      <div>
        {this.renderNav()}
        {apiStatus.loading === status ? (
          this.renderLoading()
        ) : (
          <div className="itemCard">
            <img className="imgItem" src={item.image_url} alt={item.name} />
            <div>
              {' '}
              <h1>{item.name} </h1>
              <p>{item.description} </p>
            </div>
          </div>
        )}{' '}
      </div>
    )
  }
}

export default ItemDetails
li {
  list-style-type: none;
  width: 20vw;
  display: flex;
  justify-content: center;
  margin: 20px;
}
.link {
  text-decoration: none;
  color: black;
}
.imgItem {
  height: 70vh;
  width: 50vw;
}
.itemCard {
  margin-left: 190px;
  display: flex;
  padding: 10px;
  justify-content: center;
  width: 70vw;
  margin-top: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
.cardNavbar {
  background-color: #e8e8e8;
  padding: 10px;
}
ul {
  display: flex;
  flex-wrap: wrap;
}
img {
  height: 8vh;
  width: 7vw;
  margin-right: 20px;
}
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

