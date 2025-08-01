import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Mail, Phone, User, MessageSquare, Send } from 'lucide-react';

const ContactTeacher = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { instructor } = location.state || {};
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  if (!instructor) {
    navigate('/instructors');
    return null;
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // هنا يمكن إضافة منطق إرسال الرسالة
    alert('تم إرسال رسالتك بنجاح! سيتم الرد عليك قريباً.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-islamic-gray-light pt-20">
      {/* زر الرجوع */}
      <div className="container mx-auto px-4 py-4">
        <button
          onClick={() => navigate('/instructors')}
          className="flex items-center space-x-2 rtl:space-x-reverse text-islamic-primary hover:text-islamic-light transition-colors font-cairo"
        >
          <ArrowRight size={20} />
          <span>العودة إلى المدرسين</span>
        </button>
      </div>

      {/* معلومات المدرس */}
      <section className="bg-white py-12 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="font-amiri text-4xl font-bold text-islamic-primary mb-4">
                تواصل مع {instructor.name}
              </h1>
              <p className="font-cairo text-lg text-gray-600 mb-6 leading-relaxed">
                {instructor.bio}
              </p>
              
              {/* التخصص */}
              <div className="bg-islamic-gray-light p-4 rounded-lg mb-6">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <User size={20} className="text-islamic-primary" />
                  <span className="font-cairo font-bold text-islamic-dark">
                    التخصص: {instructor.specialization}
                  </span>
                </div>
              </div>
              
              {/* معلومات الاتصال السريع */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <Mail size={20} className="text-islamic-primary" />
                  <div>
                    <span className="font-cairo text-gray-600 text-sm">البريد الإلكتروني:</span>
                    <p className="font-cairo text-islamic-dark font-medium">{instructor.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <Phone size={20} className="text-islamic-golden" />
                  <div>
                    <span className="font-cairo text-gray-600 text-sm">رقم الهاتف:</span>
                    <p className="font-cairo text-islamic-dark font-medium">{instructor.phone}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <img
                src={instructor.image}
                alt={instructor.name}
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* نموذج التواصل */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-8">
                <MessageSquare size={48} className="text-islamic-primary mx-auto mb-4" />
                <h2 className="font-amiri text-3xl font-bold text-islamic-primary mb-2">
                  أرسل رسالة
                </h2>
                <p className="font-cairo text-gray-600">
                  تواصل مع المدرس مباشرة من خلال النموذج أدناه
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-cairo font-medium text-gray-700 mb-2">
                      الاسم الكامل
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-islamic-primary focus:border-transparent transition-colors font-cairo"
                      placeholder="أدخل اسمك الكامل"
                    />
                  </div>
                  
                  <div>
                    <label className="block font-cairo font-medium text-gray-700 mb-2">
                      البريد الإلكتروني
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-islamic-primary focus:border-transparent transition-colors font-cairo"
                      placeholder="example@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block font-cairo font-medium text-gray-700 mb-2">
                    موضوع الرسالة
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-islamic-primary focus:border-transparent transition-colors font-cairo"
                    placeholder="ما هو موضوع رسالتك؟"
                  />
                </div>
                
                <div>
                  <label className="block font-cairo font-medium text-gray-700 mb-2">
                    نص الرسالة
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-islamic-primary focus:border-transparent transition-colors font-cairo resize-none"
                    placeholder="اكتب رسالتك هنا..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-islamic-primary text-white py-4 px-6 rounded-lg font-cairo font-bold text-lg hover:bg-islamic-light transition-colors flex items-center justify-center space-x-2 rtl:space-x-reverse"
                >
                  <Send size={20} />
                  <span>إرسال الرسالة</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* طرق التواصل البديلة */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-amiri text-3xl font-bold text-islamic-primary mb-8 text-center">
            طرق التواصل البديلة
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-islamic-gray-light p-6 rounded-lg text-center">
              <Mail size={48} className="text-islamic-primary mx-auto mb-4" />
              <h3 className="font-cairo font-bold text-xl text-islamic-dark mb-2">
                البريد الإلكتروني
              </h3>
              <p className="font-cairo text-gray-600 mb-4">
                راسل المدرس مباشرة على بريده الإلكتروني
              </p>
              <a
                href={`mailto:${instructor.email}`}
                className="bg-islamic-primary text-white px-6 py-2 rounded-lg font-cairo hover:bg-islamic-light transition-colors inline-block"
              >
                إرسال إيميل
              </a>
            </div>
            
            <div className="bg-islamic-gray-light p-6 rounded-lg text-center">
              <Phone size={48} className="text-islamic-golden mx-auto mb-4" />
              <h3 className="font-cairo font-bold text-xl text-islamic-dark mb-2">
                المكالمة الهاتفية
              </h3>
              <p className="font-cairo text-gray-600 mb-4">
                تحدث مع المدرس مباشرة عبر الهاتف
              </p>
              <a
                href={`tel:${instructor.phone}`}
                className="bg-islamic-golden text-white px-6 py-2 rounded-lg font-cairo hover:bg-opacity-90 transition-colors inline-block"
              >
                اتصل الآن
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactTeacher;