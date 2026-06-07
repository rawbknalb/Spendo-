export function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#F2F2F7]">
      <div className="absolute -left-40 -top-40 h-[50rem] w-[50rem] rounded-full bg-[#007AFF]/[0.07] blur-[140px] animate-float-slow" />
      <div className="absolute -right-40 top-20 h-[44rem] w-[44rem] rounded-full bg-[#34C759]/[0.06] blur-[140px] animate-float-slower" />
      <div className="absolute bottom-[-10rem] left-1/3 h-[36rem] w-[36rem] rounded-full bg-[#007AFF]/[0.05] blur-[120px] animate-float-slow" />
    </div>
  )
}
