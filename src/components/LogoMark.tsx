export default function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="OpenType Bangladesh logo — মনিটর, শিক্ষার্থী ও খোলা বই"
    >
      <rect x="4" y="6" width="56" height="40" rx="8" fill="#006a4e" />
      <rect x="9" y="11" width="46" height="30" rx="4" fill="#ffffff" />
      <path
        d="M32 35.5c-2.8-2.1-6.3-3-10-3V17c3.7 0 7.2.9 10 3 2.8-2.1 6.3-3 10-3v15.5c-3.7 0-7.2.9-10 3z"
        fill="#006a4e"
      />
      <circle cx="32" cy="13.2" r="2.9" fill="#f42a41" />
      <path d="M28.6 26.5c0-3.4 1.5-5.6 3.4-5.6s3.4 2.2 3.4 5.6z" fill="#f42a41" />
      <path d="M26 46h12l1.6 6H24.4z" fill="#006a4e" />
      <rect x="20" y="52" width="24" height="4.5" rx="2.25" fill="#006a4e" />
    </svg>
  );
}
