import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getInstructors, getStudents } from "../data/mockData"; // جلب من API
import SearchBar from "../components/SearchBar";
import StudentCard from "../components/StudentCard";
import LoadingSpinner from "../components/LoadingSpinner";

const Students = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchMode, setSearchMode] = useState("student"); // 'teacher' أو 'student'
  const [instructors, setInstructors] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // جلب البيانات من السيرفر
  useEffect(() => {
    const fetchData = async () => {
      const fetchedInstructors = await getInstructors();
      const fetchedStudents = await getStudents();
      setInstructors(fetchedInstructors);
      setStudents(fetchedStudents);
      setLoading(false);
    };

    fetchData();
  }, []);

  // فلترة البيانات حسب وضع البحث
  const getFilteredData = () => {
    if (searchMode === "teacher") {
      return instructors.filter((instructor) =>
        instructor.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      return students.filter(
        (student) =>
          student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (student.email &&
            student.email.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
  };

  const filteredData = getFilteredData();

  const handleInstructorClick = (instructor) => {
    navigate("/instructor-students", { state: { instructor } });
  };

  const handleViewProfile = (student) => {
    navigate(`/student-profile/${student.id}`);
  };

  if (loading) {
    return (
      <LoadingSpinner 
        message="جاري تحميل بيانات الطلاب والمدرسين..." 
        fullScreen={true}
        size="xlarge"
      />
    );
  }

  return (
    <div className="min-h-screen bg-islamic-gray-light">
      <section className="pt-20" style={{ backgroundColor: "#0e4d3c" }}>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center text-white">
            <h1 className="font-amiri text-4xl md:text-5xl font-bold mb-4 text-islamic-golden">
              طلابنا
            </h1>
            <p className="font-cairo text-xl opacity-90 max-w-2xl mx-auto">
              تعرف على المدرسين وطلابهم في رحلة تعلم القرآن الكريم
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-6">
            <div className="bg-islamic-gray-light rounded-lg p-1 flex">
              <button
                onClick={() => setSearchMode("teacher")}
                className={`px-6 py-2 rounded-md font-cairo transition-colors ${
                  searchMode === "teacher"
                    ? "bg-islamic-primary text-white"
                    : "text-gray-600 hover:text-islamic-primary"
                }`}
              >
                البحث بالمدرس
              </button>
              <button
                onClick={() => setSearchMode("student")}
                className={`px-6 py-2 rounded-md font-cairo transition-colors ${
                  searchMode === "student"
                    ? "bg-islamic-primary text-white"
                    : "text-gray-600 hover:text-islamic-primary"
                }`}
              >
                البحث بالطالب
              </button>
            </div>
          </div>

          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder={
              searchMode === "teacher"
                ? "البحث عن الطلاب بالمدرس..."
                : "البحث عن الطلاب بالاسم أو البريد الإلكتروني..."
            }
            className="mb-4"
          />

          <div className="text-center">
            <p className="font-cairo text-gray-600">
              {searchTerm
                ? `تم العثور على ${filteredData.length} نتيجة`
                : searchMode === "teacher"
                ? `عرض جميع المدرسين (${instructors.length})`
                : `عرض جميع الطلاب (${students.length})`}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {searchMode === "teacher" ? (
            <>
              <h2 className="font-amiri text-3xl font-bold text-islamic-golden mb-8 text-center">
                اختر المدرس لعرض طلابه
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredData.map((instructor) => (
                  <div
                    key={instructor.id}
                    onClick={() => handleInstructorClick(instructor)}
                    className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 group"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={instructor.image}
                        alt={instructor.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>

                    <div className="p-6">
                      <h3 className="font-cairo font-bold text-xl text-islamic-dark mb-2">
                        {instructor.name}
                      </h3>
                      <p className="text-islamic-primary font-cairo mb-4 font-medium">
                        {instructor.specialization}
                      </p>

                      <div className="text-center">
                        <button className="bg-islamic-primary text-white px-6 py-2 rounded-lg font-cairo hover:bg-islamic-light transition-colors">
                          عرض الطلاب
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <h2 className="font-amiri text-3xl font-bold text-islamic-golden mb-8 text-center">
                اختر الطالب لعرض ملفه الشخصي
              </h2>

              {/* قسم عرض الطلاب */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {filteredData.map((student) => (
                  <StudentCard
                    key={student.id}
                    student={student}
                    onViewProfile={handleViewProfile}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Students;
