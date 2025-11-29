
import React, { useState } from 'react';
import { View } from '../types';
import { useApp } from '../store';

interface DashboardProps {
    onNavigate: (view: View) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { odysseys, setActiveOdyssey, createOdyssey, user } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const handleOpenOdyssey = (id: string) => {
      setActiveOdyssey(id);
      onNavigate(View.Editor);
  };

  const filteredOdysseys = odysseys.filter(o => 
      o.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      o.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getRelativeTime = (timestamp: number) => {
      const diff = Date.now() - timestamp;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      if (hours < 1) return 'Just now';
      if (hours < 24) return `${hours}h ago`;
      const days = Math.floor(hours / 24);
      return `${days}d ago`;
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-12 gap-4">
        {/* Featured Card */}
        {odysseys.length > 0 && (
            <div className="col-span-12">
            <section className="h-[350px] w-full cursor-pointer" onClick={() => handleOpenOdyssey(odysseys[0].id)}>
                <div className="group relative h-full w-full overflow-hidden rounded-2xl shadow-lg border border-border">
                <img alt="Featured Odyssey" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" src={odysseys[0].coverImage} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h2 className="font-heading text-3xl font-bold">{odysseys[0].title}</h2>
                    <p className="mt-2 max-w-lg text-white/80">{odysseys[0].description}</p>
                </div>
                </div>
            </section>
            </div>
        )}

        {/* Welcome Section */}
        <div className="col-span-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="font-heading text-2xl font-bold">Welcome back, {user.name.split(' ')[0]}</h2>
              <div className="flex items-center gap-4 text-sm text-foreground/70">
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500"></span>
                  </span>
                  <span>Online</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base text-amber-400">local_fire_department</span>
                  <span>7-day streak</span>
                </div>
              </div>
            </div>
            
             {/* Mobile/Tablet Search */}
             <div className="hidden md:flex lg:hidden relative">
                <input 
                    type="text" 
                    placeholder="Search..." 
                    className="pl-9 pr-4 py-2 rounded-lg bg-card border border-border text-sm w-48 focus:w-64 transition-all text-foreground placeholder:text-foreground/40"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-foreground/50 text-lg">search</span>
             </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="col-span-12 lg:col-span-3">
          <div className="col-span-12 rounded-2xl border border-border bg-card/50 p-4">
            <h3 className="mb-4 font-heading text-lg font-bold">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-accent">
                  <span className="material-symbols-outlined text-primary text-xl">edit</span>
                </div>
                <div>
                  <p className="text-sm">You edited <span className="font-semibold text-primary">Fantasy Portraits v12</span></p>
                  <p className="text-xs text-foreground/60">2 hours ago</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-accent">
                  <span className="material-symbols-outlined text-primary text-xl">add_circle</span>
                </div>
                <div>
                  <p className="text-sm">You created <span className="font-semibold text-primary">Sci-Fi Cityscapes</span></p>
                  <p className="text-xs text-foreground/60">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Odyssey Grid */}
        <div className="col-span-12 lg:col-span-9">
            {filteredOdysseys.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-border rounded-xl">
                    <p className="text-foreground/60 mb-4">No Odysseys found.</p>
                    <button 
                        onClick={() => createOdyssey()} 
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
                    >
                        Create New Odyssey
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                    {filteredOdysseys.map((odyssey) => (
                        <div key={odyssey.id} onClick={() => handleOpenOdyssey(odyssey.id)} className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-md transition-shadow hover:shadow-xl cursor-pointer">
                            <div className="relative h-48 w-full overflow-hidden">
                                <img alt={odyssey.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" src={odyssey.coverImage}/>
                                <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                                    {odyssey.status}
                                </div>
                            </div>
                            <div className="flex flex-1 flex-col p-4">
                                <h4 className="font-heading text-base font-bold truncate">{odyssey.title}</h4>
                                <p className="mt-1 flex-1 text-sm text-foreground/70 line-clamp-2">{odyssey.description}</p>
                                <div className="mt-3 flex items-center justify-between text-xs text-foreground/60">
                                <span>{odyssey.waypoints.length} Waypoints</span>
                                <span>{getRelativeTime(odyssey.lastUpdated)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
      </div>
      
      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="group relative flex flex-col items-end gap-2">
            <div className="flex w-max origin-bottom-right scale-95 transform-gpu flex-col items-end gap-2 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 invisible group-hover:visible">
                <button className="flex items-center gap-2 rounded-xl bg-card/90 px-4 py-2 text-sm text-foreground shadow-lg backdrop-blur-md hover:bg-accent border border-border">
                    <span>Import Odyssey</span>
                    <span className="material-symbols-outlined text-lg">upload</span>
                </button>
                <button onClick={() => onNavigate(View.Templates)} className="flex items-center gap-2 rounded-xl bg-card/90 px-4 py-2 text-sm text-foreground shadow-lg backdrop-blur-md hover:bg-accent border border-border">
                    <span>New from Template</span>
                    <span className="material-symbols-outlined text-lg">file_copy</span>
                </button>
            </div>
            <button onClick={() => createOdyssey()} className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-background shadow-xl transition-transform duration-200 hover:bg-primary/90 group-hover:rotate-45">
                <span className="material-symbols-outlined text-3xl">add</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
