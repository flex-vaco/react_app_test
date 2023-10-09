/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import ApexCharts, { ApexOptions } from "apexcharts";
import { KTSVG, toAbsoluteUrl } from "../../../helpers";
import { Dropdown2 } from "../../content/dropdown/Dropdown2";
import { getCSSVariableValue } from "../../../assets/ts/_utils";
import moment from "moment";
import * as Utils from "../../../../app/utils/utilites";

type Props = {
  className: string;
  innerPadding?: string;
  changeParams: any;
};

const RollingTrendsChartWidget: React.FC<Props> = ({ className, innerPadding = "", changeParams }) => {
  const [activeTab, setActiveTab] = useState("#rolling_trend");
  const [activeChart, setActiveChart] = useState<ApexCharts | undefined>();
  const [series, setSeries] = useState([]);
  const [xCategories, setXCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  let rpt_cd = changeParams.drillDownLevel;
  let flt_prj = changeParams.filterCode;
  let flt_time = changeParams.filterTime;
  // Temp ------------------ to be removed after type fix in API - from worklows to workflows (the missing 'f')
  if ( rpt_cd === 'workflows') {
    rpt_cd = 'cht_worklows_trend_qty';
  } else {
    rpt_cd = `cht_${changeParams.drillDownLevel}_trend_qty`;
  }
  //------------------------------------------------------ Temp ------------------------------------------------------
  useEffect(()=>{
    setLoading(true)
    fetch('https://coe-project001.uc.r.appspot.com/portal/datachart', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
        "report_code": rpt_cd,
        "flt_projects": flt_prj,
        "flt_time": flt_time
      })
		})
    .then(response => response.json())
    .then(data => {
      const ser:any =  []
      let cats:any = []
      data.filter((i:any)=> i.project_code !== null).map((i:any)=>{
        ser.push({name: Object.values(i).shift(), data: Object.values(i).slice(2, Object.values(i).length)});
        cats = Object.keys(i).splice(1, Object.keys(i).length);
      })
      setSeries(ser);
      setXCategories(cats.map((i:any) => moment(i).format('MM/DD')));
      setLoading(false);
    })
    .catch(error => console.error(error));
  }, [rpt_cd, flt_prj, flt_time])

  useEffect(() => {
    setTab(2);
  }, [loading]);

  const setTab = (tabNumber: number) => {
    setActiveTab(`#tab${tabNumber}`);

    const element = document.querySelector(
      `#tab${tabNumber}_chart`
    ) as HTMLElement;
    if (!element) {
      return;
    }

    const height = 350//parseInt(getCss(element, "height"));
    const chart = new ApexCharts(element, getChartOptions(height, series, xCategories));
    chart.render();
    setActiveChart(chart);
  };

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className="card-header align-items-center border-0 mt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="fw-bolder text-dark fs-3">Rolling Trends</span>
          <span className="text-muted mt-2 fw-bold fs-6">Each element is shown for the date range specified</span>
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
      <div className="card-body pt-0">
        <div className="d-flex flex-wrap flex-xxl-nowrap justify-content-center justify-content-md-start pt-4">

          {/* begin::Tab Content */}
          <div className="tab-content flex-grow-1" // style={{ paddingLeft: "0.23rem !important" }}
          >
            {/* begin::Tab Pane 1 */}
            <div
              className={`tab-pane fade ${
                activeTab === "#tab2" ? "show active" : ""
              }`}
              id="tab2_content"
            >
              {/* begin::Chart */}
              <div id="tab2_chart" style={{ height: "270px" }} />
              {/* end::Chart      */}
            {/* end::Tab Pane 1 */}
              </div>
          </div>
          {/* end::Tab Content */}
        </div>
      </div>
      }
      {/* end: Card Body */}
    </div>
  );
};

export { RollingTrendsChartWidget };

function getChartOptions(
  height: string | number | undefined,
  series: any,
  categories: any
): ApexOptions {
  return {
    series: series,
    chart: {
      fontFamily: "inherit",
      height: height,
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          colors: getCSSVariableValue("--bs-gray-700"),
          fontSize: "10px",
        },
      }
    },
    stroke: {
      show: true,
      width: 3,
    },
    colors: Utils.getChartColors(),
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
