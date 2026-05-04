/**
 * LocalStorage Utility Functions
 * Утилиты для работы с базой данных госпиталя (IDU HMS)
 */

const STORAGE_KEYS = {
  PATIENTS: 'idu_hms_patients',
  DOCTORS: 'idu_hms_doctors',
  APPOINTMENTS: 'idu_hms_appointments',
};

// ============================================
// Вспомогательные хелперы (Private)
// ============================================

const getItem = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Ошибка чтения ${key}:`, error);
    return [];
  }
};

const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Ошибка записи в ${key}:`, error);
    return false;
  }
};

const generateId = (prefix = 'id') => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
};

// ============================================
// Операции с пациентами
// ============================================

export const getPatients = () => getItem(STORAGE_KEYS.PATIENTS);

export const getPatientById = (id) => {
  return getPatients().find((p) => p.id === id) || null;
};

export const addPatient = (patientData) => {
  const patients = getPatients();
  const newPatient = {
    ...patientData,
    id: generateId('pat'),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  patients.push(newPatient);
  setItem(STORAGE_KEYS.PATIENTS, patients);
  return newPatient;
};

export const updatePatient = (id, updates) => {
  const patients = getPatients();
  const index = patients.findIndex((p) => p.id === id);
  if (index === -1) return null;

  patients[index] = {
    ...patients[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  setItem(STORAGE_KEYS.PATIENTS, patients);
  return patients[index];
};

export const deletePatient = (id) => {
  const patients = getPatients();
  const filtered = patients.filter((p) => p.id !== id);
  if (filtered.length === patients.length) return false;
  return setItem(STORAGE_KEYS.PATIENTS, filtered);
};

export const searchPatients = (query) => {
  const patients = getPatients();
  if (!query?.trim()) return patients;

  const lowerQuery = query.toLowerCase().trim();
  return patients.filter(
    (p) =>
      p.name?.toLowerCase().includes(lowerQuery) ||
      p.phone?.includes(lowerQuery) ||
      p.email?.toLowerCase().includes(lowerQuery)
  );
};

// ============================================
// Операции с врачами
// ============================================

export const getDoctors = () => getItem(STORAGE_KEYS.DOCTORS);

export const getDoctorById = (id) => {
  return getDoctors().find((d) => d.id === id) || null;
};

export const getAvailableDoctors = () => {
  return getDoctors().filter((d) => d.isAvailable);
};

export const addDoctor = (doctorData) => {
  const doctors = getDoctors();
  const newDoctor = {
    ...doctorData,
    id: generateId('doc'),
    createdAt: new Date().toISOString(),
  };
  doctors.push(newDoctor);
  setItem(STORAGE_KEYS.DOCTORS, doctors);
  return newDoctor;
};

export const updateDoctor = (id, updates) => {
  const doctors = getDoctors();
  const index = doctors.findIndex((d) => d.id === id);
  if (index === -1) return null;

  doctors[index] = { ...doctors[index], ...updates };
  setItem(STORAGE_KEYS.DOCTORS, doctors);
  return doctors[index];
};

export const deleteDoctor = (id) => {
  const doctors = getDoctors();
  const filtered = doctors.filter((d) => d.id !== id);
  if (filtered.length === doctors.length) return false;
  return setItem(STORAGE_KEYS.DOCTORS, filtered);
};

export const getSpecializations = () => {
  const doctors = getDoctors();
  const specs = [...new Set(doctors.map((d) => d.specialization))];
  return ['All', ...specs.filter(Boolean)];
};

export const filterDoctorsBySpecialization = (specialization) => {
  const doctors = getDoctors();
  if (!specialization || specialization === 'All') return doctors;
  return doctors.filter((d) => d.specialization === specialization);
};

// ============================================
// Операции с записями (Appointments)
// ============================================

export const getAppointments = () => getItem(STORAGE_KEYS.APPOINTMENTS);

export const addAppointment = (appointmentData) => {
  const appointments = getAppointments();
  const newAppointment = {
    ...appointmentData,
    id: generateId('apt'),
    status: appointmentData.status || 'scheduled',
    createdAt: new Date().toISOString(),
  };
  appointments.push(newAppointment);
  setItem(STORAGE_KEYS.APPOINTMENTS, appointments);
  return newAppointment;
};

export const updateAppointment = (id, updates) => {
  const appointments = getAppointments();
  const index = appointments.findIndex((a) => a.id === id);
  if (index === -1) return null;

  appointments[index] = { ...appointments[index], ...updates };
  setItem(STORAGE_KEYS.APPOINTMENTS, appointments);
  return appointments[index];
};

export const deleteAppointment = (id) => {
  const appointments = getAppointments();
  const filtered = appointments.filter((a) => a.id !== id);
  if (filtered.length === appointments.length) return false;
  return setItem(STORAGE_KEYS.APPOINTMENTS, filtered);
};

export const getTodaysAppointments = () => {
  const today = new Date().toISOString().split('T')[0];
  return getAppointments().filter((a) => a.date === today);
};

// ============================================
// Инициализация и очистка
// ============================================

export const seedInitialData = () => {
  // Инициализация врачей
  if (getDoctors().length === 0) {
    const initialDoctors = [
      { id: 'doc-1', name: 'Dr. Aziz Karimov', specialization: 'Cardiology', phone: '+998 90 123 45 67', email: 'a.karimov@iduhospital.uz', isAvailable: true, experience: '15 years' },
      { id: 'doc-2', name: 'Dr. Nodira Rakhimova', specialization: 'Pediatrics', phone: '+998 91 234 56 78', email: 'n.rakhimova@iduhospital.uz', isAvailable: true, experience: '10 years' },
      { id: 'doc-3', name: 'Dr. Bekzod Tursunov', specialization: 'Orthopedics', phone: '+998 93 345 67 89', email: 'b.tursunov@iduhospital.uz', isAvailable: false, experience: '8 years' }
    ].map(d => ({ ...d, createdAt: new Date().toISOString() }));
    setItem(STORAGE_KEYS.DOCTORS, initialDoctors);
  }

  // Инициализация пациентов
  if (getPatients().length === 0) {
    const initialPatients = [
      { id: 'pat-1', name: 'Sardor Abdullaev', age: 34, gender: 'Male', phone: '+998 90 111 22 33', email: 'sardor.a@mail.uz', medicalNotes: 'Hypertension' },
      { id: 'pat-2', name: 'Zarina Umarova', age: 28, gender: 'Female', phone: '+998 91 222 33 44', email: 'zarina.u@gmail.com', medicalNotes: 'Pregnancy' }
    ].map(p => ({ ...p, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }));
    setItem(STORAGE_KEYS.PATIENTS, initialPatients);
  }
};

export const clearAllData = () => {
  Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
};