export function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#f5f5f7]">
      <div className="absolute -left-32 -top-40 h-[42rem] w-[42rem] rounded-full bg-blue-200/50 blur-[120px] animate-float-slow" />
      <div className="absolute -right-40 top-10 h-[38rem] w-[38rem] rounded-full bg-sky-200/40 blur-[120px] animate-float-slower" />
      <div className="absolute bottom-[-12rem] left-1/4 h-[40rem] w-[40rem] rounded-full bg-blue-100/40 blur-[130px] animate-float-slow" />
      <div className="absolute bottom-0 right-1/4 h-[28rem] w-[28rem] rounded-full bg-emerald-300/30 blur-[120px] animate-float-slower" />
    </div>
  )
}
