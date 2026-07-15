/* Amsteldijk 64-1 — Woningdashboard: statische data & default state */

const STORAGE_KEY = 'a64';
const EXPENSES_STORAGE_KEY = 'a64_uitgaven';
const SESSION_STORAGE_KEY = 'a64_session';
const MOVE_IN_DATE = '2026-08-15T00:00:00';

/* ---------- Inloggen ---------- */

const USERS = {
  Bastiaan: { password: 'amstel64bas', initial: 'B' },
  Vivian: { password: 'amstel64vief', initial: 'V' },
};

/* ---------- JSONBin (hardcoded gedeelde sync) ---------- */

const JSONBIN_BIN_ID = '6a57dcf4f5f4af5e29943763';
const JSONBIN_MASTER_KEY = '$2a$10$TqBogh0QI7BS6y0SoeFZUulC26Mlp0uaPQqM1/3Ps4sCQGU3SiAiW';

/* ---------- Uitgaven ---------- */

const EXPENSE_CATEGORIES = [
  'Meubels', 'Keuken & servies', 'Verbouwing', 'Witgoed', 'Verlichting',
  'Textiel & gordijnen', 'Dakterras', 'Kunst & decoratie', 'Overig',
];

const EXPENSE_PAID_BY = ['Bastiaan', 'Vivian', 'Samen'];
const EXPENSE_FOR = ['Beiden', 'Bastiaan', 'Vivian'];

/* ---------- Kostenoverzicht (inrichtingsbegroting) ---------- */

const KOSTEN_STORAGE_KEY = 'a64_kosten';

const KOSTEN_CATEGORIES = [
  'Woonkamer', 'Keuken', 'Eetkamer', 'Slaapkamer', 'Kasten',
  'Buiten (dakterras)', 'Huishouden', 'Onvoorzien',
];

const KOSTEN_STATUS_OPTIONS = [
  { id: 'besteld', label: 'Al besteld/gekocht', colorClass: 'status-besteld' },
  { id: 'te-kopen', label: 'Nog te kopen', colorClass: 'status-tekopen' },
  { id: 'bastiaan', label: 'Neemt Bastiaan mee', colorClass: 'status-bastiaan' },
  { id: 'vivian', label: 'Neemt Vivian mee', colorClass: 'status-vivian' },
  { id: 'uitstel', label: 'Uitstel — komt later', colorClass: 'status-later' },
  { id: 'hebben', label: 'Hebben we al', colorClass: 'status-hebben' },
];

