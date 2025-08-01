import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-islamic-dark text-white">
      {/* القسم الرئيسي */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* معلومات الموقع */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <img
                src="/image/logo2.jpg"
                alt="شعار الموقع"
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-cairo font-bold text-xl">يختمون</span>
            </div>
            <p className="text-gray-300 font-cairo leading-relaxed">
              منصة تعليمية متخصصة في تعليم القرآن الكريم وعلومه، نسعى لنشر
              المعرفة القرآنية بأحدث الوسائل التعليمية.
            </p>
          </div>

          {/* روابط سريعة */}
          <div className="space-y-4">
            <h3 className="font-cairo font-bold text-lg text-islamic-golden">
              روابط سريعة
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-gray-300 hover:text-islamic-golden transition-colors font-cairo"
                >
                  الرئيسية
                </a>
              </li>
              <li>
                <a
                  href="/courses"
                  className="text-gray-300 hover:text-islamic-golden transition-colors font-cairo"
                >
                  الدورات
                </a>
              </li>
              <li>
                <a
                  href="/instructors"
                  className="text-gray-300 hover:text-islamic-golden transition-colors font-cairo"
                >
                  المدرسون
                </a>
              </li>
              <li>
                <a
                  href="/students"
                  className="text-gray-300 hover:text-islamic-golden transition-colors font-cairo"
                >
                  الطلاب
                </a>
              </li>
            </ul>
          </div>

          {/* الخدمات */}
          <div className="space-y-4">
            <h3 className="font-cairo font-bold text-lg text-islamic-golden">
              خدماتنا
            </h3>
            <ul className="space-y-2">
              <li className="text-gray-300 font-cairo">تحفيظ القرآن الكريم</li>
              <li className="text-gray-300 font-cairo">تعليم التجويد</li>
              <li className="text-gray-300 font-cairo">دروس التفسير</li>
              <li className="text-gray-300 font-cairo">العلوم الشرعية</li>
            </ul>
          </div>

          {/* معلومات الاتصال */}
          <div className="space-y-4">
            <h3 className="font-cairo font-bold text-lg text-islamic-golden">
              تواصل معنا
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Phone size={20} className="text-islamic-golden" />
                <span className="text-gray-300 font-cairo">
                  +963 986 928 733
                </span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Mail size={20} className="text-islamic-golden" />
                <span className="text-gray-300 font-cairo">
                  info@quranic-edu.com
                </span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <MapPin size={20} className="text-islamic-golden" />
                <span className="text-gray-300 font-cairo">
                  {" "}
                  مشروع دمر ،دمشق
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* وسائل التواصل الاجتماعي */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a
                href="#"
                className="text-gray-300 hover:text-islamic-golden transition-colors"
              >
                <Facebook size={24} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-islamic-golden transition-colors"
              >
                <Twitter size={24} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-islamic-golden transition-colors"
              >
                <Instagram size={24} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-islamic-golden transition-colors"
              >
                <Youtube size={24} />
              </a>
            </div>
            <p className="text-gray-300 font-cairo text-sm">
              © 2024 يختمون . جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
