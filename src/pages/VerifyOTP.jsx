import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Shield, ArrowRight, CheckCircle } from "lucide-react";
import axios from "axios";
import { NGROK_BASE_URL } from "../data/mockData";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, role } = location.state || {}; // استلام الدور من الصفحة السابقة

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(120); // دقيقة

  const inputRefs = useRef([]);

  useEffect(() => {
    if (!email || !role) {
      navigate("/forgot-password-email");
    }
  }, [email, role, navigate]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // قبول رقم واحد فقط أو فراغ

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (countdown <= 0) {
      setError("انتهت صلاحية الرمز. يرجى إعادة الإرسال.");
      return;
    }

    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      setError("يرجى إدخال رمز التحقق كاملاً");
      return;
    }

    setIsLoading(true);
    setMessage("");
    setError("");

    const endpoint =
      role === "instructor"
        ? `${NGROK_BASE_URL}/instructors/check-otp`
        : `${NGROK_BASE_URL}/students/check-otp`;

    try {
      await axios.post(
        endpoint,
        { email, otp: otpCode, role },
        {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      setMessage("تم التحقق من الرمز بنجاح");
      setTimeout(() => {
        navigate("/reset-password-new", {
          state: { email, otp: otpCode, role },
        });
      }, 1000);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "رمز التحقق غير صحيح");
      } else {
        setError("خطأ في الاتصال بالخادم");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResendLoading(true);
    setError("");
    setMessage("");

    const endpoint =
      role === "instructor"
        ? `${NGROK_BASE_URL}/instructors/send-otp`
        : `${NGROK_BASE_URL}/students/send-otp`;

    try {
      await axios.post(
        endpoint,
        { email, role },
        {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      setMessage("تم إرسال رمز تحقق جديد");
      setCountdown(60); // إعادة ضبط التايمر
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (error) {
      setError("فشل في إعادة إرسال الرمز");
    } finally {
      setResendLoading(false);
    }
  };

  if (!email || !role) {
    return null;
  }

  return (
    <div className="min-h-screen bg-islamic-pattern bg-cover bg-center relative pt-20">
      <div className="absolute inset-0 bg-islamic-primary/80"></div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-md mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <Link
              to="/forgot-password-email"
              className="flex items-center space-x-2 rtl:space-x-reverse text-white hover:text-islamic-golden transition-colors font-cairo"
            >
              <ArrowRight size={20} />
              <span>العودة</span>
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-islamic-golden rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield size={32} className="text-white" />
            </div>
            <h1 className="font-amiri text-3xl font-bold text-white mb-2">
              تحقق من رمز الأمان
            </h1>
            <p className="font-cairo text-white/80">أدخل الرمز المرسل إلى</p>
            <p className="font-cairo text-islamic-golden font-medium">
              {email}
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-cairo font-medium text-gray-700 mb-4 text-center">
                  رمز التحقق (6 أرقام)
                </label>
                <div className="flex justify-center space-x-2" dir="ltr">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={(e) => e.preventDefault()}
                      className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-islamic-primary focus:border-islamic-primary transition-colors"
                      disabled={isLoading}
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || otp.join("").length !== 6}
                className="w-full bg-islamic-primary text-white py-3 px-4 rounded-lg font-cairo font-bold text-lg hover:bg-islamic-light transition-colors flex items-center justify-center space-x-2 rtl:space-x-reverse disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>جاري التحقق...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle size={20} />
                    <span>تحقق من الرمز</span>
                  </>
                )}
              </button>
            </form>

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

            {/* Resend OTP */}
            <div className="mt-6 text-center">
              <p className="font-cairo text-gray-600 text-sm mb-2">
                لم تستلم الرمز؟
              </p>
              {countdown > 0 ? (
                <p className="font-cairo text-gray-500 text-sm">
                  يمكنك إعادة الإرسال خلال {countdown} ثانية
                </p>
              ) : (
                <button
                  onClick={handleResendOtp}
                  disabled={resendLoading}
                  className="text-islamic-primary hover:text-islamic-light font-cairo font-medium underline disabled:opacity-50"
                >
                  {resendLoading ? "جاري الإرسال..." : "إعادة إرسال الرمز"}
                </button>
              )}
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="font-cairo text-white/80 text-sm">
              تحقق من صندوق البريد الوارد أو مجلد الرسائل غير المرغوب فيها
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
