import * as React from 'react';
import Header from '@/app/dashboard/header';
import SidePanel from '@/app/dashboard/sidePannel';
import Card from './card';
import StackedAreas from './lines';
import BasicPie from './piechart';


const Dashboard: React.FC = ({analyticsData}:any) => {
    return (
        <React.Fragment>
            <Header></Header>
            <div className='flex flex-row'>
            <SidePanel selectedOption='analysis'></SidePanel>
            <div className='p-2'><Card analyticsData={analyticsData} />
            <div className='flex flex-row mt-8'><StackedAreas></StackedAreas>
            <div className=''><BasicPie></BasicPie></div></div></div>
            </div>
        </React.Fragment>
    );
};

export default Dashboard;