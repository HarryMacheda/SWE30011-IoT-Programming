import paho.mqtt.client as mqtt

# MQTT Communication 
broker = "test.mosquitto.org"
port = 1883
client = mqtt.Client()

def publish(topic, message):
    client.connect(broker, port)
    client.publish(topic, message)
    client.disconnect()