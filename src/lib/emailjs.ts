import emailjs from "@emailjs/browser";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

export interface BookingEmailParams {
  customer_name: string;
  customer_email: string;
  booking_ref: string;
  seats: string;
  total: string;
  show_details: string;
}

export async function sendBookingConfirmation(params: BookingEmailParams): Promise<{ ok: boolean; error?: string }> {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.warn("EmailJS not configured. Set NEXT_PUBLIC_EMAILJS_* in .env.local");
    return { ok: false, error: "Email not configured" };
  }

  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        customer_name: params.customer_name,
        customer_email: params.customer_email,
        booking_ref: params.booking_ref,
        seats: params.seats,
        total: params.total,
        show_details: params.show_details,
      },
      { publicKey: PUBLIC_KEY }
    );
    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to send email";
    return { ok: false, error: message };
  }
}

// Contact form EmailJS config
const CONTACT_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_CONTACT_SERVICE_ID || "";
const CONTACT_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID || "";
const CONTACT_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_CONTACT_PUBLIC_KEY || "";

export interface ContactFormParams {
  name: string;
  email: string;
  message: string;
}

export async function sendContactForm(params: ContactFormParams): Promise<{ ok: boolean; error?: string }> {
  if (!CONTACT_SERVICE_ID || !CONTACT_TEMPLATE_ID || !CONTACT_PUBLIC_KEY) {
    console.warn("EmailJS contact form not configured. Set NEXT_PUBLIC_EMAILJS_CONTACT_* in .env.local");
    return { ok: false, error: "Contact form not configured" };
  }

  try {
    await emailjs.send(
      CONTACT_SERVICE_ID,
      CONTACT_TEMPLATE_ID,
      {
        name: params.name.trim(),
        email: params.email.trim(),
        message: params.message.trim(),
      },
      { publicKey: CONTACT_PUBLIC_KEY }
    );
    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to send message";
    return { ok: false, error: message };
  }
}
