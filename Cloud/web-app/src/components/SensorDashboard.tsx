"use client"
import { Card, CardContent, CardHeader, Stack } from "@mui/material";
import { useState } from "react";
import { Sensor } from "./Sensor";
import MqttSubscriber from "./MQTT";

export function SensorDashboard() {
    const [temperature, setTemperature] = useState(-999)
    const [light, setLight] = useState(-999)
    const [potentiometer, setPotentiometer] = useState(-999)
    const [lightEnabled, setLightEnabled] = useState(-999)
    const [fanEnabled, setFanEnabled] = useState(-999)
    return (
        <Card>    
        <CardHeader slotProps={{title:{fontWeight:"bold"}}} title="Sensor reading"/>
        <CardContent>
          <Stack
            direction="row"
            spacing={2}
          >
            <Sensor type="temperature" value={temperature}/>
            <MqttSubscriber url="wss://test.mosquitto.org:8081" topic="103603101/sensor/temperature" onMessage={setTemperature}/>
            <Sensor type="light"  value={light}/>
            <MqttSubscriber url="wss://test.mosquitto.org:8081" topic="103603101/sensor/light" onMessage={setLight}/>
            <Sensor type="potentiometer"  value={potentiometer}/>
            <MqttSubscriber url="wss://test.mosquitto.org:8081" topic="103603101/sensor/potentiometer" onMessage={setLightEnabled}/>
            <Sensor type="light-enabled"  value={lightEnabled}/>
            <MqttSubscriber url="wss://test.mosquitto.org:8081" topic="103603101/sensor/light/enabled" onMessage={setPotentiometer}/>
            <Sensor type="fan-enabled"  value={fanEnabled}/>
            <MqttSubscriber url="wss://test.mosquitto.org:8081" topic="103603101/sensor/fan/enabled" onMessage={setFanEnabled}/>
          </Stack>
        </CardContent>
      </Card>
    )

}
