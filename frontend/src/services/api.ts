// Interfaces matching backend JSON
export interface Announcement {
    id: number;
    title: string;
    description: string;
    date: string;
    link: string;
    image: string;
}

export interface AuditLog {
    id: number;
    action: string;
    details: string;
    user_name: string;
    user_role: string;
    timestamp: string;
}

export interface DashboardStats {
    users: number;
    blogs: number;
    news: number;
    subscribers: number;
    recent_activity: AuditLog[];
    user_activity: {
        comments_posted: number;
        days_active: number;
        articles_saved: number;
        articles_read: number;
    };
}

export interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    date: string;
    published_at?: string;
    image: string;
    author: string;
    author_role: string;
    category: string;
    featured: boolean;
    type: string;
    tags: string[];
    pdf_url?: string;
    is_draft?: boolean;
    action_text?: string;
    action_link?: string;
    secondary_download_url?: string;
    secondary_download_text?: string;
    readTime?: string;
}

export interface NewsItem extends BlogPost { }

export interface Initiative {
    id: number;
    title: string;
    slug: string;
    category: string;
    description: string;
    full_description: string;
    content: string;
    status: string;
    location: string;
    image: string;
    gallery: string[];
    activities: string[];
    stats: { label: string; value: string; }[];
    color: string;
}

export interface Resource {
    id: number;
    title: string;
    slug?: string;
    description: string;
    type: string;
    category: string;
    file_url: string;
    file_size: string;
    downloads: string;
    published_at: string;
    date: string;
    icon?: string;
}

export interface Job {
    id: number;
    created_at: string;
    slug?: string;
    call_for_application: string;
    location: string;
    application_deadline: string;
    type_of_contract: string;
    department: string;
    post_level: string;
    languages_required: string;
    duration_of_initial_contract: string;
    application_link?: string;
    about_yiaga: string;
    background: string;
    duties_and_responsibilities: string;
    competence: string;
    language_requirements_long: string;
    how_to_apply: string;
    is_active: boolean;
    type?: string; // "job" or "call"
    objectives?: string;
    expected_outcomes?: string;
    selection_criteria?: string;
    // content?: string; // For compatibility if needed
}

export interface VolunteerApplication {
    id: number;
    name: string;
    email: string;
    phone: string;
    occupation: string;
    location: string;
    skills: string;
    experience: string;
    department: string;
    interests: string;
    status: string;
    created_at: string;
}

export interface InternshipApplication {
    id: number;
    full_name: string;
    email: string;
    phone: string;
    qualification: string;
    level: string;
    duration: string;
    department: string;
    message: string;
    status: string;
    created_at: string;
}

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";
console.log("[API] Using base URL:", API_URL);


const getAuthHeaders = () => {
    // In a real app, use a more secure storage or httpOnly cookies
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
};

