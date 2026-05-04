import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaCalendarAlt, FaUserInjured, FaUserMd, FaClock } from 'react-icons/fa';
import DashboardStats from '../components/DashboardStats';
import { getTodaysAppointments, getPatients, getDoctors } from '../utils/storage';

const Dashboard = () => {
  const todaysAppointments = getTodaysAppointments();
  const recentPatients = getPatients().slice(-5).reverse();
  const availableDoctors = getDoctors().filter((d) => d.isAvailable).slice(0, 4);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Dashboard</h1>
        <p className="text-gray-500 font-medium">IDU Hospital Management System | 2026</p>
      </div>

      {/* Stats Cards */}
      <DashboardStats />

      {/* Main Grid: Appointments & Patients */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Block: Today's Appointments - ORANGE THEME */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
                <FaCalendarAlt />
              </div>
              <h2 className="text-lg font-bold text-gray-900 tracking-tight">Today's Appointments</h2>
            </div>
            <Link
              to="/appointments"
              className="text-xs font-black text-amber-600 hover:text-amber-700 uppercase tracking-wider flex items-center gap-1 transition-colors"
            >
              View All <FaArrowRight className="text-[10px]" />
            </Link>
          </div>
          
          <div className="divide-y divide-gray-50 flex-1">
            {todaysAppointments.length === 0 ? (
              <div className="px-6 py-12 text-center text-gray-400 font-medium">
                No appointments scheduled for today.
              </div>
            ) : (
              todaysAppointments.map((apt) => (
                <div key={apt.id} className="px-6 py-4 flex items-center justify-between hover:bg-amber-50/30 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-lg shadow-amber-100 group-hover:scale-110 transition-transform flex-shrink-0">
                      {apt.patientName ? apt.patientName.charAt(1) : 'P'} 
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 group-hover:text-amber-700 transition-colors">
                        {apt.patientName}
                      </p>
                      <p className="text-[11px] text-gray-500 font-bold uppercase tracking-tight">
                        with <span className="text-gray-700">{apt.doctorName}</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black bg-amber-50 text-amber-700 border border-amber-100 uppercase">
                      <FaClock className="text-[10px]" /> {apt.time}
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1 font-bold uppercase tracking-tighter italic">
                      {apt.reason}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Block: Recent Patients - EMERALD THEME */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                <FaUserInjured />
              </div>
              <h2 className="text-lg font-bold text-gray-900 tracking-tight">Recent Patients</h2>
            </div>
            <Link
              to="/patients"
              className="text-xs font-black text-emerald-600 hover:text-emerald-700 uppercase tracking-wider flex items-center gap-1 transition-colors"
            >
              View All <FaArrowRight className="text-[10px]" />
            </Link>
          </div>
          
          <div className="divide-y divide-gray-50 flex-1">
            {recentPatients.length === 0 ? (
              <div className="px-6 py-12 text-center text-gray-400 font-medium">
                No patients registered yet.
              </div>
            ) : (
              recentPatients.map((patient) => (
                <div key={patient.id} className="px-6 py-4 flex items-center justify-between hover:bg-emerald-50/30 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold group-hover:bg-emerald-600 group-hover:text-white transition-all">
                      {patient.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{patient.name}</p>
                      <p className="text-[11px] text-gray-400 font-medium tracking-tight">{patient.phone}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-lg bg-gray-100 text-gray-600 text-[10px] font-black uppercase">
                    {patient.age} yrs
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Block: Available Doctors - PURPLE THEME */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
              <FaUserMd />
            </div>
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">Available Doctors</h2>
          </div>
          <Link
            to="/doctors"
            className="text-xs font-black text-blue-600 hover:text-blue-700 uppercase tracking-wider flex items-center gap-1 transition-colors"
          >
            Directory <FaArrowRight className="text-[10px]" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-50">
          {availableDoctors.length === 0 ? (
            <div className="col-span-full px-6 py-12 text-center text-gray-400 font-medium">
              No doctors available at the moment.
            </div>
          ) : (
            availableDoctors.map((doctor) => (
              <div key={doctor.id} className="px-6 py-6 hover:bg-purple-50/20 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl font-bold mb-4 group-hover:scale-110 transition-transform shadow-inner flex-shrink-0">
                  {doctor.name ? doctor.name.charAt(4) : 'D'}
                </div>
                <p className="font-bold text-gray-900 truncate">{doctor.name}</p>
                <p className="text-[10px] font-black text-blue-600 uppercase mt-1 tracking-wider">{doctor.specialization}</p>
                <div className="mt-4 pt-4 border-t border-gray-50">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{doctor.phone}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;