// 🟢 بيانات وهمية شاملة للتطبيق - تحتوي على جميع المعلومات اللازمة للطلاب والمدرسين والدورات
export const courses = [
  {
    id: 1,
    type: "Tajweed",
    title: "أساسيات التجويد",
    description: "تعلم القواعد الأساسية لتجويد القرآن الكريم",
    course_start_time: "10:00 AM",
    start_date: "2025-05-08",
    expected_end_date: "2025-06-01",
    level: "متوسط",
    image:
      "https://images.pexels.com/photos/8154192/pexels-photo-8154192.jpeg?auto=compress&cs=tinysrgb&w=400",

    instructor: [
      {
        id: 1,
        name: "الشيخ أحمد محمد",
      },
    ],
    students: [
      {
        id: "1",
        name: " أحمد علي محمد",
      },
      {
        id: "2",
        name: "  فاطمة محمد أحمد",
      },
      {
        id: "3",
        name: "عبدالله حسن",
      },
    ],
    lessons: [
      {
        id: 1,
        title: "مقدمة في التجويد",
        instructor_id: 1,
        date: "2024-01-15",
      },
      {
        id: 2,
        title: "أحكام النون الساكنة والتنوين",
        instructor_id: 1,
        date: "2024-01-22",
      },
    ],
  },
  {
    id: 2,
    type: "Tafsir",
    title: "تفسير سورة البقرة",
    description: "دراسة تفسير سورة البقرة بالتفصيل",

    maxStudents: 20,
    course_start_time: "2:00 PM",
    start_date: "2025-05-08",
    expected_end_date: "2025-06-01",
    level: "متوسط",
    image:
      "https://images.pexels.com/photos/8154199/pexels-photo-8154199.jpeg?auto=compress&cs=tinysrgb&w=400",

    instructor: [
      {
        id: 2,
        name: "الدكتور محمد الطيب",
      },
    ],

    students: [
      {
        id: "4",
        name: "سارة أحمد",
      },
      {
        id: "5",
        name: "محمد عبدالله",
      },
    ],

    lessons: [
      {
        id: 3,
        title: "مقدمة سورة البقرة",
        instructor_id: 2,
        date: "2024-01-20",
      },
    ],
  },

  {
    id: 2,
    type: "TahfeezCourse",
    title: "حلقة الشيخ عبد الرحمن السيد",
    description: "مجموعة مخصصة لحفظ جزء عم ومراجعة الفاتحة",
    maxStudents: 20,
    course_start_time: "9:00 AM",
    start_date: "2025-05-08",
    expected_end_date: "2025-06-01",
    level: "متوسط",
    image:
      "https://images.pexels.com/photos/8154192/pexels-photo-8154192.jpeg?auto=compress&cs=tinysrgb&w=400",
    instructor: [{ id: 3, name: "الشيخ عبدالرحمن السيد" }],
    students: [
      { id: "4", name: "محمد أحمد" },
      { id: "5", name: "علي حسن" },
      { id: "6", name: "فاطمة زهراء" },
    ],
    lessons: [
      {
        id: 4,
        title: "مراجعة الفاتحة وحفظ جزء عم",
        instructor_id: 3,
        date: "2024-01-16",
      },
    ],
  },
  {
    id: 3,
    type: "TahfeezCourse",
    title: "حلقة الشيخ يوسف المصري",
    description: "دورة لحفظ سورة البقرة من الآية 1 إلى 20",
    maxStudents: 20,
    start_date: "2025-05-08",
    expected_end_date: "2025-06-01",
    level: "متوسط",
    expectedEndDate: "2024-03-15",
    image:
      "https://images.pexels.com/photos/8154199/pexels-photo-8154199.jpeg?auto=compress&cs=tinysrgb&w=400",
    instructor: [{ id: 4, name: "الشيخ يوسف المصري" }],
    students: [
      { id: "7", name: "عائشة محمد" },
      { id: "8", name: "عبدالله أحمد" },
    ],
    lessons: [
      {
        id: 5,
        title: "حفظ سورة البقرة 1-20",
        instructor_id: 4,
        date: "2024-01-17",
        time: "11:00 AM",
      },
    ],
  },
];

