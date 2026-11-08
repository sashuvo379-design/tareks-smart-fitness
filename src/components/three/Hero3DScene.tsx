'use client';

import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  Float,
  Sparkles,
  PerformanceMonitor,
  ContactShadows,
  Environment,
  Lightformer,
  RoundedBox,
  Html,
} from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '@/store/use-store';
import { Layers, EyeOff, RotateCcw, Orbit } from 'lucide-react';

type PillarStage = 'barbell' | 'gym' | 'wallet' | 'machinery';

/**
 * Reusable Pro 8-Sided Commercial Urethane Dumbbell Assembly
 */
function ProHexDumbbell({
  position,
  rotation,
  scale = 1,
  accentColor = '#C6FF00',
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
  accentColor?: string;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.45;
    ref.current.rotation.y += delta * 0.3;
    ref.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 1.6 + position[0]) * 0.08;
  });

  return (
    <group ref={ref} position={position} rotation={rotation} scale={scale}>
      {/* Ergonomic Contoured Chrome Handle */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.055, 0.055, 0.72, 32]} />
        <meshPhysicalMaterial
          color="#F8FAFC"
          metalness={0.96}
          roughness={0.12}
          clearcoat={0.6}
        />
      </mesh>
      {/* Center Swell Grip */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.068, 0.055, 0.34, 32]} />
        <meshPhysicalMaterial
          color="#CBD5E1"
          metalness={0.85}
          roughness={0.28}
        />
      </mesh>
      {/* Dual Knurl Rings */}
      {[-0.18, 0.18].map((x, i) => (
        <mesh key={i} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.062, 0.062, 0.025, 24]} />
          <meshStandardMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}

      {/* Left & Right 8-Sided Commercial Urethane Heads */}
      {[-1, 1].map((dir) => (
        <group key={dir} position={[dir * 0.46, 0, 0]}>
          {/* Inner Chrome Flange */}
          <mesh position={[-dir * 0.12, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.14, 0.09, 0.06, 24]} />
            <meshPhysicalMaterial color="#E2E8F0" metalness={0.95} roughness={0.1} />
          </mesh>
          {/* Main Octagonal Urethane Head */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.31, 0.31, 0.24, 8]} />
            <meshPhysicalMaterial
              color="#1E2028"
              metalness={0.35}
              roughness={0.25}
              clearcoat={0.4}
            />
          </mesh>
          {/* Beveled Outer Steel Face */}
          <mesh position={[dir * 0.125, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.25, 0.28, 0.02, 8]} />
            <meshPhysicalMaterial color="#94A3B8" metalness={0.9} roughness={0.18} />
          </mesh>
          {/* Recessed Weight Number Cap */}
          <mesh position={[dir * 0.138, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.13, 0.13, 0.015, 24]} />
            <meshPhysicalMaterial color="#0F172A" metalness={0.7} roughness={0.2} />
          </mesh>
          {/* Glowing Accent Ring */}
          <mesh position={[dir * 0.135, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <torusGeometry args={[0.19, 0.012, 16, 32]} />
            <meshStandardMaterial
              color={accentColor}
              emissive={accentColor}
              emissiveIntensity={0.9}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/**
 * Stage 01: Hyper-Detailed Calibrated Olympic Barbell + Floating Hex Dumbbells
 */
function Barbell3DModel({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const barbellRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current || !barbellRef.current) return;
    barbellRef.current.rotation.y += delta * 0.32;
    barbellRef.current.rotation.z =
      0.16 + Math.sin(state.clock.elapsedTime * 0.7) * 0.05;
    const targetScale = active ? 1 : 0.001;
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.09
    );
  });

  // IPF Calibrated Competition Plates (25kg Red, 20kg Blue, 15kg Yellow, 10kg Green)
  const competitionPlates = [
    { offset: 1.12, radius: 1.02, thick: 0.16, color: '#DC2626', rim: '#EF4444' },
    { offset: 1.31, radius: 0.94, thick: 0.14, color: '#2563EB', rim: '#60A5FA' },
    { offset: 1.48, radius: 0.82, thick: 0.13, color: '#D97706', rim: '#F5C542' },
    { offset: 1.63, radius: 0.70, thick: 0.11, color: '#16A34A', rim: '#C6FF00' },
  ];

  return (
    <group ref={groupRef}>
      <group ref={barbellRef} rotation={[0.14, -0.35, 0.16]}>
        {/* 1. 28.5mm 210,000 PSI Brushed Chrome Olympic Shaft */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.072, 0.072, 2.2, 36]} />
          <meshPhysicalMaterial
            color="#F8FAFC"
            metalness={0.96}
            roughness={0.12}
            clearcoat={0.7}
          />
        </mesh>

        {/* Volcano Knurl Grip Sections (Left, Center, Right) */}
        {[-0.58, 0, 0.58].map((x, idx) => (
          <mesh key={idx} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry
              args={[0.076, 0.076, idx === 1 ? 0.28 : 0.48, 32]}
            />
            <meshPhysicalMaterial
              color="#94A3B8"
              metalness={0.82}
              roughness={0.36}
            />
          </mesh>
        ))}

        {/* Dual IPF Knurl Ring Bands */}
        {[-0.45, 0.45].map((x, idx) => (
          <mesh key={idx} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.08, 0.08, 0.025, 24]} />
            <meshStandardMaterial
              color="#C6FF00"
              emissive="#C6FF00"
              emissiveIntensity={0.9}
            />
          </mesh>
        ))}

        {/* 2. Bronze Bushing Collars & 50mm Rotating Olympic Sleeves */}
        {[-1, 1].map((dir) => (
          <group key={dir}>
            {/* Oil-Impregnated Bronze Bushing */}
            <mesh position={[dir * 0.92, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.135, 0.135, 0.07, 32]} />
              <meshPhysicalMaterial
                color="#F5C542"
                metalness={0.92}
                roughness={0.15}
                clearcoat={0.5}
              />
            </mesh>
            {/* Thick Inner Sleeve Flange */}
            <mesh position={[dir * 0.99, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.19, 0.19, 0.08, 32]} />
              <meshPhysicalMaterial
                color="#E2E8F0"
                metalness={0.95}
                roughness={0.12}
              />
            </mesh>
            {/* 50mm Hard-Chrome Rotating Loadable Sleeve */}
            <mesh position={[dir * 1.55, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.125, 0.125, 1.15, 36]} />
              <meshPhysicalMaterial
                color="#F1F5F9"
                metalness={0.96}
                roughness={0.1}
                clearcoat={0.8}
              />
            </mesh>
            {/* Sleeve End Cap */}
            <mesh position={[dir * 2.13, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.126, 0.126, 0.02, 24]} />
              <meshStandardMaterial
                color="#C6FF00"
                emissive="#C6FF00"
                emissiveIntensity={0.6}
              />
            </mesh>
          </group>
        ))}

        {/* 3. Deep-Dish Calibrated Competition Plates with Spokes & Steel Hubs */}
        {competitionPlates.map((cfg, idx) =>
          [-1, 1].map((dir) => (
            <group key={`${idx}-${dir}`} position={[dir * cfg.offset, 0, 0]}>
              {/* Core Plate Disc */}
              <mesh rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[cfg.radius, cfg.radius, cfg.thick, 48]} />
                <meshPhysicalMaterial
                  color={cfg.color}
                  metalness={0.45}
                  roughness={0.22}
                  clearcoat={0.65}
                />
              </mesh>

              {/* Raised Deep-Dish Outer Lip (Both Faces) */}
              {[-1, 1].map((face) => (
                <mesh
                  key={face}
                  position={[face * (cfg.thick / 2), 0, 0]}
                  rotation={[0, Math.PI / 2, 0]}
                >
                  <torusGeometry args={[cfg.radius * 0.92, 0.032, 16, 48]} />
                  <meshPhysicalMaterial
                    color={cfg.color}
                    metalness={0.55}
                    roughness={0.18}
                    clearcoat={0.8}
                  />
                </mesh>
              ))}

              {/* 6 Structural Reinforcement Spokes on Outer Face */}
              {[0, 1, 2].map((spoke) => (
                <mesh
                  key={spoke}
                  position={[dir * (cfg.thick / 2 + 0.005), 0, 0]}
                  rotation={[spoke * (Math.PI / 3), 0, 0]}
                >
                  <boxGeometry args={[0.018, cfg.radius * 1.65, 0.045]} />
                  <meshPhysicalMaterial
                    color="#18181B"
                    metalness={0.8}
                    roughness={0.25}
                  />
                </mesh>
              ))}

              {/* CNC Machined Chrome Center Hub */}
              <mesh rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry
                  args={[
                    cfg.radius * 0.28,
                    cfg.radius * 0.28,
                    cfg.thick + 0.024,
                    32,
                  ]}
                />
                <meshPhysicalMaterial
                  color="#F8FAFC"
                  metalness={0.96}
                  roughness={0.12}
                  clearcoat={0.6}
                />
              </mesh>

              {/* Illuminated Calibration Rim */}
              <mesh
                position={[dir * (cfg.thick / 2 + 0.008), 0, 0]}
                rotation={[0, Math.PI / 2, 0]}
              >
                <torusGeometry args={[cfg.radius * 0.78, 0.014, 16, 48]} />
                <meshStandardMaterial
                  color={cfg.rim}
                  emissive={cfg.rim}
                  emissiveIntensity={0.75}
                />
              </mesh>
            </group>
          ))
        )}

        {/* 4. Competition CNC Quick-Lock Collars with Lever Arms */}
        {[-1.84, 1.84].map((x, i) => (
          <group key={i} position={[x, 0, 0]}>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.21, 0.21, 0.16, 28]} />
              <meshPhysicalMaterial
                color="#1E293B"
                metalness={0.88}
                roughness={0.18}
                clearcoat={0.5}
              />
            </mesh>
            {/* Quick-Release Cam Lever */}
            <mesh position={[0, 0.22, 0]} rotation={[0, 0, 0.25]}>
              <boxGeometry args={[0.12, 0.14, 0.08]} />
              <meshStandardMaterial
                color="#FF6B2B"
                emissive="#FF6B2B"
                emissiveIntensity={0.5}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* 5. Orbiting Pro 8-Sided Hex Dumbbells */}
      <ProHexDumbbell
        position={[-1.65, 1.0, 0.55]}
        rotation={[0.4, 0.5, -0.3]}
        scale={0.78}
        accentColor="#C6FF00"
      />
      <ProHexDumbbell
        position={[1.65, -0.85, 0.55]}
        rotation={[-0.35, -0.6, 0.25]}
        scale={0.78}
        accentColor="#F5C542"
      />
    </group>
  );
}

