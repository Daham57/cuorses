import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Lock, Eye, EyeOff, ArrowRight, Save, CheckCircle } from "lucide-react";
import axios from "axios";
import { NGROK_BASE_URL } from "../data/mockData";

const ResetPasswordNew = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, otp, role } = location.state || {};

  const [formData, setFormData] = useState({
    password: "",
    password_confirmation: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!email || !otp || !role) {
      navigate("/forgot-password-email");
    }
  }, [email, otp, role, navigate]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validatePassword = () => {
    if (formData.password.length < 8) {
      setError("كلمة المرور يجب أن تكون 8 أحرف على الأقل");
      return false;
    }
    if (formData.password !== formData.password_confirmation) {
      setError("كلمتا المرور غير متطابقتين");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword()) return;

    setIsLoading(true);
    setMessage("");
    setError("");

    const endpoint =
      role === "instructor"
        ? `${NGROK_BASE_URL}/instructors/reset-password`
        : `${NGROK_BASE_URL}/students/reset-password`;

    try {
      const response = await axios.post(
        endpoint,
        {
          email,
          otp,
          role, // ← نضيف الدور هنا
          password: formData.password,
          password_confirmation: formData.password_confirmation,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      setMessage("تم تغيير كلمة المرور بنجاح");

      setTimeout(() => {
        navigate("/login", {
          state: {
            message:
              "تم تغيير كلمة المرور بنجاح. يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة",
          },
        });
      }, 2000);
    } catch (error) {
      if (error.response) {
        setError(
          error.response.data.message || "حدث خطأ أثناء تغيير كلمة المرور"
        );
      } else {
        setError("خطأ في الاتصال بالخادم");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!email || !otp || !role) return null;

  return (
    <div className="min-h-screen bg-islamic-pattern bg-cover bg-center relative pt-20">
      <div className="absolute inset-0 bg-islamic-primary/80"></div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-md mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <Link
              to="/verify-otp"
              state={{ email }}
              className="flex items-center space-x-2 rtl:space-x-reverse text-white hover:text-islamic-golden transition-colors font-cairo"
            >
              <ArrowRight size={20} />
              <span>العودة</span>
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-islamic-golden rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock size={32} className="text-white" />
            </div>
            <h1 className="font-amiri text-3xl font-bold text-white mb-2">
              كلمة مرور جديدة
            </h1>
            <p className="font-cairo text-white/80">
              أدخل كلمة المرور الجديدة لحسابك
            </p>
            <p className="font-cairo text-islamic-golden font-medium text-sm mt-2">
              {email}
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-cairo font-medium text-gray-700 mb-2">
                  كلمة المرور الجديدة
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
                    minLength="8"
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-islamic-primary focus:border-transparent transition-colors font-cairo"
                    placeholder="أدخل كلمة المرور الجديدة"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1 font-cairo">
                  يجب أن تكون 8 أحرف على الأقل
                </p>
              </div>

              <div>
                <label className="block font-cairo font-medium text-gray-700 mb-2">
                  تأكيد كلمة المرور
                </label>
                <div className="relative">
                  <Lock
                    size={20}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-islamic-primary focus:border-transparent transition-colors font-cairo"
                    placeholder="أعد إدخال كلمة المرور"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={
                  isLoading ||
                  !formData.password ||
                  !formData.password_confirmation
                }
                className="w-full bg-islamic-primary text-white py-3 px-4 rounded-lg font-cairo font-bold text-lg hover:bg-islamic-light transition-colors flex items-center justify-center space-x-2 rtl:space-x-reverse disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>جاري الحفظ...</span>
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    <span>حفظ كلمة المرور</span>
                  </>
                )}
              </button>
            </form>

            {/* Messages */}
            {message && (
              <div className="mt-6 p-4 rounded-lg bg-green-100 text-green-800 border border-green-200 text-center font-cairo flex items-center justify-center space-x-2 rtl:space-x-reverse">
                <CheckCircle size={20} />
                <span>{message}</span>
              </div>
            )}

            {error && (
              <div className="mt-6 p-4 rounded-lg bg-red-100 text-red-800 border border-red-200 text-center font-cairo">
                {error}
              </div>
            )}
          </div>

          {/* Security Tips */}
          <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <h3 className="font-cairo font-bold text-white mb-2">
              نصائح الأمان:
            </h3>
            <ul className="font-cairo text-white/80 text-sm space-y-1">
              <li>• استخدم كلمة مرور قوية تحتوي على أحرف وأرقام</li>
              <li>• لا تشارك كلمة المرور مع أي شخص</li>
              <li>• غيّر كلمة المرور بانتظام</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordNew;
