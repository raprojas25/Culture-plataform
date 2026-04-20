// Table Component
export const Table = ({ children, className }) => {
  return (
    <table
      className={`min-w-full divide-y divide-gray-200 dark:divide-gray-700 ${className}`}
    >
      {children}
    </table>
  );
};

// TableHeader Component
export const TableHeader = ({ children, className }) => {
  return (
    <thead className={`bg-gray-100 dark:bg-gray-800 ${className}`}>
      {children}
    </thead>
  );
};

// TableBody Component
export const TableBody = ({ children, className }) => {
  return (
    <tbody
      className={`divide-y divide-gray-200 dark:divide-gray-500 bg-white dark:bg-gray-700 ${className}`}
    >
      {children}
    </tbody>
  );
};

// TableRow Component
export const TableRow = ({ children, className, isHeader = false }) => {
  const baseClass = isHeader
    ? ""
    : "hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors";

  return <tr className={`${baseClass} ${className}`}>{children}</tr>;
};

// TableCell Component
export const TableCell = ({ children, isHeader = false, className }) => {
  const baseClass = isHeader
    ? "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
    : "px-6 py-4 whitespace-nowrap";
  const TableCell = isHeader ? "th" : "td";
  return (
    <TableCell className={`${baseClass} ${className}`}>
      <p className="text-sm text-gray-600 dark:text-gray-300 max-w-xs truncate">
        {children}
      </p>
    </TableCell>
  );
};
