import Middle from './InnerComponent/middle.jsx';
import Header from './InnerComponent/header.jsx';
import Footer from './InnerComponent/footer.jsx';

import './index.css';

/**
* @description Main application component
* @param None
* @return Application component
*/

function App() {
  return (
    <div className="App">
      <Header />
      <Middle />
      <Footer />
    </div>
  );
}

export default App;
