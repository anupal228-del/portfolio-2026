import React, { useState, useEffect } from 'react';
import { initialPortfolioData } from './data/portfolioData';
import { PortfolioContent, ProjectItem } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WorkExperience } from './components/WorkExperience';
import { SectionHeader } from './components/SectionHeader';
import { ShortContentSection } from './components/ShortContentSection';
import { MotionGraphicSection } from './components/MotionGraphicSection';
import { GraphicDesignSection } from './components/GraphicDesignSection';
import { PhotographySection } from './components/PhotographySection';
import { ScanForMore } from './components/ScanForMore';
import { FloatingHirePill } from './components/FloatingHirePill';
import { CinemaPlayerModal } from './components/CinemaPlayerModal';
import { HireModal } from './components/HireModal';
import { AdminDashboard } from './components/AdminDashboard';
import { CustomCursor } from './components/CustomCursor';

export const App: React.FC = () => {
  const [data, setData] = useState<PortfolioContent>(() => {
    const saved = localStorage.getItem('anurag_portfolio_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse cached portfolio data:', e);
      }
    }
    return initialPortfolioData;
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('anurag_theme');
      if (savedTheme) return savedTheme === 'dark';
    }
    return false; // Default to the warm off-white Behance editorial canvas
  });

  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isHireOpen, setIsHireOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('anurag_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('anurag_theme', 'light');
    }
  }, [darkMode]);

  const handleSaveData = (newData: PortfolioContent) => {
    setData(newData);
    localStorage.setItem('anurag_portfolio_data', JSON.stringify(newData));
  };

  const handleResetData = () => {
    setData(initialPortfolioData);
    localStorage.removeItem('anurag_portfolio_data');
  };

  return (
    <div className="min-h-screen bg-[#F4F3EE] dark:bg-[#0C0D0E] text-[#121316] dark:text-[#E8E8E6] transition-colors duration-300 font-display">
      {/* React Bits Custom Dynamic Cursor */}
      <CustomCursor />

      {/* Main Container */}
      <main className="relative overflow-x-hidden">
        {/* Header Hero Branding */}
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          openAdmin={() => setIsAdminOpen(true)}
          openHire={() => setIsHireOpen(true)}
        />

        {/* Hero & About Me */}
        <Hero profile={data.profile} />

        {/* Work Experience */}
        <WorkExperience experiences={data.experiences} />

        {/* Section 1: Motion Graphic */}
        <SectionHeader title="Motion Graphic" tag="01 / Enterprise & Tech" id="motion-graphic" />
        <MotionGraphicSection
          projects={data.projects}
          onSelectProject={(proj) => setSelectedProject(proj)}
        />

        {/* Section 2: Short Content (Reels / TikTok) */}
        <SectionHeader title="Short Content" tag="02 / 9:16 Vertical Video" id="short-content" />
        <ShortContentSection
          projects={data.projects}
          onSelectProject={(proj) => setSelectedProject(proj)}
        />

        {/* Section 3: Graphic Design & UI/UX */}
        <SectionHeader title="Graphic Design" tag="03 / Systems & Publication" id="graphic-design" />
        <GraphicDesignSection
          projects={data.projects}
          onSelectProject={(proj) => setSelectedProject(proj)}
        />

        {/* Section 4: Photography */}
        <SectionHeader title="Photography" tag="04 / Stills & Light" id="photography" />
        <PhotographySection projects={data.projects} />

        {/* Scan for More & Footer */}
        <ScanForMore
          data={data}
          onHire={() => setIsHireOpen(true)}
        />
      </main>

      {/* Floating Bottom Hire Pill from Reference */}
      <FloatingHirePill
        profile={data.profile}
        onOpenHire={() => setIsHireOpen(true)}
      />

      {/* Cinema Player Modal */}
      <CinemaPlayerModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onHire={() => {
          setSelectedProject(null);
          setIsHireOpen(true);
        }}
      />

      {/* Hire Modal */}
      <HireModal
        isOpen={isHireOpen}
        onClose={() => setIsHireOpen(false)}
        profile={data.profile}
      />

      {/* Admin CMS Modal */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        data={data}
        onSaveData={handleSaveData}
        onResetData={handleResetData}
      />
    </div>
  );
};

export default App;
