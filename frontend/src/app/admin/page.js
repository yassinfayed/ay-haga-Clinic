"use client"
import React from 'react';
import Head from 'next/head';

const AdminDashboard = () => {
  // Dummy data
  const totalUsers = 1000;
  const totalDoctors = 250;
  const appointmentsToday = 25;
  const outstandingAmounts = 15000;
  const paidAmounts = 7500;

  // Dummy patient reports
  const patientReports = [
    {
      patientName: 'John Doe',
      condition: 'Fever',
      reportDate: '2023-01-15',
    },
    {
      patientName: 'Alice Smith',
      condition: 'Headache',
      reportDate: '2023-01-16',
    },
    // Add more patient reports as needed
  ];

  return (
    <div className="container-fluid">
      <div className="row">
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <h3 className='my-3 mb-5 text-title'>Dashboard</h3>
          <div className="row">
            <div className="col-md-3">
              <div className="card bg-light mb-4">
                <div className="card-body">
                  <h5 className="card-title">Total Users</h5>
                  <p className="card-text">{totalUsers}</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-light mb-4">
                <div className="card-body">
                  <h5 className="card-title">Total Doctors</h5>
                  <p className="card-text">{totalDoctors}</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-light mb-4">
                <div className="card-body">
                  <h5 className="card-title">Appointments Today</h5>
                  <p className="card-text">{appointmentsToday}</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-light mb-4">
                <div className="card-body">
                  <h5 className="card-title">Outstanding Amounts</h5>
                  <p className="card-text">${outstandingAmounts}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="card bg-light mb-4">
                <div className="card-body">
                  <h5 className="card-title">Paid Amounts</h5>
                  <p className="card-text">${paidAmounts}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card bg-light mb-4">
                <div className="card-body">
                  <h5 className="card-title">Patient Reports</h5>
                  <ul className="list-group">
                    {patientReports.map((report, index) => (
                      <li key={index} className="list-group-item">
                        <strong>{report.patientName}</strong> - {report.condition}
                        <br />
                        Report Date: {report.reportDate}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