/**
 * Stage 02: 6-Post Commercial Power Cage, Oak Deadlift Platform & FID Bench
 */
function GymFloorMiniScene({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.25;
    const s = active ? 1 : 0.001;
    groupRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.09);
  });

  const uprights: [number, number, number][] = [
    [-1.15, 0.05, -0.85],
    [1.15, 0.05, -0.85],
    [-1.15, 0.05, 0.1],
    [1.15, 0.05, 0.1],
    [-1.15, 0.05, 0.95],
    [1.15, 0.05, 0.95],
  ];

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* 3-Zone Olympic Lifting Platform */}
      <RoundedBox
        args={[3.7, 0.16, 3.1]}
        radius={0.04}
        smoothness={4}
        position={[0, -1.12, 0]}
      >
        <meshPhysicalMaterial color="#1E2330" metalness={0.5} roughness={0.35} />
      </RoundedBox>
      {/* Center Oak Hardwood Insert */}
      <mesh position={[0, -1.03, 0]}>
        <boxGeometry args={[1.35, 0.03, 2.95]} />
        <meshPhysicalMaterial
          color="#9A5B25"
          roughness={0.28}
          metalness={0.1}
          clearcoat={0.6}
        />
      </mesh>
      {/* Platform Volt Perimeter Trim */}
      <mesh position={[0, -1.04, 1.54]}>
        <boxGeometry args={[3.65, 0.04, 0.04]} />
        <meshStandardMaterial color="#C6FF00" emissive="#C6FF00" emissiveIntensity={0.8} />
      </mesh>

      {/* 6 Laser-Cut 3x3" Uprights */}
      {uprights.map((pos, idx) => (
        <group key={idx} position={pos}>
          <mesh>
            <boxGeometry args={[0.14, 2.35, 0.14]} />
            <meshPhysicalMaterial
              color="#334155"
              metalness={0.85}
              roughness={0.2}
              clearcoat={0.5}
            />
          </mesh>
          {/* Westside Laser-Cut Number Strip */}
          <mesh position={[0, 0, 0.073]}>
            <boxGeometry args={[0.04, 1.9, 0.005]} />
            <meshStandardMaterial
              color="#C6FF00"
              emissive="#C6FF00"
              emissiveIntensity={0.45}
            />
          </mesh>
        </group>
      ))}

      {/* Top Crossmembers & Pull-Up Arch */}
      {[-0.85, 0.1, 0.95].map((z, idx) => (
        <mesh key={idx} position={[0, 1.15, z]}>
          <boxGeometry args={[2.44, 0.15, 0.15]} />
          <meshPhysicalMaterial
            color="#C6FF00"
            emissive="#C6FF00"
            emissiveIntensity={0.45}
            metalness={0.5}
            roughness={0.2}
          />
        </mesh>
      ))}
      {[-1.15, 1.15].map((x, idx) => (
        <mesh key={idx} position={[x, 1.15, 0.05]}>
          <boxGeometry args={[0.15, 0.15, 1.95]} />
          <meshPhysicalMaterial color="#475569" metalness={0.85} roughness={0.2} />
        </mesh>
      ))}

      {/* Safety Spotter Arms */}
      {[-1.15, 1.15].map((x, idx) => (
        <mesh key={idx} position={[x, -0.25, 0.52]}>
          <boxGeometry args={[0.12, 0.09, 0.85]} />
          <meshStandardMaterial color="#FF6B2B" emissive="#FF6B2B" emissiveIntensity={0.35} />
        </mesh>
      ))}

      {/* Loaded Olympic Barbell on Rack J-Cups */}
      <group position={[0, 0.22, 0.98]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.055, 0.055, 3.3, 28]} />
          <meshPhysicalMaterial color="#F8FAFC" metalness={0.96} roughness={0.12} />
        </mesh>
        {[-1.38, -1.5, 1.38, 1.5].map((x, idx) => (
          <mesh key={idx} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.48, 0.48, 0.09, 32]} />
            <meshPhysicalMaterial
              color={idx % 2 === 0 ? '#DC2626' : '#2563EB'}
              metalness={0.5}
              roughness={0.2}
              clearcoat={0.6}
            />
          </mesh>
        ))}
      </group>

      {/* Center Competition Adjustable FID Bench */}
      <group position={[0, -0.75, 0.25]}>
        <mesh position={[0, -0.18, 0]}>
          <boxGeometry args={[0.42, 0.12, 1.35]} />
          <meshPhysicalMaterial color="#64748B" metalness={0.85} roughness={0.2} />
        </mesh>
        <RoundedBox args={[0.46, 0.12, 1.25]} radius={0.03} smoothness={4}>
          <meshPhysicalMaterial
            color="#1E293B"
            roughness={0.3}
            metalness={0.2}
            clearcoat={0.4}
          />
        </RoundedBox>
      </group>
    </group>
  );
}

