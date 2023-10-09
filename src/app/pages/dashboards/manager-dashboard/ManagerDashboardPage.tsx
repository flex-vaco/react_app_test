/* eslint-disable jsx-a11y/anchor-is-valid */
//RV: created from dashbord page
import React,  {useEffect, useState} from "react";
import {StatsWidget1} from "../../../../_start/partials/widgets";
import Chart from "react-apexcharts";
import axios from "axios";
import { DataTable1 } from "../../../../_start/partials/widgets/tables/DataTable1";
import { PageDataContainer } from "../../../../_start/layout/core";
import * as mockData from "./mockChartData"

export const ManagerDashboardPage: React.FC = () => {

  const [tableData, setTableData] = useState<any[]>([]) //<AxiosResponse | null | void>(null);
  const [tableHeaders, setTableHeaders] = useState<any[]>([]) //<AxiosResponse | null | void>(null);
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('projects'); //should be changed to Chart Names
  const [chartData, setChartData] = useState<any>(mockData.chartDataWeek)
  
  useEffect(()=>{
    setLoading(true)
    const API_URL = `${process.env.REACT_APP_API_URL}${filter}`;
    axios.get(API_URL).then(res=>{
      setTableData(res?.data)
      setTableHeaders(Object.keys(res?.data[0]))
      setLoading(false)
     })
     .catch(err=>{
      console.error(`Error Fetching data: `, err)
     });
  },[filter]);

  const handleWeekClick = ()=>{
    setFilter('workflows');
    setChartData(mockData.chartDataWeek);
  }

  const handleMonthClick = ()=>{
    setFilter('users');
    setChartData(mockData.chartDataMonth);
  }
  const handleYearClick = ()=>{
    setFilter('workflow_tasks');
    setChartData(mockData.chartDataYear);
  }
  
  const getHighlightedClass = (elementName:string)=>{
    const normal = "list-group-item btn btn-sm btn-warning me-3 float-end";
    const highlight = "list-group-item btn btn-sm btn-light-warning me-3 float-end"

    switch(filter){
      case 'workflows':
        return (elementName === "Week") ? highlight : normal;
      case 'users':
        return (elementName === "Month") ? highlight : normal;
      case 'workflow_tasks':
        return (elementName === "Year") ? highlight : normal;
      default:
        return normal
    }
  }
  
  return (
    <>
      <div className="d-flex flex-row mb-5">
      <div className="col-xl-3">
      <h3 className="float-start">Workflows</h3>
      </div>
      <div className="col-xl-9">
        <ul className="list-group float-end list-group-horizontal">
          <li className={getHighlightedClass("Week")} onClick={handleWeekClick}>
            <span className="text-white">Week</span> 
          </li>
          <li className={getHighlightedClass("Month")}  onClick={handleMonthClick}>
            <span className="text-white">Month</span> 
          </li>
          <li className={getHighlightedClass("Year")}  onClick={handleYearClick}>
            <span className="text-white">Year</span> 
          </li>
        </ul>
        </div>
      </div>
      {/*begin::Row*/}
      <div className="row g-0 g-xl-5 g-xxl-8">
        <PageDataContainer />

        <div className="col-xl-4">
          <StatsWidget1 className="card-stretch mb-5 mb-xxl-8" />
        </div>

        <div className="col-xl-8">
          <div className="card">
            <Chart
              className="card-body pb-3 card-stretch mt-3 mb-0 mb-xxl-8"
              options={chartData.options}
              series={chartData.series}
              type="line"
              width="100%"
              height="346"
            />
          </div>
        </div>
      </div>
      {/*end::Row*/}

      {/*begin::Row*/}
      <div className="row g-0 g-xl-5 g-xxl-8">
        <div className="col-xl-12">
          {!loading && (
            <DataTable1
              className="card-stretch"
              entity={filter}
              tableData={tableData}
              tableHeaders={tableHeaders}
            />
          )}
          {loading && (
            <span
              className="indicator-progress text-center mt-5 mb-5"
              style={{ display: "block" }}
            >
              <h5 className="text-center mt-5">
                {" "}
                Fetching data. Please wait...{" "}
              </h5>
              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          )}
        </div>
      </div>
      {/*end::Row*/}

      {/*begin::Row*/}
      {/* <div className="row g-0 g-xl-5 g-xxl-8">
        <div className="col-xl-12">
          <DataTable className="card-stretch" entity="projects" />
        </div>
      </div> */}
      {/*end::Row*/}
    </>
  );
};
