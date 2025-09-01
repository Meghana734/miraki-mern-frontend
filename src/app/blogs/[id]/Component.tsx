"use client";
import { useEffect, useState } from "react";
import { ArrowLeft, Save, Loader2, User, Mail, Phone, FileText, Edit3, AlertCircle, CheckCircle } from "lucide-react";

interface BlogForm {
  title: string;
  content: string;
  email: string;
  phonenumber?: string;
  author: string;
}

interface FormErrors {
  title?: string;
  content?: string;
  email?: string;
  phonenumber?: string;
  author?: string;
}

export default function Component({ id = "sample-blog-id" }: { id?: string }) {
  const [formData, setFormData] = useState<BlogForm>({
    title: "",
    content: "",
    email: "",
    phonenumber: "",
    author: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Mock data for demonstration
  useEffect(() => {
    async function fetchBlog() {
      setIsLoading(true);
      try {
        // In your actual app, replace this with your API call:
        // const res = await fetch(`${API_URL}/blogs/${id}`);
        // const data = await res.json();
        
        // Simulating API call with delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockData = {
          title: "Getting Started with React Hooks",
          content: "React Hooks are a powerful feature that allows you to use state and other React features without writing a class component. In this comprehensive guide, we'll explore the most commonly used hooks and learn how to implement them in your applications. We'll start with useState, which is the most basic hook for managing local state in functional components.",
          email: "john.doe@example.com",
          phonenumber: "1234567890",
          author: "John Doe"
        };
        
        setFormData(mockData);
      } catch (err: any) {
        console.error("Failed to load blog:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBlog();
  }, [id]);

  const validateForm = (data: BlogForm): FormErrors => {
    const newErrors: FormErrors = {};

    if (!data.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!data.content.trim()) {
      newErrors.content = "Content is required";
    }

    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Invalid email format";
    }

    if (data.phonenumber && !/^[0-9]{10,15}$/.test(data.phonenumber)) {
      newErrors.phonenumber = "Phone number must be 10–15 digits";
    }

    if (!data.author.trim()) {
      newErrors.author = "Author is required";
    }

    return newErrors;
  };

  const handleInputChange = (field: keyof BlogForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    // Clear success message when form is modified
    if (successMessage) {
      setSuccessMessage("");
    }
  };

  const handleSubmit = async () => {
    
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      // In your actual app, uncomment this:
      // await fetch(`${API_URL}/blogs/${id}`, {
      //   method: 'PATCH',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });
      
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccessMessage("Blog updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err: any) {
      console.error("Failed to update blog:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center max-w-md w-full mx-4">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading Blog</h3>
          <p className="text-gray-600">Please wait while we fetch the blog details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <header className="mb-8">
          <button className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Blogs
          </button>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Edit3 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Update Blog Post</h1>
                <p className="text-gray-600">Edit your blog post details below</p>
              </div>
            </div>
          </div>
        </header>

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
              <p className="text-green-800 font-medium">{successMessage}</p>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          {/* Title Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="w-4 h-4 inline mr-2" />
              Blog Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                errors.title 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
              } focus:outline-none focus:ring-2`}
              placeholder="Enter your blog title..."
            />
            {errors.title && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.title}
              </p>
            )}
          </div>

          {/* Content Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="w-4 h-4 inline mr-2" />
              Blog Content
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              rows={8}
              className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                errors.content 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
              } focus:outline-none focus:ring-2 resize-vertical`}
              placeholder="Write your blog content here..."
            />
            {errors.content && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.content}
              </p>
            )}
          </div>

          {/* Author and Email Row */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Author Name
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => handleInputChange('author', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                  errors.author 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                } focus:outline-none focus:ring-2`}
                placeholder="Author name"
              />
              {errors.author && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.author}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                  errors.email 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                } focus:outline-none focus:ring-2`}
                placeholder="author@example.com"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="w-4 h-4 inline mr-2" />
              Phone Number <span className="text-gray-500">(Optional)</span>
            </label>
            <input
              type="tel"
              value={formData.phonenumber}
              onChange={(e) => handleInputChange('phonenumber', e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                errors.phonenumber 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
              } focus:outline-none focus:ring-2`}
              placeholder="1234567890"
            />
            {errors.phonenumber && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.phonenumber}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-6 border-t">
            <button
              type="button"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              onClick={handleSubmit}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white font-medium transition-colors ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Updating Blog...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Update Blog Post
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}