import {Component} from 'react'
import './index.css'

class StateCards extends Component {
  state = {
    confirmedCard: {},
    recoveredCard: {},
    deceasedCard: {},
    activeCard: {},
  }

  componentDidMount() {
    this.totalDistrict()
  }

  totalDistrict = async () => {
    const {totalStateCards} = this.props
    const districtConfirmed = totalStateCards.confirmed
    const districtRecovered = totalStateCards.recovered
    const districtDeceased = totalStateCards.deceased
    const districtActive =
      districtConfirmed - districtRecovered - districtDeceased

    const confirmedCard = {
      name: 'Confirmed',
      logo: 'https://www.google.com/imgres?q=confirmed%20covid%20cases%20districtwise&imgurl=https%3A%2F%2Fwww.researchgate.net%2Fpublication%2F356573727%2Ffigure%2Ffig1%2FAS%3A1097575939743744%401638693904022%2Fa-State-wise-distribution-of-confirmed-COVID-19-cases-as-of-31-August-2020-and-b.jpg&imgrefurl=https%3A%2F%2Fwww.researchgate.net%2Ffigure%2Fa-State-wise-distribution-of-confirmed-COVID-19-cases-as-of-31-August-2020-and-b_fig1_356573727&docid=-Sjbi3MlDlte3M&tbnid=63UJVApyBFXtBM&vet=12ahUKEwjH_P3vsNiIAxVaSGwGHc5IL6YQM3oECBYQAA..i&w=850&h=1202&hcb=2&ved=2ahUKEwjH_P3vsNiIAxVaSGwGHc5IL6YQM3oECBYQAA',
      value: districtConfirmed,
    }

    const activeCard = {
      name: 'Active',
      logo: 'https://www.google.com/imgres?q=active%20covid%20cases%20districtwise&imgurl=https%3A%2F%2Fmedia.assettype.com%2FTNIE%252Fimport%252Fuploads%252Fuser%252Fckeditor_images%252Farticle%252F2020%252F12%252F3%252FActive.JPG&imgrefurl=https%3A%2F%2Fwww.newindianexpress.com%2Fstates%2Fandhra-pradesh%2F2020%2FDec%2F03%2Factive-covid-19-cases-in-11-districts-of-andhra-pradeshunder-900-toll-touches-7000-2231246.html&docid=FGnlGCGmGZLIRM&tbnid=MF0l8StMTsJxIM&vet=12ahUKEwilk-uBstiIAxXLSmwGHQFmDhcQM3oECBcQAA..i&w=252&h=526&hcb=2&ved=2ahUKEwilk-uBstiIAxXLSmwGHQFmDhcQM3oECBcQAA',
      value: districtActive,
    }

    const recoveredCard = {
      name: 'Recovered',
      logo: 'https://www.google.com/imgres?q=recovered%20covid%20cases%20&imgurl=https%3A%2F%2Fstatic.pib.gov.in%2FWriteReadData%2Fuserfiles%2Fimage%2Fimage002BLMG.jpg&imgrefurl=https%3A%2F%2Fpib.gov.in%2Fnewsite%2FPrintRelease.aspx%3Frelid%3D214444&docid=Ivw8XbjUGzK8RM&tbnid=tpg7ZiRgt9kfRM&vet=12ahUKEwjs1Ki8stiIAxWDSWwGHdDmBiIQM3oECBIQAA..i&w=625&h=351&hcb=2&itg=1&ved=2ahUKEwjs1Ki8stiIAxWDSWwGHdDmBiIQM3oECBIQAA',
      value: districtRecovered,
    }

    const deceasedCard = {
      name: 'Deceased',
      logo: 'https://www.google.com/imgres?q=deceased%20covid%20cases&imgurl=https%3A%2F%2Fwww.aamc.org%2Fsites%2Fdefault%2Ffiles%2FCOVID19Deaths-1200x666.jpg&imgrefurl=https%3A%2F%2Fwww.aamc.org%2Fnews%2Fhow-are-covid-19-deaths-counted-it-s-complicated&docid=_i5vGazmIu4ePM&tbnid=GNI6O6RrkdcWVM&vet=12ahUKEwjOt9rSstiIAxVYUGcHHazPCQ8QM3oECEcQAA..i&w=1200&h=666&hcb=2&ved=2ahUKEwjOt9rSstiIAxVYUGcHHazPCQ8QM3oECEcQAA',
      value: districtDeceased,
    }

    this.setState({
      confirmedCard,
      activeCard,
      recoveredCard,
      deceasedCard,
    })
  }

  cardClick = value => {
    const {stateListCards} = this.props
    stateListCards(value)
  }

  render() {
    const {confirmedCard, activeCard, recoveredCard, deceasedCard} = this.state

    const {isStateCard} = this.props
    const isDistrictCard = isStateCard ? 'background-color' : ''

    return (
      <>
        <ul className="stateCards-container">
          <li
            className={`StateCard-background ${confirmedCard.name} ${isDistrictCard}`}
            tabIndex="-1"
            key={confirmedCard.name}
            value={confirmedCard.name}
            onClick={() => this.cardClick(confirmedCard.name)}
          >
            <div testid="stateSpecificConfirmedCasesContainer">
              <p className="home-paragraph-heading">{confirmedCard.name}</p>
              <img
                src={confirmedCard.logo}
                alt="state specific confirmed cases pic"
                className="home-cards-logo"
              />
              <p className="home-paragraph-heading">{confirmedCard.value}</p>
            </div>
          </li>
          <li
            className={`StateCard-background ${activeCard.name}`}
            tabIndex="-1"
            key={activeCard.name}
            value={activeCard.name}
            onClick={() => this.cardClick(activeCard.name)}
          >
            <div testid="stateSpecificActiveCasesContainer">
              <p className="home-paragraph-heading">{activeCard.name}</p>
              <img
                src={activeCard.logo}
                alt="state specific active cases pic"
                className="home-cards-logo"
              />
              <p className="home-paragraph-heading">{activeCard.value}</p>
            </div>
          </li>

          <li
            className={`StateCard-background ${recoveredCard.name}`}
            tabIndex="-1"
            key={recoveredCard.name}
            value={recoveredCard.name}
            onClick={() => this.cardClick(recoveredCard.name)}
          >
            <div testid="stateSpecificRecoveredCasesContainer">
              <p className="home-paragraph-heading">{recoveredCard.name}</p>
              <img
                src={recoveredCard.logo}
                alt="state specific recovered cases pic"
                className="home-cards-logo"
              />
              <p className="home-paragraph-heading green">
                {recoveredCard.value}
              </p>
            </div>
          </li>
          <li
            className={`StateCard-background ${deceasedCard.name}`}
            tabIndex="-1"
            key={deceasedCard.name}
            value={deceasedCard.name}
            onClick={() => this.cardClick(deceasedCard.name)}
          >
            <div testid="stateSpecificDeceasedCasesContainer">
              <p className="home-paragraph-heading">Deceased</p>
              <img
                src={deceasedCard.logo}
                alt="state specific deceased cases pic"
                className="home-cards-logo"
              />
              <p className="home-paragraph-heading">{deceasedCard.value}</p>
            </div>
          </li>
        </ul>
      </>
    )
  }
}

export default StateCards