const KOSTEN_SEED_ITEMS = [
  // Woonkamer
  { id: 'k-1', category: 'Woonkamer', name: 'Bank', amount: 1658.91, status: 'besteld', note: 'Al besteld' },
  { id: 'k-2', category: 'Woonkamer', name: 'Salontafel', amount: 0, status: 'uitstel', note: 'Waarschijnlijk van ouders' },
  { id: 'k-3', category: 'Woonkamer', name: 'Scheidingswand', amount: 5000, status: 'te-kopen', note: 'Nog regelen, meerdere offertes' },
  { id: 'k-4', category: 'Woonkamer', name: 'TV-beugel', amount: 40, status: 'te-kopen', note: 'Nog te kopen' },
  { id: 'k-5', category: 'Woonkamer', name: 'TV-meubel', amount: 300, status: 'te-kopen', note: 'Nog uit te zoeken' },
  { id: 'k-6', category: 'Woonkamer', name: 'Boekenkast', amount: 0, status: 'te-kopen', note: '' },
  { id: 'k-7', category: 'Woonkamer', name: 'Dressoir', amount: 0, status: 'te-kopen', note: '' },
  { id: 'k-8', category: 'Woonkamer', name: 'Hanglamp', amount: 150, status: 'uitstel', note: 'Boven salontafel of eiland' },
  { id: 'k-9', category: 'Woonkamer', name: 'Staande lamp', amount: 150, status: 'te-kopen', note: 'Nog niks uitgekozen' },
  { id: 'k-10', category: 'Woonkamer', name: 'Tafellamp', amount: 50, status: 'besteld', note: 'Besteld op 9/7 door Bastiaan' },
  { id: 'k-11', category: 'Woonkamer', name: 'Smart verlichting IKEA', amount: 150, status: 'te-kopen', note: '' },
  { id: 'k-12', category: 'Woonkamer', name: 'TV', amount: 0, status: 'bastiaan', note: '' },
  { id: 'k-13', category: 'Woonkamer', name: 'Soundbar', amount: 0, status: 'bastiaan', note: '' },
  { id: 'k-14', category: 'Woonkamer', name: 'Speakers', amount: 0, status: 'bastiaan', note: '' },
  { id: 'k-15', category: 'Woonkamer', name: 'Slimme audio versterker', amount: 350, status: 'te-kopen', note: 'Nog uit te zoeken' },
  { id: 'k-16', category: 'Woonkamer', name: 'Slimme stekkers', amount: 30, status: 'te-kopen', note: '' },
  { id: 'k-17', category: 'Woonkamer', name: 'Slimme thermostaat', amount: 192.27, status: 'te-kopen', note: 'Tado' },
  { id: 'k-18', category: 'Woonkamer', name: 'Smarthome hub', amount: 0, status: 'bastiaan', note: '' },
  { id: 'k-19', category: 'Woonkamer', name: 'Vloerkleed', amount: 400, status: 'te-kopen', note: '' },
  { id: 'k-20', category: 'Woonkamer', name: 'Kussens', amount: 170.61, status: 'besteld', note: 'Besteld' },
  { id: 'k-21', category: 'Woonkamer', name: 'Decoratie', amount: 80, status: 'te-kopen', note: '' },
  { id: 'k-22', category: 'Woonkamer', name: 'Kamerplanten', amount: 80, status: 'uitstel', note: 'Uitstel' },

  // Keuken
  { id: 'k-23', category: 'Keuken', name: 'Afzuigkap', amount: 400, status: 'uitstel', note: 'Uitstel' },
  { id: 'k-24', category: 'Keuken', name: 'Wrappen', amount: 1000, status: 'uitstel', note: 'Uitstel' },
  { id: 'k-25', category: 'Keuken', name: 'Wijnkast', amount: 0, status: 'bastiaan', note: '' },

  // Eetkamer
  { id: 'k-26', category: 'Eetkamer', name: 'Eettafel', amount: 1276, status: 'besteld', note: 'Besteld' },
  { id: 'k-27', category: 'Eetkamer', name: 'Eetkamerstoelen', amount: 1640.76, status: 'besteld', note: 'Besteld' },
  { id: 'k-28', category: 'Eetkamer', name: 'Kast/dressoir', amount: 1326, status: 'besteld', note: 'Besteld' },
  { id: 'k-29', category: 'Eetkamer', name: 'Barkrukken', amount: 609.84, status: 'besteld', note: 'Besteld' },
  { id: 'k-30', category: 'Eetkamer', name: 'Hanglamp boven tafel', amount: 150, status: 'te-kopen', note: '' },
  { id: 'k-31', category: 'Eetkamer', name: 'Placemats', amount: 0, status: 'vivian', note: 'Heeft Vivian' },
  { id: 'k-32', category: 'Eetkamer', name: 'Onderzetters', amount: 0, status: 'vivian', note: 'Heeft Vivian' },
  { id: 'k-33', category: 'Eetkamer', name: 'Kaarsen', amount: 20, status: 'te-kopen', note: '' },

  // Slaapkamer
  { id: 'k-34', category: 'Slaapkamer', name: 'Bed', amount: 456, status: 'besteld', note: 'Besteld' },
  { id: 'k-35', category: 'Slaapkamer', name: 'Matras', amount: 1000, status: 'te-kopen', note: 'Nog te bestellen' },
  { id: 'k-36', category: 'Slaapkamer', name: 'Nachtkastje', amount: 200, status: 'uitstel', note: 'Uitstel' },
  { id: 'k-37', category: 'Slaapkamer', name: 'Nachtlampjes', amount: 80, status: 'te-kopen', note: '' },
  { id: 'k-38', category: 'Slaapkamer', name: 'Molton', amount: 30, status: 'te-kopen', note: '' },
  { id: 'k-39', category: 'Slaapkamer', name: 'Gordijnen', amount: 80, status: 'te-kopen', note: '' },

  // Kasten
  { id: 'k-40', category: 'Kasten', name: 'Kledingkasten', amount: 1600, status: 'uitstel', note: 'Uitstel' },
  { id: 'k-41', category: 'Kasten', name: 'Garderobekasten', amount: 400, status: 'te-kopen', note: '' },
  { id: 'k-42', category: 'Kasten', name: 'Schoenenrek', amount: 0, status: 'te-kopen', note: '' },
  { id: 'k-43', category: 'Kasten', name: 'Hangers', amount: 40, status: 'te-kopen', note: '' },
  { id: 'k-44', category: 'Kasten', name: 'Opbergboxen', amount: 30, status: 'te-kopen', note: '' },
  { id: 'k-45', category: 'Kasten', name: 'Spiegel', amount: 80, status: 'te-kopen', note: '' },
  { id: 'k-46', category: 'Kasten', name: 'Wasmand', amount: 0, status: 'hebben', note: 'Hebben we' },

  // Buiten (dakterras)
  { id: 'k-47', category: 'Buiten (dakterras)', name: 'Loungeset', amount: 700, status: 'te-kopen', note: '' },
  { id: 'k-48', category: 'Buiten (dakterras)', name: 'Tuintafel + stoelen', amount: 717.32, status: 'te-kopen', note: 'Voorstel Vivian' },
  { id: 'k-49', category: 'Buiten (dakterras)', name: 'Buitenkleed', amount: 40, status: 'te-kopen', note: '' },
  { id: 'k-50', category: 'Buiten (dakterras)', name: 'Parasol', amount: 150, status: 'te-kopen', note: '' },
  { id: 'k-51', category: 'Buiten (dakterras)', name: 'BBQ', amount: 200, status: 'te-kopen', note: '' },
  { id: 'k-52', category: 'Buiten (dakterras)', name: 'Plantenbakken', amount: 100, status: 'te-kopen', note: '' },

  // Huishouden
  { id: 'k-53', category: 'Huishouden', name: 'Wasmachine', amount: 600, status: 'te-kopen', note: '' },
  { id: 'k-54', category: 'Huishouden', name: 'Droger', amount: 600, status: 'te-kopen', note: '' },
  { id: 'k-55', category: 'Huishouden', name: 'Strijkplank', amount: 30, status: 'te-kopen', note: '' },
  { id: 'k-56', category: 'Huishouden', name: 'Robot stofzuiger', amount: 180, status: 'te-kopen', note: '' },

  // Onvoorzien
  { id: 'k-57', category: 'Onvoorzien', name: 'Onvoorzien', amount: 955.39, status: 'te-kopen', note: '' },
];

/* ---------- Woninggegevens ---------- */

const HOME_INFO = {
  address: 'Amsteldijk 64-1',
  postcode: '1074 HZ',
  city: 'Amsterdam',
  purchasePrice: 750000,
  appraisalValue: 830000,
  appraisalDate: 'november 2025',
  appraisalInstitute: 'NWWI',
  wozValue: 581000,
  wozDate: 'januari 2024',
  surface: 72,
  terraceSurface: 25,
  terraceOrientation: 'ZW',
  buildYear: 1939,
  heritageStatus: 'Beschermd stadsgezicht',
  ownership: 'Volle eigendom, eigen grond',
  energyLabel: 'A',
  heating: 'Vloerverwarming + HR-107 CV-ketel',
  airco: 'Slaapkamer',
  speakers: 'Inbouwspeakers in woonkamer en eetkamer',
  ceilingHeight: 2.95,
  vveContribution: 73.50,
  vveReserveFund: 4196,
  foundationRepairYear: 2015,
  foundationMethod: 'Schroefinjectiepalen',
  moveInDate: MOVE_IN_DATE,
};

