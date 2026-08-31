"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { 
  OrbitControls, 
  Environment, 
  Html, 
  ContactShadows,
  Text,
  Float,
  Edges
} from "@react-three/drei"
import * as THREE from "three"
import { ChevronDown, Map, Compass, Crosshair, Gamepad2 } from "lucide-react"

// --- TYPES & SHARED COMPONENTS ---

type ViewMode = "building" | "hall1" | "hall2" | "gamezone"

const VIEW_OPTIONS = [
  { id: "building", label: "Full Building", icon: Map, desc: "Sollertia: Engineering & IT Complex" },
  { id: "hall1", label: "ATiT Hall 1", icon: Compass, desc: "Smart Farm & Mini Projects" },
  { id: "hall2", label: "ATiT Hall 2", icon: Crosshair, desc: "Main Project Showcase" },
  { id: "gamezone", label: "Game Zone", icon: Gamepad2, desc: "Esports & Interactive Tech" },
] as const

// A single block/room/table on a floor
function Room({ position, size, name, color, isHighlighted = false, onClick, transparent = false }: any) {
  const [hovered, setHover] = useState(false)

  // Use a slight glowing effect if it's highlighted
  const materialColor = isHighlighted ? (hovered ? "#06b6d4" : "#10b981") : (hovered ? "#666" : color)

  return (
    <group position={position}>
      <mesh 
        onPointerOver={(e) => { e.stopPropagation(); setHover(true); }}
        onPointerOut={(e) => { e.stopPropagation(); setHover(false); }}
        onClick={(e) => { e.stopPropagation(); onClick && onClick(); }}
        castShadow
        receiveShadow
        position={[0, size[1] / 2, 0]} // elevate so base is at y=0 of the floor
      >
        <boxGeometry args={size} />
        <meshStandardMaterial 
          color={materialColor} 
          roughness={0.2} 
          metalness={0.8}
          emissive={isHighlighted ? "#10b981" : "#000000"}
          emissiveIntensity={isHighlighted ? (hovered ? 0.8 : 0.4) : 0}
          transparent={transparent || isHighlighted}
          opacity={transparent ? 0.4 : (isHighlighted ? 0.9 : 1)}
        />
        <Edges scale={1} threshold={15} color={isHighlighted ? "#06b6d4" : (transparent ? "#333" : "#444")} />
      </mesh>
      
      {/* Name Label for Highlighted / Hovered */}
      {(hovered || isHighlighted) && name && (
        <Html position={[0, size[1] + 1, 0]} center distanceFactor={25} zIndexRange={[100, 0]}>
          <div className={`px-2 py-1 rounded text-xs font-bold whitespace-nowrap backdrop-blur-md border transition-all pointer-events-none ${
            isHighlighted 
              ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.5)] scale-110" 
              : "bg-black/80 text-white border-white/20"
          } ${hovered ? "scale-110" : ""}`}>
            {name}
            {isHighlighted && onClick && <div className="text-[9px] text-emerald-400 font-normal m-0 p-0 leading-none mt-0.5">Click for details</div>}
          </div>
        </Html>
      )}

      {/* Floating Sparkle for Highlighted Room */}
      {isHighlighted && onClick && (
        <Float speed={3} rotationIntensity={0.5} floatIntensity={1.5}>
          <mesh position={[0, size[1] + 2, 0]}>
            <octahedronGeometry args={[0.4, 0]} />
            <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={2} />
          </mesh>
        </Float>
      )}
    </group>
  )
}

