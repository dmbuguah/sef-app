import 'date-fns';
import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types'

import {Map, Polyline, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
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
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import axios from 'axios';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  caseGrid: {
    padding: "4px",
    marginLeft: "14px",
    fontSize: "1.2rem",
    fontWeight: "400",
    color: "#999"
  },
  hr : {
    border: "0.6px solid #ddd",
    // marginTop: "90px"
  },
  hr1 : {
    border: "0.6px solid #ddd",
    marginTop: "90px"
  },
  maps: {
    padding: "10px",
    width: "100%",
    height: "100%"
  },
  paper: {
    padding: "10px",
    height: "100%"
  },
  extractIcon: {
    marginTop: "-23px",
    width: "65px",
    height: "65px",
    background: "#1abdd1",
    display: "flex",
    justifyContent: "center",
    borderRadius: "3px",
    float: "left"
  },
  innerExtractIcon: {
    height: "fit-content",
    width: "fit-content",
    marginTop: "14px"
  },
  header4: {
    fontSize: "2.125rem",
    textAlign: "left",
    paddingLeft: "10px"
  },
  extractDetailInfo: {
    float: "right"
  },
  encloseExtract: {
  },
  extractHeader: {
    fontSize: "14px",
    color: "#999",
    fontFamily: "Roboto,Helvetica,Arial,sans-serif"
  },
  extractInnerHeader: {
    lineHeight: "1"
  },
  gridWrapper: {
    marginBottom: "20px"
  },
  appBar: {
    background: "#1abdd1",
    color: "black"
  },
  extractDescription: {
    color: "#999"
  },
  datePicker: {
    float: "right",
    marginLeft: "20px"
  },
  datePickerOutLine: {
    display: "flow-root",
    padding: "10px"
  },
  locationTitle: {
    fontSize: "14px",
    fontWeight: 500,
    color: "#333"
  },
  locationBTitle: {
    fontSize: "13px"
  },
  sentRecipient: {
    fontSize: "12px",
    color: "#999",
  },
  dateSent: {
    fontSize: "14px",
    color: "#999",
  },
  sentMsg: {
    border: "1px solid #999",
    padding: "10px",
    borderRadius: "10px",
    marginLeft: "10px",
    width: "-webkit-fill-available"
  },
  sentTitle: {
    fontSize: "14px",
    color: "#333"
  },
  encloseSent: {
    display: "flex",
    marginBottom: "3px"
  },
  sentInnerDiv: {
    marginLeft: "10px"
  },
  verticalTab: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224,
  },
  verticalTabConTimeLine: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 400,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    overflow: "unset"
  },
  smsDivWrapper: {
    marginBottom: "15px"
  },
  smsDiv: {
    background: "#efe1e1",
    padding: "5px",
    borderRadius: "5px"
  },
  drDiv: {
    fontSize: "12px",
    textAlign: "right"
  },
  tabPanelVerticalDiv: {
    width: "-webkit-fill-available",
    overflowY: "scroll"
  },
  noResult: {
    textAlign: "center",
    fontSize: "20px",
    padding: "15%"
  },
  minDev: {
    float: "right",
    padding: "15px"
  },
  inbox: {
    backgroundColor: "antiquewhite",
    margin: "10px",
    width: "350px",
    float: "left",
    padding: "8px",
    borderRadius: "8px"
  },
  sent: {
    backgroundColor: "antiquewhite",
    margin: "10px",
    width: "350px",
    float: "right",
    padding: "8px",
    borderRadius: "8px"
  },
  incoming: {
    backgroundColor: "antiquewhite",
    margin: "10px",
    padding: "8px",
    borderRadius: "8px",
    width: "100%",
    display: "flow-root"
  },
  convDate: {
    textAlign: "right",
    fontSize: "small"
  },
  convLocation: {
    textAlign: "right",
    fontSize: "small"
  },
  cCodeSemi: {
    marginLeft: "18px"
  },
  durationSemi: {
    marginLeft: "55px"
  },
  dateSemi: {
    marginLeft: "83px"
  },
  titleCallAnalysis: {
    fontWeight: "bold"
  }
})

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
    this.state = {
      own_position: null,
      value: 0,
      dashboard_case: {
        sms: 0,
        call: 0,
        location: 0
      },
      selectedPlace: {},
      activeMarker: {},
      showingInfoWindow: true,
      facility_name: null,
      ftype: null,
      fowner_name: null,
      operation_status_name: null,
      fkeph_level: null,
      fcounty_name: null,
      location_timeline: {
        title: null,
        analysis_data: {
          messages: [],
          incoming_calls: [],
          outgoing_calls: []
        }
      },
      facility_location: {
        title: null,
        analysis_data: [],
      },
      tabValue: 0,
      minute: 0,
      route: [],
      lat: null,
      lng: null
    }
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
                    facility_location.analysis_data = facilities['facility_location']['analysis_data']
                    facility_location.title = facilities['facility_location']['title']

                    self.setState({facility_location: facility_location})
                })
          })
        })
    }
  }
  handleChange = (event, newValue) => {
     this.setState({value:newValue})
  };

  tabHandleChange = (event, newValue) => {
     this.setState({tabValue:newValue})
  };

  handleFromDateChange = (date) => {
    this.setState({selectedFromDate:date})
  };


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

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };
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
                    route: result.routes[0].overview_path.map(p => {return {lat:p.lat() , lng:p.lng()}})
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
         )

      const Sent = props => (
          this.state.location_timeline.analysis_data.messages.map((sms, index) =>
            <div
              key={btoa(Math.random()).substring(0,12)}
              className={classes.encloseSingleSent}>
                  { index >= 1 && <hr className={classes.hr}/>}
                  <div key={btoa(Math.random()).substring(0,12)}>
                    <div
                      key={btoa(Math.random()).substring(0,12)}
                      className={classes.sentTitle}>
                      { sms.date_sent? <span> To </span> : <span> From </span>}
                    </div>
                    <div
                    key={btoa(Math.random()).substring(0,12)}
                    className={classes.sentRecipient}>
                      {sms.recipient || sms.sender || '+12027252124'}
                    </div>
                  </div>
                  <div key={btoa(Math.random()).substring(0,12)}>
                    <div
                    key={btoa(Math.random()).substring(0,12)}
                    className={classes.sentTitle}> Date </div>
                    <div
                    key={btoa(Math.random()).substring(0,12)}
                    className={classes.dateSent}>
                      {sms.date_sent || sms.date_received}
                    </div>
                  </div>
            </div>
          )
        )

      const IncomingCalls = props => (
          this.state.location_timeline.analysis_data.incoming_calls.map((calls, index) =>
            <div className={classes.encloseSingleSent}>
                  { index >= 1 && <hr className={classes.hr}/>}
                  <div>
                    <div className={classes.sentTitle}>
                      { calls.ctype === 'outgoing' ? <span> To </span> : <span> From </span>}
                      </div>
                    <div className={classes.sentRecipient}>
                      { calls.ctype === 'outgoing' ? 'Subject' : calls.cfrom }
                      </div>
                  </div>
                  <div>
                    <div className={classes.sentTitle}> Date </div>
                    <div className={classes.dateSent}>{calls.date_called}</div>
                  </div>
            </div>
          )
        )

      const SentIcon = props => (
        <div>
          <MessageIcon fontSize="large" />
        </div>
      )

      const CallIcon = props => (
        <div>
          <PhoneOutlinedIcon fontSize="large" />
        </div>
      )

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
              <Grid item xs={8}>
                <Paper className={classes.paper}>
                 <div>

                   <div className={classes.caseGrid}>
                     {this.state.facility_location.title}
                     <hr className={classes.hr}/>
                   </div>
                 </div>
                 <div className={classes.datePickerOutLine}>
                   <MuiPickersUtilsProvider utils={DateFnsUtils}>
                   <div className={classes.datePicker}>
                     <KeyboardDatePicker
                       disableToolbar
                       variant="inline"
                       format="MM/dd/yyyy"
                       margin="normal"
                       id="date-picker-to"
                       label="To"
                       value={this.state.selectedToDate}
                       onChange={this.handleToDateChange}
                       KeyboardButtonProps={{
                         'aria-label': 'change date',
                       }}/>
                    </div>
                    <div className={classes.datePicker}>
                     <KeyboardDatePicker
                       disableToolbar
                       variant="inline"
                       format="MM/dd/yyyy"
                       margin="normal"
                       id="date-picker-from"
                       label="From"
                       value={this.state.selectedFromDate}
                       onChange={this.handleFromDateChange}
                       KeyboardButtonProps={{
                         'aria-label': 'change date',
                       }}/>
                     </div>
                   </MuiPickersUtilsProvider>
                   <div className={classes.minDev}>
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
                 <div
                  key={btoa(Math.random()).substring(0,12)}
                  className={classes.maps}>
                 <Map
                     key={btoa(Math.random()).substring(0,12)}
                     google={this.props.google}
                     onClick={this.onMapClicked}
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
              <Grid item xs={4}>
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
                    <div className={classes.encloseSent}>
                      { this.state.location_timeline.analysis_data.messages.length > 0 ?
                          <SentIcon/> : <span></span>
                      }

                      {
                          this.state.location_timeline.analysis_data.messages.length >0  &&
                          <div
                            className={classes.sentMsg} key={btoa(Math.random()).substring(0,12)}>
                            <Sent/>
                          </div>
                      }
                    </div>

                    <div className={classes.encloseSent}>
                      { this.state.location_timeline.analysis_data.incoming_calls.length > 0 ?
                          <CallIcon/> : <span></span>
                      }

                      {
                          this.state.location_timeline.analysis_data.incoming_calls.length > 0  ?
                          <div className={classes.sentMsg}>
                            <IncomingCalls/>
                          </div>: <span></span>
                      }
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