/* ---------- Kamers (vaste volgorde) ---------- */

const ROOMS = [
  { id: 'woonkamer', name: 'Woonkamer', description: 'Hart van het huis, met inbouwspeakers en grote raampartij.' },
  { id: 'keuken', name: 'Keuken', description: 'Open keuken, wordt gewrapt in mat warm beige/taupe.' },
  { id: 'eetkamer', name: 'Eetkamer', description: 'Naast de keuken, wordt afgescheiden van het kantoor met een glazen wand.' },
  { id: 'kantoor', name: 'Kantoor', description: 'Werkruimte, gescheiden van de eetkamer door een nieuwe scheidingswand.' },
  { id: 'badkamer', name: 'Badkamer', description: 'Badkamer op de begane grond.' },
  { id: 'hal', name: 'Hal', description: 'Entree met garderobekast op maat.' },
  { id: 'trappenhuis', name: 'Trappenhuis', description: 'Trap naar de bovenverdieping.' },
  { id: 'wc', name: 'WC', description: 'Apart toilet.' },
  { id: 'slaapkamer', name: 'Slaapkamer', description: 'Slaapkamer met airco.' },
  { id: 'kledingkamer', name: 'Kledingkamer', description: 'Gang met kasten aan weerszijden.' },
  { id: 'dakterras', name: 'Dakterras', description: '25m² dakterras op het zuidwesten.' },
];

/* ---------- Huishouden: statussen & eigenaars ---------- */

const STATUS_OPTIONS = [
  { id: 'bastiaan', label: 'Neemt Bastiaan mee', colorClass: 'status-bastiaan' },
  { id: 'vivian', label: 'Neemt Vivian mee', colorClass: 'status-vivian' },
  { id: 'samen', label: 'Kopen we samen', colorClass: 'status-samen' },
  { id: 'later', label: 'Komt later', colorClass: 'status-later' },
  { id: 'hebben', label: 'Hebben we al', colorClass: 'status-hebben' },
  { id: 'wegdoen', label: 'Wegdoen', colorClass: 'status-wegdoen' },
];

const OWNER_OPTIONS = ['Bastiaan', 'Vivian', 'Samen', '—'];

const HOUSEHOLD_CATEGORIES = [
  'Woonkamer', 'Keuken', 'Eetkamer', 'Kantoor', 'Badkamer',
  'Slaapkamer', 'Kledingkamer', 'Dakterras', 'Hal & Trappenhuis', 'Algemeen',
];

