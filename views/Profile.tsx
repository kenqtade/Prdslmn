
import React from 'react';
import { View } from '../types';
import { useApp } from '../store';

interface ProfileProps {
  onNavigate: (view: View) => void;
}

const Profile: React.FC<ProfileProps> = ({ onNavigate }) => {
    const { theme, toggleTheme, user } = useApp();

  return (
    <div className="mx-auto max-w-7xl space-y-4">
        <section className="rounded-xl border border-border bg-card/50 p-6 backdrop-blur-md">
            <div className="flex items-center gap-6">
                <img alt="User avatar" className="h-24 w-24 rounded-full" src={user.avatar}/>
                <div className="flex-1">
                    <h1 className="font-heading text-3xl font-bold">{user.name}</h1>
                    <p className="text-foreground/70">{user.handle}</p>
                    <p className="mt-2 text-sm text-foreground/90 max-w-2xl">Weaving narratives with algorithms. Explorer of generative worlds and AI-driven creativity. Join me on an Odyssey.</p>
                </div>
                <button className="flex h-10 items-center justify-center gap-2 rounded-lg bg-secondary px-4 text-sm font-medium hover:bg-accent border border-border">
                    <span className="material-symbols-outlined text-base">edit</span>
                    <span>Edit Profile</span>
                </button>
            </div>
        </section>
        
        <nav className="rounded-xl border border-border bg-card/50 px-3 py-2 backdrop-blur-md">
            <div className="flex items-center gap-2 overflow-x-auto">
                <button className="rounded-lg px-4 py-2 text-sm font-medium text-foreground/70 hover:bg-accent hover:text-foreground">Overview</button>
                <button className="rounded-lg px-4 py-2 text-sm font-medium text-foreground/70 hover:bg-accent hover:text-foreground">Your Odysseys</button>
                <button className="rounded-lg px-4 py-2 text-sm font-medium text-foreground/70 hover:bg-accent hover:text-foreground">Published</button>
                <button className="rounded-lg px-4 py-2 text-sm font-medium text-foreground/70 hover:bg-accent hover:text-foreground">Activity</button>
                <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-background">Settings</button>
            </div>
        </nav>

        <div className="rounded-xl border border-border bg-card/50 p-6 backdrop-blur-md">
            <div className="max-w-3xl space-y-8">
                <div>
                    <h2 className="font-heading text-xl font-bold">Profile Information</h2>
                    <p className="text-sm text-foreground/60 mt-1">Update your public profile information.</p>
                    <div className="mt-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                            <label className="font-medium text-sm pt-2" htmlFor="username">Username</label>
                            <div className="col-span-2">
                                <div className="flex rounded-lg border border-border bg-secondary/50 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-background transition-colors">
                                    <span className="flex items-center pl-3 text-foreground/50 text-sm">odyssey.ai/</span>
                                    <input className="w-full flex-1 bg-transparent p-2 pl-1 border-0 focus:ring-0 outline-none text-foreground placeholder:text-foreground/40" id="username" type="text" defaultValue="alex_the_storyteller"/>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                            <label className="font-medium text-sm pt-2" htmlFor="display-name">Display Name</label>
                            <input className="col-span-2 w-full rounded-lg border border-border bg-secondary/50 p-2 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background outline-none text-foreground" id="display-name" type="text" defaultValue="Alexandria"/>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                            <label className="font-medium text-sm pt-2" htmlFor="bio">Bio</label>
                            <textarea className="col-span-2 w-full rounded-lg border border-border bg-secondary/50 p-2 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background outline-none text-foreground" id="bio" rows={4} defaultValue="Weaving narratives with algorithms. Explorer of generative worlds and AI-driven creativity. Join me on an Odyssey."></textarea>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="font-heading text-xl font-bold">Appearance</h2>
                    <p className="text-sm text-foreground/60 mt-1">Customize the look and feel of the app.</p>
                    <div className="mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                            <label className="font-medium text-sm">Theme</label>
                            <div className="col-span-2 flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-3">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-xl text-foreground/80">{theme === 'dark' ? 'dark_mode' : 'light_mode'}</span>
                                    <p>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</p>
                                </div>
                                <button 
                                    onClick={toggleTheme}
                                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background ${theme === 'dark' ? 'bg-primary' : 'bg-gray-400'}`}
                                >
                                    <span className={`inline-block h-5 w-5 transform rounded-full bg-background shadow ring-0 transition duration-200 ease-in-out ${theme === 'dark' ? 'translate-x-5' : 'translate-x-0'}`}></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end pt-4">
                    <button className="flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-background hover:bg-primary/90">Save Changes</button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Profile;
