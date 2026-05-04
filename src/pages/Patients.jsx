import React, { useState, useCallback } from 'react';
import { FaUserPlus, FaUsers } from 'react-icons/fa';
import PatientForm from '../components/PatientForm';
import PatientTable from '../components/PatientTable';
import { addPatient, updatePatient } from '../utils/storage';

const Patients = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSubmit = useCallback((data) => {
    if (editingPatient) {
      updatePatient(editingPatient.id, data);
      setEditingPatient(null);
    } else {
      addPatient(data);
    }
    setShowForm(false);
    setRefreshTrigger((prev) => prev + 1);
  }, [editingPatient]);

  const handleEdit = useCallback((patient) => {
    setEditingPatient(patient);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleCancel = useCallback(() => {
    setShowForm(false);
    setEditingPatient(null);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FaUsers />
            Patients
          </h1>
          <p className="text-gray-500 mt-1">Manage patient records and registrations</p>
        </div>
        <button
          onClick={() => {
            setEditingPatient(null);
            setShowForm(!showForm);
          }}
          className="btn-primary gap-2 w-full sm:w-auto"
        >
          <FaUserPlus />
          {showForm && !editingPatient ? 'Hide Form' : 'Register New Patient'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {editingPatient ? 'Edit Patient' : 'Register New Patient'}
          </h2>
          <PatientForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            initialData={editingPatient}
          />
        </div>
      )}

      {/* Patient List */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Patient Directory</h2>
        <PatientTable onEdit={handleEdit} refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
};

export default Patients;