const HOUSEHOLD_ITEMS = [
  // Woonkamer
  { id: 'wk-1', name: 'Hoekbank', category: 'Woonkamer', status: 'vivian', owner: 'Vivian' },
  { id: 'wk-2', name: 'Vloerkleed woonkamer', category: 'Woonkamer', status: 'samen', owner: 'Samen' },
  { id: 'wk-3', name: 'Salontafel', category: 'Woonkamer', status: 'wegdoen', owner: 'Bastiaan' },
  { id: 'wk-4', name: 'Boekenkast', category: 'Woonkamer', status: 'bastiaan', owner: 'Bastiaan' },
  { id: 'wk-5', name: 'TV-meubel', category: 'Woonkamer', status: 'hebben', owner: 'Samen' },
  { id: 'wk-6', name: 'Leeslamp', category: 'Woonkamer', status: 'vivian', owner: 'Vivian' },
  { id: 'wk-7', name: 'Gordijnen woonkamer', category: 'Woonkamer', status: 'later', owner: 'Samen' },
  { id: 'wk-8', name: 'Kunst aan de wand (groot doek)', category: 'Woonkamer', status: 'samen', owner: 'Samen' },
  { id: 'wk-9', name: 'WiiM Amp + versterker', category: 'Woonkamer', status: 'later', owner: 'Bastiaan' },

  // Keuken
  { id: 'ku-1', name: 'Servies', category: 'Keuken', status: 'wegdoen', owner: 'Samen' },
  { id: 'ku-2', name: 'Bestek', category: 'Keuken', status: 'vivian', owner: 'Vivian' },
  { id: 'ku-3', name: 'Pannenset', category: 'Keuken', status: 'bastiaan', owner: 'Bastiaan' },
  { id: 'ku-4', name: 'Espressomachine', category: 'Keuken', status: 'hebben', owner: 'Samen' },
  { id: 'ku-5', name: 'Waterkoker', category: 'Keuken', status: 'wegdoen', owner: 'Vivian' },
  { id: 'ku-6', name: 'Keukenmachine', category: 'Keuken', status: 'vivian', owner: 'Vivian' },
  { id: 'ku-7', name: 'Messenset', category: 'Keuken', status: 'bastiaan', owner: 'Bastiaan' },
  { id: 'ku-8', name: 'Barkrukken keukeneiland', category: 'Keuken', status: 'samen', owner: 'Samen' },
  { id: 'ku-9', name: 'Voorraadpotten', category: 'Keuken', status: 'later', owner: 'Samen' },

  // Eetkamer
  { id: 'ek-1', name: 'Eettafel (6-persoons)', category: 'Eetkamer', status: 'vivian', owner: 'Vivian' },
  { id: 'ek-2', name: 'Eetkamerstoelen (set van 6)', category: 'Eetkamer', status: 'samen', owner: 'Samen' },
  { id: 'ek-3', name: 'Dressoir', category: 'Eetkamer', status: 'bastiaan', owner: 'Bastiaan' },
  { id: 'ek-4', name: 'Hanglamp boven tafel', category: 'Eetkamer', status: 'samen', owner: 'Samen' },
  { id: 'ek-5', name: 'Placemats & servetten', category: 'Eetkamer', status: 'later', owner: 'Vivian' },
  { id: 'ek-6', name: 'Wijnrek', category: 'Eetkamer', status: 'wegdoen', owner: 'Bastiaan' },
  { id: 'ek-7', name: 'Grote vaas', category: 'Eetkamer', status: 'hebben', owner: 'Samen' },

  // Kantoor
  { id: 'ka-1', name: 'Bureau', category: 'Kantoor', status: 'bastiaan', owner: 'Bastiaan' },
  { id: 'ka-2', name: 'Bureaustoel (Bastiaan)', category: 'Kantoor', status: 'bastiaan', owner: 'Bastiaan' },
  { id: 'ka-3', name: 'Bureaustoel (tweede)', category: 'Kantoor', status: 'wegdoen', owner: 'Vivian' },
  { id: 'ka-4', name: 'Monitoren', category: 'Kantoor', status: 'bastiaan', owner: 'Bastiaan' },
  { id: 'ka-5', name: 'Archiefkast', category: 'Kantoor', status: 'wegdoen', owner: 'Samen' },
  { id: 'ka-6', name: 'Prikbord', category: 'Kantoor', status: 'vivian', owner: 'Vivian' },
  { id: 'ka-7', name: 'Bureaulamp', category: 'Kantoor', status: 'hebben', owner: 'Bastiaan' },

  // Badkamer
  { id: 'ba-1', name: 'Wasmand', category: 'Badkamer', status: 'hebben', owner: 'Samen' },
  { id: 'ba-2', name: 'Handdoekenset', category: 'Badkamer', status: 'samen', owner: 'Samen' },
  { id: 'ba-3', name: 'Badmat', category: 'Badkamer', status: 'later', owner: 'Samen' },
  { id: 'ba-4', name: 'Extra opbergers spiegelkast', category: 'Badkamer', status: 'samen', owner: 'Samen' },
  { id: 'ba-5', name: 'Weegschaal', category: 'Badkamer', status: 'wegdoen', owner: 'Vivian' },
  { id: 'ba-6', name: 'Föhn', category: 'Badkamer', status: 'vivian', owner: 'Vivian' },

  // Slaapkamer
  { id: 'sl-1', name: 'Bed + bedframe', category: 'Slaapkamer', status: 'vivian', owner: 'Vivian' },
  { id: 'sl-2', name: 'Matras', category: 'Slaapkamer', status: 'samen', owner: 'Samen' },
  { id: 'sl-3', name: 'Dekbedovertrekken', category: 'Slaapkamer', status: 'vivian', owner: 'Vivian' },
  { id: 'sl-4', name: 'Nachtkastjes (2x)', category: 'Slaapkamer', status: 'samen', owner: 'Samen' },
  { id: 'sl-5', name: 'Extra kledingkast', category: 'Slaapkamer', status: 'wegdoen', owner: 'Bastiaan' },
  { id: 'sl-6', name: 'Verduisteringsgordijnen', category: 'Slaapkamer', status: 'later', owner: 'Samen' },
  { id: 'sl-7', name: 'Airco-afstandsbediening', category: 'Slaapkamer', status: 'hebben', owner: 'Samen' },

  // Kledingkamer
  { id: 'kl-1', name: 'Losse kledingrekken', category: 'Kledingkamer', status: 'wegdoen', owner: 'Samen' },
  { id: 'kl-2', name: 'Schoenenrek', category: 'Kledingkamer', status: 'bastiaan', owner: 'Bastiaan' },
  { id: 'kl-3', name: 'Paskamerspiegel', category: 'Kledingkamer', status: 'vivian', owner: 'Vivian' },
  { id: 'kl-4', name: 'Opbergdozen seizoenskleding', category: 'Kledingkamer', status: 'samen', owner: 'Samen' },
  { id: 'kl-5', name: 'Sieradenkastje', category: 'Kledingkamer', status: 'vivian', owner: 'Vivian' },

  // Dakterras
  { id: 'dt-1', name: 'Loungeset', category: 'Dakterras', status: 'samen', owner: 'Samen' },
  { id: 'dt-2', name: 'Buitentafel + stoelen', category: 'Dakterras', status: 'bastiaan', owner: 'Bastiaan' },
  { id: 'dt-3', name: 'Plantenbakken', category: 'Dakterras', status: 'samen', owner: 'Samen' },
  { id: 'dt-4', name: 'Parasol', category: 'Dakterras', status: 'vivian', owner: 'Vivian' },
  { id: 'dt-5', name: 'Buitenkleed', category: 'Dakterras', status: 'later', owner: 'Samen' },
  { id: 'dt-6', name: 'BBQ', category: 'Dakterras', status: 'bastiaan', owner: 'Bastiaan' },
  { id: 'dt-7', name: 'Buitenverlichting (lichtsnoer)', category: 'Dakterras', status: 'samen', owner: 'Samen' },

  // Hal & Trappenhuis
  { id: 'ht-1', name: 'Kapstok/haken', category: 'Hal & Trappenhuis', status: 'samen', owner: 'Samen' },
  { id: 'ht-2', name: 'Losse schoenenkast hal', category: 'Hal & Trappenhuis', status: 'wegdoen', owner: 'Samen' },
  { id: 'ht-3', name: 'Paraplubak', category: 'Hal & Trappenhuis', status: 'hebben', owner: 'Samen' },
  { id: 'ht-4', name: 'Loper trap', category: 'Hal & Trappenhuis', status: 'later', owner: 'Samen' },
  { id: 'ht-5', name: 'Spiegel hal', category: 'Hal & Trappenhuis', status: 'vivian', owner: 'Vivian' },

  // Algemeen
  { id: 'al-1', name: 'Wasmachine', category: 'Algemeen', status: 'bastiaan', owner: 'Bastiaan' },
  { id: 'al-2', name: 'Droger', category: 'Algemeen', status: 'wegdoen', owner: 'Vivian' },
  { id: 'al-3', name: 'Stofzuiger', category: 'Algemeen', status: 'vivian', owner: 'Vivian' },
  { id: 'al-4', name: 'Strijkplank + strijkijzer', category: 'Algemeen', status: 'hebben', owner: 'Samen' },
  { id: 'al-5', name: 'Ladder', category: 'Algemeen', status: 'bastiaan', owner: 'Bastiaan' },
  { id: 'al-6', name: 'Gereedschapskist', category: 'Algemeen', status: 'bastiaan', owner: 'Bastiaan' },
  { id: 'al-7', name: 'Fietsen (2x)', category: 'Algemeen', status: 'hebben', owner: 'Samen' },
  { id: 'al-8', name: 'Planten (binnen)', category: 'Algemeen', status: 'vivian', owner: 'Vivian' },
  { id: 'al-9', name: 'Kerstversiering', category: 'Algemeen', status: 'later', owner: 'Samen' },
  { id: 'al-10', name: 'EHBO-koffer', category: 'Algemeen', status: 'samen', owner: 'Samen' },
];

