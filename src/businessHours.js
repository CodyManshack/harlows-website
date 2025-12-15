// Set business hours by day using i18n keys
// Example: { wed: '19:00 – 01:00', thu: '19:00 – 01:00', fri: '19:00 – 01:30', ... }
export const businessHoursByDay = {
  mon: "",
  tue: "",
  wed: "",
  thu: "",
  fri: "18:00 – 01:30",
  sat: "18:00 – 01:30",
  sun: "18:00 – 23:30",
};

// Helper to map JS day index (0=Sunday) to i18n key
export const jsDayToKey = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
