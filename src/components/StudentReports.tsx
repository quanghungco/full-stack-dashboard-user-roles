"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Eye, Download, Plus } from "lucide-react";

const StudentReports = () => {
  const [selectedStudent, setSelectedStudent] = useState("");
  const [comments, setComments] = useState<{[key: number]: string}>({});
  const [newComment, setNewComment] = useState("");

  const students = [
    { id: 1, name: "John Smith", class: "Grade 10A" },
    { id: 2, name: "Jane Doe", class: "Grade 9B" },
    { id: 3, name: "Mike Johnson", class: "Grade 11A" }
  ];

  const reports = [
    {
      id: 1,
      studentId: 1,
      studentName: "John Smith",
      subject: "Mathematics",
      term: "Term 1",
      grade: "A-",
      percentage: 88,
      date: "2024-01-30",
      status: "Completed",
      hasComments: true
    },
    {
      id: 2,
      studentId: 1,
      studentName: "John Smith", 
      subject: "English",
      term: "Term 1",
      grade: "B+",
      percentage: 82,
      date: "2024-01-30",
      status: "Completed",
      hasComments: false
    },
    {
      id: 3,
      studentId: 2,
      studentName: "Jane Doe",
      subject: "Science",
      term: "Term 1", 
      grade: "A",
      percentage: 95,
      date: "2024-01-30",
      status: "Completed",
      hasComments: false
    }
  ];

  const handleAddComment = (reportId: number) => {
    if (newComment.trim()) {
      setComments({
        ...comments,
        [reportId]: newComment
      });
      setNewComment("");
    }
  };

  const getGradeBadge = (grade: string) => {
    const gradeColors: {[key: string]: string} = {
      'A': 'bg-green-500',
      'A-': 'bg-green-400', 
      'B+': 'bg-blue-500',
      'B': 'bg-blue-400',
      'C+': 'bg-yellow-500',
      'C': 'bg-yellow-400',
      'D': 'bg-red-400',
      'F': 'bg-red-500'
    };
    
    const colorClass = gradeColors[grade] || 'bg-gray-500';
    return <Badge className={colorClass}>{grade}</Badge>;
  };

  const filteredReports = selectedStudent 
    ? reports.filter(report => report.studentId === parseInt(selectedStudent))
    : reports;

  return (
    <div className="space-y-6">
      {/* Filter Section */}
      <Card>
        <CardHeader>
          <CardTitle>Student Reports Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-end">
            <div className="grid gap-2">
              <Label>Filter by Student</Label>
              <Select onValueChange={setSelectedStudent}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="All Students" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Students</SelectItem>
                  {students.map((student) => (
                    <SelectItem key={student.id} value={student.id.toString()}>
                      {student.name} - {student.class}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>Academic Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Term</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Percentage</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Comments</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.studentName}</TableCell>
                  <TableCell>{report.subject}</TableCell>
                  <TableCell>{report.term}</TableCell>
                  <TableCell>{getGradeBadge(report.grade)}</TableCell>
                  <TableCell>{report.percentage}%</TableCell>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>
                    {report.hasComments || comments[report.id] ? (
                      <Badge variant="default" className="bg-blue-500">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Has Comments
                      </Badge>
                    ) : (
                      <Badge variant="outline">No Comments</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add Comment - {report.studentName}</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label>Report Details</Label>
                              <div className="p-3 bg-gray-50 rounded-md">
                                <p><strong>Subject:</strong> {report.subject}</p>
                                <p><strong>Term:</strong> {report.term}</p>
                                <p><strong>Grade:</strong> {report.grade} ({report.percentage}%)</p>
                              </div>
                            </div>
                            {comments[report.id] && (
                              <div className="grid gap-2">
                                <Label>Current Comment</Label>
                                <div className="p-3 bg-blue-50 rounded-md">
                                  <p>{comments[report.id]}</p>
                                </div>
                              </div>
                            )}
                            <div className="grid gap-2">
                              <Label>Add/Update Comment</Label>
                              <Textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Enter your comment about this student's performance..."
                                rows={4}
                              />
                            </div>
                            <Button onClick={() => handleAddComment(report.id)}>
                              <Plus className="h-4 w-4 mr-2" />
                              Add Comment
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
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

export default StudentReports;
