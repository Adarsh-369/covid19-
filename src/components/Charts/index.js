import {Component} from 'react'
import {
  BarChart,
  Bar,
  Tooltip,
  Legend,
  XAxis,
  LineChart,
  Line,
  YAxis,
} from 'recharts'
import Loader from 'react-loader-spinner'
import './index.css'

class Charts extends Component {
  state = {
    chartsList: '',
    chartsOther: '',
    isLoading: true,
  }

  componentDidMount() {
    this.chartsData()
  }

  chartsData = async () => {
    const apiUrl = 'https://apis.ccbp.in/covid19-timelines-data'
    const options = {
      method: 'GET',
    }
    const {districtCode} = this.props
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()

      const dataObject = Object.keys(data[districtCode].dates)
      const dataState = dataObject.map(eachDate => ({
        eachDate,
        confirmed: data[districtCode].dates[eachDate].total.confirmed,
        recovered: data[districtCode].dates[eachDate].total.recovered,
        deceased: data[districtCode].dates[eachDate].total.deceased,
        tested: data[districtCode].dates[eachDate].total.tested,
        active:
          data[districtCode].dates[eachDate].total.confirmed -
          (data[districtCode].dates[eachDate].total.deceased +
            data[districtCode].dates[eachDate].total.recovered),
      }))

      const dataCharts = dataObject.map(eachDate => ({
        eachDate,
        confirmed: data[districtCode].dates[eachDate].total.confirmed,
        recovered: data[districtCode].dates[eachDate].total.recovered,
        deceased: data[districtCode].dates[eachDate].total.deceased,
        tested: data[districtCode].dates[eachDate].total.tested,
        active:
          data[districtCode].dates[eachDate].total.confirmed -
          (data[districtCode].dates[eachDate].total.deceased +
            data[districtCode].dates[eachDate].total.recovered),
      }))

      this.setState({
        chartsList: dataState,
        chartsOther: dataCharts,
        isLoading: false,
      })
    }
  }

  graphList = (caseList, color) => {
    const {chartsOther} = this.state
    return (
      <div>
        <LineChart
          width={900}
          height={250}
          data={chartsOther}
          margin={{top: 5, right: 50, left: 20, bottom: 5}}
        >
          <XAxis
            dataKey="date"
            style={{
              fontFamily: 'Roboto',
              fontWeight: 500,
              textTransform: 'uppercase',
            }}
            dy={10}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={caseList} stroke={color} />
        </LineChart>
      </div>
    )
  }

  graphCharts = () => (
    <div>
      <h1 className="Charts-graph-heading">Spread Trends</h1>
      <div testid="lineChartsContainer" className="lineChart-graph">
        <div className="charts-graph-list-margin charts-graph-red">
          {this.graphList('confirmed', '#FF073A')}
        </div>
        <div className="charts-graph-list-margin charts-graph-blue">
          {this.graphList('active', '#007BFF')}
        </div>
        <div className="charts-graph-list-margin charts-graph-green">
          {this.graphList('recovered', '#27A243')}
        </div>
        <div className="charts-graph-list-margin charts-graph-gray">
          {this.graphList('deceased', '#6c757D')}
        </div>
        <div className="charts-graph-list-margin charts-graph-vi">
          {this.graphList('tested', '#967389')}
        </div>
      </div>
    </div>
  )

  render() {
    const {chartsList, isLoading} = this.state
    const {districtsChart} = this.props
    const barChart = districtsChart.toLowerCase()
    const maxBarChart = chartsList.slice(Math.max(chartsList.length - 10, 0))
    console.log('this is bar charts', maxBarChart)

    let barColor = '#9A0E31'
    if (barChart === 'confirmed') {
      barColor = '#9A0E31'
    } else if (barChart === 'active') {
      barColor = '#0A4FA0'
    } else if (barChart === 'recovered') {
      barColor = '#216837'
    } else if (barChart === 'deceased') {
      barColor = '#474c57'
    }

    return (
      <>
        {isLoading ? (
          <div className="loading-class" testid="timelinesDataLoader">
            <Loader type="Oval" color="#007BFF" height={50} width={50} />
          </div>
        ) : (
          <div className="Charts-container">
            <div className="Charts-BarChart">
              <BarChart
                width={700}
                height={400}
                data={maxBarChart}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
                barSize={40}
              >
                <XAxis
                  datakey="date"
                  stroke={`${barColor}`}
                  style={{
                    fontFamily: 'Roboto',
                    fontWeight: 500,
                    textTransform: 'upperCase',
                  }}
                  dy={10}
                />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey={`${barChart}`}
                  fill={`${barColor}`}
                  label={{position: 'top', fill: `${barColor}`}}
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </div>
            <div className="Charts-paragraph">{this.graphCharts()}</div>
          </div>
        )}
      </>
    )
  }
}

export default Charts
