"use client"
import React, { useRef, useState } from "react";
import { Box } from "@mui/material";
import { Control } from "./Control"; // Adjust path as needed
import { MqttPublisher, MqttPublisherHandle } from "./MQTT";

export const FanControls: React.FC = () => {
    const [enabled, setEnabled] = useState<number>(1);
    const [temperature, setTemperature] = useState<number>(25); // Example starting value

    const lightpublish = useRef<MqttPublisherHandle>(null);
    const enabledpublish = useRef<MqttPublisherHandle>(null);

    const handleTemperatureChange = (newValue: number) => {
        setTemperature(newValue);
        lightpublish.current?.publish(newValue);
    };

    const handleEnabledChange = (newValue: number) => {
        setEnabled(newValue);
        enabledpublish.current?.publish(newValue);
    };
    return (
        <Box display="flex" gap={2}>
        <Control
            type="temperature"
            value={temperature}
            onChange={handleTemperatureChange}
        />
        <MqttPublisher ref={lightpublish} url="wss://test.mosquitto.org:8081" topic={"103603101/control/fan/temperature"} />
        <Control
            type="enabled"
            value={enabled}
            onChange={handleEnabledChange}
        />
        <MqttPublisher ref={enabledpublish} url="wss://test.mosquitto.org:8081" topic={"103603101/control/fan/enabled"} />
        </Box>
    );
};
