"use client"
import { Box, Grid, Paper, Slider, Switch, Typography } from "@mui/material"
import ThermostatIcon from '@mui/icons-material/Thermostat';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import LightModeIcon from '@mui/icons-material/LightMode';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import { ReactNode } from "react";
import { styled } from '@mui/material/styles';


export type SensorProps = {
    type: 'temperature' | 'light' | "potentiometer" | "enabled",
    value:number,
}

export const Sensor:React.FC<SensorProps> = ({type, value}) => {

    let colour:string = ""
    let title: string = ""
    let icon: ReactNode = <></>
    switch(type){
        case "temperature":
            colour = "#ef476f";
            title = "Temperature";
            icon = <ThermostatIcon/>;
            break;
        case "light":
            colour = "#ffd166";
            title = "Ambient Light";
            icon = <LightModeIcon/>;
            break;
        case "potentiometer":
            colour = "#06d6a0";
            title = "LED Brightness";
            icon = <LightbulbIcon/>;
            break;
        case "enabled":
            colour = "#118ab2";
            title = "Light Enabled";
            icon = <ToggleOffIcon/>;
            break;
    }


    return (
    <Paper sx={{ padding: 2,backgroundColor:colour, color:"#ffffff", width:"20%" }}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        {icon}
        <Typography fontWeight={"bold"}>{title}</Typography>
      </Box>
      <Box mt={2}>
         {type == "temperature" && <TemeratureDisplay value={value}/>}
         {type == "light" && <LightDisplay value={value}/>}
         {type == "potentiometer" && <BrightnessDisplay value={value}/>}
         {type == "enabled" && <EnabledDisplay value={value}/>}
      </Box>
    </Paper>
    )
}

type SensorDisplayProps = {
    value:number
}

const TemeratureDisplay:React.FC<SensorDisplayProps> = ({value}) => {
    return <>
        <Typography fontSize={40}>{value} &deg;C</Typography>
    </>
}

const LightDisplay:React.FC<SensorDisplayProps> = ({value}) => {
    return <Box paddingTop={3}>
        <WhiteSlider valueLabelDisplay="on" defaultValue={value} min={0} max={1023} disabled />
    </Box>
}

const BrightnessDisplay:React.FC<SensorDisplayProps> = ({value}) => {
    return <Box paddingTop={3}>
        <WhiteSlider valueLabelDisplay="on" defaultValue={value} min={0} max={1023} disabled/>
    </Box>
}

const EnabledDisplay:React.FC<SensorDisplayProps> = ({value}) => {
    return <Box paddingTop={3}>
        <Switch checked={value == 1} color="default"/>
        <Typography display="inline" width={0}>{value == 1 ? "Enabled" : "Disabled"}</Typography>
    </Box>
}

const WhiteSlider = styled(Slider)({
  color: '#ffffff',
  '& .MuiSlider-thumb': {
    backgroundColor: '#ffffff',
    border: '2px solid #ccc',
  },
  '& .MuiSlider-rail': {
    color: '#ffffff',
  },
  '& .MuiSlider-track': {
    color: '#ffffff',
  },
  '& .MuiSlider-valueLabel': {
    backgroundColor: '#ffffff',
    color: '#000',
  },
});