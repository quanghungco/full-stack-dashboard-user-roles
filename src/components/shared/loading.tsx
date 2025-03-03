const Loading = () => {
  return (
    <div className="px-4 animate-pulse w-full">
      <div className=" rounded-lg overflow-hidden">
        <div className="p-4 w-full">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between mb-4 py-2 mt-4"
            >
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/6 mr-2"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-2/6 mr-2"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/6 mr-2"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/6"></div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