/**
 * Stage 03: Artisan Full-Grain Leather Bifold & CNC Carbon/Gold Cardholder
 */
function HeritageWallet3DModel({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.36;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.8) * 0.12;
    const s = active ? 1 : 0.001;
    groupRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.09);
  });

  return (
    <group ref={groupRef}>
      {/* Left Beveled Tuscan Leather Wing */}
      <group position={[-0.78, 0, 0]} rotation={[0, 0.28, 0]}>
        <RoundedBox args={[1.68, 2.15, 0.16]} radius={0.05} smoothness={6}>
          <meshPhysicalMaterial
            color="#9A521C"
            roughness={0.32}
            metalness={0.14}
            clearcoat={0.45}
          />
        </RoundedBox>
        {/* Skived Card Slots */}
        {[-0.25, 0.15].map((y, i) => (
          <RoundedBox
            key={i}
            args={[1.48, 0.55, 0.04]}
            radius={0.02}
            position={[0, y, 0.08]}
          >
            <meshPhysicalMaterial color="#7C3F12" roughness={0.36} metalness={0.12} />
          </RoundedBox>
        ))}
        {/* Peeking Brushed Platinum Card */}
        <RoundedBox args={[1.32, 0.84, 0.03]} radius={0.02} position={[0, 0.55, 0.07]}>
          <meshPhysicalMaterial color="#E2E8F0" metalness={0.92} roughness={0.15} />
        </RoundedBox>
      </group>

      {/* Right Beveled Tuscan Leather Wing */}
      <group position={[0.78, 0, 0.18]} rotation={[0, -0.35, 0]}>
        <RoundedBox args={[1.68, 2.15, 0.16]} radius={0.05} smoothness={6}>
          <meshPhysicalMaterial
            color="#8B4817"
            roughness={0.32}
            metalness={0.14}
            clearcoat={0.45}
          />
        </RoundedBox>

        {/* 24K Gold Foil Crest Plate */}
        <RoundedBox args={[0.65, 0.24, 0.05]} radius={0.015} position={[0.32, -0.68, 0.08]}>
          <meshPhysicalMaterial
            color="#F5C542"
            emissive="#F5C542"
            emissiveIntensity={0.4}
            metalness={0.95}
            roughness={0.12}
            clearcoat={0.8}
          />
        </RoundedBox>

        {/* Fanned Gold & Obsidian Titanium Cards */}
        <RoundedBox
          args={[1.34, 0.84, 0.035]}
          radius={0.02}
          position={[-0.04, 0.62, 0.06]}
          rotation={[0, 0, -0.06]}
        >
          <meshPhysicalMaterial
            color="#F5C542"
            emissive="#F5C542"
            emissiveIntensity={0.22}
            metalness={0.94}
            roughness={0.14}
          />
        </RoundedBox>
        <RoundedBox
          args={[1.34, 0.84, 0.035]}
          radius={0.02}
          position={[0.05, 0.42, 0.08]}
          rotation={[0, 0, 0.04]}
        >
          <meshPhysicalMaterial color="#1E293B" metalness={0.9} roughness={0.18} />
        </RoundedBox>
      </group>
    </group>
  );
}

