"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Dashboard from "../components/analytics/analytics";
import { getAnalytics } from "../services/analytics";


export default function Index() {

  const [analyticsData, setAnalyticsData] = useState<any>()
  const router = useRouter();

  useEffect(() => {
    getAnalytics()
      .then((response) => {
        if (response?.data?.success === true) {
          setAnalyticsData(response?.data?.result);
        }
      })
      .catch();
  }, [router])

  console.log("analyticsData",analyticsData);
  
  return (
    <Dashboard analyticsData={analyticsData} />
  );
}