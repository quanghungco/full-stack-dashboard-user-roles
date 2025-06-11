"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Eye } from "lucide-react";

const StudentManager = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@email.com",
      class: "Grade 10A",
      status: "Active",
      dateAdded: "2024-01-15",
      parentContact: "+1234567890"
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "jane.doe@email.com", 
      class: "Grade 9B",
      status: "Active",
      dateAdded: "2024-01-20",
      parentContact: "+1234567891"
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@email.com",
      class: "Grade 11A",
      status: "Inactive",
      dateAdded: "2024-02-01",
      parentContact: "+1234567892"
    }
  ]);

  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    class: "",
    parentContact: ""
  });

  const handleAddStudent = () => {
    const student = {
      id: Date.now(),
      ...newStudent,
      status: "Active",
      dateAdded: new Date().toISOString().split('T')[0]
    };
    setStudents([...students, student]);
    setNewStudent({ name: "", email: "", class: "", parentContact: "" });
  };

  const handleDeleteStudent = (id: number) => {
    setStudents(students.filter(student => student.id !== id));
  };

  const getStatusBadge = (status: string) => {
    return status === "Active" 
      ? <Badge variant="default" className="bg-green-500">Active</Badge>
      : <Badge variant="secondary">Inactive</Badge>;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Student Management</CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Student
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                    placeholder="Enter student's full name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newStudent.email}
                    onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                    placeholder="Enter student's email"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="class">Class</Label>
                  <Select onValueChange={(value: any) => {
                                      return setNewStudent({ ...newStudent, class: value });
                                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Grade 9A">Grade 9A</SelectItem>
                      <SelectItem value="Grade 9B">Grade 9B</SelectItem>
                      <SelectItem value="Grade 10A">Grade 10A</SelectItem>
                      <SelectItem value="Grade 10B">Grade 10B</SelectItem>
                      <SelectItem value="Grade 11A">Grade 11A</SelectItem>
                      <SelectItem value="Grade 11B">Grade 11B</SelectItem>
                      <SelectItem value="Grade 12A">Grade 12A</SelectItem>
                      <SelectItem value="Grade 12B">Grade 12B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="parent">Parent Contact</Label>
                  <Input
                    id="parent"
                    value={newStudent.parentContact}
                    onChange={(e) => setNewStudent({...newStudent, parentContact: e.target.value})}
                    placeholder="Enter parent's phone number"
                  />
                </div>
                <Button onClick={handleAddStudent} className="w-full">
                  Add Student
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Parent Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>{student.parentContact}</TableCell>
                  <TableCell>{getStatusBadge(student.status)}</TableCell>
                  <TableCell>{student.dateAdded}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteStudent(student.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentManager;
