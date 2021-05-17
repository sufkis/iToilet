import './App.css';
import Signup from './components/signup';
import { AuthProvider } from "./contexts/Auth"
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import ListView from './components/listView';
import { useEffect, useState } from 'react';
import LocationService from './components/locationService';

const toiletIcon = 'https://pngtree.com/freepng/public-toilet-icon-cartoon_4478446.html'

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

// const myMockLocation = {lat: 32.06342, lng: 34.773181 }
function App() {

// useAuth to deconstruct: currentUser, googleSignIn, login, logout from useAuth() hook
  // currentUser is null if no one is logged in, and signup also logs you in.

  const [coords, setCoords] = useState({lat: 0, lng: 0})
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  function getPosition () {
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    } else {
    console.log("Sorry, Geolocation is not supported by this browser.");
    }
}

function showPosition (position) {
    let lat = position.coords.latitude 
    let lng = position.coords.longitude 
    
    setCoords({lat: lat, lng: lng});
    console.log(coords)
}



  const AppRouter = () => {

    return (
      <Router>
        <Switch>
          <Route exact path='/signup'>
            <Signup />
          </Route>
          <Route exact path='/'>
            <LocationService setCoords={setCoords} setCity={setCity} setCountry={setCountry} city={city} country={country} getPosition={getPosition} />
            <div>map at some point</div>
          </Route>
          <Route exact path='/list'>
            <ListView toilets={mockToilet} userLocation={coords} />
          </Route>
        </Switch>
      </Router>
    )
  }

  return (
    <>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
    </>
  );
}

export default App;