// 🟢 بيانات المدرسين مع ربطهم بطلابهم المخصصين
export const instructors = [
  {
    id: 1,
    name: "الشيخ أحمد محمد",
    image:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
    password: "$2y$12$BRJt7g2lYLVnzi7JYVX.9e5SwSilFCx3iIgto.BOEcMHKXlCmGOo6",
    email: "ahmed.mohammed@quranic.edu",
    phone_number: "+966501234567",
    quran_memorized_parts: "12",
    quran_passed_parts: "23",
    certificate: "مهندس",
    religious_qualifications: [
      "التجويد والقراءات",
      "دكتوراه في علوم القرآن",
      "إجازة في القراءات العشر",
      "خريج الأزهر الشريف",
    ],
    address: "Dummar",
    birth_date: "1979-01-26",
    role: "instructor",
    courses: {
      id: 1,
      type: "Tajweed",
      title: "أساسيات التجويد",
      description: "تعلم القواعد الأساسية لتجويد القرآن الكريم",
      maxStudents: 30,
      course_start_time: "00:00:00",
      startDate: "2025-05-08",
      expectedEndDate: "2025-06-01",
      image:
        "https://images.pexels.com/photos/8154192/pexels-photo-8154192.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    students: [
      {
        id: 1,
        name: "أحمد علي محمد",
        image:
          "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
        currentJuz: "الجزء الخامس عشر",
        birth_date: "1998-03-05",
        quran_memorized_parts: "23",
        progress: 85,
      },
      {
        id: 2,
        name: "فاطمة محمد أحمد",
        image:
          "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400",
        currentJuz: "جزء عم",
        birth_date: "2010-06-01", // تقدير تقريبي بناءً على العمر 14 سنة
        quran_memorized_parts: "3",
        progress: 70,
      },
      {
        id: 3,
        name: "عبدالله حسن",
        image: "/image/02.jpg",
        currentJuz: "الجزء العشرون",
        birth_date: "2006-07-01", // تقدير تقريبي بناءً على العمر 18 سنة
        quran_memorized_parts: "20",
        progress: 90,
      },
    ],
  },
  {
    id: 2,
    name: "الدكتور محمد الطيب",
    image:
      "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400",
    password: "$2y$12$KJsl9Y1d7AOSMdoFg5AqE.1iQs3BT8Nc2Hs6kqEOcvlv5FsQ0kPmu", // كلمة مرور وهمية
    email: "mohammed.altayyib@quranic.edu",
    phone_number: "+966507654321",
    quran_memorized_parts: "20",
    quran_passed_parts: "30",
    certificate: "طبيب",
    religious_qualifications: [
      "دكتوراه في التفسير",
      "أستاذ جامعي",
      "مؤلف في علوم القرآن",
    ],
    address: "الرياض",
    birth_date: "1975-08-12",
    role: "instructor",
    courses: {
      id: 2,
      type: "Tafsir",
      title: "تفسير سورة البقرة",
      description: "دراسة تفسير سورة البقرة بالتفصيل",

      maxStudents: 20,
      course_start_time: "00:00:00",
      startDate: "2025-05-10",
      expectedEndDate: "2025-06-05",
      image:
        "https://images.pexels.com/photos/8154199/pexels-photo-8154199.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    students: [
      {
        id: 4,
        name: "سارة أحمد",
        image:
          "https://images.pexels.com/photos/2379007/pexels-photo-2379007.jpeg?auto=compress&cs=tinysrgb&w=400",
        currentJuz: "الجزء الثاني عشر",
        birth_date: "2007-05-01", // تقدير تقريبي لعمر 17 سنة
        quran_memorized_parts: "12",
        progress: 90,
      },
      {
        id: 5,
        name: "محمد عبدالله",
        image:
          "https://images.pexels.com/photos/2379008/pexels-photo-2379008.jpeg?auto=compress&cs=tinysrgb&w=400",
        currentJuz: "الجزء الخامس والعشرون",
        birth_date: "2005-04-01", // تقدير تقريبي لعمر 19 سنة
        quran_memorized_parts: "25",
        progress: 85,
      },
    ],
  },
  {
    id: 3,
    name: "الشيخ عبدالرحمن السيد",
    image: "/image/01.jpg",
    password: "$2y$12$Efa8TzkX0nMfU1jWx3FbPe0E1D9khV1d3VrmZLtEAbCz0B8pIDvCG", // كلمة مرور وهمية
    email: "abdulrahman.alsayed@quranic.edu",
    phone_number: "+966509876543",
    quran_memorized_parts: "30",
    quran_passed_parts: "30",
    certificate: "مهندس",
    religious_qualifications: [
      "حافظ للقرآن الكريم",
      "إجازة في التحفيظ",
      "دبلوم في التربية الإسلامية",
    ],
    address: "جدة",
    birth_date: "1985-03-10",
    role: "instructor",
    courses: {
      id: 2,
      type: "TahfeezCourse",
      title: "حلقة الشيخ عبد الرحمن السيد",
      description: "مجموعة مخصصة لحفظ جزء عم ومراجعة الفاتحة",
      maxStudents: 20,
      course_start_time: "09:00:00",
      startDate: "2024-01-01",
      expectedEndDate: "2024-03-01",
      image:
        "https://images.pexels.com/photos/8154192/pexels-photo-8154192.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    students: [
      {
        id: 6,
        name: "محمد أحمد",
        image:
          "https://images.pexels.com/photos/2379009/pexels-photo-2379009.jpeg?auto=compress&cs=tinysrgb&w=400",
        currentJuz: "الجزء العاشر",
        birth_date: "2009-03-01", // تقدير تقريبي لعمر 15 سنة
        quran_memorized_parts: "10",
        progress: 75,
      },
      {
        id: 7,
        name: "علي حسن",
        image: "/image/03.jpg",
        currentJuz: "جزء تبارك",
        birth_date: "2011-06-01", // تقدير تقريبي لعمر 13 سنة
        quran_memorized_parts: "2",
        process: 60,
      },
      {
        id: 8,
        name: "فاطمة زهراء",
        image: "/image/pattern.jpg",
        currentJuz: "الجزء الثامن عشر",
        birth_date: "2008-04-01", // تقدير تقريبي لعمر 16 سنة
        quran_memorized_parts: "18",
        progress: 90,
      },
    ],
  },
  {
    id: 4,
    name: "الشيخ يوسف المصري",
    image: "/image/02.jpg",
    password: "$2y$12$LkQ8ErjX0oYuP1sH4ZgFb.PsDcO6aFgOeIuYlGy9EceImDnPGyvra", // كلمة مرور وهمية
    email: "youssef.almasri@quranic.edu",
    phone_number: "+966508765432",
    quran_memorized_parts: "30",
    quran_passed_parts: "30",
    certificate: "مهندس",
    religious_qualifications: [
      "حافظ للقرآن الكريم",
      "إجازة في التجويد",
      "دبلوم في التربية",
    ],
    address: "مكة المكرمة",
    birth_date: "1987-06-22",
    role: "instructor",
    courses: {
      id: 3,
      type: "TahfeezCourse",
      title: "حلقة الشيخ يوسف المصري",
      description: "دورة لحفظ سورة البقرة من الآية 1 إلى 20",
      maxStudents: 20,
      course_start_time: "11:00:00",
      startDate: "2024-01-01",
      expectedEndDate: "2024-03-15",
      image:
        "https://images.pexels.com/photos/8154199/pexels-photo-8154199.jpeg?auto=compress&cs=tinysrgb&w=400",
    },

    students: [
      {
        id: 9,
        name: "عائشة محمد",
        image:
          "https://images.pexels.com/photos/2379013/pexels-photo-2379013.jpeg?auto=compress&cs=tinysrgb&w=400",
        currentJuz: "الجزء السادس",
        birth_date: "2010-05-01", // تقدير تقريبي لعمر 14 سنة
        quran_memorized_parts: "6",
        progress: 65,
      },
      {
        id: 10,
        name: "عبدالله أحمد",
        image:
          "https://images.pexels.com/photos/2379014/pexels-photo-2379014.jpeg?auto=compress&cs=tinysrgb&w=400",
        currentJuz: "الجزء الرابع عشر",
        birth_date: "2007-03-01", // تقدير تقريبي لعمر 17 سنة
        quran_memorized_parts: "14",
        progress: 80,
      },
    ],
  },
];

