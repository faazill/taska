export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { to, studentName, employerName, taskTitle, feedback } = req.body;
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Resend API key not configured.' });
  }

  if (!to || !studentName || !employerName || !taskTitle) {
    return res.status(400).json({ error: 'Recipient email (to), studentName, employerName, and taskTitle are required.' });
  }

  // Function to check if email is a beta test email
  function isBetaTestEmail(email) {
    const betaEmails = [
      'beta1@gmail.com', 'beta2@gmail.com', 'beta3@gmail.com', 'beta4@gmail.com', 'beta5@gmail.com',
      'beta6@gmail.com', 'beta7@gmail.com', 'beta8@gmail.com', 'beta9@gmail.com', 'beta10@gmail.com'
    ];
    return betaEmails.includes(email.toLowerCase());
  }

  // Skip sending email if it's a beta test email
  if (isBetaTestEmail(to)) {
    console.log('Skipping submission-approved email for beta test email:', to);
    return res.status(200).json({ success: true, message: 'Email skipped for beta test account' });
  }

  const subject = 'Your Submission Has Been Approved!';
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;background:#fff;border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,0.07);padding:32px 24px;">
      <h2 style="color:#4CAF50;font-size:1.3rem;margin-bottom:18px;">🎉 Submission Approved!</h2>
      <p style="font-size:1.08rem;color:#222;">Hi ${studentName},</p>
      <p style="font-size:1.08rem;color:#222;">Great news! Your submission for the task <b>"${taskTitle}"</b> has been approved by <b>${employerName}</b> on <b>Taska</b>.</p>
      ${feedback ? `
        <div style="background:#f8f9fa;border-left:4px solid #4CAF50;padding:16px;margin:20px 0;border-radius:4px;">
          <h4 style="margin:0 0 8px 0;color:#333;font-size:1rem;">Feedback from ${employerName}:</h4>
          <p style="margin:0;color:#666;font-size:0.95rem;line-height:1.5;">"${feedback}"</p>
        </div>
      ` : ''}
      <div style="margin:32px 0;text-align:center;">
        <a href="https://jointaska.com/workplace/tasks.html" style="display:inline-block;padding:12px 28px;background:#4CAF50;color:#fff;border-radius:6px;font-weight:600;text-decoration:none;font-size:1.08rem;">View Task</a>
      </div>
      <p style="font-size:1.02rem;color:#333;">Congratulations on completing this task successfully! You can continue to work on other tasks or discuss payment details with your employer through the chat feature.</p>
      <p style="font-size:1.02rem;color:#333;">If you have any questions or need assistance, please reach out to <a href="mailto:support@jointaska.com" style="color:#1a73e8;">support@jointaska.com</a>.</p>
      <p style="font-size:0.95rem;color:#aaa;margin-top:32px;">&copy; 2025 Taska</p>
    </div>
  `;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to,
        subject,
        html,
        from: 'Taska <support@jointaska.com>',
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to send email');
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Submission-approved email error:', error);
    res.status(500).json({ error: error.message });
  }
}