function FloorLayer({ level, label, yOffset, children, width = 40, depth = 12 }: any) {
  return (
    <group position={[0, yOffset, 0]}>
      {/* Floor Slab */}
      <mesh receiveShadow castShadow position={[0, -0.25, 0]}>
        <boxGeometry args={[width, 0.5, depth]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        <Edges scale={1} threshold={15} color="#333" />
      </mesh>

      {/* Floor Label */}
      <Text 
        position={[-((width/2) + 1), 0, 0]} 
        rotation={[-Math.PI / 2, 0, Math.PI / 2]} 
        fontSize={1.5} 
        color="#888" 
        anchorX="center" 
        anchorY="middle"
      >
        {label}
      </Text>

      {children}
    </group>
  )
}

function EntranceDoor({ position, rotation = [0, 0, 0], width = 3 }: any) {
  const doorWidth = width / 2;
  const height = 3.5;
  const thickness = 0.2;

  return (
    <group position={position} rotation={rotation as any}>
      {/* Left Frame */}
      <mesh position={[-width/2 - thickness/2, height/2, 0]} castShadow>
        <boxGeometry args={[thickness, height, thickness]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      
      {/* Right Frame */}
      <mesh position={[width/2 + thickness/2, height/2, 0]} castShadow>
        <boxGeometry args={[thickness, height, thickness]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      
      {/* Top Frame */}
      <mesh position={[0, height + thickness/2, 0]} castShadow>
        <boxGeometry args={[width + thickness*2, thickness, thickness]} />
        <meshStandardMaterial color="#333" />
      </mesh>

      {/* Left Glass Door (Opened inwards) */}
      <group position={[-width/2, 0, 0]} rotation={[0, Math.PI / 3, 0]}>
         <mesh position={[doorWidth/2, height/2, 0]} castShadow>
           <boxGeometry args={[doorWidth, height, 0.1]} />
           <meshStandardMaterial color="#ef4444" transparent opacity={0.6} roughness={0.1} />
           <Edges scale={1} threshold={15} color="#faa" />
         </mesh>
      </group>

      {/* Right Glass Door (Opened inwards) */}
      <group position={[width/2, 0, 0]} rotation={[0, -Math.PI / 3, 0]}>
         <mesh position={[-doorWidth/2, height/2, 0]} castShadow>
           <boxGeometry args={[doorWidth, height, 0.1]} />
           <meshStandardMaterial color="#ef4444" transparent opacity={0.6} roughness={0.1} />
           <Edges scale={1} threshold={15} color="#faa" />
         </mesh>
      </group>

      {/* Floating Entrance Sign */}
      <Text position={[0, height + 1, 0]} fontSize={0.8} color="#ef4444" anchorX="center" anchorY="bottom" outlineWidth={0.02} outlineColor="#000">
        ENTRANCE
      </Text>
      
      {/* Glowing Floor Welcome Mat */}
      <mesh position={[0, 0.05, 1]} rotation={[-Math.PI/2, 0, 0]}>
        <planeGeometry args={[width, 3]} />
        <meshBasicMaterial color="#ef4444" transparent opacity={0.15} />
      </mesh>
    </group>
  )
}

// --- SPECIFIC VIEWS ---

// 1. Full Building Model
function BuildingModel({ onStallSelect }: { onStallSelect: (stall: string) => void }) {
  const groupRef = useRef<THREE.Group>(null)

  // Gentle idle rotation to show off the 3D isometric structure
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.15
    }
  })

  const floorSpacing = 5

  return (
    <group rotation={[0, -Math.PI / 6, 0]}>
      <group ref={groupRef} position={[0, -10, 0]}>
        
        {/* Ground Floor */}
        <FloorLayer level={0} label="Ground Floor" yOffset={0 * floorSpacing}>
          <Room position={[0, 0, 0]} size={[38, 2, 10]} name="Ground Floor" color="#222" transparent />
        </FloorLayer>

        {/* 1st Floor */}
        <FloorLayer level={1} label="1st Floor" yOffset={1 * floorSpacing}>
          <Room position={[0, 0, 0]} size={[38, 2, 10]} name="1st Floor" color="#222" transparent />
        </FloorLayer>

        {/* 2nd Floor */}
        <FloorLayer level={2} label="2nd Floor" yOffset={2 * floorSpacing}>
          <Room position={[0, 0, 0]} size={[38, 2, 10]} name="2nd Floor" color="#222" transparent />
        </FloorLayer>

        {/* 3rd Floor */}
        <FloorLayer level={3} label="3rd Floor" yOffset={3 * floorSpacing}>
          <Room position={[-13, 0, 0]} size={[12, 2, 10]} name="3rd Floor Entrance" color="#333" onClick={() => onStallSelect("3rd Floor Entrance")} />
          <Room position={[-2, 0, 0]} size={[8, 3, 10]} name="ATiT Hall 1" color="#10b981" isHighlighted onClick={() => onStallSelect("ATiT Hall 1 (Smart Farm & Mini Projects)")} />
          <Room position={[6, 0, 0]} size={[6, 2, 10]} name="" color="#2a2a2a" transparent />
          <Room position={[14.5, 0, 0]} size={[9, 3, 10]} name="ATiT Hall 2" color="#10b981" isHighlighted onClick={() => onStallSelect("ATiT Hall 2 (Main Showcase)")} />
        </FloorLayer>

        {/* 4th Floor */}
        <FloorLayer level={4} label="4th Floor" yOffset={4 * floorSpacing}>
          <Room position={[-14, 0, 0]} size={[10, 3, 10]} name="Game Zone" color="#10b981" isHighlighted onClick={() => onStallSelect("Game Zone")} />
          <Room position={[-5, 0, 0]} size={[6, 2, 10]} name="Entrance" color="#333" onClick={() => onStallSelect("4th Floor Entrance")} />
          <Room position={[8.5, 0, 0]} size={[21, 2, 10]} name="4th Floor General Area" color="#222" transparent />
        </FloorLayer>
        
        {/* 5th Floor roof/cap */}
        <FloorLayer level={5} label="5th Floor" yOffset={5 * floorSpacing}>
          <Room position={[0, 0, 0]} size={[38, 2, 10]} name="5th Floor (Roof)" color="#222" transparent />
        </FloorLayer>
        
      </group>
    </group>
  )
}

