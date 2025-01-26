"use client"
import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Grid2 } from '@mui/material';

const dataset = [
    { date: new Date('2000-01-01'), fr: 22000, dl: 25000, gb: 23000 },
    { date: new Date('2001-01-01'), fr: 22500, dl: 26000, gb: 24000 },
    { date: new Date('2002-01-01'), fr: 23000, dl: 27000, gb: 24500 },
    { date: new Date('2003-01-01'), fr: 24000, dl: 28000, gb: 25500 },
    { date: new Date('2004-01-01'), fr: 24500, dl: 29000, gb: 26500 },
    { date: new Date('2005-01-01'), fr: 25000, dl: 30000, gb: 27000 },
    { date: new Date('2006-01-01'), fr: 26000, dl: 31000, gb: 28000 },
    { date: new Date('2007-01-01'), fr: 27000, dl: 32000, gb: 29000 },
]

export default function StackedAreas() {
    return (
        <Grid2 container spacing={2}>
            <Grid2>
                <div className=" bg-white shadow-lg border rounded-lg relative">
                    <LineChart
                        dataset={dataset}
                        xAxis={[
                            {
                                id: 'Years',
                                dataKey: 'date',
                                scaleType: 'time',
                                valueFormatter: (date: any) => (new Date(date)).getMonth().toString() + 1.,
                            },
                        ]}
                        series={[
                            {
                                id: 'France',
                                label: 'Sessions',
                                dataKey: 'fr',
                                stack: 'total',
                                area: true,
                                showMark: false,
                            },
                        ]}
                        width={600}
                        height={400}
                        margin={{ left: 70 }}
                    />
                </div>
            </Grid2>
        </Grid2>
    );
}
