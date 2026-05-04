import React, { useState, useEffect } from 'react';
import { FaCalendarPlus, FaClipboardList, FaCalendarCheck, FaClock } from 'react-icons/fa';
import AppointmentForm from '../components/AppointmentForm';
import { getAppointments } from '../utils/storage';

const Appointments = () => {
  const [activeTab, setActiveTab] = useState('schedule');
  const [appointments, setAppointments] = useState([]);

  // Функция обновления списка из LocalStorage
  const refreshList = () => {
    const data = getAppointments() || [];
    setAppointments(data);
  };

  // Загрузка данных при монтировании
  useEffect(() => {
    refreshList();
  }, []);

  // Колбэк для формы: обновляем данные и переключаем вкладку
  const handleSuccess = () => {
    refreshList();
    setActiveTab('all');
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'No date';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  // Фильтруем только валидные записи
  const validAppointments = appointments.filter(apt => apt.patientName && apt.doctorName);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight flex items-center gap-3">
          <FaCalendarCheck className="text-blue-600 shadow-sm" /> Appointments
        </h1>
        <p className="text-gray-400 font-bold text-xs uppercase tracking-[0.2em]">Medical Center Management • 2026</p>
      </div>

      {/* Tabs Design */}
      <div className="flex gap-2 p-1.5 bg-gray-100/80 backdrop-blur-md w-fit rounded-[1.25rem] border border-gray-200/50 shadow-inner">
        <button
          onClick={() => setActiveTab('schedule')}
          className={`px-7 py-3 rounded-[1rem] text-[11px] font-black tracking-widest transition-all flex items-center gap-2 ${
            activeTab === 'schedule' ? 'bg-white text-blue-600 shadow-md ring-1 ring-black/5' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <FaCalendarPlus className="text-sm" /> NEW BOOKING
        </button>
        <button
          onClick={() => setActiveTab('all')}
          className={`px-7 py-3 rounded-[1rem] text-[11px] font-black tracking-widest transition-all flex items-center gap-2 ${
            activeTab === 'all' ? 'bg-white text-blue-600 shadow-md ring-1 ring-black/5' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <FaClipboardList className="text-sm" /> RECORDS
          <span className="ml-1 bg-blue-100 text-blue-600 px-2 py-0.5 rounded-lg text-[9px]">
            {validAppointments.length}
          </span>
        </button>
      </div>

      {/* Content Container */}
      {activeTab === 'schedule' ? (
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-blue-900/10 overflow-hidden max-w-4xl transition-all border-t-4 border-t-blue-500">
          <div className="bg-gray-50/50 px-10 py-10 border-b border-gray-100">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">Patient Admission</h2>
            <p className="text-gray-400 text-sm mt-1 font-medium italic">Please complete all required fields below.</p>
          </div>
          
          <div className="p-10">
            <AppointmentForm onSuccess={handleSuccess} />
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden animate-in zoom-in-95 duration-500">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Patient</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Physician</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Time & Date</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {validAppointments.length > 0 ? (
                  validAppointments
                    // Сортировка по дате создания (новые записи в начале)
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .map((apt) => (
                      <tr key={apt.id} className="hover:bg-blue-50/30 transition-all cursor-default">
                        <td className="px-10 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-blue-200">
                              {apt.patientName?.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-bold text-gray-900 text-base tracking-tight">{apt.patientName}</span>
                          </div>
                        </td>
                        <td className="px-10 py-6">
                          <div className="flex flex-col">
                            <span className="text-gray-900 font-bold">
                              {apt.doctorName?.startsWith('Dr.') ? apt.doctorName : `Dr. ${apt.doctorName}`}
                            </span>
                            <span className="text-[9px] text-emerald-600 font-black uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-md w-fit mt-1">Verified</span>
                          </div>
                        </td>
                        <td className="px-10 py-6">
                          <div className="text-sm font-black text-gray-900 tracking-tight">{formatDate(apt.date)}</div>
                          <div className="text-[10px] text-gray-400 font-bold mt-0.5 flex items-center gap-1 uppercase tracking-wider">
                            <FaClock className="text-blue-400"/> {apt.time}
                          </div>
                        </td>
                        <td className="px-10 py-6 text-right">
                          <span className="px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase border border-blue-100">
                            {apt.status || 'Scheduled'}
                          </span>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-10 py-32 text-center text-gray-300 font-black uppercase tracking-[0.3em] text-xs">
                      Database Empty
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;