// 2. Hall 1 Model
function Hall1Model() {
  return (
    <group position={[0, 0, 0]}>
      <FloorLayer level={1} label="Hall 1: Smart Farm & Mini Projects" yOffset={0} width={24} depth={36}>
        
        {/* Outer Walls */}
        <Room position={[0, 0, -17.5]} size={[24, 4, 1]} color="#111" /> {/* Top wall */}
        <Room position={[0, 0, 17.5]} size={[24, 4, 1]} color="#111" /> {/* Bottom wall */}
        <Room position={[-11.5, 0, 0]} size={[1, 4, 34]} color="#111" /> {/* Left wall */}
        <Room position={[11.5, 0, 0]} size={[1, 4, 34]} color="#111" /> {/* Right wall */}

        {/* --- Top Section: Smart Farm --- */}
        <group position={[0, 0, -10]}>
          <Text position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} fontSize={2} color="#ffffff" fillOpacity={0.3} anchorX="center" anchorY="middle">
            SMART FARM
          </Text>
          {/* Back Stalls */}
          <Room position={[-8, 0, -4]} size={[4, 3, 3]} name="Stall A" color="#10b981" isHighlighted />
          <Room position={[0, 0, -5]} size={[10, 3, 3]} name="Main Display" color="#10b981" isHighlighted />
          <Room position={[8, 0, -4]} size={[4, 3, 3]} name="Stall B" color="#10b981" isHighlighted />
        </group>

        {/* --- Bottom Section: Mini Projects --- */}
        <group position={[0, 0, 6]}>
          <Text position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} fontSize={2} color="#ffffff" fillOpacity={0.3} anchorX="center" anchorY="middle">
            MINI PROJECTS
          </Text>
          {/* Side Tables */}
          <Room position={[-8, 0, 4]} size={[3, 2.5, 9]} name="Table 1" color="#10b981" isHighlighted />
          <Room position={[8, 0, 4]} size={[3, 2.5, 9]} name="Table 2" color="#10b981" isHighlighted />
        </group>

        {/* Entrance (Bottom Center) */}
        <EntranceDoor position={[0, 0, 17.4]} />
        
      </FloorLayer>
    </group>
  )
}

