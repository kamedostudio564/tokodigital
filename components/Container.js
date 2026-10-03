export default function Container({ children, className = "" }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 ${className}`}>{children}</div>;
}
