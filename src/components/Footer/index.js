import {VscGithubAlt} from 'react-icons/vsc'
import {FaTwitter} from 'react-icons/fa'
import {FiInstagram} from 'react-icons/fi'
import './index.css'

export default function Footer() {
  return (
    <div className="footer-container">
      <h1 className="header-covid-logo">COVID19INDIA</h1>

      <p className="footer-paragraph">
        we stand with everyone fighting on the front lines
      </p>
      <div className="footer-social-logo">
        <VscGithubAlt className="footer-logo" />
        <FiInstagram className="footer-logo" />
        <FaTwitter className="footer-logo" />
      </div>
    </div>
  )
}
