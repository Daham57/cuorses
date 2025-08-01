import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Award, Users, MapPin, Waves, Gift, Heart, Lightbulb, Shield, Smile } from 'lucide-react';
import { topics } from '@/data/mockData';

const Home = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleTimelineItems, setVisibleTimelineItems] = useState([]);

  // 🟢 التنقل التلقائي للكاروسيل - يتم تغيير الشريحة كل 4 ثوانٍ

  // 🟢 مراقبة التمرير لإظهار عناصر الجدول الزمني بتأثير الحركة
  useEffect(() => {
    const handleScroll = () => {
      const timelineElements = document.querySelectorAll('.timeline-item');
      const windowHeight = window.innerHeight;
      
      timelineElements.forEach((element, index) => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight * 0.8) {
          setVisibleTimelineItems(prev => {
            if (!prev.includes(index)) {
              return [...prev, index];
            }
            return prev;
          });
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // تشغيل فوري للتحقق من العناصر المرئية
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 🟢 التنقل إلى الشريحة التالية في الكاروسيل
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % topics.length);
  };

  // 🟢 التنقل إلى الشريحة السابقة في الكاروسيل
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + topics.length) % topics.length);
  };

  // 🟢 بيانات الجدول الزمني للأنشطة الطلابية
  const timelineActivities = [
    {
      id: 1,
      title: "الذهاب إلى الملعب",
      description: "أنشطة رياضية أسبوعية لتعزيز اللياقة البدنية والعمل الجماعي بين الطلاب.",
      image: "/image/Football.jpg",
      icon: Users,
      side: 'right'
    },
    {
      id: 2,
      title: "رحلة ممتعة وتعليمية",
      description: "نجمع بين المتعة والتعلم من خلال الرحلات الميدانية المحفزة والممتعة.",
      image: "/image/Trip.jpg",
      icon: MapPin,
      side: 'left'
    },
    {
      id: 3,
      title: "زيارة المسبح",
      description: "جلسات سباحة آمنة ومنظمة تجلب الفرح والانتعاش الجسدي.",
      image: "/image/Swimming.jpg",
      icon: Waves,
      side: 'right'
    },
    {
      id: 4,
      title: "سوق ممتع في المسجد",
      description: "تجربة ممتعة تمزج بين الترفيه والمشاركة في بيئة مليئة بالإيمان.",
      image: "/image/Suoq.jpg",
      icon: Gift,
      side: 'left'
    },
    {
      id: 5,
      title: "جوائز للطلاب المتميزين",
      description: "نكرم التميز ونحفز الطلاب على العمل الجاد والالتزام المستمر.",
      image: "/image/Prizes.jpg",
      icon: Award,
      side: 'right'
    }
  ];

  // 🟢 القيم التي يكتسبها الطلاب من دورات القرآن الكريم
  const quranValues = [
    {
      id: 1,
      title: "الأخلاق الحسنة",
      description: "تعلم القيم الأخلاقية النبيلة من خلال تدبر آيات القرآن الكريم",
      icon: Heart,
      color: "bg-islamic-primary"
    },
    {
      id: 2,
      title: "مهارات الحياة",
      description: "اكتساب مهارات عملية للتعامل مع تحديات الحياة اليومية",
      icon: Lightbulb,
      color: "bg-islamic-golden"
    },
    {
      id: 3,
      title: "التعامل مع المواقف اليومية",
      description: "تطبيق تعاليم القرآن في المواقف المختلفة والتفاعل الإيجابي",
      icon: Shield,
      color: "bg-islamic-light"
    },
    {
      id: 4,
      title: "الصبر واللطف",
      description: "تنمية صفات الصبر والرحمة والتعامل بلطف مع الآخرين",
      icon: Smile,
      color: "bg-islamic-primary"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* خلفية الصفحة الرئيسية */}
            <div 
      className="relative min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `linear-gradient(rgba(14, 77, 60, 0.7), rgba(14, 77, 60, 0.7)), url('/image/BackGround.jpg')`
      }}
    >
      {/* المحتوى الرئيسي */}
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between min-h-screen px-6 py-16">
        
        {/* العنوان والشرح (يمين في RTL) */}
        <div className="lg:w-1/2 text-white space-y-6 text-center lg:text-right">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-amiri leading-tight" style={{ color: '#B88A2E' }}>
            يختمون
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-cairo" style={{ color: 'white' }}>
            لتعليم وتحفيظ القرآن الكريم
          </h2>
          <p className="text-lg md:text-xl font-cairo leading-relaxed opacity-90">
            دورة شاملة تهدف إلى تعليم القرآن الكريم تلاوةً وتدبراً وحفظاً، ضمن بيئة تعليمية إيمانية ملهمة تحت إشراف نخبة من المعلمين المتخصصين.
          </p>
        </div>

        {/* الصور: صورة كبيرة يسار + صورتان فوق بعض */}
        <div className="lg:w-1/2 flex gap-6 items-center lg:items-start mb-12 lg:mb-0 relative">
          {/* صورة كبيرة */}
          <img src="/image/01.jpg" alt="مسجد" className="w-2/3 h-[420px] object-cover rounded-3xl shadow-xl" />

          {/* صورتان فوق بعض */}
          <div className="flex flex-col gap-4 w-1/3">
            <img src="/image/02.jpg" alt="تعليم" className="h-1/2 object-cover rounded-3xl shadow-lg" />
            <img src="/image/03.jpg" alt="دعاء" className="h-1/2 object-cover rounded-3xl shadow-lg" />
          </div>
        </div>
      </div>
    </div>



      {/* قسم المواضيع - كاروسيل واحد في كل مرة */}
      <section className="py-20 bg-islamic-pattern bg-cover bg-center relative">
        <div className="absolute inset-0 bg-white/95"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-amiri text-4xl md:text-5xl font-bold text-islamic-golden mb-4">
              مجالات التعلم
            </h2>
            <p className="font-cairo text-xl text-gray-600 max-w-2xl mx-auto">
              اكتشف مجالات متنوعة في العلوم الإسلامية والقرآنية
            </p>
          </div>

          {/* كاروسيل المواضيع - عرض موضوع واحد فقط */}
          <div className="relative max-w-4xl mx-auto">
            {/* أزرار التنقل */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-islamic-primary text-white p-3 rounded-full shadow-lg hover:bg-islamic-light transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-islamic-primary text-white p-3 rounded-full shadow-lg hover:bg-islamic-light transition-colors"
            >
              <ChevronRight size={24} />
            </button>

            {/* البطاقة الواحدة */}
            <div className="overflow-hidden px-16">
              <div className="transition-transform duration-500 ease-in-out">
                <div className="w-full">
                  <div className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-300 mx-auto max-w-2xl">
                    <div className="aspect-w-4 aspect-h-5 h-96">
                      <img
                        src={topics[currentSlide].image}
                        alt={topics[currentSlide].title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                      
                      {/* العنوان */}
                      <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                        <h3 className="font-cairo font-bold text-3xl text-white mb-4">
                          {topics[currentSlide].title}
                        </h3>
                        <p className="text-white/90 font-cairo text-lg leading-relaxed">
                          {topics[currentSlide].description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* مؤشرات النقاط */}
            <div className="flex justify-center mt-8 space-x-2 rtl:space-x-reverse">
              {topics.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-islamic-primary' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* قسم الجدول الزمني للأنشطة */}
      <section className="py-20 bg-gradient-to-b from-islamic-gray-light to-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-amiri text-4xl md:text-5xl font-bold text-islamic-golden mb-4">
              أنشطة طلابنا
            </h2>
            <p className="font-cairo text-xl text-gray-600 max-w-2xl mx-auto">
              رحلة تعليمية مليئة بالأنشطة المتنوعة والتجارب الثرية
            </p>
          </div>

          {/* الجدول الزمني التفاعلي */}
          <div className="relative max-w-6xl mx-auto">
            {/* الخط الرئيسي للجدول الزمني */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-islamic-golden h-full"></div>

            {/* عناصر الجدول الزمني */}
            <div className="space-y-16">
              {timelineActivities.map((activity, index) => (
                <div
                  key={activity.id}
                  className={`timeline-item relative flex items-center ${
                    activity.side === 'right' ? 'flex-row-reverse' : ''
                  } ${
                    visibleTimelineItems.includes(index)
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                  } transition-all duration-700 ease-out`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  {/* محتوى النشاط */}
                  <div className={`w-5/12 ${activity.side === 'right' ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                      <img
                        src={activity.image}
                        alt={activity.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <h3 className="font-cairo font-bold text-xl text-islamic-primary mb-3">
                          {activity.title}
                        </h3>
                        <p className="font-cairo text-gray-600 leading-relaxed">
                          {activity.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* أيقونة النشاط في المنتصف */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-islamic-golden rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                    <activity.icon size={24} className="text-white" />
                  </div>

                  {/* مساحة فارغة للجانب الآخر */}
                  <div className="w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* قسم القيم المكتسبة من دورات القرآن */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-amiri text-4xl md:text-5xl font-bold text-islamic-golden mb-4">
              القيم التي يكتسبها طلابنا
            </h2>
            <p className="font-cairo text-xl text-gray-600 max-w-2xl mx-auto">
              القيم الأخلاقية والتربوية المستمدة من تعلم القرآن الكريم
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {quranValues.map((value) => (
              <div key={value.id} className="group">
                <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className={`w-20 h-20 ${value.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon size={32} className="text-white" />
                  </div>
                  
                  <h3 className="font-cairo font-bold text-xl text-islamic-dark mb-4">
                    {value.title}
                  </h3>
                  
                  <p className="font-cairo text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* فاصل بين الأقسام */}
      <div className="h-16 bg-gradient-to-r from-islamic-primary to-islamic-light"></div>

      {/* قسم الحديث النبوي */}
      <section className="py-20 bg-islamic-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-islamic-pattern bg-cover bg-center opacity-10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <div className="w-20 h-20 bg-islamic-golden rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-amiri text-2xl">حديث</span>
              </div>
              
              <blockquote className="font-amiri text-2xl md:text-3xl lg:text-4xl text-white leading-relaxed mb-6">
                "مَن سَلَكَ طريقًا يَلتَمِسُ فيهِ عِلمًا، سَهَّلَ اللَّهُ لهُ بهِ طريقًا إلى الجَنَّةِ"
              </blockquote>
              
              <cite className="font-cairo text-islamic-golden text-lg">
                صحيح مسلم
              </cite>
            </div>
            
            <div className="border-t border-islamic-golden/30 pt-8">
              <p className="font-cairo text-white/90 text-lg leading-relaxed">
                في هذا الحديث الشريف يحثنا النبي صلى الله عليه وسلم على طلب العلم، 
                ويبشر طالب العلم بأن الله سيسهل له طريقًا إلى الجنة بسبب سعيه في طلب العلم
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;