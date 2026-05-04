import React, { useState } from 'react';
import { FaUserMd, FaExclamationTriangle, FaPlus, FaSearch } from 'react-icons/fa';
import DoctorCard from '../components/DoctorCard';
import DoctorFilter from '../components/DoctorFilter';
import { getDoctors, getSpecializations, filterDoctorsBySpecialization } from '../utils/storage';
import LoadingSpinner from '../components/LoadingSpinner';

const Doctors = () => {
  const [selectedSpec, setSelectedSpec] = useState('All');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const specializations = getSpecializations();
  const doctors = filterDoctorsBySpecialization(selectedSpec);

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-3xl p-6 text-red-700 flex items-center gap-3 animate-in fade-in">
        <FaExclamationTriangle className="text-xl" />
        <p className="font-bold">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            <span className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-100">
              <FaUserMd className="text-2xl" />
            </span>
            Medical staff
          </h1>
          <p className="text-gray-500 font-medium mt-3">
            Management of medical staff and monitoring of availablility | 2026
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-2">
             <DoctorFilter
              specializations={specializations}
              selected={selectedSpec}
              onChange={setSelectedSpec}
            />
          </div>
        </div>
      </div>

      {/* Stats Quick Info */}
      <div className="flex flex-wrap items-center gap-4 px-2">
        <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          <span className="text-[11px] font-black uppercase text-blue-700 tracking-widest">
            In the database: {doctors.length}
          </span>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span className="text-[11px] font-black uppercase text-emerald-700 tracking-widest">
            Available: {doctors.filter(d => d.isAvailable).length}
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <LoadingSpinner size="xl" />
          <p className="text-gray-400 font-bold animate-pulse uppercase tracking-widest text-xs">Загрузка базы данных...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {doctors.length === 0 ? (
            <div className="col-span-full bg-white rounded-3xl border-2 border-dashed border-gray-100 py-20 text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaSearch className="text-2xl text-gray-300" />
              </div>
              <h3 className="text-xl font-black text-gray-900">Врачи не найдены</h3>
              <p className="text-gray-500 font-medium mt-1">Попробуйте изменить параметры фильтрации</p>
              <button 
                onClick={() => setSelectedSpec('All')}
                className="mt-6 px-6 py-2 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-gray-800 transition-colors"
              >
                Сбросить фильтр
              </button>
            </div>
          ) : (
            doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))
          )}
        </div>
      )}

      {/* Footer Info (Optional) */}
      <div className="pt-8 border-t border-gray-100">
        <p className="text-[10px] text-center font-black text-gray-300 uppercase tracking-[0.2em]">
          IDU Hospital Management System • Personal Directory Utility
        </p>
      </div>
    </div>
  );
};

export default Doctors;