/* ---------- Overzicht: acties & notitie ---------- */

const DEFAULT_ACTIONS = [
  { id: 'act-1', text: 'Samenlevingscontract laten opstellen door notaris', tags: ['Urgent', 'Beiden'], done: false },
  { id: 'act-2', text: 'Gezamenlijke rekening openen', tags: ['Beiden'], done: false },
  { id: 'act-3', text: 'Hypotheekakte controleren en tekenen', tags: ['Urgent', 'Bastiaan'], done: true },
  { id: 'act-4', text: 'Verkoop Sint-Willibrordusstraat 26-4 in gang zetten', tags: ['Vivian'], done: false },
  { id: 'act-5', text: 'VvE-stukken en MJOP opvragen', tags: ['Urgent', 'Bastiaan'], done: false },
  { id: 'act-6', text: 'Opstal- en inboedelverzekering afsluiten', tags: ['Beiden'], done: false },
  { id: 'act-7', text: 'Opmeetbezoek plannen voor kasten en scheidingswand', tags: ['Beiden'], done: false },
  { id: 'act-8', text: 'Parkeervergunning Mini overschrijven na GBA-inschrijving', tags: ['Vivian'], done: false },
];

const DEFAULT_PROGRESS = {
  papierwerk: 30,
  planning: 10,
  meubels: 5,
};

/* ---------- Planning ---------- */

const PLANNING_PHASES = [
  {
    id: 'mei',
    label: 'Mei',
    sublabel: 'Gekocht',
    items: [
      { id: 'mei-1', text: 'Koopovereenkomst getekend', tags: ['Beiden'], done: true },
      { id: 'mei-2', text: 'Financiering/hypotheek geregeld', tags: ['Bastiaan'], done: true },
      { id: 'mei-3', text: 'Bouwkundige keuring laten uitvoeren', tags: ['Bastiaan'], done: true },
      { id: 'mei-4', text: 'Notaris ingeschakeld voor transportakte', tags: ['Beiden'], done: true },
    ],
  },
  {
    id: 'juni',
    label: 'Juni',
    sublabel: 'Regelen',
    items: [
      { id: 'juni-1', text: 'Samenlevingscontract bespreken met notaris', tags: ['Urgent', 'Beiden'], done: false },
      { id: 'juni-2', text: 'Gezamenlijke rekening aanvragen', tags: ['Beiden'], done: false },
      { id: 'juni-3', text: 'VvE-stukken opvragen en doornemen', tags: ['Bastiaan'], done: false },
      { id: 'juni-4', text: 'Verzekeringen vergelijken', tags: ['Vivian'], done: false },
      { id: 'juni-5', text: 'Verkoopmakelaar inschakelen voor Sint-Willibrordusstraat', tags: ['Vivian'], done: false },
    ],
  },
  {
    id: 'juli',
    label: 'Juli',
    sublabel: 'Bestellen',
    items: [
      { id: 'juli-1', text: 'Opmeetbezoek: hal, kledingkamer, scheidingswand, keuken', tags: ['Beiden'], done: false },
      { id: 'juli-2', text: 'PAX-kasten + maatwerk frontjes bestellen', tags: ['Beiden'], done: false },
      { id: 'juli-3', text: 'Scheidingswand offerte aanvragen bij HoutGedaan', tags: ['Bastiaan'], done: false },
      { id: 'juli-4', text: 'Keukenwrap laten offreren', tags: ['Vivian'], done: false },
      { id: 'juli-5', text: 'WiiM Amp bestellen', tags: ['Bastiaan'], done: false },
    ],
  },
  {
    id: 'augustus',
    label: 'Aug',
    sublabel: 'Sleutel',
    items: [
      { id: 'aug-1', text: 'Sleuteloverdracht op 15 augustus', tags: ['Urgent', 'Beiden'], done: false },
      { id: 'aug-2', text: 'Verhuizers boeken', tags: ['Beiden'], done: false },
      { id: 'aug-3', text: 'Adreswijziging gemeente (GBA)', tags: ['Beiden'], done: false },
      { id: 'aug-4', text: 'Nutsvoorzieningen overschrijven', tags: ['Beiden'], done: false },
      { id: 'aug-5', text: 'Parkeervergunning Mini overschrijven', tags: ['Vivian'], done: false },
    ],
  },
  {
    id: 'september',
    label: 'Sep+',
    sublabel: 'Inrichten',
    items: [
      { id: 'sep-1', text: 'Kasten en scheidingswand laten plaatsen', tags: ['Beiden'], done: false },
      { id: 'sep-2', text: 'Keukenwrap laten uitvoeren', tags: ['Beiden'], done: false },
      { id: 'sep-3', text: 'Meubels inrichten per kamer', tags: ['Beiden'], done: false },
      { id: 'sep-4', text: 'Kunst en verlichting ophangen', tags: ['Vivian'], done: false },
      { id: 'sep-5', text: 'Dakterras inrichten', tags: ['Beiden'], done: false },
    ],
  },
];

/* ---------- Sfeer ---------- */

