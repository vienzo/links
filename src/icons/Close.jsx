export const Close = ({ className, onClick = () => {} }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    strokeWidth="1"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    onClick={onClick}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <rect x="4" y="4" width="16" height="16" rx="2"></rect>
    <path d="M10 10l4 4m0 -4l-4 4"></path>
  </svg>
);
