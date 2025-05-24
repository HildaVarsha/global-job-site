const FloatingElements = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Animated floating shapes */}
    <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-bounce"></div>
    <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-30 animate-pulse"></div>
    <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-25 animate-ping"></div>
    <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-gradient-to-r from-pink-400 to-red-400 rounded-full opacity-20 animate-spin"></div>
    <div className="absolute bottom-1/3 left-1/2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-30 animate-bounce delay-300"></div>

    {/* Floating particles */}
    {[...Array(15)].map((_, i) => (
      <div
        key={i}
        className={`absolute w-2 h-2 bg-gradient-to-r from-purple-300 to-blue-300 rounded-full opacity-40 animate-float-${
          i % 3
        }`}
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${3 + Math.random() * 4}s`,
        }}
      />
    ))}
  </div>
);
export default FloatingElements;
