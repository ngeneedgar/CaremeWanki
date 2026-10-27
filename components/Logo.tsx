export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 flex-shrink-0 border border-[#F3DFA2]/50 rounded-full flex items-center justify-center bg-[#242426]">
        <span className="font-serif text-[#F3DFA2] text-lg font-normal">CW</span>
      </div>
      <div className="flex flex-col leading-tight text-left">
        <span className="text-xs md:text-sm tracking-[0.12em] text-soft-white uppercase font-serif">
          Careme Nchang Wanki
        </span>
        <span className="text-[10px] text-stone-gray tracking-wider uppercase">
          Real Estate Advisor · DC, MD & VA
        </span>
      </div>
    </div>
  );
}
