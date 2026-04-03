export function TechGenSpinner({ text = 'Loading...' }) {
  return (
    <div
      aria-live="polite"
      aria-busy="true"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem', margin: '0 auto', gap: '1rem' }}
    >
      <div style={{
        position: 'relative',
        width: '104px',
        height: '104px',
        display: 'grid',
        placeItems: 'center'
      }}>
        <div
          style={{
            position: 'absolute',
            inset: '10px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(37, 99, 235, 0.10), rgba(37, 99, 235, 0))',
            filter: 'blur(6px)',
          }}
        />

        {/* Outer spinner circle */}
        <svg 
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', animation: 'spin 1.5s linear infinite' }} 
          viewBox="0 0 50 50"
        >
          <circle
            cx="25" cy="25" r="23"
            fill="none"
            stroke="rgba(148, 163, 184, 0.35)"
            strokeWidth="1.8"
          />
          <circle
            cx="25" cy="25" r="23"
            fill="none"
            stroke="var(--brand)"
            strokeWidth="2.8"
            strokeDasharray="36 108"
            strokeLinecap="round"
          />
        </svg>

        {/* Inner static logo scaled perfectly with multiplied transparency */}
        <div style={{ width: '58px', height: '58px', position: 'relative', zIndex: 1, display: 'grid', placeItems: 'center', padding: '10px', borderRadius: '18px', background: 'linear-gradient(180deg, rgba(255,255,255,0.98), rgba(241,245,249,0.92))', border: '1px solid rgba(148, 163, 184, 0.20)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.98), 0 14px 28px rgba(15, 23, 42, 0.10)' }}>
          <img 
            className="brand-logo-image brand-logo-image-spinner"
            src="/techgen-logo.png" 
            alt="Loading..." 
            style={{ height: '100%', width: '100%', objectFit: 'contain' }} 
          />
        </div>
      </div>
      
      {text && (
        <div style={{ display: 'grid', gap: '0.35rem', justifyItems: 'center', textAlign: 'center' }}>
          <span style={{ color: 'var(--text-color)', fontSize: '1rem', fontWeight: 700, letterSpacing: '0.02em', animation: 'pulse 1.6s ease-in-out infinite' }}>
            {text}
          </span>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', lineHeight: 1.5 }}>
            Please wait a moment while we prepare your workspace.
          </span>
        </div>
      )}
    </div>
  );
}