// 3. Hall 2 Model
function Hall2Model() {
  return (
    <group position={[0, 0, 0]}>
      <FloorLayer level={1} label="Hall 2: Main Showcase" yOffset={0} width={40} depth={28}>
        
        {/* Outer Walls */}
        <Room position={[0, 0, -13.5]} size={[40, 4, 1]} color="#111" /> {/* Top wall */}
        <Room position={[0, 0, 13.5]} size={[40, 4, 1]} color="#111" /> {/* Bottom wall */}
        <Room position={[-19.5, 0, 0]} size={[1, 4, 26]} color="#111" /> {/* Left wall */}
        <Room position={[19.5, 0, 0]} size={[1, 4, 26]} color="#111" /> {/* Right wall */}

        {/* Inner Stalls Top & Left */}
        <Room position={[-16, 0, -1]} size={[4, 3, 18]} name="Left Stalls" color="#10b981" isHighlighted />
        <Room position={[-2, 0, -10]} size={[20, 3, 4]} name="Top Stalls" color="#10b981" isHighlighted />
        <Room position={[15, 0, 1]} size={[4, 3, 20]} name="Right Stalls" color="#10b981" isHighlighted />

        {/* Center Floating Stall */}
        <Room position={[0, 0, -1]} size={[4, 3, 4]} name="Center Showcase" color="#10b981" isHighlighted />

        {/* Bottom Floating Stalls */}
        <Room position={[2, 0, 9]} size={[16, 3, 4]} name="Bottom Stalls" color="#10b981" isHighlighted />

        {/* Photo BACK */}
        <group position={[19.5, 0, 14.5]}>
          <Text position={[0, 0.1, 3]} rotation={[-Math.PI / 2, 0, 0]} fontSize={1.5} color="#ffffff" fillOpacity={0.5} anchorX="right" anchorY="top">
            Photo BACK
          </Text>
          <Room position={[0, 0, 5]} size={[1, 4, 8]} color="#06b6d4" name="Photo Booth" />
        </group>

        {/* Entrances */}
        {/* Double Entrance on bottom left-ish */}
        <EntranceDoor position={[-15, 0, 13.4]} width={5} />
        {/* Door opening on far right bottom */}
        <EntranceDoor position={[19.5, 0, 10]} rotation={[0, -Math.PI / 2, 0]} width={2.5} />

      </FloorLayer>
    </group>
  )
}

