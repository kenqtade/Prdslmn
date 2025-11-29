import React from 'react';
import { View } from '../types';

interface GalleryProps {
  onNavigate: (view: View) => void;
}

const Gallery: React.FC<GalleryProps> = ({ onNavigate }) => {
  return (
    <div className="w-full">
        <div className="mb-8">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="font-heading text-xl font-bold">Featured this week</h2>
                <div className="flex items-center gap-2">
                    <button className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-foreground/70 hover:bg-secondary">
                        <span className="material-symbols-outlined text-lg">arrow_back</span>
                    </button>
                    <button className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-foreground/70 hover:bg-secondary">
                        <span className="material-symbols-outlined text-lg">arrow_forward</span>
                    </button>
                </div>
            </div>
            
            {/* Featured Carousel Mock */}
            <div className="hide-scrollbar -mx-2 flex snap-x snap-mandatory space-x-6 overflow-x-auto px-2 pb-2">
                 <div className="relative w-80 flex-shrink-0 snap-center overflow-hidden rounded-2xl shadow-lg md:w-96 cursor-pointer">
                    <img alt="Featured Odyssey: Cyberpunk Cityscape" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBC6HCMjNLnBSR4nQa7qgj-8q8fsO6r5wxtZRNQ3yiwWeOBFazDa4P_141JaSjT46fBuBrH1XaxpCHeSPQzi3g49uRC8ssGiFLljDWC1FSxH2cdQERtwBLV8nGZdze4piglOLSOufGnWvyTl4tviAEHCT4pnN4AoUshL9VfLbSsVeAUdf1Jwy7J6EWl1vVOA6RZEht_q9dICyJVGx2be8nht5CT-QcADADjTQH5uQlYeK7uH6zz_UUvdLi7iJTdJHI-OV5iwBYgRMw"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4 text-white">
                        <h3 className="font-heading text-lg font-bold">Cyberpunk Cityscape</h3>
                        <p className="text-sm text-white/80">A journey into neon-lit futures.</p>
                    </div>
                </div>
                <div className="relative w-80 flex-shrink-0 snap-center overflow-hidden rounded-2xl shadow-lg md:w-96 cursor-pointer">
                    <img alt="Featured Odyssey: Enchanted Forest" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeZZONGhLxeCCWEoD7mPSVz9UVaWK63FQ2xnDqOa_-urxBCLBgtHuU3pEQJOUSawy6cWhOIt_lKkvWHAoFJaTjQbrk2Wah2Vz7vKJc3fCoFAIbuPEds9BeC-vu-1UpH7BeLRpaqruDdV8SOcU_B_VOIzLuc8ERJCmX5bXT_J0yMUuEvZvAdRCFdytlqHEzjAcgxV7qXo8xQqr9iUZiQhdt35Yvs7zQ3AeF8agkoqKH-WEf2JjAkMqke_hZT3M9ELCBq91V3yqPQos"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4 text-white">
                        <h3 className="font-heading text-lg font-bold">Enchanted Forest</h3>
                        <p className="text-sm text-white/80">Discovering mystical creatures.</p>
                    </div>
                </div>
                 <div className="relative w-80 flex-shrink-0 snap-center overflow-hidden rounded-2xl shadow-lg md:w-96 cursor-pointer">
                    <img alt="Featured Odyssey: Lost Underwater Kingdom" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6-UPBZzAMCxsfaiNZ04O7T6hXSbUfuRJR8rYKRNkyuX-GwwAwwdQn1ttgi6Vx3Q_rdSK8LmMabC6NIcTSRDPSHySe-CeTfBzD3UNwumNEvwCxnbfZJAdQsm_p_-oENe9-uk3LQXA6_SxH3jPq8VvYcODR9wdGjtCx9fhHPOWVNhi_zpmBp8z7eviKcYD9k9ee9RrkxhHNmVMaFIuhDOQPfr0LbRlXvOllpp5Nn5C-GFEVGyBFM_9ZivFcGZYMKF3SXqcrF-Bai44"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4 text-white">
                        <h3 className="font-heading text-lg font-bold">Lost Underwater Kingdom</h3>
                        <p className="text-sm text-white/80">Exploring the depths of a forgotten civilization.</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="rounded-2xl bg-card p-6 shadow-card">
            <div className="flex items-center justify-between border-b border-border">
                <div className="flex items-center gap-6">
                    <button className="border-b-2 border-primary pb-3 text-sm font-medium text-primary">Community</button>
                    <button className="border-b-2 border-transparent pb-3 text-sm font-medium text-foreground/60 hover:border-accent hover:text-foreground">Your Remixes</button>
                </div>
                <button className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm text-foreground/80 shadow-sm hover:bg-accent">
                    <span className="material-symbols-outlined text-base">filter_list</span>
                    <span>Filters</span>
                </button>
            </div>
            
             <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
                <div className="group flex cursor-pointer flex-col overflow-hidden rounded-xl bg-secondary/50 shadow-md transition-all duration-300 hover:bg-secondary hover:shadow-lg">
                    <img alt="Odyssey preview" className="h-48 w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBqgprTqo1iMW4EDJyWTVjZ0RQ1YFPsWeNnnf4VLchYnEOeoGfOj09oOGI3LTitbnqEoyfWXPtZfZUEvybnmjogVfHu0k1qUX4-pV5DYiXnX5lVpiWkAp7v5uFB6Nr1xD3b2J4R80lHcsevyEULwNBGBD_CALwjv9xuMgC3GEVnFcJvtfmhYcuKKabsHLT6UbDtmHhwSHvdN99Hg0WmjDtcD_lAQ1-_W31R69Ko_GI-pYIxEHw9B_2lcbpaeiPL4yQT4uMRHRum40"/>
                    <div className="flex flex-1 flex-col p-4">
                        <h4 className="font-heading text-base font-bold text-foreground">Celestial Beings</h4>
                        <p className="mt-1 flex-1 text-sm text-foreground/70">An exploration of cosmic entities and nebulae.</p>
                        <div className="mt-3 flex items-center justify-between text-xs text-foreground/60">
                            <div className="flex items-center gap-2">
                                <img alt="Creator avatar" className="h-5 w-5 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAS_q2rfP4HPx404rWrgv2a_BF-z2retAGqIcbF3zrFUS-iHictXUHxdaTQCvGdquGLLHQcm-8gN8fh64W-yNm5DKt2ehppzMzG2MYCrIKq3qDRZHIk90OfwdlmTmlSv3IGZOEDqjMph9JAVVfxSlWJ2aWpwapVHCJP1xMjOOKXRIZz38bT9YmeRAjKIx14jfv598sOeN1b-cfdbSvw-SFWvTY1_kwMfqJwhuW_KpozaR_Vm5dEfZh8Ijv6K72mPVaIiegQf9yy2yM"/>
                                <span>@astral_dreamer</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">favorite_border</span> 2.1k</span>
                                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">shuffle</span> 452</span>
                            </div>
                        </div>
                    </div>
                </div>
                 <div className="group flex cursor-pointer flex-col overflow-hidden rounded-xl bg-secondary/50 shadow-md transition-all duration-300 hover:bg-secondary hover:shadow-lg">
                    <img alt="Odyssey preview" className="h-48 w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHTaH77tlHNlz4GjP-gctEcwY0NQIC0UOfr9vykAqKqAtKvqMzmpDn2X83bvCUJT7JMkie5KFzPgqedU6F4SIAEcaN32sKrXuASIUb5kshSv_8bpX5CMUzjxCql3cCXKVulxI8yNQ27tm5rBLWR_0SYWWV1jrfgEsJdXEsAHo3dvu2mYDoc6fRaM7xfVNcZDnQhSXmMRuYMy43ZnptxHZs_uXv1r2JGjda3tZ7zq8n6i95j7FEd7GP3jJQSJxTzrTz-hnpMYPt1qw"/>
                    <div className="flex flex-1 flex-col p-4">
                        <h4 className="font-heading text-base font-bold text-foreground">Steampunk Inventions</h4>
                        <p className="mt-1 flex-1 text-sm text-foreground/70">A collection of fantastical victorian-era machines.</p>
                        <div className="mt-3 flex items-center justify-between text-xs text-foreground/60">
                            <div className="flex items-center gap-2">
                                <img alt="Creator avatar" className="h-5 w-5 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIpVteL10Rlp6Fwg3IiTaF2RbGJmjkhd2SmHFYiSKxzNkygjt03LQtwgYfPB-Mk1iPFiC8Xgjw9o8hsgvb8yDLgrlycNyOWd8KHS-Nctzj32p_TPEpPWeuIyBkDZGyfOD2Ot9boD-LlCUCMVclQqhpu4Imo8-vsj-pL8vYEX5DuMIGCUjHkD0PDBiVycFUnJzSWzUehQxpWef3gxmwY-FUbkdqOy_Ay258-gIxd0q1tMTqOxrPGmkJmSLrtGR5EWrdtqgdoS5wKXI"/>
                                <span>@cogsmith</span>
                            </div>
                             <div className="flex items-center gap-3">
                                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">favorite_border</span> 1.8k</span>
                                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">shuffle</span> 310</span>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
             
             <div className="mt-8 flex items-center justify-center">
                <button className="flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-medium hover:bg-secondary">
                    <span className="material-symbols-outlined text-lg">hourglass_top</span>
                    <span>Loading more...</span>
                </button>
            </div>
        </div>
    </div>
  );
};

export default Gallery;
