// =====================================================
// CONTOH INTEGRASI SUPABASE DI REACT COMPONENTS
// =====================================================
// File ini berisi contoh-contoh cara menggunakan Supabase
// di berbagai component React

import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

// =====================================================
// 1. SETUP SUPABASE CLIENT
// =====================================================
// File: src/lib/supabase.ts

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// =====================================================
// 2. CUSTOM HOOKS
// =====================================================

// Hook untuk fetch services
export function useServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchServices() {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('is_active', true)
          .order('display_order');

        if (error) throw error;
        setServices(data || []);
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, []);

  return { services, loading, error };
}

// Hook untuk fetch blog posts
export function useBlogPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('is_published', true)
          .order('published_date', { ascending: false });

        if (error) throw error;
        setPosts(data || []);
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching blog posts:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return { posts, loading, error };
}

// Hook untuk fetch testimonials
export function useTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .order('display_order');

        if (error) throw error;
        setTestimonials(data || []);
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching testimonials:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  return { testimonials, loading, error };
}

// Hook untuk fetch FAQs
export function useFAQs() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFAQs() {
      try {
        const { data, error } = await supabase
          .from('faqs')
          .select('*')
          .eq('is_published', true)
          .order('display_order');

        if (error) throw error;
        setFaqs(data || []);
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching FAQs:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchFAQs();
  }, []);

  return { faqs, loading, error };
}

// Hook untuk fetch gallery
export function useGallery(category?: string) {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchGallery() {
      try {
        let query = supabase
          .from('gallery')
          .select('*')
          .order('display_order');

        if (category) {
          query = query.eq('category', category);
        }

        const { data, error } = await query;

        if (error) throw error;
        setGallery(data || []);
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching gallery:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchGallery();
  }, [category]);

  return { gallery, loading, error };
}

// =====================================================
// 3. EXAMPLE COMPONENTS
// =====================================================

// Component: Services List
export function ServicesList() {
  const { services, loading, error } = useServices();

  if (loading) {
    return <div className="text-center py-8">Loading services...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <div key={service.id} className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-3">{service.title}</h3>
          <p className="text-gray-600">{service.description}</p>
        </div>
      ))}
    </div>
  );
}

// Component: Blog Posts
export function BlogPostsList() {
  const { posts, loading, error } = useBlogPosts();

  if (loading) {
    return <div className="text-center py-8">Loading blog posts...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <span className="text-sm text-blue-600 font-medium">{post.category}</span>
            <h3 className="text-xl font-bold mt-2 mb-3">{post.title}</h3>
            <p className="text-gray-600">{post.excerpt}</p>
            <div className="mt-4 text-sm text-gray-500">
              {new Date(post.published_date).toLocaleDateString('id-ID')}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

// Component: Testimonials
export function TestimonialsList() {
  const { testimonials, loading, error } = useTestimonials();

  if (loading) {
    return <div className="text-center py-8">Loading testimonials...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((testimonial) => (
        <div key={testimonial.id} className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <img
              src={testimonial.img_src}
              alt={testimonial.name}
              className="w-16 h-16 rounded-full object-cover mr-4"
            />
            <div>
              <h4 className="font-bold">{testimonial.name}</h4>
              <p className="text-sm text-gray-600">{testimonial.company}</p>
            </div>
          </div>
          <div className="flex mb-3">
            {[...Array(testimonial.rating)].map((_, i) => (
              <span key={i} className="text-yellow-400">★</span>
            ))}
          </div>
          <p className="text-gray-700 italic">"{testimonial.quote}"</p>
        </div>
      ))}
    </div>
  );
}

// =====================================================
// 4. CONTACT FORM WITH SUPABASE
// =====================================================

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    subject: 'Konsultasi Umum'
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([formData]);

      if (error) throw error;

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        subject: 'Konsultasi Umum'
      });

      // Auto hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Hubungi Kami</h2>

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Pesan berhasil dikirim! Kami akan segera menghubungi Anda.
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Nama *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Email *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Telepon</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Perusahaan</label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Subjek</label>
        <select
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option>Konsultasi Umum</option>
          <option>Penyusunan Kontrak</option>
          <option>Audit Kontrak</option>
          <option>Mitigasi Risiko</option>
          <option>Pendampingan Hukum</option>
          <option>Lainnya</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Pesan *</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Mengirim...' : 'Kirim Pesan'}
      </button>
    </form>
  );
}

