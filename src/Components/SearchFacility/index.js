import 'date-fns';
import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types'
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    BarChart,
    Bar, Label
} from 'recharts';

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
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

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

function a11yPropsVertical(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

class SearchFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      casesId: null,
      value: 0,
      outgoing_calls_by_day: {
          title: null,
          x_axis: null,
          y_axis: null,
          analysis_data: null
      },
      incoming_calls_by_day: {
          title: null,
          x_axis: null,
          y_axis: null,
          analysis_data: null
      },
      calls_by_ctype: {
          title: null,
          x_axis: null,
          y_axis: null,
          analysis_data: null
      },
      sms_sent_by_day: {
          title: null,
          x_axis: null,
          y_axis: null,
          analysis_data: null
      },
      sms_received_by_day: {
          title: null,
          x_axis: null,
          y_axis: null,
          analysis_data: null
      },
      sms_by_type_date: {
          title: null,
          x_axis: null,
          y_axis: null,
          analysis_data: null
      },
      location_case: {
        title: null,
        analysis_data: [],
      },
      dashboard_case: {
        sms: 0,
        call: 0,
        location: 0
      },
      selectedToDate: new Date('2012-07-18T21:11:54'),
      selectedFromDate: new Date('2012-07-18T21:11:54'),
      selectedPlace: {},
      activeMarker: {},
      showingInfoWindow: true,
      title: null,
      address: null,
      timestamp: null,
      location_timeline: {
        title: null,
        analysis_data: {
          messages: [],
          incoming_calls: [],
          outgoing_calls: []
        }
      },
      r_sms_break_down: {
        title: null,
        analysis_data: []
      },
      s_sms_break_down: {
        title: null,
        analysis_data: []
      },
      i_calls_break_down: {
        title: null,
        analysis_data: []
      },
      tabValue: 0,
      user_received_sms: [],
      user_sent_sms: [],
      user_incoming_call: [],
      minute: 0,
      user_conversation_timeline: {
        title: null,
        analysis_data: []
      },
      conv_timeline: [],
      conv_type: null,
      route: [],
      lat: 38.8810628,
      lng: -77.11394929
    }
  }

  componentDidMount() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          console.log(pos)
      });
    };
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
    var mydate = new Date(marker.timestamp);
    console.log(props)
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      title: marker.aplace,
      address: marker.address,
      timestamp: mydate.toString(),
      lat: props.position.lat,
      lng: props.position.lng
    });

    axios.get(
        `http://127.0.0.1:8000/v1/case/cases/marker_analysis/`, {
          params: {
              locationId: marker.id
          },
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {
            const cases = response.data;

            var location_timeline = {...this.state.location_timeline}
            location_timeline.analysis_data = cases['location_timeline']['analysis_data']
            this.setState({location_timeline: location_timeline})
        })
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
        this.state.location_case.analysis_data.map((marker, index) =>
          <Marker
            {...props}
            key={index}
            id={marker.id}
            address={marker.address}
            aplace={marker.place}
            timestamp={marker.timestamp}
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

      const TabWrapper = props => (
        this.state.r_sms_break_down.analysis_data.map((sms, index) =>
          <Tab
            label={<><div><AccountCircleIcon style={{verticalAlign: 'middle'}}/> {sms['user']}</div></>}
            key={index}
            onChange= {() =>
              this.setState({user_received_sms: sms['sms']})
            }
            {...a11yPropsVertical(index)} />
        )
      )

      const TabWrapperIncomingCall = props => (
        this.state.i_calls_break_down.analysis_data.map((call, index) =>
          <Tab
            label={<><div><AccountCircleIcon style={{verticalAlign: 'middle'}}/> {call['user']}</div></>}
            key={index}
            onChange= {() =>
              this.setState({user_incoming_call: call['call']})
            }
            {...a11yPropsVertical(index)} />
        )
      )

      const TabPanelVerticalWrapperIncomingCall = props => (
            <TabPanelVertical
              key={this.state.tabValue}
              className={classes.tabPanelVerticalDiv}
              value={this.state.tabValue} index={this.state.tabValue}>

              {this.state.user_incoming_call.length === 0 ?
                  <div className={classes.noResult}>
                    Click conversation bar for breakdown
                    </div>: <span></span>
              }

              {this.state.user_incoming_call.map((call, index) =>
                  <div
                    key={btoa(Math.random()).substring(0,12)}
                    className={classes.smsDivWrapper}>
                    <div
                      key={btoa(Math.random()).substring(0,12)}
                      className={classes.smsDiv}>
                      <div key={btoa(Math.random()).substring(0,12)}>
                        <span
                          className={classes.titleCallAnalysis}
                          key={btoa(Math.random()).substring(0,12)}>
                          Country Code
                          <span className={classes.cCodeSemi}>:</span>
                        </span>
                        <span key={btoa(Math.random()).substring(0,12)}>{call['country_code']}</span>
                      </div>
                      <div key={btoa(Math.random()).substring(0,12)}>
                        <span
                          className={classes.titleCallAnalysis}
                          key={btoa(Math.random()).substring(0,12)}>Duration
                          <span className={classes.durationSemi}>:</span>
                        </span>
                        <span key={btoa(Math.random()).substring(0,12)}>{call['cduration']} sec</span>
                      </div>
                      <div key={btoa(Math.random()).substring(0,12)}>
                      <span
                        className={classes.titleCallAnalysis}
                        key={btoa(Math.random()).substring(0,12)}>Date
                        <span className={classes.dateSemi}>:</span>
                      </span>
                      <span key={btoa(Math.random()).substring(0,12)}>
                        {call['date_called']}
                      </span>
                      </div>
                    </div>
                  </div>
              )}
            </TabPanelVertical>
      )

      const TabPanelVerticalWrapper = props => (
            <TabPanelVertical
              key={this.state.tabValue}
              className={classes.tabPanelVerticalDiv}
              value={this.state.tabValue} index={this.state.tabValue}>

              {this.state.user_received_sms.length === 0 ?
                  <div className={classes.noResult}>
                    Click conversation bar for breakdown
                    </div>: <span></span>
              }

              {this.state.user_received_sms.map((sms, index) =>
                  <div
                    key={btoa(Math.random()).substring(0,12)}
                    className={classes.smsDivWrapper}>
                    <div
                      key={btoa(Math.random()).substring(0,12)}
                      className={classes.smsDiv}>
                      {sms['body']}
                    </div>
                    <div
                      key={btoa(Math.random()).substring(0,12)}
                      className={classes.drDiv}>{sms['date_received']}</div>
                  </div>
              )}
            </TabPanelVertical>
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
                     {this.state.location_case.title}
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
                    Case Timeline
                    <hr className={classes.hr}/>
                    <div>
                      <p className={classes.locationTitle}> Place Name</p>
                      <p className={classes.locationBTitle}>
                        {this.state.title ? this.state.title: '-'}
                      </p>
                    </div>
                    <div>
                      <p className={classes.locationTitle}> Place Address</p>
                      <p className={classes.locationBTitle}>
                        {this.state.address ? this.state.address: '-'}
                      </p>
                    </div>
                    <div>
                      <p className={classes.locationTitle}> Date</p>
                      <p className={classes.locationBTitle}>
                        {this.state.timestamp ? this.state.timestamp: '-'}
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
