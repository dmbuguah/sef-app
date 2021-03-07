import 'date-fns';
import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types'

import {
    Map, Polyline, InfoWindow, Marker,
    GoogleApiWrapper} from 'google-maps-react';
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import {withRouter } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import axios from 'axios';
import { styles } from './styles'
import { state_params } from './state_params'
import { BodyContent } from './body_content'

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const facility_url = `https://api.sef.cislunar.co/v1/facility/facilities/search_facilities/`
  const facility_near_me_url = `https://api.sef.cislunar.co/v1/facility/facilities/facilities_near_me/`

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

function TabPanelVertical(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component='div'>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

TabPanelVertical.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

class SearchFacility extends Component {
  constructor(props) {
    super(props);

    this.state = state_params
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) =>{
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }

  componentDidMount(){
      let self = this;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {

          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          self.setState({
              own_position: pos,
              lat: pos.lat,
              lng: pos.lng
          },() => {
            axios.get(facility_near_me_url, {
                  params: {
                      ...self.state.own_position
                  },
                  headers: {
                    'Content-Type': 'application/json'
                  }
                }).then((response) => {
                    const facilities = response.data;

                    var facility_location = {...self.state.facility_location}
                    var keph_level = {...self.state.keph_level}
                    var facility_owner = {...self.state.facility_owner}
                    var facility_type = {...self.state.facility_type}

                    facility_location.analysis_data = facilities['facility_location']['analysis_data']
                    facility_location.title = facilities['facility_location']['title']

                    keph_level = facilities['keph_levels']
                    facility_owner = facilities['facility_owner']
                    facility_type = facilities['facility_type']

                    self.setState(
                        {
                            facility_location: facility_location,
                            keph_level: keph_level,
                            facility_owner: facility_owner,
                            facility_type: facility_type
                        })
                })
          })
        })
    }
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      facility_name: marker.fname,
      ftype: marker.ftype,
      fowner_name: marker.fowner_name,
      operation_status_name: marker.operation_status_name,
      fkeph_level: marker.fkeph_level,
      fcounty_name: marker.fcounty_name,
      lat: props.position.lat,
      lng: props.position.lng
    });
    this.calculateDistance(
        this.state.own_position, props.position, props.position)
  }

  calculateDistance = (source, des) => {
        const { google } = this.props;
        const DirectionsService = new google.maps.DirectionsService();
        DirectionsService.route({
            origin: new google.maps.LatLng(source.lat, source.lng),
            destination: new google.maps.LatLng(des.lat, des.lng),
            travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                this.setState({
                    distance: result.routes[0].legs[0].distance.text,
                    duration: result.routes[0].legs[0].duration.text,
                    route: result.routes[0].overview_path.map(p => {
                      return {lat:p.lat() , lng:p.lng()}})
                });
            }
            if (status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
              setTimeout(3000);
            }
            else {
                console.error(`error fetching directions ${result}`);
            }
        });
    }

  a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  searchFacility = () => {
    let self = this;
    self.state.route = '';
    axios.get(facility_url, {
          params: {
            'lat': self.state.own_position['lat'],
            'lng': self.state.own_position['lng'],
            'facility_type_value': self.state.facility_type_value,
            'keph_level_value': self.state.keph_level_value,
            'facility_owner_value': self.state.facility_owner_value,
            'radius': self.state.radius
          },
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {
            const facilities = response.data;
            var facility_location = {...self.state.facility_location}

            facility_location.analysis_data = facilities['facility_location']['analysis_data']
            facility_location.title = facilities['facility_location']['title']

            self.setState(
                {
                    facility_location: facility_location,
                })
        })
  }

  render() {
      const { classes } = this.props
      const style = {
        position: "relative",
        height: "500px"
      };
      const containerStyle = {
        position: "relative",
        width: '100%',
        height: '100%'
      };
      const { value } = this.state;

      const Markers = props => (
        this.state.facility_location.analysis_data.map((marker, index) =>
          <Marker
            {...props}
            key={index}
            id={marker.id}
            fname={marker.facility_name}
            ftype={marker.facility_type}
            fowner_name={marker.owner_name}
            operation_status_name={marker.operation_status_name}
            fkeph_level={marker.keph_level}
            fcounty_name={marker.county_name}
            onClick={this.onMarkerClick}
            position={{lat: marker.lat, lng: marker.lng}}
           />)
         );

      return (
        </BodyContent>
      )
  }
}

export default compose(
  withRouter,
  withStyles(styles),
  GoogleApiWrapper({apiKey: ('AIzaSyA_IzAR-eryh3_wh1iR3wfsGQoBMxi0HTo')})
) (SearchFacility)
