const Wether = ({ weather }) => {
  if (!weather) return null;

  return (
    <div className="flex justify-center items-center w-full">
      <div
        className="w-full max-w-xs sm:max-w-sm
    bg-white/[0.08] backdrop-blur-2xl
    border border-white/10
    rounded-3xl
    shadow-[0_20px_60px_rgba(0,0,0,0.6)]
    p-6 sm:p-7
    text-center text-white
    transition-all duration-500
    hover:scale-[1.03] hover:shadow-[0_25px_80px_rgba(0,0,0,0.8)]"
      >
        {/* TEMP */}
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-none">
          {weather.temp}°C
        </h1>

        {/* CITY */}
        <h2 className="text-sm sm:text-base mt-2 text-slate-300 tracking-wide">
          {weather.city}
        </h2>

        {/* DIVIDER */}
        <div className="mt-5 h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

        {/* STATUS */}
        <p className="text-[11px] sm:text-xs mt-4 text-slate-400 tracking-wider uppercase">
          Live Weather Data
        </p>

        {/* EXTRA GLOW EFFECT */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none 
      bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-50"
        ></div>
      </div>
    </div>
  );
};
