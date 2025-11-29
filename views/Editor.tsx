
import React, { useState, useEffect, useRef } from 'react';
import { View, Waypoint } from '../types';
import { useApp } from '../store';

interface EditorProps {
  onNavigate: (view: View) => void;
}

const Editor: React.FC<EditorProps> = ({ onNavigate }) => {
  const { odysseys, activeOdysseyId, updateOdyssey, addWaypoint, updateWaypoint, deleteWaypoint, refinePromptWithAI, theme, toggleTheme } = useApp();
  const [viewMode, setViewMode] = useState<'timeline' | 'constellation'>('timeline');
  const [selectedWaypointId, setSelectedWaypointId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const currentOdyssey = odysseys.find(o => o.id === activeOdysseyId);
  const selectedWaypoint = currentOdyssey?.waypoints.find(w => w.id === selectedWaypointId) || currentOdyssey?.waypoints[currentOdyssey.waypoints.length - 1];

  // Auto-select last waypoint on load
  useEffect(() => {
    if (currentOdyssey && !selectedWaypointId && currentOdyssey.waypoints.length > 0) {
        setSelectedWaypointId(currentOdyssey.waypoints[currentOdyssey.waypoints.length - 1].id);
    }
  }, [currentOdyssey, selectedWaypointId]);

  if (!currentOdyssey) return <div>Loading...</div>;

  const handleAddWaypoint = () => {
    addWaypoint(currentOdyssey.id);
    // Select the new one (will be last)
    setTimeout(() => {
        // Trigger re-render or logic if needed
    }, 100);
  };

  const handleUpdateCurrentWaypoint = (data: Partial<Waypoint>) => {
      if (selectedWaypoint) {
          updateWaypoint(currentOdyssey.id, selectedWaypoint.id, data);
      }
  };

  const handleDelete = () => {
      if (selectedWaypoint && confirm('Are you sure you want to delete this waypoint?')) {
          const index = currentOdyssey.waypoints.findIndex(w => w.id === selectedWaypoint.id);
          deleteWaypoint(currentOdyssey.id, selectedWaypoint.id);
          // Select previous if available
          if (index > 0) {
              setSelectedWaypointId(currentOdyssey.waypoints[index - 1].id);
          } else if (currentOdyssey.waypoints.length > 1) {
               setSelectedWaypointId(currentOdyssey.waypoints[index + 1].id);
          } else {
              setSelectedWaypointId(null);
          }
      }
  };

  const handleRefinePrompt = async () => {
      if (!selectedWaypoint) return;
      setIsGenerating(true);
      const refined = await refinePromptWithAI(selectedWaypoint.prompt);
      handleUpdateCurrentWaypoint({ prompt: refined });
      setIsGenerating(false);
  };

  const handleGenerateImageMock = () => {
      setIsGenerating(true);
      // Simulate API delay
      setTimeout(() => {
          setIsGenerating(false);
          // Just triggers a re-render for visual effect, normally would fetch new URL
      }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-background text-foreground overflow-hidden z-50 flex flex-col">
      {/* Editor Header - Fixed Top Bar with Theme Toggle */}
      <header className="flex-shrink-0 flex h-[60px] items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-xl z-40">
        <div className="flex items-center gap-4">
          <button onClick={() => onNavigate(View.Dashboard)} className="flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground">
            <span className="material-symbols-outlined text-xl">arrow_back</span>
            <span className="hidden sm:inline">Dashboard</span>
          </button>
        </div>
        <div className="flex items-center gap-2 md:gap-4 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <h1 className="font-heading text-base md:text-lg font-bold truncate max-w-[150px] md:max-w-md">{currentOdyssey.title}</h1>
          <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-foreground/80 hidden sm:inline-block">{currentOdyssey.status}</span>
        </div>
        <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-sm text-foreground/60 mr-2 hidden sm:flex">
                <span className="material-symbols-outlined text-base">check_circle</span>
                <span>Saved</span>
            </div>
             <button 
                onClick={toggleTheme}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground/70 transition-colors hover:bg-accent hover:text-foreground"
                title="Toggle Theme"
            >
                <span className="material-symbols-outlined text-lg">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
            </button>
            <button onClick={() => onNavigate(View.Preview)} className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground/70 hover:bg-accent bg-primary/20 text-primary" title="Preview">
                 <span className="material-symbols-outlined text-xl">visibility</span>
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-accent">
                <span className="material-symbols-outlined text-xl">more_horiz</span>
            </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden p-2 md:p-4 pb-0 gap-4">
        {/* Sidebar Waypoint List (Desktop) */}
        <aside className="hidden lg:flex w-[300px] flex-shrink-0 flex-col rounded-xl border border-border bg-card/40 mb-4">
          <div className="flex h-12 flex-shrink-0 items-center justify-between border-b border-border px-4">
            <h2 className="font-heading text-base font-bold">Waypoint List</h2>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg text-foreground/70 hover:bg-accent hover:text-foreground">
              <span className="material-symbols-outlined text-xl">unfold_less</span>
            </button>
          </div>
          <div className="flex-1 space-y-1.5 overflow-y-auto p-2.5">
            {currentOdyssey.waypoints.map((wp, index) => (
                <div 
                    key={wp.id} 
                    onClick={() => setSelectedWaypointId(wp.id)}
                    className={`group cursor-pointer rounded-lg border p-3 transition-colors ${
                        selectedWaypointId === wp.id 
                        ? 'border-primary/70 bg-accent/70' 
                        : 'border-transparent hover:bg-accent/50'
                    }`}
                >
                    <div className="flex justify-between items-center">
                        <p className={`font-medium ${selectedWaypointId === wp.id ? 'text-primary' : ''}`}>{wp.title}</p>
                        <span className="text-xs text-foreground/40">#{index + 1}</span>
                    </div>
                    <p className="truncate text-sm text-foreground/60">{wp.description}</p>
                </div>
            ))}
          </div>
          <div className="flex-shrink-0 border-t border-border p-2.5">
            <button onClick={handleAddWaypoint} className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-secondary/80 text-sm font-medium text-foreground hover:bg-secondary">
              <span className="material-symbols-outlined text-lg">add</span>
              <span>Add waypoint</span>
            </button>
          </div>
        </aside>

        {/* Main Canvas Area */}
        <main className="relative flex-1 rounded-xl overflow-hidden border border-border mb-4 flex flex-col">
            <div className="relative flex-1 bg-dots overflow-hidden">
                {/* View Toggle */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-1 rounded-xl bg-card/70 p-1 shadow-lg backdrop-blur-sm border border-border">
                    <button 
                        onClick={() => setViewMode('timeline')}
                        className={`flex h-9 w-10 items-center justify-center rounded-lg transition-colors ${viewMode === 'timeline' ? 'bg-accent text-primary' : 'text-foreground/70 hover:bg-accent'}`}
                    >
                        <span className="material-symbols-outlined text-lg">view_timeline</span>
                    </button>
                    <button 
                        onClick={() => setViewMode('constellation')}
                        className={`flex h-9 w-10 items-center justify-center rounded-lg transition-colors ${viewMode === 'constellation' ? 'bg-accent text-primary' : 'text-foreground/70 hover:bg-accent'}`}
                    >
                        <span className="material-symbols-outlined text-lg">share_location</span>
                    </button>
                    <button className="flex h-9 w-10 items-center justify-center rounded-lg text-foreground/70 hover:bg-accent" title="Global Search (Cmd+K)">
                         <span className="material-symbols-outlined text-lg">search</span>
                    </button>
                </div>

                {/* Timeline View */}
                {viewMode === 'timeline' && (
                    <div className="absolute inset-0 flex items-center p-10 overflow-x-auto pb-[300px]">
                        <div className="flex items-center gap-24 px-12 min-w-max mx-auto">
                        {currentOdyssey.waypoints.map((wp, i) => (
                            <div key={wp.id} className="group relative flex-shrink-0">
                                <div 
                                    onClick={() => setSelectedWaypointId(wp.id)}
                                    className={`node-glow flex h-[160px] w-[160px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 bg-card p-3 transition shadow-lg ${selectedWaypointId === wp.id ? 'border-primary ring-2 ring-primary/30' : 'border-border hover:border-primary'}`}
                                >
                                    <p className={`font-heading text-sm font-bold ${selectedWaypointId === wp.id ? 'text-primary' : ''}`}>{wp.title}</p>
                                    <div className="mt-2 h-24 w-24 flex-shrink-0 rounded-md bg-accent overflow-hidden relative">
                                        <img alt={wp.title} className="h-full w-full object-cover" src={wp.imageUrl}/>
                                    </div>
                                </div>
                                {/* Connector */}
                                {i < currentOdyssey.waypoints.length - 1 && (
                                    <div className="absolute top-1/2 left-full w-24 h-0.5 bg-border -translate-y-1/2 group-hover:bg-primary/50 transition-colors"></div>
                                )}
                            </div>
                        ))}
                        
                        {/* Add Button in Flow */}
                         <div className="group relative flex-shrink-0">
                             <button onClick={handleAddWaypoint} className="flex h-[160px] w-[60px] items-center justify-center rounded-lg border-2 border-dashed border-border hover:border-primary hover:bg-accent/20 transition-all">
                                 <span className="material-symbols-outlined text-3xl text-foreground/40">add</span>
                             </button>
                         </div>
                        </div>
                    </div>
                )}

                {/* Constellation View (Mock Layout for demo) */}
                {viewMode === 'constellation' && (
                    <div className="absolute inset-0 p-10 overflow-auto pb-[300px]">
                        <div className="flex flex-wrap gap-8 justify-center items-center h-full content-center">
                            {currentOdyssey.waypoints.map((wp) => (
                                <div key={wp.id} onClick={() => setSelectedWaypointId(wp.id)} className={`node-glow flex h-[160px] w-[200px] cursor-pointer flex-col rounded-lg border-2 bg-card p-3 transition ${selectedWaypointId === wp.id ? 'border-primary' : 'border-border'}`}>
                                    <div className="flex w-full items-start justify-between">
                                        <p className="font-heading text-sm font-bold">{wp.title}</p>
                                        <span className="material-symbols-outlined text-lg text-foreground/50">drag_indicator</span>
                                    </div>
                                    <p className="mt-1 flex-1 text-xs text-foreground/70 line-clamp-3">"{wp.prompt}"</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            
            {/* Detail Panel */}
            <div className="h-[320px] w-full flex-shrink-0 border-t border-border bg-background/95 backdrop-blur-xl flex flex-col">
                {selectedWaypoint ? (
                    <>
                    <div className="flex flex-shrink-0 items-center border-b border-border pl-4">
                        <button className="border-b-2 border-primary py-2.5 px-3 text-sm font-medium text-primary">Prompt</button>
                        <button className="border-b-2 border-transparent py-2.5 px-3 text-sm font-medium text-foreground/60 hover:text-foreground">Notes</button>
                        <div className="flex-grow"></div>
                        <input 
                            type="text" 
                            className="bg-transparent border-none text-right mr-4 text-sm font-bold focus:ring-0 text-primary"
                            value={selectedWaypoint.title}
                            onChange={(e) => handleUpdateCurrentWaypoint({ title: e.target.value })}
                        />
                    </div>
                    
                    <div className="flex-1 flex overflow-hidden">
                        {/* Prompt Input Area - Themed background */}
                        <div className="flex-1 p-4 flex flex-col gap-2 relative">
                             <textarea 
                                className="form-textarea h-full w-full resize-none rounded-lg border border-border bg-secondary/50 p-3 font-mono text-sm text-foreground focus:border-primary focus:ring-primary outline-none placeholder:text-foreground/40 hover:bg-secondary/70 transition-colors" 
                                value={selectedWaypoint.prompt}
                                onChange={(e) => handleUpdateCurrentWaypoint({ prompt: e.target.value, wordCount: e.target.value.split(' ').length })}
                                placeholder="Enter your prompt here..."
                             />
                             <div className="absolute bottom-6 right-6 flex gap-2">
                                <button 
                                    onClick={handleRefinePrompt}
                                    disabled={isGenerating}
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-accent hover:bg-primary hover:text-white rounded-md text-xs font-medium transition-colors shadow-sm text-foreground/80"
                                >
                                    <span className={`material-symbols-outlined text-sm ${isGenerating ? 'animate-spin' : ''}`}>auto_awesome</span>
                                    {isGenerating ? 'Refining...' : 'Refine with Gemini'}
                                </button>
                             </div>
                        </div>

                        {/* Image Output Preview */}
                        <div className="w-[300px] border-l border-border p-4 flex flex-col gap-3">
                            <div className="relative aspect-square w-full rounded-lg bg-black/20 overflow-hidden group">
                                {isGenerating ? (
                                     <div className="absolute inset-0 flex items-center justify-center bg-card">
                                        <div className="flex flex-col items-center gap-2">
                                            <span className="material-symbols-outlined animate-spin text-3xl text-primary">progress_activity</span>
                                            <span className="text-xs text-foreground/60">Generating...</span>
                                        </div>
                                     </div>
                                ) : (
                                    <>
                                        <img src={selectedWaypoint.imageUrl} className="w-full h-full object-cover" alt="Output" />
                                        <button 
                                            onClick={handleGenerateImageMock}
                                            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium"
                                        >
                                            <span className="flex items-center gap-2 bg-black/50 px-3 py-2 rounded-full backdrop-blur-md">
                                                <span className="material-symbols-outlined">refresh</span> Regenerate
                                            </span>
                                        </button>
                                    </>
                                )}
                            </div>
                            <div className="text-xs text-foreground/60 flex justify-between">
                                <span>1024x1024</span>
                                <span>v6.0</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex flex-shrink-0 items-center justify-between gap-4 border-t border-border py-2 px-3 bg-card/30">
                        <div className="flex items-center gap-3 text-sm text-foreground/70">
                            <span className="text-xs font-mono">{selectedWaypoint.wordCount || 0} words</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={handleDelete} className="flex h-8 items-center justify-center rounded-lg px-2 text-red-400/80 hover:bg-red-900/40 hover:text-red-400 transition-colors" title="Delete Waypoint">
                                <span className="material-symbols-outlined text-lg">delete</span>
                            </button>
                        </div>
                    </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full text-foreground/40">Select a waypoint to edit</div>
                )}
            </div>
        </main>
      </div>
    </div>
  );
};

export default Editor;
