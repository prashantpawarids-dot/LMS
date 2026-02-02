import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";

// Auth Pages
import { Login, Register, ForgotPassword } from "./pages/auth";

// Main Pages
import Dashboard from "./pages/Dashboard";
import AttendancePage from "./pages/Attendance";
import LaboursPage from "./pages/Labours";
import ContractorsPage from "./pages/Contractors";
import SitesPage from "./pages/Sites";
import CompaniesPage from "./pages/Companies";
import UsersPage from "./pages/Users";
import SettingsPage from "./pages/Settings";
import PayrollPage from "./pages/Payroll";
import ShiftsPage from "./pages/Shifts";
import PassesPage from "./pages/Passes";
import CompliancePage from "./pages/Compliance";
import AssetsPage from "./pages/Assets";
import VehiclesPage from "./pages/Vehicles";
import ReportsPage from "./pages/Reports";
import HrRequestsPage from "./pages/HrRequests";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Main Routes */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/attendance" element={<AttendancePage />} />
            <Route path="/labours" element={<LaboursPage />} />
            <Route path="/contractors" element={<ContractorsPage />} />
            <Route path="/sites" element={<SitesPage />} />
            <Route path="/companies" element={<CompaniesPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/settings" element={<SettingsPage />} />

            {/* New LMS Modules */}
            <Route path="/payroll" element={<PayrollPage />} />
            <Route path="/shifts" element={<ShiftsPage />} />
            <Route path="/passes" element={<PassesPage />} />
            <Route path="/compliance" element={<CompliancePage />} />
            <Route path="/assets" element={<AssetsPage />} />
            <Route path="/vehicles" element={<VehiclesPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/hr-requests" element={<HrRequestsPage />} />
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
