'use client';

import React, { useState, Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { Calculator, Dumbbell, Flame, Activity } from 'lucide-react';

const COMPETITION_PLATES = [
  { weight: 25, color: '#EF4444', radius: 1.05, thick: 0.16, label: '25kg Red' },
  { weight: 20, color: '#3B82F6', radius: 1.05, thick: 0.14, label: '20kg Blue' },
  { weight: 15, color: '#EAB308', radius: 0.92, thick: 0.13, label: '15kg Yellow' },
  { weight: 10, color: '#22C55E', radius: 0.82, thick: 0.12, label: '10kg Green' },
  { weight: 5, color: '#F4F1EA', radius: 0.65, thick: 0.1, label: '5kg White' },
  { weight: 2.5, color: '#18181B', radius: 0.52, thick: 0.08, label: '2.5kg Black' },
];

function calculatePlatesPerSide(targetKg: number) {
  const barWeight = 20;
  let perSide = Math.max(0, (targetKg - barWeight) / 2);
  const loaded: typeof COMPETITION_PLATES = [];

  for (const plate of COMPETITION_PLATES) {
    while (perSide >= plate.weight && loaded.length < 7) {
      loaded.push(plate);
      perSide -= plate.weight;
    }
  }
  return loaded;
}

function LoadedBarbellAndSilhouette3D({
  totalBarWeight,
  bmiValue,
  mode,
}: {
  totalBarWeight: number;
  bmiValue: number;
  mode: '1rm' | 'bmi';
}) {
  const groupRef = useRef<THREE.Group>(null);
  const platesPerSide = calculatePlatesPerSide(totalBarWeight);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.45;
    }
  });

  const bmiScaleWidth = Math.max(0.75, Math.min(1.5, bmiValue / 22));
  const bmiColor =
    bmiValue < 18.5
      ? '#38BDF8'
      : bmiValue <= 24.9
      ? '#C6FF00'
      : bmiValue <= 29.9
      ? '#F59E0B'
      : '#EF4444';

  return (
    <group ref={groupRef}>
      {mode === '1rm' ? (
        <group>
          {/* 20kg Olympic Barbell Shaft */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.09, 0.09, 3.8, 32]} />
            <meshStandardMaterial color="#e4e4e7" metalness={0.95} roughness={0.14} />
          </mesh>
          {/* Loaded Calibrated Plates on Both Sleeves */}
          {platesPerSide.map((plate, idx) =>
            [-1, 1].map((dir) => (
              <mesh
                key={`${idx}-${dir}`}
                position={[dir * (0.95 + idx * 0.16), 0, 0]}
                rotation={[0, 0, Math.PI / 2]}
              >
                <cylinderGeometry args={[plate.radius, plate.radius, plate.thick, 32]} />
                <meshStandardMaterial
                  color={plate.color}
                  metalness={0.55}
                  roughness={0.3}
                />
              </mesh>
            ))
          )}
        </group>
      ) : (
        /* 3D Biometric Athlete Silhouette / Core */
        <group scale={[bmiScaleWidth, 1, bmiScaleWidth]}>
          {/* Head */}
          <mesh position={[0, 1.25, 0]}>
            <sphereGeometry args={[0.26, 24, 24]} />
            <meshStandardMaterial color={bmiColor} wireframe />
          </mesh>
          {/* Torso */}
          <mesh position={[0, 0.35, 0]}>
            <cylinderGeometry args={[0.48, 0.34, 1.25, 16]} />
            <meshStandardMaterial
              color={bmiColor}
              emissive={bmiColor}
              emissiveIntensity={0.25}
              wireframe
            />
          </mesh>
          {/* Aura Ring */}
          <mesh position={[0, 0.35, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.15, 0.025, 16, 64]} />
            <meshBasicMaterial color={bmiColor} />
          </mesh>
        </group>
      )}
    </group>
  );
}

