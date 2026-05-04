import React from 'react';
import { FaPhone, FaEnvelope, FaClock, FaCheckCircle, FaTimesCircle, FaStethoscope } from 'react-icons/fa';

const DoctorCard = ({ doctor }) => {
  // Генерация фонового цвета на основе имени (просто для красоты)
  const bgColors = ['bg-blue-100 text-blue-600', 'bg-purple-100 text-purple-600', 'bg-emerald-100 text-emerald-600', 'bg-amber-100 text-amber-600'];
  const randomColor = bgColors[doctor.name.length % bgColors.length];

  return (
    <div className="group bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out relative overflow-hidden">
      {/* Декоративный элемент на фоне при ховере */}
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-gray-50 rounded-full group-hover:bg-blue-50 transition-colors duration-300" />

      <div className="relative">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            {/* Аватарка с инициалом */}
            <div className={`w-16 h-16 rounded-2xl ${randomColor} flex items-center justify-center text-xl font-black shadow-inner group-hover:scale-110 transition-transform duration-300`}>
              {doctor.name.split(' ').pop().charAt(0)}
            </div>
            <div>
              <h3 className="text-lg font-black text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">{doctor.name}</h3>
              <div className="flex items-center gap-1.5 mt-1">
                <FaStethoscope className="text-[10px] text-blue-500" />
                <span className="text-[11px] font-black uppercase tracking-wider text-blue-600/80">
                  {doctor.specialization}
                </span>
              </div>
            </div>
          </div>

          {/* Статус доступности */}
          <div className="flex-shrink-0">
            {doctor.isAvailable ? (
              <span className="flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm">
                <FaCheckCircle className="animate-pulse" /> Available
              </span>
            ) : (
              <span className="flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase bg-red-50 text-red-400 border border-red-100">
                <FaTimesCircle /> Busy
              </span>
            )}
          </div>
        </div>

        {/* Контактная информация */}
        <div className="space-y-3 bg-gray-50/50 rounded-2xl p-4 border border-gray-50 group-hover:bg-white group-hover:border-blue-100 transition-all duration-300">
          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm text-gray-400 group-hover:text-blue-500">
              <FaPhone className="text-xs" />
            </div>
            <span className="font-bold text-gray-700 tracking-tight">{doctor.phone}</span>
          </div>
          
          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm text-gray-400 group-hover:text-blue-500">
              <FaEnvelope className="text-xs" />
            </div>
            <span className="font-medium text-gray-500 truncate">{doctor.email}</span>
          </div>

          <div className="flex items-center gap-3 text-sm pt-2 border-t border-gray-100">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm text-blue-600">
              <FaClock className="text-xs" />
            </div>
            <span className="text-xs font-bold text-gray-600">
              Work experince: <span className="text-blue-600">{doctor.experience}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;