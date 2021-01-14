import '../styles/MainPage.css';
import hello_there from '../images/hello-there.png';
import general_kenobi from '../images/general-kenobi.png';

function MainPage() {
    return (
        <div>
            <div className="title-div">
                <span className="title">Alexander Wu</span>
            </div>

            <div className="text-div">
                <p>Psst... check out my <a href="https://tinyurl.com/alexonscience">Youtube Channel</a>!</p>
            </div>

            <div id="kenobi-image">
                <img className="bottom" src={general_kenobi} alt="Hello there"/>
                <img className="top" src={hello_there} alt="General Kenobi"/>
            </div>
        </div>
    );
}

export default MainPage;
