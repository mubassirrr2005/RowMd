import Image from "next/image";

export function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-md bg-transparent ${className}`}>
      <Image 
        src="/logo.png" 
        alt="RowMD Logo" 
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}
