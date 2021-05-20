import './App.css';
import { useAuth } from "./contexts/Auth"
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import ListView from './components/listView';
import LocationService from './components/locationService';
import Navigation from './components/navbar';
import Map from './Map';
import PrivateRoute from './components/privateRoute';
import Welcome from './components/welcome'
import AddOrEditToilet from './components/addOrEditToilet';
import Review from './components/review';
import Profile from './components/profile';
import toiletIcon from './toilet.png'
import { useState } from 'react';


const mockToilet = [
  {id: '123', lat: 32.081902599570284, lng: 34.78146508564525, text: "Ibn Gvirol 69", href: {toiletIcon}, isPublic: true},
  {id: '5342', lat: 32.069861139032405, lng: 34.771061427974495, text: "Kikar magen David", href: {toiletIcon}, isPublic: true},
  {id: 'k1j2h3r', lat: 32.08498129236291, lng: 34.78301725127104, text: "Lotte Reich Community Center", href: {toiletIcon}, isPublic: true},
  {id: '123432', lat: 32.079500727881204, lng: 34.773777057720466, text: "Passageway Dizingoff & Frishman", href: {toiletIcon}, isPublic: true},
  {id: 'fi4ughf', lat: 32.066856524717885, lng: 34.768301693600314, text: "Beit Tami Community Center", href: {toiletIcon}, isPublic: true},
  {id: 'rbjkm43hnrbf', lat: 32.07763255283553, lng: 34.7788800582799, text: "Nam Restaurant", href: {toiletIcon}, isPublic: false},
  {id: 'r43nhbtf', lat: 32.061972973398, lng: 34.77088098627881, text: "Herzl 16", href: {toiletIcon}, isPublic: false},
  {id: 'z1mn4fr', lat: 32.056336509619854, lng: 34.768404369301386, text: "Anita florentine", href: {toiletIcon}, isPublic: false},
  {id: 'jkrh23f', lat: 32.053360328714675, lng: 34.75639650165063, text: "Shaffa Bar" ,href: {toiletIcon}, isPublic: false},
]

function App() {

  const { currentUser } = useAuth();


  const [toilets, setToilets] = useState([]);

  return (
    <>
      <Router>
        <Navigation />
        <Switch>
          <Route exact path='/'>
            {currentUser && <Redirect to='/main' />}
            {!currentUser && <Welcome /> }
          </Route>
          <PrivateRoute exact path='/main'>
            <LocationService />
          </PrivateRoute>
          <PrivateRoute exact path='/map'>
            <Map toilets={toilets} setToilets={setToilets}/>
          </PrivateRoute>
          <PrivateRoute exact path='/list'>
            <ListView toilets={toilets} setToilets={setToilets}/>
          </PrivateRoute>
          <PrivateRoute exact path='/review'>
            <Review />
          </PrivateRoute>
          <PrivateRoute exact path='/profile'>
            <Profile />
          </PrivateRoute>
          <PrivateRoute exact path='/addToilet'>
            <AddOrEditToilet />
          </PrivateRoute>
        </Switch>
      </Router>
    </>
  );
}

export default App;
