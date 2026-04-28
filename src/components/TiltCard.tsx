import { motion, useMotionValue, useSpring, useTransform, type HTMLMotionProps } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface TiltCardProps extends HTMLMotionProps<"div"> {
  intensity?: number;
  lift?: number;
  glare?: boolean;
}

/**
 * Premium 3D tilt + lift card. Subtle by default.
 * Uses spring-smoothed mouse position for buttery motion.
 */
export const TiltCard = ({
  intensity = 6,
  lift = 6,
  glare = true,
  className,
  children,
  ...rest
}: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const sx = useSpring(x, { stiffness: 180, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 18, mass: 0.4 });

  const rotateX = useTransform(sy, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-intensity, intensity]);
  const glareBg = useTransform([sx, sy], ([vx, vy]: number[]) => {
    const gx = 50 + vx * 60;
    const gy = 50 + vy * 60;
    return `radial-gradient(circle at ${gx}% ${gy}%, hsl(var(--primary-glow) / 0.18), transparent 55%)`;
  });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ y: -lift }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={cn("group relative will-change-transform", className)}
      {...rest}
    >
      <div style={{ transform: "translateZ(0)" }} className="relative">
        {children}
      </div>
      {glare && (
        <motion.div
          aria-hidden
          style={{ background: glareBg }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      )}
    </motion.div>
  );
};
