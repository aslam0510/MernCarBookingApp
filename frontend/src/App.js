import { BrowserRouter as Router, Switch, Route ,Redirect} from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css';
import CarBooking from './pages/CarBooking';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { useSelector } from 'react-redux';
import Spinner from './pages/Spinner';
import UserBooking from './pages/UserBooking';
import AddCar from './pages/AddCar';
import AdminHome from './pages/AdminHome';
import EditCar from './pages/EditCar';

function App() {
  const loading = useSelector(state => state.alertSlice.loading);

  return (
    <div className="App">
      {loading && <Spinner/>}
      <Router>
        <Switch>
          <ProtectedRoute path="/" exact component={Home} />
          <ProtectedRoute path="/booking/:carId" component={CarBooking} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/userbooking" component={UserBooking} />
          <Route path="/addCar" component={AddCar} />
          <Route path="/admin" component={AdminHome} />
          <Route path="/editCar/:carId" component={EditCar} />
          <Route path="*" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export const ProtectedRoute =(props) =>{
  if(localStorage.getItem('user')){
    return <Route {...props}/>
  }else{
    return <Redirect to="/login" />
  }
}
export default App;
