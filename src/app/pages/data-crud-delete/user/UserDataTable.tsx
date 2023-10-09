/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from "react";
import { KTSVG } from "../../../../_start/helpers";
import axios, {AxiosResponse} from "axios";
import { Link } from "react-router-dom";


type Props = {
  className: string;
  innerPadding?: string;
  color?: string;
};

const getWorkFlows = async (): Promise<any[]> =>{
    const config = {
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        }
    }
    const data =  {
        "report_code": "tbl_workflows",
        "flt_projects": 3   
    }
    try{
        const response: AxiosResponse<any[]> = await axios.post('https://coe-project001.uc.r.appspot.com/portal/datatable',data, config)
        return response.data
    } catch (err){
        console.error("Axios Error: ", err)
        return []
    }
}

const getUsers = async (): Promise<any[]> =>{
  const URL = process.env.REACT_APP_API_URL+'users'
  const params = '?email=rvanamala@vaco.com'
  console.log("API URRL: ", URL)
  const config = {
      headers: {
          "Content-Type": "application/json;charset=UTF-8"
      },
      xhrFields : true,
      crossDomain: true
  }
  const data =  {
      "report_code": "tbl_workflows",
      "flt_projects": 3   
  }
  try{
      const response: AxiosResponse<any[]> = await axios.get(URL, config);
      console.log("DATA", response.data)
      return response.data
  } catch (err){
      console.error("Axios Error: ", err)
      return []
  }
}
const UserDataTable: React.FC<Props> = ({
  className,
  innerPadding = "",
  color = "primary",
}) => {
    const [resultList, setResultList] = useState<any[]>([]) //<AxiosResponse | null | void>(null);
    const [tableHeading, setTableHeading] = useState('');
    const [headers, setHeaders] = useState<any[]>([])
    useEffect(()=>{
           getUsers().then(res=>{
            setTableHeading('Users')
            setResultList(res)
            setHeaders(Object.keys(res[0]))
           });
    },[]);
    
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className="card-header border-0 py-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bolder text-dark">{tableHeading}</span>
          <span className="text-muted mt-3 fw-bold fs-7">
            {resultList.length} {tableHeading}
          </span>
        </h3>
        <div className="card-toolbar">
          <Link to="/add-user" className="btn btn-primary fw-bolder fs-7">
            ADD {tableHeading.toUpperCase()}
          </Link>
        </div>
      </div>
      {/* end::Header*/}

      {/* begin::Body*/}

      <div className="card-body py-0">
        {/* begin::Table*/}
        {resultList.length == 0 ? (
          <div className="d-flex bg-dark bg-opacity-5 align-items-center justify-content-center h-100">
            <br/>
            <div
              className="d-flex spinner-border text-primary align-items-center"
              role="status"
            ></div>
          </div>
        ) : (
          <div className="table-responsive">
            <table
              className="table align-middle border-gray-100"
              id="kt_advance_table_widget_4"
            >
              <thead>
                <tr className="text-start text-muted fw-bolder text-gray-400 text-uppercase fs-7 border-gray-100 border-bottom-1">
                  <td>
                    <div className="form-check form-check-custom form-check-sm form-check-solid me-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="0"
                      />
                    </div>
                  </td>
                  {headers.map((item, key) => {
                    return (
                      <td id={key.toString()} className="ps-0 min-w-30px py-5">
                        {item}
                      </td>
                    );
                  })}
                  <td className="min-w-10px pe-0 text-end py-5">Action</td>

                  {/*
                        <td className="ps-0 min-w-250px py-5">{item[0]}</td>
                        <td className="ps-0 min-w-250px py-5">Order id</td>
                        <td className="min-w-100px py-5">Country</td>
                        <td className="min-w-100px py-5">
                        <span className={`text-${color}`}>Date</span>
                        <KTSVG
                            className={`svg-icon-sm svg-icon-${color}`}
                            path="/media/icons/duotone/Navigation/Down-2.svg"
                        />
                        </td>
                        <td className="min-w-100px py-5">Status</td>
                        <td className="min-w-100px pe-0 text-end py-5">Action</td> */}
                </tr>
              </thead>
              <tbody>
                {resultList.map((item, key) => {
                  return (
                    <tr id={key.toString()}>
                      <td>
                        <div className="form-check form-check-custom form-check-sm form-check-solid me-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="0"
                          />
                        </div>
                      </td>
                      {headers.map((header_key, key) => {
                        return (
                          <td id={key.toString()}>
                            {item[header_key] || "--"}
                          </td>
                        );
                      })}
                      <td className="pe-0 text-end">
                        <a
                          href="#"
                          className="btn btn-icon btn-bg-light  btn-color-muted btn-active-color-primary btn-sm mx-3"
                        >
                          <KTSVG
                            className="svg-icon-4"
                            path="/media/icons/duotone/Communication/Write.svg"
                          />
                        </a>
                        <a
                          href="#"
                          className="btn btn-icon btn-bg-light  btn-color-muted btn-active-color-primary btn-sm"
                        >
                          <KTSVG
                            className="svg-icon-4"
                            path="/media/icons/duotone/General/Trash.svg"
                          />
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {/* end::Table*/}
      </div>

      {/* end::Body*/}
    </div>
  );
};

export { UserDataTable };
