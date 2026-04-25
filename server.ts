import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Stripe from "stripe";
import { Resend } from "resend";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Use JSON middleware for parsing request bodies
  app.use(express.json());

  // === SDK Initialization (Lazy) ===
  let stripeClient: Stripe | null = null;
  function getStripe() {
    if (!stripeClient) {
      const key = process.env.STRIPE_SECRET_KEY;
      if (!key) throw new Error("STRIPE_SECRET_KEY is missing. Please add it to your secrets.");
      // Using latest API version
      stripeClient = new Stripe(key);
    }
    return stripeClient;
  }

  let resendClient: Resend | null = null;
  function getResend() {
    if (!resendClient) {
      const key = process.env.RESEND_API_KEY;
      if (!key) throw new Error("RESEND_API_KEY is missing. Please add it to your secrets.");
      resendClient = new Resend(key);
    }
    return resendClient;
  }

  // === API Routes ===
  
  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Handle booking inquiry & email notification
  app.post("/api/inquiry", async (req, res) => {
    try {
      const { name, phone, email, eventType, guests, date, hall, message } = req.body;
      const resend = getResend();

      // Send confirmation to the user
      const { data, error } = await resend.emails.send({
        from: "Eko Grandeur <onboarding@resend.dev>",
        to: email, // Resend trial accounts require verifying the domain to send to arbitrary emails, otherwise only the registered email works
        subject: "Booking Inquiry Received - Eko Grandeur",
        html: `
          <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto;">
            <h1 style="color: #002349;">Thank you for your inquiry, ${name}!</h1>
            <p>We have received your booking inquiry for <strong>${hall}</strong> on <strong>${date}</strong>.</p>
            <div style="background-color: #F8F9FA; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #C5A059; margin-top: 0;">Event Details</h2>
              <ul style="list-style: none; padding: 0; line-height: 1.6;">
                <li><strong>Event Type:</strong> ${eventType}</li>
                <li><strong>Guests:</strong> ${guests}</li>
                <li><strong>Phone:</strong> ${phone}</li>
                <li><strong>Message:</strong> ${message || "N/A"}</li>
              </ul>
            </div>
            <p>Our events team will review your request and get back to you shortly regarding availability and pricing.</p>
            <br />
            <p>Best regards,<br/><strong>The Eko Grandeur Team</strong></p>
          </div>
        `,
      });

      if (error) {
        return res.status(400).json({ error });
      }

      res.status(200).json({ success: true, data });
    } catch (error: any) {
      console.error("Email Error:", error);
      res.status(500).json({ error: error.message || "Failed to send email" });
    }
  });

  // Handle deposit creation via Stripe Checkout
  app.post("/api/checkout", async (req, res) => {
    try {
      const { name, date, hall } = req.body;
      const stripe = getStripe();

      // Calculate deposit (e.g., $500 flat deposit for securing the hall)
      const depositAmount = 50000; // $500 in cents

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: `Hold Deposit - ${hall}`,
                description: `Event date: ${date} | Reserved by: ${name}`,
              },
              unit_amount: depositAmount,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${process.env.APP_URL || "http://localhost:3000"}/booking-success`,
        cancel_url: `${process.env.APP_URL || "http://localhost:3000"}/booking`,
      });

      res.json({ url: session.url });
    } catch (error: any) {
      console.error("Stripe Error:", error);
      res.status(500).json({ error: error.message || "Failed to create checkout session" });
    }
  });


  // === Vite Middleware for Development ===
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // === Production Static Serving ===
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