// 🟢 قائمة شاملة لجميع الطلاب مع ربطهم بمدرسيهم
export const students = [
  {
    id: 1,
    name: "أحمد علي محمد",
    image:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
    email: "ahmed.ahmed@quranic.edu",
    currentJuz: "الجزء الخامس عشر",
    birth_date: "1998-03-05",
    certificate: "Preparatory stage",
    currentJuzPages: 18,
    quran_passed_parts: ["جزء عم", "جزء تبارك", "جزء قد سمع"],
    quran_memorized_parts: ["جزء عم", "جزء تبارك", "الجزء العاشر"],
    phone_number: "09164646464",
    address: "Garrick",
    enroll_date: "1998-03-05",
    role: "student",
    reset_password_token: "null",
    courses: [
      {
        id: 1,
        type: "Tajweed",
        title: "أساسيات التجويد",
        lessons: [
          {
            id: 1,
            title: "مقدمة في التجويد",
            instructor_id: 1,
            date: "2024-01-15",
            time: "10:00 AM",
          },
          {
            id: 2,
            title: "أحكام النون الساكنة والتنوين",
            instructor_id: 1,
            date: "2024-01-22",
            time: "10:00 AM",
          },
        ],
      },
    ],
    exams: [
      {
        id: 1,
        title: "امتحان جزء عم",
        date: "2024-01-15",
        grade: "ممتاز",
        score: 95,
      },
      {
        id: 2,
        title: "امتحان جزء تبارك",
        date: "2024-02-10",
        grade: "جيد جداً",
        score: 88,
      },
    ],
    progress: 85,
    notes: "طالب متميز يحفظ بسرعة ويتقن التجويد",
    instructors: {
      id: 1,
      name: "الشيخ أحمد محمد",
      image:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      phone_number: "+966501234567",
      religious_qualifications: "التجويد والقراءات",
    },
  },
  {
    id: 2,
    name: "فاطمة محمد أحمد",
    image:
      "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400",
    email: "ahmed.f@quranic.edu",
    currentJuz: "جزء عم",
    birth_date: "2010-06-01", // تقدير تقريبي بناءً على العمر 14 سنة
    quran_memorized_parts: "3",
    certificate: "مبتدئ",
    currentJuzPages: 15,
    quran_passed_parts: [],
    // تقدير تقريبي بناءً على أنها مبتدئة
    phone_number: "09160000000", // رقم افتراضي (يمكن تغييره)
    address: "الرياض", // قيمة افتراضية
    enroll_date: "2024-01-10", // تاريخ تقديري للالتحاق (يمكن تعديله)
    role: "student",
    reset_password_token: null,
    courses: [
      {
        id: 1,
        type: "Tajweed",
        title: "أساسيات التجويد",
        lessons: [
          {
            id: 1,
            title: "مقدمة في التجويد",
            instructor_id: 1,
            date: "2024-01-15",
            time: "10:00 AM",
          },
          {
            id: 2,
            title: "أحكام النون الساكنة والتنوين",
            instructor_id: 1,
            date: "2024-01-22",
            time: "10:00 AM",
          },
        ],
      },
    ],
    exams: [
      {
        id: 1,
        title: "امتحان سورة الفاتحة",
        date: "2024-01-20",
        grade: "جيد",
        score: 78,
      },
    ],
    progress: 45,
    notes: "طالبة مجتهدة تحتاج إلى مزيد من التشجيع",
    instructors: {
      id: 1,
      name: "الشيخ أحمد محمد",
      image:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      phone_number: "+966501234567",
      religious_qualifications: "التجويد والقراءات",
    },
  },
  {
    id: 3,
    name: "عبدالله حسن",
    image: "/image/02.jpg",
    currentJuz: "الجزء العشرون",
    birth_date: "2006-07-01", // تقدير تقريبي بناءً على العمر 18 سنة
    certificate: "متقدم",
    currentJuzPages: 19,
    totalJuzPages: 20,
    quran_passed_parts: ["جزء عم", "جزء تبارك", "جزء قد سمع", "الجزء الرابع"],
    quran_memorized_parts: "20", // تقدير منطقي لطالب متقدم وصل للجزء العشرون
    phone_number: "09163333333", // رقم افتراضي يمكن تغييره
    address: "المدينة المنورة", // عنوان افتراضي
    enroll_date: "2023-09-01", // تاريخ افتراضي للالتحاق
    role: "student",
    reset_password_token: null,
    courses: [
      {
        id: 1,
        type: "Tajweed",
        title: "أساسيات التجويد",
        lessons: [
          {
            id: 1,
            title: "مقدمة في التجويد",
            instructor_id: 1,
            date: "2024-01-15",
            time: "10:00 AM",
          },
          {
            id: 2,
            title: "أحكام النون الساكنة والتنوين",
            instructor_id: 1,
            date: "2024-01-22",
            time: "10:00 AM",
          },
        ],
      },
    ],
    exams: [
      {
        id: 1,
        title: "امتحان شامل",
        date: "2024-02-15",
        grade: "ممتاز",
        score: 92,
      },
    ],
    progress: 95,
    notes: "طالب متفوق قريب من إتمام الحفظ",
    instructors: {
      id: 1,
      name: "الشيخ أحمد محمد",
      image:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      phone_number: "+966501234567",
      religious_qualifications: "التجويد والقراءات",
    },
  },
  {
    id: 4,
    name: "سارة أحمد",
    image:
      "https://images.pexels.com/photos/2379007/pexels-photo-2379007.jpeg?auto=compress&cs=tinysrgb&w=400",
    currentJuz: "الجزء الثاني عشر",
    birth_date: "2007-05-01", // تقدير تقريبي لعمر 17 سنة
    certificate: "متوسط",
    currentJuzPages: 12,
    totalJuzPages: 20,
    quran_passed_parts: ["جزء عم", "جزء تبارك"],
    quran_memorized_parts: "12", // تقدير منطقي بناءً على مستوى الحفظ
    phone_number: "09162222222", // رقم افتراضي قابل للتعديل
    address: "الدمام", // عنوان افتراضي
    enroll_date: "2023-10-01", // تاريخ افتراضي للالتحاق
    role: "student",
    reset_password_token: null,
    courses: [
      {
        id: 2,
        type: "Tafsir",
        title: "تفسير سورة البقرة",
        lessons: [
          {
            id: 1,
            title: "مقدمة سورة البقرة",
            instructor_id: 2,
            date: "2024-01-20",
            time: "2:00 PM",
          },
        ],
      },
    ],
    exams: [
      {
        id: 1,
        title: "امتحان التفسير",
        date: "2024-01-25",
        grade: "جيد جداً",
        score: 85,
      },
    ],
    progress: 70,
    notes: "طالبة مهتمة بالتفسير والمعاني",
    instructors: {
      id: 2,
      name: "الدكتور محمد الطيب",
      image:
        "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400",
      phone_number: "+966507654321",
      religious_qualifications: "التفسير والعلوم القرآنية",
    },
  },
  {
    id: 5,
    name: "محمد عبدالله",
    image:
      "https://images.pexels.com/photos/2379008/pexels-photo-2379008.jpeg?auto=compress&cs=tinysrgb&w=400",
    currentJuz: "الجزء الخامس والعشرون",
    birth_date: "2005-04-01", // تقدير تقريبي لعمر 19 سنة
    certificate: "متقدم",
    currentJuzPages: 16,
    totalJuzPages: 20,
    quran_passed_parts: ["جزء عم", "جزء تبارك", "جزء قد سمع"],
    quran_memorized_parts: "25", // تقدير منطقي بناءً على الجزء الحالي
    phone_number: "09165555555", // رقم افتراضي
    address: "الطائف", // عنوان افتراضي
    enroll_date: "2023-08-15", // تاريخ افتراضي للالتحاق
    role: "student",
    reset_password_token: null,
    courses: [
      {
        id: 2,
        type: "Tafsir",
        title: "تفسير سورة البقرة",
        lessons: [
          {
            id: 1,
            title: "مقدمة سورة البقرة",
            instructor_id: 2,
            date: "2024-01-20",
            time: "2:00 PM",
          },
        ],
      },
    ],
    exams: [
      {
        id: 1,
        title: "امتحان شامل في التفسير",
        date: "2024-02-20",
        grade: "ممتاز",
        score: 94,
      },
    ],
    progress: 88,
    notes: "طالب متميز في فهم المعاني والتفسير",
    instructors: {
      id: 2,
      name: "الدكتور محمد الطيب",
      image:
        "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400",
      phone_number: "+966507654321",
      religious_qualifications: "التفسير والعلوم القرآنية",
    },
  },
  {
    id: 6,
    name: "محمد أحمد",
    image:
      "https://images.pexels.com/photos/2379009/pexels-photo-2379009.jpeg?auto=compress&cs=tinysrgb&w=400",
    currentJuz: "الجزء العاشر",
    birth_date: "2009-03-01", // تقدير تقريبي لعمر 15 سنة
    certificate: "متوسط",
    currentJuzPages: 15,
    totalJuzPages: 20,
    quran_passed_parts: ["جزء عم", "جزء تبارك", "جزء قد سمع"],
    quran_memorized_parts: "10", // تقدير منطقي حسب الجزء الحالي
    phone_number: "09161111111", // رقم افتراضي
    address: "أبها", // عنوان افتراضي
    enroll_date: "2024-01-05", // تاريخ افتراضي للالتحاق
    role: "student",
    reset_password_token: null,
    courses: [
      {
        id: 2,
        type: "TahfeezCourse",
        title: "حلقة الشيخ عبد الرحمن السيد",
        lessons: [
          {
            id: 1,
            title: "مراجعة الفاتحة وحفظ جزء عم",
            instructor_id: 3,
            date: "2024-01-16",
            time: "9:00 AM",
          },
        ],
      },
    ],
    exams: [
      {
        id: 1,
        title: "امتحان الحفظ الشهري",
        date: "2024-02-01",
        grade: "جيد جداً",
        score: 87,
      },
    ],
    progress: 75,
    notes: "طالب منتظم في الحضور ومتقن للحفظ",
    instructors: {
      id: 3,
      name: "الشيخ عبدالرحمن السيد",
      image: "/image/01.jpg",
      phone_number: "+966509876543",
      religious_qualifications: "تحفيظ القرآن الكريم",
    },
  },
  {
    id: 7,
    name: "علي حسن",
    image: "/image/03.jpg",
    currentJuz: "جزء تبارك",
    birth_date: "2011-06-01", // تقدير تقريبي لعمر 13 سنة
    certificate: "مبتدئ",
    currentJuzPages: 12,
    totalJuzPages: 20,
    quran_passed_parts: ["جزء عم"],
    quran_memorized_parts: "2", // تقدير منطقي لطالب مبتدئ
    phone_number: "09167777777", // رقم افتراضي
    address: "جازان", // عنوان افتراضي
    enroll_date: "2024-02-01", // تاريخ افتراضي للالتحاق
    role: "student",
    reset_password_token: null,
    courses: [
      {
        id: 2,
        type: "TahfeezCourse",
        title: "حلقة الشيخ عبد الرحمن السيد",
        lessons: [
          {
            id: 1,
            title: "مراجعة الفاتحة وحفظ جزء عم",
            instructor_id: 3,
            date: "2024-01-16",
            time: "9:00 AM",
          },
        ],
      },
    ],
    exams: [
      {
        id: 1,
        title: "امتحان جزء عم",
        date: "2024-01-30",
        grade: "ممتاز",
        score: 96,
      },
    ],
    progress: 60,
    notes: "طالب صغير السن لكنه متميز في الحفظ",
    instructors: {
      id: 3,
      name: "الشيخ عبدالرحمن السيد",
      image: "/image/01.jpg",
      phone_number: "+966509876543",
      religious_qualifications: "تحفيظ القرآن الكريم",
    },
  },
  {
    id: 8,
    name: "فاطمة زهراء",
    image: "/image/pattern.jpg",
    currentJuz: "الجزء الثامن عشر",
    birth_date: "2008-04-01", // تقدير تقريبي لعمر 16 سنة
    certificate: "متقدم",
    currentJuzPages: 18,
    totalJuzPages: 20,
    quran_passed_parts: [
      "جزء عم",
      "جزء تبارك",
      "جزء قد سمع",
      "الجزء الرابع",
      "الجزء الخامس",
    ],
    quran_memorized_parts: "18", // تقدير منطقي حسب الجزء الحالي
    phone_number: "09168888888", // رقم افتراضي
    address: "مكة المكرمة", // عنوان افتراضي
    enroll_date: "2023-11-15", // تاريخ افتراضي للالتحاق
    role: "student",
    reset_password_token: null,
    courses: [
      {
        id: 2,
        type: "TahfeezCourse",
        title: "حلقة الشيخ عبد الرحمن السيد",
        lessons: [
          {
            id: 1,
            title: "مراجعة الفاتحة وحفظ جزء عم",
            instructor_id: 3,
            date: "2024-01-16",
            time: "9:00 AM",
          },
        ],
      },
    ],
    exams: [
      {
        id: 1,
        title: "امتحان شامل",
        date: "2024-02-12",
        grade: "ممتاز",
        score: 93,
      },
    ],
    progress: 90,
    notes: "طالبة متفوقة ومثال يحتذى به",
    instructors: {
      id: 3,
      name: "الشيخ عبدالرحمن السيد",
      image: "/image/01.jpg",
      phone_number: "+966509876543",
      religious_qualifications: "تحفيظ القرآن الكريم",
    },
  },
  {
    id: 9,
    name: "عائشة محمد",
    image:
      "https://images.pexels.com/photos/2379013/pexels-photo-2379013.jpeg?auto=compress&cs=tinysrgb&w=400",
    currentJuz: "الجزء السادس",
    birth_date: "2010-05-01", // تقدير تقريبي لعمر 14 سنة
    quran_memorized_parts: "6",
    certificate: "متوسط",
    currentJuzPages: 10,
    totalJuzPages: 20,
    quran_passed_parts: ["جزء عم", "جزء تبارك"],
    // تقدير منطقي حسب الجزء الحالي
    phone_number: "09169999999", // رقم افتراضي
    address: "نجران", // عنوان افتراضي
    enroll_date: "2024-01-20", // تاريخ افتراضي للالتحاق
    role: "student",
    reset_password_token: null,
    courses: [
      {
        id: 3,
        type: "TahfeezCourse",
        title: "حلقة الشيخ يوسف المصري",
        lessons: [
          {
            id: 1,
            title: "حفظ سورة البقرة 1-20",
            instructor_id: 4,
            date: "2024-01-17",
            time: "11:00 AM",
          },
        ],
      },
    ],
    exams: [
      {
        id: 1,
        title: "امتحان جزء تبارك",
        date: "2024-01-28",
        grade: "جيد جداً",
        score: 89,
      },
    ],
    progress: 65,
    notes: "طالبة مجتهدة ومنتظمة في الحضور",
    instructors: {
      id: 4,
      name: "الشيخ يوسف المصري",
      image: "/image/02.jpg",
      phone_number: "+966508765432",
      religious_qualifications: "تحفيظ القرآن والتجويد",
    },
  },
  {
    id: 10,
    name: "عبدالله أحمد",
    image:
      "https://images.pexels.com/photos/2379014/pexels-photo-2379014.jpeg?auto=compress&cs=tinysrgb&w=400",
    currentJuz: "الجزء الرابع عشر",
    birth_date: "2007-03-01", // تقدير تقريبي لعمر 17 سنة
    quran_memorized_parts: "14",
    certificate: "متقدم",
    currentJuzPages: 14,
    totalJuzPages: 20,
    quran_passed_parts: ["جزء عم", "جزء تبارك", "جزء قد سمع", "الجزء الثاني"],
    quran_memorized_parts: "14", // تقدير منطقي حسب الجزء الحالي
    phone_number: "09160000000", // رقم افتراضي
    address: "الرياض", // عنوان افتراضي
    enroll_date: "2023-09-01", // تاريخ افتراضي للالتحاق
    role: "student",
    reset_password_token: null,
    courses: [
      {
        id: 3,
        type: "TahfeezCourse",
        title: "حلقة الشيخ يوسف المصري",
        lessons: [
          {
            id: 1,
            title: "حفظ سورة البقرة 1-20",
            instructor_id: 4,
            date: "2024-01-17",
            time: "11:00 AM",
          },
        ],
      },
    ],
    exams: [
      {
        id: 1,
        title: "امتحان شامل",
        date: "2024-02-05",
        grade: "ممتاز",
        score: 91,
      },
    ],
    progress: 80,
    notes: "طالب متميز ومتفوق في الحفظ",
    instructors: {
      id: 4,
      name: "الشيخ يوسف المصري",
      image: "/image/02.jpg",
      phone_number: "+966508765432",
      religious_qualifications: "تحفيظ القرآن والتجويد",
    },
  },
];
export const halqa = courses.filter(
  (course) => course.type === "TahfeezCourse"
);

