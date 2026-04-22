import React from "react";

const CategoryBadge = ({ category, onClick, showStatus = true }) => {
  return (
    <div
      className={`
        inline-flex items-center gap-2 px-3 py-2 rounded-lg 
        transition-all duration-200 cursor-pointer
        hover:scale-105 active:scale-95
        ${onClick ? "hover:shadow-lg" : ""}
        dark:bg-gray-800/50 bg-white
        border border-gray-200 dark:border-gray-700
      `}
      onClick={onClick}
    >
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-lg"
        style={{
          backgroundColor: `${category.color}20`,
          color: category.color,
        }}
      >
        {category.icon}
      </div>

      <div className="flex flex-col">
        <span className="font-medium text-gray-900 dark:text-gray-100">
          {category.name}
        </span>
        {/*
        {category.description && (
          <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[150px]">
            {category.description}
          </span>
        )}
        */}
      </div>
      {/*
      {showStatus && (
        <div className={`ml-2 px-2 py-1 rounded-full text-xs font-medium
          ${category.is_active 
            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
          }`}
        >
          {category.is_active ? 'Activo' : 'Inactivo'}
        </div>
      )}
      */}
    </div>
  );
};

export default CategoryBadge;
