import React, { useState } from 'react';
import { FaSearch, FaEdit, FaTrashAlt, FaExclamationTriangle } from 'react-icons/fa';
import { searchPatients, deletePatient } from '../utils/storage';
import LoadingSpinner from './LoadingSpinner';

const PatientTable = ({ onEdit, refreshTrigger }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  React.useEffect(() => {
    loadPatients();
  }, [searchQuery, refreshTrigger]);

  const loadPatients = () => {
    try {
      setLoading(true);
      setError(null);
      const results = searchPatients(searchQuery);
      setPatients(results);
    } catch (err) {
      setError('Failed to load patients');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    try {
      deletePatient(id);
      setDeleteConfirm(null);
      loadPatients();
    } catch (err) {
      setError('Failed to delete patient');
      console.error(err);
    }
  };

  const getGenderBadge = (gender) => {
    const styles = {
      Male: 'bg-blue-100 text-blue-800',
      Female: 'bg-pink-100 text-pink-800',
      Other: 'bg-gray-100 text-gray-800',
    };
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[gender] || styles.Other}`}>
        {gender}
      </span>
    );
  };

  if (loading && patients.length === 0) {
    return (
      <div className="card p-12 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-danger-50 border border-danger-200 rounded-lg p-4 text-danger-700 flex items-center gap-2">
        <FaExclamationTriangle />
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search by name, phone, or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-input pl-10"
        />
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-header">Name</th>
                <th className="table-header">Age</th>
                <th className="table-header">Gender</th>
                <th className="table-header">Phone</th>
                <th className="table-header">Email</th>
                <th className="table-header">Medical Notes</th>
                <th className="table-header text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {patients.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    {searchQuery ? 'No patients found matching your search.' : 'No patients registered yet.'}
                  </td>
                </tr>
              ) : (
                patients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                    <td className="table-cell">
                      <div className="font-medium text-gray-900">{patient.name}</div>
                    </td>
                    <td className="table-cell">{patient.age}</td>
                    <td className="table-cell">{getGenderBadge(patient.gender)}</td>
                    <td className="table-cell font-mono text-gray-600">{patient.phone}</td>
                    <td className="table-cell text-gray-600">{patient.email || '-'}</td>
                    <td className="table-cell">
                      <p className="max-w-xs truncate text-gray-600" title={patient.medicalNotes}>
                        {patient.medicalNotes || '-'}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onEdit(patient)}
                          className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(patient.id)}
                          className="p-2 text-danger-600 hover:bg-danger-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 text-danger-600 mb-4">
              <FaExclamationTriangle className="text-2xl" />
              <h3 className="text-lg font-semibold">Confirm Deletion</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this patient? This action cannot be undone.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="btn-danger"
              >
                Delete Patient
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientTable;