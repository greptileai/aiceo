import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function EmployeeDashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Synergy Maximization</CardTitle>
          <CardDescription>Cross-functional collaboration goal</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">110% 🚀</p>
          <p className="text-sm text-muted-foreground">Because 100% is not enough!</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Coffee Consumption</CardTitle>
          <CardDescription>Fuel for innovation</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">∞ cups/day ☕</p>
          <p className="text-sm text-muted-foreground">Keep that creativity flowing!</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Meetings Attended</CardTitle>
          <CardDescription>Collaboration metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">25/8 📅</p>
          <p className="text-sm text-muted-foreground">Time is just a concept, right?</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Inbox Zero</CardTitle>
          <CardDescription>Email management efficiency</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">-100 📧</p>
          <p className="text-sm text-muted-foreground">Negative emails = future productivity!</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Work-Life Balance</CardTitle>
          <CardDescription>Harmony achievement index</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">50/50 ⚖️</p>
          <p className="text-sm text-muted-foreground">50% work, 50% work from home</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Innovation Quotient</CardTitle>
          <CardDescription>Thinking outside the box score</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">🔲🚫</p>
          <p className="text-sm text-muted-foreground">Box? What box?</p>
        </CardContent>
      </Card>
    </div>
  )
}

