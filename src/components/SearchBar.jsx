import React from 'react';
import { Search } from 'lucide-react';

/**
 * 🟢 مكون شريط البحث القابل لإعادة الاستخدام
 * يمكن استخدامه في صفحات مختلفة مع تخصيص النص والوظائف
 */
const SearchBar = ({ 
  searchTerm, 
  onSearchChange, 
  placeholder = "البحث...", 
  className = "" 
}) => {
  return (
    <div className={`relative max-w-md mx-auto ${className}`}>
      {/* أيقونة البحث */}
      <Search 
        size={20} 
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
      />
      
      {/* حقل إدخال البحث */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-islamic-primary focus:border-transparent transition-colors font-cairo bg-white shadow-sm"
      />
    </div>
  );
};

export default SearchBar;

