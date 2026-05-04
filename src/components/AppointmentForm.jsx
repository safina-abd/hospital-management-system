import React, { useState } from 'react';
import { FaUserAlt, FaStethoscope, FaRegCalendarAlt, FaClock, FaClipboardList, FaPlus } from 'react-icons/fa';
// 1. Импортируем правильную функцию addAppointment
import { getPatients, getDoctors, addAppointment } from '../utils/storage';

const AppointmentForm = ({ onSuccess }) => {
  const patients = getPatients();
  const doctors = getDoctors();

  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    date: '',
    time: '',
    reason: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const patient = patients.find(p => p.id === formData.patientId);
    const doctor = doctors.find(d => d.id === formData.doctorId);

    if (!patient || !doctor || !formData.date || !formData.time) {
      alert("Please fill in all required fields!");
      return;
    }

    // 2. Передаем только нужные данные. 
    // ID, Status и createdAt добавятся внутри addAppointment автоматически.
    const appointmentData = {
      patientId: patient.id,
      patientName: patient.name,
      doctorId: doctor.id,
      doctorName: doctor.name,
      date: formData.date,
      time: formData.time,
      reason: formData.reason
    };

    const result = addAppointment(appointmentData);

    if (result) {
      // 3. Сбрасываем форму после успеха
      setFormData({
        patientId: '',
        doctorId: '',
        date: '',
        time: '',
        reason: ''
      });
      
      if (onSuccess) onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Patient Selection */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase text-gray-400 flex items-center gap-2 tracking-[0.15em] ml-1">
            <FaUserAlt className="text-blue-500 text-xs"/> Select Patient *
          </label>
          <div className="relative group">
            <select
              required
              value={formData.patientId}
              onChange={(e) => setFormData({...formData, patientId: e.target.value})}
              className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 font-bold text-gray-700 outline-none focus:border-blue-500 focus:bg-white transition-all appearance-none cursor-pointer text-sm"
            >
              <option value="">Choose a patient</option>
              {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-300 group-focus-within:text-blue-500 transition-colors">
              ▼
            </div>
          </div>
        </div>

        {/* Doctor Selection */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase text-gray-400 flex items-center gap-2 tracking-[0.15em] ml-1">
            <FaStethoscope className="text-emerald-500 text-xs"/> Select Doctor *
          </label>
          <div className="relative group">
            <select
              required
              value={formData.doctorId}
              onChange={(e) => setFormData({...formData, doctorId: e.target.value})}
              className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 font-bold text-gray-700 outline-none focus:border-emerald-500 focus:bg-white transition-all appearance-none cursor-pointer text-sm"
            >
              <option value="">Choose a doctor</option>
              {doctors.map(d => (
                <option key={d.id} value={d.id}>
                  {d.name} — {d.specialization} {d.isAvailable ? '' : '(Unavailable)'}
                </option>
              ))}
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-300 group-focus-within:text-emerald-500 transition-colors">
              ▼
            </div>
          </div>
        </div>

        {/* Date */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase text-gray-400 flex items-center gap-2 tracking-[0.15em] ml-1">
            <FaRegCalendarAlt className="text-amber-500 text-xs"/> Date *
          </label>
          <input
            type="date"
            required
            min={new Date().toISOString().split('T')[0]} // Ограничение: нельзя выбрать прошедшую дату
            value={formData.date}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 font-bold text-gray-700 outline-none focus:border-amber-500 focus:bg-white transition-all text-sm appearance-none"
          />
        </div>

        {/* Time */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase text-gray-400 flex items-center gap-2 tracking-[0.15em] ml-1">
            <FaClock className="text-purple-500 text-xs"/> Time *
          </label>
          <input
            type="time"
            required
            value={formData.time}
            onChange={(e) => setFormData({...formData, time: e.target.value})}
            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 font-bold text-gray-700 outline-none focus:border-purple-500 focus:bg-white transition-all text-sm"
          />
        </div>
      </div>

      {/* Reason */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-black uppercase text-gray-400 flex items-center gap-2 tracking-[0.15em] ml-1">
          <FaClipboardList className="text-rose-500 text-xs"/> Reason for Visit *
        </label>
        <textarea
          required
          value={formData.reason}
          onChange={(e) => setFormData({...formData, reason: e.target.value})}
          placeholder="Describe the reason for the appointment..."
          className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 font-bold text-gray-700 h-28 outline-none focus:border-rose-500 focus:bg-white transition-all resize-none text-sm"
        />
      </div>

      {/* Button */}
      <div className="pt-2">
        <button
          type="submit"
          className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-500/20 active:scale-95 group"
        >
          <FaPlus className="group-hover:rotate-90 transition-transform duration-300" />
          Schedule Appointment
        </button>
      </div>
    </form>
  );
};

export default AppointmentForm;