# EmailJS template for ReelBook booking confirmation

Use this to create or edit your confirmation email template in the [EmailJS dashboard](https://dashboard.emailjs.com/admin).

---

## Where to create it

1. Go to **https://dashboard.emailjs.com/**
2. Open **Email Templates** in the sidebar.
3. Click **Create New Template** (or edit your existing one, e.g. `template_wx42lsw`).

---

## Template fields – copy exactly

### To Email (recipient – required)

Use this **exactly** so the email goes to the customer who booked:

```
{{customer_email}}
```

Do not use a fixed email or another variable name.

---

### Subject

Copy one of these (or similar):

```
Booking confirmed – {{booking_ref}}
```

or:

```
ReelBook: Your ticket confirmation {{booking_ref}}
```

---

### Content / Body

**Plain text version** (use in the main body field):

```
Hi {{customer_name}},

Your booking with ReelBook is confirmed.

Booking ID: {{booking_ref}}
Seats: {{seats}}
Total: {{total}}
Show: {{show_details}}

Please present this booking ID at the venue. We have sent your e-ticket to this email.

Thank you for booking with ReelBook!
```

---

### HTML version (optional)

If your template has an HTML / rich content option, you can use:

```html
<p>Hi {{customer_name}},</p>
<p>Your booking with ReelBook is confirmed.</p>
<table style="border-collapse: collapse; margin: 16px 0;">
  <tr><td style="padding: 6px 12px 6px 0; color: #888;">Booking ID</td><td style="padding: 6px 0;"><strong>{{booking_ref}}</strong></td></tr>
  <tr><td style="padding: 6px 12px 6px 0; color: #888;">Seats</td><td style="padding: 6px 0;">{{seats}}</td></tr>
  <tr><td style="padding: 6px 12px 6px 0; color: #888;">Total</td><td style="padding: 6px 0;">{{total}}</td></tr>
  <tr><td style="padding: 6px 12px 6px 0; color: #888;">Show</td><td style="padding: 6px 0;">{{show_details}}</td></tr>
</table>
<p>Please present this booking ID at the venue. We have sent your e-ticket to this email.</p>
<p>Thank you for booking with ReelBook!</p>
```

---

## Variable reference (must match app)

| Use in template   | Sent by app   | Example value        |
|-------------------|---------------|----------------------|
| `{{customer_name}}`  | Yes           | John Doe             |
| `{{customer_email}}` | Yes (use in **To Email**) | user@example.com |
| `{{booking_ref}}`    | Yes           | BMS482917            |
| `{{seats}}`          | Yes           | G4, G5               |
| `{{total}}`          | Yes           | ₹450                 |
| `{{show_details}}`   | Yes           | Movie booking        |

---

## After saving

1. Save the template and note the **Template ID** (e.g. `template_wx42lsw`).
2. In your app’s `.env.local`, set:
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=` that Template ID
3. Restart the dev server and run a test booking to confirm the email is received (and check spam if needed).
