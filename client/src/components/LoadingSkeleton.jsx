const LoadingSkeleton = ({ count = 6 }) => {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div key={index} className="card">
          <div className="skeleton h-56 w-full" />
          <div className="p-5 space-y-3">
            <div className="flex justify-between">
              <div className="skeleton h-6 w-2/3" />
              <div className="skeleton h-6 w-16" />
            </div>
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-4/5" />
            <div className="flex justify-between items-center">
              <div className="skeleton h-6 w-20 rounded-full" />
              <div className="skeleton h-10 w-10 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default LoadingSkeleton;
