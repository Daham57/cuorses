import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Calendar,
  Clock,
  Award,
  ChevronDown,
  ChevronUp,
  Book,
  Users,
} from "lucide-react";
import { getAttendance, Recitations } from "../data/mockData";
import StudentCard from "@/components/StudentCard";

const HalaqahDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { halaqah, course } = location.state || {};

  const [expandedLessonIds, setExpandedLessonIds] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loadingLessonId, setLoadingLessonId] = useState(null);

  if (!halaqah) {
    navigate("/courses");
    return null;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  

  const toggleLesson = async (id) => {
    if (expandedLessonIds.includes(id)) {
      setExpandedLessonIds((prev) => prev.filter((lid) => lid !== id));
    } else {
      if (!attendance[id]) {
        try {
          setLoadingLessonId(id);
          const response = await getAttendance(id);

          // تنظيف البيانات مباشرة هنا:
          const cleanData = (response?.attendances || []).map((a) => ({
            student_attendance: a.student_attendance,
            student_attendance_time: a.student_attendance_time,
            student: {
              name: a.students?.name || "غير معروف",
              id: a.students?.id,
            },
          }));

          setAttendance((prev) => ({ ...prev, [id]: cleanData }));
        } catch (error) {
          console.error("فشل تحميل الحضور:", error);
          setAttendance((prev) => ({ ...prev, [id]: [] }));
        } finally {
          setLoadingLessonId(null);
        }
      }
      setExpandedLessonIds((prev) => [...prev, id]);
    }
  };

  const handleViewProfile = (student) => {
    navigate(`/student-profile/${student.id}`);
  };

  return (
    <div className="min-h-screen bg-islamic-gray-light pt-20">
      <div className="container mx-auto px-4 py-4">
        <button
          onClick={() => navigate("/tahfeez-course", { state: { course } })}
          className="flex items-center space-x-2 rtl:space-x-reverse text-islamic-primary hover:text-islamic-light transition-colors font-cairo"
        >
          <ArrowRight size={20} />
          <span>العودة إلى دورة التحفيظ</span>
        </button>
      </div>

      <section className="bg-white py-12 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="font-amiri text-4xl font-bold text-islamic-primary mb-4">
                حلقة التحفيظ
              </h1>
              <div className="flex items-center space-x-4 rtl:space-x-reverse mb-6 p-4 bg-islamic-gray-light rounded-lg">
                <div>
                  <h3 className="font-cairo font-bold text-xl text-islamic-dark">
                    {Array.isArray(halaqah.instructor)
                      ? halaqah.instructor.map((i) => i.name).join(", ")
                      : halaqah.instructor?.name || "غير معروف"}
                  </h3>
                  <p className="font-cairo text-gray-600">مدرس التحفيظ</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-islamic-gray-light p-4 rounded-lg text-center">
                  <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse mb-2">
                    <Users size={20} className="text-islamic-primary" />
                    <span className="font-cairo font-bold text-2xl text-islamic-primary">
                      {halaqah.students.length}
                    </span>
                  </div>
                  <p className="font-cairo text-gray-600">طالب في الحلقة</p>
                </div>
                <div className="bg-islamic-gray-light p-4 rounded-lg text-center">
                  <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse mb-2">
                    <Award size={20} className="text-islamic-golden" />
                    <span className="font-cairo font-bold text-2xl text-islamic-primary">
                      {halaqah.lessons?.length || 0}
                    </span>
                  </div>
                  <p className="font-cairo text-gray-600">جلسة تعليمية</p>
                </div>
              </div>
            </div>
            <div>
              <img
                src={halaqah.image}
                alt="صورة الحلقة"
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-amiri text-3xl font-bold text-islamic-primary mb-8">
            الجلسات التعليمية
          </h2>

          <div className="space-y-6">
            {halaqah.lessons?.map((lesson) => {
              const lessonAttendance = Array.isArray(attendance[lesson.id])
                ? attendance[lesson.id]
                : [];
                const totalMarked =
  lessonAttendance.filter((a) => a.student_attendance === 1 || a.student_attendance === 0).length;

              const attendanceRate =
  totalMarked > 0
    ? (lessonAttendance.filter((a) => a.student_attendance === 1).length / totalMarked) * 100
    : 0;

              const isExpanded = expandedLessonIds.includes(lesson.id);
              return (
                <div
                  key={lesson.id}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm transition-all duration-300"
                >
                  {/* عنوان الجلسة */}
                  <button
                    onClick={() => toggleLesson(lesson.id)}
                    className="w-full flex justify-between items-center p-4 font-cairo text-lg font-bold text-islamic-dark bg-gray-50 hover:bg-gray-100 rounded-t-xl"
                  >
                    <div className="flex items-center gap-2 rtl:space-x-reverse">
                      <Calendar size={18} className="text-islamic-primary" />
                      <span>{lesson.lesson_title || "جلسة بدون عنوان"}</span>
                      {new Date(lesson.lesson_date) >= new Date() && (
                        <span className="text-xs text-green-600 ml-2">
                          قادم
                        </span>
                      )}
                    </div>
                    {isExpanded ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </button>

                  {/* التفاصيل */}
                  {isExpanded && (
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6 border-t border-gray-100 bg-white">
                      {/* التاريخ والوقت ونسبة الحضور */}
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 text-gray-600 mb-2">
                          <Calendar
                            size={18}
                            className="text-islamic-primary"
                          />
                          <span className="font-cairo">
                            {lesson.lesson_date}
                          </span>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-gray-600 mb-4">
                          <Clock size={18} className="text-islamic-golden" />
                          <span className="font-cairo">
                            {halaqah.course_start_time || "غير محدد"}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-green-500 h-1.5 rounded-full transition-all duration-500"
                            style={{ width: `${attendanceRate}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-500 mt-2 font-cairo">
                          نسبة الحضور: {Math.round(attendanceRate)}%
                        </p>
                      </div>

                      {/* قائمة الحضور */}
                      <div>
                        <h4 className="font-cairo font-bold text-lg mb-3 text-islamic-golden flex items-center gap-2">
                          <Users size={18} className="text-islamic-primary" />
                          الحضور ({lessonAttendance.length} طالب)
                        </h4>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {lessonAttendance.map((record, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 font-cairo text-sm text-gray-700"
                            >
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  record.student_attendance
                                    ? "bg-green-500"
                                    : "bg-red-400"
                                }`}
                              />
                              <span>{record.student.name}</span>
                              {!record.student_attendance && (
                                <span className="text-xs text-gray-400">
                                  (غائب)
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* أوقات الحضور */}
                      <div>
                        <h4 className="font-cairo font-bold text-lg mb-3 text-islamic-golden flex items-center gap-2">
                          <Clock size={18} className="text-islamic-primary" />
                          وقت حضور الطالب
                        </h4>
                        <div className="space-y-2 max-h-48 overflow-y-auto text-sm text-gray-700 font-cairo">
                          {lessonAttendance.map((record, index) => (
                            <div
                              key={index}
                              className="flex justify-between border-b pb-1 border-gray-100"
                            >
                              <span>{record.student.name}</span>
                              <span>
                                {record.student_attendance
                                  ? record.student_attendance_time || "-"
                                  : "-"}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* التسميعات */}
                      <div>
                        <h4 className="font-cairo font-bold text-lg mb-3 text-islamic-golden flex items-center gap-2">
                          <Book size={18} className="text-islamic-primary" />
                          التسميعات
                        </h4>
                        {Recitations.length > 0 ? (
                          <ul className="list-disc list-inside font-cairo text-gray-700 text-sm max-h-48 overflow-auto space-y-2">
                            {Recitations.map((recitation) => (
                              <li key={recitation.student_id}>
                                <div className="flex flex-col">
                                  <span className="font-bold">
                                    {recitation.student_name}
                                  </span>
                                  <span>
                                    التقييم:{" "}
                                    {recitation.recitation_evaluation ||
                                      "غير مقيّم"}
                                  </span>
                                  <span>
                                    الصفحات:{" "}
                                    {Array.isArray(
                                      recitation.recitation_per_page
                                    )
                                      ? recitation.recitation_per_page.join(
                                          ", "
                                        )
                                      : "لا يوجد"}
                                  </span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="text-gray-500 font-cairo text-sm flex items-center gap-1">
                            <span>📭</span>
                            <span>لا توجد تسميعات لهذه الجلسة.</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HalaqahDetails;