const SFEER = {
  palette: [
    { name: 'Terracotta', hex: '#C4603A' },
    { name: 'Warm beige', hex: '#E4D9C8' },
    { name: 'Walnoot', hex: '#5C4433' },
    { name: 'Messing', hex: '#B8A164' },
  ],
  styleTags: [
    'Warm beige & linen', 'Eiken & walnoot', 'Mid-century modern',
    'Grote kunst', 'Travertijn accenten', 'Messing details',
  ],
  shops: [
    { id: 'shop-1', name: 'Frozen Fountain', checked: false },
    { id: 'shop-2', name: 'Moooi', checked: false },
    { id: 'shop-3', name: 'Rietveld Interieur', checked: false },
    { id: 'shop-4', name: 'Galerie Waterman', checked: false },
    { id: 'shop-5', name: 'Hay Amsterdam', checked: false },
  ],
};

/* ---------- Papierwerk ---------- */

const PAPERWORK_SECTIONS = [
  {
    id: 'samenlevingscontract',
    title: 'Samenlevingscontract & gezamenlijke rekening',
    intro: 'Minimaal vast te leggen: verdeling van kosten, wat er gebeurt bij overlijden of uit elkaar gaan, verrekening van de ongelijke inbreng, eigendomsverhouding van de woning en afspraken over verkoop.',
    items: [
      { id: 'slc-1', text: 'Oriënterend gesprek met notaris', status: 'gereed' },
      { id: 'slc-2', text: 'Afspraken kostenverdeling vastleggen', status: 'te-doen' },
      { id: 'slc-3', text: 'Verrekening inbreng (€4.500) opnemen in contract', status: 'te-doen' },
      { id: 'slc-4', text: 'Samenlevingscontract laten opstellen en tekenen', status: 'te-doen' },
      { id: 'slc-5', text: 'Gezamenlijke rekening openen', status: 'te-doen' },
      { id: 'slc-6', text: 'Vaste lasten koppelen aan gezamenlijke rekening', status: 'wacht-op' },
    ],
  },
  {
    id: 'aankoop',
    title: 'Aankoop Amsteldijk 64-1',
    items: [
      { id: 'aan-1', text: 'Koopovereenkomst getekend', status: 'gereed' },
      { id: 'aan-2', text: 'Bouwkundige keuring', status: 'gereed' },
      { id: 'aan-3', text: 'Hypotheek rond', status: 'gereed' },
      { id: 'aan-4', text: 'Taxatierapport NWWI ontvangen', status: 'gereed' },
      { id: 'aan-5', text: 'Transportakte bij notaris plannen', status: 'te-doen' },
    ],
  },
  {
    id: 'vve',
    title: 'VvE',
    intro: 'Let op: reservefonds is met €4.196 laag voor dit pand en een meerjarenonderhoudsplan (MJOP) ontbreekt.',
    items: [
      { id: 'vve-1', text: 'Splitsingsakte opgevraagd', status: 'gereed' },
      { id: 'vve-2', text: 'Notulen laatste VvE-vergadering opgevraagd', status: 'te-doen' },
      { id: 'vve-3', text: 'MJOP opvragen (ontbreekt mogelijk)', status: 'te-doen' },
      { id: 'vve-4', text: 'Reservefonds bespreken met VvE-bestuur', status: 'te-doen' },
    ],
  },
  {
    id: 'verzekeringen',
    title: 'Verzekeringen',
    items: [
      { id: 'ver-1', text: 'Opstalverzekering via VvE gecontroleerd', status: 'gereed' },
      { id: 'ver-2', text: 'Inboedelverzekering afsluiten', status: 'te-doen' },
      { id: 'ver-3', text: 'Aansprakelijkheidsverzekering samenvoegen', status: 'te-doen' },
      { id: 'ver-4', text: 'Rechtsbijstandverzekering afsluiten', status: 'te-doen' },
    ],
  },
  {
    id: 'verkoop-sint-willibrordus',
    title: 'Verkoop Sint-Willibrordusstraat 26-4',
    intro: 'Woning van Vivian, verwachte verkoopwaarde ca. €490.000.',
    items: [
      { id: 'sw-1', text: 'Verkoopmakelaar selecteren', status: 'te-doen' },
      { id: 'sw-2', text: 'Woning laten fotograferen en in de verkoop zetten', status: 'wacht-op' },
      { id: 'sw-3', text: 'Bezichtigingen inplannen', status: 'wacht-op' },
      { id: 'sw-4', text: 'Verkoop rond en overdracht plannen', status: 'wacht-op' },
    ],
  },
  {
    id: 'na-sleuteloverdracht',
    title: 'Na sleuteloverdracht',
    items: [
      { id: 'ns-1', text: 'Adreswijziging gemeente (GBA)', status: 'wacht-op' },
      { id: 'ns-2', text: 'Nutsvoorzieningen overschrijven', status: 'wacht-op' },
      { id: 'ns-3', text: 'Post doorsturen aanvragen', status: 'wacht-op' },
      { id: 'ns-4', text: 'Parkeervergunning Mini overschrijven', status: 'wacht-op' },
    ],
  },
];

/* ---------- Financiën ---------- */

const FINANCE = {
  cards: [
    { id: 'fin-1', label: 'Aankoopprijs', value: 750000 },
    { id: 'fin-2', label: 'Taxatiewaarde', value: 830000 },
    { id: 'fin-3', label: 'WOZ-waarde', value: 581000 },
    { id: 'fin-4', label: 'Overwaarde', value: 80000 },
    { id: 'fin-5', label: "Vivian's woning (verwacht)", value: 490000 },
    { id: 'fin-6', label: 'VvE bijdrage', value: 73.50, suffix: '/mnd' },
  ],
  inbreng: {
    vivian: 17000,
    bastiaan: 8000,
    verschil: 4500,
    maandbedrag: 150,
    maanden: 30,
  },
  inrichtingsbudgetDefault: 25000,
};

/* ---------- Auto's ---------- */

const CARS = {
  mini: {
    owner: 'Vivian',
    model: 'Mini',
    task: 'Parkeervergunning overschrijven naar Amsteldijk na GBA-inschrijving',
    done: false,
  },
  porsche: {
    owner: 'Bastiaan',
    model: 'Porsche Boxster',
    task: 'Zoekt particuliere parkeerplaats in de buurt',
    currentLocation: 'Staat tot die tijd op de huidige plek in Amsterdam',
    tip: {
      name: 'Mobypark Weesperzijde',
      phone: '+31 20 808 1502',
      rating: 4.7,
      feature: 'Overdekt',
    },
    done: false,
  },
};

