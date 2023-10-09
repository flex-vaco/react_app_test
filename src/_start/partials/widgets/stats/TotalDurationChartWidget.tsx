/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import ApexCharts, { ApexOptions } from "apexcharts";
import { KTSVG, toAbsoluteUrl } from "../../../helpers";
import { Dropdown2 } from "../../content/dropdown/Dropdown2";
import { getCSSVariableValue } from "../../../assets/ts/_utils";

type Props = {
  className: string;
  innerPadding?: string;
  fn_drillDownChanger: any;
  changeParams: any;
};

const TotalDurationWidget: React.FC<Props> = ({ className, innerPadding = "", fn_drillDownChanger, changeParams }) => {
  const [activeTab, setActiveTab] = useState("#tab1");
  const [activeChart, setActiveChart] = useState<ApexCharts | undefined>();
  const [chartData, setChartData] = useState([]);
  const [drillDownLevel, setDrillDownLevel] = useState("projects");
  const [filterCode, setFilterCode] = useState("");
  const [xCategories, setXCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleBarChartClick = (barName:string = "")=>{
		switch(drillDownLevel) {
			case("projects"):    
        setDrillDownLevel("workflows");
        setFilterCode(barName);
        fn_drillDownChanger("workflows", barName);
      break;
      case("workflows"):    
        setDrillDownLevel("tasks");
        setFilterCode(barName);
        fn_drillDownChanger("tasks", barName);
      break;
      case("tasks"):    
        setDrillDownLevel("jobs");
        setFilterCode(barName);
        fn_drillDownChanger("jobs", barName);
      break;
      default:
        setDrillDownLevel("projects");
        setFilterCode("");
        fn_drillDownChanger("projects", barName);
      return;
    }

  }

  useEffect(()=>{
    setLoading(true)
    fetch('https://coe-project001.uc.r.appspot.com/portal/datachart', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
        "report_code": `cht_${drillDownLevel}_bar`,
        "flt_projects": filterCode,
        "flt_time": changeParams.filterTime
      })
		})
    .then(response => response.json())
    .then(data => {
      // console.log(data.map((i:any)=> i.x));
      setChartData(data.map((i:any)=>i.y));
      setXCategories(data.map((i:any)=> i.x));
      setLoading(false);
    })
    .catch(error => console.error(error));
  }, [filterCode, changeParams.filterTime])

  useEffect(() => {
    setTab(1);
    return function cleanUp() {
      if (activeChart) {
        activeChart.destroy();
      }
    };
  }, [loading]);

  const setTab = (tabNumber: number) => {
    setActiveTab(`#tab${tabNumber}`);
    if (activeChart) {
      activeChart.destroy();
    }

    const element = document.querySelector(
      `#tab${tabNumber}_chart`
    ) as HTMLElement;
    if (!element) {
      return;
    }

    const height = parseInt(getCss(element, "height"));
    const chart = new ApexCharts(element, getChartOptions(tabNumber, height, xCategories, chartData, handleBarChartClick));
    chart.render();
    setActiveChart(chart);
  };

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className="card-header align-items-center border-0 mt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="fw-bolder text-dark fs-3">Total Duration (Hours)</span>
          <span className="text-muted mt-2 fw-bold fs-6">Total duration of tasks completed in hours</span>
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
              className="svg-icon-1"
              path="/media/icons/duotone/Layout/Layout-4-blocks-2.svg"
            />
          </button>
          <Dropdown2 />
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
      // (!loading && chartData.length === 0) ?
      //   <h3 className="indicator-progress text-center mt-20 text-dark" style={{ display: "block" }}>          
      //     Data not found!
      //   </h3> 
      // :
      <div className="card-body pt-0">
        <div className="d-flex flex-wrap flex-xxl-nowrap justify-content-center justify-content-md-start pt-4">

          {/* begin::Tab Content */}
          <div className="tab-content flex-grow-1" // style={{ paddingLeft: "0.23rem !important" }}
          >
            {/* begin::Tab Pane 1 */}
            <div
              className={`tab-pane fade ${
                activeTab === "#tab1" ? "show active" : ""
              }`}
              id="tab1_content"
            >
              {/* begin::Chart */}
              <div id="tab1_chart" style={{ height: "270px" }} />
              {/* end::Chart      */}
            </div>
            {/* end::Tab Pane 1 */}

          </div>
          {/* end::Tab Content */}
        </div>
      </div>
      }   
      {/* end: Card Body */}
    </div>
  );
};

export { TotalDurationWidget };

function getChartOptions(
  tabNumber: number,
  height: string | number | undefined,
  categories: any,
  data: any,
  clickEventHandler: any
): ApexOptions {
  return {
    series: [
      {
        name: "Hours",
        data: data,
      },
    ],
    chart: {
      fontFamily: "inherit",
      type: "bar",
      height: height,
      toolbar: {
        show: false,
      },
      events: {
        click(event, chartContext, config) {
          console.log(categories[config.dataPointIndex])
          clickEventHandler(categories[config.dataPointIndex])
        }
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        columnWidth: "30%",
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: getCSSVariableValue("--bs-gray-700"),
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: getCSSVariableValue("--bs-gray-700"),
          fontSize: "12px",
        },
      },
    },
    fill: {
      opacity: 1,
    },
    states: {
      normal: {
        filter: {
          type: "none",
          value: 0,
        },
      },
      hover: {
        filter: {
          type: "none",
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: "none",
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: "12px",
      },
      y: {
        formatter: function (val: number) {
          return val.toString(); //`$${val} thousands`;
        },
      },
    },
    colors: [
      getCSSVariableValue("--bs-light-warning"),
    ],
    grid: {
      borderColor: getCSSVariableValue("--bs-gray-200"),
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
  };
}

function getCss(el: HTMLElement, styleProp: string) {
  const defaultView = (el.ownerDocument || document).defaultView;
  if (!defaultView) {
    return "";
  }

  // sanitize property name to css notation
  // (hyphen separated words eg. font-Size)
  styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
  return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
}
