import React, { useEffect, useState } from 'react';
import { FaUserInjured, FaUserMd, FaCalendarCheck, FaUserCheck } from 'react-icons/fa';
import { getPatients, getDoctors, getAvailableDoctors, getTodaysAppointments } from '../utils/storage';
import LoadingSpinner from './LoadingSpinner';

const DashboardStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStats = () => {
      try {
        setLoading(true);
        setError(null);
        
        const patients = getPatients();
        const doctors = getDoctors();
        const availableDoctors = getAvailableDoctors();
        const todaysAppointments = getTodaysAppointments();

        setStats({
          totalPatients: patients.length,
          totalDoctors: doctors.length,
          availableDoctors: availableDoctors.length,
          todaysAppointments: todaysAppointments.length,
        });
      } catch (err) {
        setError('Failed to load dashboard statistics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-2xl p-6 flex items-center justify-center h-32 border border-gray-100 shadow-sm">
            <LoadingSpinner size="sm" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 font-medium">
        {error}
      </div>
    );
  }

  const cards = [
    {
      title: 'Total Patients',
      value: stats.totalPatients,
      icon: FaUserInjured,
      lightColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      // Только левая граница
      borderStyle: 'border-l-4 border-l-blue-500' 
    },
    {
      title: 'Total Doctors',
      value: stats.totalDoctors,
      icon: FaUserMd,
      lightColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      // Только левая граница
      borderStyle: 'border-l-4 border-l-emerald-500'
    },
    {
      title: "Today's Appointments",
      value: stats.todaysAppointments,
      icon: FaCalendarCheck,
      lightColor: 'bg-amber-50',
      textColor: 'text-amber-600',
      // Только левая граница
      borderStyle: 'border-l-4 border-l-amber-500'
    },
    {
      title: 'Available Doctors',
      value: stats.availableDoctors,
      icon: FaUserCheck,
      lightColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      // ПОЛНАЯ ГРАНИЦА, как на скриншоте image_58ee25.png
      borderStyle: 'border-l-4 border-l-purple-500'
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className={`bg-white p-6 flex items-center gap-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-2xl shadow-sm ${card.borderStyle} ${index !== 3 ? 'border-y border-r border-gray-100' : ''}`}
          >
            <div className={`${card.lightColor} p-4 rounded-2xl flex-shrink-0`}>
              <Icon className={`text-2xl ${card.textColor}`} />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                {card.title}
              </p>
              <p className="text-3xl font-black text-gray-900 mt-1">
                {card.value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;