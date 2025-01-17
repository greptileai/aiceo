'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CEODashboard } from "@/components/dashboards/ceo-dashboard"
import { InvestorDashboard } from "@/components/dashboards/investor-dashboard"
import { EmployeeDashboard } from "@/components/dashboards/employee-dashboard"

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Company Metrics Dashboard</h1>
      <Tabs defaultValue="investor" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="investor">Investor Mode</TabsTrigger>
          <TabsTrigger value="ceo">CEO Mode</TabsTrigger>
        </TabsList>
        <TabsContent value="investor">
          <InvestorDashboard />
        </TabsContent>
        <TabsContent value="ceo">
          <CEODashboard />
        </TabsContent>
      </Tabs>
    </div>
  )
}