/* ---------- Projecten ---------- */

const PROJECTS = [
  {
    id: 'proj-garderobekast-hal',
    title: 'Garderobekast hal',
    description: 'PAX ~1,62m + maatwerk frontjes van Studio Fedde of Houtmerk, tot plafond, warm beige of eiken.',
    budgetMin: 850,
    budgetMax: 1600,
    steps: [
      { id: 's1', text: 'Hal opmeten', done: false },
      { id: 's2', text: 'Offerte aanvragen bij Studio Fedde en Houtmerk', done: false },
      { id: 's3', text: 'PAX-kast bestellen', done: false },
      { id: 's4', text: 'Frontjes op maat bestellen', done: false },
      { id: 's5', text: 'Plaatsing inplannen', done: false },
    ],
    note: '',
  },
  {
    id: 'proj-kasten-kledingkamer',
    title: 'Kasten kledingkamer gang',
    description: 'Beide kanten: kant slaapkamer 1,79m + kant dakterras 80cm. PAX + maatwerk frontjes in dezelfde stijl als de hal.',
    budgetMin: 1000,
    budgetMax: 1600,
    steps: [
      { id: 's1', text: 'Beide zijden opmeten', done: false },
      { id: 's2', text: 'Frontjes stijl afstemmen met hal', done: false },
      { id: 's3', text: 'PAX-kasten bestellen', done: false },
      { id: 's4', text: 'Frontjes op maat bestellen', done: false },
      { id: 's5', text: 'Plaatsing inplannen', done: false },
    ],
    note: '',
  },
  {
    id: 'proj-scheidingswand',
    title: 'Scheidingswand eetkamer/kantoor',
    description: 'Vast houten frame + geribbeld glas, volledige hoogte 2,95m, niet volle breedte. HoutGedaan als voorkeursleverancier.',
    budgetMin: 1500,
    budgetMax: 2500,
    steps: [
      { id: 's1', text: 'Breedte bepalen', done: false },
      { id: 's2', text: 'Offerte aanvragen bij HoutGedaan', done: false },
      { id: 's3', text: 'Ontwerp akkoord', done: false },
      { id: 's4', text: 'Productie', done: false },
      { id: 's5', text: 'Plaatsing inplannen', done: false },
    ],
    note: '',
  },
  {
    id: 'proj-keuken-wrappen',
    title: 'Keuken wrappen',
    description: 'Mat warm beige/taupe of eiken houtlook, geen hoogglans.',
    budgetMin: 1200,
    budgetMax: 1800,
    steps: [
      { id: 's1', text: 'Fronten opmeten', done: false },
      { id: 's2', text: 'Kleurstalen aanvragen', done: false },
      { id: 's3', text: 'Offerte aanvragen', done: false },
      { id: 's4', text: 'Uitvoering inplannen', done: false },
    ],
    note: '',
  },
  {
    id: 'proj-audio',
    title: "Audio WiiM Amp",
    description: 'Inbouwspeakers bedraad aanwezig in woonkamer + eetkamer. WiiM Amp (~€170-220), AirPlay 2 naast Harman Kardon.',
    budgetMin: 170,
    budgetMax: 220,
    steps: [
      { id: 's1', text: 'Speakerbedrading traceren', done: false },
      { id: 's2', text: 'WiiM Amp bestellen', done: false },
      { id: 's3', text: 'Aansluiten en instellen', done: false },
    ],
    note: '',
  },
  {
    id: 'proj-opmeetbezoek',
    title: 'Opmeetbezoek',
    description: 'Gecombineerde checklist voor alle projecten in één bezoek.',
    budgetMin: 0,
    budgetMax: 0,
    steps: [
      { id: 's1', text: 'Hal opmeten', done: false },
      { id: 's2', text: 'Kledingkamer opmeten', done: false },
      { id: 's3', text: 'Breedte scheidingswand bepalen', done: false },
      { id: 's4', text: 'Keukenfronten opmeten', done: false },
      { id: 's5', text: 'Speakerbedrading traceren', done: false },
      { id: 's6', text: 'Ramen opmeten', done: false },
      { id: 's7', text: 'Meterkast bekijken', done: false },
      { id: 's8', text: "Foto's van alle wanden maken", done: false },
    ],
    note: '',
  },
];

/* ---------- Dossier: MOVE-documenten ---------- */

