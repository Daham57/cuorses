import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, User, Phone, Mail } from "lucide-react";
import StudentCard from "../components/StudentCard";

const InstructorStudents = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { instructor } = location.state || {};

  const [student, setStudent] = useState([]);

  useEffect(() => {
    if (!instructor) {
      navigate("/students");
      return;
    }

    if (Array.isArray(instructor.students)) {
      setStudent(instructor.students);
    } else {
      setStudent([]);
    }
  }, [instructor, navigate]);

  if (!instructor) return null;

  const certificate = Array.isArray(instructor.certificate)
    ? instructor.certificate.join("، ")
    : instructor.certificate;

  const avgProgress = student.length
    ? Math.round(
        student.reduce((acc, student) => acc + (student.progress || 0), 0) /
          student.length
      )
    : 0;

  const examCount = student.reduce(
    (acc, student) => acc + (student.exams?.length || 0),
    0
  );

  const advancedStudents = student.filter((s) => s.level === "متقدم").length;

  const handleViewProfile = (student) => {
    navigate(`/student-profile/${student.id}`);
  };

  return (
    <div className="min-h-screen bg-islamic-gray-light pt-20">
      {/* زر الرجوع */}
      <div className="container mx-auto px-4 py-4">
        <button
          onClick={() => navigate("/students")}
          className="flex items-center space-x-2 rtl:space-x-reverse text-islamic-primary hover:text-islamic-light transition-colors font-cairo"
        >
          <ArrowRight size={20} />
          <span>العودة إلى صفحة الطلاب</span>
        </button>
      </div>

      {/* معلومات المدرس */}
      <section className="bg-white py-12 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="font-amiri text-4xl font-bold text-islamic-golden mb-4">
                طلاب الأستاذ {instructor.name}
              </h1>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <Mail size={20} className="text-islamic-primary" />
                  <span className="font-cairo text-gray-700">
                    {instructor.email}
                  </span>
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <Phone size={20} className="text-islamic-golden" />
                  <span className="font-cairo text-gray-700">
                    {instructor.phone_number}
                  </span>
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <User size={20} className="text-islamic-light" />
                  <span className="font-cairo text-gray-700">
                    {certificate}
                  </span>
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

      {/* قائمة الطلاب */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-amiri text-3xl font-bold text-islamic-golden mb-8">
            طلاب الأستاذ {instructor.name}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {student.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
                onViewProfile={handleViewProfile}
              />
            ))}
          </div>
        </div>
      </section>

      {/* الإحصائيات */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-amiri text-3xl font-bold text-islamic-golden mb-8 text-center">
            إحصائيات طلاب الأستاذ {instructor.name}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-islamic-primary rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-xl">
                  {student.length}
                </span>
              </div>
              <h3 className="font-cairo font-bold text-2xl text-islamic-primary">
                {student.length}
              </h3>
              <p className="font-cairo text-gray-600">طالب نشط</p>
            </div>

            <div className="space-y-4">
              <div className="w-16 h-16 bg-islamic-golden rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-xl">
                  {advancedStudents}
                </span>
              </div>
              <h3 className="font-cairo font-bold text-2xl text-islamic-primary">
                {advancedStudents}
              </h3>
              <p className="font-cairo text-gray-600">طالب متقدم</p>
            </div>

            <div className="space-y-4">
              <div className="w-16 h-16 bg-islamic-light rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-xl">
                  {avgProgress}%
                </span>
              </div>
              <h3 className="font-cairo font-bold text-2xl text-islamic-primary">
                {avgProgress}%
              </h3>
              <p className="font-cairo text-gray-600">متوسط التقدم</p>
            </div>

            <div className="space-y-4">
              <div className="w-16 h-16 bg-islamic-primary rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-xl">
                  {examCount}
                </span>
              </div>
              <h3 className="font-cairo font-bold text-2xl text-islamic-primary">
                {examCount}
              </h3>
              <p className="font-cairo text-gray-600">امتحان مكتمل</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InstructorStudents;
