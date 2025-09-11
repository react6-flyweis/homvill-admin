// --- Data generator utilities -------------------------------------------------
const FIRST_NAMES = [
  "Jakob",
  "Jaxon",
  "Martin",
  "Olivia",
  "Sophia",
  "Liam",
  "Noah",
  "Emma",
  "Ava",
  "Mason",
];
const LAST_NAMES = [
  "Calzoni",
  "Mango",
  "Dias",
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
];
const USER_TYPES = ["Buyer", "Contractor", "Builder", "Agent", "Admin"];

function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomPhone() {
  // simple US-style phone generator
  const a = Math.floor(100 + Math.random() * 900);
  const b = Math.floor(100 + Math.random() * 900);
  const c = Math.floor(1000 + Math.random() * 9000);
  return `+1 ${a} ${b} ${c}`;
}

function randomIdForType(type) {
  // Prefix B for buyer, S for seller/builder, U otherwise
  const prefix = type === "Buyer" ? "B" : type === "Builder" ? "S" : "U";
  const num = Math.floor(1000000 + Math.random() * 9000000)
    .toString()
    .slice(0, 7);
  return `${prefix}${num}`;
}

function formatDate(d) {
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
}

/**
 * Generate a single random user object compatible with the existing `data` items.
 * Options: { type, verified, active, dateFrom, dateTo }
 */
export function generateRandomUser(options = {}) {
  const type = options.type || rand(USER_TYPES);
  const first = rand(FIRST_NAMES);
  const last = rand(LAST_NAMES);
  const name = `${first} ${last}`;
  const id = options.id || randomIdForType(type);
  const phone = options.phone || randomPhone();
  const email =
    options.email ||
    `${first.toLowerCase()}.${last.toLowerCase()}${Math.floor(
      Math.random() * 90 + 10
    )}@example.com`;
  const verified =
    typeof options.verified === "boolean"
      ? options.verified
      : Math.random() < 0.25;
  const active =
    typeof options.active === "boolean" ? options.active : Math.random() < 0.95;

  // date range: default within the last 365 days
  const now = new Date();
  const from = options.dateFrom
    ? new Date(options.dateFrom)
    : new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
  const to = options.dateTo ? new Date(options.dateTo) : now;
  const time = from.getTime() + Math.random() * (to.getTime() - from.getTime());
  const date = formatDate(new Date(time));

  const user = { name, id, phone, type, email, date };
  if (verified) user.verified = true;
  if (!active) user.active = false;
  return user;
}

/**
 * Generate an array of users.
 * generateUsers(10)
 * generateUsers(5, { type: 'Buyer', verified: true })
 */
export function generateUsers(count = 10, options = {}) {
  const out = [];
  for (let i = 0; i < count; i++) {
    out.push(generateRandomUser(options));
  }
  return out;
}