const DOSSIER_DOCUMENTS = [
  { id: 'doc-1', name: 'Koopovereenkomst', status: 'gereed' },
  { id: 'doc-2', name: 'Voorlopig koopcontract', status: 'gereed' },
  { id: 'doc-3', name: 'Bankgarantie / waarborgsom', status: 'gereed' },
  { id: 'doc-4', name: 'Hypotheekofferte', status: 'gereed' },
  { id: 'doc-5', name: 'Hypotheekakte', status: 'te-doen' },
  { id: 'doc-6', name: 'Leveringsakte / transportakte', status: 'te-doen' },
  { id: 'doc-7', name: 'Eigendomsbewijs Kadaster', status: 'wacht-op' },
  { id: 'doc-8', name: 'Kadastraal uittreksel', status: 'gereed' },
  { id: 'doc-9', name: 'Taxatierapport NWWI', status: 'gereed' },
  { id: 'doc-10', name: 'Bouwkundig keuringsrapport', status: 'gereed' },
  { id: 'doc-11', name: 'Energielabel', status: 'gereed' },
  { id: 'doc-12', name: 'Splitsingsakte VvE', status: 'gereed' },
  { id: 'doc-13', name: 'VvE jaarrekening', status: 'te-doen' },
  { id: 'doc-14', name: 'Notulen laatste VvE-vergadering', status: 'te-doen' },
  { id: 'doc-15', name: 'Meerjarenonderhoudsplan (MJOP)', status: 'te-doen' },
  { id: 'doc-16', name: 'Opstalverzekering VvE', status: 'gereed' },
  { id: 'doc-17', name: 'Inboedelverzekering', status: 'te-doen' },
  { id: 'doc-18', name: 'Aansprakelijkheidsverzekering', status: 'te-doen' },
  { id: 'doc-19', name: 'Rechtsbijstandverzekering', status: 'te-doen' },
  { id: 'doc-20', name: 'Vaststellingsovereenkomst steeg', status: 'te-doen', alert: true },
  { id: 'doc-21', name: 'Bewijs eigen grond', status: 'gereed' },
  { id: 'doc-22', name: 'Funderingsrapport 2015', status: 'gereed' },
  { id: 'doc-23', name: 'Garantiebewijs funderingsherstel', status: 'gereed' },
  { id: 'doc-24', name: 'Adreswijziging GBA', status: 'wacht-op' },
  { id: 'doc-25', name: 'Overschrijving nutsvoorzieningen', status: 'wacht-op' },
  { id: 'doc-26', name: 'Internet/tv abonnement', status: 'wacht-op' },
  { id: 'doc-27', name: 'Verhuisbericht gemeente', status: 'wacht-op' },
  { id: 'doc-28', name: 'Parkeervergunning aanvraag', status: 'wacht-op' },
  { id: 'doc-29', name: 'WOZ-beschikking', status: 'gereed' },
  { id: 'doc-30', name: 'Notariële eindafrekening', status: 'wacht-op' },
];

/* ---------- Chat ---------- */

const CHAT_SUGGESTIONS = [
  'Help met samenlevingscontract',
  'Welke bank voor gezamenlijke rekening',
  'Folie kleur voor keuken',
  'Realistisch inrichtingsbudget',
];

function buildChatSystemPrompt() {
  return `Je bent een behulpzame assistent voor Bastiaan en Vivian, die samen gaan wonen op ${HOME_INFO.address}, ${HOME_INFO.postcode} ${HOME_INFO.city}.

WONINGGEGEVENS:
- Aankoopprijs: €${HOME_INFO.purchasePrice.toLocaleString('nl-NL')} k.k., taxatiewaarde €${HOME_INFO.appraisalValue.toLocaleString('nl-NL')} (${HOME_INFO.appraisalDate}, ${HOME_INFO.appraisalInstitute}), WOZ €${HOME_INFO.wozValue.toLocaleString('nl-NL')} (${HOME_INFO.wozDate}).
- ${HOME_INFO.surface}m² + dakterras ${HOME_INFO.terraceSurface}m² (${HOME_INFO.terraceOrientation}), bouwjaar ${HOME_INFO.buildYear}, ${HOME_INFO.heritageStatus}.
- ${HOME_INFO.ownership}, energielabel ${HOME_INFO.energyLabel}, ${HOME_INFO.heating}, airco: ${HOME_INFO.airco}.
- VvE-bijdrage €${HOME_INFO.vveContribution}/mnd, reservefonds €${HOME_INFO.vveReserveFund.toLocaleString('nl-NL')} (laag, MJOP ontbreekt).
- Fundering hersteld in ${HOME_INFO.foundationRepairYear} (${HOME_INFO.foundationMethod}).
- Sleuteloverdracht: ca. 15 augustus 2026.

FINANCIËLE REGELING:
- Inbreng: Vivian €${FINANCE.inbreng.vivian.toLocaleString('nl-NL')}, Bastiaan €${FINANCE.inbreng.bastiaan.toLocaleString('nl-NL')}, verschil €${FINANCE.inbreng.verschil.toLocaleString('nl-NL')}.
- Bastiaan lost dit verschil af aan Vivian met €${FINANCE.inbreng.maandbedrag}/mnd over ${FINANCE.inbreng.maanden} maanden.
- Vivians huidige woning aan de Sint-Willibrordusstraat 26-4 wordt verkocht, verwachte opbrengst ca. €490.000.

INTERIEURSTIJL: warm beige & linen, eiken & walnoot, mid-century modern, grote kunst, travertijn accenten, messing details. Kleurpalet: terracotta, warm beige, walnoot, messing.

LOPENDE PROJECTEN: garderobekast hal, kasten kledingkamer, scheidingswand eetkamer/kantoor (hout + geribbeld glas), keuken wrappen, WiiM Amp audio-installatie.

Geef praktisch, kort en concreet advies afgestemd op deze situatie. Antwoord in het Nederlands.`;
}

/* ---------- Default state (localStorage / JSONBin payload) ---------- */

function getDefaultState() {
  return {
    meta: { version: 1, lastUpdated: null },
    overzicht: {
      actions: JSON.parse(JSON.stringify(DEFAULT_ACTIONS)),
      notitie: '',
      progress: { ...DEFAULT_PROGRESS },
    },
    planning: {
      phases: JSON.parse(JSON.stringify(PLANNING_PHASES)),
    },
    kamers: {
      rooms: ROOMS.map((r) => ({ ...r, progress: 0 })),
    },
    huishouden: {
      items: JSON.parse(JSON.stringify(HOUSEHOLD_ITEMS)),
    },
    sfeer: {
      notitie: '',
      shops: JSON.parse(JSON.stringify(SFEER.shops)),
    },
    papierwerk: {
      sections: JSON.parse(JSON.stringify(PAPERWORK_SECTIONS)),
    },
    financien: {
      inrichtingsbudget: FINANCE.inrichtingsbudgetDefault,
    },
    autos: JSON.parse(JSON.stringify(CARS)),
    projecten: {
      projects: JSON.parse(JSON.stringify(PROJECTS)),
    },
    fotos: {
      photos: [],
    },
    chat: {
      apiKey: '',
      history: [],
    },
    dossier: {
      documents: JSON.parse(JSON.stringify(DOSSIER_DOCUMENTS)),
    },
    settings: {
      theme: 'light',
      autoSync: true,
    },
  };
}
