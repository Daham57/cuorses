import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Users, User, BookOpen } from 'lucide-react';
import GroupCard from '../components/GroupCard';

const TahfeezCourse = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { course, halqas = [] } = location.state || {};

  useEffect(() => {
    if (!course || course.type !== 'tahfeez') {
      navigate('/courses');
    }
  }, [course, navigate]);

  if (!course || course.type !== 'tahfeez') return null;

  // عرض تفاصيل الحلقة
  const handleViewHalaqahDetails = (halaqah) => {
    navigate('/halaqah-details', { state: { halaqah, course } });
  };

  return (
    <div className="min-h-screen bg-islamic-gray-light pt-20">
      {/* زر الرجوع */}
      <div className="container mx-auto px-4 py-4">
        <button
          onClick={() => navigate('/courses')}
          className="flex items-center space-x-2 rtl:space-x-reverse text-islamic-primary hover:text-islamic-light transition-colors font-cairo"
        >
          <ArrowRight size={20} />
          <span>العودة إلى الدورات</span>
        </button>
      </div>

      {/* رأس الصفحة */}
      <section className="bg-white py-12 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="font-amiri text-4xl font-bold text-islamic-primary mb-4">
                {course.title}
              </h1>
              <p className="font-cairo text-lg text-gray-600 mb-6 leading-relaxed">
                {course.description}
              </p>

              {/* إحصائيات الدورة */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-islamic-gray-light p-4 rounded-lg text-center">
                  <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse mb-2">
                    <User size={20} className="text-islamic-primary" />
                    <span className="font-cairo font-bold text-islamic-dark">
                      المدرسون: {
                        Array.isArray(course.instructors)
                          ? course.instructors.map((i) => i.name).join(', ')
                          : course.instructors || 'غير معروف'
                      }
                    </span>
                  </div>
                </div>

                <div className="bg-islamic-gray-light p-4 rounded-lg text-center">
                  <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse mb-2">
                    <Users size={20} className="text-islamic-golden" />
                    <span className="font-cairo font-bold text-2xl text-islamic-primary">
                      {Array.isArray(course.students) ? course.students.length : course.students}
                    </span>
                  </div>
                  <p className="font-cairo text-gray-600">طالب</p>
                </div>

                <div className="bg-islamic-gray-light p-4 rounded-lg text-center">
                  <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse mb-2">
                    <BookOpen size={20} className="text-islamic-light" />
                    <span className="font-cairo font-bold text-2xl text-islamic-primary">
                      {halqas.length}
                    </span>
                  </div>
                  <p className="font-cairo text-gray-600">حلقة</p>
                </div>
              </div>
            </div>

            <div>
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* قائمة الحلقات */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-amiri text-3xl font-bold text-islamic-primary mb-8 text-center">
            حلقات التحفيظ
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {halqas.map((halaqah) => (
              <GroupCard
                key={halaqah.id}
                halaqah={halaqah}
                onViewDetails={handleViewHalaqahDetails}
              />
            ))}
          </div>
        </div>
      </section>

      {/* معلومات إضافية */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-amiri text-3xl font-bold text-islamic-primary mb-6">
              عن برنامج تحفيظ القرآن الكريم
            </h2>
            <p className="font-cairo text-lg text-gray-600 leading-relaxed mb-8">
              يهدف برنامج تحفيظ القرآن الكريم إلى تعليم الطلاب حفظ كتاب الله عز وجل بطريقة منهجية ومدروسة، 
              مع التركيز على الحفظ المتقن والمراجعة المستمرة، بإشراف نخبة من المدرسين المتخصصين في التحفيظ.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-right">
              <div>
                <h3 className="font-cairo font-bold text-xl text-islamic-primary mb-4">
                  أهداف البرنامج
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="font-cairo">• حفظ القرآن الكريم كاملاً</li>
                  <li className="font-cairo">• إتقان التجويد والتلاوة</li>
                  <li className="font-cairo">• المراجعة المستمرة للمحفوظ</li>
                  <li className="font-cairo">• فهم معاني الآيات</li>
                </ul>
              </div>

              <div>
                <h3 className="font-cairo font-bold text-xl text-islamic-primary mb-4">
                  منهجية التعليم
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="font-cairo">• حلقات صغيرة لضمان الجودة</li>
                  <li className="font-cairo">• متابعة فردية لكل طالب</li>
                  <li className="font-cairo">• برنامج مراجعة منتظم</li>
                  <li className="font-cairo">• تقييم دوري للتقدم</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TahfeezCourse;
