// Type definitions for PMRG Ayurveda College ERP & Digital Campus POC

export type RoleType = 
  | 'admin'
  | 'principal'
  | 'academic_coordinator'
  | 'faculty'
  | 'finance_officer'
  | 'hospital_admin'
  | 'pharmacist';

export interface UserPersona {
  id: string;
  username: string;
  name: string;
  role: RoleType;
  roleTitle: string;
  department: string;
  avatar: string;
  email: string;
}

export interface AdmissionApplication {
  id: string;
  applicantName: string;
  neetRollNo: string;
  neetScore: number;
  program: 'BAMS (UG)' | 'MD/MS Ayurveda (PG)' | 'Diploma in Panchakarma';
  category: 'General' | 'OBC' | 'SC' | 'ST' | 'EWS' | 'Management Quota';
  submissionDate: string;
  status: 'Submitted' | 'Under Review' | 'Approved' | 'Rejected';
  phone: string;
  email: string;
  hscPercentage: number;
  documentsVerified: boolean;
  remarks?: string;
}

export interface Student {
  id: string;
  rollNo: string;
  name: string;
  avatar: string;
  program: 'BAMS (UG)' | 'MD/MS Ayurveda (PG)';
  batch: string; // e.g. "2023-28"
  currentSemester: '1st Prof' | '2nd Prof' | '3rd Prof' | 'Final Prof' | 'Internship';
  attendancePercent: number;
  feeStatus: 'Paid' | 'Partial' | 'Pending' | 'Overdue';
  balanceFee: number;
  mentorName: string;
  email: string;
  phone: string;
  bloodGroup: string;
  hostelRoom?: string;
  clinicalPostingDept?: string;
}

export interface FacultyStaff {
  id: string;
  employeeId: string;
  name: string;
  avatar: string;
  designation: 'Professor & HOD' | 'Associate Professor' | 'Assistant Professor' | 'Lecturer' | 'Senior Medical Officer' | 'Chief Pharmacist' | 'Panchakarma Specialist' | 'Accounts Officer' | 'Registrar';
  department: string;
  qualification: string;
  experienceYears: number;
  email: string;
  phone: string;
  shift: string;
  status: 'Active' | 'On Leave';
  role: RoleType;
}

export interface TimetableEntry {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  timeSlot: string; // "09:00 - 10:00 AM"
  subject: string;
  facultyId: string;
  facultyName: string;
  batch: string;
  semester: string;
  room: string;
  type: 'Theory' | 'Practical / Lab' | 'Hospital Ward Round';
  conflictWarning?: boolean;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  batch: string;
  semester: string;
  subject: string;
  date: string;
  status: 'Present' | 'Absent' | 'On Leave';
  markedBy: string;
}

export interface Examination {
  id: string;
  examCode: string;
  title: string;
  program: string;
  batch: string;
  semester: string;
  subject: string;
  examType: 'Internal Assessment' | 'Theory Term Exam' | 'Clinical Practical & Viva';
  date: string;
  maxMarks: number;
  passingMarks: number;
  status: 'Scheduled' | 'Completed' | 'Marks Entered' | 'Results Published';
}

export interface StudentResult {
  id: string;
  examId: string;
  studentId: string;
  studentName: string;
  rollNo: string;
  marksObtained: number;
  maxMarks: number;
  grade: 'A+' | 'A' | 'B+' | 'B' | 'C' | 'F';
  status: 'Passed' | 'Failed' | 'Absent';
}

export interface ClinicalLogbookEntry {
  id: string;
  studentId: string;
  studentName: string;
  batch: string;
  postingDepartment: string;
  facultySupervisor: string;
  caseTitle: string;
  fictionalPatientRef: string; // e.g. "PT-CASE-842 (Anonymized)"
  procedureType: 'Rogi Pariksha (Ashtavidha)' | 'Panchakarma Protocol' | 'Nadi Pariksha' | 'Shalya Minor Procedure' | 'Kaya Chikitsa Case';
  date: string;
  clinicalNotes: string;
  status: 'Pending Review' | 'Approved' | 'Returned for Revision';
  supervisorFeedback?: string;
}

export interface Patient {
  id: string;
  uhid: string; // Unique Hospital ID e.g. "AY-HOSP-2026-0041"
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  contact: string;
  address: string;
  registrationDate: string;
  bloodGroup: string;
  prakriti: 'Vata-Pitta' | 'Pitta-Kapha' | 'Vata-Kapha' | 'Tridoshic' | 'Pitta Dominant';
  status: 'Active' | 'Discharged' | 'Follow-up';
  lastVisitDate: string;
  totalVisits: number;
}

export interface OpdVisit {
  id: string;
  tokenNo: number;
  uhid: string;
  patientName: string;
  age: number;
  gender: string;
  department: string;
  practitionerName: string;
  queueStatus: 'Waiting' | 'In Consultation' | 'Completed';
  visitTime: string;
  chiefComplaint: string;
  illustrativeNotes: string;
  prescribedMedicines?: string[];
  recommendedPanchakarma?: string;
}

export interface IpdAdmission {
  id: string;
  ipdNo: string;
  uhid: string;
  patientName: string;
  department: string;
  doctorInCharge: string;
  ward: 'Male Ward' | 'Female Ward' | 'Panchakarma Cottage' | 'Post-Operative Ward' | 'Special Suite';
  bedNo: string;
  admissionDate: string;
  expectedDischargeDate: string;
  admissionStatus: 'Admitted' | 'Discharge Planned' | 'Discharged';
  primaryDiagnosis: string;
  dailyRoundsNote: string;
  dischargeSummary?: string;
}

