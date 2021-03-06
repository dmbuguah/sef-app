import React from 'react'

const state_params = {
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
  keph_level_value: 'Select Level',
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
  keph_level: [],
  tabValue: 0,
  minute: 0,
  route: [],
  lat: null,
  lng: null,
  facility_types: [],
  facility_type_input: null
}

export { state_params }
