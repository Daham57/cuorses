import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import axios from "axios";
import { NGROK_BASE_URL } from "../data/mockData";
import { AuthContext } from "../context/AuthContext"; // ✅ استيراد السياق
import LoadingSpinner from "../components/LoadingSpinner";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext); // ✅ استخدام الدالة من السياق

  const [role, setRole] = useState("student");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Check for success message from password reset
  React.useEffect(() => {
    if (location.state?.message) {
      setResponseMessage(location.state.message);
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url =
        role === "teacher"
          ? `${NGROK_BASE_URL}/instructors/login`
          : `${NGROK_BASE_URL}/students/login`;

      const res = await axios.post(url, formData);
      const token = res.data.token;

      if (token) {
        login(token, role, formData.email);
        setResponseMessage("تم تسجيل الدخول بنجاح!");

        // توجيه للصفحة الرئيسية مع تأخير قصير لإظهار رسالة النجاح
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setResponseMessage("لم يتم استلام التوكن من الخادم.");
      }
    } catch (error) {
      if (error.response) {
        setResponseMessage(error.response.data.message || "فشل تسجيل الدخول.");
      } else {
        setResponseMessage("خطأ في الاتصال بالخادم.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <LoadingSpinner 
        message="جاري تسجيل الدخول، يرجى الانتظار..." 
        fullScreen={true}
        size="xlarge"
      />
    );
  }
  return (
    <div className="min-h-screen bg-islamic-pattern bg-cover bg-center relative pt-20">
      <div className="absolute inset-0 bg-islamic-primary/80"></div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-md mx-auto">
          {/* شعار وعنوان */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-islamic-golden rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white font-bold text-2xl">ق</span>
            </div>
            <h1 className="font-amiri text-3xl font-bold text-white mb-2">
              تسجيل الدخول
            </h1>
            <p className="font-cairo text-white/80">ادخل إلى حسابك للمتابعة</p>
          </div>

          {/* نموذج تسجيل الدخول */}
          <div className="bg-white rounded-lg shadow-xl p-8">
            {/* اختيار الدور */}
            <div className="mb-4">
              <label className="block font-cairo font-medium text-gray-700 mb-2">
                نوع الحساب
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border px-3 py-2 rounded font-cairo"
              >
                <option value="student">طالب</option>
                <option value="teacher">مدرس</option>
              </select>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-cairo font-medium text-gray-700 mb-2">
                  البريد الإلكتروني
                </label>
                <div className="relative">
                  <Mail
                    size={20}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-islamic-primary focus:border-transparent transition-colors font-cairo"
                    placeholder="أدخل بريدك الإلكتروني"
                  />
                </div>
              </div>

              <div>
                <label className="block font-cairo font-medium text-gray-700 mb-2">
                  كلمة المرور
                </label>
                <div className="relative">
                  <Lock
                    size={20}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-islamic-primary focus:border-transparent transition-colors font-cairo"
                    placeholder="أدخل كلمة المرور"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-islamic-primary focus:ring-islamic-primary"
                  />
                  <span className="mr-2 font-cairo text-sm text-gray-600">
                    تذكرني
                  </span>
                </label>
                <Link
                  to="/forgot-password-email"
                  className="font-cairo text-sm text-islamic-primary hover:text-islamic-light"
                >
                  نسيت كلمة المرور؟
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-islamic-primary text-white py-3 px-4 rounded-lg font-cairo font-bold text-lg hover:bg-islamic-light transition-colors flex items-center justify-center space-x-2 rtl:space-x-reverse"
              >
                <LogIn size={20} />
                <span>{isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}</span>
              </button>
            </form>

            {responseMessage && (
              <p className={`mt-4 text-center font-bold ${
                responseMessage.includes('بنجاح') ? 'text-green-600' : 'text-red-600'
              }`}>
                {responseMessage}
              </p>
            )}

            <div className="mt-6 text-center">
              <p className="font-cairo text-gray-600">
                ليس لديك حساب؟{" "}
                <Link
                  to="/signup"
                  className="text-islamic-primary hover:text-islamic-light font-medium"
                >
                  إنشاء حساب جديد
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="font-cairo text-white/80 text-sm">
              بتسجيل الدخول، أنت توافق على{" "}
              <a href="#" className="text-islamic-golden hover:underline">
                شروط الاستخدام
              </a>{" "}
              و{" "}
              <a href="#" className="text-islamic-golden hover:underline">
                سياسة الخصوصية
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
