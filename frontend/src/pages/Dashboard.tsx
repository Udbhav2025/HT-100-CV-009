import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Square, Save, Camera, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Dashboard = () => {
  const [isMonitoring, setIsMonitoring] = useState(false);

  const handleStartMonitoring = () => {
    setIsMonitoring(true);
    toast.success("Monitoring started");
  };

  const handleStopMonitoring = () => {
    setIsMonitoring(false);
    toast.info("Monitoring stopped");
  };

  const handleSaveReport = () => {
    toast.success("Attendance report saved");
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Live Monitoring</h1>
          <p className="text-muted-foreground">Real-time classroom attendance tracking</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Present</p>
                  <p className="text-3xl font-bold text-success">24</p>
                </div>
                <div className="w-12 h-12 bg-success-light rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Suspicious</p>
                  <p className="text-3xl font-bold text-warning">3</p>
                </div>
                <div className="w-12 h-12 bg-warning-light rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total</p>
                  <p className="text-3xl font-bold text-primary">30</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Camera className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Camera Feed */}
          <div className="lg:col-span-2">
            <Card className="shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="w-5 h-5" />
                    Camera Feed
                  </CardTitle>
                  <Badge variant={isMonitoring ? "default" : "secondary"}>
                    {isMonitoring ? "Live" : "Stopped"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                  {isMonitoring ? (
                    <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/10 flex items-center justify-center">
                      <div className="text-center">
                        <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-4 animate-pulse" />
                        <p className="text-muted-foreground">Camera feed active</p>
                        <p className="text-sm text-muted-foreground/70">Detecting faces in real-time</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Camera feed stopped</p>
                      <p className="text-sm text-muted-foreground/70">Click start to begin monitoring</p>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 mt-4">
                  {!isMonitoring ? (
                    <Button onClick={handleStartMonitoring} className="flex-1" variant="success">
                      <Play className="w-4 h-4 mr-2" />
                      Start Monitoring
                    </Button>
                  ) : (
                    <Button onClick={handleStopMonitoring} className="flex-1" variant="danger">
                      <Square className="w-4 h-4 mr-2" />
                      Stop Monitoring
                    </Button>
                  )}
                  <Button onClick={handleSaveReport} variant="outline">
                    <Save className="w-4 h-4 mr-2" />
                    Save Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alerts Panel */}
          <div className="lg:col-span-1">
            <Card className="shadow-md h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Live Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-[500px] overflow-y-auto">
                  {/* Suspicious Alert */}
                  <div className="p-3 border border-warning/20 bg-warning-light rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-warning/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="w-5 h-5 text-warning" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">Challenge Pending</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          John Doe: Please turn your head left and right
                        </p>
                        <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>30s remaining</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Verified Alert */}
                  <div className="p-3 border border-success/20 bg-success-light rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-success" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">Verified</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Sarah Smith marked present
                        </p>
                        <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>Just now</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Warning Alert */}
                  <div className="p-3 border border-danger/20 bg-danger-light rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-danger/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="w-5 h-5 text-danger" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">Suspicious Activity</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Unknown face detected at desk 12
                        </p>
                        <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>2 min ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
