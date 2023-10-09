/* eslint-disable jsx-a11y/anchor-is-valid */
import React,  {useEffect, useState} from "react";
import { PageDataContainer } from "../../../../_start/layout/core";
import { TotalDurationWidget } from "../../../../_start/partials/widgets/stats/TotalDurationChartWidget";
import { TasksChartWidget } from "../../../../_start/partials/widgets/stats/TasksChartWidget";
import { DurationsChartWidget } from "../../../../_start/partials/widgets/stats/DurationsChartWidget";
import { RollingTrendsChartWidget } from "../../../../_start/partials/widgets/stats/RollingTrendsChartWidget";
import AgentsRosterTable from "../../../../_start/partials/widgets/tables/AgentsRosterTable";
import JobsTable from "../../../../_start/partials/widgets/tables/JobsTable";
import * as Utils from "../../../../app/utils/utilites";

export const AnalyticsPage: React.FC = () => {

  const [filter, setFilter] = useState('projects');

  let [drillDownLevel, setDrillDownLevel] = useState("projects");
  let [filterCode, setFilterCode] = useState("");
  let [filterTime, setFilterTime] = useState("c1w");
  const [changeParams, setChangeParams] = useState({drillDownLevel, filterCode, filterTime});
  const [breadCrum, setBreadCrum] = useState(Utils.sentenceCase(drillDownLevel))

  const handleDrillDownChange = (changedDrillDownLevel:string, changedFilterCode:string) => {
    setDrillDownLevel(changedDrillDownLevel);
    setFilterCode(changedFilterCode);
    setFilterTime(filterTime);
    if (changedDrillDownLevel === "projects")
      setBreadCrum(Utils.sentenceCase(changedDrillDownLevel));
    else
      setBreadCrum(`${breadCrum}(${changedFilterCode}) / ${Utils.sentenceCase(changedDrillDownLevel)}`);
  }

  useEffect(()=>{
    setChangeParams({
      drillDownLevel,
      filterCode,
      filterTime
    })
  }, [filterCode, filterTime])

  const handleWeekClick = ()=>{
    setFilterTime('c1w');
  }
  const handleMonthClick = ()=>{
    setFilterTime('c1m');
  }
  const handleYearClick = ()=>{
    setFilterTime('pyr');
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
      <div className="col-xl-9">
      <h4 className="float-start"> {breadCrum} </h4>
      </div>
      <div className="col-xl-3">
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

        <div className="col-xl-6">
          <TotalDurationWidget className="card-body pb-3 card-stretch mt-3 mb-0 mb-xxl-8" fn_drillDownChanger={handleDrillDownChange} changeParams={changeParams}/>
        </div>

        <div className="col-xl-3">
          <TasksChartWidget className="card-body pb-3 card-stretch mt-3 mb-0 mb-xxl-8" changeParams={changeParams}/>
        </div>

        <div className="col-xl-3">
          <DurationsChartWidget className="card-body pb-3 card-stretch mt-3 mb-0 mb-xxl-8" changeParams={changeParams}/>
        </div>
      </div>
      {/*end::Row*/}
      
      {/*begin::Row*/}
      <div className="row g-0 g-xl-5 g-xxl-8">
      <div className="col-xl-12">
          <RollingTrendsChartWidget className="card-body pb-3 card-stretch mt-2 mb-0 mb-xxl-8" changeParams={changeParams}/>
        </div>
      </div>
      {/*end::Row*/}
      {/*begin::Row*/}
      <div className="row g-0 g-xl-5 g-xxl-8">
        <div className="col-xl-12">
            <JobsTable className="card-stretch pb-3 card-stretch mt-2 mb-0 mb-xxl-8"/>
        </div>
      </div>
      {/*end::Row*/}
      {/*begin::Row*/}
      <div className="row g-0 g-xl-5 g-xxl-8">
        <div className="col-xl-12">
            <AgentsRosterTable className="card-stretch pb-3 card-stretch mt-2 mb-0 mb-xxl-8"/>
        </div>
      </div>
      {/*end::Row*/}

    </>
  );
};
