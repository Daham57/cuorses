import React from 'react';
import { Users, User } from 'lucide-react';

const GroupCard = ({ halaqah, onViewDetails }) => {
  const instructorName = Array.isArray(halaqah.instructor) && halaqah.instructor.length > 0
    ? halaqah.instructor[0].name
    : 'مدرس غير معروف';

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* صورة المجموعة */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={halaqah.image || '/images/default-halaqah.jpg'}
          alt={`حلقة ${instructorName}`}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      {/* محتوى البطاقة */}
      <div className="p-6">
        <h3 className="font-cairo font-bold text-xl text-islamic-dark mb-4">
          {halaqah.title || 'عنوان الحلقة غير متوفر'}
        </h3>

        {/* معلومات المدرس */}
        <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <User size={16} className="text-islamic-primary" />
            <span className="font-cairo font-medium text-islamic-dark">
              {instructorName}
            </span>
          </div>
        </div>

        {/* عدد الطلاب */}
        <div className="flex items-center space-x-2 rtl:space-x-reverse mb-6">
          <Users size={18} className="text-islamic-golden" />
          <span className="text-gray-700 font-cairo">
            {Array.isArray(halaqah.students) ? halaqah.students.length : 0} طالب
          </span>
        </div>

        {/* زر التفاصيل */}
        <button
          onClick={() => onViewDetails(halaqah)}
          className="w-full bg-islamic-primary text-white py-3 px-4 rounded-lg font-cairo font-medium hover:bg-islamic-light transition-colors duration-200"
        >
          عرض تفاصيل الحلقة
        </button>
      </div>
    </div>
  );
};

export default GroupCard;
