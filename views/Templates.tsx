import React from 'react';
import { View } from '../types';
import { useApp } from '../store';

interface TemplatesProps {
  onNavigate: (view: View) => void;
}

const Templates: React.FC<TemplatesProps> = ({ onNavigate }) => {
  const { createOdyssey } = useApp();

  const handleUseTemplate = (title: string, tags: string[], cover: string, desc: string) => {
      createOdyssey({
          title: title,
          description: desc,
          tags: tags,
          coverImage: cover
      });
  };

  return (
    <div className="w-full fade-in">
        <div className="mb-6 lg:mb-8 flex items-baseline justify-between">
            <h1 className="font-heading text-3xl font-bold">Templates Gallery</h1>
            <p className="text-foreground/60 hidden sm:block">Curated prompts to kickstart your next Odyssey.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
            <div className="flex flex-col rounded-2xl border border-border bg-card shadow-lg transition-all duration-300 hover:border-primary/50 hover:shadow-2xl overflow-hidden cursor-pointer" onClick={() => handleUseTemplate("Fantasy Portraits", ["Fantasy", "Characters"], "https://lh3.googleusercontent.com/aida-public/AB6AXuBC6HCMjNLnBSR4nQa7qgj-8q8fsO6r5wxtZRNQ3yiwWeOBFazDa4P_141JaSjT46fBuBrH1XaxpCHeSPQzi3g49uRC8ssGiFLljDWC1FSxH2cdQERtwBLV8nGZdze4piglOLSOufGnWvyTl4tviAEHCT4pnN4AoUshL9VfLbSsVeAUdf1Jwy7J6EWl1vVOA6RZEht_q9dICyJVGx2be8nht5CT-QcADADjTQH5uQlYeK7uH6zz_UUvdLi7iJTdJHI-OV5iwBYgRMw", "A versatile template for generating high-quality fantasy character portraits.")}>
                <div className="relative aspect-[16/9] w-full">
                    <img alt="Fantasy Portraits" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBC6HCMjNLnBSR4nQa7qgj-8q8fsO6r5wxtZRNQ3yiwWeOBFazDa4P_141JaSjT46fBuBrH1XaxpCHeSPQzi3g49uRC8ssGiFLljDWC1FSxH2cdQERtwBLV8nGZdze4piglOLSOufGnWvyTl4tviAEHCT4pnN4AoUshL9VfLbSsVeAUdf1Jwy7J6EWl1vVOA6RZEht_q9dICyJVGx2be8nht5CT-QcADADjTQH5uQlYeK7uH6zz_UUvdLi7iJTdJHI-OV5iwBYgRMw"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                        <h2 className="font-heading text-2xl font-bold text-white shadow-black/50 [text-shadow:0_1px_3px_var(--tw-shadow-color)]">Fantasy Portraits</h2>
                    </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                    <p className="mb-4 text-foreground/80">A versatile template for generating high-quality fantasy character portraits. Perfect for concept art, D&D characters, or story illustration.</p>
                    <div className="mb-5 flex flex-wrap gap-2">
                        <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-foreground/80">Fantasy</span>
                        <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-foreground/80">Characters</span>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                         <div className="flex items-center gap-3 text-sm text-foreground/60">
                            <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-base">file_download</span> 12.8k uses</span>
                        </div>
                        <button className="flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-base font-bold text-background shadow-lg transition-colors hover:bg-primary/90">
                            <span className="material-symbols-outlined">add_circle</span>
                            <span>Use Template</span>
                        </button>
                    </div>
                </div>
            </div>

             <div className="flex flex-col rounded-2xl border border-border bg-card shadow-lg transition-all duration-300 hover:border-primary/50 hover:shadow-2xl overflow-hidden cursor-pointer" onClick={() => handleUseTemplate("Sci-Fi Landscapes", ["Sci-Fi", "Environment"], "https://lh3.googleusercontent.com/aida-public/AB6AXuCeZZONGhLxeCCWEoD7mPSVz9UVaWK63FQ2xnDqOa_-urxBCLBgtHuU3pEQJOUSawy6cWhOIt_lKkvWHAoFJaTjQbrk2Wah2Vz7vKJc3fCoFAIbuPEds9BeC-vu-1UpH7BeLRpaqruDdV8SOcU_B_VOIzLuc8ERJCmX5bXT_J0yMUuEvZvAdRCFdytlqHEzjAcgxV7qXo8xQqr9iUZiQhdt35Yvs7zQ3AeF8agkoqKH-WEf2JjAkMqke_hZT3M9ELCBq91V3yqPQos", "Generate breathtaking alien worlds, futuristic cities, and sprawling space vistas.")}>
                <div className="relative aspect-[16/9] w-full">
                    <img alt="Sci-Fi Landscapes" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeZZONGhLxeCCWEoD7mPSVz9UVaWK63FQ2xnDqOa_-urxBCLBgtHuU3pEQJOUSawy6cWhOIt_lKkvWHAoFJaTjQbrk2Wah2Vz7vKJc3fCoFAIbuPEds9BeC-vu-1UpH7BeLRpaqruDdV8SOcU_B_VOIzLuc8ERJCmX5bXT_J0yMUuEvZvAdRCFdytlqHEzjAcgxV7qXo8xQqr9iUZiQhdt35Yvs7zQ3AeF8agkoqKH-WEf2JjAkMqke_hZT3M9ELCBq91V3yqPQos"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                        <h2 className="font-heading text-2xl font-bold text-white shadow-black/50 [text-shadow:0_1px_3px_var(--tw-shadow-color)]">Sci-Fi Landscapes</h2>
                    </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                    <p className="mb-4 text-foreground/80">Generate breathtaking alien worlds, futuristic cities, and sprawling space vistas. Great for backgrounds and world-building.</p>
                     <div className="mb-5 flex flex-wrap gap-2">
                        <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-foreground/80">Sci-Fi</span>
                        <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-foreground/80">Environment</span>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                         <div className="flex items-center gap-3 text-sm text-foreground/60">
                            <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-base">file_download</span> 9.2k uses</span>
                        </div>
                        <button className="flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-base font-bold text-background shadow-lg transition-colors hover:bg-primary/90">
                            <span className="material-symbols-outlined">add_circle</span>
                            <span>Use Template</span>
                        </button>
                    </div>
                </div>
            </div>
             <div className="flex flex-col rounded-2xl border border-border bg-card shadow-lg transition-all duration-300 hover:border-primary/50 hover:shadow-2xl overflow-hidden cursor-pointer" onClick={() => handleUseTemplate("Architectural Mockups", ["Architecture", "Design"], "https://lh3.googleusercontent.com/aida-public/AB6AXuB6-UPBZzAMCxsfaiNZ04O7T6hXSbUfuRJR8rYKRNkyuX-GwwAwwdQn1ttgi6Vx3Q_rdSK8LmMabC6NIcTSRDPSHySe-CeTfBzD3UNwumNEvwCxnbfZJAdQsm_p_-oENe9-uk3LQXA6_SxH3jPq8VvYcODR9wdGjtCx9fhHPOWVNhi_zpmBp8z7eviKcYD9k9ee9RrkxhHNmVMaFIuhDOQPfr0LbRlXvOllpp5Nn5C-GFEVGyBFM_9ZivFcGZYMKF3SXqcrF-Bai44", "Create photorealistic architectural visualizations for interior and exterior designs.")}>
                <div className="relative aspect-[16/9] w-full">
                    <img alt="Architectural Mockups" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6-UPBZzAMCxsfaiNZ04O7T6hXSbUfuRJR8rYKRNkyuX-GwwAwwdQn1ttgi6Vx3Q_rdSK8LmMabC6NIcTSRDPSHySe-CeTfBzD3UNwumNEvwCxnbfZJAdQsm_p_-oENe9-uk3LQXA6_SxH3jPq8VvYcODR9wdGjtCx9fhHPOWVNhi_zpmBp8z7eviKcYD9k9ee9RrkxhHNmVMaFIuhDOQPfr0LbRlXvOllpp5Nn5C-GFEVGyBFM_9ZivFcGZYMKF3SXqcrF-Bai44"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                        <h2 className="font-heading text-2xl font-bold text-white shadow-black/50 [text-shadow:0_1px_3px_var(--tw-shadow-color)]">Architectural Mockups</h2>
                    </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                    <p className="mb-4 text-foreground/80">Create photorealistic architectural visualizations for interior and exterior designs.</p>
                     <div className="mb-5 flex flex-wrap gap-2">
                        <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-foreground/80">Architecture</span>
                        <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-foreground/80">Realistic</span>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                         <div className="flex items-center gap-3 text-sm text-foreground/60">
                            <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-base">file_download</span> 7.5k uses</span>
                        </div>
                        <button className="flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-base font-bold text-background shadow-lg transition-colors hover:bg-primary/90">
                            <span className="material-symbols-outlined">add_circle</span>
                            <span>Use Template</span>
                        </button>
                    </div>
                </div>
            </div>
             <div className="flex flex-col rounded-2xl border border-border bg-card shadow-lg transition-all duration-300 hover:border-primary/50 hover:shadow-2xl overflow-hidden cursor-pointer" onClick={() => handleUseTemplate("Vintage Logos", ["Logo", "Branding"], "https://lh3.googleusercontent.com/aida-public/AB6AXuBBqgprTqo1iMW4EDJyWTVjZ0RQ1YFPsWeNnnf4VLchYnEOeoGfOj09oOGI3LTitbnqEoyfWXPtZfZUEvybnmjogVfHu0k1qUX4-pV5DYiXnX5lVpiWkAp7v5uFB6Nr1xD3b2J4R80lHcsevyEULwNBGBD_CALwjv9xuMgC3GEVnFcJvtfmhYcuKKabsHLT6UbDtmHhwSHvdN99Hg0WmjDtcD_lAQ1-_W31R69Ko_GI-pYIxEHw9B_2lcbpaeiPL4yQT4uMRHRum40", "Quickly design retro and vintage-style logos.")}>
                <div className="relative aspect-[16/9] w-full">
                    <img alt="Vintage Logos" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBqgprTqo1iMW4EDJyWTVjZ0RQ1YFPsWeNnnf4VLchYnEOeoGfOj09oOGI3LTitbnqEoyfWXPtZfZUEvybnmjogVfHu0k1qUX4-pV5DYiXnX5lVpiWkAp7v5uFB6Nr1xD3b2J4R80lHcsevyEULwNBGBD_CALwjv9xuMgC3GEVnFcJvtfmhYcuKKabsHLT6UbDtmHhwSHvdN99Hg0WmjDtcD_lAQ1-_W31R69Ko_GI-pYIxEHw9B_2lcbpaeiPL4yQT4uMRHRum40"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                        <h2 className="font-heading text-2xl font-bold text-white shadow-black/50 [text-shadow:0_1px_3px_var(--tw-shadow-color)]">Vintage Logos</h2>
                    </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                    <p className="mb-4 text-foreground/80">Quickly design retro and vintage-style logos.</p>
                     <div className="mb-5 flex flex-wrap gap-2">
                        <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-foreground/80">Logo</span>
                        <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-foreground/80">Vintage</span>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                         <div className="flex items-center gap-3 text-sm text-foreground/60">
                            <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-base">file_download</span> 15.1k uses</span>
                        </div>
                        <button className="flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-base font-bold text-background shadow-lg transition-colors hover:bg-primary/90">
                            <span className="material-symbols-outlined">add_circle</span>
                            <span>Use Template</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Templates;