export default function BarLoader3DCalculator() {
  const [tab, setTab] = useState<'1rm' | 'bmi'>('1rm');

  // 1RM State
  const [liftWeight, setLiftWeight] = useState(140);
  const [liftReps, setLiftReps] = useState(5);

  // BMI & TDEE State
  const [bodyWeightKg, setBodyWeightKg] = useState(78);
  const [heightCm, setHeightCm] = useState(178);
  const [age, setAge] = useState(27);
  const [activityMult, setActivityMult] = useState(1.55);

  // Calculations
  const oneRepMax = Math.round(liftWeight * (1 + liftReps / 30));
  const heightM = heightCm / 100;
  const bmi = Number((bodyWeightKg / (heightM * heightM)).toFixed(1));
  const bmr = Math.round(10 * bodyWeightKg + 6.25 * heightCm - 5 * age + 5);
  const tdee = Math.round(bmr * activityMult);
  const proteinGrams = Math.round(bodyWeightKg * 2.1);

  const loadedPlates = calculatePlatesPerSide(oneRepMax);

  return (
    <div className="rounded-3xl border border-white/10 bg-graphite/90 p-6 lg:p-10 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <span className="font-mono text-xs text-volt uppercase tracking-widest">
            INTERACTIVE 3D PERFORMANCE LAB
          </span>
          <h3 className="font-display text-3xl lg:text-4xl text-bone mt-1">
            1-REP MAX BAR LOADER &amp; 3D BIOMETRIC CALCULATOR
          </h3>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setTab('1rm')}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs flex items-center gap-2 border transition ${
              tab === '1rm'
                ? 'bg-volt text-obsidian border-volt font-bold'
                : 'bg-obsidian text-muted border-white/10 hover:text-bone'
            }`}
          >
            <Dumbbell className="w-4 h-4" /> 1RM &amp; 3D Bar Loader
          </button>
          <button
            onClick={() => setTab('bmi')}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs flex items-center gap-2 border transition ${
              tab === 'bmi'
                ? 'bg-volt text-obsidian border-volt font-bold'
                : 'bg-obsidian text-muted border-white/10 hover:text-bone'
            }`}
          >
            <Activity className="w-4 h-4" /> 3D BMI &amp; Calorie Lab
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Inputs */}
        <div className="lg:col-span-6 space-y-5">
          {tab === '1rm' ? (
            <>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted">Working Weight Lifted (KG)</span>
                  <span className="font-mono font-bold text-volt">{liftWeight} KG</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={300}
                  step={2.5}
                  value={liftWeight}
                  onChange={(e) => setLiftWeight(Number(e.target.value))}
                  className="w-full accent-[#C6FF00] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted">Repetitions Completed</span>
                  <span className="font-mono font-bold text-volt">{liftReps} REPS</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={15}
                  step={1}
                  value={liftReps}
                  onChange={(e) => setLiftReps(Number(e.target.value))}
                  className="w-full accent-[#C6FF00] cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-4 rounded-2xl bg-obsidian border border-volt/30">
                  <span className="font-mono text-[11px] text-muted block">ESTIMATED 1RM</span>
                  <span className="font-mono text-2xl font-bold text-volt">{oneRepMax} kg</span>
                </div>
                <div className="p-4 rounded-2xl bg-obsidian border border-white/10">
                  <span className="font-mono text-[11px] text-muted block">HYPERTROPHY (80%)</span>
                  <span className="font-mono text-2xl font-bold text-bone">
                    {Math.round(oneRepMax * 0.8)} kg
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-obsidian border border-white/10">
                  <span className="font-mono text-[11px] text-muted block">SPEED WORK (70%)</span>
                  <span className="font-mono text-2xl font-bold text-bone">
                    {Math.round(oneRepMax * 0.7)} kg
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-obsidian/70 border border-white/10">
                <p className="font-mono text-xs text-muted uppercase mb-2">
                  Competition Plate Loadout (Per Sleeve + 20kg Bar):
                </p>
                <div className="flex flex-wrap gap-2">
                  {loadedPlates.length === 0 ? (
                    <span className="text-xs text-muted">Empty 20kg Olympic Bar</span>
                  ) : (
                    loadedPlates.map((p, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md text-xs font-mono font-bold text-obsidian"
                        style={{ backgroundColor: p.color, color: p.weight === 2.5 ? '#fff' : '#000' }}
                      >
                        {p.label}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-muted block mb-1.5">
                    WEIGHT (KG)
                  </label>
                  <input
                    type="number"
                    value={bodyWeightKg}
                    onChange={(e) => setBodyWeightKg(Number(e.target.value) || 60)}
                    className="w-full px-4 py-3 rounded-xl bg-obsidian border border-white/15 text-bone font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-muted block mb-1.5">
                    HEIGHT (CM)
                  </label>
                  <input
                    type="number"
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value) || 170)}
                    className="w-full px-4 py-3 rounded-xl bg-obsidian border border-white/15 text-bone font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-muted block mb-1.5">AGE</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value) || 25)}
                    className="w-full px-4 py-3 rounded-xl bg-obsidian border border-white/15 text-bone font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-muted block mb-1.5">
                    TRAINING FREQUENCY
                  </label>
                  <select
                    value={activityMult}
                    onChange={(e) => setActivityMult(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl bg-obsidian border border-white/15 text-bone font-mono text-sm"
                  >
                    <option value={1.375}>Light (1–2 Days/Wk)</option>
                    <option value={1.55}>Moderate (3–5 Days/Wk)</option>
                    <option value={1.725}>Hardcore (6–7 Days/Wk)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-4 rounded-2xl bg-obsidian border border-volt/30">
                  <span className="font-mono text-[11px] text-muted block">BMI INDEX</span>
                  <span className="font-mono text-2xl font-bold text-volt">{bmi}</span>
                </div>
                <div className="p-4 rounded-2xl bg-obsidian border border-ember/30">
                  <span className="font-mono text-[11px] text-muted block">DAILY TDEE</span>
                  <span className="font-mono text-2xl font-bold text-ember">
                    {tdee} kcal
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-obsidian border border-gold/30">
                  <span className="font-mono text-[11px] text-muted block">PROTEIN TARGET</span>
                  <span className="font-mono text-2xl font-bold text-gold">
                    {proteinGrams}g/day
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right 3D Visualizer Canvas */}
        <div className="lg:col-span-6 h-[340px] rounded-2xl border border-white/20 bg-[radial-gradient(ellipse_at_center,_#283044_0%,_#151824_62%,_#0B0C10_100%)] relative overflow-hidden shadow-xl">
          <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-obsidian/90 border border-white/20 font-mono text-xs text-volt">
            {tab === '1rm'
              ? `3D OLYMPIC BAR LOADED: ${oneRepMax} KG`
              : `3D BIOMETRIC SILHOUETTE • BMI ${bmi}`}
          </div>
          <Canvas camera={{ position: [0, 0.5, 4.4], fov: 42 }}>
            <ambientLight intensity={1.8} />
            <hemisphereLight args={['#ffffff', '#475569', 2.4]} />
            <directionalLight position={[4, 6, 5]} intensity={3.5} color="#ffffff" />
            <spotLight position={[4, 5, 4]} intensity={3.0} decay={0} color="#C6FF00" />
            <pointLight position={[-4, -2, 3]} intensity={2.5} decay={0} color="#FF6B2B" />
            <Suspense fallback={null}>
              <LoadedBarbellAndSilhouette3D
                totalBarWeight={oneRepMax}
                bmiValue={bmi}
                mode={tab}
              />
              <ContactShadows position={[0, -1.3, 0]} opacity={0.5} scale={6} blur={2} />
            </Suspense>
            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>
      </div>
    </div>
  );
}
