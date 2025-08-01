import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, ArrowRight, Send } from "lucide-react";
import axios from "axios";
import { NGROK_BASE_URL } from "../data/mockData";

const ForgotPasswordEmail = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("student");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setError("");

    const endpoint =
      role === "instructor"
        ? `${NGROK_BASE_URL}/instructors/send-otp`
        : `${NGROK_BASE_URL}/students/send-otp`;

    try {
      await axios.post(
        endpoint,
        { email, role }, // ← أضفنا role هنا
        {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      setMessage("تم إرسال رمز التحقق إلى بريدك الإلكتروني");

      setTimeout(() => {
        navigate("/verify-otp", { state: { email, role } }); // تم إرسال role
      }, 2000);
    } catch (error) {
      if (error.response) {
        setError(
          error.response.data.message || "حدث خطأ أثناء إرسال البريد الإلكتروني"
        );
      } else {
        setError("خطأ في الاتصال بالخادم");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-islamic-pattern bg-cover bg-center relative pt-20">
      <div className="absolute inset-0 bg-islamic-primary/80"></div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-md mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <Link
              to="/login"
              className="flex items-center space-x-2 rtl:space-x-reverse text-white hover:text-islamic-golden transition-colors font-cairo"
            >
              <ArrowRight size={20} />
              <span>العودة إلى تسجيل الدخول</span>
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-islamic-golden rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail size={32} className="text-white" />
            </div>
            <h1 className="font-amiri text-3xl font-bold text-white mb-2">
              استعادة كلمة المرور
            </h1>
            <p className="font-cairo text-white/80">
              أدخل بريدك الإلكتروني لإرسال رمز التحقق
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-islamic-primary focus:border-transparent transition-colors font-cairo"
                    placeholder="أدخل بريدك الإلكتروني"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Role Selector */}
              <div>
                <label className="block font-cairo font-medium text-gray-700 mb-2">
                  نوع الحساب
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  disabled={isLoading}
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg font-cairo focus:ring-2 focus:ring-islamic-primary focus:border-transparent"
                >
                  <option value="student">طالب</option>
                  <option value="instructor">مدرس</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-islamic-primary text-white py-3 px-4 rounded-lg font-cairo font-bold text-lg hover:bg-islamic-light transition-colors flex items-center justify-center space-x-2 rtl:space-x-reverse disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>جاري الإرسال...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>إرسال رمز التحقق</span>
                  </>
                )}
              </button>
            </form>

            {/* Messages */}
            {message && (
              <div className="mt-6 p-4 rounded-lg bg-green-100 text-green-800 border border-green-200 text-center font-cairo">
                {message}
              </div>
            )}
            {error && (
              <div className="mt-6 p-4 rounded-lg bg-red-100 text-red-800 border border-red-200 text-center font-cairo">
                {error}
              </div>
            )}

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="font-cairo text-gray-600 text-sm">
                تذكرت كلمة المرور؟{" "}
                <Link
                  to="/login"
                  className="text-islamic-primary hover:text-islamic-light font-medium"
                >
                  تسجيل الدخول
                </Link>
              </p>
            </div>
          </div>

          {/* Help Text */}
          <div className="mt-8 text-center">
            <p className="font-cairo text-white/80 text-sm">
              سيتم إرسال رمز التحقق إلى بريدك الإلكتروني المسجل في النظام
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordEmail;
