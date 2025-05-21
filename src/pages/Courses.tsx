import { useState } from "react";
import { Plus, Edit, Trash2, X, Star, MoreHorizontal } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Course {
  id: string;
  title: string;
  category: string;
  price: string;
  students: number;
  status: "active" | "draft" | "completed";
  rating: number;
  instructor: string;
}

const initialCoursesData: Course[] = [
  {
    id: "1",
    title: "Introduction to Business Analytics",
    category: "Analytics",
    price: "$129.99",
    students: 1234,
    status: "active",
    rating: 4.8,
    instructor: "Dr. John Smith",
  },
  {
    id: "2",
    title: "Data Visualization with Tableau",
    category: "Data Science",
    price: "$89.99",
    students: 856,
    status: "active",
    rating: 4.5,
    instructor: "Sarah Johnson",
  },
  {
    id: "3",
    title: "Statistical Analysis with R",
    category: "Statistics",
    price: "$99.99",
    students: 571,
    status: "draft",
    rating: 4.2,
    instructor: "Dr. Michael Lee",
  },
  {
    id: "4",
    title: "Machine Learning Fundamentals",
    category: "AI & ML",
    price: "$149.99",
    students: 1578,
    status: "completed",
    rating: 4.9,
    instructor: "Prof. Emily Chen",
  },
  {
    id: "5",
    title: "Advanced Excel for Business",
    category: "Business",
    price: "$79.99",
    students: 2145,
    status: "active",
    rating: 4.7,
    instructor: "Robert Wilson",
  },
];

const getStatusColor = (status: string) => {
  switch(status) {
    case "active": return "bg-green-100 text-green-800";
    case "draft": return "bg-yellow-100 text-yellow-800";
    case "completed": return "bg-blue-100 text-blue-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>(initialCoursesData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    students: 0,
    status: "draft" as "active" | "draft" | "completed",
    rating: 0,
    instructor: ""
  });

  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      price: "",
      students: 0,
      status: "draft",
      rating: 0,
      instructor: ""
    });
    setEditingCourse(null);
  };

  const openAddDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = (course: Course) => {
    setFormData({
      title: course.title,
      category: course.category,
      price: course.price,
      students: course.students,
      status: course.status,
      rating: course.rating,
      instructor: course.instructor
    });
    setEditingCourse(course);
    setIsDialogOpen(true);
    setActiveDropdown(null);
  };

  const handleSubmit = () => {
    if (!formData.title.trim() || !formData.category.trim() || !formData.instructor.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    if (editingCourse) {
      setCourses(courses.map(course => 
        course.id === editingCourse.id 
          ? { ...course, ...formData }
          : course
      ));
    } else {
      const newCourse: Course = {
        ...formData,
        id: Date.now().toString()
      };
      setCourses([...courses, newCourse]);
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (courseId: string) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter(course => course.id !== courseId));
      setActiveDropdown(null);
    }
  };

  const toggleDropdown = (courseId: string) => {
    setActiveDropdown(activeDropdown === courseId ? null : courseId);
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">All Courses</h1>
          <p className="text-gray-500">Manage your course catalog</p>
        </div>
        <Button 
          className="bg-academize-orange hover:bg-academize-orange/90"
          onClick={openAddDialog}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Course
        </Button>
      </div>
      
      {/* Courses Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead className="w-[70px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.title}</TableCell>
                  <TableCell>{course.category}</TableCell>
                  <TableCell>{course.price}</TableCell>
                  <TableCell>{course.students.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="font-medium">{course.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(course.status)}>
                      {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{course.instructor}</TableCell>
                  <TableCell>
                    <div className="relative">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => toggleDropdown(course.id)}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                      
                      {activeDropdown === course.id && (
                        <div className="absolute right-0 z-10 mt-2 w-36 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1" role="none">
                            <button
                              onClick={() => openEditDialog(course)}
                              className="text-gray-700 flex w-full items-center px-4 py-2 text-sm hover:bg-gray-100"
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(course.id)}
                              className="text-red-600 flex w-full items-center px-4 py-2 text-sm hover:bg-gray-100"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Course Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                {editingCourse ? "Edit Course" : "Add New Course"}
              </h3>
              <button 
                onClick={() => setIsDialogOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter course title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter course category"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price
                </label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="$99.99"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Students
                </label>
                <input
                  type="number"
                  value={formData.students}
                  onChange={(e) => setFormData({...formData, students: parseInt(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating (0-5)
                </label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={(e) => setFormData({...formData, rating: parseFloat(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="4.5"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value as "active" | "draft" | "completed"})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Instructor *
                </label>
                <input
                  type="text"
                  value={formData.instructor}
                  onChange={(e) => setFormData({...formData, instructor: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter instructor name"
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button 
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmit}
                  className="flex-1 bg-academize-orange hover:bg-academize-orange/90"
                >
                  {editingCourse ? "Update Course" : "Submit"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Courses;
          