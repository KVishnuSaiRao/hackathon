import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Grid2 } from '@mui/material';

export default function BasicPie() {
    return (
        <Grid2 container spacing={2}>
            <Grid2>
                <div className=" bg-white shadow-lg border rounded-lg relative">
                    <PieChart
                        series={[
                            {
                                data: [
                                    { id: 0, value: 10, label: 'series A' },
                                    { id: 1, value: 15, label: 'series B' },
                                    { id: 2, value: 20, label: 'series C' },
                                ],
                            },
                        ]}
                        width={400}
                        height={200}
                    />
                </div>
            </Grid2>
        </Grid2>
    );
}
