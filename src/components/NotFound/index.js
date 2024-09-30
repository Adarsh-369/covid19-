import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="NotFound-container">
      <img
        src="https://www.google.com/imgres?q=notfound%20covid%20cases&imgurl=https%3A%2F%2Fmedia.springernature.com%2Ffull%2Fspringer-static%2Fimage%2Fart%253A10.1038%252Fs41598-023-50317-8%2FMediaObjects%2F41598_2023_50317_Fig1_HTML.png&imgrefurl=https%3A%2F%2Fwww.nature.com%2Farticles%2Fs41598-023-50317-8&docid=hIAa5ZTj4IrrDM&tbnid=aD-Jg2jVgkoKIM&vet=12ahUKEwikjN_XgNiIAxWcRmcHHdByECQQM3oECBMQAA..i&w=1984&h=1257&hcb=2&ved=2ahUKEwikjN_XgNiIAxWcRmcHHdByECQQM3oECBMQAA"
        alt="not-found-pic"
      />
      <h1 className="NotFound-heading">PAGE NOT FOUND</h1>
      <p className="NotFound-paragraph">
        we are sorry, the page you requested could not be found
      </p>
      <div>
        <Link to="/">
          <button type="button" className="NotFound-button">
            Home
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default NotFound
