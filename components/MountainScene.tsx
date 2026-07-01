/**
 * Art-decó minimalist mountain scene. Three receding ridges, gold sun,
 * thin horizontal ornament lines and a subtle row of coffee-plant dots
 * at the base. Fills its parent, matching the coffee palette.
 */
export default function MountainScene({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1600 700"
      className={`w-full h-full ${className}`}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Escena de montañas art-decó"
    >
      <defs>
        <linearGradient id="ms-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2C1F16" />
          <stop offset="55%" stopColor="#3D2A1E" />
          <stop offset="100%" stopColor="#14100C" />
        </linearGradient>
        <linearGradient id="ms-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C9A876" stopOpacity="0.42" />
          <stop offset="100%" stopColor="#C9A876" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="ms-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7A4A2E" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#3D2A1E" />
        </linearGradient>
        <linearGradient id="ms-near" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1E1611" />
          <stop offset="100%" stopColor="#0A0806" />
        </linearGradient>
        <radialGradient id="ms-glow" cx="0.62" cy="0.28" r="0.35">
          <stop offset="0%" stopColor="#C9A876" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#C9A876" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Sky */}
      <rect width="1600" height="700" fill="url(#ms-sky)" />
      <rect width="1600" height="700" fill="url(#ms-glow)" />

      {/* Sun */}
      <circle cx="990" cy="200" r="86" fill="#C9A876" opacity="0.14" />
      <circle cx="990" cy="200" r="60" fill="#C9A876" opacity="0.32" />
      <circle cx="990" cy="200" r="36" fill="#C9A876" opacity="0.55" />

      {/* Art-decó horizontal lines cutting through the sun */}
      <line x1="120" y1="200" x2="890" y2="200" stroke="#C9A876" strokeWidth="0.6" opacity="0.4" />
      <line x1="120" y1="218" x2="820" y2="218" stroke="#C9A876" strokeWidth="0.4" opacity="0.22" />
      <line x1="1090" y1="200" x2="1480" y2="200" stroke="#C9A876" strokeWidth="0.6" opacity="0.4" />
      <line x1="1180" y1="218" x2="1480" y2="218" stroke="#C9A876" strokeWidth="0.4" opacity="0.22" />

      {/* Decorative rhombus markers on the horizon line */}
      <polygon points="90,200 100,193 110,200 100,207" fill="none" stroke="#C9A876" strokeWidth="0.7" opacity="0.7" />
      <polygon points="1490,200 1500,193 1510,200 1500,207" fill="none" stroke="#C9A876" strokeWidth="0.7" opacity="0.7" />

      {/* Far mountains */}
      <polygon
        points="0,500 140,340 300,420 460,280 620,400 780,300 940,420 1120,300 1280,400 1440,320 1600,400 1600,700 0,700"
        fill="url(#ms-far)"
      />

      {/* Mid mountains */}
      <polygon
        points="0,560 90,420 220,520 360,380 500,480 640,400 780,520 920,400 1060,520 1200,420 1340,520 1480,440 1600,520 1600,700 0,700"
        fill="url(#ms-mid)"
      />

      {/* Near mountains */}
      <polygon
        points="0,630 100,550 220,610 360,530 500,600 640,540 780,610 920,540 1060,620 1200,550 1340,620 1480,560 1600,610 1600,700 0,700"
        fill="url(#ms-near)"
      />

      {/* Coffee-plant row of dots along the base */}
      <g fill="#C9A876" opacity="0.32">
        {Array.from({ length: 18 }).map((_, i) => {
          const cx = 60 + i * 88 + (i % 2 === 0 ? 0 : 12);
          const cy = 668 + (i % 3);
          const r = i % 4 === 0 ? 2.4 : 1.6;
          return <circle key={i} cx={cx} cy={cy} r={r} />;
        })}
      </g>
    </svg>
  );
}
