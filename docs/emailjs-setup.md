# EmailJS setup for booking confirmation emails

ReelBook sends a confirmation email to the user when they complete checkout (click **Pay**). This is done via [EmailJS](https://www.emailjs.com/).

## 1. Install (already done)

```bash
npm install @emailjs/browser
```

## 2. Create an EmailJS account and get keys

1. Sign up at [emailjs.com](https://www.emailjs.com/).
2. **Email Services**: Add a service (e.g. Gmail) and connect your account. Note the **Service ID**.
3. **Email Templates**: Create a template. Set:
   - **To Email**: use a dynamic variable, e.g. `{{customer_email}}`.
   - **Subject**: e.g. `Booking confirmed – {{booking_ref}}`.
   - **Body**: use the variables below. Note the **Template ID**.
4. **Account** → **API Keys**: copy your **Public Key**.

## 3. Template variables

The app sends these parameters to your template. Use them in the template with double curly braces, e.g. `{{booking_ref}}`.

| Variable           | Description                    |
|--------------------|--------------------------------|
| `customer_name`    | Full name from checkout        |
| `customer_email`   | Email from checkout            |
| `booking_ref`      | Booking ID (e.g. BMS123456)    |
| `seats`            | Comma-separated seat names     |
| `total`            | Grand total (e.g. ₹450)        |
| `show_details`     | "Movie booking" or "Event booking" |

Example template body:

```
Hi {{customer_name}},

Your booking is confirmed.

Booking ID: {{booking_ref}}
Seats: {{seats}}
Total: {{total}}
Show: {{show_details}}

Thank you for booking with ReelBook!
```

## 4. Configure the app

Add these to `.env.local` (uncomment and set your values):

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

Restart the dev server after changing env vars.

## 5. Flow

- User fills **First name**, **Last name**, and **Email** on the checkout page.
- On **Pay**, the app calls EmailJS with the template and the variables above, then redirects to the confirmation page.
- If EmailJS is not configured, the booking still completes; the email is best-effort.

## 6. Code reference

- **Send utility**: `src/lib/emailjs.ts` – `sendBookingConfirmation()`
- **Trigger**: `src/app/checkout/page.tsx` – `handlePayment()` calls it before redirecting to `/confirmation`.

---

## Troubleshooting: Dashboard says “sent” but I don’t receive the email

**Why this happens:** “Sent” in the EmailJS dashboard means EmailJS accepted the request and handed it to your email service (e.g. Gmail). It does **not** guarantee the email was delivered to the **recipient** you expect.

**1. Check the “To” field in your template (most common fix)**  
In EmailJS → **Email Templates** → open your template (`template_wx42lsw`).

- In **To Email**, you must use exactly: `{{customer_email}}`  
  (no space, same spelling as in the table above.)
- If **To Email** is empty, or a fixed address like `your@email.com`, or a different variable (e.g. `{{email}}` or `{{to_email}}`), the message will go to the wrong place or not to the customer.  
- Save the template and try booking again with the customer’s real email.

**2. Check spam / promotions**  
Ask the recipient to check **Spam**, **Junk**, and **Promotions** (Gmail). Transactional emails often land there until the domain is trusted.

**3. Confirm which address actually received it**  
- In **EmailJS dashboard**, open the log for the “sent” email and see which **To** address was used.  
- If you use Gmail as the EmailJS service, check your **Gmail Sent** folder: the “To” on that sent message is who really got it.

**4. Variable name must match**  
The app sends `customer_email`. The template **To** field must use `{{customer_email}}`. Any other name (e.g. `user_email`, `email`) will not get the value and the “To” can be wrong or empty.
