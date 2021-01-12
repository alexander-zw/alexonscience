import DocumentMeta from 'react-document-meta';
import './App.css';
import hello_there from './images/hello-there.png';
import general_kenobi from './images/general-kenobi.png';

const meta = {
    title: 'ALEX on Science',
    description: 'The official ALEX on Science website',
    canonical: 'https://alexonscience.com',
    image: hello_there,
    meta: {
        charset: 'utf-8',
        name: {
            keywords: 'alex,alexander,wu,science,youtube'
        }
    }
}

function App() {
    return (
        <div>
            <DocumentMeta {...meta} />

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

export default App;
