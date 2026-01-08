import cron from "node-cron";
import Interaction from "../models/interaction.model.js";
import sendEmail from "../utils/sendEmail.js";

cron.schedule("0 0 * * *", async () => {
  console.log("🔔 Running meeting reminder cron");

  // Tomorrow range
  const start = new Date();
  start.setDate(start.getDate());
  start.setHours(0, 0, 0, 0);
  

  const end = new Date(start);
  end.setHours(23, 59, 59, 999);
  end.setDate(end.getDate() + 1);

  // Fetch upcoming meetings
  const meetings = await Interaction.find({
    type: "meeting",
    status: "pending",
    scheduledAt: { $gte: start, $lte: end },
  })
    .populate("user", "email name")
    .populate("customer", "name");

  // Group by user
  const grouped = {};

  meetings.forEach((m) => {
    if (!m.user?.email) return;

    if (!grouped[m.user.email]) {
      grouped[m.user.email] = {
        name: m.user.name,
        meetings: [],
      };
    }

    grouped[m.user.email].meetings.push({
      customer: m.customer?.name || "Unknown",
      time: m.scheduledAt,
    });
  });
  console.log("Meetings found:", meetings.length);

  // Send one email per user
  for (const email in grouped) {
    const { name, meetings } = grouped[email];

    const list = meetings
      .map(
        (m) =>
          `• ${m.customer} at ${new Date(m.time).toLocaleTimeString()}`
      )
      .join("\n");

    await sendEmail({
  email, // 👈 MUST be `email`, not `to`
  subject: "📅 Meetings scheduled for tomorrow",
  html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Meetings scheduled for tomorrow</h2>
      <p>You have the following meetings:</p>
      <ul>
        ${meetings
          .map(
            (m) =>
              `<li><strong>${m.customer}</strong> at ${new Date(
                m.time
              ).toLocaleTimeString()}</li>`
          )
          .join("")}
      </ul>
      <p style="margin-top: 16px;">— The CRM</p>
    </div>
  `,
});

    console.log("📨 Email sent to", email);
  }
  console.log("✅ Meeting reminder emails sent");
});