
import React from 'react';
import { Sidebar, SidebarContent, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import AppSidebar from './AppSidebar';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen w-full bg-gradient-planmaster">
      <AppSidebar />
      <SidebarInset className="flex-1 flex flex-col">
        <header className="flex h-14 shrink-0 items-center gap-3 px-6 border-b border-slate-200/60 bg-white/90 backdrop-blur-sm shadow-sm">
          <SidebarTrigger className="text-slate-600 hover:bg-slate-100 transition-colors rounded-lg p-2" />
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
            <h1 className="text-xl font-bold gradient-text">PlanMaster Pro</h1>
          </div>
        </header>
        <main className="flex-1 bg-gradient-planmaster dashboard-container p-6">
          {children}
        </main>
      </SidebarInset>
    </div>
  );
};

export default AppLayout;
