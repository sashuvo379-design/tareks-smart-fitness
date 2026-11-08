'use client';

import React, { useState } from 'react';
import {
  ZoomIn,
  ZoomOut,
  Ruler,
  MapPin,
  Smartphone,
  Sparkles,
  X,
  CheckCircle2,
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface Product3DViewerProps {
  pillar: 'WALLET' | 'MACHINERY';
  modelType: string;
  colorHex: string;
  colorName?: string;
  engravingText?: string;
  productName: string;
  dimensionsText?: string;
  image?: string;
  gallery?: string[];
}

export default function Product3DViewer({
  pillar,
  colorHex,
  colorName,
  engravingText,
  productName,
  dimensionsText = 'Standard Spec',
  image,
  gallery = [],
}: Product3DViewerProps) {
  const defaultImg =
    image ||
    (pillar === 'WALLET'
      ? '/assets/wallets/wallet-01.jpg'
      : '/assets/machinery/machine-01.jpg');

  const photos = gallery.length > 0 ? gallery : [defaultImg];
  const [activePhoto, setActivePhoto] = useState<string>(defaultImg);
  const [zoom, setZoom] = useState<number>(1);
  const [showHotspots, setShowHotspots] = useState(true);
  const [showDimensions, setShowDimensions] = useState(pillar === 'MACHINERY');
  const [isArModalOpen, setIsArModalOpen] = useState(false);

  // Sync activePhoto when product changes
  React.useEffect(() => {
    setActivePhoto(defaultImg);
    setZoom(1);
  }, [defaultImg]);

  return (
    <div className="relative w-full h-[440px] rounded-2xl border border-white/20 bg-obsidian overflow-hidden shadow-2xl group">
      {/* Real High-Resolution Product Photograph */}
      <div className="relative w-full h-full overflow-hidden flex items-center justify-center bg-elevated">
        <img
          src={activePhoto}
          alt={productName}
          style={{ transform: `scale(${zoom})` }}
          className="w-full h-full object-cover transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-obsidian/40 pointer-events-none" />

        {/* Interactive Feature Hotspots Overlaid on Real Photo */}
        {showHotspots && pillar === 'WALLET' && (
          <>
            <div className="absolute top-1/3 left-8 sm:left-14 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-obsidian/90 backdrop-blur-md border border-gold text-xs font-mono text-gold shadow-lg">
              <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
              100% Full-Grain Vegetable-Tanned Hide
            </div>
            <div className="absolute bottom-24 right-8 sm:right-12 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-obsidian/90 backdrop-blur-md border border-volt text-xs font-mono text-volt shadow-lg">
              <span className="w-2 h-2 rounded-full bg-volt animate-ping" />
              13.56 MHz RFID Shielded Core
            </div>
          </>
        )}

        {showHotspots && pillar === 'MACHINERY' && (
          <>
            <div className="absolute top-1/3 left-8 sm:left-14 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-obsidian/90 backdrop-blur-md border border-volt text-xs font-mono text-volt shadow-lg">
              <span className="w-2 h-2 rounded-full bg-volt animate-ping" />
              3x3&quot; 11-Gauge Commercial Structural Steel
            </div>
            <div className="absolute bottom-24 right-8 sm:right-12 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-obsidian/90 backdrop-blur-md border border-ember text-xs font-mono text-ember shadow-lg">
              <span className="w-2 h-2 rounded-full bg-ember animate-ping" />
              Heavy-Duty Club Rated Bearings &amp; Hardware
            </div>
          </>
        )}

        {/* Live Gold-Foil Engraving Preview Badge on Real Wallet Photo */}
        {pillar === 'WALLET' && engravingText && engravingText.trim().length > 0 && (
          <div className="absolute bottom-16 left-6 z-20 px-4 py-2 rounded-xl bg-obsidian/95 border-2 border-gold shadow-gold flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-gold" />
            <div>
              <span className="text-[10px] font-mono text-muted uppercase block">
                Gold-Foil Monogram Preview
              </span>
              <span className="font-mono font-bold text-sm tracking-widest text-gold uppercase">
                {engravingText}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Top Studio Controls Toolbar */}
      <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setZoom((z) => (z >= 1.6 ? 1 : Number((z + 0.3).toFixed(1))))}
            className="px-3 py-1.5 rounded-lg bg-obsidian/90 border border-white/20 hover:border-volt text-bone font-mono text-xs flex items-center gap-1.5 transition shadow-md"
          >
            {zoom > 1 ? <ZoomOut className="w-3.5 h-3.5 text-volt" /> : <ZoomIn className="w-3.5 h-3.5 text-volt" />}
            Zoom ({zoom}x)
          </button>

          <button
            onClick={() => setShowHotspots(!showHotspots)}
            className={`px-3 py-1.5 rounded-lg font-mono text-xs flex items-center gap-1.5 border transition shadow-md ${
              showHotspots
                ? 'bg-gold text-obsidian border-gold font-bold'
                : 'bg-obsidian/90 border-white/20 text-bone hover:border-gold'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" /> Specs Callout
          </button>

          <button
            onClick={() => setShowDimensions(!showDimensions)}
            className={`px-3 py-1.5 rounded-lg font-mono text-xs flex items-center gap-1.5 border transition shadow-md ${
              showDimensions
                ? 'bg-ember text-obsidian border-ember font-bold'
                : 'bg-obsidian/90 border-white/20 text-bone hover:border-ember'
            }`}
          >
            <Ruler className="w-3.5 h-3.5" /> Dimensions
          </button>
        </div>

        <button
          onClick={() => setIsArModalOpen(true)}
          className="px-3 py-1.5 rounded-lg bg-obsidian/90 border border-white/25 hover:border-volt text-bone font-mono text-xs flex items-center gap-1.5 transition shadow-md"
        >
          <Smartphone className="w-3.5 h-3.5 text-volt" /> QR Mobile Preview
        </button>
      </div>

      {/* Dimension Overlay HUD */}
      {showDimensions && (
        <div className="absolute bottom-14 left-4 z-20 px-3.5 py-2 rounded-xl bg-obsidian/95 border border-ember text-xs font-mono text-ember shadow-lg">
          DIMENSIONS: {dimensionsText}
        </div>
      )}

      {/* Bottom Bar: Selected Finish & Thumbnail Switcher */}
      <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-obsidian/90 border border-white/20 font-mono text-xs text-bone">
          <span
            className="w-3.5 h-3.5 rounded-full border border-white/40"
            style={{ backgroundColor: colorHex }}
          />
          <span>{colorName || 'Selected Finish'}</span>
          <CheckCircle2 className="w-3.5 h-3.5 text-volt" />
        </div>

        {photos.length > 1 && (
          <div className="flex items-center gap-2">
            {photos.map((imgUrl, idx) => (
              <button
                key={idx}
                onClick={() => setActivePhoto(imgUrl)}
                className={`w-12 h-9 rounded-lg overflow-hidden border-2 transition ${
                  activePhoto === imgUrl ? 'border-volt scale-105' : 'border-white/20 opacity-75 hover:opacity-100'
                }`}
              >
                <img src={imgUrl} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* QR Space Modal */}
      {isArModalOpen && (
        <div className="absolute inset-0 z-30 bg-obsidian/95 backdrop-blur-md p-6 flex flex-col items-center justify-center text-center">
          <button
            onClick={() => setIsArModalOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-elevated text-bone hover:text-volt"
          >
            <X className="w-4 h-4" />
          </button>
          <span className="px-3 py-1 rounded-full bg-volt/20 text-volt font-mono text-xs mb-3">
            MOBILE QUICK VIEW
          </span>
          <h4 className="font-display text-2xl text-bone mb-2">
            Inspect {productName} on Mobile
          </h4>
          <p className="text-xs text-muted max-w-sm mb-4">
            Scan with your phone camera to open high-resolution product specs and dimensions on your mobile device.
          </p>
          <div className="p-4 rounded-2xl bg-white">
            <QRCodeSVG
              value={`https://tareksmartgym.com/product/${encodeURIComponent(productName)}`}
              size={140}
            />
          </div>
          <p className="font-mono text-[11px] text-gold mt-3">
            Dimensions: {dimensionsText}
          </p>
        </div>
      )}
    </div>
  );
}
