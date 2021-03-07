const state_params = {
  own_position: null,
  value: 0,
  selectedPlace: {},
  activeMarker: {},
  showingInfoWindow: true,
  facility_name: null,
  ftype: null,
  fowner_name: null,
  operation_status_name: null,
  fkeph_level: null,
  keph_level_value: 'Select Level',
  facility_owner_value: 'Select Facility Owner',
  facility_type_value: 'Select Facility Owner',
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
  facility_owner: [],
  facility_type: [],
  tabValue: 0,
  minute: 0,
  route: [],
  lat: null,
  lng: null,
  facility_types: [],
  facility_type_input: null,
  radius: '',
  distance: ''
}

export { state_params }
