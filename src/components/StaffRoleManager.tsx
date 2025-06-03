import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { User, UserPlus, Settings, Edit, Trash2 } from "lucide-react";

interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

interface Role {
  id: string;
  name: string;
  permissions: string[];
  department: string;
}

const StaffRoleManager = () => {
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@school.com",
      role: "Teacher",
      department: "Mathematics",
      status: "active",
      joinDate: "2024-01-15"
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@school.com",
      role: "Academic Head",
      department: "Administration",
      status: "active",
      joinDate: "2023-08-20"
    }
  ]);

  const [roles, setRoles] = useState<Role[]>([
    { id: "1", name: "Teacher", permissions: ["view_students", "grade_assignments"], department: "Academic" },
    { id: "2", name: "Teaching Assistant", permissions: ["view_students", "assist_classes"], department: "Academic" },
    { id: "3", name: "Matron", permissions: ["view_students", "medical_records"], department: "Welfare" },
    { id: "4", name: "Trainer", permissions: ["view_students", "sports_management"], department: "Sports" },
    { id: "5", name: "Administrator", permissions: ["view_all", "manage_system"], department: "Administration" },
    { id: "6", name: "Accountant", permissions: ["view_finance", "manage_payments"], department: "Finance" },
    { id: "7", name: "Academic Head", permissions: ["view_all", "academic_oversight"], department: "Academic" },
    { id: "8", name: "HR Manager", permissions: ["view_staff", "manage_hr"], department: "Human Resources" },
    { id: "9", name: "Steward", permissions: ["view_facilities", "manage_facilities"], department: "Facilities" }
  ]);

  const [newRoleName, setNewRoleName] = useState("");
  const [newRoleDepartment, setNewRoleDepartment] = useState("");
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [newStaffRole, setNewStaffRole] = useState("");

  const addNewRole = () => {
    if (newRoleName && newRoleDepartment) {
      const newRole: Role = {
        id: Date.now().toString(),
        name: newRoleName,
        permissions: [],
        department: newRoleDepartment
      };
      setRoles([...roles, newRole]);
      setNewRoleName("");
      setNewRoleDepartment("");
    }
  };

  const assignRole = (staffId: string, newRole: string) => {
    setStaffMembers(prev => 
      prev.map(staff => 
        staff.id === staffId ? { ...staff, role: newRole } : staff
      )
    );
  };

  const departments = ["Academic", "Administration", "Finance", "Human Resources", "Welfare", "Sports", "Facilities"];

  return (
    <div className="space-y-6">
      {/* Staff Overview Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{staffMembers.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Roles</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roles.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{departments.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Staff Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Staff Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {staffMembers.map((staff) => (
                  <TableRow key={staff.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{staff.name}</div>
                        <div className="text-sm text-muted-foreground">{staff.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{staff.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={staff.status === 'active' ? 'default' : 'destructive'}>
                        {staff.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedStaff(staff)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Assign Role to {staff.name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="role-select">Select Role</Label>
                              <Select value={newStaffRole} onValueChange={setNewStaffRole}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                <SelectContent>
                                  {roles.map((role) => (
                                    <SelectItem key={role.id} value={role.name}>
                                      {role.name} - {role.department}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <Button 
                              onClick={() => {
                                if (selectedStaff && newStaffRole) {
                                  assignRole(selectedStaff.id, newStaffRole);
                                  setNewStaffRole("");
                                  setSelectedStaff(null);
                                }
                              }}
                              className="w-full"
                            >
                              Assign Role
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Role Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Role Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Add New Role */}
            <div className="border rounded-lg p-4 space-y-3">
              <h4 className="font-medium">Add New Role</h4>
              <div className="grid gap-2">
                <Label htmlFor="role-name">Role Name</Label>
                <Input
                  id="role-name"
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  placeholder="Enter role name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="department">Department</Label>
                <Select value={newRoleDepartment} onValueChange={setNewRoleDepartment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={addNewRole} className="w-full">
                Add Role
              </Button>
            </div>

            {/* Existing Roles */}
            <div className="space-y-2">
              <h4 className="font-medium">Existing Roles</h4>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {roles.map((role) => (
                  <div key={role.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <div className="font-medium">{role.name}</div>
                      <div className="text-sm text-muted-foreground">{role.department}</div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StaffRoleManager;