export const api = {
    // Auth
    login: async (email: string, password: string): Promise<any> => {
        console.log(`[API] Attempting login for: ${email} at ${API_URL}/login`);
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`[API] Login failed: ${response.status} ${response.statusText} - ${errorText}`);
                throw new Error("Invalid credentials");
            }
            const data = await response.json();
            console.log("[API] Login successful", data);
            return data;
        } catch (error) {
            console.error("[API] Login network/unexpected error:", error);
            throw error;
        }
    },

    signup: async (username: string, email: string, password: string): Promise<any> => {
        const response = await fetch(`${API_URL}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });
        if (!response.ok) {
            const txt = await response.text();
            throw new Error(txt || "Signup failed");
        }
        return await response.json();
    },

    getAnnouncements: async (): Promise<Announcement[]> => {
        const response = await fetch(`${API_URL}/announcements`);
        if (!response.ok) throw new Error("Failed to fetch announcements");
        return await response.json();
    },

    getBlogs: async (type?: string, category?: string): Promise<BlogPost[]> => {
        let url = `${API_URL}/blogs?`;
        if (type) url += `type=${type}&`;
        if (category && category !== "All") url += `category=${category}&`;

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch blogs");
        return await response.json();
    },

    getBlogBySlug: async (slug: string): Promise<BlogPost | undefined> => {
        const response = await fetch(`${API_URL}/blogs/${slug}`);
        if (!response.ok) return undefined;
        return await response.json();
    },

    getBlogById: async (id: number | string): Promise<BlogPost | undefined> => {
        const response = await fetch(`${API_URL}/blogs/id/${id}`);
        if (!response.ok) return undefined;
        return await response.json();
    },

    checkSlugUniqueness: async (slug: string, excludeId?: number): Promise<boolean> => {
        const params = new URLSearchParams({ slug });
        if (excludeId) params.set('exclude_id', String(excludeId));
        const url = `${API_URL}/blogs/check-slug?${params.toString()}`;
        const response = await fetch(url, { headers: getAuthHeaders() });
        if (!response.ok) return false;
        const data = await response.json();
        return data.available;
    },

    getNews: async (): Promise<NewsItem[]> => {
        return api.getBlogs("news");
    },

    getNewsBySlug: async (slug: string): Promise<NewsItem | undefined> => {
        return api.getBlogBySlug(slug);
    },

    getInitiatives: async (): Promise<Initiative[]> => {
        const response = await fetch(`${API_URL}/initiatives`);
        if (!response.ok) throw new Error("Failed to fetch initiatives");
        return await response.json();
    },

    getInitiativeBySlug: async (slug: string): Promise<Initiative | undefined> => {
        const response = await fetch(`${API_URL}/initiatives/${slug}`);
        if (!response.ok) return undefined;
        return await response.json();
    },

    getResources: async (category?: string): Promise<Resource[]> => {
        let url = `${API_URL}/resources?`;
        if (category && category !== "All") url += `category=${category}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch resources");
        return await response.json();
    },

    getResourceById: async (id: number | string): Promise<Resource | undefined> => {
        const response = await fetch(`${API_URL}/resources/${id}`);
        if (!response.ok) return undefined;
        return await response.json();
    },

    getJobs: async (all?: boolean, type?: string): Promise<Job[]> => {
        let url = `${API_URL}/jobs`;
        const params = new URLSearchParams();
        if (all) params.append('all', 'true');
        if (type) params.append('type', type);
        
        const queryString = params.toString();
        if (queryString) url += `?${queryString}`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch jobs");
        return await response.json();
    },

    getJob: async (id: number | string): Promise<Job> => {
        const response = await fetch(`${API_URL}/jobs/${id}`);
        if (!response.ok) throw new Error("Failed to fetch job");
        return await response.json();
    },

    createJob: async (data: any): Promise<Job> => {
        const response = await fetch(`${API_URL}/jobs`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const err = await response.text();
            throw new Error(err || `Failed to create job: ${response.statusText}`);
        }
        return await response.json();
    },

    updateJob: async (id: number, data: any): Promise<Job> => {
        const response = await fetch(`${API_URL}/jobs/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const err = await response.text();
            throw new Error(err || `Failed to update job: ${response.statusText}`);
        }
        return await response.json();
    },

    deleteJob: async (id: number): Promise<void> => {
        const response = await fetch(`${API_URL}/jobs/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        if (!response.ok) {
            const err = await response.text();
            throw new Error(err || `Failed to delete job: ${response.statusText}`);
        }
    },

    duplicateJob: async (id: number): Promise<Job> => {
        const response = await fetch(`${API_URL}/jobs/${id}/duplicate`, {
            method: 'POST',
            headers: getAuthHeaders()
        });
        if (!response.ok) {
            const err = await response.text();
            throw new Error(err || `Failed to duplicate job: ${response.statusText}`);
        }
        return await response.json();
    },

    submitContact: async (data: any): Promise<any> => {
        const response = await fetch(`${API_URL}/contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error("Failed to submit contact form");
        return await response.json();
    },

    subscribeNewsletter: async (email: string, firstName: string, lastName: string, subscriptions: string[]): Promise<any> => {
        const response = await fetch(`${API_URL}/subscribe`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, first_name: firstName, last_name: lastName, subscriptions })
        });
        if (!response.ok) throw new Error("Failed to subscribe");
        return await response.json();
    },

    // --- Admin / CMS Endpoints ---

    getDashboardStats: async (): Promise<DashboardStats> => {
        const response = await fetch(`${API_URL}/dashboard/stats`, {
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error("Failed to fetch dashboard stats");
        return await response.json();
    },

    getSubscriberAnalytics: async (): Promise<any> => {
        const response = await fetch(`${API_URL}/subscribers/analytics`, {
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error("Failed to fetch subscriber analytics");
        return await response.json();
    },

    uploadFile: async (file: File): Promise<{ url: string, filename: string }> => {
        const formData = new FormData();
        formData.append('file', file);
        const token = localStorage.getItem('token');
        const headers: any = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const response = await fetch(`${API_URL}/upload`, {
            method: 'POST',
            headers,
            body: formData,
        });
        if (!response.ok) throw new Error("Failed to upload file");
        return await response.json();
    },

    // Content Management
    getHeroContent: async (page: string): Promise<any[]> => {
        const response = await fetch(`${API_URL}/content/hero/${page}`, {
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error("Failed to fetch hero content");
        return await response.json();
    },

    createHeroSlide: async (data: any): Promise<any> => {
        const response = await fetch(`${API_URL}/content/hero`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error("Failed to create hero slide");
        return await response.json();
    },

    updateHeroSlide: async (id: number, data: any): Promise<any> => {
        const response = await fetch(`${API_URL}/content/hero/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error("Failed to update hero slide");
        return await response.json();
    },

    deleteHeroSlide: async (id: number): Promise<void> => {
        const response = await fetch(`${API_URL}/content/hero/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error("Failed to delete hero slide");
    },

    // Generic CRUD helpers
    createBlogPost: async (data: any): Promise<BlogPost> => {
        const response = await fetch(`${API_URL}/blogs`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error("Failed to create blog post");
        return await response.json();
    },

    updateBlogPost: async (id: number, data: any): Promise<BlogPost> => {
        const response = await fetch(`${API_URL}/blogs/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error("Failed to update blog post");
        return await response.json();
    },

    deleteBlogPost: async (id: number): Promise<void> => {
        const response = await fetch(`${API_URL}/blogs/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error("Failed to delete blog post");
    },

    duplicateBlogPost: async (id: number): Promise<BlogPost> => {
        const response = await fetch(`${API_URL}/blogs/${id}/duplicate`, {
            method: 'POST',
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error("Failed to duplicate blog post");
        return await response.json();
    },

    createResource: async (data: any): Promise<Resource> => {
        const response = await fetch(`${API_URL}/resources`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error("Failed to create resource");
        return await response.json();
    },

    updateResource: async (id: number | string, data: any): Promise<Resource> => {
        const response = await fetch(`${API_URL}/resources/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const err = await response.text();
            throw new Error(err || "Failed to update resource");
        }
        return await response.json();
    },

    deleteResource: async (id: number): Promise<void> => {
        const response = await fetch(`${API_URL}/resources/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error("Failed");
    },

    deleteAnnouncement: async (id: number): Promise<void> => {
        const response = await fetch(`${API_URL}/announcements/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error("Failed");
    },

    createAnnouncement: async (data: any): Promise<Announcement> => {
        const response = await fetch(`${API_URL}/announcements`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error("Failed to create announcement");
        return await response.json();
    },

    createInitiative: async (data: any): Promise<Initiative> => {
        const response = await fetch(`${API_URL}/initiatives`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error("Failed");
        return await response.json();
    },
    updateInitiative: async (id: number, data: any): Promise<Initiative> => {
        const response = await fetch(`${API_URL}/initiatives/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error("Failed");
        return await response.json();
    },
    deleteInitiative: async (id: number): Promise<void> => {
        const response = await fetch(`${API_URL}/initiatives/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error("Failed");
    },

    getPartners: async (): Promise<any[]> => {
        const response = await fetch(`${API_URL}/partners`);
        if (!response.ok) throw new Error("Failed");
        return await response.json();
    },
    createPartner: async (data: any): Promise<any> => {
        const response = await fetch(`${API_URL}/partners`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error("Failed");
        return await response.json();
    },
    deletePartner: async (id: number): Promise<void> => {
        const response = await fetch(`${API_URL}/partners/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error("Failed");
    },

    getBadges: async (): Promise<any[]> => {
        const response = await fetch(`${API_URL}/badges`);
        if (!response.ok) throw new Error("Failed");
        return await response.json();
    },
    createBadge: async (data: any): Promise<any> => {
        const response = await fetch(`${API_URL}/badges`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error("Failed");
        return await response.json();
    },
    deleteBadge: async (id: number): Promise<void> => {
        const response = await fetch(`${API_URL}/badges/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error("Failed");
    },

    getComments: async (postId?: number | string, status?: string): Promise<any[]> => {
        let url = `${API_URL}/comments?`;
        if (postId) url += `post_id=${postId}&`;
        if (status) url += `status=${status}&`;

        const response = await fetch(url, {
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error("Failed to fetch comments");
        return await response.json();
    },

    createComment: async (data: any): Promise<any> => {
        const response = await fetch(`${API_URL}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error("Failed to post comment");
        return await response.json();
    },

    updateCommentStatus: async (id: number, status: string): Promise<void> => {
        const response = await fetch(`${API_URL}/comments/${id}/status`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify({ status })
        });
        if (!response.ok) throw new Error("Failed to update status");
    },

    deleteComment: async (id: number): Promise<void> => {
        const response = await fetch(`${API_URL}/comments/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error("Failed to delete comment");
    },

    getUsers: async (): Promise<any[]> => {
        const response = await fetch(`${API_URL}/users`, {
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error("Failed to fetch users");
        return await response.json();
    },

    createUser: async (data: any): Promise<any> => {
        const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const err = await response.text();
            throw new Error(err || "Failed to create user");
        }
        return await response.json();
    },

    deleteUser: async (id: number): Promise<void> => {
        const response = await fetch(`${API_URL}/users/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error("Failed to delete user");
    },

    updateUser: async (id: number | string, data: any): Promise<any> => {
        const response = await fetch(`${API_URL}/users/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const err = await response.text();
            throw new Error(err || "Failed to update user");
        }
        return await response.json();
    },

    getAuditLogs: async (): Promise<any[]> => {
        const response = await fetch(`${API_URL}/audit-logs`, {
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error("Failed to fetch logs");
        return await response.json();
    },

    createAuditLog: async (data: any): Promise<void> => {
        await fetch(`${API_URL}/audit-logs`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
    },

    // Program Applications
    submitVolunteer: async (data: any): Promise<any> => {
        const response = await fetch(`${API_URL}/volunteer/submit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error("Failed to submit volunteer application");
        return await response.json();
    },

    getVolunteers: async (): Promise<VolunteerApplication[]> => {
        const response = await fetch(`${API_URL}/volunteers`, {
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error("Failed to fetch volunteers");
        return await response.json();
    },

    submitInternship: async (data: any): Promise<any> => {
        const response = await fetch(`${API_URL}/internship/submit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error("Failed to submit internship application");
        return await response.json();
    },

    getInternships: async (): Promise<InternshipApplication[]> => {
        const response = await fetch(`${API_URL}/internships`, {
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error("Failed to fetch internships");
        return await response.json();
    }
};