export interface PharmacyItem {
  id: string;
  itemCode: string;
  name: string;
  classicalReference: string;
  category: 'Asava & Arishta' | 'Churna' | 'Taila & Ghrita' | 'Vati & Gutika' | 'Bhasma & Rasayana' | 'Raw Herb / Crude Drug';
  batchNo: string;
  quantity: number;
  unit: 'Bottles (450ml)' | 'Packets (100g)' | 'Jars (200g)' | 'Strips (50 tabs)' | 'Kg';
  supplier: string;
  purchaseCost: number; // INR
  mrp: number; // INR
  expiryDate: string;
  reorderLevel: number;
  status: 'Adequate' | 'Low Stock' | 'Near Expiry' | 'Expired';
}

export interface StockMovement {
  id: string;
  date: string;
  itemId: string;
  itemName: string;
  batchNo: string;
  type: 'Stock Inward (Purchase)' | 'OPD Dispensing' | 'IPD Ward Issue' | 'Return to Supplier';
  quantity: number;
  unit: string;
  referenceDoc: string;
  patientOrSupplier: string;
}

export interface PanchakarmaBooking {
  id: string;
  bookingCode: string;
  patientId: string;
  patientName: string;
  fictionalPatientRef: string;
  therapyType: 'Abhyanga & Swedana' | 'Shirodhara' | 'Kati Basti' | 'Janu Basti' | 'Nasya Karma' | 'Vamana Karma' | 'Virechana Karma' | 'Matra Basti' | 'Takradhara';
  therapistName: string;
  roomNo: string; // e.g. "Therapy Suite 1 (Snana)"
  date: string;
  timeSlot: string; // e.g. "08:30 AM - 09:45 AM"
  consentStatus: 'Signed & Recorded' | 'Pending Signature';
  sessionStatus: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  consumables: string; // e.g. "Ksheerabala Taila 200ml, Dashamoola Kwatha"
  charges: number; // INR
  clinicalReviewStatus: 'Reviewed by Vaidya' | 'Pending Review';
  notes?: string;
}

export interface FeeLedgerItem {
  id: string;
  invoiceNo: string;
  studentId: string;
  studentName: string;
  rollNo: string;
  program: string;
  batch: string;
  termDescription: string;
  totalTuitionFee: number;
  hostelFee: number;
  totalDue: number;
  amountPaid: number;
  balanceDue: number;
  dueDate: string;
  status: 'Paid' | 'Partial' | 'Pending' | 'Overdue';
  lastPaymentDate?: string;
  receiptNo?: string;
}

export interface ProcurementRequest {
  id: string;
  prNumber: string;
  department: string;
  requestedBy: string;
  requestDate: string;
  itemDescription: string;
  category: 'Herbal Raw Materials' | 'Medical Supplies & Linen' | 'Lab Glassware' | 'IT & Office Hardware' | 'Hostel Amenities';
  estimatedAmount: number;
  status: 'Submitted' | 'Under Review' | 'Approved' | 'PO Issued' | 'Goods Received' | 'Rejected';
  supplierAssigned?: string;
  approvalRemarks?: string;
}

export interface AssetRecord {
  id: string;
  assetTag: string;
  name: string;
  category: 'Clinical / Panchakarma Tables' | 'Dravyaguna Herbarium / Lab' | 'Smart Classroom / AV' | 'IT Server & Network' | 'Campus Generator & Utilities';
  department: string;
  location: string;
  purchaseDate: string;
  condition: 'Good' | 'Fair / Operational' | 'Maintenance Due' | 'Out of Service';
  lastMaintenanceDate: string;
  nextMaintenanceDate: string;
  annualMaintenanceVendor: string;
}

export interface CampusServiceRequest {
  id: string;
  ticketNo: string;
  category: 'Hostel Room Maintenance' | 'Mess & Food Quality' | 'Student Transport Route' | 'Campus Security' | 'Student Grievance Cell';
  requesterName: string;
  requesterRole: 'Student' | 'Faculty' | 'Staff';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  assignedDepartment: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  dateLogged: string;
  description: string;
  resolutionNotes?: string;
}

export interface LibraryBook {
  id: string;
  accessionNo: string;
  isbn: string;
  title: string;
  author: string;
  category: 'Ayurveda Samhita & Commentaries' | 'Dravyaguna & Pharmacognosy' | 'Anatomy & Modern Physiology' | 'Research Methodology' | 'Journals & Rare Manuscripts';
  totalCopies: number;
  availableCopies: number;
  shelfLocation: string;
  status: 'Available' | 'Low Copies' | 'Reserved';
}

export interface ResearchProject {
  id: string;
  projectCode: string;
  title: string;
  principalInvestigator: string;
  department: string;
  fundingAgency: string;
  budget: number;
  startDate: string;
  endDate: string;
  ethicsApprovalStatus: 'Ethics Approved' | 'Under Institutional Ethics Review' | 'Protocol Submitted';
  outreachBeneficiaries: number;
  publicationCount: number;
}

export interface ComplianceDocument {
  id: string;
  docCode: string;
  title: string;
  category: 'NCISM Annual Verification' | 'Ayush Hospital Bed Occupancy Audit' | 'University Board of Studies' | 'Herbal Garden Botanical Register' | 'Faculty Bio-Metric Audit Preparation' | 'Pharmacovigilance Return';
  department: string;
  owner: string;
  lastReviewDate: string;
  version: string;
  status: 'Verified Ready' | 'Pending Internal Sign-off' | 'Needs Update';
  evidencePackRef: string;
  simulatedSummary: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'alert';
  timestamp: string;
  read: boolean;
  moduleLink: string;
}
