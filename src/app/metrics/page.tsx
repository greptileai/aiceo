'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CEODashboard } from "@/components/dashboards/ceo-dashboard"
import { InvestorDashboard } from "@/components/dashboards/investor-dashboard"
import { EmployeeDashboard } from "@/components/dashboards/employee-dashboard"

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Company Metrics Dashboard</h1>
      <Tabs defaultValue="ceo" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="ceo">CEO Mode</TabsTrigger>
          <TabsTrigger value="investor">Investor Mode</TabsTrigger>
          <TabsTrigger value="employee">Employee Mode</TabsTrigger>
        </TabsList>
        <TabsContent value="ceo">
          <CEODashboard />
        </TabsContent>
        <TabsContent value="investor">
          <InvestorDashboard />
        </TabsContent>
        <TabsContent value="employee">
          <EmployeeDashboard />
        </TabsContent>
      </Tabs>
    </div>
  )
}

