import { FanControls } from "@/components/FanControls";
import { LightControls } from "@/components/LightControls";
import MqttSubscriber from "@/components/MQTT";
import { SensorDashboard } from "@/components/SensorDashboard";
import { Card, CardContent, CardHeader, Stack } from "@mui/material";


export default function Home() {
  return (
    <Stack spacing={2}>
      <SensorDashboard />
      <Card>    
        <CardHeader slotProps={{title:{fontWeight:"bold"}}} title="Smart Fan"/>
        <CardContent>
          <FanControls />
        </CardContent>
      </Card>
      <Card>    
        <CardHeader slotProps={{title:{fontWeight:"bold"}}} title="Smart Light"/>
        <CardContent>
          <LightControls />
        </CardContent>
      </Card>
    </Stack>
  );
}
