"use client";

import { useEffect, useRef } from "react";
import { Space_Mono } from "next/font/google"; // Import from next/font/google

// Load the font
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"], // Specify font weights
  variable: "--font-space-mono", // Define a CSS variable
});

export default function Home() {
  const blobRef = useRef<HTMLDivElement>(null);
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const animationStatus = new Map<HTMLElement, boolean>(); // Track animation state

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (!blobRef.current) return;
      const { clientX, clientY } = event;

      blobRef.current.animate(
        {
          left: `${clientX}px`,
          top: `${clientY}px`,
        },
        { duration: 3000, fill: "forwards" },
      );
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  const handleMouseOver = (event: React.MouseEvent<HTMLHeadingElement>) => {
    const textElement = event.currentTarget;
    const originalText = textElement.dataset.value ?? "";

    if (animationStatus.get(textElement)) return;
    animationStatus.set(textElement, true);

    let iteration = 0;

    const interval = setInterval(() => {
      textElement.innerText = originalText
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return originalText[index];
          }
          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      if (iteration >= originalText.length) {
        clearInterval(interval);
        animationStatus.set(textElement, false);
      }

      iteration += 1 / 3;
    }, 30);
  };

  return (
    <main
      className={`relative h-screen overflow-hidden bg-black ${spaceMono.variable}`}
    >
      {/* Animated Blob */}
      <div
        ref={blobRef}
        className="absolute left-1/2 top-1/2 h-[34vmax] w-[34vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-80"
        style={{
          background: "linear-gradient(to right, red, orange)",
          animation: "blob-animation 20s infinite linear",
        }}
      ></div>

      {/* Blur Effect */}
      <div
        className="absolute inset-0 z-10"
        style={{ backdropFilter: "blur(12vmax)" }}
      ></div>

      {/* Title & Subtitle Wrapper */}
      <div className="absolute left-1/2 top-1/2 z-20 max-w-[90vw] -translate-x-1/2 -translate-y-1/2 text-center text-white">
        <h1
          className="overflow-hidden whitespace-nowrap px-4 font-mono text-white"
          style={{
            fontSize: "clamp(2rem, 8vw, 6rem)",
            textOverflow: "ellipsis",
          }}
          data-value="MONKEY MANIA ROBOTICS"
          onMouseOver={handleMouseOver}
        >
          MONKEY MANIA ROBOTICS
        </h1>
        <div className="space-y-4">
          <h2 className="font-mono text-lg opacity-80 md:text-xl">
            YEETUS | ORCAS | WRAITH | LOW TAPER FADE
          </h2>
          <p className="font-mono opacity-80">
            Combat robotics team from metro Atlanta, GA
          </p>
        </div>
      </div>
    </main>
  );
}
