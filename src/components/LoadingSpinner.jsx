import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ 
  message = "جاري التحميل...", 
  size = "large", 
  fullScreen = false,
  showSpinner = true 
}) => {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8", 
    large: "w-12 h-12",
    xlarge: "w-16 h-16"
  };

  const containerClasses = fullScreen 
    ? "fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center"
    : "flex items-center justify-center py-8";

  return (
    <div className={containerClasses}>
      <div className="text-center">
        {showSpinner && (
          <div className="mb-4">
            <Loader2 
              className={`${sizeClasses[size]} text-islamic-primary animate-spin mx-auto`} 
            />
          </div>
        )}
        <p className="font-cairo text-lg text-islamic-dark font-medium">
          {message}
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;