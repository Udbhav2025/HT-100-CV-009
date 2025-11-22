import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Search, User, Mail, Phone, Image, Upload as UploadIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { apiService } from "@/services/api";
import { PhotoUpload } from "@/components/PhotoUpload";
import { toast } from "sonner";

interface Student {
  student_id: string;
  name: string;
  email?: string;
  phone?: string;
  photoCount?: number;
}

const Students = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newStudent, setNewStudent] = useState({
    student_id: "",
    name: "",
    email: "",
    phone: "",
  });
  const { hasRole } = useAuth();
  
  const canEdit = hasRole(["admin", "teacher"]);

  // Fetch students from API
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await apiService.getAllStudents();
      if (response.success) {
        // Fetch photos for each student
        const studentsWithPhotos = await Promise.all(
          (response.data || []).map(async (student: Student) => {
            try {
              const photosResponse = await apiService.getStudentPhotos(student.student_id);
              return {
                ...student,
                photoCount: photosResponse.data?.length || 0
              };
            } catch {
              return { ...student, photoCount: 0 };
            }
          })
        );
        setStudents(studentsWithPhotos);
      }
    } catch (error) {
      toast.error("Failed to load students");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStudent = async () => {
    try {
      await apiService.createStudent(newStudent);
      toast.success("Student added successfully!");
      setShowAddDialog(false);
      setNewStudent({ student_id: "", name: "", email: "", phone: "" });
      fetchStudents();
    } catch (error: any) {
      toast.error(error.message || "Failed to add student");
    }
  };

  const handlePhotoUploadSuccess = () => {
    toast.success("Photo uploaded!");
    fetchStudents();
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.student_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Student Management</h1>
            <p className="text-muted-foreground">
              {canEdit ? "Manage student profiles and photos" : "View student profiles"}
            </p>
          </div>
          {canEdit && (
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Student
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Student</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label htmlFor="student_id">Student ID</Label>
                    <Input
                      id="student_id"
                      placeholder="STU001"
                      value={newStudent.student_id}
                      onChange={(e) => setNewStudent({ ...newStudent, student_id: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={newStudent.name}
                      onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@school.com"
                      value={newStudent.email}
                      onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      placeholder="+1234567890"
                      value={newStudent.phone}
                      onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                    />
                  </div>
                  <Button onClick={handleAddStudent} className="w-full">
                    Add Student
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Search Bar */}
        <Card className="mb-6 shadow-sm">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search students by name, ID, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Students Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading students...</p>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No students found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredStudents.map((student) => (
              <Card key={student.student_id} className="shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    {/* Avatar */}
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <User className="w-10 h-10 text-primary" />
                    </div>

                    {/* Student Info */}
                    <h3 className="font-semibold text-lg mb-1">{student.name}</h3>
                    <Badge variant="secondary" className="mb-3">
                      {student.student_id}
                    </Badge>

                    <div className="w-full space-y-2 text-sm text-muted-foreground mb-4">
                      {student.email && (
                        <div className="flex items-center justify-center gap-2">
                          <Mail className="w-4 h-4" />
                          <span className="truncate">{student.email}</span>
                        </div>
                      )}
                      {student.phone && (
                        <div className="flex items-center justify-center gap-2">
                          <Phone className="w-4 h-4" />
                          <span>{student.phone}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-center gap-2">
                        <Image className="w-4 h-4" />
                        <span>{student.photoCount || 0} photos</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="w-full flex gap-2">
                      {canEdit && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex-1"
                              onClick={() => setSelectedStudent(student)}
                            >
                              <UploadIcon className="w-4 h-4 mr-1" />
                              Photos
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Upload Photos for {student.name}</DialogTitle>
                            </DialogHeader>
                            <PhotoUpload 
                              studentId={student.student_id}
                              onUploadSuccess={handlePhotoUploadSuccess}
                            />
                          </DialogContent>
                        </Dialog>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => {
                          // View student details
                          toast.info("View details coming soon");
                        }}
                      >
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Students;
