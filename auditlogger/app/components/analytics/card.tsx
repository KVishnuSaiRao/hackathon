import * as React from 'react';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid2 from '@mui/material/Grid2';
import Header from '@/app/dashboard/header';
import SidePanel from '@/app/dashboard/sidePannel';
import { Chip } from '@mui/material';

interface CardProps {
    analyticsData:any
}

const Card: React.FC<CardProps> = ({analyticsData}) => {
    const items = [
        { title: 'event', count: 14, name:"eventCount"},
        { title: 'Event', count: 32, name:"infoCount"},
        { title: 'Error', count: 57,name:"totalUsers" },
    ];

    function calculatePercentageIncrease(newCount:number, oldCount:number) {

        if (oldCount === 0) {
          return newCount > 0 ? "100%" : "0%";
        }
        return `${(((oldCount - newCount) / oldCount) * 100).toFixed(0)} %`;
      }
      

    

    return (
        <Grid2 container spacing={2}>
            {items.map((item, index) => (
                <Grid2 key={index}>
                    <div className="max-w-sm w-72 h-52 bg-white shadow-lg border rounded-lg relative">
                        <div className="flex flex-row p-4">
                            <div>
                                <h5 className="text-xl font-Barlow text-gray-800">{item.title}</h5>
                                <p className="text-[22px] text-gray-500 font-semibold">{analyticsData?.last30Days[item.name]}</p>
                            </div>
                        </div>
                        <Chip
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 font-Barlow"
                            size="small"
                            label={calculatePercentageIncrease(analyticsData?.last30Days[item.name],analyticsData?.beforeLast30Days[item.name])}
                            color="success"
                            variant="outlined"
                        />
                        <Typography className='text-[12px] pl-4 font-Barlow'>Last 30 days</Typography>
                    </div>

                </Grid2>

            ))}
        </Grid2>
    );
};

export default Card;