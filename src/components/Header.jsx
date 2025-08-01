import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut } from "lucide-react";
import { AuthContext } from "@/context/AuthContext";
import { getInstructors, getStudents } from "@/data/mockData";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [showShadow, setShowShadow] = useState(false);
  const [userFullName, setUserFullName] = useState("");
  const lastScrollY = useRef(0);

  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  const { isLoggedIn, userRole, userEmail, logout } = useContext(AuthContext);

  // Fetch user's full name based on role and email
  useEffect(() => {
    const fetchUserName = async () => {
      if (!isLoggedIn || !userEmail || !userRole) return;

      try {
        if (userRole === "teacher") {
          const instructors = await getInstructors();
          const currentUser = instructors.find(inst => inst.email === userEmail);
          if (currentUser) {
            setUserFullName(`${currentUser.name} - مدرس`);
          }
        } else if (userRole === "student") {
          const students = await getStudents();
          const currentUser = students.find(student => student.email === userEmail);
          if (currentUser) {
            setUserFullName(`${currentUser.name} - طالب`);
          }
        }
      } catch (error) {
        console.error("Error fetching user name:", error);
        setUserFullName("المستخدم");
      }
    };

    fetchUserName();
  }, [isLoggedIn, userEmail, userRole]);

  // تحديد عناصر التنقل بناءً على حالة تسجيل الدخول
  const getNavItems = () => {
    const baseItems = [
      { name: "الرئيسية", path: "/" },
      { name: "الدورات", path: "/courses" },
      { name: "اتصل بنا", path: "/contact" },
      { name: "الطلاب", path: "/students" },
      { name: "المدرسون", path: "/instructors" }
    ];

    // إضافة روابط الطلاب والمدرسين فقط إذا لم يكن المستخدم مسجل دخول
    // if (!isLoggedIn) {
    //   baseItems.splice(1, 0, 
    //     { name: "الطلاب", path: "/students" },
    //     { name: "المدرسون", path: "/instructors" }
    //   );
    // }

    return baseItems;
  };

  const navItems = getNavItems();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowHeader(
        !(currentScrollY > lastScrollY.current && currentScrollY > 80)
      );
      setShowShadow(currentScrollY > 0);
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // التعامل مع النقر على "حسابي"
  
const handleMyAccountClick = async () => {
  if (userRole === "teacher") {
    try {
      const instructors = await getInstructors();
      const currentInstructor = instructors.find(
        (inst) => inst.email === userEmail
      );

      if (currentInstructor) {
        navigate(`/instructor-details/${currentInstructor.id}`, {
          state: { instructor: currentInstructor },
        });
      } else {
        alert("لم يتم العثور على بيانات المدرس.");
      }
    } catch (err) {
      console.error("فشل في جلب بيانات المدرس:", err);
    }
  } else if (userRole === "student") {
    try {
      const students = await getStudents();
      const currentStudent = students.find(
        (student) => student.email === userEmail
      );

      if (currentStudent) {
        navigate(`/student-profile/${currentStudent.id}`, {
          state: { student: currentStudent },
        });
      } else {
        alert("لم يتم العثور على بيانات الطالب.");
      }
    } catch (err) {
      console.error("فشل في جلب بيانات الطالب:", err);
    }
  } else {
    alert("دور المستخدم غير معروف.");
  }
};

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transform transition-all duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      } ${isHomePage ? "bg-transparent backdrop-blur-sm" : ""} ${
        showShadow && !isHomePage ? "shadow-lg" : ""
      }`}
      style={{ backgroundColor: isHomePage ? "transparent" : "#0e4d3c" }}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center space-x-2 rtl:space-x-reverse"
          >
            <img
              src="/image/logo2.jpg"
              alt="شعار الموقع"
              className="w-10 h-10 rounded-full object-cover"
            />
          </Link>

          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`font-cairo transition-colors duration-200 ${
                  location.pathname === item.path
                    ? "text-islamic-golden border-b-2 border-islamic-golden"
                    : "text-white hover:text-islamic-golden"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <button
                  onClick={handleMyAccountClick}
                  className="flex items-center space-x-2 rtl:space-x-reverse text-white hover:text-islamic-golden transition-colors"
                >
                  <User size={20} />
                  <span className="font-cairo">{userFullName || "حسابي"}</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 rtl:space-x-reverse text-white hover:text-red-400 transition-colors"
                >
                  <LogOut size={20} />
                  <span className="font-cairo">تسجيل الخروج</span>
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white font-cairo hover:text-islamic-golden transition-colors"
                >
                  تسجيل الدخول
                </Link>
                <Link
                  to="/signup"
                  className="bg-islamic-golden text-white px-4 py-2 rounded-lg font-cairo hover:bg-opacity-90 transition-colors"
                >
                  إنشاء حساب
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg p-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block py-2 px-4 font-cairo transition-colors ${
                  location.pathname === item.path
                    ? "text-islamic-primary bg-islamic-gray-light"
                    : "text-gray-700 hover:text-islamic-primary hover:bg-gray-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="border-t pt-4 mt-4">
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => {
                      handleMyAccountClick();
                      setIsMenuOpen(false);
                    }}
                    className="block py-2 px-4 text-gray-700 hover:text-islamic-primary font-cairo"
                  >
                    {userFullName || "حسابي"}
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block py-2 px-4 text-red-600 hover:text-red-800 font-cairo w-full text-right"
                  >
                    تسجيل الخروج
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block py-2 px-4 text-gray-700 hover:text-islamic-primary font-cairo"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    تسجيل الدخول
                  </Link>
                  <Link
                    to="/signup"
                    className="block py-2 px-4 bg-islamic-golden text-white rounded mt-2 text-center font-cairo hover:bg-opacity-90"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    إنشاء حساب
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
