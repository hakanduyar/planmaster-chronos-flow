
import React from 'react';
import { Sidebar, SidebarContent, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import AppSidebar from './AppSidebar';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen w-full bg-gradient-modern relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-purple-600/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-blue-600/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float-delayed"></div>
        <div className="absolute bottom-1/4 left-1/2 w-48 h-48 md:w-96 md:h-96 bg-pink-600/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float-slow"></div>
      </div>

      <AppSidebar />
      <SidebarInset className="flex-1 flex flex-col relative z-10 min-h-0 w-full overflow-hidden">
        <header className="flex h-12 md:h-14 shrink-0 items-center gap-2 md:gap-3 px-3 md:px-6 border-b border-white/10 bg-white/5 backdrop-blur-sm">
          <SidebarTrigger className="text-white hover:bg-white/10 transition-colors" />
          <div className="flex items-center gap-2 md:gap-3 min-w-0">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex-shrink-0"></div>
            <h1 className="text-base md:text-xl font-bold gradient-text truncate">PlanMaster Pro</h1>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto min-h-0 w-full">
          <div className="h-full min-h-full w-full">
            {children}
          </div>
        </main>
      </SidebarInset>
    </div>
  );
};

export default AppLayout;
