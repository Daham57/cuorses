import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, Phone, MapPin, Calendar, GraduationCap, BookOpen, Upload, UserPlus } from 'lucide-react';
import axios from 'axios';
import { NGROK_BASE_URL } from '../data/mockData';

const Signup = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('student');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    certificate: '',
    instructor_img: null,
    student_img: null,
    phone_number: '',
    quran_memorized_parts: '',
    quran_passed_parts: '',
    religious_qualifications: '',
    address: '',
    birth_date: '',
    enroll_date: '',
    reset_password_token: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Password confirmation validation
    if (formData.password !== formData.password_confirmation) {
      setResponseMessage('كلمات المرور غير متطابقة');
      setIsLoading(false);
      return;
    }

    const payload = new FormData();

    const fields = role === 'teacher'
      ? ['name', 'email', 'password', 'password_confirmation', 'certificate', 'instructor_img', 'phone_number', 'quran_memorized_parts', 'quran_passed_parts', 'religious_qualifications', 'address', 'birth_date']
      : ['name', 'email', 'password', 'password_confirmation', 'certificate', 'student_img', 'phone_number', 'quran_memorized_parts', 'quran_passed_parts', 'enroll_date', 'address', 'birth_date', 'reset_password_token'];

    fields.forEach(field => {
      if (formData[field]) {
        payload.append(field, formData[field]);
      }
    });

    try {
      const url = role === 'teacher'
        ? `${NGROK_BASE_URL}/instructors/store`
        : `${NGROK_BASE_URL}/students/store`;

      const res = await axios.post(url, payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'ngrok-skip-browser-warning': 'true',
        }
      });

      const token = res.data.token;
      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('userRole', role);
        localStorage.setItem('userEmail', formData.email);
      }

      setResponseMessage('تم إنشاء الحساب بنجاح!');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      if (err.response) {
        console.log('Error response data:', err.response.data);
        setResponseMessage(err.response.data.message || 'حدث خطأ أثناء إنشاء الحساب.');
      } else {
        console.log('Error:', err.message);
        setResponseMessage('حدث خطأ أثناء إنشاء الحساب.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getFieldIcon = (fieldName) => {
    switch (fieldName) {
      case 'name': return User;
      case 'email': return Mail;
      case 'password':
      case 'password_confirmation': return Lock;
      case 'phone_number': return Phone;
      case 'address': return MapPin;
      case 'birth_date':
      case 'enroll_date': return Calendar;
      case 'certificate': return GraduationCap;
      case 'quran_memorized_parts':
      case 'quran_passed_parts':
      case 'religious_qualifications': return BookOpen;
      default: return User;
    }
  };

  const getFieldLabel = (fieldName) => {
    const labels = {
      name: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      password_confirmation: 'تأكيد كلمة المرور',
      certificate: 'الشهادة/المؤهل',
      phone_number: 'رقم الهاتف',
      quran_memorized_parts: 'الأجزاء المحفوظة',
      quran_passed_parts: 'الأجزاء المسبورة',
      religious_qualifications: 'المؤهلات الشرعية',
      address: 'العنوان',
      birth_date: 'تاريخ الميلاد',
      enroll_date: 'تاريخ التسجيل'
    };
    return labels[fieldName] || fieldName;
  };

  const commonFields = ['name', 'email', 'password', 'password_confirmation', 'certificate', 'phone_number', 'quran_memorized_parts', 'quran_passed_parts', 'address', 'birth_date'];
  const teacherSpecificFields = ['religious_qualifications'];
  const studentSpecificFields = ['enroll_date'];

  return (
    <div className="min-h-screen bg-islamic-pattern bg-cover bg-center relative pt-20">
      <div className="absolute inset-0 bg-islamic-primary/80"></div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-islamic-golden rounded-full flex items-center justify-center mx-auto mb-6">
              <UserPlus size={32} className="text-white" />
            </div>
            <h1 className="font-amiri text-3xl font-bold text-white mb-2">
              إنشاء حساب جديد
            </h1>
            <p className="font-cairo text-white/80">
              انضم إلى منصة يختمون لتعليم القرآن الكريم
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            {/* Role Selection Header */}
            <div className="bg-islamic-gray-light p-6 border-b">
              <div className="flex justify-center">
                <div className="bg-white rounded-lg p-1 flex shadow-sm">
                  <button
                    type="button"
                    onClick={() => setRole('student')}
                    className={`px-8 py-3 rounded-md font-cairo font-medium transition-all duration-200 ${
                      role === 'student'
                        ? 'bg-islamic-primary text-white shadow-md'
                        : 'text-gray-600 hover:text-islamic-primary hover:bg-gray-50'
                    }`}
                  >
                    طالب
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('teacher')}
                    className={`px-8 py-3 rounded-md font-cairo font-medium transition-all duration-200 ${
                      role === 'teacher'
                        ? 'bg-islamic-primary text-white shadow-md'
                        : 'text-gray-600 hover:text-islamic-primary hover:bg-gray-50'
                    }`}
                  >
                    مدرس
                  </button>
                </div>
              </div>
              <p className="text-center font-cairo text-gray-600 mt-3">
                {role === 'teacher' 
                  ? 'إنشاء حساب مدرس للإشراف على الطلاب وإدارة الدورات'
                  : 'إنشاء حساب طالب للانضمام إلى دورات تعليم القرآن الكريم'
                }
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Common Fields */}
                {commonFields.map((field) => {
                  const Icon = getFieldIcon(field);
                  const isPasswordField = field.includes('password');
                  const isDateField = field.includes('date');
                  
                  return (
                    <div key={field} className={field === 'name' || field === 'email' ? 'md:col-span-2' : ''}>
                      <label className="block font-cairo font-medium text-gray-700 mb-2">
                        {getFieldLabel(field)}
                        <span className="text-red-500 mr-1">*</span>
                      </label>
                      <div className="relative">
                        <Icon
                          size={20}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                        <input
                          type={
                            isPasswordField ? (
                              field === 'password' 
                                ? (showPassword ? 'text' : 'password')
                                : (showConfirmPassword ? 'text' : 'password')
                            ) : isDateField ? 'date' : field === 'email' ? 'email' : 'text'
                          }
                          name={field}
                          value={formData[field] || ''}
                          onChange={handleChange}
                          required
                          className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-islamic-primary focus:border-transparent transition-colors font-cairo"
                          placeholder={
                            field === 'email' ? 'example@email.com' :
                            field === 'phone_number' ? '+966 50 123 4567' :
                            field === 'quran_memorized_parts' ? 'عدد الأجزاء المحفوظة' :
                            field === 'quran_passed_parts' ? 'عدد الأجزاء المسبورة' :
                            `أدخل ${getFieldLabel(field)}`
                          }
                        />
                        {isPasswordField && (
                          <button
                            type="button"
                            onClick={() => {
                              if (field === 'password') {
                                setShowPassword(!showPassword);
                              } else {
                                setShowConfirmPassword(!showConfirmPassword);
                              }
                            }}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {(field === 'password' ? showPassword : showConfirmPassword) ? 
                              <EyeOff size={20} /> : <Eye size={20} />
                            }
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Profile Image Upload */}
                <div className="md:col-span-2">
                  <label className="block font-cairo font-medium text-gray-700 mb-2">
                    صورة الملف الشخصي
                  </label>
                  <div className="relative">
                    <Upload
                      size={20}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="file"
                      name={role === 'teacher' ? 'instructor_img' : 'student_img'}
                      onChange={handleChange}
                      accept="image/*"
                      className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-islamic-primary focus:border-transparent transition-colors font-cairo file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-cairo file:bg-islamic-gray-light file:text-islamic-primary hover:file:bg-islamic-primary hover:file:text-white"
                    />
                  </div>
                </div>

                {/* Role-specific Fields */}
                {role === 'teacher' && teacherSpecificFields.map((field) => {
                  const Icon = getFieldIcon(field);
                  return (
                    <div key={field} className="md:col-span-2">
                      <label className="block font-cairo font-medium text-gray-700 mb-2">
                        {getFieldLabel(field)}
                        <span className="text-red-500 mr-1">*</span>
                      </label>
                      <div className="relative">
                        <Icon
                          size={20}
                          className="absolute right-3 top-3 text-gray-400"
                        />
                        <textarea
                          name={field}
                          value={formData[field] || ''}
                          onChange={handleChange}
                          required
                          rows={3}
                          className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-islamic-primary focus:border-transparent transition-colors font-cairo resize-none"
                          placeholder="اذكر المؤهلات الشرعية والإجازات..."
                        />
                      </div>
                    </div>
                  );
                })}

                {role === 'student' && studentSpecificFields.map((field) => {
                  const Icon = getFieldIcon(field);
                  return (
                    <div key={field}>
                      <label className="block font-cairo font-medium text-gray-700 mb-2">
                        {getFieldLabel(field)}
                      </label>
                      <div className="relative">
                        <Icon
                          size={20}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                        <input
                          type="date"
                          name={field}
                          value={formData[field] || ''}
                          onChange={handleChange}
                          className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-islamic-primary focus:border-transparent transition-colors font-cairo"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Submit Button */}
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-islamic-primary text-white py-4 px-6 rounded-lg font-cairo font-bold text-lg hover:bg-islamic-light transition-colors flex items-center justify-center space-x-2 rtl:space-x-reverse disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>جاري إنشاء الحساب...</span>
                    </>
                  ) : (
                    <>
                      <UserPlus size={20} />
                      <span>إنشاء الحساب</span>
                    </>
                  )}
                </button>
              </div>

              {/* Response Message */}
              {responseMessage && (
                <div className={`mt-6 p-4 rounded-lg text-center font-cairo font-medium ${
                  responseMessage.includes('بنجاح') 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                  {responseMessage}
                </div>
              )}

              {/* Login Link */}
              <div className="mt-6 text-center">
                <p className="font-cairo text-gray-600">
                  لديك حساب بالفعل؟{' '}
                  <Link
                    to="/login"
                    className="text-islamic-primary hover:text-islamic-light font-medium underline"
                  >
                    تسجيل الدخول
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Terms and Privacy */}
          <div className="mt-8 text-center">
            <p className="font-cairo text-white/80 text-sm">
              بإنشاء الحساب، أنت توافق على{' '}
              <a href="#" className="text-islamic-golden hover:underline">
                شروط الاستخدام
              </a>{' '}
              و{' '}
              <a href="#" className="text-islamic-golden hover:underline">
                سياسة الخصوصية
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;