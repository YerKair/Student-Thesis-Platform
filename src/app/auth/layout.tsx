"use client";

import { SpaceBackground } from "@/shared/ui/space-background";
import { SpaceDust } from "@/shared/ui/space-dust";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      <SpaceBackground>
        <SpaceDust
          particleCount={70}
          color="#8eb4ff"
          speed={0.3}
          opacity={0.4}
        />
        <div className="relative z-10">{children}</div>
      </SpaceBackground>
    </div>
  );
}
