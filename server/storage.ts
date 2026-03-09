import type { 
  Contact, InsertContact,
  Newsletter, InsertNewsletter,
  Document, InsertDocument,
  BlogPost, InsertBlogPost,
  Whitepaper, InsertWhitepaper,
  Appointment, InsertAppointment
} from "@shared/schema";

export interface IStorage {
  // All operations are no-ops in hardcoded data mode
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  updateContactStatus(id: string, status: string): Promise<Contact | undefined>;

  subscribeNewsletter(data: InsertNewsletter): Promise<Newsletter>;
  unsubscribeNewsletter(email: string): Promise<void>;

  createDocument(doc: InsertDocument): Promise<Document>;
  getDocumentsByUserId(userId: string): Promise<Document[]>;
  updateDocumentStatus(id: string, status: string, reviewNotes?: string): Promise<Document | undefined>;

  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  getBlogPosts(publishedOnly?: boolean): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;

  createWhitepaper(paper: InsertWhitepaper): Promise<Whitepaper>;
  getWhitepapers(publishedOnly?: boolean): Promise<Whitepaper[]>;
  incrementWhitepaperDownload(id: string): Promise<void>;

  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  getAppointments(): Promise<Appointment[]>;
  updateAppointmentStatus(id: string, status: string): Promise<Appointment | undefined>;
}

export class MemoryStorage implements IStorage {
  async createContact(contact: InsertContact): Promise<Contact> {
    return { ...contact, id: "1", createdAt: new Date() } as Contact;
  }

  async getContacts(): Promise<Contact[]> {
    return [];
  }

  async updateContactStatus(id: string, status: string): Promise<Contact | undefined> {
    return undefined;
  }

  async subscribeNewsletter(data: InsertNewsletter): Promise<Newsletter> {
    return { ...data, id: "1", createdAt: new Date() } as Newsletter;
  }

  async unsubscribeNewsletter(email: string): Promise<void> {}

  async createDocument(doc: InsertDocument): Promise<Document> {
    return { ...doc, id: "1", uploadedAt: new Date(), createdAt: new Date() } as Document;
  }

  async getDocumentsByUserId(userId: string): Promise<Document[]> {
    return [];
  }

  async updateDocumentStatus(id: string, status: string, reviewNotes?: string): Promise<Document | undefined> {
    return undefined;
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    return { ...post, id: "1", createdAt: new Date(), updatedAt: new Date() } as BlogPost;
  }

  async getBlogPosts(publishedOnly?: boolean): Promise<BlogPost[]> {
    return [];
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return undefined;
  }

  async updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    return undefined;
  }

  async createWhitepaper(paper: InsertWhitepaper): Promise<Whitepaper> {
    return { ...paper, id: "1", createdAt: new Date() } as Whitepaper;
  }

  async getWhitepapers(publishedOnly?: boolean): Promise<Whitepaper[]> {
    return [];
  }

  async incrementWhitepaperDownload(id: string): Promise<void> {}

  async createAppointment(appointment: InsertAppointment): Promise<Appointment> {
    return { ...appointment, id: "1", createdAt: new Date() } as Appointment;
  }

  async getAppointments(): Promise<Appointment[]> {
    return [];
  }

  async updateAppointmentStatus(id: string, status: string): Promise<Appointment | undefined> {
    return undefined;
  }
}

export const storage = new MemoryStorage();
