import React from 'react'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const TabClass = {
  TabPanelVertical1 (props) {
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
}
export { TabClass }
