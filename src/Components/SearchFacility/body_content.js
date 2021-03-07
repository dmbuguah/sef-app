const BodyContent = {
  <div className={classes.root}>
  <AppBar position="static" className={classes.appBar}>
    <Tabs value={value} onChange={this.handleChange} aria-label="simple tabs example">
      <Tab label="Health Facilities" {...this.a11yProps(0)} />
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
           <Grid container spacing={3}>
             <Grid item xs={12} sm={6}>
               <Paper className={classes.paper}>
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
                      <MenuItem value={v.name}>{v.name}</MenuItem>
                    )
                  }
                  </Select>
                </FormControl>
               </Paper>
             </Grid>
             <Grid item xs={12} sm={6}>
               <Paper className={classes.paper}>
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
                      <MenuItem value={v.name}>{v.name}</MenuItem>
                    )
                  }
                  </Select>
                  </FormControl>
               </Paper>
             </Grid>
             <Grid item xs={12} sm={6}>
               <Paper className={classes.paper}>
                 <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">Facility Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={this.state.facility_type_value}
                    name="facility_type_value"
                    onChange={this.handleChange}
                  >
                  {
                    this.state.facility_type.map(v =>
                      <MenuItem value={v.name}>{v.name}</MenuItem>
                    )
                  }
                  </Select>
                </FormControl>
               </Paper>
             </Grid>
             <Grid item xs={12} sm={6}>
              <Grid container spacing={2}>
               <Grid item xs={12} sm={6}>
                 <Paper className={classes.paper}>
                   <FormControl className={classes.formControl}>
                       <InputLabel htmlFor="radius">Radius in (KM)</InputLabel>
                       <Input id="radius-id"
                        defaultValue={this.state.radius}
                        type="number"
                        name="radius"
                        onChange={this.handleChange}/>
                     </FormControl>
                  </Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Paper className={classes.paper}>
                     <Button
                        variant="outlined" size="small"
                        color="primary" className={classes.searchButton}
                        onClick={this.searchFacility}>
                        Search Facility
                    </Button>
                  </Paper>
              </Grid>
              </Grid>
             </Grid>
           </Grid>
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
                         <p>{this.state.facility_name}</p>
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
              <div>
                <p className={classes.locationTitle}> Facility Level</p>
                <p className={classes.locationBTitle}>
                  {this.state.fkeph_level ? this.state.fkeph_level: '-'}
                </p>
              </div>
              <div>
                <p className={classes.locationTitle}> County</p>
                <p className={classes.locationBTitle}>
                  {this.state.fcounty_name ? this.state.fcounty_name: '-'}
                </p>
              </div>
              <div>
                <p className={classes.locationTitle}> Distance From Current Location</p>
                <p className={classes.locationBTitle}>
                  {this.state.distance ? this.state.distance: '-'}
                </p>
              </div>
              <div>
                <p className={classes.locationTitle}> Duration From Current Location</p>
                <p className={classes.locationBTitle}>
                  {this.state.duration ? this.state.duration: '-'}
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
}
export { BodyContent }