// 4. Game Zone Model
function GameZoneModel() {
  return (
    <group position={[0, 0, 0]}>
      <FloorLayer level={1} label="Game Zone" yOffset={0} width={30} depth={20}>
        
        {/* Outer Walls */}
        <Room position={[0, 0, -9.5]} size={[30, 4, 1]} color="#111" /> {/* Top wall */}
        <Room position={[0, 0, 9.5]} size={[30, 4, 1]} color="#111" /> {/* Bottom wall */}
        <Room position={[-14.5, 0, 0]} size={[1, 4, 18]} color="#111" /> {/* Left wall */}
        <Room position={[14.5, 0, 0]} size={[1, 4, 18]} color="#111" /> {/* Right wall */}

        {/* Top left: Esports Arena */}
        <group position={[-7, 0, -5]}>
          <Text position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} fontSize={1.5} color="#ffffff" fillOpacity={0.3} anchorX="center" anchorY="middle">
            ESPORTS ARENA
          </Text>
          <Room position={[0, 0, -2]} size={[10, 2, 2]} name="Player Desks" color="#06b6d4" isHighlighted />
          <Room position={[0, 0, 2]} size={[8, 3, 1]} name="Casters/Screens" color="#333" />
        </group>

        {/* Top right: Motion MK */}
        <group position={[7, 0, -5]}>
          <Text position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} fontSize={1.5} color="#ffffff" fillOpacity={0.3} anchorX="center" anchorY="middle">
            MOTION DETECT
          </Text>
          <Room position={[0, 0, -2]} size={[8, 3, 2]} name="Motion Screen" color="#10b981" isHighlighted />
          {/* Player standing spots */}
          <Room position={[-2, 0, 2]} size={[2, 0.1, 2]} color="#ef4444" />
          <Room position={[2, 0, 2]} size={[2, 0.1, 2]} color="#ef4444" />
        </group>

        {/* Bottom left: Retro Arcade */}
        <group position={[-7, 0, 5]}>
          <Text position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} fontSize={1.5} color="#ffffff" fillOpacity={0.3} anchorX="center" anchorY="middle">
            RETRO ARCADE
          </Text>
          <Room position={[-2, 0, 2]} size={[2, 3.5, 2]} name="Arcade 1" color="#8b5cf6" isHighlighted />
          <Room position={[2, 0, 2]} size={[2, 3.5, 2]} name="Arcade 2" color="#8b5cf6" isHighlighted />
        </group>

        {/* Bottom right: Tech Quiz */}
        <group position={[7, 0, 5]}>
          <Text position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} fontSize={1.5} color="#ffffff" fillOpacity={0.3} anchorX="center" anchorY="middle">
            TECH QUIZ
          </Text>
          <Room position={[0, 0, 2]} size={[8, 3, 2]} name="Quiz Desks" color="#f59e0b" isHighlighted />
        </group>

        {/* Entrance */}
        <EntranceDoor position={[0, 0, 9.4]} width={4} />

      </FloorLayer>
    </group>
  )
}

// Camera Helper to reset view when mode changes
function CameraController({ viewMode }: { viewMode: ViewMode }) {
  const { camera } = useThree()
  
  useEffect(() => {
    if (viewMode === "building") {
      camera.position.set(0, 30, 60)
    } else if (viewMode === "hall1") {
      camera.position.set(0, 30, 25)
    } else if (viewMode === "hall2") {
      camera.position.set(0, 40, 30)
    } else if (viewMode === "gamezone") {
      camera.position.set(0, 35, 20)
    }
    camera.lookAt(0, 0, 0)
  }, [viewMode, camera])
  
  return null
}

// --- MAIN WRAPPER COMPONENT ---

