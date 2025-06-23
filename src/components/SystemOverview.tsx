
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/badge";
import { Activity, Database, Shield, Users, AlertTriangle, CheckCircle } from "lucide-react";

const SystemOverview = () => {
  const systemMetrics = [
    { label: "System Uptime", value: "99.9%", status: "healthy", icon: Activity },
    { label: "Database Status", value: "Connected", status: "healthy", icon: Database },
    { label: "Security Level", value: "High", status: "healthy", icon: Shield },
    { label: "Active Sessions", value: "1,234", status: "normal", icon: Users },
  ];

  const recentActivities = [
    { action: "New user registration", user: "John Smith", time: "2 minutes ago", type: "info" },
    { action: "Role assignment", user: "Jane Doe - Teacher", time: "5 minutes ago", type: "success" },
    { action: "System backup completed", user: "System", time: "1 hour ago", type: "success" },
    { action: "Failed login attempt", user: "Unknown", time: "2 hours ago", type: "warning" },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* System Metrics */}
      <div className="lg:col-span-2 space-y-4">
        <h3 className="text-lg font-semibold">System Health</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {systemMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">{metric.value}</div>
                    <Badge variant={metric.status === 'healthy' ? 'default' : 'secondary'}>
                      {metric.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recent Activities</h3>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">System Log</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {activity.type === 'success' && <CheckCircle className="h-4 w-4 text-green-500" />}
                  {activity.type === 'warning' && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                  {activity.type === 'info' && <Activity className="h-4 w-4 text-blue-500" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.user}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SystemOverview;
