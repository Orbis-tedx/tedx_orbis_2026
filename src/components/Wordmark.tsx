import logo from "../image_assets/logo/logo-black.png";

type Props = { className?: string; size?: "nav" | "footer" | "inline" };

const sizes = {
  nav: "h-10 w-28",
  footer: "h-16 w-40",
  inline: "h-6 w-14",
};

export default function Wordmark({ className = "", size = "nav" }: Props) {
  return (
    <span className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-sm bg-white ${sizes[size]} ${className}`}>
      <img className="h-full w-full object-contain" src={logo} alt="TEDx The Orbis School Youth" />
    </span>
  );
}
