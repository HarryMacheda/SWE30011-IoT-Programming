import { Box, Button, Paper, Slider, styled, Switch, Typography } from "@mui/material"
import { ReactNode } from "react"
import ThermostatIcon from '@mui/icons-material/Thermostat';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import LightModeIcon from '@mui/icons-material/LightMode';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';

export type ControlProps = {
    type: 'temperature' | 'light' | "potentiometer" | "enabled",
    value:number,
    onChange: (value:number) => void
}

export const Control:React.FC<ControlProps> = ({type, value, onChange}) => { 
let colour:string = ""
    let title: string = ""
    let icon: ReactNode = <></>
    switch(type){
        case "temperature":
            colour = "#ef476f";
            title = "Temperature Threshold";
            icon = <ThermostatIcon/>;
            break;
        case "light":
            colour = "#ffd166";
            title = "Ambient Light Threshold";
            icon = <LightModeIcon/>;
            break;  
        case "enabled":
            colour = "#118ab2";
            title = "Enabled";
            icon = <ToggleOffIcon/>;
            break;
    }
    return(
        <Paper sx={{ padding: 2,backgroundColor:colour, color:"#ffffff", width:"20%" }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
            {icon}
            <Typography fontWeight={"bold"}>{title}</Typography>
        </Box>
        <Box mt={2}>
            {value == -999 ? <Box paddingTop={3}><Typography>No data revcieved via MQTT</Typography></Box> : <>
                {type == "enabled" ?
                    <EnabledControl value={value} onChange={onChange}/> :
                    <SliderControl value={value} onChange={onChange}/>
                }
            </>}
        </Box>
        </Paper>
    )
}

type ControlDisplayProps = {
    value:number;
    onChange: (value:number) => void
}

const EnabledControl: React.FC<ControlDisplayProps> = ({ value, onChange }) => {
  return (
    <Box paddingTop={3} display="flex" gap={2}>
      <Button
        variant="contained"
        onClick={() => onChange(1)}
        sx={{
          backgroundColor: '#ffffff',
          color: '#118ab2',
          '&:hover': {
            backgroundColor: '#f0f0f0',
          },
        }}
      >
        Turn On
      </Button>
      <Button
        variant="contained"
        onClick={() => onChange(0)}
        sx={{
          backgroundColor: '#ffffff',
          color: '#118ab2',
          '&:hover': {
            backgroundColor: '#f0f0f0',
          },
        }}
      >
        Turn Off
      </Button>
    </Box>
  );
}

const SliderControl:React.FC<ControlDisplayProps> = ({value, onChange}) => {
    return <Box paddingTop={3}><WhiteSlider valueLabelDisplay="on" defaultValue={value} min={0} max={1023} onChange={(_, newValue) => typeof newValue === 'number' && onChange(value)}/></Box>
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