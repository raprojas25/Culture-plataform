export const ErrorMessage = ({ message }) => {
  return (
    <p className="mt-1 text-xs font-light text-red-600 dark:text-red-500">
      {message}
    </p>
  );
};
