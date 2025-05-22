"use client"
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import mqtt from 'mqtt';

export type MQTTSubsciberProps = {
    url: string,
    topic: string,
    onMessage: (message:any) => void
}
//'wss://test.mosquitto.org:8081'
const MqttSubscriber:React.FC<MQTTSubsciberProps> = ({url, topic, onMessage}) => {

  useEffect(() => {
    const client = mqtt.connect(url);

    client.on('connect', () => {
        console.log(`Connected to ${url}/${topic}`)
      client.subscribe(topic);
    });

    client.on('message', (receivedTopic, message) => {
      if (receivedTopic === topic) {
        onMessage(message.toString());
      }
    });

    return () => {
      if (client.connected) {
        client.end();
      }
    };
  }, []);

  return <></>;
};

export type MqttPublisherProps = {
  url: string;
  topic: string;
};

export type MqttPublisherHandle = {
  publish: (value: number) => void;
};

export const MqttPublisher = forwardRef<MqttPublisherHandle, MqttPublisherProps>(({ url, topic }, ref) => {
  const clientRef = useRef<mqtt.MqttClient | null>(null);

  useEffect(() => {
    const client = mqtt.connect(url);
    clientRef.current = client;

    client.on('connect', () => {
      console.log(`Publisher connected to ${url}`);
    });

    return () => {
      if (client.connected) {
        client.end();
      }
    };
  }, [url]);

  useImperativeHandle(ref, () => ({
    publish: (value: number) => {
      if (clientRef.current?.connected) {
        clientRef.current.publish(topic, value.toString());
        console.log(`Published to ${topic}: ${value}`);
      } else {
        console.warn("MQTT client not connected");
      }
    }
  }));

  return null;
});

export default MqttSubscriber;
