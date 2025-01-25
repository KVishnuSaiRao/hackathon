import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid2 from '@mui/material/Grid2';

const items = [
    { title: 'Users', count: 14 },
    { title: 'Event', count: 32 },
    { title: 'Error', count: 57 },
];

function MediaCard() {

    return (
        <Grid2 container spacing={2}>
            {items.map((item, index) => (
                <Grid2 key={index}>
                    <Card sx={{ maxWidth: 400, width:300, height:200 }}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" style={{ fontWeight: 400 }}>
                                {item.title}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }} style={{ fontWeight: 800 }}>
                                {item.count}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid2>
            ))}
        </Grid2>
    );
}

const Dashboard: React.FC = () => {
    return (
        <React.Fragment>
            <MediaCard />
        </React.Fragment>
    );
};

export default Dashboard;