
import React, { useState } from 'react';
import { View } from '../types';
import { useApp } from '../store';

interface PreviewShareProps {
  onNavigate: (view: View) => void;
}

const PreviewShare: React.FC<PreviewShareProps> = ({ onNavigate }) => {
  const { odysseys, activeOdysseyId, theme, toggleTheme } = useApp();
  const odyssey = odysseys.find(o => o.id === activeOdysseyId);
  const [selectedWaypointId, setSelectedWaypointId] = useState<string | null>(
      odyssey?.waypoints[0]?.id || null
  );
  
  const selectedWaypoint = odyssey?.waypoints.find(w => w.id === selectedWaypointId);

  if (!odyssey) return <div className="p-10 text-center">Odyssey not found.</div>;

  return (
    <div className="relative h-screen w-screen bg-background overflow-hidden text-foreground">
        <div className="absolute inset-0 bg-dots opacity-50"></div>
        {/* Simple Flow SVG */}
        <svg className="absolute inset-0 h-full w-full pointer-events-none" style={{zIndex: 0}}>
             {odyssey.waypoints.map((_, i) => {
                 if (i === odyssey.waypoints.length - 1) return null;
                 const startX = 150 + (i * 230);
                 const startY = i % 2 === 0 ? 170 : 300;
                 const endX = 150 + ((i + 1) * 230);
                 const endY = (i + 1) % 2 === 0 ? 170 : 300;
                 return (
                    <path 
                        key={i}
                        d={`M ${startX} ${startY} C ${startX + 100} ${startY}, ${endX - 100} ${endY}, ${endX} ${endY}`} 
                        fill="none" 
                        stroke="var(--primary)" 
                        strokeWidth="2" 
                        strokeOpacity="0.5" 
                    />
                 )
             })}
        </svg>

        {/* Dynamic Node Positioning Logic */}
        <div className="absolute inset-0 p-16 overflow-auto">
            {odyssey.waypoints.map((wp, i) => {
                const left = 150 + (i * 230);
                const top = i % 2 === 0 ? 170 : 300;
                
                return (
                    <div 
                        key={wp.id}
                        onClick={() => setSelectedWaypointId(wp.id)}
                        className={`absolute h-24 w-24 rounded-2xl border-2 bg-card p-1 cursor-pointer transition-all hover:scale-110 ${selectedWaypointId === wp.id ? 'border-primary ring-4 ring-primary/20 shadow-xl z-10' : 'border-border'}`}
                        style={{left: `${left}px`, top: `${top}px`, transform: 'translate(-50%, -50%)'}}
                    >
                         <img alt={wp.title} className="h-full w-full rounded-xl object-cover" src={wp.imageUrl}/>
                         {i === 0 && <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-bold bg-accent px-2 py-1 rounded text-primary">Start</div>}
                    </div>
                )
            })}
        </div>

        {/* Header - Minimal Top Bar with Theme Toggle */}
        <header className="pointer-events-none absolute top-0 left-0 right-0 z-40 flex h-16 items-start justify-between p-3">
            <div className="pointer-events-auto flex items-center gap-4">
                <button onClick={() => onNavigate(View.Editor)} className="flex h-10 items-center gap-2 rounded-xl bg-card/60 px-4 text-sm font-medium text-foreground/80 shadow-lg backdrop-blur-md hover:bg-accent/80 hover:text-foreground">
                    <span className="material-symbols-outlined text-xl">edit</span>
                    <span>Edit</span>
                </button>
            </div>
            <div className="pointer-events-auto rounded-xl bg-card/60 px-6 py-2 text-center shadow-lg backdrop-blur-md">
                <h1 className="font-heading text-lg font-bold">{odyssey.title}</h1>
            </div>
            <div className="pointer-events-auto flex items-center gap-2 rounded-xl bg-card/60 p-1.5 shadow-lg backdrop-blur-md">
                 <button 
                    onClick={toggleTheme}
                    className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-accent/80"
                     title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                    <span className="material-symbols-outlined text-xl">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-accent/80" title="Global Search (Cmd+K)">
                    <span className="material-symbols-outlined text-xl">search</span>
                </button>
                <button className="flex h-8 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-bold text-background hover:bg-primary/90">
                    <span className="material-symbols-outlined text-base">share</span>
                    <span>Share</span>
                </button>
            </div>
        </header>

        {/* Sidebar Metadata */}
        <aside className="pointer-events-auto absolute top-1/2 right-3 z-20 -translate-y-1/2 rounded-2xl border border-border bg-card/60 p-4 shadow-xl backdrop-blur-xl w-64 hidden lg:block">
            <div className="flex flex-col gap-4">
                <h2 className="font-heading text-lg text-foreground">Metadata</h2>
                <div className="space-y-3">
                    <div>
                        <h3 className="text-sm font-semibold text-foreground/60">Author</h3>
                        <div className="flex items-center gap-2 mt-1">
                             <img src={odyssey.author.avatar} className="w-6 h-6 rounded-full" />
                             <span className="text-sm">{odyssey.author.name}</span>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-foreground/60">Created</h3>
                        <p className="text-foreground/90">{new Date(odyssey.lastUpdated).toLocaleDateString()}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-foreground/60">Tags</h3>
                        <div className="mt-1 flex flex-wrap gap-1.5">
                            {odyssey.tags.map(tag => (
                                <span key={tag} className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-primary">{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </aside>

        {/* Bottom Panel */}
        {selectedWaypoint && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 p-3">
                <div className="pointer-events-auto mx-auto w-full max-w-4xl transform rounded-2xl border border-border bg-background/80 shadow-2xl backdrop-blur-xl transition-transform duration-500">
                    <div className="flex h-[320px] flex-col">
                        <div className="flex flex-shrink-0 items-center justify-between border-b border-border p-4">
                            <div className="flex flex-col">
                                <h2 className="font-heading text-lg text-primary">{selectedWaypoint.title}</h2>
                                <p className="text-sm text-foreground/60">Selected Waypoint</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-foreground/60 font-mono">{selectedWaypoint.wordCount} words</span>
                            </div>
                        </div>
                        <div className="grid flex-1 grid-cols-1 md:grid-cols-3 gap-px overflow-hidden bg-border">
                            <div className="bg-card p-4 md:col-span-2 overflow-auto">
                                <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-foreground/50">Prompt</h3>
                                <p className="text-base text-foreground/90 font-serif leading-relaxed">{selectedWaypoint.prompt}</p>
                                {selectedWaypoint.notes && (
                                    <>
                                        <h3 className="mt-4 mb-2 text-sm font-bold uppercase tracking-wider text-foreground/50">Notes</h3>
                                        <p className="text-sm italic text-foreground/70">{selectedWaypoint.notes}</p>
                                    </>
                                )}
                            </div>
                            <div className="bg-card p-4 hidden md:block">
                                <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-foreground/50">Output</h3>
                                <img alt="Selected waypoint output" className="aspect-square w-full rounded-lg object-cover bg-black/20" src={selectedWaypoint.imageUrl}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default PreviewShare;
