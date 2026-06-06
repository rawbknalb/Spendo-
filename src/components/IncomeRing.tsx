interface IncomeRingProps {
  ratioA: number
  ratioB: number
  nameA: string
  nameB: string
}

export function IncomeRing({ ratioA, ratioB, nameA, nameB }: IncomeRingProps) {
  const size = 96
  const stroke = 10
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius

  const dashA = circumference * ratioA
  const gapA = circumference - dashA
  const dashB = circumference * ratioB

  const gradIdA = 'ring-grad-a'
  const gradIdB = 'ring-grad-b'

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={gradIdA} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#e879f9" />
          </linearGradient>
          <linearGradient id={gradIdB} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>

        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={stroke}
        />

        {/* Person B arc (starts where A ends) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradIdB})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dashB} ${circumference - dashB}`}
          strokeDashoffset={-dashA}
          style={{ transition: 'stroke-dasharray 0.7s cubic-bezier(0.22,1,0.36,1)' }}
        />

        {/* Person A arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradIdA})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dashA} ${gapA}`}
          style={{ transition: 'stroke-dasharray 0.7s cubic-bezier(0.22,1,0.36,1)' }}
        />
      </svg>

      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wide text-white/50">
            {nameA.split(' ')[0]}
          </div>
          <div className="text-xs font-bold text-white">
            {Math.round(ratioA * 100)}%
          </div>
          <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/50">
            {nameB.split(' ')[0]}
          </div>
          <div className="text-xs font-bold" style={{ color: '#22d3ee' }}>
            {Math.round(ratioB * 100)}%
          </div>
        </div>
      </div>
    </div>
  )
}
