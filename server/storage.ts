import type { 
  Contact, InsertContact,
  Newsletter, InsertNewsletter,
  Document, InsertDocument,
  BlogPost, InsertBlogPost,
  Whitepaper, InsertWhitepaper,
  Appointment, InsertAppointment
>>>>>>> 8bcb4de4afdc375e5569d071000c7450f859b3e9
} from "@shared/schema";

export interface IStorage {
<<<<<<< HEAD
=======
  // All operations are no-ops in hardcoded data mode
>>>>>>> 8bcb4de4afdc375e5569d071000c7450f859b3e9
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  updateContactStatus(id: string, status: string): Promise<Contact | undefined>;
<<<<<<< HEAD
=======

>>>>>>> 8bcb4de4afdc375e5569d071000c7450f859b3e9
  subscribeNewsletter(data: InsertNewsletter): Promise<Newsletter>;
  unsubscribeNewsletter(email: string): Promise<void>;
<<<<<<< HEAD
=======

>>>>>>> 8bcb4de4afdc375e5569d071000c7450f859b3e9
  createDocument(doc: InsertDocument): Promise<Document>;
  getDocumentsByUserId(userId: string): Promise<Document[]>;
  updateDocumentStatus(id: string, status: string, reviewNotes?: string): Promise<Document | undefined>;
<<<<<<< HEAD
=======

>>>>>>> 8bcb4de4afdc375e5569d071000c7450f859b3e9
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  getBlogPosts(publishedOnly?: boolean): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
<<<<<<< HEAD
=======

>>>>>>> 8bcb4de4afdc375e5569d071000c7450f859b3e9
  createWhitepaper(paper: InsertWhitepaper): Promise<Whitepaper>;
  getWhitepapers(publishedOnly?: boolean): Promise<Whitepaper[]>;
  incrementWhitepaperDownload(id: string): Promise<void>;
<<<<<<< HEAD
=======

>>>>>>> 8bcb4de4afdc375e5569d071000c7450f859b3e9
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  getAppointments(): Promise<Appointment[]>;
  updateAppointmentStatus(id: string, status: string): Promise<Appointment | undefined>;
}

<<<<<<< HEAD
export class MemStorage implements IStorage {
  private contacts: Contact[] = [];
  private newsletters: Newsletter[] = [];
  private documents: Document[] = [];
  private blogPosts: BlogPost[] = [];
  private whitepapers: Whitepaper[] = [];
  private appointments: Appointment[] = [];
  private currentId = 1;
=======
export class MemoryStorage implements IStorage {
  async createContact(contact: InsertContact): Promise<Contact> {
    return { ...contact, id: "1", createdAt: new Date() } as Contact;
  }
>>>>>>> 8bcb4de4afdc375e5569d071000c7450f859b3e9

<<<<<<< HEAD
  private nextId(): string {
    return (this.currentId++).toString();
=======
  async getContacts(): Promise<Contact[]> {
    return [];
>>>>>>> 8bcb4de4afdc375e5569d071000c7450f859b3e9
  }

  // Contacts
  async createContact(contact: InsertContact): Promise<Contact> {
    const newContact: Contact = { ...contact, id: this.nextId(), status: "new", createdAt: new Date() };
    this.contacts.push(newContact);
    return newContact;
  }
  async getContacts(): Promise<Contact[]> { return this.contacts; }
  async updateContactStatus(id: string, status: string): Promise<Contact | undefined> {
<<<<<<< HEAD
    const contact = this.contacts.find(c => c.id === id);
    if (contact) contact.status = status;
    return contact;
=======
    return undefined;
>>>>>>> 8bcb4de4afdc375e5569d071000c7450f859b3e9
  }

  async subscribeNewsletter(data: InsertNewsletter): Promise<Newsletter> {
<<<<<<< HEAD
    const entry: Newsletter = { id: this.nextId(), email: data.email, isActive: true, subscribedAt: new Date() };
    this.newsletters.push(entry);
    return entry;
=======
    return { ...data, id: "1", createdAt: new Date() } as Newsletter;
>>>>>>> 8bcb4de4afdc375e5569d071000c7450f859b3e9
  }
<<<<<<< HEAD
  async unsubscribeNewsletter(email: string): Promise<void> {
    const entry = this.newsletters.find(n => n.email === email);
    if (entry) entry.isActive = false;
  }
=======

  async unsubscribeNewsletter(email: string): Promise<void> {}
>>>>>>> 8bcb4de4afdc375e5569d071000c7450f859b3e9

  async createDocument(doc: InsertDocument): Promise<Document> {
<<<<<<< HEAD
    const newDoc: Document = { 
      ...doc, 
      id: this.nextId(), 
      status: "pending", 
      uploadedAt: new Date(),
      reviewedAt: null,
      reviewNotes: null 
    };
    this.documents.push(newDoc);
    return newDoc;
=======
    return { ...doc, id: "1", uploadedAt: new Date(), createdAt: new Date() } as Document;
>>>>>>> 8bcb4de4afdc375e5569d071000c7450f859b3e9
  }
  async getDocumentsByUserId(userId: string): Promise<Document[]> {
<<<<<<< HEAD
    return this.documents.filter(d => d.userId === userId);
=======
    return [];
>>>>>>> 8bcb4de4afdc375e5569d071000c7450f859b3e9
  }
  async updateDocumentStatus(id: string, status: string, reviewNotes?: string): Promise<Document | undefined> {
<<<<<<< HEAD
    const doc = this.documents.find(d => d.id === id);
    if (doc) {
      doc.status = status;
      doc.reviewNotes = reviewNotes || null;
      doc.reviewedAt = new Date();
    }
    return doc;
=======
    return undefined;
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    return { ...post, id: "1", createdAt: new Date(), updatedAt: new Date() } as BlogPost;
  }

  async getBlogPosts(publishedOnly?: boolean): Promise<BlogPost[]> {
    return [];
>>>>>>> 8bcb4de4afdc375e5569d071000c7450f859b3e9
  }

<<<<<<< HEAD
  // Blog / Whitepapers / Appointments (Add similar simple mock logic here)
  async createBlogPost(post: any) { return post; }
  async getBlogPosts() { return this.blogPosts; }
  async getBlogPostBySlug(slug: string) { return this.blogPosts.find(p => p.slug === slug); }
  async updateBlogPost(id: string, post: any) { return post; }
  async createWhitepaper(paper: any) { return paper; }
  async getWhitepapers() { return this.whitepapers; }
  async incrementWhitepaperDownload(id: string) {}
  async createAppointment(app: any) { return app; }
  async getAppointments() { return this.appointments; }
  async updateAppointmentStatus(id: string, status: string) { return undefined; }
=======
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
>>>>>>> 8bcb4de4afdc375e5569d071000c7450f859b3e9
}

<<<<<<< HEAD
export const storage = new MemStorage();
=======
export const storage = new MemoryStorage();

>>>>>>> 8bcb4de4afdc375e5569d071000c7450f859b3e9