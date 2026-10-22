/**
 * Website dan Sistem Informasi Desa Girimukti
 * Desa Girimukti, Kecamatan Cimarga, Kabupaten Lebak, Provinsi Banten
 * 
 * @license Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomeView } from './components/public/HomeView';
import { ProfilView } from './components/public/ProfilView';
import { SuratOnlineView } from './components/public/SuratOnlineView';
import { ValidasiSuratView } from './components/public/ValidasiSuratView';
import { TransparansiView } from './components/public/TransparansiView';
import { CekBansosView } from './components/public/CekBansosView';
import { CekPbbView } from './components/public/CekPbbView';
import { PengaduanView } from './components/public/PengaduanView';
import { PpidView } from './components/public/PpidView';
import { BeritaView } from './components/public/BeritaView';
import { PengumumanView } from './components/public/PengumumanView';
import { AgendaView } from './components/public/AgendaView';
import { GaleriView } from './components/public/GaleriView';
import { SearchView } from './components/public/SearchView';
import { AdminDashboard } from './components/admin/AdminDashboard';

import { StorageService } from './services/storage';
import { VillageInfo } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('beranda');
  const [tabParam, setTabParam] = useState<string | undefined>(undefined);
  const [isAdminView, setIsAdminView] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // App-level state loaded from storage
  const [villageInfo, setVillageInfo] = useState<VillageInfo>(StorageService.getVillageInfo());
  const news = StorageService.getNews();
  const announcements = StorageService.getAnnouncements();
  const agendas = StorageService.getAgendas();
  const apbdesSummary = StorageService.getBudgetSummary(2026);
  const budgetEntries = StorageService.getBudgetEntries(2026);
  const templates = StorageService.getLetterTemplates();
  const officials = StorageService.getOfficials();
  const institutions = StorageService.getInstitutions();

  // Handle URL hash changes for deep linking (e.g. #validasi-token or #admin)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('validasi-')) {
        const token = hash.replace('validasi-', '');
        setCurrentTab('validasi');
        setTabParam(token);
        setIsAdminView(false);
      } else if (hash === 'admin') {
        setIsAdminView(true);
      } else if (hash.startsWith('berita-')) {
        const slug = hash.replace('berita-', '');
        setCurrentTab('berita');
        setTabParam(slug);
        setIsAdminView(false);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNavigate = (tab: string, param?: string) => {
    setCurrentTab(tab);
    setTabParam(param);
    setIsAdminView(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateVillageInfo = (newInfo: VillageInfo) => {
    setVillageInfo(newInfo);
    StorageService.updateVillageInfo(newInfo);
  };

  // If viewing admin dashboard
  if (isAdminView) {
    return (
      <AdminDashboard
        villageInfo={villageInfo}
        onUpdateVillageInfo={handleUpdateVillageInfo}
        onBackToPublic={() => {
          setIsAdminView(false);
          window.location.hash = '';
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#1E293B]">
      
      {/* Header */}
      <Header
        currentTab={currentTab}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        isAdminLoggedIn={true}
        onOpenAdmin={() => {
          setIsAdminView(true);
          window.location.hash = 'admin';
        }}
      />

      {/* Main Body */}
      <main className="flex-1">
        {currentTab === 'beranda' && (
          <HomeView
            villageInfo={villageInfo}
            news={news}
            announcements={announcements}
            agendas={agendas}
            apbdesSummary={apbdesSummary}
            budgetEntries={budgetEntries}
            onNavigate={handleNavigate}
            onOpenSearch={() => setIsSearchOpen(true)}
          />
        )}

        {currentTab === 'profil' && (
          <ProfilView
            villageInfo={villageInfo}
            officials={officials}
            institutions={institutions}
            initialSubTab={tabParam || 'visi-misi'}
          />
        )}

        {currentTab === 'surat' && (
          <SuratOnlineView
            templates={templates}
            initialMode={tabParam === 'lacak' ? 'lacak' : 'form'}
            villageInfo={villageInfo}
            onNavigateValidasi={(token) => {
              setCurrentTab('validasi');
              setTabParam(token);
            }}
          />
        )}

        {currentTab === 'validasi' && (
          <ValidasiSuratView initialToken={tabParam || ''} />
        )}

        {currentTab === 'transparansi' && (
          <TransparansiView onNavigatePpid={() => setCurrentTab('ppid')} />
        )}

        {currentTab === 'bansos' && (
          <CekBansosView />
        )}

        {currentTab === 'pbb' && (
          <CekPbbView />
        )}

        {currentTab === 'pengaduan' && (
          <PengaduanView />
        )}

        {currentTab === 'ppid' && (
          <PpidView />
        )}

        {currentTab === 'berita' && (
          <BeritaView initialSlug={tabParam} onNavigateSlug={(s) => setTabParam(s)} />
        )}

        {currentTab === 'pengumuman' && (
          <PengumumanView />
        )}

        {currentTab === 'agenda' && (
          <AgendaView />
        )}

        {currentTab === 'galeri' && (
          <GaleriView />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAdmin={() => {
          setIsAdminView(true);
          window.location.hash = 'admin';
        }}
      />

      {/* Global Search Modal */}
      <SearchView
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />

    </div>
  );
}
