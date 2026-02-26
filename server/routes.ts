import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertNewsletterSchema, insertDocumentSchema, insertAppointmentSchema } from "@shared/schema";

// Helper middleware to handle authentication locally/on standard hosts
// You will eventually connect this to Supabase Auth
const isAuthenticated = (req: any, res: any, next: any) => {
  // During migration/dev, we allow access or check for a user object
  if (req.user || process.env.NODE_ENV === 'development') return next();
  res.status(401).json({ message: "Unauthorized. Please log in via the portal." });
};

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // --- REMOVED REPLIT-ONLY INTEGRATIONS ---
  // setupAuth(app) and registerObjectStorageRoutes(app) are deleted 
  // because they look for Replit-only services.

  // Contact form submission
  app.post("/api/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.status(201).json(contact);
    } catch (error: any) {
      if (error.name === "ZodError") {
        res.status(400).json({ message: "Invalid input", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to submit contact form" });
      }
    }
  });

  // Newsletter subscription
  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const validatedData = insertNewsletterSchema.parse(req.body);
      const subscription = await storage.subscribeNewsletter(validatedData);
      res.status(201).json({ message: "Successfully subscribed!", subscription });
    } catch (error: any) {
      res.status(400).json({ message: "Invalid email address" });
    }
  });

  // Appointment booking
  app.post("/api/appointments", async (req, res) => {
    try {
      const body = {
        ...req.body,
        preferredDate: req.body.preferredDate ? new Date(req.body.preferredDate) : undefined,
      };
      const validatedData = insertAppointmentSchema.parse(body);
      const appointment = await storage.createAppointment(validatedData);
      res.status(201).json(appointment);
    } catch (error: any) {
      res.status(500).json({ message: "Failed to book appointment" });
    }
  });

  // Public Blog routes (Now stable)
  app.get("/api/blog", async (req, res) => {
    try {
      const posts = await storage.getBlogPosts(true);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  // Protected Document routes
  app.get("/api/documents", isAuthenticated, async (req: any, res) => {
    try {
      // Use standard user ID from your new Auth provider
      const userId = req.user?.id; 
      const docs = await storage.getDocumentsByUserId(userId);
      res.json(docs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch documents" });
    }
  });

  return httpServer;
}