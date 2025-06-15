
import React from 'react';
import { Sidebar, SidebarContent, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import AppSidebar from './AppSidebar';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen w-full bg-gradient-modern">
      <AppSidebar />
      <SidebarInset className="flex-1 flex flex-col">
        <header className="flex h-16 shrink-0 items-center gap-4 px-6 border-b border-slate-200 bg-white/95 backdrop-blur-sm shadow-sm">
          <SidebarTrigger className="text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors rounded-lg p-2" />
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-sm"></div>
            <h1 className="text-xl font-bold gradient-text">PlanMaster Pro</h1>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="text-sm text-slate-500">
              {new Date().toLocaleDateString('tr-TR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </header>
        <main className="flex-1 bg-gradient-modern dashboard-container p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </SidebarInset>
    </div>
  );
};

export default AppLayout;
