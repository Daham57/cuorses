import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CourseCard from "../components/CourseCard";
import { NGROK_BASE_URL } from "../data/mockData";
import LoadingSpinner from "../components/LoadingSpinner";

const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${NGROK_BASE_URL}/courses`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        });

        console.log("Courses fetched:", res.data);

        let fetchedCourses = [];

        if (Array.isArray(res.data)) {
          fetchedCourses = res.data;
        } else if (Array.isArray(res.data.courses)) {
          fetchedCourses = res.data.courses;
        } else {
          console.error("Unexpected data structure:", res.data);
          fetchedCourses = [];
        }

        // فلترة دورات تحفيظ القرآن
        const halqa = fetchedCourses.filter(
          (course) => course.type === "TahfeezCourse"
        );

        // حساب عدد الطلاب
        const totalTahfeezStudents = halqa.reduce((sum, course) => {
          return sum + (Array.isArray(course.students) ? course.students.length : 0);
        }, 0);

        // حساب عدد المعلمين
        const totalTahfeezTeachers = halqa.reduce((sum, course) => {
          return sum + (Array.isArray(course.instructor) ? course.instructor.length : 0);
        }, 0);

        // إنشاء دورة تحفيظ عامة
        const tahfeezCourse = {
          id: 999,
          title: "تحفيظ القرآن الكريم",
          description: "برنامج شامل لحفظ القرآن الكريم",
          image:
            "https://images.pexels.com/photos/8154201/pexels-photo-8154201.jpeg?auto=compress&cs=tinysrgb&w=400",
          type: "tahfeez",
          students: Array(totalTahfeezStudents).fill("طالب"),
          instructor: Array(totalTahfeezTeachers).fill({ name: "مدرس" }),
          maxStudents: 50,
          halqas: halqa, // ✅ إرسال الحلقات مع الدورة
        };

        // تصفية باقي الدورات
        const filteredCourses = fetchedCourses.filter(
          (course) => course.type !== "TahfeezCourse"
        );

        const finalCourses = [...filteredCourses, tahfeezCourse];
        setCourses(finalCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleViewDetails = (course) => {
    if (course.type === "tahfeez") {
      navigate("/tahfeez-course", {
        state: {
          course,
          halqas: course.halqas || [], // ✅ تمرير الحلقات
        },
      });
    } else {
      navigate("/lessons", { state: { course } });
    }
  };

  if (loading) {
    return (
      <LoadingSpinner 
        message="جاري تحميل الدورات المتاحة..." 
        fullScreen={true}
        size="xlarge"
      />
    );
  }

  const totalStudentsAllCourses = courses.reduce((total, course) => {
    const count = Array.isArray(course.students)
      ? course.students.length
      : course.students || 0;
    return total + count;
  }, 0);

  return (
    <div className="min-h-screen bg-islamic-gray-light">
      <section className="pt-20" style={{ backgroundColor: "#0e4d3c" }}>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center text-white">
            <h1 className="font-amiri text-4xl md:text-5xl font-bold mb-4 text-islamic-golden">
              دوراتنا التعليمية
            </h1>
            <p className="font-cairo text-xl opacity-90 max-w-2xl mx-auto">
              اختر من مجموعة متنوعة من الدورات المتخصصة في تعليم القرآن الكريم وعلومه
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onViewDetails={handleViewDetails}
                  totalStudentsAllCourses={totalStudentsAllCourses}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-lg font-cairo mt-10 text-gray-600">
              لا توجد دورات متاحة حاليًا.
            </p>
          )}
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-islamic-primary rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-2xl">+</span>
              </div>
              <h3 className="font-cairo font-bold text-3xl text-islamic-primary">
                {courses.length}
              </h3>
              <p className="font-cairo text-gray-600">دورة تعليمية</p>
            </div>

            <div className="space-y-4">
              <div className="w-16 h-16 bg-islamic-golden rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-2xl">+</span>
              </div>
              <h3 className="font-cairo font-bold text-3xl text-islamic-primary">
                {totalStudentsAllCourses}
              </h3>
              <p className="font-cairo text-gray-600">طالب مسجل</p>
            </div>

            <div className="space-y-4">
              <div className="w-16 h-16 bg-islamic-light rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-2xl">+</span>
              </div>
              <h3 className="font-cairo font-bold text-3xl text-islamic-primary">
                10
              </h3>
              <p className="font-cairo text-gray-600">مدرس متخصص</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;
