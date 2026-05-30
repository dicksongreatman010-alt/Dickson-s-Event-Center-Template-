import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { Resend } from "resend";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Use JSON middleware for parsing request bodies
  app.use(express.json());

  // === SDK Initialization (Lazy) ===
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
        <div style="font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F8F9FA; padding: 40px 10px; color: #3E060F;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(62, 6, 15, 0.05); border: 1px solid #EDF2F7;">
            
            <!-- BRAND HEADER -->
            <div style="background-color: #3E060F; padding: 35px 20px; text-align: center; border-bottom: 4px solid #C5A059;">
              <h1 style="color: #F8F9FA; font-family: 'Playfair Display', Georgia, serif; font-size: 28px; font-weight: 800; letter-spacing: 2px; margin: 0; text-transform: uppercase;">PentonRise</h1>
              <p style="color: #cbd5e1; font-size: 11px; text-transform: uppercase; letter-spacing: 3px; margin: 5px 0 0 0;">The Crown of Events & Entertainment</p>
            </div>

            <!-- EMAIL BODY -->
            <div style="padding: 40px; background-color: #ffffff;">
              <h2 style="color: #3E060F; font-size: 22px; font-weight: 800; margin-top: 0; margin-bottom: 15px; font-family: 'Playfair Display', Georgia, serif;">Thank you for your inquiry, ${name}!</h2>
              <p style="color: #4B5563; font-size: 14px; line-height: 1.6; margin-bottom: 25px;">
                We are thrilled to receive your inquiry for reserving the magnificent <strong>${hall}</strong> on <strong>${date}</strong>. Our dedicated hospitality team is already busy checking availability and preparing a tailored package just for you.
              </p>

              <!-- INQUIRY SUMMARY CARD -->
              <div style="background-color: #F8F9FA; border-left: 4px solid #3E060F; padding: 25px; border-radius: 0 12px 12px 0; margin: 25px 0; border-top: 1px solid #EDF2F7; border-right: 1px solid #EDF2F7; border-bottom: 1px solid #EDF2F7;">
                <h3 style="color: #C5A059; font-size: 14px; font-weight: 800; margin-top: 0; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1.5px; font-family: 'Plus Jakarta Sans', sans-serif;">Inquiry Details Summary</h3>
                <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #EDF2F7; color: #4B5563;"><strong>Selected Venue:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #EDF2F7; text-align: right; color: #3E060F; font-weight: 700;">${hall}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #EDF2F7; color: #4B5563;"><strong>Requested Date:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #EDF2F7; text-align: right; color: #3E060F; font-weight: 700;">${date}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #EDF2F7; color: #4B5563;"><strong>Event Nature:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #EDF2F7; text-align: right; color: #3E060F; font-weight: 700;">${eventType}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #EDF2F7; color: #4B5563;"><strong>Guest Count:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #EDF2F7; text-align: right; color: #3E060F; font-weight: 700;">${guests} guests</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #EDF2F7; color: #4B5563;"><strong>Phone Contact:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #EDF2F7; text-align: right; color: #3E060F; font-weight: 700;">${phone}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0 0 0; color: #4B5563; vertical-align: top;"><strong>Your Message:</strong></td>
                    <td style="padding: 10px 0 0 0; text-align: right; color: #3E060F; font-style: italic; line-height: 1.4;">${message || "No custom message provided"}</td>
                  </tr>
                </table>
              </div>

              <!-- SERVICE FRAMEWORK SHOWCASE -->
              <div style="margin: 35px 0;">
                <h4 style="color: #3E060F; font-size: 13px; font-weight: 800; margin-top: 0; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 2px; text-align: center;">Explore the PentonRise Framework</h4>
                
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <!-- Hall & Decor -->
                    <td style="width: 50%; padding: 0 10px 20px 0; vertical-align: top;">
                      <div style="border: 1px solid #EDF2F7; padding: 15px; border-radius: 12px; background-color: #ffffff; text-align: center; height: 160px;">
                        <span style="font-size: 24px;">🏛️</span>
                        <h5 style="color: #3E060F; font-size: 13px; font-weight: 700; margin: 10px 0 5px 0; text-transform: uppercase;">Halls & Decor</h5>
                        <p style="color: #6B7280; font-size: 11px; line-height: 1.4; margin: 0;">Exquisite custom spaces, tailored thematic decor and lighting overlays.</p>
                      </div>
                    </td>
                    <!-- Food Lounge -->
                    <td style="width: 50%; padding: 0 0 20px 10px; vertical-align: top;">
                      <div style="border: 1px solid #EDF2F7; padding: 15px; border-radius: 12px; background-color: #ffffff; text-align: center; height: 160px;">
                        <span style="font-size: 24px;">🍳</span>
                        <h5 style="color: #3E060F; font-size: 13px; font-weight: 700; margin: 10px 0 5px 0; text-transform: uppercase;">Gourmet Lounge</h5>
                        <p style="color: #6B7280; font-size: 11px; line-height: 1.4; margin: 0;">Premium Ofada, Signature Jollof, traditional tender Suya, and custom banquets.</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <!-- Apex Karting -->
                    <td style="width: 50%; padding: 0 10px 0 0; vertical-align: top;">
                      <div style="border: 1px solid #EDF2F7; padding: 15px; border-radius: 12px; background-color: #ffffff; text-align: center; height: 160px;">
                        <span style="font-size: 24px;">🏎️</span>
                        <h5 style="color: #3E060F; font-size: 13px; font-weight: 700; margin: 10px 0 5px 0; text-transform: uppercase;">Apex Karting</h5>
                        <p style="color: #6B7280; font-size: 11px; line-height: 1.4; margin: 0;">High-G electric go-kart racing arena with pro timing logs.</p>
                      </div>
                    </td>
                    <!-- Hoverboard Arena -->
                    <td style="width: 50%; padding: 0 0 0 10px; vertical-align: top;">
                      <div style="border: 1px solid #EDF2F7; padding: 15px; border-radius: 12px; background-color: #ffffff; text-align: center; height: 160px;">
                        <span style="font-size: 24px;">🛹</span>
                        <h5 style="color: #3E060F; font-size: 13px; font-weight: 700; margin: 10px 0 5px 0; text-transform: uppercase;">Zero-G Arena</h5>
                        <p style="color: #6B7280; font-size: 11px; line-height: 1.4; margin: 0;">Neon-infused gyroscopic hoverboard obstacle courses & tracks.</p>
                      </div>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- BUTTONS & CTA -->
              <div style="text-align: center; margin-top: 30px; margin-bottom: 20px;">
                <a href="https://wa.me/234800000000" style="background-color: #3E060F; color: #FFFFFF; font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 12px; text-transform: uppercase; tracking-spacing: 2px; text-decoration: none; padding: 15px 30px; border-radius: 8px; border: 2px solid #C5A059; display: inline-block; box-shadow: 0 4px 10px rgba(62, 6, 15, 0.15);">
                  Discuss details with events manager
                </a>
              </div>
              
              <div style="text-align: center; margin-bottom: 30px;">
                <p style="color: #6B7280; font-size: 12px; margin: 0;">Need instant support? Reply directly to this email or send us a WhatsApp.</p>
              </div>

              <div style="border-top: 1px solid #EDF2F7; padding-top: 25px; margin-top: 20px;">
                <p style="color: #4B5563; font-size: 13px; line-height: 1.5; margin: 0;">
                  Warm regards,<br />
                  <strong style="color: #3E060F;">PentonRise Events Suite</strong><br />
                  <span style="color: #9CA3AF; font-size: 11px;">Exquisite Halls • Gourmet Local Delicacies • High-Octane Karting • Hoverboard Track</span>
                </p>
              </div>
            </div>

            <!-- FOOTER -->
            <div style="background-color: #111111; padding: 30px 20px; text-align: center; font-size: 11px; color: #9CA3AF; border-top: 1px solid #3E060F;">
              <p style="margin: 0 0 10px 0; text-transform: uppercase; color: #C5A059; letter-spacing: 2px; font-weight: 700;">PentonRise Venue</p>
              <p style="margin: 0 0 15px 0; font-style: italic;">Victoria Island Annex, Lagos, Nigeria</p>
              <p style="margin: 0; line-height: 1.6;">
                © 2026 PentonRise. All rights reserved.<br />
                You received this email because you made an inquiry regarding our rental slots and event packs.
              </p>
            </div>

          </div>
        </div>
      `;

      if (!resend) {
        console.log("-----------------------------------------");
        console.log("Mock Email Sent (RESEND_API_KEY missing):");
        console.log("To:", email);
        console.log("Subject:", "Booking Inquiry Received - PentonRise");
        console.log("Body:", emailHtml);
        console.log("-----------------------------------------");
        return res.status(200).json({ success: true, warning: 'RESEND_API_KEY missing, email logged to console' });
      }

      // Send confirmation to the user and the admin
      // Note: Because Resend is on a free/testing tier without a verified domain, 
      // you can only send emails to the registered email address.
      // Once you verify a domain on Resend, you can change this back to `to: [email, "dicksongreatman010@gmail.com"]`
      const { data, error } = await resend.emails.send({
        from: "PentonRise <onboarding@resend.dev>",
        to: "dicksongreatman010@gmail.com", 
        subject: "Booking Inquiry Received - PentonRise",
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
