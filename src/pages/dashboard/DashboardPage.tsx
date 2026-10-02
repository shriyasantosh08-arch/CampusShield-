import React from 'react';
import { WelcomeSection } from '../../components/dashboard/WelcomeSection';
import { SafetyStatusBanner } from '../../components/dashboard/SafetyStatusBanner';
import { EmergencyActionCard } from '../../components/dashboard/EmergencyActionCard';
import { StatsOverview } from '../../components/dashboard/StatsOverview';
import { RecentIncidentsList } from '../../components/dashboard/RecentIncidentsList';
import { RecentNotificationsCard } from '../../components/dashboard/RecentNotificationsCard';
import { motion } from 'framer-motion';

export const DashboardPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-6 pb-12"
    >
      {/* Welcome Banner */}
      <WelcomeSection />

      {/* Safety Status Banner */}
      <SafetyStatusBanner />

      {/* Hero 🚨 REPORT AN EMERGENCY Card */}
      <EmergencyActionCard />

      {/* Student Statistics (Active, Resolved, Total) */}
      <StatsOverview />

      {/* Recent Incidents and Notifications Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentIncidentsList />
        </div>
        <div className="lg:col-span-1">
          <RecentNotificationsCard />
        </div>
      </div>
    </motion.div>
  );
};
