"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Trash2,
  Edit,
  Plus,
  User,
  Mail,
  Phone,
  Calendar,
  X,
} from "lucide-react";

interface Blog {
  _id: string;
  title: string;
  content: string;
  email: string;
  phonenumber: string;
  author: string;
}

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  blogTitle: string;
}

function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  blogTitle,
}: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Delete Blog</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-medium text-gray-900">
                Are you sure?
              </h4>
              <p className="text-sm text-gray-500">
                This action cannot be undone.
              </p>
            </div>
          </div>
          <p className="text-gray-700 mb-6">
            You are about to delete the blog post{" "}
            <span className="font-semibold">"{blogTitle}"</span>. This will
            permanently remove it from the system.
          </p>
          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete Blog
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Component() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    blogId: string;
    blogTitle: string;
  }>({
    isOpen: false,
    blogId: "",
    blogTitle: "",
  });

  const API_URL = process.env.NEXT_PUBLIC_BLOGS;

  async function fetchBlogs() {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API_URL}/blogs`);
      setBlogs(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  }

  function openDeleteModal(id: string, title: string) {
    setDeleteModal({
      isOpen: true,
      blogId: id,
      blogTitle: title,
    });
  }

  function closeDeleteModal() {
    setDeleteModal({
      isOpen: false,
      blogId: "",
      blogTitle: "",
    });
  }

  async function handleDelete() {
    try {
      await axios.delete(`${API_URL}/blogs/${deleteModal.blogId}`);
      setBlogs(blogs.filter((blog) => blog._id !== deleteModal.blogId));
      closeDeleteModal();
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to delete blog");
    }
  }

  function truncateContent(content: string, maxLength: number = 200) {
    return content.length > maxLength
      ? content.slice(0, maxLength) + "..."
      : content;
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <>
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <header className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
                <p className="text-gray-600 mt-1">
                  Manage and view all your blog posts
                </p>
              </div>
              <a
                href="/blogs/create"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                <Plus className="w-5 h-5" />
                Create New Post
              </a>
            </div>
          </header>

          {/* Loading State */}
          {loading && (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading blogs...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mr-3">
                  <X className="w-4 h-4 text-red-600" />
                </div>
                <p className="text-red-800 font-medium">Error loading blogs</p>
              </div>
              <p className="text-red-600 mt-2 ml-9">{error}</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && blogs.length === 0 && (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No blogs found
              </h3>
              <p className="text-gray-600 mb-6">
                Get started by creating your first blog post
              </p>
              <a
                href="/blogs/create"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Create Your First Post
              </a>
            </div>
          )}

          {/* Blog Grid */}
          {!loading && !error && blogs.length > 0 && (
            <div className="grid gap-6">
              {blogs.map((blog) => (
                <article
                  key={blog._id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-200"
                >
                  <div className="p-6">
                    {/* Blog Title */}
                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {blog.title}
                    </h2>

                    {/* Blog Content Preview */}
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {truncateContent(blog.content)}
                    </p>

                    {/* Author Info */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4 pb-4 border-b border-gray-100">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span className="font-medium">{blog.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span>{blog.email}</span>
                      </div>
                      {blog.phonenumber && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          <span>{blog.phonenumber}</span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <a
                        href={`/blogs/${blog._id}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm font-medium"
                      >
                        <Edit className="w-4 h-4" />
                        Edit Post
                      </a>
                      <button
                        onClick={() => openDeleteModal(blog._id, blog.title)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        blogTitle={deleteModal.blogTitle}
      />
    </>
  );
}
