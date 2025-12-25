export const getDashboardData = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const customers = await Customer.find(
    { owner: userId },
    { _id: 1 }
  ).lean();

  const customerIds = customers.map(c => c._id);

  const totalCustomers = customerIds.length;

  const activeCustomers = await Customer.countDocuments({
    owner: userId,
    status: "active",
  });

  const upcomingMeetings = await Interaction.find({
    customer: { $in: customerIds },
    type: "meeting",
    scheduledAt: { $gte: new Date() },
    status: "scheduled",
  })
    .populate("customer", "name")
    .sort({ scheduledAt: 1 })
    .limit(5)
    .lean();

  const recentInteractions = await Interaction.find({
    customer: { $in: customerIds },
  })
    .populate("customer", "name")
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  res.json({
    success: true,
    data: {
      stats: {
        totalCustomers,
        activeCustomers,
        upcomingMeetings: upcomingMeetings.length,
      },
      upcomingMeetings: upcomingMeetings.map(m => ({
        _id: m._id,
        customerName: m.customer?.name,
        scheduledAt: m.scheduledAt,
        status: m.status,
      })),
      recentInteractions: recentInteractions.map(i => ({
        _id: i._id,
        customerName: i.customer?.name,
        type: i.type,
        createdAt: i.createdAt,
      })),
    },
  });
});
