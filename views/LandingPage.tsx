import React from 'react';
import { View } from '../types';

interface LandingPageProps {
  onNavigate: (view: View) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="relative min-h-screen w-full flex-col group/design-root overflow-x-hidden font-display bg-background-light dark:bg-background-dark text-white">
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between whitespace-nowrap px-10 py-4 backdrop-blur-sm bg-black/10 transition-all duration-300">
        <div className="flex items-center gap-4 text-white">
          <div className="size-6 text-primary">
            <span className="material-symbols-outlined text-3xl">auto_awesome_mosaic</span>
          </div>
          <h2 className="text-white text-xl font-bold leading-tight tracking-[-0.015em]">Prompt Odyssey</h2>
        </div>
        <div className="flex gap-3">
          <button onClick={() => onNavigate(View.Dashboard)} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 text-white text-sm font-bold leading-normal tracking-[0.015em] border-2 border-white/20 hover:bg-white/10 transition-colors">
            <span className="truncate">Sign In</span>
          </button>
          <button onClick={() => onNavigate(View.Dashboard)} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors">
            <span className="truncate">Start Free</span>
          </button>
        </div>
      </header>
      <main className="flex-grow bg-[#191022]">
        <section className="relative flex flex-col items-center justify-center h-screen min-h-[700px] overflow-hidden px-10 text-center text-white">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#1E3A8A] opacity-80"></div>
          <div className="relative z-10 flex flex-col items-center max-w-4xl pt-20">
            <h1 className="text-5xl font-black leading-tight tracking-tighter md:text-7xl font-display">Turn every prompt experiment into a beautiful, shareable journey</h1>
            <h2 className="mt-6 max-w-2xl text-lg font-normal leading-normal text-gray-300 md:text-xl font-serif">Stop losing your best iterations in chat history. Visualize, refine, and showcase your prompting skill.</h2>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
              <button onClick={() => onNavigate(View.Dashboard)} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-8 bg-primary text-white text-lg font-bold leading-normal tracking-[0.015em] glow-button transition-transform hover:scale-105">
                <span className="truncate">Start Free</span>
              </button>
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-8 bg-white/10 text-white text-lg font-bold leading-normal tracking-[0.015em] border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-colors">
                <span className="truncate">Watch 45-sec Demo</span>
              </button>
            </div>
          </div>
          <div className="absolute bottom-[-10%] left-0 right-0 z-0 flex justify-center items-end h-1/2 w-full perspective-1000 pointer-events-none">
            <div className="relative w-full max-w-6xl h-full">
              <div className="absolute left-[5%] bottom-0 flex h-full max-h-96 flex-1 flex-col gap-4 rounded-xl min-w-60 bg-[#29383d]/50 p-4 backdrop-blur-sm border border-white/10 shadow-2xl transition-transform hover:-translate-y-4" style={{ transform: 'rotateZ(-8deg)' }}>
                <div className="w-full bg-center bg-no-repeat aspect-[4/3] bg-cover rounded-lg flex flex-col" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBaN1ZzkcFuJs0ZmxDMHSw3g0Ivk93ssJpIHaZUrp_AC_bXNbDuKIYxYgaK4eymyV6W1ZMVgAojV2GSc-O3OnD11c6oER9QX8SXogf2J0uS6s9QMqbxeZtd_Ms7Lk70L4JiEkHSJWG3tm66OEqxX89QdsiuJs1G-nq_VRmryZ22wo9T1zkNRgpQ26jHnHjK7BR7pdf6X6888AZOmIzFaQhVDbpMWzNaeRZCH33-oGiOIUu52GoTSUevVi9Lc5pVinzjrlkoteocDxc")' }}></div>
                <div>
                  <p className="text-white text-lg font-medium leading-normal font-heading">Midjourney Fantasy Portraits</p>
                  <p className="text-gray-400 text-sm font-normal leading-normal">8 waypoints</p>
                </div>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 bottom-10 flex h-full max-h-96 flex-1 flex-col gap-4 rounded-xl min-w-60 bg-[#29383d]/50 p-4 backdrop-blur-sm border border-white/10 shadow-2xl transition-transform hover:-translate-y-4 z-10">
                <div className="w-full bg-center bg-no-repeat aspect-[4/3] bg-cover rounded-lg flex flex-col" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDrgot5jmt8qekaSog2gQZ-O56_LWaEF88hLm6-SwQ4ny1lc5ockyCwmazEx_-sK5hGqxhp_BcK5ETg2WhCe-5hsYCGSqMGzioFkxQ3NwhjEqUZuQciibeSivNIjqkopG-T8EMruiMNsqCv0SM_QKsvEOezGKzCygq__zeo-FfKFF0JlH7v8wV0o_p4nFqCxi387eOGyEOD-rJ0t6wvQ5WNmYjShC_XmWXNi-FVHrvmxMRasdvIvSTiLHl4ecfZ5tvnERnHRVarJnY")' }}></div>
                <div>
                  <p className="text-white text-lg font-medium leading-normal font-heading">ChatGPT Story Arcs</p>
                  <p className="text-gray-400 text-sm font-normal leading-normal">12 waypoints</p>
                </div>
              </div>
              <div className="absolute right-[5%] bottom-0 flex h-full max-h-96 flex-1 flex-col gap-4 rounded-xl min-w-60 bg-[#29383d]/50 p-4 backdrop-blur-sm border border-white/10 shadow-2xl transition-transform hover:-translate-y-4" style={{ transform: 'rotateZ(6deg)' }}>
                <div className="w-full bg-center bg-no-repeat aspect-[4/3] bg-cover rounded-lg flex flex-col" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBjQqUzNoYIRiyNgAGdoEBdfb0QI-j_1khCAVG9RR32RtX8EJzej4OzKseqzrlo1S0FOkF4omaZqDR-AgpOF8Ut_5Ct610ovzaJIJwS_OkZ62YOxcngja_0QjMxKhoymW4LLnuUbQTgIWyyU_FmIiFuYR8DRTzXKWwFpEnQel735NbuyUUAM2o3IJZsZTbDKMmRWUC7jugxDy2V7sHxKGFkWGV23yVbOukLCOlOXc6FXoJ59vEpDiJRwBlYrnU3CgE_0xuZiA7LjJo")' }}></div>
                <div>
                  <p className="text-white text-lg font-medium leading-normal font-heading">Claude 3 Code Refactors</p>
                  <p className="text-gray-400 text-sm font-normal leading-normal">5 waypoints</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-background-light dark:bg-[#1e2b30] py-20 lg:py-32">
          <div className="container mx-auto px-10 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal pb-3 pt-1">Used by 12,000+ creators</p>
            <div className="flex items-center py-3 justify-center">
              <div className="flex -space-x-4">
                 {[1,2,3,4,5,6].map((i) => (
                    <div key={i} className="bg-center bg-no-repeat aspect-square bg-cover border-background-light dark:border-background-dark rounded-full flex items-center justify-center size-11 border-4 bg-gray-600"></div>
                 ))}
              </div>
            </div>
            <blockquote className="mt-8 max-w-2xl mx-auto">
              <p className="text-lg text-gray-800 dark:text-gray-200 font-serif">"Prompt Odyssey finally gives my AI explorations a permanent, shareable home. It's an indispensable tool for any serious prompt engineer."</p>
              <footer className="mt-4 text-sm text-gray-600 dark:text-gray-400">- Lead AI Artist, FutureScape Studios</footer>
            </blockquote>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
