import React from 'react';
import './App.css';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';



const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends React.Component {
  constructor(){
    super();
    this.state = {locationList: [],
                 lat_current: 40.7128,
                 lon_current: -74.0060,
                 label: "Foo"};
  }
  componentDidMount(){
    navigator.geolocation.getCurrentPosition(this.showPosition)
  }

  showPosition = (position) => {
    this.setState({lat_current: position.coords.latitude,
      lon_current: position.coords.longitude});
  }

  getCafe = () => {
    axios.get(`https://www.mapquestapi.com/search/v4/place?location=-74.0060%2C%2040.7128&category=sic:581203&sort=distance&feedback=false&key=lGlBOoLScfztAssjwLIAxLliPAsGdPZL
`).then(res => {
      let locationList  = res.data.results
      this.setState({locationList
      });
    })
    this.setState({label: "Cafe"});
  }

  getBar = () => {
    axios.get(`https://www.mapquestapi.com/search/v4/place?location=-74.0060%2C%2040.7128&category=sic:581301&sort=distance&feedback=false&key=lGlBOoLScfztAssjwLIAxLliPAsGdPZL
`).then(res => {
      let locationList  = res.data.results
      this.setState({locationList
      });
    })
    this.setState({label: "Bar"});
  }

  
paint=()=>{
  if(this.state.locationList.length != [])
         {console.log(this.state.locationList[0].place.geometry.coordinates[0])
          console.log(this.state.locationList[0].place.geometry.coordinates[1])
        }
}



  render(){
    return(
      <div className="map" style={{width:"800px", height:"600px"}}>
       <button onClick={this.getCafe}>Cafe</button>
       <button onClick={this.getBar} >Bars</button>
       <GoogleMapReact 
       bootstrapURLKeys={{key: "AIzaSyBC8BJXxpNLpKWW3K0H8dU5tGRq58CHbJs", language: 'en'}}
       center={{lat:this.state.lat_current,lng:this.state.lon_current}}
       defaultZoom={15} >
         { Object.keys(this.state.locationList).map(key =>  {
           {console.log(this.state.locationList[key].place.geometry.coordinates[1])}
             return <AnyReactComponent  key={key} index={key} 
             lat={this.state.locationList[key].place.geometry.coordinates[1]}
             lng={this.state.locationList[key].place.geometry.coordinates[0]}
             text={this.state.label}
           />
          }
          )
          }
       </GoogleMapReact>
     </div>
    )
  }
}

function App() {
  return (
    <Map/>
  );
}

export default App;