export function ExtruFloorPlan() {
  const [viewMode, setViewMode] = useState<ViewMode>("building")
  const [selectedStall, setSelectedStall] = useState<string | null>(null)
  const [isMapReady, setIsMapReady] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const activeOption = VIEW_OPTIONS.find(o => o.id === viewMode)!
  const ActiveIcon = activeOption.icon

  // Clear selected stall when switching views
  useEffect(() => {
    setSelectedStall(null)
  }, [viewMode])

  return (
    <section className="py-24 px-6 relative z-10 w-full overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-blue-400 mb-4 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 backdrop-blur-sm">
            Location Data
          </span>
          <h2 className="text-4xl font-bold text-foreground tracking-tight mb-2">
            Sollertia Complex Map
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
            Explore {activeOption.label}. Select a view below to dive into the individual hall details and project layouts.
          </p>
        </motion.div>

        {/* Custom Dropdown Selector */}
        <div className="max-w-xs mx-auto mb-8 relative z-30">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between bg-card/80 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-lg hover:bg-card/90 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <ActiveIcon className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-xs text-muted-foreground leading-none mb-1">Current View</div>
                <div className="text-sm font-bold leading-none">{activeOption.label}</div>
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 w-full mt-2 bg-card/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden py-2"
              >
                {VIEW_OPTIONS.map((option) => {
                  const Icon = option.icon
                  const isActive = viewMode === option.id
                  return (
                    <button
                      key={option.id}
                      onClick={() => {
                        setViewMode(option.id as ViewMode)
                        setIsDropdownOpen(false)
                      }}
                      className={`w-full flex items-start gap-3 p-3 text-left transition-colors ${
                        isActive ? "bg-emerald-500/10" : "hover:bg-white/5"
                      }`}
                    >
                      <div className={`mt-0.5 w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${
                        isActive ? "bg-emerald-500 text-white" : "bg-muted text-muted-foreground"
                      }`}>
                        <Icon className="w-3 h-3" />
                      </div>
                      <div>
                        <div className={`text-sm font-bold ${isActive ? "text-emerald-400" : "text-foreground"}`}>
                          {option.label}
                        </div>
                        <div className="text-[10px] text-muted-foreground leading-tight mt-0.5">
                          {option.desc}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full aspect-[4/3] md:aspect-[21/9] rounded-3xl border border-white/10 bg-black/50 overflow-hidden relative shadow-2xl flex flex-col"
        >
          {/* Overlay UI: Selected Stall Info */}
          <div className="absolute top-4 left-4 z-10 pointer-events-none">
            <AnimatePresence mode="wait">
              {selectedStall ? (
                <motion.div 
                  key="selected"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-black/80 backdrop-blur-md border border-white/10 rounded-xl max-w-sm overflow-hidden shadow-2xl pointer-events-auto p-4"
                >
                  <div className="text-xs text-blue-400 font-bold uppercase tracking-wider mb-1">Selected Zone</div>
                  <div className="text-lg font-bold text-white leading-tight">{selectedStall}</div>
                  <button 
                    onClick={() => setSelectedStall(null)}
                    className="mt-3 text-xs text-muted-foreground hover:text-white transition-colors underline"
                  >
                    Clear Selection
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  key="explore"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-2xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                      <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping absolute" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500 relative" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">Interactive View</div>
                      <div className="text-[10px] text-muted-foreground">Click on any green zone to view details</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="absolute bottom-4 right-4 z-10 pointer-events-none flex gap-2">
             <div className="bg-black/80 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-lg text-xs font-medium text-white shadow-lg pointer-events-auto flex items-center gap-2">
                <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px]">Drag</kbd> Rotate
             </div>
             <div className="bg-black/80 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-lg text-xs font-medium text-white shadow-lg pointer-events-auto flex items-center gap-2">
                <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px]">Scroll</kbd> Zoom
             </div>
          </div>

          {/* 3D Canvas */}
          <div className="flex-1 w-full h-full relative cursor-grab active:cursor-grabbing" data-lenis-prevent="true">
            <Canvas shadows onCreated={() => setIsMapReady(true)}>
              <CameraController viewMode={viewMode} />
              
              <OrbitControls 
                makeDefault 
                minPolarAngle={0} 
                maxPolarAngle={Math.PI / 2.2} 
                minDistance={10} 
                maxDistance={120}
                autoRotate={viewMode === "building"}
                autoRotateSpeed={0.5}
              />
              
              <Environment preset="city" />
              <ambientLight intensity={0.6} />
              <directionalLight position={[20, 30, 20]} intensity={1.5} castShadow shadow-mapSize={[2048, 2048]} />
              <pointLight position={[-10, 20, -10]} intensity={0.5} color="#06b6d4" />

              <group key={viewMode}>
                {viewMode === "building" && <BuildingModel onStallSelect={setSelectedStall} />}
                {viewMode === "hall1" && <Hall1Model />}
                {viewMode === "hall2" && <Hall2Model />}
                {viewMode === "gamezone" && <GameZoneModel />}
              </group>

              <ContactShadows position={[0, -10.5, 0]} opacity={0.6} scale={100} blur={2.5} far={20} />
            </Canvas>

            {/* Loading State */}
            {!isMapReady && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-20">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-8 h-8 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
                  <span className="text-sm font-medium text-muted-foreground">Loading 3D Models...</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