// حساب عدد الطلاب الكلي في جميع الحلقات
const totalTahfeezStudents = halqa.reduce(
  (sum, course) => sum + course.students.length,
  0
);

// حساب عدد الأساتذة (قد يكون فيه تكرار بالأسماء، إذا بدك تحسب كلهم مع تكرارهم)
const totalTahfeezTeachers = halqa.reduce(
  (sum, course) => sum + course.instructor.length,
  0
);

const tahfeezCourse = {
  id: 999,
  title: "تحفيظ القرآن الكريم",
  description: "برنامج شامل لحفظ القرآن الكريم",
  image:
    "https://images.pexels.com/photos/8154201/pexels-photo-8154201.jpeg?auto=compress&cs=tinysrgb&w=400",
  type: "tahfeez",
  students: Array(totalTahfeezStudents).fill("طالب"), // فقط للحصول على .length
  instructors: totalTahfeezTeachers,
  maxStudents: 50,
};
// تصفية الدورات العادية
const filteredCourses = courses.filter(
  (course) => course.type !== "TahfeezCourse"
);

// القائمة النهائية
export const finalCourses = [...filteredCourses, tahfeezCourse];

export const attendance = [
  {
    id: 1,
    lesson_details: { id: 1 },
    student: { id: "1", name: " أحمد علي محمد" },
    student_attendance: 1,
    student_attendance_time: "10:30 AM",
  },
  {
    id: 2,
    lesson_details: { id: 1 },
    student: { id: "2", name: "  فاطمة محمد أحمد" },
    student_attendance: 1,
    student_attendance_time: "10:05 AM",
  },
  {
    id: 3,
    lesson_details: { id: 1 },
    student: { id: "3", name: "عبدالله حسن" },
    student_attendance: 1,
    student_attendance_time: "10:05 AM",
  },
  {
    id: 4,
    lesson_details: { id: 2 },
    student: { id: "1", name: "أحمد علي" },
    student_attendance: 1,
    student_attendance_time: "10:00 AM",
  },
  {
    id: 5,
    lesson_details: { id: 2 },
    student: { id: "2", name: "فاطمة محمد" },
    student_attendance: 1,
    student_attendance_time: "10:03 AM",
  },
  {
    id: 6,
    lesson_details: { id: 2 },
    student: { id: "3", name: "عبدالله حسن" },
    student_attendance: 0,
    student_attendance_time: "10:03 AM",
  },
  {
    id: 7,
    lesson_details: { id: 3 },
    student: { id: "4", name: "سارة أحمد" },
    student_attendance: 1,
    student_attendance_time: "2:00 PM",
  },
  {
    id: 8,
    lesson_details: { id: 3 },
    student: { id: "5", name: "محمد عبدالله" },
    student_attendance: 1,
    student_attendance_time: "2:05 PM",
  },
  {
    id: 9,
    lesson_details: { id: 4 },
    student: { id: "4", name: "محمد أحمد" },
    student_attendance: 1,
    student_attendance_time: "9:00 AM",
  },
  {
    id: 10,
    lesson_details: { id: 4 },
    student: { id: "5", name: "علي حسن" },
    student_attendance: 1,
    student_attendance_time: "9:00 AM",
  },
  {
    id: 11,
    lesson_details: { id: 4 },
    student: { id: "6", name: "فاطمة زهراء" },
    student_attendance: 1,
    student_attendance_time: "9:00 AM",
  },
  {
    id: 12,
    lesson_details: { id: 5 },
    student: { id: "7", name: "عائشة محمد" },
    student_attendance: 1,
    student_attendance_time: "11:00 AM",
  },
  {
    id: 13,
    lesson_details: { id: 5 },
    student: { id: "8", name: "عبدالله أحمد" },
    student_attendance: 1,
    student_attendance_time: "11:00 AM",
  },
];
// 🟢 مواضيع التعلم المختلفة في العلوم الإسلامية
export const topics = [
  {
    id: 1,
    title: "العقيدة",
    image: "/image/Aqeda.jpg",
    description: "دراسة أصول العقيدة الإسلامية وأركان الإيمان",
  },
  {
    id: 2,
    title: "التفسير",
    image: "/image/Tafsir.jpg",
    description: "تفسير آيات القرآن الكريم وفهم معانيها",
  },
  {
    id: 3,
    title: "الفقه",
    image: "/image/Fiqh.jpg",
    description: "دراسة الأحكام الشرعية والعبادات",
  },
  {
    id: 4,
    title: "التجويد",
    image: "/image/Tajweed.jpg",
    description: "تعلم قواعد تجويد القرآن الكريم",
  },
  {
    id: 5,
    title: "السيرة",
    image: "/image/Sira.jpg",
    description: "دراسة سيرة النبي محمد صلى الله عليه وسلم",
  },
];
export const NGROK_BASE_URL = 'https://348a47dbea99.ngrok-free.app/api/v1';

