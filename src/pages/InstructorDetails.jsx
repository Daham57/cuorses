import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  User,
  Phone,
  Mail,
  GraduationCap,
  Award,
  Edit3,
  Save,
  X,
} from "lucide-react";

import StudentCard from "../components/StudentCard";
import { getInstructors } from "../data/mockData";
import { AuthContext } from "@/context/AuthContext";
import CourseCard from "../components/CourseCard";
import LoadingSpinner from "../components/LoadingSpinner";

const InstructorDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { instructor: instructorFromState, studentId } = location.state || {};
  const { isLoggedIn, userRole, userEmail } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [instructor, setInstructor] = useState(instructorFromState || null);
  const [student, setStudent] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [loading, setLoading] = useState(false);
  console.log("🧪 instructorFromState موجود؟", instructorFromState);

  useEffect(() => {
    const fetchInstructorByEmail = async () => {
      if (!instructorFromState && userRole === "teacher" && userEmail) {
        setLoading(true);
        const allInstructors = await getInstructors();

        console.log("📩 userEmail from context:", userEmail);
        console.log("📚 all instructors:", allInstructors);

        const matched = allInstructors.find((ins) => ins.email === userEmail);

        if (matched) {
          console.log("✅ matched instructor:", matched);
          setInstructor(matched);
        } else {
          console.warn("❌ No instructor matched the email!");
          navigate("/instructors");
        }
        setLoading(false);
      }
    };

    fetchInstructorByEmail();
  }, [instructorFromState, userRole, userEmail, navigate]);
  useEffect(() => {
    if (instructor && Array.isArray(instructor.courses)) {
      setCourses(instructor.courses);
    }
  }, [instructor]);

  const handleViewDetails = (course) => {
    if (course.type === "TahfeezCourse") {
      navigate("/tahfeez-course", {
        state: { course },
      });
    } else {
      navigate("/lessons", { state: { course } });
    }
  };
  useEffect(() => {
    if (instructor && Array.isArray(instructor.students)) {
      setStudent(instructor.students);
    } else {
      setStudent([]);
    }
  }, [instructor]);

  const handleViewProfile = (student) => {
    navigate(`/student-profile/${student.id}`);
  };


  const handleEditProgress = (student) => {
    setEditingStudent(student.id);
    const progress =
      student.progress ||
      Math.round((student.currentJuzPages / student.totalJuzPages) * 100);

    setEditForm({
      currentJuz: student.currentJuz,
      progress: progress,
      notes: student.notes || "",
    });
  };

  const handleSaveEdit = () => {
    alert("تم حفظ التعديلات بنجاح!");
    setEditingStudent(null);
    setEditForm({});
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
    setEditForm({});
  };

  if (!instructor) {
    return (
      <LoadingSpinner 
        message="جاري تحميل بيانات المدرس..." 
        fullScreen={true}
        size="xlarge"
      />
    );
  }

  if (loading) {
    return (
      <LoadingSpinner 
        message="جاري تحميل بيانات المدرس..." 
        fullScreen={true}
        size="xlarge"
      />
    );
  }

  return (
    <div className="min-h-screen bg-islamic-gray-light">
      <div className="container mx-auto px-4 pt-24 pb-4">
        <button
          onClick={() => navigate("/instructors")}
          className="flex items-center space-x-2 rtl:space-x-reverse text-islamic-primary hover:text-islamic-light transition-colors font-cairo"
        >
          <ArrowRight size={20} />
          <span>العودة إلى المدرسين</span>
        </button>
      </div>

      <section className="bg-white py-12 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-6 rtl:space-x-reverse mb-8">
            <div className="relative">
              <img
                src={instructor.image}
                alt={instructor.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-islamic-golden shadow-lg"
              />
            </div>
            <div>
              <h1 className="font-amiri text-4xl font-bold text-islamic-golden mb-2">
                مرحباً الأستاذ {instructor.name}
              </h1>
              <p className="font-cairo text-xl text-gray-600">
                لوحة تحكم المدرس - إدارة الطلاب والدورات
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <GraduationCap size={20} className="text-islamic-light" />
                  <span className="font-cairo text-gray-700">
                    الاختصاص : {instructor.certificate}
                  </span>
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <User size={20} className="text-islamic-primary" />
                  <span className="font-cairo text-gray-700">
                    الطلاب: {student.length}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-islamic-gray-light p-6 rounded-lg">
              <h3 className="font-cairo font-bold text-xl text-islamic-golden mb-4">
                المؤهلات و الشهادات
              </h3>
              <ul className="space-y-2">
                {Array.isArray(instructor.religious_qualifications) ? (
                  instructor.religious_qualifications.map(
                    (qualification, index) => (
                      <li
                        key={index}
                        className="flex items-center space-x-2 rtl:space-x-reverse"
                      >
                        <Award size={16} className="text-islamic-golden" />
                        <span className="font-cairo text-gray-700">
                          {qualification}
                        </span>
                      </li>
                    )
                  )
                ) : instructor.religious_qualifications ? (
                  <li className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Award size={16} className="text-islamic-golden" />
                    <span className="font-cairo text-gray-700">
                      {instructor.religious_qualifications}
                    </span>
                  </li>
                ) : (
                  <li className="font-cairo text-gray-500">لا توجد مؤهلات</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-amiri text-3xl font-bold text-islamic-golden mb-8">
            طلاب الأستاذ {instructor.name}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {student.map((student) => (
              <div key={student.id}>
                <StudentCard
                  student={{ ...student, instructors: instructor }}
                  onViewProfile={handleViewProfile}
                  showCurrentCourse={true}
                />

                <button
                  onClick={() => handleEditProgress(student)}
                  className="w-full mt-2 bg-islamic-golden text-white py-2 px-4 rounded-lg font-cairo font-medium hover:bg-opacity-90 transition-colors duration-200 flex items-center justify-center space-x-2 rtl:space-x-reverse"
                >
                  <Edit3 size={16} />
                  <span>تحديث التقدم</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-islamic-gray-light">
        <div className="container mx-auto px-4">
          <h2 className="font-amiri text-3xl font-bold text-islamic-golden mb-8">
            الدورات التي يدرسها الأستاذ {instructor.name}
          </h2>

          {courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onViewDetails={handleViewDetails}
                  totalStudentsAllCourses={
                    instructor.students ? instructor.students.length : 0
                  }
                />
              ))}
            </div>
          ) : (
            <p className="font-cairo text-gray-600 text-lg">
              لا توجد دورات متاحة حاليًا.
            </p>
          )}
        </div>
      </section>

      {editingStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-cairo font-bold text-xl text-islamic-golden">
                تحديث تقدم الطالب
              </h3>
              <button
                onClick={handleCancelEdit}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-cairo font-medium text-gray-700 mb-2">
                  الجزء الحالي
                </label>
                <input
                  type="text"
                  value={editForm.currentJuz}
                  onChange={(e) =>
                    setEditForm({ ...editForm, currentJuz: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-islamic-primary font-cairo"
                />
              </div>

              <div>
                <label className="block font-cairo font-medium text-gray-700 mb-2">
                  نسبة التقدم (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={editForm.progress}
                  onChange={(e) =>
                    setEditForm({ ...editForm, progress: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-islamic-primary font-cairo"
                />
              </div>

              <div>
                <label className="block font-cairo font-medium text-gray-700 mb-2">
                  ملاحظات
                </label>
                <textarea
                  value={editForm.notes}
                  onChange={(e) =>
                    setEditForm({ ...editForm, notes: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-islamic-primary font-cairo"
                  rows={4}
                />
              </div>

              <div className="flex justify-end space-x-4 rtl:space-x-reverse">
                <button
                  onClick={handleCancelEdit}
                  className="px-6 py-2 font-cairo rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  إلغاء
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-6 py-2 font-cairo rounded-lg bg-islamic-golden text-white hover:bg-yellow-700 transition-colors"
                >
                  حفظ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorDetails;