/**
 * Stage 04: Dual-Stack Commercial Functional Trainer & Cable Crossover
 */
function MachineryTower3DModel({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.3;
    const s = active ? 1 : 0.001;
    groupRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.09);
  });

  return (
    <group ref={groupRef} position={[0, -0.15, 0]}>
      {/* Base Structural Skids */}
      {[-1.15, 1.15].map((x, idx) => (
        <RoundedBox
          key={idx}
          args={[0.55, 0.14, 1.5]}
          radius={0.03}
          position={[x, -1.15, 0]}
        >
          <meshPhysicalMaterial color="#334155" metalness={0.85} roughness={0.22} />
        </RoundedBox>
      ))}

      {/* Left & Right Weight-Stack Towers */}
      {[-1.15, 1.15].map((x, sideIdx) => (
        <group key={sideIdx} position={[x, 0, 0]}>
          {/* Outer Structural Columns */}
          {[-0.45, 0.45].map((z, colIdx) => (
            <mesh key={colIdx} position={[0, 0, z]}>
              <boxGeometry args={[0.14, 2.35, 0.14]} />
              <meshPhysicalMaterial color="#475569" metalness={0.85} roughness={0.2} />
            </mesh>
          ))}
          {/* Dual Chrome Guide Rods */}
          {[-0.16, 0.16].map((z, rodIdx) => (
            <mesh key={rodIdx} position={[0, 0, z]}>
              <cylinderGeometry args={[0.025, 0.025, 2.2, 20]} />
              <meshPhysicalMaterial color="#F8FAFC" metalness={0.96} roughness={0.1} />
            </mesh>
          ))}
          {/* 9 Individual CNC Steel Weight Stack Plates */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((plateIdx) => (
            <mesh key={plateIdx} position={[0, -0.88 + plateIdx * 0.14, 0]}>
              <boxGeometry args={[0.28, 0.095, 0.58]} />
              <meshPhysicalMaterial
                color={plateIdx === 8 ? '#FF6B2B' : '#1E293B'}
                metalness={0.75}
                roughness={0.22}
              />
            </mesh>
          ))}
        </group>
      ))}

      {/* Overhead Bridge Arch & Telemetry Console */}
      <RoundedBox args={[2.55, 0.22, 0.35]} radius={0.04} position={[0, 1.15, 0]}>
        <meshPhysicalMaterial
          color="#FF6B2B"
          emissive="#FF6B2B"
          emissiveIntensity={0.45}
          metalness={0.6}
          roughness={0.2}
        />
      </RoundedBox>

      {/* Center Pull-Up Grips */}
      {[-0.45, 0.45].map((x, i) => (
        <mesh key={i} position={[x, 1.0, 0.25]} rotation={[0.4, 0, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.38, 16]} />
          <meshPhysicalMaterial color="#F8FAFC" metalness={0.95} roughness={0.12} />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Precision Illuminated Studio Turntable Ring Beneath Active 3D Assembly
 */
function StudioTurntablePodium({ accentColor }: { accentColor: string }) {
  return (
    <group position={[0, -1.48, 0]}>
      {/* Main Brushed Metal Podium Disc */}
      <mesh>
        <cylinderGeometry args={[2.35, 2.55, 0.12, 64]} />
        <meshPhysicalMaterial
          color="#161924"
          metalness={0.85}
          roughness={0.22}
          clearcoat={0.6}
        />
      </mesh>
      {/* Glowing Outer Telemetry Ring */}
      <mesh position={[0, 0.065, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.28, 0.022, 16, 64]} />
        <meshStandardMaterial
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={0.95}
        />
      </mesh>
      {/* Inner Calibration Ring */}
      <mesh position={[0, 0.065, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.55, 0.012, 16, 64]} />
        <meshStandardMaterial
          color="#F8FAFC"
          emissive="#F8FAFC"
          emissiveIntensity={0.4}
        />
      </mesh>
    </group>
  );
}

function CameraParallaxRig() {
  useFrame((state) => {
    const targetX = state.pointer.x * 0.55;
    const targetY = state.pointer.y * 0.35 + 0.35;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05);
    state.camera.lookAt(0, -0.05, 0);
  });
  return null;
}

export default function Hero3DScene({
  externalStage,
  onStageChange,
}: {
  externalStage?: PillarStage;
  onStageChange?: (s: PillarStage) => void;
}) {
  const { reduced3D, setReduced3D } = useStore();
  const [stage, setStage] = useState<PillarStage>(externalStage || 'barbell');
  const [dpr, setDpr] = useState(1.5);

  useEffect(() => {
    if (externalStage) setStage(externalStage);
  }, [externalStage]);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y < 280) setStage('barbell');
      else if (y >= 280 && y < 650) setStage('gym');
      else if (y >= 650 && y < 1050) setStage('wallet');
      else if (y >= 1050 && y < 1500) setStage('machinery');
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const selectStage = (s: PillarStage) => {
    setStage(s);
    onStageChange?.(s);
  };

  const stageMeta: Record<PillarStage, { label: string; sub: string; color: string }> = {
    barbell: {
      label: '01 // OLYMPIC IRON & DUMBBELLS',
      sub: '210K PSI Chrome Bar • Calibrated Plates & Hex Dumbbells',
      color: '#C6FF00',
    },
    gym: {
      label: '02 // 6-POST POWER SANCTUARY',
      sub: '3x3" Laser-Cut Monster Rack & Oak Deadlift Platform',
      color: '#C6FF00',
    },
    wallet: {
      label: '03 // HERITAGE LEATHER ATELIER',
      sub: 'Tuscan Full-Grain Bifold & 24K Gold Monogram Hardware',
      color: '#F5C542',
    },
    machinery: {
      label: '04 // COMMERCIAL GYM ARMORY',
      sub: 'Dual-Stack CNC Cable Crossover & Heavy Club Machines',
      color: '#FF6B2B',
    },
  };

  if (reduced3D) {
    return (
      <div className="relative h-full w-full min-h-[460px] rounded-2xl border border-white/20 bg-graphite p-8 flex flex-col justify-between overflow-hidden shadow-2xl">
        <img
          src="/assets/gym/hero-poster.jpg"
          alt="Tarek's Smart Fitness Gym 3D Sanctuary"
          className="absolute inset-0 w-full h-full object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
        <div className="relative z-10 flex justify-between items-center">
          <span className="px-3 py-1 rounded-full bg-obsidian/90 border border-volt/60 text-volt font-mono text-xs">
            2D PHOTOGRAPHY MODE ACTIVE
          </span>
          <button
            onClick={() => setReduced3D(false)}
            className="px-3 py-1.5 rounded-lg bg-volt text-obsidian font-semibold text-xs flex items-center gap-1.5 shadow-volt"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Enable 3D WebGL
          </button>
        </div>
        <div className="relative z-10 mt-auto">
          <p className="font-mono text-xs text-volt uppercase tracking-widest">
            {stageMeta[stage].label}
          </p>
          <h3 className="font-display text-3xl text-bone mt-1">{stageMeta[stage].sub}</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[520px] lg:h-[600px] rounded-2xl border border-white/20 bg-[radial-gradient(ellipse_at_center,_#2B354D_0%,_#151926_58%,_#0A0B0F_100%)] overflow-hidden shadow-2xl">
      {/* Top HUD Overlay */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="px-3.5 py-1.5 rounded-full bg-obsidian/90 backdrop-blur-md border border-white/20 flex items-center gap-2 shadow-lg">
          <span
            className="w-2.5 h-2.5 rounded-full animate-ping"
            style={{ backgroundColor: stageMeta[stage].color }}
          />
          <span className="font-mono text-xs tracking-wider text-bone font-medium">
            {stageMeta[stage].label}
          </span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-obsidian/80 border border-white/15 font-mono text-[11px] text-muted">
            <Orbit className="w-3.5 h-3.5 text-volt" /> Drag to Orbit 360°
          </span>
          <button
            onClick={() => setReduced3D(true)}
            className="px-3 py-1.5 rounded-full bg-obsidian/90 hover:bg-elevated border border-white/20 text-bone text-xs font-mono flex items-center gap-1.5 transition"
            title="Switch to high-res 2D photo view"
          >
            <EyeOff className="w-3.5 h-3.5 text-volt" /> 2D Photo
          </button>
        </div>
      </div>

      {/* Three.js R3F Canvas with Procedural HDRI Studio Reflection Environment */}
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0.55, 5.1], fov: 40 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.25,
        }}
      >
        <PerformanceMonitor
          onIncline={() => setDpr(Math.min(2, window.devicePixelRatio))}
          onDecline={() => setDpr(1)}
        />

        {/* Real-time GPU Studio Softbox Reflection Environment (No external network file required) */}
        <Environment resolution={256}>
          <group rotation={[-Math.PI / 3, 0, 0]}>
            <Lightformer
              form="rect"
              intensity={5}
              rotation-x={Math.PI / 2}
              position={[0, 5, -2]}
              scale={[10, 4, 1]}
            />
            <Lightformer
              form="rect"
              intensity={3.5}
              rotation-y={Math.PI / 2}
              position={[-6, 2, -1]}
              scale={[8, 3, 1]}
              color={stageMeta[stage].color}
            />
            <Lightformer
              form="rect"
              intensity={3.5}
              rotation-y={-Math.PI / 2}
              position={[6, 2, -1]}
              scale={[8, 3, 1]}
              color="#F5C542"
            />
            <Lightformer
              form="ring"
              intensity={3}
              rotation-y={Math.PI / 2}
              position={[0, 2, 5]}
              scale={[4, 4, 1]}
              color="#ffffff"
            />
          </group>
        </Environment>

        <ambientLight intensity={1.2} />
        <hemisphereLight args={['#ffffff', '#334155', 2.0]} />
        <directionalLight position={[5, 6, 5]} intensity={3.5} color="#ffffff" />
        <directionalLight
          position={[-5, 4, 3]}
          intensity={2.2}
          color={stageMeta[stage].color}
        />
        <spotLight
          position={[4, 7, 5]}
          angle={0.5}
          penumbra={1}
          intensity={3.5}
          decay={0}
          color={stageMeta[stage].color}
        />

        <Suspense
          fallback={
            <Html center>
              <div className="px-4 py-2 rounded-lg bg-obsidian border border-volt text-volt font-mono text-xs animate-pulse">
                LOADING 3D CAD ASSEMBLY...
              </div>
            </Html>
          }
        >
          <Float speed={1.6} rotationIntensity={0.18} floatIntensity={0.32}>
            <Barbell3DModel active={stage === 'barbell'} />
            <GymFloorMiniScene active={stage === 'gym'} />
            <HeritageWallet3DModel active={stage === 'wallet'} />
            <MachineryTower3DModel active={stage === 'machinery'} />
          </Float>

          <StudioTurntablePodium accentColor={stageMeta[stage].color} />

          <Sparkles
            count={60}
            scale={6}
            size={2.4}
            speed={0.35}
            opacity={0.75}
            color={stageMeta[stage].color}
          />
          <ContactShadows
            position={[0, -1.4, 0]}
            opacity={0.7}
            scale={8}
            blur={2.2}
            far={4}
          />
        </Suspense>

        <CameraParallaxRig />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.65}
          minPolarAngle={Math.PI / 3.2}
        />
      </Canvas>

      {/* Bottom Scroll-Story / Pillar Switcher Bar */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-center justify-center gap-2">
        {(
          [
            { id: 'barbell', label: '01. Barbell & Dumbbells' },
            { id: 'gym', label: '02. 6-Post Power Cage' },
            { id: 'wallet', label: '03. Heritage Wallet' },
            { id: 'machinery', label: '04. Cable Crossover' },
          ] as { id: PillarStage; label: string }[]
        ).map((item) => (
          <button
            key={item.id}
            onClick={() => selectStage(item.id)}
            className={`px-3.5 py-2 rounded-xl font-mono text-xs transition flex items-center gap-1.5 border ${
              stage === item.id
                ? 'bg-volt text-obsidian border-volt font-bold shadow-volt'
                : 'bg-obsidian/90 backdrop-blur-md text-bone border-white/20 hover:border-volt'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
