"use client";
import { useState } from "react";
import {
  ArrowLeft,
  Plus,
  Loader2,
  User,
  Mail,
  Phone,
  FileText,
  PenTool,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";

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

const API_URL = process.env.NEXT_PUBLIC_BLOGS;

export default function Component() {
  const [formData, setFormData] = useState<BlogForm>({
    title: "",
    content: "",
    email: "",
    phonenumber: "",
    author: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();

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
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    // Clear success message when form is modified
    if (successMessage) {
      setSuccessMessage("");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      email: "",
      phonenumber: "",
      author: "",
    });
    setErrors({});
    setSuccessMessage("");
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
      await fetch(`${API_URL}/blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSuccessMessage("Blog created successfully!");
      resetForm();

      // In your actual app, uncomment this for navigation:
      setTimeout(() => {
        router.push("/blogs");
      }, 1000);
    } catch (err: any) {
      console.error("Failed to create blog:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <PenTool className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Create New Blog Post
                </h1>
                <p className="text-gray-600">
                  Share your thoughts and ideas with the world
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
              <div>
                <p className="text-green-800 font-medium">{successMessage}</p>
                <p className="text-green-700 text-sm">
                  You can create another blog post or go back to the blog list.
                </p>
              </div>
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
              onChange={(e) => handleInputChange("title", e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                errors.title
                  ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
              } focus:outline-none focus:ring-2`}
              placeholder="Enter an engaging title for your blog post..."
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
              onChange={(e) => handleInputChange("content", e.target.value)}
              rows={10}
              className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                errors.content
                  ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
              } focus:outline-none focus:ring-2 resize-vertical`}
              placeholder="Write your blog content here... Share your insights, experiences, and knowledge with your readers."
            />
            <div className="mt-2 text-xs text-gray-500">
              {formData.content.length} characters
            </div>
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
                onChange={(e) => handleInputChange("author", e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                  errors.author
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                } focus:outline-none focus:ring-2`}
                placeholder="Your full name"
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
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                  errors.email
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                } focus:outline-none focus:ring-2`}
                placeholder="your.email@example.com"
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
              onChange={(e) => handleInputChange("phonenumber", e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                errors.phonenumber
                  ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
              } focus:outline-none focus:ring-2`}
              placeholder="1234567890"
            />
            <div className="mt-1 text-xs text-gray-500">
              Enter 10-15 digits without spaces or special characters
            </div>
            {errors.phonenumber && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.phonenumber}
              </p>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear Form
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleSubmit}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white font-medium transition-colors ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Blog Post...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Create Blog Post
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            📝 Writing Tips
          </h3>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
              Choose a compelling title that clearly describes your topic
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
              Structure your content with clear paragraphs and logical flow
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
              Include examples and personal insights to engage readers
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
              Proofread your content before publishing
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