// src/api/getInstructors.js
import axios from "axios";

export const getInstructors = async () => {
  try {
    const token = localStorage.getItem("token");
    console.log("Token:", token);

    const res = await axios.get(`${NGROK_BASE_URL}/instructors`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
        "ngrok-skip-browser-warning": "true",
      },
    });

    console.log("Instructors fetched:", res.data);

    if (Array.isArray(res.data)) {
      return res.data;
    } else if (Array.isArray(res.data.instructors)) {
      return res.data.instructors;
    } else {
      console.error("Unexpected data structure:", res.data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching instructors:", error);
    return [];
  }
};

export const getStudents = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${NGROK_BASE_URL}/students`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });

    if (Array.isArray(res.data)) return res.data;
    if (Array.isArray(res.data.students)) return res.data.students;
    return [];
  } catch (err) {
    console.error("Error fetching students:", err);
    return [];
  }
};
export const getAttendance = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(`${NGROK_BASE_URL}/atten`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });

    console.log("Attendance fetched:", res.data);

    if (Array.isArray(res.data)) {
      return res.data;
    } else if (Array.isArray(res.data.attendance)) {
      return res.data.attendance;
    } else {
      console.error("Unexpected attendance data structure:", res.data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching attendance:", error);
    return [];
  }
};

export const getCourses = async () => {
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

    if (Array.isArray(res.data)) {
      return res.data;
    } else if (Array.isArray(res.data.courses)) {
      return res.data.courses;
    } else {
      console.error("Unexpected courses data structure:", res.data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
};
export const getRecitations = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(`${NGROK_BASE_URL}/recitation`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });

    console.log("Recitations fetched:", res.data);

    // ✅ فحص وجود student_recitation كمصفوفة
    if (Array.isArray(res.data.student_recitation)) {
      return res.data.student_recitation;
    } else {
      console.error("Unexpected recitations data structure:", res.data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching recitations:", error);
    return [];
  }
};

export const getRecitationsByCourseId = async (courseId) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(`${NGROK_BASE_URL}/recitation/course/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true"
      }
    });

    console.log("Recitations by course fetched:", res.data);

    return Array.isArray(res.data) ? res.data : res.data.recitations || [];

  } catch (error) {
    console.error("Error fetching recitations by course:", error);
    return [];
  }
};
export const getExams = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(`${NGROK_BASE_URL}/stdExam`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });

    console.log("Exams fetched:", res.data);

    if (Array.isArray(res.data)) {
      return res.data;
    } else if (Array.isArray(res.data.exams)) {
      return res.data.exams;
    } else {
      console.error("Unexpected exams data structure:", res.data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching exams:", error);
    return [];
  }
};