import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { DemoProvider, useDemo } from './context/DemoContext';

// Layout
import { AppLayout } from './components/layout/AppLayout';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { DemoLoginPage } from './pages/public/DemoLoginPage';

// App / Authenticated Pages
import { DashboardPage } from './pages/app/DashboardPage';
import { AdmissionsPage } from './pages/app/AdmissionsPage';
import { StudentsPage } from './pages/app/StudentsPage';
import { AcademicsPage } from './pages/app/AcademicsPage';
import { AttendancePage } from './pages/app/AttendancePage';
import { ExaminationsPage } from './pages/app/ExaminationsPage';
import { ClinicalLogbooksPage } from './pages/app/ClinicalLogbooksPage';
import { HospitalPage } from './pages/app/HospitalPage';
import { PatientsPage } from './pages/app/PatientsPage';
import { OpdPage } from './pages/app/OpdPage';
import { IpdPage } from './pages/app/IpdPage';
import { PharmacyPage } from './pages/app/PharmacyPage';
import { PanchakarmaPage } from './pages/app/PanchakarmaPage';
import { FinancePage } from './pages/app/FinancePage';
import { HrPage } from './pages/app/HrPage';
import { ProcurementPage } from './pages/app/ProcurementPage';
import { AssetsPage } from './pages/app/AssetsPage';
import { CampusServicesPage } from './pages/app/CampusServicesPage';
import { LibraryPage } from './pages/app/LibraryPage';
import { ResearchPage } from './pages/app/ResearchPage';
import { AiAssistantPage } from './pages/app/AiAssistantPage';
import { CompliancePage } from './pages/app/CompliancePage';
import { ReportsPage } from './pages/app/ReportsPage';
import { SettingsPage } from './pages/app/SettingsPage';

// Scroll to top helper on navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Route guard for /app/*
const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useDemo();

  if (!isAuthenticated) {
    return <Navigate to="/demo-login" replace />;
  }

  return <Outlet />;
};

export const App: React.FC = () => {
  return (
    <DemoProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/demo-login" element={<DemoLoginPage />} />

          {/* Authenticated ERP Suite */}
          <Route path="/app" element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate to="/app/dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="admissions" element={<AdmissionsPage />} />
              <Route path="students" element={<StudentsPage />} />
              <Route path="academics" element={<AcademicsPage />} />
              <Route path="attendance" element={<AttendancePage />} />
              <Route path="examinations" element={<ExaminationsPage />} />
              <Route path="clinical-logbooks" element={<ClinicalLogbooksPage />} />
              <Route path="hospital" element={<HospitalPage />} />
              <Route path="patients" element={<PatientsPage />} />
              <Route path="opd" element={<OpdPage />} />
              <Route path="ipd" element={<IpdPage />} />
              <Route path="pharmacy" element={<PharmacyPage />} />
              <Route path="panchakarma" element={<PanchakarmaPage />} />
              <Route path="finance" element={<FinancePage />} />
              <Route path="hr" element={<HrPage />} />
              <Route path="procurement" element={<ProcurementPage />} />
              <Route path="assets" element={<AssetsPage />} />
              <Route path="campus-services" element={<CampusServicesPage />} />
              <Route path="library" element={<LibraryPage />} />
              <Route path="research" element={<ResearchPage />} />
              <Route path="ai-assistant" element={<AiAssistantPage />} />
              <Route path="compliance" element={<CompliancePage />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
          </Route>

          {/* Fallback to Landing */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </DemoProvider>
  );
};

export default App;
