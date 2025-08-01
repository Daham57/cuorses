import React from 'react';
import { Phone, BookOpen } from 'lucide-react';

const InstructorCard = ({ instructor, onContact, onViewDetails }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* صورة المدرس */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={instructor.image}
          alt={instructor.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      {/* محتوى الكارد */}
      <div className="p-6">
        <h3 className="font-cairo font-bold text-xl text-islamic-dark mb-2">
          {instructor.name}
        </h3>

        {/* المؤهلات */}
        <div className="mb-3">
          <h4 className="text-islamic-primary font-cairo font-medium mb-1">المؤهلات:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 font-cairo">
            {Array.isArray(instructor.religious_qualifications) ? (
              instructor.religious_qualifications.map((item, index) => (
                <li key={index}>{item}</li>
              ))
            ) : (
              <li>{instructor.religious_qualifications || "لا توجد مؤهلات"}</li>
            )}
          </ul>
        </div>

        {/* معلومات إضافية */}
        <div className="space-y-2 mb-4 text-sm text-gray-700 font-cairo">
          <div className="flex items-center gap-2">
            <BookOpen size={16} className="text-islamic-golden" />
            <span>{instructor.courses?.title || "لا توجد دورات"}</span>
          </div>
        </div>

        {/* رقم الهاتف فقط */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
            <Phone size={16} className="text-islamic-golden" />
            <span className="text-gray-600 font-cairo">{instructor.phone_number}</span>
          </div>
        </div>

        {/* الأزرار */}
        <div className="space-y-2">
          <button
            onClick={() => onViewDetails(instructor)}
            className="w-full bg-islamic-primary text-white py-3 px-4 rounded-lg font-cairo font-medium hover:bg-islamic-light transition-colors duration-200"
          >
            عرض التفاصيل
          </button>

          <button
            onClick={() => onContact(instructor)}
            className="w-full bg-islamic-golden text-white py-3 px-4 rounded-lg font-cairo font-medium hover:bg-opacity-90 transition-colors duration-200"
          >
            تواصل مع المدرس
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructorCard;
