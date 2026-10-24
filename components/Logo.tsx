export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 flex-shrink-0 border border-[#F3DFA2]/50 rounded-full flex items-center justify-center">
        <span className="font-serif text-[#F3DFA2] text-lg">CW</span>
      </div>
      <span className="w-px h-8 bg-hairline" />
      <div className="flex flex-col leading-tight text-left">
        <span className="text-xs md:text-sm tracking-[0.15em] text-soft-white uppercase font-medium">
          The ONE Street Company
        </span>
        <span className="text-[10px] md:text-xs text-stone-gray tracking-wide">
          Brokered by Samson Properties
        </span>
      </div>
    </div>
  );
}