// =====================================================
// 5. ADMIN FUNCTIONS (Require Authentication)
// =====================================================

// Function: Add new blog post
export async function addBlogPost(postData: any) {
  const { data, error } = await supabase
    .from('blog_posts')
    .insert([postData])
    .select();

  if (error) {
    console.error('Error adding blog post:', error);
    throw error;
  }

  return data;
}

// Function: Update service
export async function updateService(id: string, updates: any) {
  const { data, error } = await supabase
    .from('services')
    .update(updates)
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error updating service:', error);
    throw error;
  }

  return data;
}

// Function: Delete testimonial
export async function deleteTestimonial(id: string) {
  const { error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting testimonial:', error);
    throw error;
  }

  return true;
}

// Function: Get contact submissions (admin only)
export async function getContactSubmissions(status?: string) {
  let query = supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false });

  if (status) {
    query = query.eq('status', status);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching contact submissions:', error);
    throw error;
  }

  return data;
}

// Function: Update contact submission status
export async function updateContactStatus(id: string, status: string, notes?: string) {
  const updates: any = { status };
  if (notes) updates.notes = notes;

  const { error } = await supabase
    .from('contact_submissions')
    .update(updates)
    .eq('id', id);

  if (error) {
    console.error('Error updating contact status:', error);
    throw error;
  }

  return true;
}

// =====================================================
// 6. AUTHENTICATION HELPERS
// =====================================================

// Sign in
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    console.error('Error signing in:', error);
    throw error;
  }

  return data;
}

// Sign out
export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Error signing out:', error);
    throw error;
  }

  return true;
}

// Get current user
export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) {
    console.error('Error getting user:', error);
    throw error;
  }

  return user;
}

// Check if user is authenticated
export async function isAuthenticated() {
  const { data: { session } } = await supabase.auth.getSession();
  return !!session;
}

// =====================================================
// 7. REAL-TIME SUBSCRIPTIONS (Advanced)
// =====================================================

// Subscribe to new contact submissions
export function subscribeToContactSubmissions(callback: (payload: any) => void) {
  const channel = supabase
    .channel('contact-submissions-changes')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'contact_submissions'
      },
      callback
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

// Example usage:
// const unsubscribe = subscribeToContactSubmissions((payload) => {
//   console.log('New contact submission:', payload.new);
//   // Show notification or update UI
// });
// 
// // Cleanup when component unmounts
// return () => unsubscribe();

// =====================================================
// 8. USAGE EXAMPLES IN COMPONENTS
// =====================================================

/*
// Example 1: Services Page
import { ServicesList } from './supabase-integration-example';

function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Layanan Kami</h1>
      <ServicesList />
    </div>
  );
}

// Example 2: Blog Page
import { BlogPostsList } from './supabase-integration-example';

function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog & Artikel</h1>
      <BlogPostsList />
    </div>
  );
}

// Example 3: Contact Page
import { ContactForm } from './supabase-integration-example';

function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <ContactForm />
    </div>
  );
}

// Example 4: Admin Dashboard
import { getContactSubmissions } from './supabase-integration-example';

function AdminDashboard() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    async function loadSubmissions() {
      const data = await getContactSubmissions('new');
      setSubmissions(data);
    }
    loadSubmissions();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Contact Submissions</h1>
      <div className="space-y-4">
        {submissions.map((sub) => (
          <div key={sub.id} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold">{sub.name}</h3>
            <p className="text-sm text-gray-600">{sub.email}</p>
            <p className="mt-2">{sub.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
*/
