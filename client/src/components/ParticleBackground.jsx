// client/src/components/ParticleBackground.jsx
import React from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function ParticleBackground() {
  const particlesInit = async (engine) => {
    // load the slim version (you can also use loadFull for all features)
    await loadSlim(engine);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: { color: "transparent" },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" },
            resize: true,
          },
          modes: { repulse: { distance: 100, duration: 0.4 } },
        },
        particles: {
          color: { value: "#00f6ff" },
          links: {
            color: "#00f6ff",
            distance: 150,
            enable: true,
            opacity: 0.3,
            width: 1,
          },
          move: { enable: true, speed: 1, outModes: { default: "bounce" } },
          number: { value: 80, density: { enable: true, area: 800 } },
          opacity: { value: 0.6 },
          shape: { type: "circle" },
          size: { value: { min: 1, max: 4 } },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 -z-10"
    />
  );
}
