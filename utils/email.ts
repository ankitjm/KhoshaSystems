import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = 'service_ck3hj2e';
const EMAILJS_TEMPLATE_ID = 'template_qec5nyo';
const EMAILJS_PUBLIC_KEY = 'CuFYlvZcxR5JVK9C2';

// Send internal notification to ankit@khoshasystems.com
export const sendNotificationEmail = async (data: Record<string, unknown>) => {
  try {
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        ...data,
        to_email: 'ankit@khoshasystems.com',
      },
      EMAILJS_PUBLIC_KEY
    );
    return { success: true };
  } catch (error) {
    console.error('Internal email failed:', error);
    return { success: false, error };
  }
};

// Send auto-reply confirmation to the customer
export const sendCustomerConfirmation = async (data: { name: string; email: string; goal: string }) => {
  try {
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        to_name: data.name,
        to_email: data.email,
        from_name: 'Khoshà Systems',
        subject: 'We received your inquiry',
        message: `Hi ${data.name},\n\nThank you for reaching out to Khoshà Systems regarding "${data.goal}".\n\nWe have received your inquiry and our team will connect with you over a call within 24 hours.\n\nIf you need immediate assistance, feel free to email us at hello@khoshasystems.com.\n\nWarm regards,\nAnkit Mehta\nFounder & Chief Architect\nKhoshà Systems\nIndiranagar, Bangalore`,
      },
      EMAILJS_PUBLIC_KEY
    );
    return { success: true };
  } catch (error) {
    console.error('Customer confirmation email failed:', error);
    return { success: false, error };
  }
};
