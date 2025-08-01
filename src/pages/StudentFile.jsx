import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, User, BookOpen, Award, Calendar, Edit3, Save, X, Plus } from 'lucide-react';

const StudentFile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { student } = location.state || {};

  // تأكد من وجود الطالب
  if (!student) {
    navigate('/instructors');
    return null;
  }

  // هنا نجيب المدرس مباشرة من داخل الطالب
const instructor = student?.instructor;

if (!student || !instructor) {
  navigate('/instructors');
  return null;
}

  const [editingExam, setEditingExam] = useState(null);
  const [newExam, setNewExam] = useState({ title: '', date: '', grade: '', score: '' });
  const [showAddExam, setShowAddExam] = useState(false);

  // إضافة امتحان جديد
  const handleAddExam = () => {
    if (newExam.title && newExam.date && newExam.grade && newExam.score) {
      alert('تم إضافة الامتحان بنجاح!');
      setNewExam({ title: '', date: '', grade: '', score: '' });
      setShowAddExam(false);
    }
  };

  // تحرير امتحان
  const handleEditExam = (exam) => {
    setEditingExam(exam.id);
  };

  // حفظ تعديل الامتحان
  const handleSaveExam = () => {
    alert('تم حفظ التعديلات بنجاح!');
    setEditingExam(null);
  };
  return (
    <div className="min-h-screen bg-islamic-gray-light pt-20">
      {/* زر الرجوع */}
      <div className="container mx-auto px-4 py-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 rtl:space-x-reverse text-islamic-primary hover:text-islamic-light transition-colors font-cairo"
        >
          <ArrowRight size={20} />
          <span>العودة</span>
        </button>
      </div>

      {/* معلومات الطالب */}
      <section className="bg-white py-12 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="font-amiri text-4xl font-bold text-islamic-primary mb-4">
                ملف الطالب: {student.name}
              </h1>
              
              {/* معلومات أساسية */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-islamic-gray-light p-4 rounded-lg text-center">
                  <User size={24} className="text-islamic-primary mx-auto mb-2" />
                  <h3 className="font-cairo font-bold text-lg text-islamic-dark">
                    {student.age} سنة
                  </h3>
                  <p className="font-cairo text-gray-600 text-sm">العمر</p>
                </div>
                
                <div className="bg-islamic-gray-light p-4 rounded-lg text-center">
                  <BookOpen size={24} className="text-islamic-golden mx-auto mb-2" />
                  <h3 className="font-cairo font-bold text-lg text-islamic-dark">
                    {student.quran_memorized_parts}
                  </h3>
                  <p className="font-cairo text-gray-600 text-sm">الاجزاء المحفوظة</p>
                </div>
              </div>

              {/* معلومات المدرس */}
              <div className="bg-islamic-gray-light p-6 rounded-lg mb-6">
                <h3 className="font-cairo font-bold text-xl text-islamic-primary mb-4">
                  معلومات المدرس المشرف
                </h3>
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <img
                    src={instructor.image}
                    alt={instructor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-cairo font-bold text-lg text-islamic-dark">
                      {instructor.name}
                    </h4>
                    <p className="font-cairo text-gray-600">{instructor.certificate}</p>
                  </div>
                </div>
              </div>

              {/* ملاحظات */}
              <div className="bg-islamic-gray-light p-6 rounded-lg">
                <h3 className="font-cairo font-bold text-xl text-islamic-primary mb-4">
                  ملاحظات المدرس
                </h3>
                <p className="font-cairo text-gray-700 leading-relaxed">
                  {student.notes}
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <img
                src={student.student_img}
                alt={student.name}
                className="w-full max-w-sm h-64 object-cover rounded-lg shadow-lg mx-auto mb-4"
              />
              
              {/* التقدم الحالي */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-cairo font-bold text-lg text-islamic-primary mb-4">
                  الجزء الحالي
                </h3>
                <div className="text-center mb-4">
                  <div className="w-24 h-24 bg-islamic-primary rounded-full flex items-center justify-center mx-auto mb-2">
                    <BookOpen size={32} className="text-white" />
                  </div>
                  <h4 className="font-cairo font-bold text-xl text-islamic-dark">
                    {student.currentJuz}
                  </h4>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-cairo text-gray-600">التقدم:</span>
                    <span className="font-cairo font-bold text-islamic-primary">
                      {student.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-islamic-primary h-3 rounded-full transition-all duration-300"
                      style={{ width: `${student.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* الأجزاء المكتملة */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-amiri text-3xl font-bold text-islamic-primary mb-8">
            الأجزاء المكتملة
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {student.completedAjzaa.map((juz, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award size={24} className="text-white" />
                </div>
                <h3 className="font-cairo font-bold text-lg text-islamic-dark mb-2">
                  {juz}
                </h3>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-cairo">
                  مكتمل
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* الامتحانات والتقييمات */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-amiri text-3xl font-bold text-islamic-primary">
              الامتحانات والتقييمات
            </h2>
            <button
              onClick={() => setShowAddExam(true)}
              className="bg-islamic-golden text-white px-6 py-2 rounded-lg font-cairo font-medium hover:bg-opacity-90 transition-colors flex items-center space-x-2 rtl:space-x-reverse"
            >
              <Plus size={20} />
              <span>إضافة امتحان</span>
            </button>
          </div>
          
          <div className="space-y-6">
            {student.exams.map((exam) => (
              <div key={exam.id} className="bg-islamic-gray-light p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  <div>
                    <h3 className="font-cairo font-bold text-lg text-islamic-dark mb-1">
                      {exam.title}
                    </h3>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Calendar size={16} className="text-islamic-primary" />
                      <span className="font-cairo text-gray-600 text-sm">{exam.date}</span>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <span className="font-cairo text-gray-600 text-sm">الدرجة</span>
                    <p className="font-cairo font-bold text-2xl text-islamic-primary">
                      {exam.score}
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <span className={`font-cairo px-3 py-1 rounded-full text-sm ${
                      exam.grade === 'ممتاز' 
                        ? 'bg-green-100 text-green-800' 
                        : exam.grade === 'جيد جداً'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {exam.grade}
                    </span>
                  </div>
                  
                  <div className="text-center">
                    <button
                      onClick={() => handleEditExam(exam)}
                      className="bg-islamic-primary text-white px-4 py-2 rounded-lg font-cairo text-sm hover:bg-islamic-light transition-colors flex items-center space-x-2 rtl:space-x-reverse mx-auto"
                    >
                      <Edit3 size={16} />
                      <span>تعديل</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-amiri text-3xl font-bold text-islamic-golden mb-8">
            سجل الحضور
          </h2>

          {/* 🟢 بطاقات الدورات */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {student?.courses?.map((course, index) => (
              <div
                key={index}
                onClick={() =>
                  setSelectedCourse(selectedCourse === course ? null : course)
                }
                className="bg-islamic-gray-light p-6 rounded-lg cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-islamic-primary"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <BookOpen size={24} className="text-islamic-primary" />
                    <h3 className="font-cairo font-bold text-lg text-islamic-dark">
                      {course.title}
                    </h3>
                  </div>
                  <div className="text-islamic-primary">
                    {selectedCourse === course ? "▼" : "▶"}
                  </div>
                </div>
                <p className="font-cairo text-gray-600 text-sm mt-2">
                  انقر لعرض سجل الحضور التفصيلي
                </p>
              </div>
            ))}
          </div>

          {/* 🟢 جدول الحضور للدورة المحددة */}
          {selectedCourse && (
            <div className="bg-white border-2 border-islamic-primary rounded-lg p-6">
              <h3 className="font-cairo font-bold text-xl text-islamic-primary mb-6">
                سجل الحضور - {selectedCourse.title}
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-islamic-gray-light">
                      <th className="font-cairo font-bold text-islamic-dark p-3 text-right">
                        التاريخ
                      </th>
                      <th className="font-cairo font-bold text-islamic-dark p-3 text-right">
                        الوقت
                      </th>
                      <th className="font-cairo font-bold text-islamic-dark p-3 text-right">
                        الحالة
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedCourse.lessons
                      .map((lesson) => {
                        const lessonAttendance = attendance.find(
                          (a) =>
                            a.lesson_details.id === lesson.id &&
                            a.student.id === student.id.toString()
                        );

                        return {
                          date: lesson.date,
                          time:
                            lessonAttendance?.student_attendance_time ?? "—",
                          status:
                            lessonAttendance?.student_attendance === 1
                              ? "حاضر"
                              : lessonAttendance?.student_attendance === 0
                              ? "غائب"
                              : "—",
                        };
                      })
                      .filter(Boolean)
                      .map((record, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-200 hover:bg-gray-50"
                        >
                          <td className="font-cairo p-3">
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                              <Calendar
                                size={16}
                                className="text-islamic-primary"
                              />
                              <span>{record.date}</span>
                            </div>
                          </td>
                          <td className="font-cairo p-3">
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                              <Clock
                                size={16}
                                className="text-islamic-golden"
                              />
                              <span>{record.time}</span>
                            </div>
                          </td>
                          <td className="font-cairo p-3">
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                              <CheckCircle
                                size={16}
                                className={
                                  record.status === "حاضر"
                                    ? "text-green-600"
                                    : record.status === "غائب"
                                    ? "text-red-600"
                                    : "text-gray-400"
                                }
                              />
                              <span
                                className={`px-3 py-1 rounded-full text-sm ${
                                  record.status === "حاضر"
                                    ? "bg-green-100 text-green-800"
                                    : record.status === "غائب"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                {record.status}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {/* 🟢 إحصائيات الحضور */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {(() => {
                  const records = selectedCourse.lessons
                    .map((lesson) => {
                      const att = attendance.find(
                        (a) =>
                          a.lesson_details.id === lesson.id &&
                          a.student.id === student.id.toString()
                      );
                      return att ? att.student_attendance : null;
                    })
                    .filter((val) => val !== null);

                  const present = records.filter((val) => val === 1).length;
                  const absent = records.filter((val) => val === 0).length;
                  const percentage =
                    records.length > 0
                      ? Math.round((present / records.length) * 100)
                      : 0;

                  return (
                    <>
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <h4 className="font-cairo font-bold text-green-800 text-lg">
                          {present}
                        </h4>
                        <p className="font-cairo text-green-600 text-sm">
                          أيام حضور
                        </p>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg text-center">
                        <h4 className="font-cairo font-bold text-red-800 text-lg">
                          {absent}
                        </h4>
                        <p className="font-cairo text-red-600 text-sm">
                          أيام غياب
                        </p>
                      </div>
                      <div className="bg-islamic-gray-light p-4 rounded-lg text-center">
                        <h4 className="font-cairo font-bold text-islamic-primary text-lg">
                          {percentage}%
                        </h4>
                        <p className="font-cairo text-gray-600 text-sm">
                          نسبة الحضور
                        </p>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* نافذة إضافة امتحان */}
      {showAddExam && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-cairo font-bold text-xl text-islamic-primary">
                إضافة امتحان جديد
              </h3>
              <button
                onClick={() => setShowAddExam(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block font-cairo font-medium text-gray-700 mb-2">
                  عنوان الامتحان
                </label>
                <input
                  type="text"
                  value={newExam.title}
                  onChange={(e) => setNewExam({...newExam, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-islamic-primary focus:border-transparent font-cairo"
                  placeholder="مثال: امتحان جزء عم"
                />
              </div>
              
              <div>
                <label className="block font-cairo font-medium text-gray-700 mb-2">
                  تاريخ الامتحان
                </label>
                <input
                  type="date"
                  value={newExam.date}
                  onChange={(e) => setNewExam({...newExam, date: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-islamic-primary focus:border-transparent font-cairo"
                />
              </div>
              
              <div>
                <label className="block font-cairo font-medium text-gray-700 mb-2">
                  التقدير
                </label>
                <select
                  value={newExam.grade}
                  onChange={(e) => setNewExam({...newExam, grade: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-islamic-primary focus:border-transparent font-cairo"
                >
                  <option value="">اختر التقدير</option>
                  <option value="ممتاز">ممتاز</option>
                  <option value="جيد جداً">جيد جداً</option>
                  <option value="جيد">جيد</option>
                  <option value="مقبول">مقبول</option>
                </select>
              </div>
              
              <div>
                <label className="block font-cairo font-medium text-gray-700 mb-2">
                  الدرجة (من 100)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={newExam.score}
                  onChange={(e) => setNewExam({...newExam, score: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-islamic-primary focus:border-transparent font-cairo"
                />
              </div>
            </div>
            
            <div className="flex space-x-4 rtl:space-x-reverse mt-6">
              <button
                onClick={handleAddExam}
                className="flex-1 bg-islamic-primary text-white py-2 px-4 rounded-lg font-cairo font-medium hover:bg-islamic-light transition-colors flex items-center justify-center space-x-2 rtl:space-x-reverse"
              >
                <Save size={16} />
                <span>حفظ</span>
              </button>
              <button
                onClick={() => setShowAddExam(false)}
                className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg font-cairo font-medium hover:bg-gray-600 transition-colors"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentFile;