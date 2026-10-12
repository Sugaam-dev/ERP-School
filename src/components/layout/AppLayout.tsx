import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import { DemoEnvironmentBanner } from '../common/DemoEnvironmentBanner';
import { ToastContainer } from '../common/ToastContainer';
import {
  LayoutDashboard,
  UserPlus,
  Users,
  GraduationCap,
  CalendarCheck,
  FileCheck2,
  BookOpenCheck,
  Building2,
  HeartPulse,
  Stethoscope,
  BedDouble,
  Pill,
  Sparkles,
  CircleDollarSign,
  Briefcase,
  ShoppingCart,
  Boxes,
  Home,
  BookMarked,
  Microscope,
  Bot,
  ShieldCheck,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Search,
  Bell,
  LogOut,
  ChevronLeft,
  Calendar,
  ExternalLink,
} from 'lucide-react';

interface NavGroup {
  label: string;
  items: {
    name: string;
    path: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
  }[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Overview',
    items: [
      { name: 'Dashboard', path: '/app/dashboard', icon: LayoutDashboard },
    ],
  },
  {
    label: 'Academics',
    items: [
      { name: 'Admissions', path: '/app/admissions', icon: UserPlus },
      { name: 'Students Directory', path: '/app/students', icon: Users },
      { name: 'Academics & Timetables', path: '/app/academics', icon: GraduationCap },
      { name: 'Attendance Register', path: '/app/attendance', icon: CalendarCheck },
      { name: 'Examinations', path: '/app/examinations', icon: FileCheck2 },
      { name: 'Clinical Logbooks', path: '/app/clinical-logbooks', icon: BookOpenCheck },
    ],
  },
  {
    label: 'Teaching Hospital',
    items: [
      { name: 'Hospital Overview', path: '/app/hospital', icon: Building2 },
      { name: 'Patient Registry', path: '/app/patients', icon: HeartPulse },
      { name: 'OPD Queue', path: '/app/opd', icon: Stethoscope },
      { name: 'IPD Wards & Beds', path: '/app/ipd', icon: BedDouble },
    ],
  },
  {
    label: 'Ayurveda Operations',
    items: [
      { name: 'Pharmacy & Inventory', path: '/app/pharmacy', icon: Pill },
      { name: 'Panchakarma Center', path: '/app/panchakarma', icon: Sparkles },
    ],
  },
  {
    label: 'Administration',
    items: [
      { name: 'Finance & Collections', path: '/app/finance', icon: CircleDollarSign },
      { name: 'HR & Faculty Roster', path: '/app/hr', icon: Briefcase },
      { name: 'Procurement', path: '/app/procurement', icon: ShoppingCart },
      { name: 'Assets & Maintenance', path: '/app/assets', icon: Boxes },
      { name: 'Campus Services', path: '/app/campus-services', icon: Home },
      { name: 'Library & Learning', path: '/app/library', icon: BookMarked },
      { name: 'Research & Outreach', path: '/app/research', icon: Microscope },
    ],
  },
  {
    label: 'Governance & Analytics',
    items: [
      { name: 'AI Assistant', path: '/app/ai-assistant', icon: Bot, badge: 'Smart' },
      { name: 'Compliance & Evidence', path: '/app/compliance', icon: ShieldCheck },
      { name: 'Reports & Analytics', path: '/app/reports', icon: BarChart3 },
      { name: 'System Settings', path: '/app/settings', icon: Settings },
    ],
  },
];

