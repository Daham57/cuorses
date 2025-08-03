import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react';
import axios from 'axios';
import { NGROK_BASE_URL } from '@/data/mockData';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      await axios.post(`${NGROK_BASE_URL}/contact`, formData);
      setSuccess('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setError('حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة لاحقاً.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-islamic-gray-light">
      {/* رأس الصفحة */}
      <section className="pt-20" style={{ backgroundColor: "#0e4d3c" }}>
        <div className="container mx-auto px-4 py-16 text-center text-white">
          <h1 className="font-amiri text-4xl md:text-5xl font-bold mb-4 text-islamic-golden">تواصل معنا</h1>
          <p className="font-cairo text-xl opacity-90 max-w-2xl mx-auto">
            نحن هنا للإجابة على استفساراتك ومساعدتك في رحلتك التعليمية
          </p>
        </div>
      </section>

      {/* معلومات الاتصال */}
      <section className="py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* نموذج التواصل */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <MessageSquare size={48} className="text-islamic-primary mx-auto mb-4" />
              <h2 className="font-amiri text-3xl font-bold text-islamic-golden mb-2">أرسل لنا رسالة</h2>
              <p className="font-cairo text-gray-600">املأ النموذج أدناه وسنتواصل معك في أقرب وقت</p>
            </div>

            {success && <p className="text-green-600 font-cairo text-center mb-4">{success}</p>}
            {error && <p className="text-red-600 font-cairo text-center mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-cairo font-medium text-gray-700 mb-2">الاسم الكامل</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-islamic-primary"
                    placeholder="أدخل اسمك الكامل"
                  />
                </div>
                <div>
                  <label className="block font-cairo font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-islamic-primary"
                    placeholder="example@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block font-cairo font-medium text-gray-700 mb-2">موضوع الرسالة</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-islamic-primary"
                  placeholder="ما هو موضوع رسالتك؟"
                />
              </div>
              <div>
                <label className="block font-cairo font-medium text-gray-700 mb-2">نص الرسالة</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-islamic-primary resize-none"
                  placeholder="اكتب رسالتك هنا..."
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-islamic-primary text-white py-4 px-6 rounded-lg font-cairo font-bold text-lg hover:bg-islamic-light transition-colors flex items-center justify-center space-x-2 rtl:space-x-reverse"
              >
                <Send size={20} />
                <span>{loading ? 'جاري الإرسال...' : 'إرسال الرسالة'}</span>
              </button>
            </form>
          </div>
{/* معلومات الاتصال */}
            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="font-amiri text-3xl font-bold text-islamic-golden mb-6">
                  معلومات الاتصال
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4 rtl:space-x-reverse">
                    <div className="w-12 h-12 bg-islamic-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-cairo font-bold text-lg text-islamic-dark mb-1">
                        رقم الهاتف
                      </h3>
                      <p className="font-cairo text-gray-600">
                        +963 986 928 733
                      </p>
                      <p className="font-cairo text-gray-600">
                        +963 937 746 969
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 rtl:space-x-reverse">
                    <div className="w-12 h-12 bg-islamic-golden rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-cairo font-bold text-lg text-islamic-dark mb-1">
                        البريد الإلكتروني
                      </h3>
                      <p className="font-cairo text-gray-600">
                        yakhtemoor@gmail.com
                      </p>
                      <p className="font-cairo text-gray-600">
                        moazoo@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 rtl:space-x-reverse">
                    <div className="w-12 h-12 bg-islamic-light rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-cairo font-bold text-lg text-islamic-dark mb-1">
                        العنوان
                      </h3>
                      <p className="font-cairo text-gray-600">
                        مشروع دمر.الجزيرة 14
                        <br />
                        دمشق 
                        <br />
                        الجمهورية العربية السورية
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 rtl:space-x-reverse">
                    <div className="w-12 h-12 bg-islamic-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-cairo font-bold text-lg text-islamic-dark mb-1">
                        ساعات الدورة
                      </h3>
                      <p className="font-cairo text-gray-600">
                        السبت -الاثنين -الاربعاء : 4:00 م - 8:00 م<br />
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* الأسئلة الشائعة */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="font-amiri text-2xl font-bold text-islamic-golden mb-6">
                  أسئلة شائعة
                </h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-cairo font-bold text-islamic-dark mb-2">
                      كيف يمكنني التسجيل في الدورات؟
                    </h3>
                    <p className="font-cairo text-gray-600 text-sm">
                      يمكنك التسجيل من خلال القدوم الى المسجد أو التواصل معنا .
                    </p>
                  </div>

                  <div>
                    <h3 className="font-cairo font-bold text-islamic-dark mb-2">
                      هل الدورات مجانية؟
                    </h3>
                    <p className="font-cairo text-gray-600 text-sm">
                      نعم، جميع دوراتنا مجانية ولله الحمد.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-cairo font-bold text-islamic-dark mb-2">
                      ما هي متطلبات الالتحاق؟
                    </h3>
                    <p className="font-cairo text-gray-600 text-sm">
                      الرغبة الصادقة في تعلم القرآن الكريم والالتزام بالحضور.
                    </p>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </section>

      {/* قسم إضافي */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-amiri text-3xl font-bold text-islamic-golden mb-8">نتطلع لسماع منك</h2>
          <p className="font-cairo text-lg text-gray-600 max-w-2xl mx-auto">
            سواء كان لديك سؤال حول دوراتنا، أو تريد الانضمام إلى برامجنا التعليمية، أو تحتاج إلى مساعدة في أي أمر متعلق بتعلم القرآن الكريم، فنحن هنا لمساعدتك.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Contact;
