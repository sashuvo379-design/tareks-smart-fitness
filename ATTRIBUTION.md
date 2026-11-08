# 3D Models & Shaders Attribution (`ATTRIBUTION.md`)

All 3D models in **IRONFORGE** are procedurally generated at runtime using **Three.js / React Three Fiber (`@react-three/fiber` & `@react-three/drei`)** with physically based rendering (`MeshStandardMaterial`) to ensure zero third-party copyright restrictions, instant loading without heavy external network bottlenecks, and dynamic parametric customization (live 3D monogram engraving, plate loading, and fold hinges).

| 3D Asset / Scene | Implementation | License |
| --- | --- | --- |
| **Hero Olympic Barbell & Calibrated Plates** | Procedural `THREE.CylinderGeometry` + `THREE.TorusGeometry` in `src/components/three/Hero3DScene.tsx` | MIT / CC0 (In-House Procedural) |
| **3D Gym Sanctuary Architectural Walkthrough** | Procedural 4-Zone Gym Floor (`src/components/three/GymTour3D.tsx`) | MIT / CC0 (In-House Procedural) |
| **3D Hinged Leather Wallet & Live Engraving** | Procedural Hinged Bifold/Slim/Travel Mesh (`src/components/three/Product3DViewer.tsx`) | MIT / CC0 (In-House Procedural) |
| **3D Power Rack, Zero-Gap Bench & StairClimber** | Procedural 11-Gauge CAD Assembly (`src/components/three/Product3DViewer.tsx`) | MIT / CC0 (In-House Procedural) |
| **1RM Plate Loader & Biometric Silhouette** | Procedural Competition Plate Loader (`src/components/three/BarLoader3DCalculator.tsx`) | MIT / CC0 (In-House Procedural) |