export const AppLayout: React.FC = () => {
  const {
    currentUser,
    logout,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    students,
    patients,
    pharmacyItems,
  } = useDemo();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Global search modal state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const toggleGroup = (groupLabel: string) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [groupLabel]: !prev[groupLabel],
    }));
  };

  const handleLogout = () => {
    logout();
    navigate('/demo-login');
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  // Search results
  const searchResults = searchQuery.trim()
    ? {
        students: students.filter(
          (s) =>
            s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.rollNo.toLowerCase().includes(searchQuery.toLowerCase())
        ).slice(0, 3),
        patients: patients.filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.uhid.toLowerCase().includes(searchQuery.toLowerCase())
        ).slice(0, 3),
        medicines: pharmacyItems.filter(
          (m) =>
            m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.itemCode.toLowerCase().includes(searchQuery.toLowerCase())
        ).slice(0, 3),
      }
    : null;

  return (
    <div className="min-vh-100 h-screen flex flex-col bg-[#F5F8FA] overflow-hidden">
      {/* Top Demo Notice Banner */}
      <DemoEnvironmentBanner />

      <div className="flex-1 flex overflow-hidden">
        {/* SIDEBAR (Desktop) */}
        <aside
          className={`hidden md:flex flex-col bg-[#0B263A] text-slate-300 border-r border-slate-800 transition-all duration-300 z-30 select-none ${
            isSidebarCollapsed ? 'w-20' : 'w-64'
          }`}
        >
          {/* Institution Brand Header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800 bg-[#081E2E]">
            {!isSidebarCollapsed ? (
              <Link to="/app/dashboard" className="flex items-center space-x-2.5 overflow-hidden">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#0D887E] to-[#79D4BD] flex items-center justify-center text-white font-black text-sm tracking-tighter shadow-md">
                  PMRG
                </div>
                <div>
                  <h1 className="font-bold text-white text-sm tracking-tight leading-none">
                    AYURVEDA ERP
                  </h1>
                  <span className="text-[10px] text-[#79D4BD] font-medium tracking-wide">
                    Digital Campus Suite
                  </span>
                </div>
              </Link>
            ) : (
              <div className="mx-auto w-9 h-9 rounded-lg bg-[#0D887E] flex items-center justify-center text-white font-black text-sm shadow">
                P
              </div>
            )}
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isSidebarCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
            {NAV_GROUPS.map((group) => {
              const isGroupCollapsed = collapsedGroups[group.label];
              return (
                <div key={group.label} className="space-y-1">
                  {!isSidebarCollapsed && (
                    <button
                      onClick={() => toggleGroup(group.label)}
                      className="w-full flex items-center justify-between px-2.5 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider hover:text-slate-200 transition-colors"
                    >
                      <span>{group.label}</span>
                      <ChevronDown
                        className={`w-3 h-3 transition-transform ${
                          isGroupCollapsed ? '-rotate-90' : ''
                        }`}
                      />
                    </button>
                  )}

                  {(!isGroupCollapsed || isSidebarCollapsed) && (
                    <div className="space-y-0.5">
                      {group.items.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                          <NavLink
                            key={item.path}
                            to={item.path}
                            className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                              isActive
                                ? 'bg-[#0D887E] text-white shadow-sm font-semibold'
                                : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                            } ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}
                            title={isSidebarCollapsed ? item.name : undefined}
                          >
                            <Icon
                              className={`w-4 h-4 flex-shrink-0 ${
                                isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                              }`}
                            />
                            {!isSidebarCollapsed && (
                              <span className="flex-1 truncate">{item.name}</span>
                            )}
                            {!isSidebarCollapsed && item.badge && (
                              <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-[#79D4BD] text-[#0B263A] uppercase tracking-wider">
                                {item.badge}
                              </span>
                            )}
                          </NavLink>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* User Status Footer */}
          <div className="p-3 border-t border-slate-800 bg-[#081E2E]">
            {!isSidebarCollapsed ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5 overflow-hidden">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover border border-[#0D887E]"
                  />
                  <div className="truncate">
                    <p className="text-xs font-semibold text-white truncate">{currentUser.name}</p>
                    <p className="text-[10px] text-slate-400 truncate">{currentUser.roleTitle}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full flex justify-center text-slate-400 hover:text-rose-400 py-1"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </aside>

        {/* MOBILE DRAWER NAVIGATION */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <div
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="relative w-72 bg-[#0B263A] text-slate-200 h-full flex flex-col z-10 shadow-2xl">
              <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded bg-[#0D887E] flex items-center justify-center text-white font-bold text-xs">
                    PMRG
                  </div>
                  <div>
                    <h2 className="font-bold text-white text-sm">AYURVEDA ERP</h2>
                    <p className="text-[10px] text-[#79D4BD]">Digital Campus Solution</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-3 space-y-4">
                {NAV_GROUPS.map((group) => (
                  <div key={group.label} className="space-y-1">
                    <p className="px-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {group.label}
                    </p>
                    <div className="space-y-0.5">
                      {group.items.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-medium ${
                              isActive
                                ? 'bg-[#0D887E] text-white font-semibold'
                                : 'text-slate-300 hover:bg-slate-800'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            <span>{item.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-slate-800 bg-[#081E2E] flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <div className="text-xs">
                    <p className="font-bold text-white">{currentUser.name}</p>
                    <p className="text-[10px] text-slate-400">{currentUser.roleTitle}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-xs text-rose-400 flex items-center space-x-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Exit</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* TOPBAR */}
          <header className="h-16 bg-white border-b border-slate-200/90 px-4 md:px-6 flex items-center justify-between z-20 flex-shrink-0">
            <div className="flex items-center space-x-3">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Breadcrumb / Current Path Display */}
              <div className="hidden sm:flex items-center space-x-2 text-xs text-slate-500">
                <span className="font-medium text-slate-400">PMRG Campus</span>
                <span className="text-slate-300">/</span>
                <span className="font-semibold text-[#0B263A] capitalize">
                  {location.pathname.replace('/app/', '').replace('-', ' ') || 'Dashboard'}
                </span>
              </div>
            </div>

            {/* Right Topbar Actions */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Date Indicator */}
              <div className="hidden lg:flex items-center space-x-1.5 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                <Calendar className="w-3.5 h-3.5 text-[#0D887E]" />
                <span className="font-medium">12 Oct 2026</span>
                <span className="text-slate-300">|</span>
                <span className="text-slate-400">Session 2026-27</span>
              </div>

              {/* Global Mock Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-700 hover:border-slate-300 text-xs bg-slate-50/70 transition-colors"
                title="Search students, patients, medicines"
              >
                <Search className="w-4 h-4 text-slate-400" />
                <span className="hidden md:inline">Quick Search...</span>
                <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 bg-white border border-slate-200 rounded">
                  ⌘K
                </kbd>
              </button>

              {/* View Public Pitch Site Link */}
              <Link
                to="/"
                target="_blank"
                rel="noreferrer"
                className="hidden xl:flex items-center space-x-1 text-xs text-[#0D887E] hover:text-[#095954] font-medium px-2.5 py-1.5 rounded-lg hover:bg-teal-50/60 border border-teal-200/60 transition-colors"
                title="Open Public Landing Page in new tab"
              >
                <span>Landing Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              {/* Notifications Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                  title="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  {unreadNotificationsCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                      {unreadNotificationsCount}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div
                    className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                      <h4 className="text-sm font-bold text-[#0B263A]">Notifications</h4>
                      <button
                        onClick={markAllNotificationsRead}
                        className="text-xs text-[#0D887E] hover:underline font-medium"
                      >
                        Mark all as read
                      </button>
                    </div>

                    <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`p-3.5 hover:bg-slate-50 transition-colors cursor-pointer ${
                            !n.read ? 'bg-teal-50/30' : ''
                          }`}
                          onClick={() => {
                            markNotificationRead(n.id);
                            setShowNotifications(false);
                            navigate(n.moduleLink);
                          }}
                        >
                          <div className="flex items-start justify-between">
                            <h5 className="text-xs font-bold text-[#0B263A]">{n.title}</h5>
                            <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1 leading-snug">{n.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* User Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 p-1 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover border border-slate-200"
                  />
                  <div className="hidden sm:block text-left">
                    <p className="text-xs font-bold text-[#0B263A] leading-tight">{currentUser.name}</p>
                    <p className="text-[10px] text-slate-500 leading-tight">{currentUser.roleTitle}</p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
                </button>

                {showProfileMenu && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-slate-200 py-1.5 z-50 animate-in fade-in"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-[#0B263A]">{currentUser.name}</p>
                      <p className="text-[10px] text-slate-500">{currentUser.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 text-[9px] font-semibold rounded bg-teal-50 text-[#0D887E]">
                        {currentUser.department}
                      </span>
                    </div>

                    <Link
                      to="/app/settings"
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
                    >
                      <Settings className="w-3.5 h-3.5 text-slate-400" />
                      <span>Settings & Preferences</span>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center space-x-2 border-t border-slate-100"
                    >
                      <LogOut className="w-3.5 h-3.5 text-rose-500" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* PAGE CONTENT ROUTE OUTLET */}
          <main className="flex-1 overflow-y-auto bg-[#F5F8FA] p-4 md:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>

      {/* GLOBAL SEARCH DIALOG MODAL */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center p-4 pt-20 z-50 animate-in fade-in">
          <div
            className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-slate-200 flex items-center space-x-3">
              <Search className="w-5 h-5 text-slate-400" />
              <input
                type="text"
                autoFocus
                placeholder="Search across students, patients, medicines, records..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-sm font-medium text-[#0B263A] placeholder:text-slate-400 focus:outline-none"
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 max-h-96 overflow-y-auto">
              {!searchQuery.trim() ? (
                <div className="text-center py-8 text-xs text-slate-400">
                  Type to search across 40 Students, 20 Hospital Patients, and 25 Ayurvedic Pharmacy items.
                </div>
              ) : searchResults && (
                <div className="space-y-4">
                  {/* Students */}
                  {searchResults.students.length > 0 && (
                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Students ({searchResults.students.length})
                      </p>
                      <div className="space-y-1">
                        {searchResults.students.map((s) => (
                          <div
                            key={s.id}
                            onClick={() => {
                              setIsSearchOpen(false);
                              navigate('/app/students');
                            }}
                            className="p-2 rounded-lg hover:bg-slate-50 cursor-pointer flex items-center justify-between"
                          >
                            <div className="flex items-center space-x-2">
                              <Users className="w-4 h-4 text-[#0D887E]" />
                              <span className="text-xs font-semibold text-[#0B263A]">{s.name}</span>
                              <span className="text-[10px] text-slate-400">({s.rollNo})</span>
                            </div>
                            <span className="text-[10px] text-slate-500">{s.currentSemester}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Patients */}
                  {searchResults.patients.length > 0 && (
                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Hospital Patients ({searchResults.patients.length})
                      </p>
                      <div className="space-y-1">
                        {searchResults.patients.map((p) => (
                          <div
                            key={p.id}
                            onClick={() => {
                              setIsSearchOpen(false);
                              navigate('/app/patients');
                            }}
                            className="p-2 rounded-lg hover:bg-slate-50 cursor-pointer flex items-center justify-between"
                          >
                            <div className="flex items-center space-x-2">
                              <HeartPulse className="w-4 h-4 text-rose-500" />
                              <span className="text-xs font-semibold text-[#0B263A]">{p.name}</span>
                              <span className="text-[10px] text-slate-400">({p.uhid})</span>
                            </div>
                            <span className="text-[10px] text-slate-500">{p.prakriti}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Medicines */}
                  {searchResults.medicines.length > 0 && (
                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Pharmacy Medicines ({searchResults.medicines.length})
                      </p>
                      <div className="space-y-1">
                        {searchResults.medicines.map((m) => (
                          <div
                            key={m.id}
                            onClick={() => {
                              setIsSearchOpen(false);
                              navigate('/app/pharmacy');
                            }}
                            className="p-2 rounded-lg hover:bg-slate-50 cursor-pointer flex items-center justify-between"
                          >
                            <div className="flex items-center space-x-2">
                              <Pill className="w-4 h-4 text-emerald-600" />
                              <span className="text-xs font-semibold text-[#0B263A]">{m.name}</span>
                              <span className="text-[10px] text-slate-400">({m.itemCode})</span>
                            </div>
                            <span className="text-[10px] text-slate-500">{m.quantity} {m.unit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {searchResults.students.length === 0 &&
                    searchResults.patients.length === 0 &&
                    searchResults.medicines.length === 0 && (
                      <p className="text-xs text-slate-500 text-center py-4">
                        No matches found for "{searchQuery}".
                      </p>
                    )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Global Toast Container */}
      <ToastContainer />
    </div>
  );
};
