/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import Chart, { ChartConfiguration } from "chart.js";
import { getCSSVariableValue } from "../../../assets/ts/_utils";
import { KTSVG, toAbsoluteUrl } from "../../../helpers";
import { Dropdown1 } from "../../content/dropdown/Dropdown1";
import * as Utils from "../../../../app/utils/utilites";

type Props = {
  className: string;
  innerPadding?: string;
  changeParams: any;
};

const TasksChartWidget: React.FC<Props> = ({ className, innerPadding = "",  changeParams}) => {
  const [chartData, setChartData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(false);
  let rpt_cd = changeParams.drillDownLevel;
  let flt_prj = changeParams.filterCode;
  let flt_time = changeParams.filterTime;

  useEffect(()=>{
    setLoading(true)
    fetch('https://coe-project001.uc.r.appspot.com/portal/datachart', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
        "report_code": `cht_${rpt_cd}_qty`,
        "flt_projects": flt_prj,
        "flt_time": flt_time
      })
		})
    .then(response => response.json())
    .then(data => {
      setChartData(data.map((i:any)=>i.y));
      setLabels(data.map((i:any)=> i.x));
      setLoading(false);
    })
    .catch(error => console.error(error));
  }, [rpt_cd, flt_prj, flt_time])

  useEffect(() => {
    const element = document.getElementById(
      "tasks_chart_widget"
    ) as HTMLCanvasElement;
    if (!element) {
      return;
    }

    const options = getChartOptions(chartData, labels);
    const ctx = element.getContext("2d");
    let myDoughnut: Chart | null;
    if (ctx) {
      myDoughnut = new Chart(ctx, options);
    }
    return function cleanUp() {
      if (myDoughnut) {
        myDoughnut.destroy();
      }
    };
  }, [loading]);

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div
        className={`card-header align-items-center border-0 mt-5 ${innerPadding}`}
      >
        <h3 className="card-title align-items-start flex-column">
          <span className="fw-bolder text-dark fs-3">No. of Tasks</span>
          <span className="text-muted mt-2 fw-bold fs-6">Total Number of Tasks</span>
        </h3>
        <div className="card-toolbar">
          {/* begin::Dropdown */}
          <button
            type="button"
            className="btn btn-sm btn-icon btn-color-primary btn-active-light-primary"
            data-kt-menu-trigger="click"
            data-kt-menu-placement="bottom-end"
            data-kt-menu-flip="top-end"
            disabled
          >
            <KTSVG
              path="/media/icons/duotone/Layout/Layout-4-blocks-2.svg"
              className="svg-icon-1"
            />
          </button>
          <Dropdown1 />
          {/* end::Dropdown */}
        </div>
      </div>
      {/* end::Header */}

      {/* begin::Body */}
      {loading && (
            <h3 className="indicator-progress text-center mt-20 text-muted" style={{ display: "block" }}>          
              Fetching data. <br /> Please wait...{" "}
              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
            </h3>
      )}
      {!loading && 
      <div className="card-body pt-12">
        {/* begin::Chart */}
        <div
          className="d-flex flex-center position-relative bgi-no-repeat bgi-size-contain bgi-position-x-center bgi-position-y-center h-175px"
        >
          {/* <div className="fw-bolder fs-1 text-gray-800 position-absolute">
            8,345
          </div> */}
          <canvas id="tasks_chart_widget"></canvas>
        </div>
        {/* end::Chart */}

      </div>
      }
      {/* end: Card Body */}
    </div>
  );
};

export { TasksChartWidget };

function getChartOptions(data:any, labels:any) {
  const tooltipBgColor = getCSSVariableValue("--bs-light-primary");
  const tooltipColor = getCSSVariableValue("--bs-primary");
  const colorsList = Utils.getChartColors();

  const options: ChartConfiguration = {
    type: "pie",
    data: {
      datasets: [
        {
          data: data, //API DATA
          backgroundColor: colorsList.slice(0, labels.length),
        },
      ],
      labels: labels, //from API 
    },
    options: {
      cutoutPercentage: 3, 
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false,
        position: "top",
      },
      title: {
        display: false,
        text: "Technology",
      },
      animation: {
        animateScale: true,
        animateRotate: true,
      },
      tooltips: {
        enabled: true,
        intersect: false,
        mode: "nearest",
        bodySpacing: 5,
        yPadding: 10,
        xPadding: 10,
        caretPadding: 0,
        displayColors: false,
        backgroundColor: tooltipBgColor,
        bodyFontColor: tooltipColor,
        cornerRadius: 4,
        footerSpacing: 0,
        titleSpacing: 0,
      },
    },
  };
  return options;
}

// function randomScalingFactor() {
//   return Math.round(Math.random() * 100);
// }
