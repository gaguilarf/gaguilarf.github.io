import { Playfair_Display } from "next/font/google";

const playfairDisplay = Playfair_Display({
  display: "swap",
  subsets: ["latin"],
});

export default function TextFooter2() {
  return (
    <>
      {/* Left Text */}
      <h1
        className={`absolute left-10 bottom-5 transform -translate-y-1/2 text-white text-5xl font-bold leading-tight ${playfairDisplay.className}`}
      >
        <span className="text-gray-400">Ordena</span> <br /> las palabras
      </h1>

      {/* Right Text */}
      <h1
        className={`absolute right-10 bottom-5 transform -translate-y-1/2 text-white text-5xl font-bold leading-tight text-right ${playfairDisplay.className}`}
      >
        para revelar <br /> <span className="text-gray-400">la sorpresa</span>
      </h1>
    </>
  );
}
