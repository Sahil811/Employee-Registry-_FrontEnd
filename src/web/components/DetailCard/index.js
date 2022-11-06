import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function DetailCard({data, text}) {
  return (
    <Card sx={{ minWidth: 275 }}>
       <h2>{text}</h2>
      <CardContent>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
           1. User Name: {data?.userName}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
           2. Email: {data?.email}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
           3. First Name: {data?.firstName}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
           4. Last Name: {data?.lastName}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
           5. Role: {data?.role}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
           6. Address: {data?.address}
        </Typography>
      </CardContent>
    </Card>
  );
}
