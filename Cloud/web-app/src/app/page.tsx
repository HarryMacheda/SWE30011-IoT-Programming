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
        </CardContent>
      </Card>
      <Card>    
        <CardHeader slotProps={{title:{fontWeight:"bold"}}} title="Smart Light"/>
        <CardContent>
          Light stuff
        </CardContent>
      </Card>
    </Stack>
  );
}
