import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus, FaEdit, FaTimes } from 'react-icons/fa';

const PatientForm = ({ onSubmit, onCancel, initialData = null }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialData || {
      name: '',
      age: '',
      gender: '',
      phone: '',
      email: '',
      medicalNotes: '',
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const onFormSubmit = async (data) => {
    await onSubmit(data);
    if (!initialData) {
      reset();
    }
  };

  // Uzbekistan phone validation regex
  const phoneRegex = /^\+998\s?(?:33|50|55|77|88|90|91|93|94|95|97|98|99)\s?\d{3}\s?\d{2}\s?\d{2}$/;

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label htmlFor="name" className="form-label">
            Full Name <span className="text-danger-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="e.g., Sardor Abdullaev"
            className={`form-input ${errors.name ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-500' : ''}`}
            {...register('name', {
              required: 'Full name is required',
              minLength: { value: 2, message: 'Name must be at least 2 characters' },
              maxLength: { value: 100, message: 'Name must not exceed 100 characters' },
            })}
          />
          {errors.name && <p className="form-error">{errors.name.message}</p>}
        </div>

        {/* Age */}
        <div>
          <label htmlFor="age" className="form-label">
            Age <span className="text-danger-500">*</span>
          </label>
          <input
            id="age"
            type="number"
            placeholder="e.g., 34"
            className={`form-input ${errors.age ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-500' : ''}`}
            {...register('age', {
              required: 'Age is required',
              min: { value: 0, message: 'Age must be at least 0' },
              max: { value: 150, message: 'Age must not exceed 150' },
              valueAsNumber: true,
            })}
          />
          {errors.age && <p className="form-error">{errors.age.message}</p>}
        </div>

        {/* Gender */}
        <div>
          <label htmlFor="gender" className="form-label">
            Gender <span className="text-danger-500">*</span>
          </label>
          <select
            id="gender"
            className={`form-input ${errors.gender ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-500' : ''}`}
            {...register('gender', { required: 'Please select a gender' })}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className="form-error">{errors.gender.message}</p>}
        </div>

        {/* Phone - Uzbekistan Format */}
        <div>
          <label htmlFor="phone" className="form-label">
            Phone <span className="text-danger-500">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="+998 90 123 45 67"
            className={`form-input ${errors.phone ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-500' : ''}`}
            {...register('phone', {
              required: 'Phone number is required',
              pattern: {
                value: phoneRegex,
                message: 'Please enter a valid Uzbekistan phone number (e.g., +998 90 123 45 67)',
              },
            })}
          />
          {errors.phone && <p className="form-error">{errors.phone.message}</p>}
          <p className="mt-1 text-xs text-gray-400">Format: +998 XX XXX XX XX</p>
        </div>

        {/* Email */}
        <div className="md:col-span-2">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="patient@example.com"
            className={`form-input ${errors.email ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-500' : ''}`}
            {...register('email', {
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Please enter a valid email address',
              },
            })}
          />
          {errors.email && <p className="form-error">{errors.email.message}</p>}
        </div>

        {/* Medical Notes */}
        <div className="md:col-span-2">
          <label htmlFor="medicalNotes" className="form-label">
            Medical Notes
          </label>
          <textarea
            id="medicalNotes"
            rows={3}
            placeholder="Enter any medical conditions, allergies, or special notes..."
            className="form-input resize-none"
            {...register('medicalNotes', {
              maxLength: { value: 500, message: 'Notes must not exceed 500 characters' },
            })}
          />
          {errors.medicalNotes && <p className="form-error">{errors.medicalNotes.message}</p>}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary gap-2"
        >
          {isSubmitting ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : initialData ? (
            <FaEdit />
          ) : (
            <FaPlus />
          )}
          {initialData ? 'Update Patient' : 'Register Patient'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary gap-2"
          >
            <FaTimes />
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default PatientForm;