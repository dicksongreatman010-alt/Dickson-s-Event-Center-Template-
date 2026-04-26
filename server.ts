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
      if (!key) return null;
      // Using latest API version
      stripeClient = new Stripe(key);
    }
    return stripeClient;
  }

  let resendClient: Resend | null = null;
  function getResend() {
    if (!resendClient) {
      const key = process.env.RESEND_API_KEY;
      if (!key) return null;
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

      const emailHtml = `
        <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; border: 1px solid #E5E7EB; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #002349; padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0;">Eko Grandeur</h1>
          </div>
          <div style="padding: 30px;">
            <h2 style="color: #002349;">Thank you for your inquiry, ${name}!</h2>
            <p>We have received your booking inquiry for <strong>${hall}</strong> on <strong>${date}</strong>.</p>
            <div style="background-color: #F8F9FA; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #E5E7EB;">
              <h3 style="color: #C5A059; margin-top: 0;">Event Details Summary</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; border-bottom: 1px solid #E5E7EB;"><strong>Event Type:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #E5E7EB; text-align: right;">${eventType}</td></tr>
                <tr><td style="padding: 8px 0; border-bottom: 1px solid #E5E7EB;"><strong>Guests:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #E5E7EB; text-align: right;">${guests}</td></tr>
                <tr><td style="padding: 8px 0; border-bottom: 1px solid #E5E7EB;"><strong>Phone:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #E5E7EB; text-align: right;">${phone}</td></tr>
                <tr><td style="padding: 8px 0;"><strong>Message:</strong></td><td style="padding: 8px 0; text-align: right;">${message || "N/A"}</td></tr>
              </table>
            </div>
            <p>Our events team will review your request and get back to you shortly regarding availability and pricing.</p>
            <br />
            <p style="margin-bottom: 0;">Best regards,<br/><strong>The Eko Grandeur Team</strong></p>
          </div>
        </div>
      `;

      if (!resend) {
        console.log("-----------------------------------------");
        console.log("Mock Email Sent (RESEND_API_KEY missing):");
        console.log("To:", email);
        console.log("Subject:", "Booking Inquiry Received - Eko Grandeur");
        console.log("Body:", emailHtml);
        console.log("-----------------------------------------");
        return res.status(200).json({ success: true, warning: 'RESEND_API_KEY missing, email logged to console' });
      }

      // Send confirmation to the user and the admin
      // Note: Because Resend is on a free/testing tier without a verified domain, 
      // you can only send emails to the registered email address.
      // Once you verify a domain on Resend, you can change this back to `to: [email, "dicksongreatman010@gmail.com"]`
      const { data, error } = await resend.emails.send({
        from: "Eko Grandeur <onboarding@resend.dev>",
        to: "dicksongreatman010@gmail.com", 
        subject: "Booking Inquiry Received - Eko Grandeur",
        html: emailHtml,
      });

      if (error) {
        return res.status(400).json({ error: error.message || JSON.stringify(error) });
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

      if (!stripe) {
        console.log("-----------------------------------------");
        console.log("Mock Stripe Checkout (STRIPE_SECRET_KEY missing):");
        console.log(`Hold Deposit - ${hall} for ${name} on ${date}`);
        console.log("-----------------------------------------");
        // Return a mock success URL skipping Stripe checkout
        return res.json({ url: `${process.env.APP_URL || "http://localhost:3000"}/booking-success?session_id=mock_session_123` });
      }

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
