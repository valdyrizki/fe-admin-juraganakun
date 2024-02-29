import React, { useEffect } from "react";
import ContentHeader from "../../Component/ContentHeader";
import { decimalFormatter } from "../../Component/Helpers";
import { useDispatch, useSelector } from "react-redux";
import { getDashboard } from "../../actions/dashboardAction";
import Spinner from "../loading";

function Dashboard(props) {
  const dispatch = useDispatch();

  const {
    getDashboardResult,
    getDashboardError,
    getDashboardLoading,
  } = useSelector((state) => state.DashboardReducer);

  useEffect(() => {
    dispatch(getDashboard());
  }, []);

  return (
    <div className="content-wrapper">
      <ContentHeader title="Dashboard" parentTitle="Home" />

      <section className="content">
        <div className="container-fluid">
          {getDashboardResult ? (
            <>
              <div className="row">
                <div className="col-lg-3 col-6">
                  <div className="small-box bg-success">
                    <div className="inner">
                      <h3>
                        <sup style={{ fontSize: "20px" }}>Rp</sup>
                        {decimalFormatter(
                          getDashboardResult.data.todays_income
                        )}
                      </h3>
                      <p>Today's Income</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-cash"></i>
                    </div>
                    <a href="/#" className="small-box-footer">
                      More info <i className="fas fa-arrow-circle-right"></i>
                    </a>
                  </div>
                </div>
                <div className="col-lg-3 col-6">
                  <div className="small-box bg-info">
                    <div className="inner">
                      <h3>{getDashboardResult.data.complete_order}</h3>
                      <p>Complete Orders</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-checkmark"></i>
                    </div>
                    <a href="/#" className="small-box-footer">
                      More info <i className="fas fa-arrow-circle-right"></i>
                    </a>
                  </div>
                </div>
                <div className="col-lg-3 col-6">
                  <div className="small-box bg-warning">
                    <div className="inner">
                      <h3>{getDashboardResult.data.pending_order}</h3>
                      <p>Pending Order</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-alert"></i>
                    </div>
                    <a href="/#" className="small-box-footer">
                      More info <i className="fas fa-arrow-circle-right"></i>
                    </a>
                  </div>
                </div>
                <div className="col-lg-3 col-6">
                  <div className="small-box bg-danger">
                    <div className="inner">
                      <h3>{getDashboardResult.data.cancel_order}</h3>
                      <p>Cancel Order</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-close"></i>
                    </div>
                    <a href="/#" className="small-box-footer">
                      More info <i className="fas fa-arrow-circle-right"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-3 col-6">
                  <div className="small-box bg-success bg-gradient">
                    <div className="inner">
                      <h3>
                        <sup style={{ fontSize: "20px" }}>Rp</sup>
                        {decimalFormatter(getDashboardResult.data.total_asset)}
                      </h3>
                      <p>Total's Asset</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-cash"></i>
                    </div>
                    <a href="/#" className="small-box-footer">
                      More info <i className="fas fa-arrow-circle-right"></i>
                    </a>
                  </div>
                </div>
                <div className="col-lg-3 col-6">
                  <div className="small-box bg-info">
                    <div className="inner">
                      <h3>{getDashboardResult.data.total_order}</h3>
                      <p>Total Orders</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-bag"></i>
                    </div>
                    <a href="/#" className="small-box-footer">
                      More info <i className="fas fa-arrow-circle-right"></i>
                    </a>
                  </div>
                </div>
                <div className="col-lg-3 col-6">
                  <div className="small-box bg-light">
                    <div className="inner">
                      <h3>{getDashboardResult.data.total_user}</h3>
                      <p>Total User</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-person-add"></i>
                    </div>
                    <a href="/#" className="small-box-footer">
                      More info <i className="fas fa-arrow-circle-right"></i>
                    </a>
                  </div>
                </div>
                <div className="col-lg-3 col-6">
                  <div className="small-box bg-danger">
                    <div className="inner">
                      <h3>
                        <sup style={{ fontSize: "20px" }}>Rp</sup>0
                      </h3>
                      <p>Total Expense</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-log-out"></i>
                    </div>
                    <a href="/#" className="small-box-footer">
                      More info <i className="fas fa-arrow-circle-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </>
          ) : getDashboardLoading ? (
            <Spinner />
          ) : (
            <p>{getDashboardError}</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
