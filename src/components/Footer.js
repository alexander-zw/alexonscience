/**
 * The footer is displayed at the bottom of every page. It contains some
 * basic information and expands when the page content is not long enough.
 */
import '../styles/index.css';
import '../styles/Footer.css'

function Footer() {
    return (
        <footer className="text-div" id="footer-div">
            <div className="left-half">
                Alexander Wu
                <br/>
                Let there be light.
            </div>
            <div className="right-half">
                Contact me
            </div>
        </footer>
    )
}

export default Footer
