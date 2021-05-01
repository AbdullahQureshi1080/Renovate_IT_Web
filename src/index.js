import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import configureStore from './store/configureStore';
import App from './App';

const store = configureStore();


ReactDOM.render((
  <BrowserRouter>
     <Provider store = {store}>
    <App />
    </Provider> 
  </BrowserRouter>
), document.getElementById('root'));

serviceWorker.unregister();
