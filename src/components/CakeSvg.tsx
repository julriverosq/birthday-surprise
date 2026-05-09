export default function CakeSvg({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 360 360"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <ellipse cx="180" cy="285" rx="88" ry="6" fill="#0000000F" />
      <ellipse cx="180" cy="276" rx="90" ry="8" fill="#CC8844" />
      <ellipse cx="180" cy="274" rx="90" ry="8" fill="#E8A960" />
      <ellipse cx="180" cy="268" rx="78" ry="9" fill="#8BBF9F" />
      <path
        d="M 102,268 L 102,198 A 78,14 0 0,1 258,198 L 258,268 Z"
        fill="#A8D5BA"
      />
      <ellipse cx="180" cy="198" rx="78" ry="14" fill="#C2E8D2" />
      <path
        d="M 133,198 L 133,148 A 47,11 0 0,1 227,148 L 227,198 Z"
        fill="#A8D5BA"
      />
      <ellipse cx="180" cy="148" rx="47" ry="11" fill="#C2E8D2" />
      <circle cx="120" cy="225" r="4" fill="#FF6B6B" />
      <circle cx="240" cy="235" r="3.5" fill="#FF6B6B" />
      <circle cx="155" cy="252" r="3.5" fill="#FFD93D" />
      <circle cx="225" cy="250" r="3.5" fill="#FFD93D" />
      <circle cx="185" cy="242" r="3" fill="#6BCB77" />
      <circle cx="130" cy="255" r="3" fill="#6BCB77" />
      <circle cx="245" cy="255" r="3" fill="#FF6B6B" />
      <circle cx="150" cy="165" r="3" fill="#FF6B6B" />
      <circle cx="210" cy="172" r="3.5" fill="#FFD93D" />
      <circle cx="175" cy="160" r="2.5" fill="#6BCB77" />
      <circle cx="215" cy="180" r="3" fill="#FF6B6B" />
      <circle cx="145" cy="182" r="3" fill="#FFD93D" />
    </svg>
  );
}
