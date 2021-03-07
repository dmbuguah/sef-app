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
    height: "100%",
    boxShadow: "unset"
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
  extractDetailInfo: {
    float: "right"
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
  facilityType: {
    float: "right",
    marginLeft: "20px"
  },
  facilityFilterOutLine: {
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
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    overflow: "unset"
  },
  minDev: {
    float: "right",
    padding: "15px"
  },
  formControl: {
    width: "-webkit-fill-available",
    marginRight: "5px"
  },
  searchButton: {
    marginBottom: "-32px"
  }
})

export { styles }
