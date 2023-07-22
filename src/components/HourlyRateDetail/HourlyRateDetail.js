import React, { useState } from 'react'
import Header from '../Header/Header'
import { Box, Button, TextField, Typography } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Cookie from 'js-cookie';
import { useMutation } from 'react-query';
import { request } from '../../utils/axios-utils';
const theme = createTheme({
    palette: {
        secondary: {
            main: '#0971f1',
            darker: '#053e85',
        },
    },
});
const HourlyRateDetail = () => {
    const [hourRate, setHourRate] = useState({
        hourlyRate: 20
    })
    const { mutate: AddHourlyRate } = useMutation(request, {
        onSuccess: (response) => {
            console.log(response);
            debugger
        },
        onError: (response) => {
            console.log(response);
        }
    });
    const handleAddHourlyRate = async (e) => {
        await AddHourlyRate({
            url: '/user/freelancer/hourly-rate',
            method: 'put',
            data: hourRate,
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    }
    function LinearProgressWithLabel(props) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                    <ThemeProvider theme={theme}>
                        <LinearProgress color="secondary" variant="determinate" {...props} />
                    </ThemeProvider>
                </Box>
            </Box>
        );
    }
    LinearProgressWithLabel.propTypes = {
        value: PropTypes.number.isRequired,
    };
    return (
        <>
            <Box className="main_section">
                <Typography className='main_section_heading' variant="span">6/7</Typography>
                <Typography className='main_section_heading' variant="span">Set Your Worth, Define Your Success</Typography>
                <Typography className='main_section_description' variant="span">Determine your value in the marketplace by setting your hourly rate. On this page, you have
                    the power to define your financial success.</Typography>
                <Box>
                    <Typography>Hourly rate</Typography>
                    <TextField
                        placeholder="$0.00"
                        variant="outlined"
                        value={hourRate.hourlyRate}
                        onChange={(e) => {
                            setHourRate({ ...hourRate, hourlyRate: e.target.value });
                        }}
                    />
                </Box>
                <Box sx={{ width: '100%' }}>
                    <LinearProgressWithLabel value={10} />
                    <Button onClick={handleAddHourlyRate} className="save_button">Next</Button>
                </Box>
            </Box>
        </>
    )
}

export default HourlyRateDetail