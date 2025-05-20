import { Sensor } from "@/components/Sensor";
import { Card, CardContent, CardHeader, Stack } from "@mui/material";


export default function Home() {
  return (
    <Stack spacing={2}>
      <Card>    
        <CardHeader slotProps={{title:{fontWeight:"bold"}}} title="Sensor reading"/>
        <CardContent>
          <Stack
            direction="row"
            spacing={2}
          >
            <Sensor type="temperature" value={15}/>
            <Sensor type="light"  value={200}/>
            <Sensor type="potentiometer"  value={990}/>
            <Sensor type="enabled"  value={1}/>
          </Stack>
        </CardContent>
      </Card>
      <Card>    
        <CardHeader slotProps={{title:{fontWeight:"bold"}}} title="Smart Fan"/>
        <CardContent>
          Fan stuff
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
