import React from "react";
import { BookOpen, User } from "lucide-react";

const StudentCard = ({ student, onViewProfile, showCurrentCourse = true }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* صورة الطالب */}
      <div className="relative h-32 overflow-hidden">
        <img
          src={student.student_img}
          alt={student.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute top-2 right-2 bg-islamic-primary text-white px-2 py-0.5 rounded-full text-xs font-cairo">
          {student.id}
        </div>
      </div>

      {/* محتوى الكارد */}
      <div className="p-4">
        <h3 className="font-cairo font-bold text-lg text-islamic-dark mb-2">
          {student.name}
        </h3>

        {/* الدورة الحالية */}
        {showCurrentCourse && student.currentCourses?.length > 0 && (
          <div className="bg-islamic-gray-light p-2 rounded-lg mb-3">
            <span className="text-sm font-cairo text-gray-600">
              الدورات الحالية:
            </span>
            <div className="mt-1">
              {student.courses.map((course, index) => (
                <span
                  key={index}
                  className="inline-block bg-islamic-primary text-white px-2 py-0.5 rounded text-xs font-cairo mr-1 mb-1"
                >
                  {course.title}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* المعلم */}
        {student.instructors &&
          (Array.isArray(student.instructors) ? (
            student.instructors.map((inst, i) => (
              <div
                key={i}
                className="flex items-center space-x-2 rtl:space-x-reverse mb-1"
              >
                <User size={16} className="text-islamic-light" />
                <span className="text-gray-700 font-cairo text-sm">
                  المعلم: {inst.name}
                </span>
              </div>
            ))
          ) : (
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-3">
              <User size={16} className="text-islamic-light" />
              <span className="text-gray-700 font-cairo text-sm">
                المعلم: {student.instructors.name}
              </span>
            </div>
          ))}

        {/* زر عرض الملف الشخصي */}
        <button
          onClick={() => onViewProfile(student)}
          className="w-full bg-islamic-primary text-white py-2 px-3 rounded-md font-cairo text-sm font-medium hover:bg-islamic-light transition-colors duration-200"
        >
          عرض الملف الشخصي
        </button>
      </div>
    </div>
  );
};

export default StudentCard;
