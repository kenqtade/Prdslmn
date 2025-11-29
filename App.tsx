import React from 'react';
import { View } from './types';
import LandingPage from './views/LandingPage';
import Dashboard from './views/Dashboard';
import Editor from './views/Editor';
import Gallery from './views/Gallery';
import Templates from './views/Templates';
import Profile from './views/Profile';
import PreviewShare from './views/PreviewShare';
import { MainLayout } from './components/Layout';
import { AppProvider, useApp } from './store';

const AppContent: React.FC = () => {
  const { currentView, navigate } = useApp();

  const renderView = () => {
    switch (currentView) {
      case View.Landing:
        return <LandingPage onNavigate={navigate} />;
      case View.Preview:
        return <PreviewShare onNavigate={navigate} />;
      case View.Editor:
        return <Editor onNavigate={navigate} />;
      default:
        // These views use the MainLayout
        return (
          <MainLayout currentView={currentView} onNavigate={navigate}>
            {currentView === View.Dashboard && <Dashboard onNavigate={navigate} />}
            {currentView === View.Gallery && <Gallery onNavigate={navigate} />}
            {currentView === View.Templates && <Templates onNavigate={navigate} />}
            {currentView === View.Profile && <Profile onNavigate={navigate} />}
          </MainLayout>
        );
    }
  };

  return <>{renderView()}</>;
};

const App: React.FC = () => {
    return (
        <AppProvider>
            <AppContent />
        </AppProvider>
    )
}

export default App;
