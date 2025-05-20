"use client"
import React, { useEffect, useState } from 'react';
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

export default MqttSubscriber;
