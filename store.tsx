
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppContextType, AppState, Odyssey, View, Waypoint } from './types';
import { GoogleGenAI } from "@google/genai";

// --- Mock Data ---
const MOCK_USER = {
  name: "Alexandria",
  handle: "@alex_the_storyteller",
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOdg0G6t1wjgF3JXWiq9nC4cOHPblXdLRzLSRG7I-xvmgOXiUATXHqq1mLoTj841XYPhoAenGZAhkBdCfx0FgKQzjCu8B8Wwz6rmxW1aGTSUZDMcZgPTVy4Riy3WOktJkI3_3NWHZQBbAzS3NgVeCK_SEHfb4Izv5DvYS7ZrDIL1u0-Wx86g6dRUMdmfBKLZn3Sg_9uCJJS12q8xkr9mqLYRoA2OK5h2lXXb88JYlnf0Cb6bnuTxk7i0RhEef3sO0pdAREO6frBX8"
};

const INITIAL_ODYSSEYS: Odyssey[] = [
  {
    id: '1',
    title: 'Fantasy Portraits v12',
    description: 'An epic journey into creating the perfect elven sorceress, exploring styles from oil painting to photorealism.',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCeZZONGhLxeCCWEoD7mPSVz9UVaWK63FQ2xnDqOa_-urxBCLBgtHuU3pEQJOUSawy6cWhOIt_lKkvWHAoFJaTjQbrk2Wah2Vz7vKJc3fCoFAIbuPEds9BeC-vu-1UpH7BeLRpaqruDdV8SOcU_B_VOIzLuc8ERJCmX5bXT_J0yMUuEvZvAdRCFdytlqHEzjAcgxV7qXo8xQqr9iUZiQhdt35Yvs7zQ3AeF8agkoqKH-WEf2JjAkMqke_hZT3M9ELCBq91V3yqPQos',
    lastUpdated: Date.now() - 7200000, // 2 hours ago
    tags: ['fantasy', 'portrait', 'elf'],
    status: 'Draft',
    author: MOCK_USER,
    stats: { likes: 0, remixes: 0, views: 0 },
    waypoints: [
      {
        id: 'wp_1',
        title: 'v1 Basic',
        description: 'A basic fantasy portrait...',
        prompt: 'A fantasy portrait of an elf.',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBC6HCMjNLnBSR4nQa7qgj-8q8fsO6r5wxtZRNQ3yiwWeOBFazDa4P_141JaSjT46fBuBrH1XaxpCHeSPQzi3g49uRC8ssGiFLljDWC1FSxH2cdQERtwBLV8nGZdze4piglOLSOufGnWvyTl4tviAEHCT4pnN4AoUshL9VfLbSsVeAUdf1Jwy7J6EWl1vVOA6RZEht_q9dICyJVGx2be8nht5CT-QcADADjTQH5uQlYeK7uH6zz_UUvdLi7iJTdJHI-OV5iwBYgRMw',
        timestamp: Date.now() - 10000000,
        wordCount: 6
      },
      {
        id: 'wp_2',
        title: 'v2 +Details',
        description: 'Adding specific features',
        prompt: 'An elven sorceress with silver hair and glowing blue eyes, wearing intricate robes, holding a crystal staff.',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCeZZONGhLxeCCWEoD7mPSVz9UVaWK63FQ2xnDqOa_-urxBCLBgtHuU3pEQJOUSawy6cWhOIt_lKkvWHAoFJaTjQbrk2Wah2Vz7vKJc3fCoFAIbuPEds9BeC-vu-1UpH7BeLRpaqruDdV8SOcU_B_VOIzLuc8ERJCmX5bXT_J0yMUuEvZvAdRCFdytlqHEzjAcgxV7qXo8xQqr9iUZiQhdt35Yvs7zQ3AeF8agkoqKH-WEf2JjAkMqke_hZT3M9ELCBq91V3yqPQos',
        timestamp: Date.now() - 8000000,
        notes: "The glowing eyes are key here.",
        wordCount: 18
      },
      {
        id: 'wp_3',
        title: 'v3 Style',
        description: 'Change to oil painting',
        prompt: 'An elven sorceress with silver hair and glowing blue eyes, wearing intricate robes, holding a crystal staff. Detailed, fantasy, oil painting style.',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6-UPBZzAMCxsfaiNZ04O7T6hXSbUfuRJR8rYKRNkyuX-GwwAwwdQn1ttgi6Vx3Q_rdSK8LmMabC6NIcTSRDPSHySe-CeTfBzD3UNwumNEvwCxnbfZJAdQsm_p_-oENe9-uk3LQXA6_SxH3jPq8VvYcODR9wdGjtCx9fhHPOWVNhi_zpmBp8z7eviKcYD9k9ee9RrkxhHNmVMaFIuhDOQPfr0LbRlXvOllpp5Nn5C-GFEVGyBFM_9ZivFcGZYMKF3SXqcrF-Bai44',
        timestamp: Date.now() - 6000000,
        wordCount: 22
      },
      {
        id: 'wp_4',
        title: 'v4 Final',
        description: 'High resolution finish',
        prompt: 'An elven sorceress with silver hair and glowing blue eyes, wearing intricate robes, holding a crystal staff. Detailed, fantasy, oil painting style, high resolution, 8k, cinematic lighting.',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBqgprTqo1iMW4EDJyWTVjZ0RQ1YFPsWeNnnf4VLchYnEOeoGfOj09oOGI3LTitbnqEoyfWXPtZfZUEvybnmjogVfHu0k1qUX4-pV5DYiXnX5lVpiWkAp7v5uFB6Nr1xD3b2J4R80lHcsevyEULwNBGBD_CALwjv9xuMgC3GEVnFcJvtfmhYcuKKabsHLT6UbDtmHhwSHvdN99Hg0WmjDtcD_lAQ1-_W31R69Ko_GI-pYIxEHw9B_2lcbpaeiPL4yQT4uMRHRum40',
        timestamp: Date.now() - 4000000,
        wordCount: 28
      }
    ]
  },
  {
    id: '2',
    title: 'Sci-Fi Cityscapes',
    description: 'Exploring cyberpunk aesthetics and neon lights.',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6-UPBZzAMCxsfaiNZ04O7T6hXSbUfuRJR8rYKRNkyuX-GwwAwwdQn1ttgi6Vx3Q_rdSK8LmMabC6NIcTSRDPSHySe-CeTfBzD3UNwumNEvwCxnbfZJAdQsm_p_-oENe9-uk3LQXA6_SxH3jPq8VvYcODR9wdGjtCx9fhHPOWVNhi_zpmBp8z7eviKcYD9k9ee9RrkxhHNmVMaFIuhDOQPfr0LbRlXvOllpp5Nn5C-GFEVGyBFM_9ZivFcGZYMKF3SXqcrF-Bai44',
    lastUpdated: Date.now() - 86400000,
    tags: ['scifi', 'cyberpunk', 'city'],
    status: 'Draft',
    author: MOCK_USER,
    stats: { likes: 12, remixes: 2, views: 45 },
    waypoints: []
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

// Helper for random images
const PLACEHOLDER_IMAGES = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBC6HCMjNLnBSR4nQa7qgj-8q8fsO6r5wxtZRNQ3yiwWeOBFazDa4P_141JaSjT46fBuBrH1XaxpCHeSPQzi3g49uRC8ssGiFLljDWC1FSxH2cdQERtwBLV8nGZdze4piglOLSOufGnWvyTl4tviAEHCT4pnN4AoUshL9VfLbSsVeAUdf1Jwy7J6EWl1vVOA6RZEht_q9dICyJVGx2be8nht5CT-QcADADjTQH5uQlYeK7uH6zz_UUvdLi7iJTdJHI-OV5iwBYgRMw',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCeZZONGhLxeCCWEoD7mPSVz9UVaWK63FQ2xnDqOa_-urxBCLBgtHuU3pEQJOUSawy6cWhOIt_lKkvWHAoFJaTjQbrk2Wah2Vz7vKJc3fCoFAIbuPEds9BeC-vu-1UpH7BeLRpaqruDdV8SOcU_B_VOIzLuc8ERJCmX5bXT_J0yMUuEvZvAdRCFdytlqHEzjAcgxV7qXo8xQqr9iUZiQhdt35Yvs7zQ3AeF8agkoqKH-WEf2JjAkMqke_hZT3M9ELCBq91V3yqPQos',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB6-UPBZzAMCxsfaiNZ04O7T6hXSbUfuRJR8rYKRNkyuX-GwwAwwdQn1ttgi6Vx3Q_rdSK8LmMabC6NIcTSRDPSHySe-CeTfBzD3UNwumNEvwCxnbfZJAdQsm_p_-oENe9-uk3LQXA6_SxH3jPq8VvYcODR9wdGjtCx9fhHPOWVNhi_zpmBp8z7eviKcYD9k9ee9RrkxhHNmVMaFIuhDOQPfr0LbRlXvOllpp5Nn5C-GFEVGyBFM_9ZivFcGZYMKF3SXqcrF-Bai44',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBBqgprTqo1iMW4EDJyWTVjZ0RQ1YFPsWeNnnf4VLchYnEOeoGfOj09oOGI3LTitbnqEoyfWXPtZfZUEvybnmjogVfHu0k1qUX4-pV5DYiXnX5lVpiWkAp7v5uFB6Nr1xD3b2J4R80lHcsevyEULwNBGBD_CALwjv9xuMgC3GEVnFcJvtfmhYcuKKabsHLT6UbDtmHhwSHvdN99Hg0WmjDtcD_lAQ1-_W31R69Ko_GI-pYIxEHw9B_2lcbpaeiPL4yQT4uMRHRum40',
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<View>(View.Landing);
  const [odysseys, setOdysseys] = useState<Odyssey[]>(INITIAL_ODYSSEYS);
  const [activeOdysseyId, setActiveOdysseyId] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    // Check system preference or saved preference
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const navigate = (view: View) => {
    setCurrentView(view);
  };

  const createOdyssey = (template?: Partial<Odyssey>) => {
    const newId = Date.now().toString();
    const newOdyssey: Odyssey = {
      id: newId,
      title: template?.title || 'New Odyssey',
      description: template?.description || 'Start your journey...',
      coverImage: template?.coverImage || PLACEHOLDER_IMAGES[0],
      lastUpdated: Date.now(),
      waypoints: template?.waypoints || [
        {
          id: `wp_${Date.now()}`,
          title: 'Start Node',
          description: 'Initial Concept',
          prompt: 'A blank canvas...',
          imageUrl: PLACEHOLDER_IMAGES[0],
          timestamp: Date.now(),
          wordCount: 3
        }
      ],
      tags: template?.tags || [],
      status: 'Draft',
      author: MOCK_USER,
      stats: { likes: 0, remixes: 0, views: 0 }
    };

    setOdysseys([newOdyssey, ...odysseys]);
    setActiveOdysseyId(newId);
    navigate(View.Editor);
  };

  const updateOdyssey = (id: string, data: Partial<Odyssey>) => {
    setOdysseys(prev => prev.map(od => od.id === id ? { ...od, ...data, lastUpdated: Date.now() } : od));
  };

  const addWaypoint = (odysseyId: string, parentWaypointId?: string) => {
    const newWaypoint: Waypoint = {
      id: `wp_${Date.now()}`,
      title: `v${(odysseys.find(o => o.id === odysseyId)?.waypoints.length || 0) + 1}`,
      description: 'New Iteration',
      prompt: '',
      imageUrl: PLACEHOLDER_IMAGES[Math.floor(Math.random() * PLACEHOLDER_IMAGES.length)],
      timestamp: Date.now(),
      wordCount: 0
    };

    setOdysseys(prev => prev.map(od => {
        if (od.id === odysseyId) {
            return {
                ...od,
                waypoints: [...od.waypoints, newWaypoint],
                lastUpdated: Date.now()
            }
        }
        return od;
    }));
  };

  const updateWaypoint = (odysseyId: string, waypointId: string, data: Partial<Waypoint>) => {
      setOdysseys(prev => prev.map(od => {
          if (od.id === odysseyId) {
              const updatedWaypoints = od.waypoints.map(wp => 
                  wp.id === waypointId ? { ...wp, ...data } : wp
              );
              return { ...od, waypoints: updatedWaypoints, lastUpdated: Date.now() };
          }
          return od;
      }));
  };

  const deleteWaypoint = (odysseyId: string, waypointId: string) => {
      setOdysseys(prev => prev.map(od => {
          if (od.id === odysseyId) {
              return {
                  ...od,
                  waypoints: od.waypoints.filter(wp => wp.id !== waypointId),
                  lastUpdated: Date.now()
              }
          }
          return od;
      }));
  };

  const refinePromptWithAI = async (prompt: string): Promise<string> => {
    try {
        if (!process.env.API_KEY) {
            console.warn("API Key missing, returning mock refinement");
            return prompt + " [Refined: Added more detail about lighting and texture.]";
        }
        
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const model = "gemini-2.5-flash"; // Using flash for speed
        const response = await ai.models.generateContent({
            model: model,
            contents: `You are an expert prompt engineer. Refine the following image generation prompt to be more descriptive, adding artistic style, lighting, and detail keywords. Keep it under 50 words. Return only the refined prompt text. Prompt: "${prompt}"`,
        });
        
        return response.text.trim();
    } catch (error) {
        console.error("AI Refinement Error:", error);
        return prompt; // Fallback
    }
  };

  const value = {
    odysseys,
    activeOdysseyId,
    user: MOCK_USER,
    theme,
    navigate,
    currentView,
    setActiveOdyssey: setActiveOdysseyId,
    createOdyssey,
    updateOdyssey,
    addWaypoint,
    updateWaypoint,
    deleteWaypoint,
    refinePromptWithAI,
    toggleTheme
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};
