"use client"
import React, { useRef, useState } from "react";
import { Box } from "@mui/material";
import { Control } from "./Control"; // assuming Control is in the same directory or adjust path accordingly
import { MqttPublisher, MqttPublisherHandle } from "./MQTT";

export const LightControls: React.FC = () => {
  const [enabled, setEnabled] = useState<number>(1);
  const [intensity, setIntensity] = useState<number>(500);

  const lightpublish = useRef<MqttPublisherHandle>(null);
  const enabledpublish = useRef<MqttPublisherHandle>(null);

    const handleIntensityChange = (newValue: number) => {
    setIntensity(newValue);
    lightpublish.current?.publish(newValue);
  };

  const handleEnabledChange = (newValue: number) => {
    setEnabled(newValue);
    enabledpublish.current?.publish(newValue);
  };

  return (
    <Box display="flex" gap={2}>
      <Control
        type="light"
        value={intensity}
        onChange={handleIntensityChange}
      />
      <MqttPublisher ref={lightpublish} url="wss://test.mosquitto.org:8081" topic={"103603101/control/light/intensity"} />
      <Control
        type="enabled"
        value={enabled}
        onChange={handleEnabledChange}
      />
      <MqttPublisher ref={enabledpublish} url="wss://test.mosquitto.org:8081" topic={"103603101/control/light/enabled"} />
    </Box>
  );
};
