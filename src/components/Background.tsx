/**
 * Full-screen animated mesh-gradient backdrop. Soft, slowly drifting colour
 * blobs behind a dark base give the frosted-glass surfaces something rich to
 * blur over — the foundation of the Apple-style look.
 */
export function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#070912]">
      <div className="absolute -left-32 -top-40 h-[42rem] w-[42rem] rounded-full bg-violet-600/40 blur-[120px] animate-float-slow" />
      <div className="absolute -right-40 top-10 h-[38rem] w-[38rem] rounded-full bg-sky-500/30 blur-[120px] animate-float-slower" />
      <div className="absolute bottom-[-12rem] left-1/4 h-[40rem] w-[40rem] rounded-full bg-fuchsia-500/30 blur-[130px] animate-float-slow" />
      <div className="absolute bottom-0 right-1/4 h-[28rem] w-[28rem] rounded-full bg-emerald-400/20 blur-[120px] animate-float-slower" />
      {/* Fine noise/vignette to stop the gradients banding */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_transparent_0%,_rgba(7,9,18,0.6)_100%)]" />
    </div>
  )
}
