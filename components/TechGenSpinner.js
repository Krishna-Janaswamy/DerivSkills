export function TechGenSpinner({ text = 'Loading...' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem', margin: '0 auto', gap: '1.5rem' }}>
      <div style={{
        position: 'relative',
        width: '80px',
        height: '80px',
        display: 'grid',
        placeItems: 'center'
      }}>
        {/* Outer spinner circle */}
        <svg 
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', animation: 'spin 1.5s linear infinite' }} 
          viewBox="0 0 50 50"
        >
          <circle
            cx="25" cy="25" r="23"
            fill="none"
            stroke="var(--border-strong)"
            strokeWidth="2"
          />
          <circle
            cx="25" cy="25" r="23"
            fill="none"
            stroke="var(--brand)"
            strokeWidth="2.5"
            strokeDasharray="40 100"
            strokeLinecap="round"
          />
        </svg>

        {/* Inner static logo scaled perfectly with multiplied transparency */}
        <div style={{ width: '48px', height: '48px', position: 'relative', zIndex: 1, display: 'grid', placeItems: 'center', padding: '8px', borderRadius: '14px', background: 'linear-gradient(180deg, rgba(255,255,255,0.95), rgba(241,245,249,0.9))', border: '1px solid rgba(148, 163, 184, 0.22)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.95), 0 10px 24px rgba(15, 23, 42, 0.08)' }}>
          <img 
            className="brand-logo-image brand-logo-image-spinner"
            src="/techgen-logo.png" 
            alt="Loading..." 
            style={{ height: '100%', width: '100%', objectFit: 'contain' }} 
          />
        </div>
      </div>
      
      {text && (
        <span style={{ color: 'var(--text-color)', fontSize: '1rem', fontWeight: 600, letterSpacing: '0.05em', animation: 'pulse 1.5s infinite' }}>
          {text}
        </span>
      )}
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}} />
    </div>
  );
}
