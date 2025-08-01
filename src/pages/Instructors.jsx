import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InstructorCard from "../components/InstructorCard";
import { getInstructors, NGROK_BASE_URL } from "../data/mockData";// استبدلها بمسار الـ API الصحيح
import LoadingSpinner from "../components/LoadingSpinner";

const Instructors = () => {
  const navigate = useNavigate();
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getInstructors();
      setInstructors(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleContactInstructor = (instructor) => {
    navigate("/contact-teacher", { state: { instructor } });
  };

  const handleViewDetails = (instructor) => {
    navigate(`/instructor-details/${instructor.id}`, {
      state: { instructor },
    });
  };

  if (loading) {
    return (
      <LoadingSpinner 
        message="جاري تحميل بيانات المدرسين..." 
        fullScreen={true}
        size="xlarge"
      />
    );
  }

  if (instructors.length === 0) {
    return (
      <LoadingSpinner 
        message="لا يوجد مدرسون متاحون حالياً" 
        fullScreen={true}
        size="large"
        showSpinner={false}
      />
    );
  }

  return (
    <div className="min-h-screen bg-islamic-gray-light">
      {/* الهيدر */}
      <section className="pt-20" style={{ backgroundColor: "#0e4d3c" }}>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center text-white">
            <h1 className="font-amiri text-4xl md:text-5xl font-bold mb-4 text-islamic-golden">
              مدرسونا
            </h1>
            <p className="font-cairo text-xl opacity-90 max-w-2xl mx-auto">
              تعرف على نخبة من أفضل المدرسين المتخصصين في تعليم القرآن الكريم
              وعلومه
            </p>
          </div>
        </div>
      </section>

      {/* بطاقات المدرسين */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {instructors.map((instructor) => (
              <InstructorCard
                key={instructor.id}
                instructor={instructor}
                onContact={handleContactInstructor}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Instructors;
