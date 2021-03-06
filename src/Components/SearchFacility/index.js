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
import MessageIcon from '@material-ui/icons/Message';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
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

import axios from 'axios';
import { styles } from './styles'
import { state_params } from './state_params'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

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
            axios.get(
                `http://127.0.0.1:8000/v1/facility/facilities/facilities_near_me/`, {
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

                    facility_location.analysis_data = facilities['facility_location']['analysis_data']
                    facility_location.title = facilities['facility_location']['title']

                    keph_level = facilities['keph_levels']
                    facility_owner = facilities['facility_owner']

                    self.setState(
                        {
                            facility_location: facility_location,
                            keph_level: keph_level,
                            facility_owner: facility_owner
                        })
                })
          })
        })
    }
  }

  onMarkerClick = (props, marker, e) => {
    console.log(props)
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      facility_name: marker.fname,
      ftype: marker.ftype,
      fowner_name: marker.fowner_name,
      operation_status_name: marker.operation_status_name,
      fkeph_level: marker.keph_level,
      fcounty_name: marker.county_name,
      lat: props.position.lat,
      lng: props.position.lng
    });
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
                    route: result.routes[0].overview_path.map(p => {
                      return {lat:p.lat() , lng:p.lng()}})
                });
            }
            if (status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
              setTimeout(3000);
            }
            else {
                console.error(`error fetching directions ${result}`);
                console.log(result)
            }
        });
    }

  a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
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
        <div className={classes.root}>
        <div className={classes.gridWrapper}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                <div className={classes.encloseExtract}>
                  <div className={classes.extractIcon}>
                      <div className={classes.innerExtractIcon}>
                        <MessageIcon fontSize="large" />
                      </div>
                  </div>
                  <div className={classes.extractDetailInfo}>
                    <p className={classes.extractHeader}>Messages</p>
                    <h6 className={classes.extractInnerHeader}>{this.state.dashboard_case.sms}</h6>
                  </div>
                </div>
                <hr className={classes.hr1}/>
                <div className={classes.extractDescription}>
                  Message Information
                </div>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                <div className={classes.encloseExtract}>
                    <div className={classes.extractIcon}>
                        <div className={classes.innerExtractIcon}>
                          <PhoneOutlinedIcon fontSize="large" />
                        </div>
                    </div>
                    <div className={classes.extractDetailInfo}>
                        <p className={classes.extractHeader}>Call Logs</p>
                        <h6 className={classes.extractInnerHeader}>{this.state.dashboard_case.call}</h6>
                    </div>
                  </div>
                  <hr className={classes.hr1}/>
                  <div className={classes.extractDescription}>
                    Calls Information
                  </div>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                <div className={classes.encloseExtract}>
                  <div className={classes.extractIcon}>
                      <div className={classes.innerExtractIcon}>
                        <LocationOnOutlinedIcon fontSize="large" />
                      </div>
                  </div>
                  <div className={classes.extractDetailInfo}>
                      <p className={classes.extractHeader}>Location</p>
                      <h6 className={classes.extractInnerHeader}>{this.state.dashboard_case.location}</h6>
                  </div>
                </div>
                <hr className={classes.hr1}/>
                <div className={classes.extractDescription}>
                  Location Information
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>
        <AppBar position="static" className={classes.appBar}>
          <Tabs value={value} onChange={this.handleChange} aria-label="simple tabs example">
            <Tab label="Location" {...this.a11yProps(0)} />
          </Tabs>
        </AppBar>
        <TabPanel
          key={btoa(Math.random()).substring(0,12)}
          value={value} index={0}>
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={9}>
                <Paper className={classes.paper}>
                 <div>

                   <div className={classes.caseGrid}>
                     {this.state.facility_location.title}
                     <hr className={classes.hr}/>
                   </div>
                 </div>
                 <div className={classes.facilityFilterOutLine}>
                   <div>
                     <div className={classes.facilityType}>
                     <FormControl className={classes.formControl}>
                      <InputLabel id="demo-simple-select-label">Keph Level</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="keph_level_value"
                        value={this.state.keph_level_value}
                        onChange={this.handleChange}
                      >
                      {
                        this.state.keph_level.map(v =>
                          <MenuItem value={v.id}>{v.name}</MenuItem>
                        )
                      }
                      </Select>
                    </FormControl>

                     <FormControl className={classes.formControl}>
                      <InputLabel id="demo-simple-select-label">Facility Owner</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.state.facility_owner_value}
                        name="facility_owner_value"
                        onChange={this.handleChange}
                      >
                      {
                        this.state.facility_owner.map(v =>
                          <MenuItem value={v.id}>{v.name}</MenuItem>
                        )
                      }
                      </Select>
                    </FormControl>

                       <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Facility Type</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={this.minute}
                          onChange={this.handleMinuteChange}
                        >
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>
                     <FormControl>
                         <InputLabel htmlFor="radius">Radius in (KM)</InputLabel>
                         <Input id="radius"
                          value={this.minute}
                          type="number"
                          defaultValue={this.minute}
                          onChange={this.handleMinuteChange} />
                       </FormControl>
                      </div>
                   </div>
                 </div>
                 <div
                  key={btoa(Math.random()).substring(0,12)}
                  className={classes.maps}>
                 <Map
                     key={btoa(Math.random()).substring(0,12)}
                     google={this.props.google}
                     initialCenter={{
                         lat: this.state.lat,
                         lng: this.state.lng,
                     }}
                     zoom={14}
                     style={style}
                     containerStyle={containerStyle}>
                     <Polyline
                        key={btoa(Math.random()).substring(0,12)}
                        path={this.state.route}
                        strokeColor="#669df6"
                        strokeOpacity={0.8}
                        strokeWeight={4} />
                        <Markers/>
                        <InfoWindow
                           key={btoa(Math.random()).substring(0,12)}
                           marker={this.state.activeMarker}
                           visible={this.state.showingInfoWindow}>
                             <div>
                               <p>{this.state.title}</p>
                             </div>
                         </InfoWindow>
                   </Map>
                   </div>
                </Paper>
              </Grid>
              <Grid item xs={3}>
              <Paper className={classes.paper}>
                <div>
                  <div className={classes.caseGrid}>
                    Facility Timeline
                    <hr className={classes.hr}/>
                    <div>
                      <p className={classes.locationTitle}> Facility Name</p>
                      <p className={classes.locationBTitle}>
                        {this.state.facility_name ? this.state.facility_name: '-'}
                      </p>
                    </div>
                    <div>
                      <p className={classes.locationTitle}> Facility Type</p>
                      <p className={classes.locationBTitle}>
                        {this.state.ftype ? this.state.ftype: '-'}
                      </p>
                    </div>
                    <div>
                      <p className={classes.locationTitle}> Facility Owner</p>
                      <p className={classes.locationBTitle}>
                        {this.state.fowner_name ? this.state.fowner_name: '-'}
                      </p>
                    </div>
                  </div>
                </div>
              </Paper>
              </Grid>
            </Grid>
          </div>
          </TabPanel>
        </div>
      )
  }
}

export default compose(
  withRouter,
  withStyles(styles),
  GoogleApiWrapper({apiKey: ('AIzaSyA_IzAR-eryh3_wh1iR3wfsGQoBMxi0HTo')})
) (SearchFacility)
