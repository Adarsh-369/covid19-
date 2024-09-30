import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import ListOfState from '../ListOfState'
import SearchState from '../SearchState'

import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharastra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

class HomeRoute extends Component {
  state = {
    isLoading: true,
    searchInput: '',
    listOfSearchState: [],
    listOfCovidStates: [],
    totalConfirmed: 0,
    totalRecovered: 0,
    totalDeceased: 0,
    totalActive: 0,
  }

  componentDidMount() {
    this.listOfCovidIndia()
  }

  listOfCovidIndia = async () => {
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      let confirmedCase = 0
      let recoveredCase = 0
      let deceasedCase = 0
      let activeCase = 0

      statesList.forEach(stateCode => {
        if (data[stateCode.state_code]) {
          const {total} = data[stateCode.state_code]
          confirmedCase += total.confirmed ? total.confirmed : 0
          recoveredCase += total.recovered ? total.recovered : 0
          deceasedCase += total.deceased ? total.deceased : 0
        }
      })
      activeCase += confirmedCase - (recoveredCase + deceasedCase)

      const listOfCovidTableStates = statesList.map(eachItem => ({
        stateName: eachItem.state_name,
        stateCode: eachItem.state_code,
        listOfConfirmed: Object.keys(data)
          .filter(stateItem => stateItem === eachItem.state_code)
          .map(each => data[each].total.confirmed),
        listOfRecovered: Object.keys(data)
          .filter(stateItem => stateItem === eachItem.state_code)
          .map(each => data[each].total.recovered),
        listOfDeceased: Object.keys(data)
          .filter(stateItem => stateItem === eachItem.state_code)
          .map(each => data[each].total.deceased),
        listOfOther: Object.keys(data)
          .filter(stateItem => stateItem === eachItem.state_code)
          .map(each => data[each].total.other),
        listOfPopulation: Object.keys(data)
          .filter(stateItem => stateItem === eachItem.state_code)
          .map(each => data[each].meta.population),
      }))
      this.setState({
        totalConfirmed: confirmedCase,
        totalRecovered: recoveredCase,
        totalDeceased: deceasedCase,
        totalActive: activeCase,
        isLoading: false,
        listOfCovidStates: listOfCovidTableStates,
      })
    }
  }

  searchInputList = event => {
    const search = event.target.value
    const searchList = statesList.filter(eachItem =>
      eachItem.state_code.toLowerCase().includes(search.toLowerCase()),
    )

    return this.setState({
      searchInput: event.target.value,
      listOfSearchState: searchList,
    })
  }

  loadingFalse = () => {
    this.setState({isLoading: false})
  }

  searchInputRemove = () => {
    this.setState({listOfSearchState: []})
  }

  ascSortClicked = () => {
    const {listOfCovidStates} = this.state
    const sort = listOfCovidStates.sort((sortA, sortB) => {
      const a = sortA.stateName.toUpperCase()
      const b = sortB.stateName.toUpperCase()
      return a > b ? 1 : -1
    })
    this.setState({listOfCovidStates: sort})
  }

  decSortClicked = () => {
    const {listOfCovidStates} = this.state
    const sort = listOfCovidStates.sort((sortA, sortB) => {
      const a = sortA.stateName.toUpperCase()
      const b = sortB.stateName.toUpperCase()
      return a < b ? 1 : -1
    })
    this.setState({listOfCovidStates: sort})
  }

  listOfStateTable = () => {
    const {listOfCovidStates} = this.state

    return (
      <div className="list-of-state-tables" testid="stateWiseCovidDataTable">
        <div className="table-heading-row">
          <div className="states-heading">
            <p className="home-table-state-paragraph">States/UT</p>
            <button
              className="homeRoute-button-sort"
              type="button"
              onClick={this.ascSortClicked}
              testid="ascendingSort"
            >
              <FcGenericSortingAsc className="sort-logo-class" />
            </button>
            <button
              className="homeRoute-button-sort"
              type="button"
              onClick={this.decSortClicked}
              testid="descendingSort"
            >
              <FcGenericSortingDesc className="sort-logo-class" />
            </button>
          </div>
          <p className="home-table-state-confirmed">Confirmed</p>
          <p className="home-table-state-active">Active</p>
          <p className="home-table-state-recovered">Recovered</p>
          <p className="home-table-state-deceased">Deceased</p>
          <p className="home-table-state-population">Population</p>
        </div>

        <ul className="state-ul-class">
          {listOfCovidStates.map(eachItem => (
            <ListOfState key={eachItem.stateCode} stateList={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  listOfSearch = () => {
    const {listOfSearchState} = this.state

    return (
      <ul testid="searchResultsUnorderedList" className="search-ul-class">
        {listOfSearchState.map(eachItem => (
          <SearchState
            stateName={eachItem.state_name}
            stateCode={eachItem.state_code}
            key={eachItem.state_code}
            id={eachItem.state_code}
          />
        ))}
      </ul>
    )
  }

  listOfCovidCards = () => {
    const {totalConfirmed, totalDeceased, totalRecovered, totalActive} =
      this.state

    return (
      <>
        <div className="card-container-row">
          <div className="card-list" testid="countryWideConfirmedCases">
            <p className="home-paragraph-heading red">Confirmed</p>
            <img
              src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.researchgate.net%2Ffigure%2FCountries-with-confirmed-COVID-19-Cases-A-World-Health-Organization-global-map-4_fig1_339975193&psig=AOvVaw07TanJzHyjK_IgqvJMbudF&ust=1727189158355000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPi3yJOn2YgDFQAAAAAdAAAAABAK"
              alt="country wide confirmed cases pic"
              className="home-cards-logo"
            />
            <p className="home-paragraph-heading red">{totalConfirmed}</p>
          </div>
          <div className="card-list" testid="countryWideActiveCases">
            <p className="home-paragraph-heading blue">Active</p>
            <img
              src="https://www.google.com/imgres?q=countrywide%20active%20cases%20pic&imgurl=https%3A%2F%2Fstatic.pib.gov.in%2FWriteReadData%2Fuserfiles%2Fimage%2Fimage004KINS.jpg&imgrefurl=https%3A%2F%2Fpib.gov.in%2FPressReleasePage.aspx%3FPRID%3D1696087&docid=0oxRBSfs4vdHkM&tbnid=YcKXlsVK0oHgnM&vet=12ahUKEwicvfuFudmIAxVncGwGHWa4EcEQM3oECGMQAA..i&w=625&h=351&hcb=2&ved=2ahUKEwicvfuFudmIAxVncGwGHWa4EcEQM3oECGMQAA"
              alt="country wide active cases pic"
              className="home-cards-logo"
            />
            <p className="home-paragraph-heading blue">{totalActive}</p>
          </div>
          <div className="card-list" testid="countryWideRecoveredCases">
            <p className="home-paragraph-heading green">Recovered</p>
            <img
              src="https://www.google.com/imgres?q=countrywide%20recovered%20cases%20pic&imgurl=https%3A%2F%2Fstatic.pib.gov.in%2FWriteReadData%2Fuserfiles%2Fimage%2Fimage001BE2V.jpg&imgrefurl=https%3A%2F%2Fpib.gov.in%2FPressReleasePage.aspx%3FPRID%3D1692596&docid=PsO34vRHHUhhLM&tbnid=Hf0jTenTrhR4dM&vet=12ahUKEwiH2p-wudmIAxUmcWwGHVg9KToQM3oECBYQAA..i&w=625&h=351&hcb=2&ved=2ahUKEwiH2p-wudmIAxUmcWwGHVg9KToQM3oECBYQAA"
              alt="country wide recovered cases pic"
              className="home-cards-logo"
            />
            <p className="home-paragraph-heading green">{totalRecovered}</p>
          </div>
          <div className="card-list" testid="countryWideDeceasedCases">
            <p className="home-paragraph-heading gray">Deceased</p>
            <img
              src="https://www.google.com/imgres?q=countrywide%20deceased%20cases%20pic&imgurl=https%3A%2F%2Fwww.indiaspend.com%2Fh-upload%2F2021%2F06%2F28%2F1600x960_501197-covid-19-spike-in-deaths.jpg&imgrefurl=https%3A%2F%2Fwww.indiaspend.com%2Fcovid-19%2Fcovid-19-second-wave-deaths-data-variants-comorbidity-757997&docid=esP4I5hHLZs2PM&tbnid=gtj5a3Og05XahM&vet=12ahUKEwiqi8PZudmIAxVAUGcHHQROKKoQM3oECEoQAA..i&w=1600&h=900&hcb=2&ved=2ahUKEwiqi8PZudmIAxVAUGcHHQROKKoQM3oECEoQAA"
              alt="country wide deceased cases pic"
              className="home-cards-logo"
            />
            <p className="home-paragraph-heading gray">{totalDeceased}</p>
          </div>
        </div>
      </>
    )
  }

  render() {
    const {isLoading, listOfSearchState, searchInput} = this.state
    const searchResult =
      listOfSearchState.length === 0 ? '' : this.listOfSearch()
    return (
      <div className="covid-home-container">
        {isLoading ? (
          <div className="loading-class" testid="homeRouteLoader">
            <Loader type="Oval" color="#007BFF" height={50} width={50} />
          </div>
        ) : (
          <>
            <div className="home-search">
              <div className="home-search-container">
                {this.loadingFalse}
                <BsSearch className="search-icon" testid="searchIcon" />
                <input
                  type="search"
                  className="search-input"
                  placeholder="Enter the State"
                  onChange={this.searchInputList}
                  onAbort={this.searchInputRemove}
                />
              </div>
              {searchInput.length > 0 ? searchResult : ''}
            </div>

            {this.listOfCovidCards()}
            {this.listOfStateTable()}
          </>
        )}
      </div>
    )
  }
}

export default HomeRoute
