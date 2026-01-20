import { 
  contacts, type Contact, type InsertContact,
  newsletters, type Newsletter, type InsertNewsletter,
  documents, type Document, type InsertDocument,
  blogPosts, type BlogPost, type InsertBlogPost,
  whitepapers, type Whitepaper, type InsertWhitepaper,
  appointments, type Appointment, type InsertAppointment
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // Contacts
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  updateContactStatus(id: string, status: string): Promise<Contact | undefined>;

  // Newsletter
  subscribeNewsletter(data: InsertNewsletter): Promise<Newsletter>;
  unsubscribeNewsletter(email: string): Promise<void>;

  // Documents
  createDocument(doc: InsertDocument): Promise<Document>;
  getDocumentsByUserId(userId: string): Promise<Document[]>;
  updateDocumentStatus(id: string, status: string, reviewNotes?: string): Promise<Document | undefined>;

  // Blog Posts
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  getBlogPosts(publishedOnly?: boolean): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;

  // Whitepapers
  createWhitepaper(paper: InsertWhitepaper): Promise<Whitepaper>;
  getWhitepapers(publishedOnly?: boolean): Promise<Whitepaper[]>;
  incrementWhitepaperDownload(id: string): Promise<void>;

  // Appointments
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  getAppointments(): Promise<Appointment[]>;
  updateAppointmentStatus(id: string, status: string): Promise<Appointment | undefined>;
}

export class DatabaseStorage implements IStorage {
  // Contacts
  async createContact(contact: InsertContact): Promise<Contact> {
    const [result] = await db.insert(contacts).values(contact).returning();
    return result;
  }

  async getContacts(): Promise<Contact[]> {
    return db.select().from(contacts).orderBy(desc(contacts.createdAt));
  }

  async updateContactStatus(id: string, status: string): Promise<Contact | undefined> {
    const [result] = await db.update(contacts)
      .set({ status })
      .where(eq(contacts.id, id))
      .returning();
    return result;
  }

  // Newsletter
  async subscribeNewsletter(data: InsertNewsletter): Promise<Newsletter> {
    const [result] = await db.insert(newsletters)
      .values(data)
      .onConflictDoUpdate({
        target: newsletters.email,
        set: { isActive: true, subscribedAt: new Date() }
      })
      .returning();
    return result;
  }

  async unsubscribeNewsletter(email: string): Promise<void> {
    await db.update(newsletters)
      .set({ isActive: false })
      .where(eq(newsletters.email, email));
  }

  // Documents
  async createDocument(doc: InsertDocument): Promise<Document> {
    const [result] = await db.insert(documents).values(doc).returning();
    return result;
  }

  async getDocumentsByUserId(userId: string): Promise<Document[]> {
    return db.select().from(documents)
      .where(eq(documents.userId, userId))
      .orderBy(desc(documents.uploadedAt));
  }

  async updateDocumentStatus(id: string, status: string, reviewNotes?: string): Promise<Document | undefined> {
    const [result] = await db.update(documents)
      .set({ status, reviewNotes, reviewedAt: new Date() })
      .where(eq(documents.id, id))
      .returning();
    return result;
  }

  // Blog Posts
  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [result] = await db.insert(blogPosts).values(post).returning();
    return result;
  }

  async getBlogPosts(publishedOnly = true): Promise<BlogPost[]> {
    if (publishedOnly) {
      return db.select().from(blogPosts)
        .where(eq(blogPosts.isPublished, true))
        .orderBy(desc(blogPosts.publishedAt));
    }
    return db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [result] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return result;
  }

  async updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const [result] = await db.update(blogPosts)
      .set({ ...post, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return result;
  }

  // Whitepapers
  async createWhitepaper(paper: InsertWhitepaper): Promise<Whitepaper> {
    const [result] = await db.insert(whitepapers).values(paper).returning();
    return result;
  }

  async getWhitepapers(publishedOnly = true): Promise<Whitepaper[]> {
    if (publishedOnly) {
      return db.select().from(whitepapers)
        .where(eq(whitepapers.isPublished, true))
        .orderBy(desc(whitepapers.createdAt));
    }
    return db.select().from(whitepapers).orderBy(desc(whitepapers.createdAt));
  }

  async incrementWhitepaperDownload(id: string): Promise<void> {
    const [paper] = await db.select().from(whitepapers).where(eq(whitepapers.id, id));
    if (paper) {
      await db.update(whitepapers)
        .set({ downloadCount: (paper.downloadCount || 0) + 1 })
        .where(eq(whitepapers.id, id));
    }
  }

  // Appointments
  async createAppointment(appointment: InsertAppointment): Promise<Appointment> {
    const [result] = await db.insert(appointments).values(appointment).returning();
    return result;
  }

  async getAppointments(): Promise<Appointment[]> {
    return db.select().from(appointments).orderBy(desc(appointments.createdAt));
  }

  async updateAppointmentStatus(id: string, status: string): Promise<Appointment | undefined> {
    const [result] = await db.update(appointments)
      .set({ status })
      .where(eq(appointments.id, id))
      .returning();
    return result;
  }
}

export const storage = new DatabaseStorage();
