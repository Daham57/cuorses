import React from "react";
import { Users, User, Calendar, Clock } from "lucide-react";

const CourseCard = ({ course, onViewDetails, totalStudentsAllCourses }) => {
  const enrolled = Array.isArray(course.students)
    ? course.students.length
    : course.students || 0;

  const progress = totalStudentsAllCourses
    ? Math.round((enrolled / totalStudentsAllCourses) * 100)
    : 0;

  const formatStudentLabel = (count) => {
    if (count === 1) return "طالب";
    if (count === 2) return "طالبين";
    if (count >= 3 && count <= 10) return "طلاب";
    return "طالب";
  };

  let teachersNames = "";
  if (course.type === "tahfeez") {
    teachersNames = course.teachers || course.instructors || "";
  } else if (Array.isArray(course.instructor)) {
    teachersNames = course.instructor.map((ins) => ins.name).join(", ");
  } else if (course.instructor && course.instructor.name) {
    teachersNames = course.instructor.name;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* صورة الدورة */}  
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      {/* محتوى الكارد */}  
      <div className="p-6">
        <h3 className="font-cairo font-bold text-xl text-islamic-dark mb-2">
          {course.title}
        </h3>

        <p className="text-gray-600 font-cairo mb-4 leading-relaxed">
          {course.description}
        </p>

        <div className="space-y-3 mb-4">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <User size={18} className="text-islamic-primary" />
            <span className="text-gray-700 font-cairo">
              {teachersNames || "لا يوجد مدرس"}
            </span>
          </div>

          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Users size={18} className="text-islamic-primary" />
            <span className="text-gray-700 font-cairo">
              {enrolled} {formatStudentLabel(enrolled)}
            </span>
          </div>

          {course.start_date && (
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Calendar size={18} className="text-islamic-golden" />
              <span className="text-gray-700 font-cairo text-sm">
                بدء الدورة: {course.start_date}
              </span>
            </div>
          )}

          {course.course_start_time && (
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Clock size={18} className="text-islamic-light" />
              <span className="text-gray-700 font-cairo text-sm">
                الوقت: {course.course_start_time}
              </span>
            </div>
          )}
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-cairo text-gray-600">
              معدل الالتحاق
            </span>
            <span className="text-sm font-cairo text-islamic-primary font-bold">
              {progress}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-islamic-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <button
          onClick={() => onViewDetails(course)}
          className="w-full bg-islamic-primary text-white py-3 px-4 rounded-lg font-cairo font-medium hover:bg-islamic-light transition-colors duration-200"
        >
          عرض تفاصيل الدورة
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
