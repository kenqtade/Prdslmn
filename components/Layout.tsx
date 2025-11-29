
import React from 'react';
import { View } from '../types';
import { useApp } from '../store';

interface SidebarProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
  return (
    <aside className="hidden lg:flex fixed top-0 left-0 bottom-0 z-40 h-full w-[280px] p-4 pr-2 flex-col">
      <div className="flex w-full flex-col rounded-2xl border border-border bg-card/50 p-3 backdrop-blur-xl h-full">
        <div className="flex h-14 items-center gap-3 px-2 cursor-pointer" onClick={() => onNavigate(View.Landing)}>
          <span className="material-symbols-outlined text-3xl text-primary">auto_awesome_mosaic</span>
          <h1 className="font-heading text-xl font-bold">Prompt Odyssey</h1>
        </div>
        <nav className="mt-4 flex flex-1 flex-col justify-between">
          <div className="space-y-1.5">
            <button
              onClick={() => onNavigate(View.Dashboard)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                currentView === View.Dashboard ? 'bg-primary/20 text-primary' : 'text-foreground/70 hover:bg-accent/50 hover:text-foreground'
              }`}
            >
              <span className="material-symbols-outlined text-xl">dashboard</span>Dashboard
            </button>
            <button
              onClick={() => onNavigate(View.Gallery)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                currentView === View.Gallery ? 'bg-primary/20 text-primary' : 'text-foreground/70 hover:bg-accent/50 hover:text-foreground'
              }`}
            >
              <span className="material-symbols-outlined text-xl">explore</span>Explore
            </button>
            <button
               onClick={() => onNavigate(View.Templates)}
               className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                currentView === View.Templates ? 'bg-primary/20 text-primary' : 'text-foreground/70 hover:bg-accent/50 hover:text-foreground'
              }`}
            >
              <span className="material-symbols-outlined text-xl">file_copy</span>Templates
            </button>
             <button
              onClick={() => onNavigate(View.Profile)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                currentView === View.Profile ? 'bg-primary/20 text-primary' : 'text-foreground/70 hover:bg-accent/50 hover:text-foreground'
              }`}
            >
              <span className="material-symbols-outlined text-xl">person</span>Profile
            </button>
          </div>
          
          <div className="flex flex-col justify-end">
            <div className="space-y-4">
              <div>
                <h2 className="mb-2 px-3 text-xs font-semibold uppercase text-foreground/50">Recent</h2>
                <div className="space-y-2">
                  <button onClick={() => onNavigate(View.Editor)} className="flex w-full items-center gap-3 rounded-lg p-2 hover:bg-accent/50 text-left">
                    <img alt="Recent Odyssey 1" className="h-9 w-9 flex-shrink-0 rounded-md object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeZZONGhLxeCCWEoD7mPSVz9UVaWK63FQ2xnDqOa_-urxBCLBgtHuU3pEQJOUSawy6cWhOIt_lKkvWHAoFJaTjQbrk2Wah2Vz7vKJc3fCoFAIbuPEds9BeC-vu-1UpH7BeLRpaqruDdV8SOcU_B_VOIzLuc8ERJCmX5bXT_J0yMUuEvZvAdRCFdytlqHEzjAcgxV7qXo8xQqr9iUZiQhdt35Yvs7zQ3AeF8agkoqKH-WEf2JjAkMqke_hZT3M9ELCBq91V3yqPQos"/>
                    <div className="overflow-hidden">
                      <p className="truncate text-sm font-medium">Fantasy Portraits v12</p>
                      <p className="truncate text-xs text-foreground/60">Updated 2h ago</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export const AppHeader: React.FC<{onNavigate: (view: View) => void}> = ({onNavigate}) => {
  const { theme, toggleTheme, user } = useApp();

  return (
    <header className="fixed top-4 right-4 z-30 h-[70px] lg:left-[280px] left-4 max-w-full">
      <div className="flex h-full w-full items-center justify-between rounded-2xl border border-border bg-card/60 px-6 backdrop-blur-xl shadow-sm">
        <button className="lg:hidden flex h-10 w-10 items-center justify-center rounded-xl hover:bg-accent">
          <span className="material-symbols-outlined text-2xl">menu</span>
        </button>
        <div className="hidden lg:block">
          <h1 className="font-heading text-xl font-bold">Prompt Odyssey</h1>
        </div>
        <div className="flex flex-1 justify-center px-8">
          <div className="w-full max-w-xl">
            <button className="relative w-full text-left group">
              <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xl text-foreground/60">search</span>
              <div className="h-11 w-full rounded-lg border border-border bg-secondary/50 pl-10 pr-4 text-sm flex items-center text-foreground/60 transition-colors group-hover:bg-accent/50">Search (Cmd+K)</div>
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <button 
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-foreground/70 transition-colors hover:bg-accent hover:text-foreground"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
             <span className="material-symbols-outlined text-xl">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-xl text-foreground/70 transition-colors hover:bg-accent hover:text-foreground">
             <span className="material-symbols-outlined text-xl">notifications</span>
          </button>
          <button onClick={() => onNavigate(View.Profile)} className="h-10 w-10 rounded-full border-2 border-transparent transition-all hover:border-primary">
            <img alt="User Avatar" className="h-full w-full rounded-full object-cover" src={user.avatar}/>
          </button>
        </div>
      </div>
    </header>
  );
};

export const MainLayout: React.FC<{children: React.ReactNode, currentView: View, onNavigate: (view: View) => void}> = ({children, currentView, onNavigate}) => {
  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
      <Sidebar currentView={currentView} onNavigate={onNavigate} />
      <div className="flex h-full w-full flex-col lg:pl-[280px]">
        <AppHeader onNavigate={onNavigate} />
        <main className="h-full overflow-y-auto pt-[90px] px-4 pb-4">
            {children}
        </main>
      </div>
    </div>
  );
};
