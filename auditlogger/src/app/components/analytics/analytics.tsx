import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

function MediaCard() {
  return (
    <Grid container spacing={2}>
    <Grid item xs={4}>
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" style={{ fontWeight: 400 }}>
            Users
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} style={{ fontWeight: 800 }}>
            14
          </Typography>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={4}>
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" style={{ fontWeight: 400 }}>
            Posts
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} style={{ fontWeight: 800 }}>
            32
          </Typography>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={4}>
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" style={{ fontWeight: 400 }}>
            Comments
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} style={{ fontWeight: 800 }}>
            57
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
  );
}

const Dashboard: React.FC = () => {
    return (
        <React.Fragment>
            <MediaCard/>
        </React.Fragment>
    );
};

export default Dashboard;