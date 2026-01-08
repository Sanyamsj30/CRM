import Customer from "../models/customer.model.js"
import Interaction from "../models/interaction.model.js"
import{ asynchandler} from "../utils/asynchandler.js"


export const getDashboardData = asynchandler(async (req, res) => {
  const userId = req.user.id; // ✅ THIS WAS MISSING

  const totalCustomers = await Customer.countDocuments({
    user: userId,
  });

  const activeCustomers = await Customer.countDocuments({
    user: userId,
    status: "Active",
  });
  const InactiveCustomers = await Customer.countDocuments({
    user: userId,
    status: "Inactive",
  });

  const upcomingMeetings = await Interaction.find({
    user: userId,
    type: "meeting",
    status: "pending",
    scheduledAt: { $gte: new Date() },
  })
    .populate("customer", "name")
    .sort({ scheduledAt: 1 })
    .limit(5)
    .lean();

  const recentInteractions = await Interaction.find({
    user: userId,
    status: "completed",
  })
    .populate("customer", "name")
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  res.status(200).json({
    success: true,
    data: {
      stats: {
        totalCustomers,
        activeCustomers,
        InactiveCustomers,
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

