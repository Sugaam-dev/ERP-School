import {
  AdmissionApplication,
  Student,
  FacultyStaff,
  TimetableEntry,
  AttendanceRecord,
  Examination,
  StudentResult,
  ClinicalLogbookEntry,
  Patient,
  OpdVisit,
  IpdAdmission,
  PharmacyItem,
  StockMovement,
  PanchakarmaBooking,
  FeeLedgerItem,
  ProcurementRequest,
  AssetRecord,
  CampusServiceRequest,
  LibraryBook,
  ResearchProject,
  ComplianceDocument,
  UserPersona,
  NotificationItem,
} from '../types';

export const INITIAL_PERSONAS: UserPersona[] = [
  {
    id: 'persona-1',
    username: 'admin',
    name: 'Dr. Rajeshwar Sharma',
    role: 'admin',
    roleTitle: 'Chief System Administrator',
    department: 'Campus Administration & IT',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    email: 'r.sharma@pmrgsolution.com',
  },
  {
    id: 'persona-2',
    username: 'principal',
    name: 'Prof. (Dr.) Vasant Vaidya',
    role: 'principal',
    roleTitle: 'Principal & Dean of Ayurveda',
    department: 'Office of the Principal',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    email: 'principal@ayurvedacollege.edu.in',
  },
  {
    id: 'persona-3',
    username: 'academic',
    name: 'Dr. Meenakshi Sundaram',
    role: 'academic_coordinator',
    roleTitle: 'Academic Dean & UG Coordinator',
    department: 'Academic Office',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    email: 'academic.dean@ayurvedacollege.edu.in',
  },
  {
    id: 'persona-4',
    username: 'faculty',
    name: 'Dr. Anand K. Joshi',
    role: 'faculty',
    roleTitle: 'Associate Professor & HOD',
    department: 'Panchakarma Department',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    email: 'anand.joshi@ayurvedacollege.edu.in',
  },
  {
    id: 'persona-5',
    username: 'finance',
    name: 'Shri Rakesh Agrawal',
    role: 'finance_officer',
    roleTitle: 'Chief Finance & Accounts Officer',
    department: 'Finance & Accounts',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    email: 'finance@ayurvedacollege.edu.in',
  },
  {
    id: 'persona-6',
    username: 'hospital',
    name: 'Dr. Sunita Deshmukh',
    role: 'hospital_admin',
    roleTitle: 'Medical Superintendent & Hospital Admin',
    department: 'Ayurveda Teaching Hospital',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
    email: 'hospital.admin@ayurvedacollege.edu.in',
  },
  {
    id: 'persona-7',
    username: 'pharmacist',
    name: 'Vaidya Harishankar Pathak',
    role: 'pharmacist',
    roleTitle: 'Chief Pharmacist & Stores Head',
    department: 'Ayurvedic Pharmacy & Stores',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    email: 'pharmacy@ayurvedacollege.edu.in',
  },
];

// 12 Faculty and Staff Members
export const INITIAL_FACULTY: FacultyStaff[] = [
  {
    id: 'fac-1',
    employeeId: 'EMP-AYU-101',
    name: 'Prof. (Dr.) Vasant Vaidya',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    designation: 'Professor & HOD',
    department: 'Kaya Chikitsa (Internal Medicine)',
    qualification: 'BAMS, MD (Ayurveda), Ph.D.',
    experienceYears: 24,
    email: 'v.vaidya@ayurvedacollege.edu.in',
    phone: '+91 98230 44101',
    shift: 'General (09:00 - 17:00)',
    status: 'Active',
    role: 'principal',
  },
  {
    id: 'fac-2',
    employeeId: 'EMP-AYU-102',
    name: 'Dr. Anand K. Joshi',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    designation: 'Associate Professor',
    department: 'Panchakarma',
    qualification: 'BAMS, MD (Panchakarma)',
    experienceYears: 16,
    email: 'anand.joshi@ayurvedacollege.edu.in',
    phone: '+91 98230 44102',
    shift: 'Morning & Ward (08:30 - 16:30)',
    status: 'Active',
    role: 'faculty',
  },
  {
    id: 'fac-3',
    employeeId: 'EMP-AYU-103',
    name: 'Dr. Meenakshi Sundaram',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    designation: 'Professor & HOD',
    department: 'Dravyaguna Vijnana (Materia Medica)',
    qualification: 'BAMS, MD (Dravyaguna)',
    experienceYears: 20,
    email: 'm.sundaram@ayurvedacollege.edu.in',
    phone: '+91 98230 44103',
    shift: 'General (09:00 - 17:00)',
    status: 'Active',
    role: 'academic_coordinator',
  },
  {
    id: 'fac-4',
    employeeId: 'EMP-AYU-104',
    name: 'Dr. Sunita Deshmukh',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
    designation: 'Senior Medical Officer',
    department: 'Hospital Administration & Prasuti Tantra',
    qualification: 'BAMS, MS (Prasuti & Stri Roga)',
    experienceYears: 18,
    email: 's.deshmukh@ayurvedacollege.edu.in',
    phone: '+91 98230 44104',
    shift: 'Hospital Day (08:00 - 16:00)',
    status: 'Active',
    role: 'hospital_admin',
  },
  {
    id: 'fac-5',
    employeeId: 'EMP-AYU-105',
    name: 'Dr. Girish N. Bhatt',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80',
    designation: 'Professor & HOD',
    department: 'Shalya Tantra (Surgery & Marma)',
    qualification: 'BAMS, MS (Shalya Tantra)',
    experienceYears: 22,
    email: 'g.bhatt@ayurvedacollege.edu.in',
    phone: '+91 98230 44105',
    shift: 'Surgical OT & Ward (08:30 - 16:30)',
    status: 'Active',
    role: 'faculty',
  },
  {
    id: 'fac-6',
    employeeId: 'EMP-AYU-106',
    name: 'Dr. Pallavi Kulkarni',
    avatar: 'https://images.unsplash.com/photo-1594824813583-4a11c8a14db1?w=150&auto=format&fit=crop&q=80',
    designation: 'Assistant Professor',
    department: 'Samhita & Siddhanta',
    qualification: 'BAMS, MD (Ayurveda Samhita)',
    experienceYears: 9,
    email: 'p.kulkarni@ayurvedacollege.edu.in',
    phone: '+91 98230 44106',
    shift: 'General (09:00 - 17:00)',
    status: 'Active',
    role: 'faculty',
  },
  {
    id: 'fac-7',
    employeeId: 'EMP-AYU-107',
    name: 'Dr. Hemant R. Patil',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    designation: 'Associate Professor',
    department: 'Rasa Shastra & Bhaishajya Kalpana',
    qualification: 'BAMS, MD (Rasa Shastra)',
    experienceYears: 14,
    email: 'h.patil@ayurvedacollege.edu.in',
    phone: '+91 98230 44107',
    shift: 'Pharmacy Lab (09:00 - 17:00)',
    status: 'Active',
    role: 'faculty',
  },
  {
    id: 'fac-8',
    employeeId: 'EMP-AYU-108',
    name: 'Dr. Shraddha Sen',
    avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&auto=format&fit=crop&q=80',
    designation: 'Assistant Professor',
    department: 'Kaumarbhritya (Pediatrics)',
    qualification: 'BAMS, MD (Kaumarbhritya)',
    experienceYears: 8,
    email: 's.sen@ayurvedacollege.edu.in',
    phone: '+91 98230 44108',
    shift: 'General (09:00 - 17:00)',
    status: 'Active',
    role: 'faculty',
  },
  {
    id: 'fac-9',
    employeeId: 'EMP-AYU-109',
    name: 'Vaidya Harishankar Pathak',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    designation: 'Chief Pharmacist',
    department: 'Ayurvedic Pharmacy & Stores',
    qualification: 'BAMS, D.Pharm (Ayurveda)',
    experienceYears: 17,
    email: 'h.pathak@ayurvedacollege.edu.in',
    phone: '+91 98230 44109',
    shift: 'Stores (08:00 - 16:30)',
    status: 'Active',
    role: 'pharmacist',
  },
  {
    id: 'fac-10',
    employeeId: 'EMP-AYU-110',
    name: 'Shri Rakesh Agrawal',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    designation: 'Accounts Officer',
    department: 'Finance & Accounts',
    qualification: 'M.Com, Chartered Accountant (Inter)',
    experienceYears: 15,
    email: 'r.agrawal@ayurvedacollege.edu.in',
    phone: '+91 98230 44110',
    shift: 'Admin (09:30 - 17:30)',
    status: 'Active',
    role: 'finance_officer',
  },
  {
    id: 'fac-11',
    employeeId: 'EMP-AYU-111',
    name: 'Dr. Suresh M. Hegde',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    designation: 'Lecturer',
    department: 'Swasthavritta & Yoga',
    qualification: 'BAMS, MD (Swasthavritta)',
    experienceYears: 5,
    email: 's.hegde@ayurvedacollege.edu.in',
    phone: '+91 98230 44111',
    shift: 'Morning Yoga & Ward (07:00 - 15:00)',
    status: 'Active',
    role: 'faculty',
  },
  {
    id: 'fac-12',
    employeeId: 'EMP-AYU-112',
    name: 'Dr. Radhika Nair',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    designation: 'Associate Professor',
    department: 'Shalakya Tantra (ENT & Ophthalmology)',
    qualification: 'BAMS, MS (Shalakya Tantra)',
    experienceYears: 13,
    email: 'r.nair@ayurvedacollege.edu.in',
    phone: '+91 98230 44112',
    shift: 'General (09:00 - 17:00)',
    status: 'On Leave',
    role: 'faculty',
  },
];

// 40 Students across BAMS Batches & Semesters
export const INITIAL_STUDENTS: Student[] = [
  // Batch 2023-28 (1st / 2nd Prof)
  { id: 'std-1', rollNo: 'BAMS-23-001', name: 'Aarav Sharma', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80', program: 'BAMS (UG)', batch: '2023-28', currentSemester: '2nd Prof', attendancePercent: 88.5, feeStatus: 'Paid', balanceFee: 0, mentorName: 'Dr. Anand K. Joshi', email: 'aarav.s@ayustudent.in', phone: '+91 98111 00101', bloodGroup: 'B+', hostelRoom: 'H-101', clinicalPostingDept: 'Dravyaguna Lab' },
  { id: 'std-2', rollNo: 'BAMS-23-002', name: 'Ananya Iyer', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80', program: 'BAMS (UG)', batch: '2023-28', currentSemester: '2nd Prof', attendancePercent: 94.0, feeStatus: 'Paid', balanceFee: 0, mentorName: 'Dr. Meenakshi Sundaram', email: 'ananya.i@ayustudent.in', phone: '+91 98111 00102', bloodGroup: 'O+', hostelRoom: 'GH-204', clinicalPostingDept: 'Rasa Shastra Lab' },
  { id: 'std-3', rollNo: 'BAMS-23-003', name: 'Rohan Deshmukh', avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=100&auto=format&fit=crop&q=80', program: 'BAMS (UG)', batch: '2023-28', currentSemester: '2nd Prof', attendancePercent: 71.2, feeStatus: 'Partial', balanceFee: 45000, mentorName: 'Dr. Pallavi Kulkarni', email: 'rohan.d@ayustudent.in', phone: '+91 98111 00103', bloodGroup: 'A+', hostelRoom: 'H-104', clinicalPostingDept: 'Samhita' },
  { id: 'std-4', rollNo: 'BAMS-23-004', name: 'Pooja Verma', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80', program: 'BAMS (UG)', batch: '2023-28', currentSemester: '2nd Prof', attendancePercent: 86.4, feeStatus: 'Paid', balanceFee: 0, mentorName: 'Dr. Hemant R. Patil', email: 'pooja.v@ayustudent.in', phone: '+91 98111 00104', bloodGroup: 'AB+', hostelRoom: 'Day Scholar', clinicalPostingDept: 'Rasa Shastra Lab' },
  { id: 'std-5', rollNo: 'BAMS-23-005', name: 'Devendra Meena', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80', program: 'BAMS (UG)', batch: '2023-28', currentSemester: '2nd Prof', attendancePercent: 68.0, feeStatus: 'Overdue', balanceFee: 85000, mentorName: 'Dr. Anand K. Joshi', email: 'dev.m@ayustudent.in', phone: '+91 98111 00105', bloodGroup: 'O-', hostelRoom: 'H-112', clinicalPostingDept: 'Dravyaguna Lab' },
  { id: 'std-6', rollNo: 'BAMS-23-006', name: 'Kavya Pillai', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80', program: 'BAMS (UG)', batch: '2023-28', currentSemester: '2nd Prof', attendancePercent: 92.5, feeStatus: 'Paid', balanceFee: 0, mentorName: 'Dr. Meenakshi Sundaram', email: 'kavya.p@ayustudent.in', phone: '+91 98111 00106', bloodGroup: 'B-', hostelRoom: 'GH-208', clinicalPostingDept: 'Herbal Garden Posting' },
  { id: 'std-7', rollNo: 'BAMS-23-007', name: 'Varun Joshi', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80', program: 'BAMS (UG)', batch: '2023-28', currentSemester: '2nd Prof', attendancePercent: 84.0, feeStatus: 'Paid', balanceFee: 0, mentorName: 'Dr. Anand K. Joshi', email: 'varun.j@ayustudent.in', phone: '+91 98111 00107', bloodGroup: 'A+', hostelRoom: 'H-115', clinicalPostingDept: 'Rasa Shastra Lab' },
  { id: 'std-8', rollNo: 'BAMS-23-008', name: 'Sneha Patel', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80', program: 'BAMS (UG)', batch: '2023-28', currentSemester: '2nd Prof', attendancePercent: 91.0, feeStatus: 'Paid', balanceFee: 0, mentorName: 'Dr. Pallavi Kulkarni', email: 'sneha.p@ayustudent.in', phone: '+91 98111 00108', bloodGroup: 'O+', hostelRoom: 'GH-210', clinicalPostingDept: 'Samhita' },
  { id: 'std-9', rollNo: 'BAMS-23-009', name: 'Nikhil Rane', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80', program: 'BAMS (UG)', batch: '2023-28', currentSemester: '2nd Prof', attendancePercent: 74.5, feeStatus: 'Pending', balanceFee: 50000, mentorName: 'Dr. Hemant R. Patil', email: 'nikhil.r@ayustudent.in', phone: '+91 98111 00109', bloodGroup: 'B+', hostelRoom: 'H-120', clinicalPostingDept: 'Dravyaguna Lab' },
  { id: 'std-10', rollNo: 'BAMS-23-010', name: 'Divya Nair', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80', program: 'BAMS (UG)', batch: '2023-28', currentSemester: '2nd Prof', attendancePercent: 95.8, feeStatus: 'Paid', balanceFee: 0, mentorName: 'Dr. Meenakshi Sundaram', email: 'divya.n@ayustudent.in', phone: '+91 98111 00110', bloodGroup: 'A-', hostelRoom: 'GH-215', clinicalPostingDept: 'Herbal Garden Posting' },

  // Batch 2022-27 (3rd Prof / Clinical Postings)
  { id: 'std-11', rollNo: 'BAMS-22-011', name: 'Aditya Kulkarni', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80', program: 'BAMS (UG)', batch: '2022-27', currentSemester: '3rd Prof', attendancePercent: 89.2, feeStatus: 'Paid', balanceFee: 0, mentorName: 'Prof. (Dr.) Vasant Vaidya', email: 'aditya.k@ayustudent.in', phone: '+91 98111 00111', bloodGroup: 'O+', hostelRoom: 'H-201', clinicalPostingDept: 'Kaya Chikitsa OPD' },
  { id: 'std-12', rollNo: 'BAMS-22-012', name: 'Tanvi Shinde', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80', program: 'BAMS (UG)', batch: '2022-27', currentSemester: '3rd Prof', attendancePercent: 90.5, feeStatus: 'Paid', balanceFee: 0, mentorName: 'Dr. Sunita Deshmukh', email: 'tanvi.s@ayustudent.in', phone: '+91 98111 00112', bloodGroup: 'B+', hostelRoom: 'GH-302', clinicalPostingDept: 'Prasuti & Stri Roga' },
  { id: 'std-13', rollNo: 'BAMS-22-013', name: 'Prathamesh Gaikwad', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80', program: 'BAMS (UG)', batch: '2022-27', currentSemester: '3rd Prof', attendancePercent: 73.0, feeStatus: 'Overdue', balanceFee: 65000, mentorName: 'Dr. Girish N. Bhatt', email: 'prathamesh.g@ayustudent.in', phone: '+91 98111 00113', bloodGroup: 'AB-', hostelRoom: 'H-204', clinicalPostingDept: 'Shalya Tantra Minor OT' },
  { id: 'std-14', rollNo: 'BAMS-22-014', name: 'Ritu Chaudhary', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80', program: 'BAMS (UG)', batch: '2022-27', currentSemester: '3rd Prof', attendancePercent: 87.0, feeStatus: 'Paid', balanceFee: 0, mentorName: 'Dr. Shraddha Sen', email: 'ritu.c@ayustudent.in', phone: '+91 98111 00114', bloodGroup: 'A+', hostelRoom: 'GH-306', clinicalPostingDept: 'Kaumarbhritya Ward' },
  { id: 'std-15', rollNo: 'BAMS-22-015', name: 'Mohit Rawat', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80', program: 'BAMS (UG)', batch: '2022-27', currentSemester: '3rd Prof', attendancePercent: 82.5, feeStatus: 'Paid', balanceFee: 0, mentorName: 'Dr. Anand K. Joshi', email: 'mohit.r@ayustudent.in', phone: '+91 98111 00115', bloodGroup: 'O+', hostelRoom: 'H-209', clinicalPostingDept: 'Panchakarma Unit' },
  { id: 'std-16', rollNo: 'BAMS-22-016', name: 'Neha Bhattacharya', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80', program: 'BAMS (UG)', batch: '2022-27', currentSemester: '3rd Prof', attendancePercent: 93.4, feeStatus: 'Paid', balanceFee: 0, mentorName: 'Prof. (Dr.) Vasant Vaidya', email: 'neha.b@ayustudent.in', phone: '+91 98111 00116', bloodGroup: 'B+', hostelRoom: 'GH-310', clinicalPostingDept: 'Kaya Chikitsa Ward' },
  { id: 'std-17', rollNo: 'BAMS-22-017', name: 'Sameer Qureshi', avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=100&auto=format&fit=crop&q=80', program: 'BAMS (UG)', batch: '2022-27', currentSemester: '3rd Prof', attendancePercent: 81.0, feeStatus: 'Partial', balanceFee: 30000, mentorName: 'Dr. Girish N. Bhatt', email: 'sameer.q@ayustudent.in', phone: '+91 98111 00117', bloodGroup: 'A-', hostelRoom: 'H-214', clinicalPostingDept: 'Shalya Tantra' },
  { id: 'std-18', rollNo: 'BAMS-22-018', name: 'Aakriti Mathur', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80', program: 'BAMS (UG)', batch: '2022-27', currentSemester: '3rd Prof', attendancePercent: 89.8, feeStatus: 'Paid', balanceFee: 0, mentorName: 'Dr. Radhika Nair', email: 'aakriti.m@ayustudent.in', phone: '+91 98111 00118', bloodGroup: 'O+', hostelRoom: 'GH-314', clinicalPostingDept: 'Shalakya Tantra Eye/ENT' },
  { id: 'std-19', rollNo: 'BAMS-22-019', name: 'Kunal Singhania', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80', program: 'BAMS (UG)', batch: '2022-27', currentSemester: '3rd Prof', attendancePercent: 76.0, feeStatus: 'Paid', balanceFee: 0, mentorName: 'Dr. Anand K. Joshi', email: 'kunal.s@ayustudent.in', phone: '+91 98111 00119', bloodGroup: 'B+', hostelRoom: 'Day Scholar', clinicalPostingDept: 'Panchakarma Unit' },
  { id: 'std-20', rollNo: 'BAMS-22-020', name: 'Priyanka Ghosh', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80', program: 'BAMS (UG)', batch: '2022-27', currentSemester: '3rd Prof', attendancePercent: 91.5, feeStatus: 'Paid', balanceFee: 0, mentorName: 'Dr. Sunita Deshmukh', email: 'priyanka.g@ayustudent.in', phone: '+91 98111 00120', bloodGroup: 'AB+', hostelRoom: 'GH-318', clinicalPostingDept: 'Prasuti & Stri Roga' },

  // Batch 2021-26 (Final Prof)
  { id: 'std-21', rollNo: 'BAMS-21-021', name: 'Manish Tiwari', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80', program: 'BAMS (UG)', batch: '2021-26', currentSemester: 'Final Prof', attendancePercent: 92.1, feeStatus: 'Paid', balanceFee: 0, mentorName: 'Prof. (Dr.) Vasant Vaidya', email: 'manish.t@ayustudent.in', phone: '+91 98111 00121', bloodGroup: 'O+', hostelRoom: 'H-301', clinicalPostingDept: 'Kaya Chikitsa IPD' },
  { id: 'std-22', rollNo: 'BAMS-21-022', name: 'Swati Menon', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80', program: 'BAMS (UG)', batch: '2021-26', currentSemester: 'Final Prof', attendancePercent: 96.0, feeStatus: 'Paid', balanceFee: 0, mentorName: 'Dr. Anand K. Joshi', email: 'swati.m@ayustudent.in', phone: '+91 98111 00122', bloodGroup: 'A+', hostelRoom: 'GH-401', clinicalPostingDept: 'Panchakarma Center' },
  { id: 'std-23', rollNo: 'BAMS-21-023', name: 'Karthik Raja', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80', program: 'BAMS (UG)', batch: '2021-26', currentSemester: 'Final Prof', attendancePercent: 83.4, feeStatus: 'Paid', balanceFee: 0, mentorName: 'Dr. Girish N. Bhatt', email: 'karthik.r@ayustudent.in', phone: '+91 98111 00123', bloodGroup: 'B+', hostelRoom: 'H-305', clinicalPostingDept: 'Shalya Tantra OT' },
  { id: 'std-24', rollNo: 'BAMS-21-024', name: 'Bhavna Chauhan', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80', program: 'BAMS (UG)', batch: '2021-26', currentSemester: 'Final Prof', attendancePercent: 78.5, feeStatus: 'Partial', balanceFee: 35000, mentorName: 'Dr. Sunita Deshmukh', email: 'bhavna.c@ayustudent.in', phone: '+91 98111 00124', bloodGroup: 'O-', hostelRoom: 'GH-405', clinicalPostingDept: 'Prasuti & Gynec' },
  { id: 'std-25', rollNo: 'BAMS-21-025', name: 'Gaurav Pandey', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80', program: 'BAMS (UG)', batch: '2021-26', currentSemester: 'Final Prof', attendancePercent: 88.0, feeStatus: 'Paid', balanceFee: 0, mentorName: 'Dr. Shraddha Sen', email: 'gaurav.p@ayustudent.in', phone: '+91 98111 00125', bloodGroup: 'A+', hostelRoom: 'H-310', clinicalPostingDept: 'Kaumarbhritya OPD' },
  { id: 'std-26', rollNo: 'BAMS-21-026', name: 'Siddhi Sawant', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80', program: 'BAMS (UG)', batch: '2021-26', currentSemester: 'Final Prof', attendancePercent: 94.2, feeStatus: 'Paid', balanceFee: 0, mentorName: 'Prof. (Dr.) Vasant Vaidya', email: 'siddhi.s@ayustudent.in', phone: '+91 98111 00126', bloodGroup: 'B+', hostelRoom: 'Day Scholar', clinicalPostingDept: 'Kaya Chikitsa IPD' },
  { id: 'std-27', rollNo: 'BAMS-21-027', name: 'Yashvardhan Jain', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80', program: 'BAMS (UG)', batch: '2021-26', currentSemester: 'Final Prof', attendancePercent: 69.5, feeStatus: 'Overdue', balanceFee: 90000, mentorName: 'Dr. Suresh M. Hegde', email: 'yash.j@ayustudent.in', phone: '+91 98111 00127', bloodGroup: 'AB+', hostelRoom: 'H-315', clinicalPostingDept: 'Swasthavritta Community' },
  { id: 'std-28', rollNo: 'BAMS-21-028', name: 'Madhuri Dixit-Rao', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80', program: 'BAMS (UG)', batch: '2021-26', currentSemester: 'Final Prof', attendancePercent: 90.0, feeStatus: 'Paid', balanceFee: 0, mentorName: 'Dr. Radhika Nair', email: 'madhuri.r@ayustudent.in', phone: '+91 98111 00128', bloodGroup: 'O+', hostelRoom: 'GH-412', clinicalPostingDept: 'Shalakya Tantra' },
  { id: 'std-29', rollNo: 'BAMS-21-029', name: 'Vikramaditya Solanki', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80', program: 'BAMS (UG)', batch: '2021-26', currentSemester: 'Final Prof', attendancePercent: 85.5, feeStatus: 'Paid', balanceFee: 0, mentorName: 'Dr. Girish N. Bhatt', email: 'vikram.s@ayustudent.in', phone: '+91 98111 00129', bloodGroup: 'B-', hostelRoom: 'H-318', clinicalPostingDept: 'Shalya Tantra' },
  { id: 'std-30', rollNo: 'BAMS-21-030', name: 'Alka Tripathi', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80', program: 'BAMS (UG)', batch: '2021-26', currentSemester: 'Final Prof', attendancePercent: 91.8, feeStatus: 'Paid', balanceFee: 0, mentorName: 'Dr. Anand K. Joshi', email: 'alka.t@ayustudent.in', phone: '+91 98111 00130', bloodGroup: 'A+', hostelRoom: 'GH-416', clinicalPostingDept: 'Panchakarma Center' },

  // Batch 2020-25 (Internship)
  { id: 'std-31', rollNo: 'BAMS-20-INT-031', name: 'Dr. (Intern) Arjun Nair', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80', program: 'BAMS (UG)', batch: '2020-25', currentSemester: 'Internship', attendancePercent: 97.0, feeStatus: 'Paid', balanceFee: 0, mentorName: 'Prof. (Dr.) Vasant Vaidya', email: 'arjun.nair@ayustudent.in', phone: '+91 98111 00131', bloodGroup: 'O+', hostelRoom: 'Interns Hostel 12', clinicalPostingDept: 'Hospital Casualty / IPD' },
  { id: 'std-32', rollNo: 'BAMS-20-INT-032', name: 'Dr. (Intern) Shalini Menon', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80', program: 'BAMS (UG)', batch: '2020-25', currentSemester: 'Internship', attendancePercent: 95.5, feeStatus: 'Paid', balanceFee: 0, mentorName: 'Dr. Sunita Deshmukh', email: 'shalini.m@ayustudent.in', phone: '+91 98111 00132', bloodGroup: 'A+', hostelRoom: 'Interns Hostel 24', clinicalPostingDept: 'Labour Room & OPD' },
  { id: 'std-33', rollNo: 'BAMS-20-INT-033', name: 'Dr. (Intern) Vivek Hegde', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80', program: 'BAMS (UG)', batch: '2020-25', currentSemester: 'Internship', attendancePercent: 92.0, feeStatus: 'Paid', balanceFee: 0, mentorName: 'Dr. Anand K. Joshi', email: 'vivek.h@ayustudent.in', phone: '+91 98111 00133', bloodGroup: 'B+', hostelRoom: 'Interns Hostel 08', clinicalPostingDept: 'Panchakarma Theatre' },
  { id: 'std-34', rollNo: 'BAMS-20-INT-034', name: 'Dr. (Intern) Pallavi Gokhale', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80', program: 'BAMS (UG)', batch: '2020-25', currentSemester: 'Internship', attendancePercent: 94.8, feeStatus: 'Paid', balanceFee: 0, mentorName: 'Dr. Girish N. Bhatt', email: 'pallavi.g@ayustudent.in', phone: '+91 98111 00134', bloodGroup: 'O+', hostelRoom: 'Day Scholar', clinicalPostingDept: 'Ksharasutra Clinic' },
  { id: 'std-35', rollNo: 'BAMS-20-INT-035', name: 'Dr. (Intern) Tarun Biswas', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80', program: 'BAMS (UG)', batch: '2020-25', currentSemester: 'Internship', attendancePercent: 91.0, feeStatus: 'Paid', balanceFee: 0, mentorName: 'Prof. (Dr.) Vasant Vaidya', email: 'tarun.b@ayustudent.in', phone: '+91 98111 00135', bloodGroup: 'AB+', hostelRoom: 'Interns Hostel 15', clinicalPostingDept: 'IPD Kaya Chikitsa' },

  // PG Scholars (MD/MS Ayurveda 2024-27)
  { id: 'std-36', rollNo: 'PG-MD-24-036', name: 'Dr. Rohit V. Saxena', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80', program: 'MD/MS Ayurveda (PG)', batch: '2024-27', currentSemester: '1st Prof', attendancePercent: 96.5, feeStatus: 'Paid', balanceFee: 0, mentorName: 'Dr. Anand K. Joshi', email: 'rohit.s@ayupg.in', phone: '+91 98111 00136', bloodGroup: 'O+', hostelRoom: 'PG Hostel 04', clinicalPostingDept: 'Panchakarma Special OPD' },
  { id: 'std-37', rollNo: 'PG-MD-24-037', name: 'Dr. Geetika S. Nair', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80', program: 'MD/MS Ayurveda (PG)', batch: '2024-27', currentSemester: '1st Prof', attendancePercent: 93.8, feeStatus: 'Paid', balanceFee: 0, mentorName: 'Dr. Meenakshi Sundaram', email: 'geetika.n@ayupg.in', phone: '+91 98111 00137', bloodGroup: 'B+', hostelRoom: 'PG Hostel 12', clinicalPostingDept: 'Dravyaguna Herbarium' },
  { id: 'std-38', rollNo: 'PG-MS-24-038', name: 'Dr. Abhishek S. Mane', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80', program: 'MD/MS Ayurveda (PG)', batch: '2024-27', currentSemester: '1st Prof', attendancePercent: 88.0, feeStatus: 'Partial', balanceFee: 55000, mentorName: 'Dr. Girish N. Bhatt', email: 'abhishek.m@ayupg.in', phone: '+91 98111 00138', bloodGroup: 'A+', hostelRoom: 'PG Hostel 18', clinicalPostingDept: 'Shalya Minor OT' },
  { id: 'std-39', rollNo: 'PG-MD-24-039', name: 'Dr. Smriti P. Sen', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80', program: 'MD/MS Ayurveda (PG)', batch: '2024-27', currentSemester: '1st Prof', attendancePercent: 95.2, feeStatus: 'Paid', balanceFee: 0, mentorName: 'Dr. Sunita Deshmukh', email: 'smriti.s@ayupg.in', phone: '+91 98111 00139', bloodGroup: 'O-', hostelRoom: 'PG Hostel 22', clinicalPostingDept: 'Prasuti & Gynec' },
  { id: 'std-40', rollNo: 'PG-MD-24-040', name: 'Dr. Chaitanya Bhave', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80', program: 'MD/MS Ayurveda (PG)', batch: '2024-27', currentSemester: '1st Prof', attendancePercent: 90.0, feeStatus: 'Paid', balanceFee: 0, mentorName: 'Prof. (Dr.) Vasant Vaidya', email: 'chaitanya.b@ayupg.in', phone: '+91 98111 00140', bloodGroup: 'B+', hostelRoom: 'PG Hostel 07', clinicalPostingDept: 'Kaya Chikitsa Ward' },
];

// 20 Admission Applications (NEET UG/PG verified)
export const INITIAL_ADMISSIONS: AdmissionApplication[] = [
  { id: 'ADM-2026-001', applicantName: 'Saurabh S. Patil', neetRollNo: 'NEET-UG-26-440192', neetScore: 542, program: 'BAMS (UG)', category: 'General', submissionDate: '2026-09-14', status: 'Approved', phone: '+91 98220 11001', email: 'saurabh.patil@mail.com', hscPercentage: 86.4, documentsVerified: true, remarks: 'State Quota round 1 allotted.' },
  { id: 'ADM-2026-002', applicantName: 'Kalyani S. Dixit', neetRollNo: 'NEET-UG-26-440193', neetScore: 518, program: 'BAMS (UG)', category: 'OBC', submissionDate: '2026-09-15', status: 'Approved', phone: '+91 98220 11002', email: 'kalyani.d@mail.com', hscPercentage: 84.0, documentsVerified: true, remarks: 'Caste validity verified.' },
  { id: 'ADM-2026-003', applicantName: 'Vignesh R. Menon', neetRollNo: 'NEET-UG-26-440194', neetScore: 495, program: 'BAMS (UG)', category: 'General', submissionDate: '2026-09-16', status: 'Under Review', phone: '+91 98220 11003', email: 'vignesh.m@mail.com', hscPercentage: 81.2, documentsVerified: true, remarks: 'All India Quota round 2 candidate.' },
  { id: 'ADM-2026-004', applicantName: 'Megha P. Sonawane', neetRollNo: 'NEET-UG-26-440195', neetScore: 462, program: 'BAMS (UG)', category: 'SC', submissionDate: '2026-09-18', status: 'Approved', phone: '+91 98220 11004', email: 'megha.s@mail.com', hscPercentage: 79.5, documentsVerified: true, remarks: 'Document verification completed.' },
  { id: 'ADM-2026-005', applicantName: 'Pranav K. Joshi', neetRollNo: 'NEET-UG-26-440196', neetScore: 535, program: 'BAMS (UG)', category: 'EWS', submissionDate: '2026-09-20', status: 'Approved', phone: '+91 98220 11005', email: 'pranav.j@mail.com', hscPercentage: 88.0, documentsVerified: true, remarks: 'EWS income certificate verified.' },
  { id: 'ADM-2026-006', applicantName: 'Tanya B. Shrivastav', neetRollNo: 'NEET-UG-26-440197', neetScore: 480, program: 'BAMS (UG)', category: 'General', submissionDate: '2026-09-22', status: 'Under Review', phone: '+91 98220 11006', email: 'tanya.s@mail.com', hscPercentage: 82.5, documentsVerified: false, remarks: 'Awaiting domicile certificate original.' },
  { id: 'ADM-2026-007', applicantName: 'Chetan M. Rathod', neetRollNo: 'NEET-UG-26-440198', neetScore: 410, program: 'BAMS (UG)', category: 'ST', submissionDate: '2026-09-23', status: 'Approved', phone: '+91 98220 11007', email: 'chetan.r@mail.com', hscPercentage: 75.0, documentsVerified: true, remarks: 'ST category merit seat.' },
  { id: 'ADM-2026-008', applicantName: 'Aditi V. Bhatnagar', neetRollNo: 'NEET-UG-26-440199', neetScore: 560, program: 'BAMS (UG)', category: 'General', submissionDate: '2026-09-24', status: 'Approved', phone: '+91 98220 11008', email: 'aditi.b@mail.com', hscPercentage: 91.2, documentsVerified: true, remarks: 'Institutional scholarship shortlisted.' },
  { id: 'ADM-2026-009', applicantName: 'Naveen Kumar G.', neetRollNo: 'NEET-UG-26-440200', neetScore: 395, program: 'BAMS (UG)', category: 'Management Quota', submissionDate: '2026-09-25', status: 'Under Review', phone: '+91 98220 11009', email: 'naveen.k@mail.com', hscPercentage: 74.0, documentsVerified: false, remarks: 'Management quota scrutiny in progress.' },
  { id: 'ADM-2026-010', applicantName: 'Pallavi D. Jadhav', neetRollNo: 'NEET-UG-26-440201', neetScore: 505, program: 'BAMS (UG)', category: 'OBC', submissionDate: '2026-09-27', status: 'Approved', phone: '+91 98220 11010', email: 'pallavi.j@mail.com', hscPercentage: 83.5, documentsVerified: true, remarks: 'Eligible for fee installment scheme.' },
  { id: 'ADM-2026-011', applicantName: 'Dr. Jayant R. Karkare', neetRollNo: 'AIAPGET-26-8801', neetScore: 360, program: 'MD/MS Ayurveda (PG)', category: 'General', submissionDate: '2026-09-28', status: 'Approved', phone: '+91 98220 11011', email: 'jayant.k@mail.com', hscPercentage: 78.0, documentsVerified: true, remarks: 'Opted Kaya Chikitsa PG Seat.' },
  { id: 'ADM-2026-012', applicantName: 'Dr. Archana S. Nambiar', neetRollNo: 'AIAPGET-26-8802', neetScore: 345, program: 'MD/MS Ayurveda (PG)', category: 'General', submissionDate: '2026-09-29', status: 'Approved', phone: '+91 98220 11012', email: 'archana.n@mail.com', hscPercentage: 80.0, documentsVerified: true, remarks: 'Opted Panchakarma PG Seat.' },
  { id: 'ADM-2026-013', applicantName: 'Dr. Manoj V. Chouhan', neetRollNo: 'AIAPGET-26-8803', neetScore: 310, program: 'MD/MS Ayurveda (PG)', category: 'OBC', submissionDate: '2026-09-30', status: 'Under Review', phone: '+91 98220 11013', email: 'manoj.c@mail.com', hscPercentage: 76.5, documentsVerified: true, remarks: 'Internship completion certificate verified.' },
  { id: 'ADM-2026-014', applicantName: 'Sanjay B. Thorat', neetRollNo: 'NEET-UG-26-440204', neetScore: 320, program: 'BAMS (UG)', category: 'General', submissionDate: '2026-10-01', status: 'Rejected', phone: '+91 98220 11014', email: 'sanjay.t@mail.com', hscPercentage: 62.0, documentsVerified: false, remarks: 'Did not meet statutory percentile cut-off.' },
  { id: 'ADM-2026-015', applicantName: 'Pooja R. Deshpande', neetRollNo: 'NEET-UG-26-440205', neetScore: 524, program: 'BAMS (UG)', category: 'General', submissionDate: '2026-10-02', status: 'Approved', phone: '+91 98220 11015', email: 'pooja.rd@mail.com', hscPercentage: 89.0, documentsVerified: true, remarks: 'Seat accepted; admission fee paid.' },
  { id: 'ADM-2026-016', applicantName: 'Deepak H. Solanki', neetRollNo: 'NEET-UG-26-440206', neetScore: 472, program: 'BAMS (UG)', category: 'OBC', submissionDate: '2026-10-03', status: 'Submitted', phone: '+91 98220 11016', email: 'deepak.s@mail.com', hscPercentage: 79.0, documentsVerified: false, remarks: 'Fresh application round 3.' },
  { id: 'ADM-2026-017', applicantName: 'Isha N. Ganguly', neetRollNo: 'NEET-UG-26-440207', neetScore: 512, program: 'BAMS (UG)', category: 'General', submissionDate: '2026-10-04', status: 'Submitted', phone: '+91 98220 11017', email: 'isha.g@mail.com', hscPercentage: 85.5, documentsVerified: false, remarks: 'Counseling letter attached.' },
  { id: 'ADM-2026-018', applicantName: 'Mohd. Zeeshan', neetRollNo: 'NEET-UG-26-440208', neetScore: 488, program: 'BAMS (UG)', category: 'OBC', submissionDate: '2026-10-05', status: 'Submitted', phone: '+91 98220 11018', email: 'zeeshan.m@mail.com', hscPercentage: 81.0, documentsVerified: false, remarks: 'Under verification by scrutiny committee.' },
  { id: 'ADM-2026-019', applicantName: 'Sonal S. Borkar', neetRollNo: 'NEET-UG-26-440209', neetScore: 435, program: 'BAMS (UG)', category: 'SC', submissionDate: '2026-10-06', status: 'Submitted', phone: '+91 98220 11019', email: 'sonal.b@mail.com', hscPercentage: 77.0, documentsVerified: false, remarks: 'Awaiting caste validation stamp.' },
  { id: 'ADM-2026-020', applicantName: 'Kishore V. Hegde', neetRollNo: 'NEET-UG-26-440210', neetScore: 305, program: 'Diploma in Panchakarma', category: 'General', submissionDate: '2026-10-07', status: 'Under Review', phone: '+91 98220 11020', email: 'kishore.h@mail.com', hscPercentage: 71.0, documentsVerified: true, remarks: 'Eligible for 1-year paramedical diploma.' },
];

// 30 Attendance Records (Representative recent batch register)
export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  { id: 'att-1', studentId: 'std-1', studentName: 'Aarav Sharma', batch: '2023-28', semester: '2nd Prof', subject: 'Dravyaguna Vijnana (Theory)', date: '2026-10-12', status: 'Present', markedBy: 'Dr. Meenakshi Sundaram' },
  { id: 'att-2', studentId: 'std-2', studentName: 'Ananya Iyer', batch: '2023-28', semester: '2nd Prof', subject: 'Dravyaguna Vijnana (Theory)', date: '2026-10-12', status: 'Present', markedBy: 'Dr. Meenakshi Sundaram' },
  { id: 'att-3', studentId: 'std-3', studentName: 'Rohan Deshmukh', batch: '2023-28', semester: '2nd Prof', subject: 'Dravyaguna Vijnana (Theory)', date: '2026-10-12', status: 'Absent', markedBy: 'Dr. Meenakshi Sundaram' },
  { id: 'att-4', studentId: 'std-4', studentName: 'Pooja Verma', batch: '2023-28', semester: '2nd Prof', subject: 'Dravyaguna Vijnana (Theory)', date: '2026-10-12', status: 'Present', markedBy: 'Dr. Meenakshi Sundaram' },
  { id: 'att-5', studentId: 'std-5', studentName: 'Devendra Meena', batch: '2023-28', semester: '2nd Prof', subject: 'Dravyaguna Vijnana (Theory)', date: '2026-10-12', status: 'Absent', markedBy: 'Dr. Meenakshi Sundaram' },
  { id: 'att-6', studentId: 'std-6', studentName: 'Kavya Pillai', batch: '2023-28', semester: '2nd Prof', subject: 'Dravyaguna Vijnana (Theory)', date: '2026-10-12', status: 'Present', markedBy: 'Dr. Meenakshi Sundaram' },
  { id: 'att-7', studentId: 'std-7', studentName: 'Varun Joshi', batch: '2023-28', semester: '2nd Prof', subject: 'Dravyaguna Vijnana (Theory)', date: '2026-10-12', status: 'Present', markedBy: 'Dr. Meenakshi Sundaram' },
  { id: 'att-8', studentId: 'std-8', studentName: 'Sneha Patel', batch: '2023-28', semester: '2nd Prof', subject: 'Dravyaguna Vijnana (Theory)', date: '2026-10-12', status: 'Present', markedBy: 'Dr. Meenakshi Sundaram' },
  { id: 'att-9', studentId: 'std-9', studentName: 'Nikhil Rane', batch: '2023-28', semester: '2nd Prof', subject: 'Dravyaguna Vijnana (Theory)', date: '2026-10-12', status: 'Absent', markedBy: 'Dr. Meenakshi Sundaram' },
  { id: 'att-10', studentId: 'std-10', studentName: 'Divya Nair', batch: '2023-28', semester: '2nd Prof', subject: 'Dravyaguna Vijnana (Theory)', date: '2026-10-12', status: 'Present', markedBy: 'Dr. Meenakshi Sundaram' },

  { id: 'att-11', studentId: 'std-11', studentName: 'Aditya Kulkarni', batch: '2022-27', semester: '3rd Prof', subject: 'Kaya Chikitsa (Clinical Ward Round)', date: '2026-10-12', status: 'Present', markedBy: 'Prof. (Dr.) Vasant Vaidya' },
  { id: 'att-12', studentId: 'std-12', studentName: 'Tanvi Shinde', batch: '2022-27', semester: '3rd Prof', subject: 'Kaya Chikitsa (Clinical Ward Round)', date: '2026-10-12', status: 'Present', markedBy: 'Prof. (Dr.) Vasant Vaidya' },
  { id: 'att-13', studentId: 'std-13', studentName: 'Prathamesh Gaikwad', batch: '2022-27', semester: '3rd Prof', subject: 'Kaya Chikitsa (Clinical Ward Round)', date: '2026-10-12', status: 'Absent', markedBy: 'Prof. (Dr.) Vasant Vaidya' },
  { id: 'att-14', studentId: 'std-14', studentName: 'Ritu Chaudhary', batch: '2022-27', semester: '3rd Prof', subject: 'Kaya Chikitsa (Clinical Ward Round)', date: '2026-10-12', status: 'Present', markedBy: 'Prof. (Dr.) Vasant Vaidya' },
  { id: 'att-15', studentId: 'std-15', studentName: 'Mohit Rawat', batch: '2022-27', semester: '3rd Prof', subject: 'Kaya Chikitsa (Clinical Ward Round)', date: '2026-10-12', status: 'Present', markedBy: 'Prof. (Dr.) Vasant Vaidya' },
  { id: 'att-16', studentId: 'std-16', studentName: 'Neha Bhattacharya', batch: '2022-27', semester: '3rd Prof', subject: 'Kaya Chikitsa (Clinical Ward Round)', date: '2026-10-12', status: 'Present', markedBy: 'Prof. (Dr.) Vasant Vaidya' },
  { id: 'att-17', studentId: 'std-17', studentName: 'Sameer Qureshi', batch: '2022-27', semester: '3rd Prof', subject: 'Kaya Chikitsa (Clinical Ward Round)', date: '2026-10-12', status: 'On Leave', markedBy: 'Prof. (Dr.) Vasant Vaidya' },
  { id: 'att-18', studentId: 'std-18', studentName: 'Aakriti Mathur', batch: '2022-27', semester: '3rd Prof', subject: 'Kaya Chikitsa (Clinical Ward Round)', date: '2026-10-12', status: 'Present', markedBy: 'Prof. (Dr.) Vasant Vaidya' },
  { id: 'att-19', studentId: 'std-19', studentName: 'Kunal Singhania', batch: '2022-27', semester: '3rd Prof', subject: 'Kaya Chikitsa (Clinical Ward Round)', date: '2026-10-12', status: 'Present', markedBy: 'Prof. (Dr.) Vasant Vaidya' },
  { id: 'att-20', studentId: 'std-20', studentName: 'Priyanka Ghosh', batch: '2022-27', semester: '3rd Prof', subject: 'Kaya Chikitsa (Clinical Ward Round)', date: '2026-10-12', status: 'Present', markedBy: 'Prof. (Dr.) Vasant Vaidya' },

  { id: 'att-21', studentId: 'std-21', studentName: 'Manish Tiwari', batch: '2021-26', semester: 'Final Prof', subject: 'Panchakarma Vidhana (Practical)', date: '2026-10-12', status: 'Present', markedBy: 'Dr. Anand K. Joshi' },
  { id: 'att-22', studentId: 'std-22', studentName: 'Swati Menon', batch: '2021-26', semester: 'Final Prof', subject: 'Panchakarma Vidhana (Practical)', date: '2026-10-12', status: 'Present', markedBy: 'Dr. Anand K. Joshi' },
  { id: 'att-23', studentId: 'std-23', studentName: 'Karthik Raja', batch: '2021-26', semester: 'Final Prof', subject: 'Panchakarma Vidhana (Practical)', date: '2026-10-12', status: 'Present', markedBy: 'Dr. Anand K. Joshi' },
  { id: 'att-24', studentId: 'std-24', studentName: 'Bhavna Chauhan', batch: '2021-26', semester: 'Final Prof', subject: 'Panchakarma Vidhana (Practical)', date: '2026-10-12', status: 'Present', markedBy: 'Dr. Anand K. Joshi' },
  { id: 'att-25', studentId: 'std-25', studentName: 'Gaurav Pandey', batch: '2021-26', semester: 'Final Prof', subject: 'Panchakarma Vidhana (Practical)', date: '2026-10-12', status: 'Present', markedBy: 'Dr. Anand K. Joshi' },
  { id: 'att-26', studentId: 'std-26', studentName: 'Siddhi Sawant', batch: '2021-26', semester: 'Final Prof', subject: 'Panchakarma Vidhana (Practical)', date: '2026-10-12', status: 'Present', markedBy: 'Dr. Anand K. Joshi' },
  { id: 'att-27', studentId: 'std-27', studentName: 'Yashvardhan Jain', batch: '2021-26', semester: 'Final Prof', subject: 'Panchakarma Vidhana (Practical)', date: '2026-10-12', status: 'Absent', markedBy: 'Dr. Anand K. Joshi' },
  { id: 'att-28', studentId: 'std-28', studentName: 'Madhuri Dixit-Rao', batch: '2021-26', semester: 'Final Prof', subject: 'Panchakarma Vidhana (Practical)', date: '2026-10-12', status: 'Present', markedBy: 'Dr. Anand K. Joshi' },
  { id: 'att-29', studentId: 'std-29', studentName: 'Vikramaditya Solanki', batch: '2021-26', semester: 'Final Prof', subject: 'Panchakarma Vidhana (Practical)', date: '2026-10-12', status: 'Present', markedBy: 'Dr. Anand K. Joshi' },
  { id: 'att-30', studentId: 'std-30', studentName: 'Alka Tripathi', batch: '2021-26', semester: 'Final Prof', subject: 'Panchakarma Vidhana (Practical)', date: '2026-10-12', status: 'Present', markedBy: 'Dr. Anand K. Joshi' },
];

// Timetable Entries (Weekly schedule)
export const INITIAL_TIMETABLE: TimetableEntry[] = [
  { id: 'tt-1', day: 'Monday', timeSlot: '09:00 - 10:00 AM', subject: 'Charaka Samhita (Purvardha)', facultyId: 'fac-6', facultyName: 'Dr. Pallavi Kulkarni', batch: '2023-28', semester: '2nd Prof', room: 'Lecture Hall 1 (Dhanvantari)', type: 'Theory' },
  { id: 'tt-2', day: 'Monday', timeSlot: '10:00 - 11:00 AM', subject: 'Dravyaguna Vijnana', facultyId: 'fac-3', facultyName: 'Dr. Meenakshi Sundaram', batch: '2023-28', semester: '2nd Prof', room: 'Lecture Hall 1 (Dhanvantari)', type: 'Theory' },
  { id: 'tt-3', day: 'Monday', timeSlot: '11:15 - 01:15 PM', subject: 'Rasa Shastra & Bhaishajya Practical', facultyId: 'fac-7', facultyName: 'Dr. Hemant R. Patil', batch: '2023-28', semester: '2nd Prof', room: 'Rasa Shastra Lab', type: 'Practical / Lab' },
  { id: 'tt-4', day: 'Monday', timeSlot: '09:00 - 11:00 AM', subject: 'Kaya Chikitsa Ward Rounds', facultyId: 'fac-1', facultyName: 'Prof. (Dr.) Vasant Vaidya', batch: '2022-27', semester: '3rd Prof', room: 'Hospital Male / Female Wards', type: 'Hospital Ward Round' },
  { id: 'tt-5', day: 'Monday', timeSlot: '11:30 - 12:30 PM', subject: 'Prasuti & Stri Roga', facultyId: 'fac-4', facultyName: 'Dr. Sunita Deshmukh', batch: '2022-27', semester: '3rd Prof', room: 'Lecture Hall 2 (Sushruta)', type: 'Theory' },
  { id: 'tt-6', day: 'Monday', timeSlot: '02:00 - 04:00 PM', subject: 'Shalya Tantra Minor OT Demonstration', facultyId: 'fac-5', facultyName: 'Dr. Girish N. Bhatt', batch: '2022-27', semester: '3rd Prof', room: 'Minor OT & Ksharasutra Suite', type: 'Practical / Lab' },
  { id: 'tt-7', day: 'Monday', timeSlot: '09:00 - 12:00 PM', subject: 'Panchakarma Clinical Hands-on', facultyId: 'fac-2', facultyName: 'Dr. Anand K. Joshi', batch: '2021-26', semester: 'Final Prof', room: 'Panchakarma Hospital Suite', type: 'Hospital Ward Round' },
  { id: 'tt-8', day: 'Monday', timeSlot: '02:00 - 03:00 PM', subject: 'Research Methodology & Medical Statistics', facultyId: 'fac-3', facultyName: 'Dr. Meenakshi Sundaram', batch: '2021-26', semester: 'Final Prof', room: 'Lecture Hall 3 (Charaka)', type: 'Theory' },
  { id: 'tt-9', day: 'Tuesday', timeSlot: '09:00 - 10:00 AM', subject: 'Roga Nidana & Vikriti Vijnana', facultyId: 'fac-1', facultyName: 'Prof. (Dr.) Vasant Vaidya', batch: '2023-28', semester: '2nd Prof', room: 'Lecture Hall 1 (Dhanvantari)', type: 'Theory' },
  { id: 'tt-10', day: 'Tuesday', timeSlot: '10:00 - 12:00 PM', subject: 'Dravyaguna Herbarium & Field Work', facultyId: 'fac-3', facultyName: 'Dr. Meenakshi Sundaram', batch: '2023-28', semester: '2nd Prof', room: 'Herbal Garden Section B', type: 'Practical / Lab' },
  { id: 'tt-11', day: 'Tuesday', timeSlot: '09:00 - 10:30 AM', subject: 'Kaumarbhritya (Pediatrics)', facultyId: 'fac-8', facultyName: 'Dr. Shraddha Sen', batch: '2022-27', semester: '3rd Prof', room: 'Lecture Hall 2 (Sushruta)', type: 'Theory' },
  { id: 'tt-12', day: 'Tuesday', timeSlot: '11:00 - 01:00 PM', subject: 'Shalakya Tantra Clinical OPD', facultyId: 'fac-12', facultyName: 'Dr. Radhika Nair', batch: '2022-27', semester: '3rd Prof', room: 'Eye & ENT Unit', type: 'Hospital Ward Round' },
];

// 15 Examination Records & Student Results
export const INITIAL_EXAMS: Examination[] = [
  { id: 'ex-1', examCode: 'EXAM-26-IA-01', title: 'Internal Assessment 1: Dravyaguna Vijnana', program: 'BAMS (UG)', batch: '2023-28', semester: '2nd Prof', subject: 'Dravyaguna Vijnana', examType: 'Internal Assessment', date: '2026-09-20', maxMarks: 50, passingMarks: 25, status: 'Results Published' },
  { id: 'ex-2', examCode: 'EXAM-26-IA-02', title: 'Internal Assessment 1: Rasa Shastra & Kalpana', program: 'BAMS (UG)', batch: '2023-28', semester: '2nd Prof', subject: 'Rasa Shastra & Bhaishajya', examType: 'Internal Assessment', date: '2026-09-22', maxMarks: 50, passingMarks: 25, status: 'Results Published' },
  { id: 'ex-3', examCode: 'EXAM-26-CLIN-01', title: 'Mid-Term Clinical Practical: Kaya Chikitsa', program: 'BAMS (UG)', batch: '2022-27', semester: '3rd Prof', subject: 'Kaya Chikitsa Bedside Examination', examType: 'Clinical Practical & Viva', date: '2026-09-28', maxMarks: 100, passingMarks: 50, status: 'Results Published' },
  { id: 'ex-4', examCode: 'EXAM-26-TH-01', title: 'Theory Term Exam: Shalya Tantra', program: 'BAMS (UG)', batch: '2022-27', semester: '3rd Prof', subject: 'Shalya Tantra Paper I', examType: 'Theory Term Exam', date: '2026-10-04', maxMarks: 100, passingMarks: 50, status: 'Marks Entered' },
  { id: 'ex-5', examCode: 'EXAM-26-TH-02', title: 'Theory Term Exam: Panchakarma Vidhana', program: 'BAMS (UG)', batch: '2021-26', semester: 'Final Prof', subject: 'Panchakarma Principles & Protocols', examType: 'Theory Term Exam', date: '2026-10-18', maxMarks: 100, passingMarks: 50, status: 'Scheduled' },
];

export const INITIAL_RESULTS: StudentResult[] = [
  { id: 'res-1', examId: 'ex-1', studentId: 'std-1', studentName: 'Aarav Sharma', rollNo: 'BAMS-23-001', marksObtained: 44, maxMarks: 50, grade: 'A+', status: 'Passed' },
  { id: 'res-2', examId: 'ex-1', studentId: 'std-2', studentName: 'Ananya Iyer', rollNo: 'BAMS-23-002', marksObtained: 47, maxMarks: 50, grade: 'A+', status: 'Passed' },
  { id: 'res-3', examId: 'ex-1', studentId: 'std-3', studentName: 'Rohan Deshmukh', rollNo: 'BAMS-23-003', marksObtained: 28, maxMarks: 50, grade: 'B', status: 'Passed' },
  { id: 'res-4', examId: 'ex-1', studentId: 'std-4', studentName: 'Pooja Verma', rollNo: 'BAMS-23-004', marksObtained: 42, maxMarks: 50, grade: 'A', status: 'Passed' },
  { id: 'res-5', examId: 'ex-1', studentId: 'std-5', studentName: 'Devendra Meena', rollNo: 'BAMS-23-005', marksObtained: 22, maxMarks: 50, grade: 'F', status: 'Failed' },
  { id: 'res-6', examId: 'ex-2', studentId: 'std-1', studentName: 'Aarav Sharma', rollNo: 'BAMS-23-001', marksObtained: 41, maxMarks: 50, grade: 'A', status: 'Passed' },
  { id: 'res-7', examId: 'ex-2', studentId: 'std-2', studentName: 'Ananya Iyer', rollNo: 'BAMS-23-002', marksObtained: 46, maxMarks: 50, grade: 'A+', status: 'Passed' },
  { id: 'res-8', examId: 'ex-2', studentId: 'std-6', studentName: 'Kavya Pillai', rollNo: 'BAMS-23-006', marksObtained: 45, maxMarks: 50, grade: 'A+', status: 'Passed' },
  { id: 'res-9', examId: 'ex-2', studentId: 'std-7', studentName: 'Varun Joshi', rollNo: 'BAMS-23-007', marksObtained: 38, maxMarks: 50, grade: 'B+', status: 'Passed' },
  { id: 'res-10', examId: 'ex-3', studentId: 'std-11', studentName: 'Aditya Kulkarni', rollNo: 'BAMS-22-011', marksObtained: 89, maxMarks: 100, grade: 'A+', status: 'Passed' },
  { id: 'res-11', examId: 'ex-3', studentId: 'std-12', studentName: 'Tanvi Shinde', rollNo: 'BAMS-22-012', marksObtained: 92, maxMarks: 100, grade: 'A+', status: 'Passed' },
  { id: 'res-12', examId: 'ex-3', studentId: 'std-13', studentName: 'Prathamesh Gaikwad', rollNo: 'BAMS-22-013', marksObtained: 58, maxMarks: 100, grade: 'B', status: 'Passed' },
  { id: 'res-13', examId: 'ex-3', studentId: 'std-14', studentName: 'Ritu Chaudhary', rollNo: 'BAMS-22-014', marksObtained: 84, maxMarks: 100, grade: 'A', status: 'Passed' },
  { id: 'res-14', examId: 'ex-3', studentId: 'std-15', studentName: 'Mohit Rawat', rollNo: 'BAMS-22-015', marksObtained: 79, maxMarks: 100, grade: 'B+', status: 'Passed' },
  { id: 'res-15', examId: 'ex-3', studentId: 'std-16', studentName: 'Neha Bhattacharya', rollNo: 'BAMS-22-016', marksObtained: 91, maxMarks: 100, grade: 'A+', status: 'Passed' },
];

// Clinical Logbooks (Supervised Learning Cases)
export const INITIAL_LOGBOOKS: ClinicalLogbookEntry[] = [
  {
    id: 'log-1',
    studentId: 'std-11',
    studentName: 'Aditya Kulkarni',
    batch: '2022-27',
    postingDepartment: 'Kaya Chikitsa OPD & IPD',
    facultySupervisor: 'Prof. (Dr.) Vasant Vaidya',
    caseTitle: 'Amavata (Rheumatoid Arthritis) - Classical Deepana & Pachana Protocol',
    fictionalPatientRef: 'PT-ANON-7741',
    procedureType: 'Rogi Pariksha (Ashtavidha)',
    date: '2026-10-09',
    clinicalNotes: 'Documented Ashtavidha Pariksha. Highlighted Ama lakshanas (Gaurava, Aruchi, Sandhiruk). Administered Shunthi Kwatha and Vaishwanara Churna under direct faculty observation.',
    status: 'Approved',
    supervisorFeedback: 'Excellently documented dosha vitiation and agnimandya assessment. Approved for competency log.',
  },
  {
    id: 'log-2',
    studentId: 'std-12',
    studentName: 'Tanvi Shinde',
    batch: '2022-27',
    postingDepartment: 'Prasuti Tantra & Stri Roga',
    facultySupervisor: 'Dr. Sunita Deshmukh',
    caseTitle: 'Artava Dushti - Garbhashaya Shodhana & Yonidhavana Observation',
    fictionalPatientRef: 'PT-ANON-7742',
    procedureType: 'Panchakarma Protocol',
    date: '2026-10-10',
    clinicalNotes: 'Observed and recorded sterile preparation of Triphala Kwatha for Yonidhavana. Checked patient vitals and charted post-procedure rest protocol.',
    status: 'Approved',
    supervisorFeedback: 'Aseptic techniques noted correctly.',
  },
  {
    id: 'log-3',
    studentId: 'std-13',
    studentName: 'Prathamesh Gaikwad',
    batch: '2022-27',
    postingDepartment: 'Shalya Tantra Minor OT',
    facultySupervisor: 'Dr. Girish N. Bhatt',
    caseTitle: 'Bhagandara (Fistula-in-ano) Ksharasutra Thread Changing Procedure',
    fictionalPatientRef: 'PT-ANON-7743',
    procedureType: 'Shalya Minor Procedure',
    date: '2026-10-08',
    clinicalNotes: 'Recorded grading of external opening. Prepared Apamarga Ksharasutra under sterile tray setup. Noted patient tolerance and analgesia management.',
    status: 'Returned for Revision',
    supervisorFeedback: 'Missing cut-through length calculation from previous weekly sitting. Update measurement and resubmit.',
  },
  {
    id: 'log-4',
    studentId: 'std-15',
    studentName: 'Mohit Rawat',
    batch: '2022-27',
    postingDepartment: 'Panchakarma Theatre',
    facultySupervisor: 'Dr. Anand K. Joshi',
    caseTitle: 'Katigraha (Lumbar Spondylosis) - Kati Basti Protocol',
    fictionalPatientRef: 'PT-ANON-7744',
    procedureType: 'Panchakarma Protocol',
    date: '2026-10-11',
    clinicalNotes: 'Masha mridu dam constructed over L4-S1. Sahacharadi Taila warm retention maintained at 39-40°C for 35 mins. Nadisweda given post basti.',
    status: 'Pending Review',
    supervisorFeedback: undefined,
  },
  {
    id: 'log-5',
    studentId: 'std-21',
    studentName: 'Manish Tiwari',
    batch: '2021-26',
    postingDepartment: 'Kaya Chikitsa IPD',
    facultySupervisor: 'Prof. (Dr.) Vasant Vaidya',
    caseTitle: 'Tamaka Shwasa (Bronchial Asthma) - Virechana Purvakarma Monitoring',
    fictionalPatientRef: 'PT-ANON-7745',
    procedureType: 'Kaya Chikitsa Case',
    date: '2026-10-11',
    clinicalNotes: 'Snehapana Day 3: Kantakari Ghrita 60ml at 06:30 AM. Monitored Samyak Snigdha lakshana: Vatanulomana present, Deeptagni. Kostha assessed as Madhyama.',
    status: 'Pending Review',
    supervisorFeedback: undefined,
  },
];

// 20 Fictional Patients (Strictly fictional demo records)
export const INITIAL_PATIENTS: Patient[] = [
  { id: 'pat-1', uhid: 'AY-HOSP-26-0101', name: 'Rameshwar Lal Gupta', age: 58, gender: 'Male', contact: '+91 99000 11101', address: 'Ward 4, Civil Lines, Kota', registrationDate: '2026-08-10', bloodGroup: 'B+', prakriti: 'Vata-Kapha', status: 'Active', lastVisitDate: '2026-10-12', totalVisits: 6 },
  { id: 'pat-2', uhid: 'AY-HOSP-26-0102', name: 'Savitri Devi Sharma', age: 64, gender: 'Female', contact: '+91 99000 11102', address: 'Plot 12, Shivaji Nagar', registrationDate: '2026-08-14', bloodGroup: 'O+', prakriti: 'Vata-Pitta', status: 'Active', lastVisitDate: '2026-10-12', totalVisits: 9 },
  { id: 'pat-3', uhid: 'AY-HOSP-26-0103', name: 'Dilip Kumar Verma', age: 46, gender: 'Male', contact: '+91 99000 11103', address: 'Sector 5, Housing Board', registrationDate: '2026-08-20', bloodGroup: 'A+', prakriti: 'Pitta Dominant', status: 'Active', lastVisitDate: '2026-10-12', totalVisits: 4 },
  { id: 'pat-4', uhid: 'AY-HOSP-26-0104', name: 'Sunita Ravindra Patil', age: 39, gender: 'Female', contact: '+91 99000 11104', address: 'Adarsh Colony, Lane 2', registrationDate: '2026-08-25', bloodGroup: 'B+', prakriti: 'Pitta-Kapha', status: 'Active', lastVisitDate: '2026-10-12', totalVisits: 7 },
  { id: 'pat-5', uhid: 'AY-HOSP-26-0105', name: 'Gopal Krishna Iyer', age: 72, gender: 'Male', contact: '+91 99000 11105', address: 'Temple Street, South Extn', registrationDate: '2026-09-01', bloodGroup: 'AB+', prakriti: 'Vata Dominant' as any, status: 'Active', lastVisitDate: '2026-10-11', totalVisits: 11 },
  { id: 'pat-6', uhid: 'AY-HOSP-26-0106', name: 'Kamala Bai Joshi', age: 61, gender: 'Female', contact: '+91 99000 11106', address: 'Gram Panchayat Road', registrationDate: '2026-09-03', bloodGroup: 'O+', prakriti: 'Vata-Kapha', status: 'Active', lastVisitDate: '2026-10-10', totalVisits: 5 },
  { id: 'pat-7', uhid: 'AY-HOSP-26-0107', name: 'Mahesh C. Agarwal', age: 52, gender: 'Male', contact: '+91 99000 11107', address: 'Station Road, Market Yard', registrationDate: '2026-09-05', bloodGroup: 'A-', prakriti: 'Pitta-Kapha', status: 'Active', lastVisitDate: '2026-10-12', totalVisits: 3 },
  { id: 'pat-8', uhid: 'AY-HOSP-26-0108', name: 'Lata M. Deshpande', age: 44, gender: 'Female', contact: '+91 99000 11108', address: 'Ashok Nagar, Block C', registrationDate: '2026-09-10', bloodGroup: 'B+', prakriti: 'Tridoshic', status: 'Follow-up', lastVisitDate: '2026-10-08', totalVisits: 8 },
  { id: 'pat-9', uhid: 'AY-HOSP-26-0109', name: 'Mohanlal S. Suthar', age: 67, gender: 'Male', contact: '+91 99000 11109', address: 'Village Rampura, Taluka Post', registrationDate: '2026-09-12', bloodGroup: 'O-', prakriti: 'Vata-Kapha', status: 'Active', lastVisitDate: '2026-10-12', totalVisits: 5 },
  { id: 'pat-10', uhid: 'AY-HOSP-26-0110', name: 'Rekha K. Kulkarni', age: 36, gender: 'Female', contact: '+91 99000 11110', address: 'Near Bus Stand, Guruwar Peth', registrationDate: '2026-09-15', bloodGroup: 'A+', prakriti: 'Pitta Dominant', status: 'Active', lastVisitDate: '2026-10-09', totalVisits: 4 },
  { id: 'pat-11', uhid: 'AY-HOSP-26-0111', name: 'Bhupendra Singh Rao', age: 49, gender: 'Male', contact: '+91 99000 11111', address: 'Old Fort Road, Zone 2', registrationDate: '2026-09-18', bloodGroup: 'B+', prakriti: 'Vata-Pitta', status: 'Active', lastVisitDate: '2026-10-12', totalVisits: 2 },
  { id: 'pat-12', uhid: 'AY-HOSP-26-0112', name: 'Anuradha Somani', age: 55, gender: 'Female', contact: '+91 99000 11112', address: 'Kishore Sagar Marg', registrationDate: '2026-09-20', bloodGroup: 'O+', prakriti: 'Vata-Kapha', status: 'Active', lastVisitDate: '2026-10-11', totalVisits: 6 },
  { id: 'pat-13', uhid: 'AY-HOSP-26-0113', name: 'Vinayak T. Tambe', age: 33, gender: 'Male', contact: '+91 99000 11113', address: 'Ganesh Nagar, Flat 4', registrationDate: '2026-09-22', bloodGroup: 'AB+', prakriti: 'Pitta-Kapha', status: 'Follow-up', lastVisitDate: '2026-10-05', totalVisits: 3 },
  { id: 'pat-14', uhid: 'AY-HOSP-26-0114', name: 'Usha Rani Tiwari', age: 60, gender: 'Female', contact: '+91 99000 11114', address: 'Brahmins Mohalla, No. 19', registrationDate: '2026-09-25', bloodGroup: 'B-', prakriti: 'Vata Dominant' as any, status: 'Active', lastVisitDate: '2026-10-12', totalVisits: 7 },
  { id: 'pat-15', uhid: 'AY-HOSP-26-0115', name: 'Govind Ram Meena', age: 50, gender: 'Male', contact: '+91 99000 11115', address: 'Krishi Mandi Road', registrationDate: '2026-09-28', bloodGroup: 'A+', prakriti: 'Tridoshic', status: 'Active', lastVisitDate: '2026-10-12', totalVisits: 1 },
  { id: 'pat-16', uhid: 'AY-HOSP-26-0116', name: 'Shanta Ben Patel', age: 68, gender: 'Female', contact: '+91 99000 11116', address: 'Sardar Vallabhbhai Marg', registrationDate: '2026-10-01', bloodGroup: 'O+', prakriti: 'Vata-Kapha', status: 'Active', lastVisitDate: '2026-10-10', totalVisits: 3 },
  { id: 'pat-17', uhid: 'AY-HOSP-26-0117', name: 'Kailash Chand Jain', age: 57, gender: 'Male', contact: '+91 99000 11117', address: 'Mahaveer Bhavan Galli', registrationDate: '2026-10-03', bloodGroup: 'B+', prakriti: 'Vata-Pitta', status: 'Active', lastVisitDate: '2026-10-12', totalVisits: 2 },
  { id: 'pat-18', uhid: 'AY-HOSP-26-0118', name: 'Manjula S. Hegde', age: 41, gender: 'Female', contact: '+91 99000 11118', address: 'Navrang Colony, Street 6', registrationDate: '2026-10-05', bloodGroup: 'AB-', prakriti: 'Pitta Dominant', status: 'Active', lastVisitDate: '2026-10-12', totalVisits: 2 },
  { id: 'pat-19', uhid: 'AY-HOSP-26-0119', name: 'Nandkishore R. Yadav', age: 43, gender: 'Male', contact: '+91 99000 11119', address: 'Dairy Farm Bypass', registrationDate: '2026-10-08', bloodGroup: 'O+', prakriti: 'Pitta-Kapha', status: 'Active', lastVisitDate: '2026-10-11', totalVisits: 1 },
  { id: 'pat-20', uhid: 'AY-HOSP-26-0120', name: 'Indira Bai Gaikwad', age: 70, gender: 'Female', contact: '+91 99000 11120', address: 'Subhash Nagar, Galli 3', registrationDate: '2026-10-10', bloodGroup: 'A+', prakriti: 'Vata Dominant' as any, status: 'Active', lastVisitDate: '2026-10-12', totalVisits: 1 },
];

// 15 OPD Visits (Hospital Queue)
export const INITIAL_OPD: OpdVisit[] = [
  { id: 'opd-1', tokenNo: 101, uhid: 'AY-HOSP-26-0101', patientName: 'Rameshwar Lal Gupta', age: 58, gender: 'Male', department: 'Kaya Chikitsa (General Medicine)', practitionerName: 'Prof. (Dr.) Vasant Vaidya', queueStatus: 'In Consultation', visitTime: '09:15 AM', chiefComplaint: 'Chronic Sandhivata (Osteoarthritis knee joints) with severe morning stiffness', illustrativeNotes: 'Examine for crepitus and Ama lakshanas. Advised Rasnasaptaka Kwatha 20ml BD and Janu Basti series.', prescribedMedicines: ['Rasnasaptaka Kwatha (AYU-MED-003)', 'Yograj Guggulu (AYU-MED-008)', 'Mahanarayana Taila (AYU-MED-005)'], recommendedPanchakarma: 'Janu Basti' },
  { id: 'opd-2', tokenNo: 102, uhid: 'AY-HOSP-26-0102', patientName: 'Savitri Devi Sharma', age: 64, gender: 'Female', department: 'Panchakarma Special OPD', practitionerName: 'Dr. Anand K. Joshi', queueStatus: 'In Consultation', visitTime: '09:25 AM', chiefComplaint: 'Katigraha (Lumbar radiculopathy) radiating to right leg', illustrativeNotes: 'SLR positive on right side (45 deg). Prescribed Matra Basti with Sahacharadi Taila.', prescribedMedicines: ['Sahacharadi Taila 450ml (AYU-MED-006)', 'Trayodashanga Guggulu'], recommendedPanchakarma: 'Kati Basti & Matra Basti' },
  { id: 'opd-3', tokenNo: 103, uhid: 'AY-HOSP-26-0103', patientName: 'Dilip Kumar Verma', age: 46, gender: 'Male', department: 'Kaya Chikitsa (General Medicine)', practitionerName: 'Prof. (Dr.) Vasant Vaidya', queueStatus: 'Waiting', visitTime: '09:40 AM', chiefComplaint: 'Amlapitta (Hyperacidity) and recurrent heartburn post meals', illustrativeNotes: 'Dietary trigger analysis indicated excess katu/vidahi food. Advised Sootshekhar Rasa and Avipattikar Churna.', prescribedMedicines: ['Avipattikar Churna (AYU-MED-002)', 'Kamadudha Rasa'] },
  { id: 'opd-4', tokenNo: 104, uhid: 'AY-HOSP-26-0104', patientName: 'Sunita Ravindra Patil', age: 39, gender: 'Female', department: 'Prasuti & Stri Roga', practitionerName: 'Dr. Sunita Deshmukh', queueStatus: 'Waiting', visitTime: '09:50 AM', chiefComplaint: 'Kashtartava (Dysmenorrhea) and irregular cycles past 4 months', illustrativeNotes: 'Pelvic sonography reviewed. Prescribed Ashokarishta and Dashamoola Kwatha.', prescribedMedicines: ['Ashokarishta (AYU-MED-004)', 'Pushyanug Churna'] },
  { id: 'opd-5', tokenNo: 105, uhid: 'AY-HOSP-26-0105', patientName: 'Gopal Krishna Iyer', age: 72, gender: 'Male', department: 'Panchakarma Special OPD', practitionerName: 'Dr. Anand K. Joshi', queueStatus: 'Waiting', visitTime: '10:00 AM', chiefComplaint: 'Insomnia, mild tremors, and Generalized Vata Prakopa', illustrativeNotes: 'Scheduled for 7-day Shirodhara with Ksheerabala Taila.', prescribedMedicines: ['Ksheerabala Taila 101 (AYU-MED-007)', 'Ashwagandha Churna (AYU-MED-001)'], recommendedPanchakarma: 'Shirodhara' },
  { id: 'opd-6', tokenNo: 106, uhid: 'AY-HOSP-26-0106', patientName: 'Kamala Bai Joshi', age: 61, gender: 'Female', department: 'Shalya Tantra (Surgery)', practitionerName: 'Dr. Girish N. Bhatt', queueStatus: 'Waiting', visitTime: '10:15 AM', chiefComplaint: 'Arsha (Grade 2 bleeding internal hemorrhoids)', illustrativeNotes: 'Proctoscopy noted engorged piles at 3 and 7 o\'clock. Recommended Kshara Karma review.', prescribedMedicines: ['Triphala Guggulu', 'Abhayarishta (AYU-MED-009)'] },
  { id: 'opd-7', tokenNo: 107, uhid: 'AY-HOSP-26-0107', patientName: 'Mahesh C. Agarwal', age: 52, gender: 'Male', department: 'Swasthavritta & Lifestyle Clinic', practitionerName: 'Dr. Suresh M. Hegde', queueStatus: 'Waiting', visitTime: '10:30 AM', chiefComplaint: 'Medoroga (Metabolic syndrome & high fasting blood sugar)', illustrativeNotes: 'Dinacharya regimen formulated. Advised Nisamalaki Churna and daily morning Vyayama.', prescribedMedicines: ['Nisamalaki Churna', 'Chandraprabha Vati (AYU-MED-010)'] },
  { id: 'opd-8', tokenNo: 108, uhid: 'AY-HOSP-26-0108', patientName: 'Lata M. Deshpande', age: 44, gender: 'Female', department: 'Kaya Chikitsa (General Medicine)', practitionerName: 'Prof. (Dr.) Vasant Vaidya', queueStatus: 'Completed', visitTime: '08:45 AM', chiefComplaint: 'Follow-up for Grahani Dosha (IBS with loose stools post food)', illustrativeNotes: 'Substantial improvement observed after Kutajarishta. Maintenance course renewed for 2 weeks.', prescribedMedicines: ['Kutajarishta', 'Bilwadi Churna'] },
  { id: 'opd-9', tokenNo: 109, uhid: 'AY-HOSP-26-0109', patientName: 'Mohanlal S. Suthar', age: 67, gender: 'Male', department: 'Shalakya Tantra (Eye/ENT)', practitionerName: 'Dr. Radhika Nair', queueStatus: 'Completed', visitTime: '09:00 AM', chiefComplaint: 'Karna Nada (Tinnitus) and dryness in nasal cavity', illustrativeNotes: 'Bilateral otoscopy normal. Advised Bilwa Taila Karna Poorana and Pratimarsha Nasya.', prescribedMedicines: ['Anu Taila (AYU-MED-011)', 'Bilwa Taila'] },
  { id: 'opd-10', tokenNo: 110, uhid: 'AY-HOSP-26-0110', patientName: 'Rekha K. Kulkarni', age: 36, gender: 'Female', department: 'Kaya Chikitsa (General Medicine)', practitionerName: 'Prof. (Dr.) Vasant Vaidya', queueStatus: 'Completed', visitTime: '09:05 AM', chiefComplaint: 'Skin patches with itching - Vicharchika (Eczema)', illustrativeNotes: 'Prescribed Mahatiktaka Ghrita and Khadirarishta.', prescribedMedicines: ['Khadirarishta (AYU-MED-012)', 'Mahatiktaka Ghrita'] },
  { id: 'opd-11', tokenNo: 111, uhid: 'AY-HOSP-26-0111', patientName: 'Bhupendra Singh Rao', age: 49, gender: 'Male', department: 'Panchakarma Special OPD', practitionerName: 'Dr. Anand K. Joshi', queueStatus: 'Waiting', visitTime: '10:45 AM', chiefComplaint: 'Manyastambha (Cervical Spondylosis) with radiating numbness in fingers', illustrativeNotes: 'Greeva Basti and Patra Pinda Sweda planned.', prescribedMedicines: ['Ksheerabala Taila', 'Ekangaveer Rasa'], recommendedPanchakarma: 'Greeva Basti' },
  { id: 'opd-12', tokenNo: 112, uhid: 'AY-HOSP-26-0112', patientName: 'Anuradha Somani', age: 55, gender: 'Female', department: 'Prasuti & Stri Roga', practitionerName: 'Dr. Sunita Deshmukh', queueStatus: 'Waiting', visitTime: '11:00 AM', chiefComplaint: 'Post-menopausal joint aches and hot flushes', illustrativeNotes: 'Shatavari Gulam and Asthiposhak Vati initiated.', prescribedMedicines: ['Shatavari Churna', 'Praval Pishti'] },
  { id: 'opd-13', tokenNo: 113, uhid: 'AY-HOSP-26-0113', patientName: 'Vinayak T. Tambe', age: 33, gender: 'Male', department: 'Shalya Tantra (Surgery)', practitionerName: 'Dr. Girish N. Bhatt', queueStatus: 'Waiting', visitTime: '11:15 AM', chiefComplaint: 'Parikartika (Anal fissure) with acute stinging pain', illustrativeNotes: 'Sitz bath with Triphala Kwatha and Jatyadi Taila local application.', prescribedMedicines: ['Jatyadi Taila (AYU-MED-013)'] },
  { id: 'opd-14', tokenNo: 114, uhid: 'AY-HOSP-26-0114', patientName: 'Usha Rani Tiwari', age: 60, gender: 'Female', department: 'Kaya Chikitsa (General Medicine)', practitionerName: 'Prof. (Dr.) Vasant Vaidya', queueStatus: 'Waiting', visitTime: '11:30 AM', chiefComplaint: 'Vataja Kasa (Dry spasmodic cough)', illustrativeNotes: 'Kantakari Avaleha and Sitopaladi Churna advised with honey.', prescribedMedicines: ['Sitopaladi Churna (AYU-MED-014)', 'Kantakari Avaleha'] },
  { id: 'opd-15', tokenNo: 115, uhid: 'AY-HOSP-26-0115', patientName: 'Govind Ram Meena', age: 50, gender: 'Male', department: 'Swasthavritta & Lifestyle Clinic', practitionerName: 'Dr. Suresh M. Hegde', queueStatus: 'Waiting', visitTime: '11:45 AM', chiefComplaint: 'Chronic fatigue and heaviness after morning meals', illustrativeNotes: 'Agni pariksha shows Manda Agni. Trikatu Churna advised.', prescribedMedicines: ['Trikatu Churna (AYU-MED-015)'] },
];

// 8 IPD Admissions (Hospital Inpatients)
export const INITIAL_IPD: IpdAdmission[] = [
  { id: 'ipd-1', ipdNo: 'IPD-26-0041', uhid: 'AY-HOSP-26-0101', patientName: 'Rameshwar Lal Gupta', department: 'Kaya Chikitsa', doctorInCharge: 'Prof. (Dr.) Vasant Vaidya', ward: 'Male Ward', bedNo: 'M-BED-04', admissionDate: '2026-10-06', expectedDischargeDate: '2026-10-15', admissionStatus: 'Admitted', primaryDiagnosis: 'Severe Amavata with Polyarthritis & Joint Effusion', dailyRoundsNote: 'Swelling in bilateral knees reduced by 30%. Snehapana day 5 underway with Kantakari Ghrita.' },
  { id: 'ipd-2', ipdNo: 'IPD-26-0042', uhid: 'AY-HOSP-26-0102', patientName: 'Savitri Devi Sharma', department: 'Panchakarma', doctorInCharge: 'Dr. Anand K. Joshi', ward: 'Female Ward', bedNo: 'F-BED-02', admissionDate: '2026-10-08', expectedDischargeDate: '2026-10-16', admissionStatus: 'Admitted', primaryDiagnosis: 'Pakshaghata (Hemiparesis left side, post-stroke recovery)', dailyRoundsNote: 'Undergoing 14-day intensive protocol: Sarvanga Abhyanga + Shashtika Shali Pinda Sweda. Motor power left arm improved to 3+/5.' },
  { id: 'ipd-3', ipdNo: 'IPD-26-0043', uhid: 'AY-HOSP-26-0105', patientName: 'Gopal Krishna Iyer', department: 'Panchakarma', doctorInCharge: 'Dr. Anand K. Joshi', ward: 'Panchakarma Cottage', bedNo: 'COTT-01', admissionDate: '2026-10-09', expectedDischargeDate: '2026-10-18', admissionStatus: 'Admitted', primaryDiagnosis: 'Kampa Vata (Parkinsonian Tremors) & Anidra', dailyRoundsNote: 'Shirodhara with Ksheerabala Taila given at 10 AM. Patient reported 6 hours uninterrupted sleep.' },
  { id: 'ipd-4', ipdNo: 'IPD-26-0044', uhid: 'AY-HOSP-26-0106', patientName: 'Kamala Bai Joshi', department: 'Shalya Tantra', doctorInCharge: 'Dr. Girish N. Bhatt', ward: 'Female Ward', bedNo: 'F-BED-07', admissionDate: '2026-10-10', expectedDischargeDate: '2026-10-14', admissionStatus: 'Admitted', primaryDiagnosis: 'Nadivrana (Pilonidal Sinus) - Post Ksharasutra Ligation', dailyRoundsNote: 'Day 2 post ligation. Dressing intact, no active bleeding. Patient ambulating comfortably.' },
  { id: 'ipd-5', ipdNo: 'IPD-26-0045', uhid: 'AY-HOSP-26-0107', patientName: 'Mahesh C. Agarwal', department: 'Kaya Chikitsa', doctorInCharge: 'Prof. (Dr.) Vasant Vaidya', ward: 'Male Ward', bedNo: 'M-BED-09', admissionDate: '2026-10-05', expectedDischargeDate: '2026-10-12', admissionStatus: 'Discharge Planned', primaryDiagnosis: 'Tamaka Shwasa (Bronchial Asthma Acute Exacerbation)', dailyRoundsNote: 'Wheezing subsided completely. Vamana Karma completed successfully. Discharge summary being drafted.', dischargeSummary: 'Patient admitted with severe wheeze and dyspnea. Underwent regulated Snehana-Swedana followed by Sadhyo Vamana. Vitals stable. Advised Haridra Khanda and Kantakari Avaleha for 30 days.' },
  { id: 'ipd-6', ipdNo: 'IPD-26-0046', uhid: 'AY-HOSP-26-0109', patientName: 'Mohanlal S. Suthar', department: 'Kaya Chikitsa', doctorInCharge: 'Prof. (Dr.) Vasant Vaidya', ward: 'Male Ward', bedNo: 'M-BED-12', admissionDate: '2026-10-07', expectedDischargeDate: '2026-10-14', admissionStatus: 'Admitted', primaryDiagnosis: 'Gridhrasi (Sciatica bilateral) with Gait Disturbance', dailyRoundsNote: 'Completed Siravedha (Venesection) yesterday over four points. Pain score dropped from 8/10 to 4/10.' },
  { id: 'ipd-7', ipdNo: 'IPD-26-0047', uhid: 'AY-HOSP-26-0112', patientName: 'Anuradha Somani', department: 'Prasuti & Stri Roga', doctorInCharge: 'Dr. Sunita Deshmukh', ward: 'Female Ward', bedNo: 'F-BED-10', admissionDate: '2026-10-11', expectedDischargeDate: '2026-10-17', admissionStatus: 'Admitted', primaryDiagnosis: 'Asrigdara (Menometrorrhagia) with Moderate Anemia', dailyRoundsNote: 'Pushyanug Churna with Tandulodaka initiated. Hemoglobin 8.8 gm/dL; iron-rich classical preparations added.' },
  { id: 'ipd-8', ipdNo: 'IPD-26-0048', uhid: 'AY-HOSP-26-0114', patientName: 'Usha Rani Tiwari', department: 'Panchakarma', doctorInCharge: 'Dr. Anand K. Joshi', ward: 'Special Suite', bedNo: 'SUITE-02', admissionDate: '2026-10-04', expectedDischargeDate: '2026-10-11', admissionStatus: 'Discharged', primaryDiagnosis: 'Sandhigata Vata & Generalized Osteopenia', dailyRoundsNote: 'Completed 7-day Tikta Ksheera Basti course. Discharged on 11 Oct with follow-up instructions.', dischargeSummary: 'Completed full course of Tikta Ksheera Basti. Range of motion improved by 25 degrees. Follow-up scheduled in OPD after 14 days.' },
];

// 25 Ayurveda Pharmacy Inventory Items (Classical formulations & batch traceable stock)
export const INITIAL_PHARMACY: PharmacyItem[] = [
  { id: 'ph-1', itemCode: 'AYU-MED-001', name: 'Ashwagandha Churna', classicalReference: 'Bhaishajya Ratnavali / AFI', category: 'Churna', batchNo: 'BATCH-ASH-2601', quantity: 180, unit: 'Packets (100g)', supplier: 'Shree Dhootapapeshwar Ltd.', purchaseCost: 110, mrp: 165, expiryDate: '2028-04-30', reorderLevel: 50, status: 'Adequate' },
  { id: 'ph-2', itemCode: 'AYU-MED-002', name: 'Avipattikar Churna', classicalReference: 'Bhaishajya Ratnavali / Amlapitta', category: 'Churna', batchNo: 'BATCH-AVI-2603', quantity: 24, unit: 'Packets (100g)', supplier: 'Baidyanath Ayurved Bhawan', purchaseCost: 95, mrp: 145, expiryDate: '2027-11-30', reorderLevel: 40, status: 'Low Stock' },
  { id: 'ph-3', itemCode: 'AYU-MED-003', name: 'Rasnasaptaka Kwatha', classicalReference: 'Sahasrayogam / Amavata', category: 'Asava & Arishta', batchNo: 'BATCH-RAS-2508', quantity: 12, unit: 'Bottles (450ml)', supplier: 'Arya Vaidya Sala Kottakkal', purchaseCost: 190, mrp: 260, expiryDate: '2026-11-15', reorderLevel: 30, status: 'Near Expiry' },
  { id: 'ph-4', itemCode: 'AYU-MED-004', name: 'Ashokarishta Special', classicalReference: 'Bhaishajya Ratnavali / Stri Roga', category: 'Asava & Arishta', batchNo: 'BATCH-ASH-2609', quantity: 140, unit: 'Bottles (450ml)', supplier: 'Dabur India Ltd. (Ayush Div)', purchaseCost: 135, mrp: 195, expiryDate: '2031-08-31', reorderLevel: 40, status: 'Adequate' },
  { id: 'ph-5', itemCode: 'AYU-MED-005', name: 'Mahanarayana Taila', classicalReference: 'Bhaishajya Ratnavali / Vatavyadhi', category: 'Taila & Ghrita', batchNo: 'BATCH-MNT-2602', quantity: 95, unit: 'Bottles (450ml)', supplier: 'Nagarjuna Ayurvedic Group', purchaseCost: 280, mrp: 390, expiryDate: '2029-06-30', reorderLevel: 30, status: 'Adequate' },
  { id: 'ph-6', itemCode: 'AYU-MED-006', name: 'Sahacharadi Taila (Kashaya)', classicalReference: 'Ashtanga Hridaya / Vata Rog', category: 'Taila & Ghrita', batchNo: 'BATCH-SAH-2604', quantity: 65, unit: 'Bottles (450ml)', supplier: 'Arya Vaidya Sala Kottakkal', purchaseCost: 310, mrp: 425, expiryDate: '2029-01-31', reorderLevel: 25, status: 'Adequate' },
  { id: 'ph-7', itemCode: 'AYU-MED-007', name: 'Ksheerabala Taila 101 Avarthita', classicalReference: 'Sahasrayogam / Vata Shonita', category: 'Taila & Ghrita', batchNo: 'BATCH-KSH-2601', quantity: 18, unit: 'Bottles (450ml)', supplier: 'Kerala Ayurveda Ltd.', purchaseCost: 550, mrp: 740, expiryDate: '2028-09-30', reorderLevel: 20, status: 'Low Stock' },
  { id: 'ph-8', itemCode: 'AYU-MED-008', name: 'Yograj Guggulu', classicalReference: 'Bhaishajya Ratnavali / Vatavyadhi', category: 'Vati & Gutika', batchNo: 'BATCH-YOG-2605', quantity: 220, unit: 'Strips (50 tabs)', supplier: 'Shree Dhootapapeshwar Ltd.', purchaseCost: 160, mrp: 230, expiryDate: '2029-12-31', reorderLevel: 50, status: 'Adequate' },
  { id: 'ph-9', itemCode: 'AYU-MED-009', name: 'Abhayarishta', classicalReference: 'Charaka Samhita / Arsha', category: 'Asava & Arishta', batchNo: 'BATCH-ABH-2602', quantity: 110, unit: 'Bottles (450ml)', supplier: 'Baidyanath Ayurved Bhawan', purchaseCost: 140, mrp: 205, expiryDate: '2031-03-31', reorderLevel: 35, status: 'Adequate' },
  { id: 'ph-10', itemCode: 'AYU-MED-010', name: 'Chandraprabha Vati', classicalReference: 'Sharngadhara Samhita / Prameha', category: 'Vati & Gutika', batchNo: 'BATCH-CPV-2603', quantity: 190, unit: 'Strips (50 tabs)', supplier: 'Patanjali Ayurved Ltd.', purchaseCost: 120, mrp: 175, expiryDate: '2029-05-31', reorderLevel: 45, status: 'Adequate' },
  { id: 'ph-11', itemCode: 'AYU-MED-011', name: 'Anu Taila (Nasya Drops)', classicalReference: 'Charaka Samhita / Matrashiteeya', category: 'Taila & Ghrita', batchNo: 'BATCH-ANU-2601', quantity: 85, unit: 'Packets (100g)', supplier: 'Arya Vaidya Sala Kottakkal', purchaseCost: 90, mrp: 130, expiryDate: '2028-08-31', reorderLevel: 30, status: 'Adequate' },
  { id: 'ph-12', itemCode: 'AYU-MED-012', name: 'Khadirarishta', classicalReference: 'Sharngadhara Samhita / Kushta', category: 'Asava & Arishta', batchNo: 'BATCH-KHD-2602', quantity: 105, unit: 'Bottles (450ml)', supplier: 'Dabur India Ltd. (Ayush Div)', purchaseCost: 145, mrp: 210, expiryDate: '2031-04-30', reorderLevel: 30, status: 'Adequate' },
  { id: 'ph-13', itemCode: 'AYU-MED-013', name: 'Jatyadi Taila (Vranashodhana)', classicalReference: 'Ashtanga Hridaya / Vrana', category: 'Taila & Ghrita', batchNo: 'BATCH-JAT-2511', quantity: 8, unit: 'Bottles (450ml)', supplier: 'Shree Dhootapapeshwar Ltd.', purchaseCost: 220, mrp: 310, expiryDate: '2026-10-28', reorderLevel: 25, status: 'Near Expiry' },
  { id: 'ph-14', itemCode: 'AYU-MED-014', name: 'Sitopaladi Churna', classicalReference: 'Sharngadhara Samhita / Rajayakshma', category: 'Churna', batchNo: 'BATCH-SIT-2602', quantity: 160, unit: 'Packets (100g)', supplier: 'Baidyanath Ayurved Bhawan', purchaseCost: 130, mrp: 190, expiryDate: '2028-02-28', reorderLevel: 40, status: 'Adequate' },
  { id: 'ph-15', itemCode: 'AYU-MED-015', name: 'Trikatu Churna', classicalReference: 'Charaka Samhita / Deepana', category: 'Churna', batchNo: 'BATCH-TRK-2601', quantity: 145, unit: 'Packets (100g)', supplier: 'Arya Vaidya Pharmacy Coimbatore', purchaseCost: 80, mrp: 120, expiryDate: '2028-01-31', reorderLevel: 35, status: 'Adequate' },
  { id: 'ph-16', itemCode: 'AYU-MED-016', name: 'Triphala Churna (Fine Sifted)', classicalReference: 'Charaka Samhita / Rasayana', category: 'Churna', batchNo: 'BATCH-TRP-2607', quantity: 310, unit: 'Packets (100g)', supplier: 'Gujarat Herbals Co-op', purchaseCost: 65, mrp: 100, expiryDate: '2028-07-31', reorderLevel: 60, status: 'Adequate' },
  { id: 'ph-17', itemCode: 'AYU-MED-017', name: 'Draksharishta', classicalReference: 'Sharngadhara Samhita / Urahkshata', category: 'Asava & Arishta', batchNo: 'BATCH-DRK-2604', quantity: 130, unit: 'Bottles (450ml)', supplier: 'Dabur India Ltd. (Ayush Div)', purchaseCost: 155, mrp: 220, expiryDate: '2031-06-30', reorderLevel: 35, status: 'Adequate' },
  { id: 'ph-18', itemCode: 'AYU-MED-018', name: 'Brahmi Ghrita', classicalReference: 'Ashtanga Hridaya / Unmada', category: 'Taila & Ghrita', batchNo: 'BATCH-BRH-2601', quantity: 42, unit: 'Jars (200g)', supplier: 'Kerala Ayurveda Ltd.', purchaseCost: 380, mrp: 510, expiryDate: '2028-03-31', reorderLevel: 20, status: 'Adequate' },
  { id: 'ph-19', itemCode: 'AYU-MED-019', name: 'Mahasudarshan Churna', classicalReference: 'Bhaishajya Ratnavali / Jwara', category: 'Churna', batchNo: 'BATCH-MSD-2509', quantity: 0, unit: 'Packets (100g)', supplier: 'Baidyanath Ayurved Bhawan', purchaseCost: 105, mrp: 155, expiryDate: '2026-09-30', reorderLevel: 40, status: 'Expired' },
  { id: 'ph-20', itemCode: 'AYU-MED-020', name: 'Suvarna Vasant Kusumbhakar Rasa', classicalReference: 'Rasendra Sara Sangraha / Prameha', category: 'Bhasma & Rasayana', batchNo: 'BATCH-SVK-2601', quantity: 15, unit: 'Strips (50 tabs)', supplier: 'Shree Dhootapapeshwar Ltd.', purchaseCost: 1850, mrp: 2400, expiryDate: '2031-10-31', reorderLevel: 10, status: 'Adequate' },
  { id: 'ph-21', itemCode: 'AYU-MED-021', name: 'Chyawanprash Awaleha (Special)', classicalReference: 'Charaka Samhita / Rasayana', category: 'Bhasma & Rasayana', batchNo: 'BATCH-CYW-2608', quantity: 90, unit: 'Jars (200g)', supplier: 'Dabur India Ltd. (Ayush Div)', purchaseCost: 260, mrp: 360, expiryDate: '2028-10-31', reorderLevel: 30, status: 'Adequate' },
  { id: 'ph-22', itemCode: 'AYU-MED-022', name: 'Shankha Bhasma', classicalReference: 'Rasa Tarangini / Agnimandya', category: 'Bhasma & Rasayana', batchNo: 'BATCH-SHK-2603', quantity: 35, unit: 'Packets (100g)', supplier: 'Arya Vaidya Sala Kottakkal', purchaseCost: 110, mrp: 160, expiryDate: '2031-12-31', reorderLevel: 15, status: 'Adequate' },
  { id: 'ph-23', itemCode: 'AYU-MED-023', name: 'Guduchi Satva (Pure Extract)', classicalReference: 'Bhaishajya Ratnavali / Rasayana', category: 'Bhasma & Rasayana', batchNo: 'BATCH-GUD-2605', quantity: 14, unit: 'Packets (100g)', supplier: 'Nagarjuna Ayurvedic Group', purchaseCost: 320, mrp: 440, expiryDate: '2028-05-31', reorderLevel: 20, status: 'Low Stock' },
  { id: 'ph-24', itemCode: 'AYU-MED-024', name: 'Shatavari Raw Roots (Grade A Dried)', classicalReference: 'Raw Material for Rasashastra Prep', category: 'Raw Herb / Crude Drug', batchNo: 'BATCH-RAW-SHT-26', quantity: 120, unit: 'Kg', supplier: 'M.P. State Forest Produce Fed.', purchaseCost: 450, mrp: 600, expiryDate: '2027-12-31', reorderLevel: 40, status: 'Adequate' },
  { id: 'ph-25', itemCode: 'AYU-MED-025', name: 'Haritaki Whole Dried Myrobalan', classicalReference: 'Raw Material for Triphala Prep', category: 'Raw Herb / Crude Drug', batchNo: 'BATCH-RAW-HRT-26', quantity: 240, unit: 'Kg', supplier: 'M.P. State Forest Produce Fed.', purchaseCost: 120, mrp: 180, expiryDate: '2027-10-31', reorderLevel: 50, status: 'Adequate' },
];

// Stock Movement History (Purchase inward, OPD/IPD dispensing, returns)
export const INITIAL_STOCK_MOVEMENTS: StockMovement[] = [
  { id: 'sm-1', date: '2026-10-12', itemId: 'ph-1', itemName: 'Ashwagandha Churna', batchNo: 'BATCH-ASH-2601', type: 'OPD Dispensing', quantity: 2, unit: 'Packets (100g)', referenceDoc: 'OPD-DISP-26-891', patientOrSupplier: 'Gopal Krishna Iyer (UHID-0105)' },
  { id: 'sm-2', date: '2026-10-12', itemId: 'ph-5', itemName: 'Mahanarayana Taila', batchNo: 'BATCH-MNT-2602', type: 'IPD Ward Issue', quantity: 4, unit: 'Bottles (450ml)', referenceDoc: 'IPD-IND-26-441', patientOrSupplier: 'Rameshwar Lal Gupta (IPD-0041)' },
  { id: 'sm-3', date: '2026-10-11', itemId: 'ph-6', itemName: 'Sahacharadi Taila (Kashaya)', batchNo: 'BATCH-SAH-2604', type: 'OPD Dispensing', quantity: 1, unit: 'Bottles (450ml)', referenceDoc: 'OPD-DISP-26-884', patientOrSupplier: 'Savitri Devi Sharma (UHID-0102)' },
  { id: 'sm-4', date: '2026-10-10', itemId: 'ph-16', itemName: 'Triphala Churna (Fine Sifted)', batchNo: 'BATCH-TRP-2607', type: 'Stock Inward (Purchase)', quantity: 100, unit: 'Packets (100g)', referenceDoc: 'PO-GRN-26-092', patientOrSupplier: 'Gujarat Herbals Co-op' },
  { id: 'sm-5', date: '2026-10-09', itemId: 'ph-19', itemName: 'Mahasudarshan Churna', batchNo: 'BATCH-MSD-2509', type: 'Return to Supplier', quantity: 15, unit: 'Packets (100g)', referenceDoc: 'RET-SUP-26-014', patientOrSupplier: 'Baidyanath Ayurved Bhawan' },
  { id: 'sm-6', date: '2026-10-08', itemId: 'ph-8', itemName: 'Yograj Guggulu', batchNo: 'BATCH-YOG-2605', type: 'OPD Dispensing', quantity: 3, unit: 'Strips (50 tabs)', referenceDoc: 'OPD-DISP-26-879', patientOrSupplier: 'Rameshwar Lal Gupta (UHID-0101)' },
];

// 12 Panchakarma Treatment Schedule & Bookings
export const INITIAL_PANCHAKARMA: PanchakarmaBooking[] = [
  { id: 'pk-1', bookingCode: 'PK-BK-26-01', patientId: 'pat-1', patientName: 'Rameshwar Lal Gupta', fictionalPatientRef: 'PT-ANON-7741', therapyType: 'Janu Basti', therapistName: 'Therapist Somnath', roomNo: 'Therapy Suite 1 (Snana)', date: '2026-10-12', timeSlot: '08:30 AM - 09:30 AM', consentStatus: 'Signed & Recorded', sessionStatus: 'In Progress', consumables: 'Mahanarayana Taila 250ml, Masha Atta ring', charges: 1200, clinicalReviewStatus: 'Reviewed by Vaidya', notes: 'Maintain taila temperature between 39-40 C. Check skin erythema after 30 mins.' },
  { id: 'pk-2', bookingCode: 'PK-BK-26-02', patientId: 'pat-2', patientName: 'Savitri Devi Sharma', fictionalPatientRef: 'PT-ANON-7742', therapyType: 'Abhyanga & Swedana', therapistName: 'Therapist Gayatri', roomNo: 'Therapy Suite 2 (Dhara)', date: '2026-10-12', timeSlot: '09:30 AM - 10:45 AM', consentStatus: 'Signed & Recorded', sessionStatus: 'Scheduled', consumables: 'Sahacharadi Taila 200ml, Dashamoola Kwatha for Bashpa Sweda', charges: 1800, clinicalReviewStatus: 'Reviewed by Vaidya', notes: 'Gentle stroke pressure over left flank. Avoid excessive heat in Bashpa cabin.' },
  { id: 'pk-3', bookingCode: 'PK-BK-26-03', patientId: 'pat-5', patientName: 'Gopal Krishna Iyer', fictionalPatientRef: 'PT-ANON-7745', therapyType: 'Shirodhara', therapistName: 'Therapist Rajesh', roomNo: 'Therapy Suite 3 (Shirodhara)', date: '2026-10-12', timeSlot: '10:00 AM - 11:15 AM', consentStatus: 'Signed & Recorded', sessionStatus: 'Scheduled', consumables: 'Ksheerabala Taila 101 (1 Litre recycling batch)', charges: 2200, clinicalReviewStatus: 'Reviewed by Vaidya', notes: 'Steady pendulum oscillation over Ajna Chakra for 45 minutes.' },
  { id: 'pk-4', bookingCode: 'PK-BK-26-04', patientId: 'pat-3', patientName: 'Dilip Kumar Verma', fictionalPatientRef: 'PT-ANON-7743', therapyType: 'Takradhara', therapistName: 'Therapist Ramesh', roomNo: 'Therapy Suite 3 (Shirodhara)', date: '2026-10-12', timeSlot: '11:30 AM - 12:30 PM', consentStatus: 'Pending Signature', sessionStatus: 'Scheduled', consumables: 'Musta & Amalaki Siddha Takra 1.5 Litres', charges: 1500, clinicalReviewStatus: 'Pending Review', notes: 'Consent pending verification at hospital front desk.' },
  { id: 'pk-5', bookingCode: 'PK-BK-26-05', patientId: 'pat-6', patientName: 'Kamala Bai Joshi', fictionalPatientRef: 'PT-ANON-7746', therapyType: 'Kati Basti', therapistName: 'Therapist Gayatri', roomNo: 'Therapy Suite 1 (Snana)', date: '2026-10-12', timeSlot: '02:00 PM - 03:00 PM', consentStatus: 'Signed & Recorded', sessionStatus: 'Scheduled', consumables: 'Murivenna + Dhanwantharam Taila 200ml', charges: 1200, clinicalReviewStatus: 'Reviewed by Vaidya', notes: 'Targeting L5-S1 disc bulge.' },
  { id: 'pk-6', bookingCode: 'PK-BK-26-06', patientId: 'pat-9', patientName: 'Mohanlal S. Suthar', fictionalPatientRef: 'PT-ANON-7749', therapyType: 'Matra Basti', therapistName: 'Therapist Somnath', roomNo: 'Basti Room 4', date: '2026-10-12', timeSlot: '03:15 PM - 04:00 PM', consentStatus: 'Signed & Recorded', sessionStatus: 'Scheduled', consumables: 'Sahacharadi Taila 60ml sterile catheter', charges: 800, clinicalReviewStatus: 'Reviewed by Vaidya', notes: 'Post-prandial administration after light lunch. Chart retention time.' },
  { id: 'pk-7', bookingCode: 'PK-BK-26-07', patientId: 'pat-7', patientName: 'Mahesh C. Agarwal', fictionalPatientRef: 'PT-ANON-7747', therapyType: 'Virechana Karma', therapistName: 'Therapist Ramesh', roomNo: 'Panchakarma IPD Cabin', date: '2026-10-11', timeSlot: '08:00 AM - 01:00 PM', consentStatus: 'Signed & Recorded', sessionStatus: 'Completed', consumables: 'Trivrit Lehyam 35g, Draksha Kwatha, Hot water sips', charges: 4500, clinicalReviewStatus: 'Reviewed by Vaidya', notes: '18 Vegas observed. Samyak Shuddhi achieved. Samsarjana Krama initiated.' },
  { id: 'pk-8', bookingCode: 'PK-BK-26-08', patientId: 'pat-4', patientName: 'Sunita Ravindra Patil', fictionalPatientRef: 'PT-ANON-7744', therapyType: 'Nasya Karma', therapistName: 'Therapist Gayatri', roomNo: 'Therapy Suite 2 (Dhara)', date: '2026-10-11', timeSlot: '11:00 AM - 11:45 AM', consentStatus: 'Signed & Recorded', sessionStatus: 'Completed', consumables: 'Anu Taila 8 drops per nostril, Haridra Dhooma', charges: 750, clinicalReviewStatus: 'Reviewed by Vaidya', notes: 'Mukhabhyanga & Nadi Sweda prior to instillations.' },
  { id: 'pk-9', bookingCode: 'PK-BK-26-09', patientId: 'pat-11', patientName: 'Bhupendra Singh Rao', fictionalPatientRef: 'PT-ANON-7751', therapyType: 'Abhyanga & Swedana', therapistName: 'Therapist Somnath', roomNo: 'Therapy Suite 1 (Snana)', date: '2026-10-13', timeSlot: '09:00 AM - 10:15 AM', consentStatus: 'Signed & Recorded', sessionStatus: 'Scheduled', consumables: 'Dhanwantharam Taila 200ml', charges: 1800, clinicalReviewStatus: 'Reviewed by Vaidya' },
  { id: 'pk-10', bookingCode: 'PK-BK-26-10', patientId: 'pat-12', patientName: 'Anuradha Somani', fictionalPatientRef: 'PT-ANON-7752', therapyType: 'Shirodhara', therapistName: 'Therapist Gayatri', roomNo: 'Therapy Suite 3 (Shirodhara)', date: '2026-10-13', timeSlot: '10:30 AM - 11:45 AM', consentStatus: 'Signed & Recorded', sessionStatus: 'Scheduled', consumables: 'Brahmi Taila 1 Litre', charges: 2200, clinicalReviewStatus: 'Reviewed by Vaidya' },
  { id: 'pk-11', bookingCode: 'PK-BK-26-11', patientId: 'pat-14', patientName: 'Usha Rani Tiwari', fictionalPatientRef: 'PT-ANON-7754', therapyType: 'Janu Basti', therapistName: 'Therapist Gayatri', roomNo: 'Therapy Suite 2 (Dhara)', date: '2026-10-13', timeSlot: '02:00 PM - 03:00 PM', consentStatus: 'Signed & Recorded', sessionStatus: 'Scheduled', consumables: 'Ksheerabala Taila 200ml', charges: 1200, clinicalReviewStatus: 'Reviewed by Vaidya' },
  { id: 'pk-12', bookingCode: 'PK-BK-26-12', patientId: 'pat-17', patientName: 'Kailash Chand Jain', fictionalPatientRef: 'PT-ANON-7757', therapyType: 'Kati Basti', therapistName: 'Therapist Rajesh', roomNo: 'Therapy Suite 1 (Snana)', date: '2026-10-10', timeSlot: '03:00 PM - 04:00 PM', consentStatus: 'Signed & Recorded', sessionStatus: 'Completed', consumables: 'Mahanarayana Taila 200ml', charges: 1200, clinicalReviewStatus: 'Reviewed by Vaidya' },
];

// 30 Fee Ledger Records
export const INITIAL_FEES: FeeLedgerItem[] = [
  { id: 'fee-1', invoiceNo: 'INV-2026-001', studentId: 'std-1', studentName: 'Aarav Sharma', rollNo: 'BAMS-23-001', program: 'BAMS (UG)', batch: '2023-28', termDescription: 'Annual Tuition & Lab Fees (2nd Prof)', totalTuitionFee: 180000, hostelFee: 60000, totalDue: 240000, amountPaid: 240000, balanceDue: 0, dueDate: '2026-08-31', status: 'Paid', lastPaymentDate: '2026-08-20', receiptNo: 'REC-26-4401' },
  { id: 'fee-2', invoiceNo: 'INV-2026-002', studentId: 'std-2', studentName: 'Ananya Iyer', rollNo: 'BAMS-23-002', program: 'BAMS (UG)', batch: '2023-28', termDescription: 'Annual Tuition & Lab Fees (2nd Prof)', totalTuitionFee: 180000, hostelFee: 60000, totalDue: 240000, amountPaid: 240000, balanceDue: 0, dueDate: '2026-08-31', status: 'Paid', lastPaymentDate: '2026-08-18', receiptNo: 'REC-26-4402' },
  { id: 'fee-3', invoiceNo: 'INV-2026-003', studentId: 'std-3', studentName: 'Rohan Deshmukh', rollNo: 'BAMS-23-003', program: 'BAMS (UG)', batch: '2023-28', termDescription: 'Annual Tuition & Lab Fees (2nd Prof)', totalTuitionFee: 180000, hostelFee: 60000, totalDue: 240000, amountPaid: 195000, balanceDue: 45000, dueDate: '2026-08-31', status: 'Partial', lastPaymentDate: '2026-09-02', receiptNo: 'REC-26-4415' },
  { id: 'fee-4', invoiceNo: 'INV-2026-004', studentId: 'std-4', studentName: 'Pooja Verma', rollNo: 'BAMS-23-004', program: 'BAMS (UG)', batch: '2023-28', termDescription: 'Annual Tuition Fees (2nd Prof - Day Scholar)', totalTuitionFee: 180000, hostelFee: 0, totalDue: 180000, amountPaid: 180000, balanceDue: 0, dueDate: '2026-08-31', status: 'Paid', lastPaymentDate: '2026-08-25', receiptNo: 'REC-26-4408' },
  { id: 'fee-5', invoiceNo: 'INV-2026-005', studentId: 'std-5', studentName: 'Devendra Meena', rollNo: 'BAMS-23-005', program: 'BAMS (UG)', batch: '2023-28', termDescription: 'Annual Tuition & Hostel Fees (2nd Prof)', totalTuitionFee: 180000, hostelFee: 60000, totalDue: 240000, amountPaid: 155000, balanceDue: 85000, dueDate: '2026-08-31', status: 'Overdue' },
  { id: 'fee-6', invoiceNo: 'INV-2026-006', studentId: 'std-6', studentName: 'Kavya Pillai', rollNo: 'BAMS-23-006', program: 'BAMS (UG)', batch: '2023-28', termDescription: 'Annual Tuition & Hostel Fees (2nd Prof)', totalTuitionFee: 180000, hostelFee: 60000, totalDue: 240000, amountPaid: 240000, balanceDue: 0, dueDate: '2026-08-31', status: 'Paid', lastPaymentDate: '2026-08-15', receiptNo: 'REC-26-4403' },
  { id: 'fee-7', invoiceNo: 'INV-2026-007', studentId: 'std-7', studentName: 'Varun Joshi', rollNo: 'BAMS-23-007', program: 'BAMS (UG)', batch: '2023-28', termDescription: 'Annual Tuition & Hostel Fees (2nd Prof)', totalTuitionFee: 180000, hostelFee: 60000, totalDue: 240000, amountPaid: 240000, balanceDue: 0, dueDate: '2026-08-31', status: 'Paid', lastPaymentDate: '2026-08-28', receiptNo: 'REC-26-4410' },
  { id: 'fee-8', invoiceNo: 'INV-2026-008', studentId: 'std-8', studentName: 'Sneha Patel', rollNo: 'BAMS-23-008', program: 'BAMS (UG)', batch: '2023-28', termDescription: 'Annual Tuition & Hostel Fees (2nd Prof)', totalTuitionFee: 180000, hostelFee: 60000, totalDue: 240000, amountPaid: 240000, balanceDue: 0, dueDate: '2026-08-31', status: 'Paid', lastPaymentDate: '2026-08-21', receiptNo: 'REC-26-4406' },
  { id: 'fee-9', invoiceNo: 'INV-2026-009', studentId: 'std-9', studentName: 'Nikhil Rane', rollNo: 'BAMS-23-009', program: 'BAMS (UG)', batch: '2023-28', termDescription: 'Annual Tuition & Hostel Fees (2nd Prof)', totalTuitionFee: 180000, hostelFee: 60000, totalDue: 240000, amountPaid: 190000, balanceDue: 50000, dueDate: '2026-10-15', status: 'Pending' },
  { id: 'fee-10', invoiceNo: 'INV-2026-010', studentId: 'std-10', studentName: 'Divya Nair', rollNo: 'BAMS-23-010', program: 'BAMS (UG)', batch: '2023-28', termDescription: 'Annual Tuition & Hostel Fees (2nd Prof)', totalTuitionFee: 180000, hostelFee: 60000, totalDue: 240000, amountPaid: 240000, balanceDue: 0, dueDate: '2026-08-31', status: 'Paid', lastPaymentDate: '2026-08-16', receiptNo: 'REC-26-4404' },

  { id: 'fee-11', invoiceNo: 'INV-2026-011', studentId: 'std-11', studentName: 'Aditya Kulkarni', rollNo: 'BAMS-22-011', program: 'BAMS (UG)', batch: '2022-27', termDescription: 'Annual Tuition & Clinical Fees (3rd Prof)', totalTuitionFee: 190000, hostelFee: 65000, totalDue: 255000, amountPaid: 255000, balanceDue: 0, dueDate: '2026-08-31', status: 'Paid', lastPaymentDate: '2026-08-22', receiptNo: 'REC-26-4407' },
  { id: 'fee-12', invoiceNo: 'INV-2026-012', studentId: 'std-12', studentName: 'Tanvi Shinde', rollNo: 'BAMS-22-012', program: 'BAMS (UG)', batch: '2022-27', termDescription: 'Annual Tuition & Clinical Fees (3rd Prof)', totalTuitionFee: 190000, hostelFee: 65000, totalDue: 255000, amountPaid: 255000, balanceDue: 0, dueDate: '2026-08-31', status: 'Paid', lastPaymentDate: '2026-08-20', receiptNo: 'REC-26-4405' },
  { id: 'fee-13', invoiceNo: 'INV-2026-013', studentId: 'std-13', studentName: 'Prathamesh Gaikwad', rollNo: 'BAMS-22-013', program: 'BAMS (UG)', batch: '2022-27', termDescription: 'Annual Tuition & Clinical Fees (3rd Prof)', totalTuitionFee: 190000, hostelFee: 65000, totalDue: 255000, amountPaid: 190000, balanceDue: 65000, dueDate: '2026-08-31', status: 'Overdue' },
  { id: 'fee-14', invoiceNo: 'INV-2026-014', studentId: 'std-14', studentName: 'Ritu Chaudhary', rollNo: 'BAMS-22-014', program: 'BAMS (UG)', batch: '2022-27', termDescription: 'Annual Tuition & Clinical Fees (3rd Prof)', totalTuitionFee: 190000, hostelFee: 65000, totalDue: 255000, amountPaid: 255000, balanceDue: 0, dueDate: '2026-08-31', status: 'Paid', lastPaymentDate: '2026-08-27', receiptNo: 'REC-26-4409' },
  { id: 'fee-15', invoiceNo: 'INV-2026-015', studentId: 'std-15', studentName: 'Mohit Rawat', rollNo: 'BAMS-22-015', program: 'BAMS (UG)', batch: '2022-27', termDescription: 'Annual Tuition & Clinical Fees (3rd Prof)', totalTuitionFee: 190000, hostelFee: 65000, totalDue: 255000, amountPaid: 255000, balanceDue: 0, dueDate: '2026-08-31', status: 'Paid', lastPaymentDate: '2026-08-30', receiptNo: 'REC-26-4412' },
  { id: 'fee-16', invoiceNo: 'INV-2026-016', studentId: 'std-16', studentName: 'Neha Bhattacharya', rollNo: 'BAMS-22-016', program: 'BAMS (UG)', batch: '2022-27', termDescription: 'Annual Tuition & Clinical Fees (3rd Prof)', totalTuitionFee: 190000, hostelFee: 65000, totalDue: 255000, amountPaid: 255000, balanceDue: 0, dueDate: '2026-08-31', status: 'Paid', lastPaymentDate: '2026-08-19', receiptNo: 'REC-26-4403B' },
  { id: 'fee-17', invoiceNo: 'INV-2026-017', studentId: 'std-17', studentName: 'Sameer Qureshi', rollNo: 'BAMS-22-017', program: 'BAMS (UG)', batch: '2022-27', termDescription: 'Annual Tuition & Clinical Fees (3rd Prof)', totalTuitionFee: 190000, hostelFee: 65000, totalDue: 255000, amountPaid: 225000, balanceDue: 30000, dueDate: '2026-09-30', status: 'Partial', lastPaymentDate: '2026-09-10', receiptNo: 'REC-26-4418' },
  { id: 'fee-18', invoiceNo: 'INV-2026-018', studentId: 'std-18', studentName: 'Aakriti Mathur', rollNo: 'BAMS-22-018', program: 'BAMS (UG)', batch: '2022-27', termDescription: 'Annual Tuition & Clinical Fees (3rd Prof)', totalTuitionFee: 190000, hostelFee: 65000, totalDue: 255000, amountPaid: 255000, balanceDue: 0, dueDate: '2026-08-31', status: 'Paid', lastPaymentDate: '2026-08-25', receiptNo: 'REC-26-4411' },
  { id: 'fee-19', invoiceNo: 'INV-2026-019', studentId: 'std-19', studentName: 'Kunal Singhania', rollNo: 'BAMS-22-019', program: 'BAMS (UG)', batch: '2022-27', termDescription: 'Annual Tuition Fees (3rd Prof - Day Scholar)', totalTuitionFee: 190000, hostelFee: 0, totalDue: 190000, amountPaid: 190000, balanceDue: 0, dueDate: '2026-08-31', status: 'Paid', lastPaymentDate: '2026-08-29', receiptNo: 'REC-26-4414' },
  { id: 'fee-20', invoiceNo: 'INV-2026-020', studentId: 'std-20', studentName: 'Priyanka Ghosh', rollNo: 'BAMS-22-020', program: 'BAMS (UG)', batch: '2022-27', termDescription: 'Annual Tuition & Clinical Fees (3rd Prof)', totalTuitionFee: 190000, hostelFee: 65000, totalDue: 255000, amountPaid: 255000, balanceDue: 0, dueDate: '2026-08-31', status: 'Paid', lastPaymentDate: '2026-08-24', receiptNo: 'REC-26-4413' },

  { id: 'fee-21', invoiceNo: 'INV-2026-021', studentId: 'std-21', studentName: 'Manish Tiwari', rollNo: 'BAMS-21-021', program: 'BAMS (UG)', batch: '2021-26', termDescription: 'Final Prof Tuition & Hospital Rotary Fees', totalTuitionFee: 195000, hostelFee: 65000, totalDue: 260000, amountPaid: 260000, balanceDue: 0, dueDate: '2026-08-31', status: 'Paid', lastPaymentDate: '2026-08-23', receiptNo: 'REC-26-4416' },
  { id: 'fee-22', invoiceNo: 'INV-2026-022', studentId: 'std-22', studentName: 'Swati Menon', rollNo: 'BAMS-21-022', program: 'BAMS (UG)', batch: '2021-26', termDescription: 'Final Prof Tuition & Hospital Rotary Fees', totalTuitionFee: 195000, hostelFee: 65000, totalDue: 260000, amountPaid: 260000, balanceDue: 0, dueDate: '2026-08-31', status: 'Paid', lastPaymentDate: '2026-08-17', receiptNo: 'REC-26-4405B' },
  { id: 'fee-23', invoiceNo: 'INV-2026-023', studentId: 'std-24', studentName: 'Bhavna Chauhan', rollNo: 'BAMS-21-024', program: 'BAMS (UG)', batch: '2021-26', termDescription: 'Final Prof Tuition & Hospital Rotary Fees', totalTuitionFee: 195000, hostelFee: 65000, totalDue: 260000, amountPaid: 225000, balanceDue: 35000, dueDate: '2026-09-30', status: 'Partial', lastPaymentDate: '2026-09-08', receiptNo: 'REC-26-4417' },
  { id: 'fee-24', invoiceNo: 'INV-2026-024', studentId: 'std-27', studentName: 'Yashvardhan Jain', rollNo: 'BAMS-21-027', program: 'BAMS (UG)', batch: '2021-26', termDescription: 'Final Prof Tuition & Hospital Rotary Fees', totalTuitionFee: 195000, hostelFee: 65000, totalDue: 260000, amountPaid: 170000, balanceDue: 90000, dueDate: '2026-08-31', status: 'Overdue' },
  { id: 'fee-25', invoiceNo: 'INV-2026-025', studentId: 'std-31', studentName: 'Dr. (Intern) Arjun Nair', rollNo: 'BAMS-20-INT-031', program: 'BAMS (UG)', batch: '2020-25', termDescription: 'Rotary Internship Security & Registration', totalTuitionFee: 15000, hostelFee: 40000, totalDue: 55000, amountPaid: 55000, balanceDue: 0, dueDate: '2026-06-30', status: 'Paid', lastPaymentDate: '2026-06-15', receiptNo: 'REC-26-3901' },
  { id: 'fee-26', invoiceNo: 'INV-2026-026', studentId: 'std-32', studentName: 'Dr. (Intern) Shalini Menon', rollNo: 'BAMS-20-INT-032', program: 'BAMS (UG)', batch: '2020-25', termDescription: 'Rotary Internship Security & Registration', totalTuitionFee: 15000, hostelFee: 40000, totalDue: 55000, amountPaid: 55000, balanceDue: 0, dueDate: '2026-06-30', status: 'Paid', lastPaymentDate: '2026-06-12', receiptNo: 'REC-26-3902' },
  { id: 'fee-27', invoiceNo: 'INV-2026-027', studentId: 'std-36', studentName: 'Dr. Rohit V. Saxena', rollNo: 'PG-MD-24-036', program: 'MD/MS Ayurveda (PG)', batch: '2024-27', termDescription: 'MD Panchakarma 1st Year Tuition & Research Fee', totalTuitionFee: 280000, hostelFee: 75000, totalDue: 355000, amountPaid: 355000, balanceDue: 0, dueDate: '2026-09-15', status: 'Paid', lastPaymentDate: '2026-09-01', receiptNo: 'REC-26-4501' },
  { id: 'fee-28', invoiceNo: 'INV-2026-028', studentId: 'std-37', studentName: 'Dr. Geetika S. Nair', rollNo: 'PG-MD-24-037', program: 'MD/MS Ayurveda (PG)', batch: '2024-27', termDescription: 'MD Dravyaguna 1st Year Tuition & Lab Fee', totalTuitionFee: 280000, hostelFee: 75000, totalDue: 355000, amountPaid: 355000, balanceDue: 0, dueDate: '2026-09-15', status: 'Paid', lastPaymentDate: '2026-09-03', receiptNo: 'REC-26-4502' },
  { id: 'fee-29', invoiceNo: 'INV-2026-029', studentId: 'std-38', studentName: 'Dr. Abhishek S. Mane', rollNo: 'PG-MS-24-038', program: 'MD/MS Ayurveda (PG)', batch: '2024-27', termDescription: 'MS Shalya Tantra 1st Year Tuition & OT Fee', totalTuitionFee: 310000, hostelFee: 75000, totalDue: 385000, amountPaid: 330000, balanceDue: 55000, dueDate: '2026-09-15', status: 'Partial', lastPaymentDate: '2026-09-10', receiptNo: 'REC-26-4503' },
  { id: 'fee-30', invoiceNo: 'INV-2026-030', studentId: 'std-39', studentName: 'Dr. Smriti P. Sen', rollNo: 'PG-MD-24-039', program: 'MD/MS Ayurveda (PG)', batch: '2024-27', termDescription: 'MS Prasuti Tantra 1st Year Tuition & Clinical Fee', totalTuitionFee: 310000, hostelFee: 75000, totalDue: 385000, amountPaid: 385000, balanceDue: 0, dueDate: '2026-09-15', status: 'Paid', lastPaymentDate: '2026-09-05', receiptNo: 'REC-26-4504' },
];

// 10 Procurement Requests
export const INITIAL_PROCUREMENT: ProcurementRequest[] = [
  { id: 'pr-1', prNumber: 'PR-2026-0081', department: 'Rasa Shastra & Pharmacy', requestedBy: 'Dr. Hemant R. Patil', requestDate: '2026-10-08', itemDescription: 'Raw Herbs: Shatavari roots 100kg, Guduchi fresh stem 150kg, Haritaki whole 200kg', category: 'Herbal Raw Materials', estimatedAmount: 185000, status: 'Approved', supplierAssigned: 'M.P. State Forest Produce Fed.', approvalRemarks: 'Approved for seasonal teaching pharmacy batch preparation.' },
  { id: 'pr-2', prNumber: 'PR-2026-0082', department: 'Hospital Operation Theatre & Ksharasutra', requestedBy: 'Dr. Girish N. Bhatt', requestDate: '2026-10-09', itemDescription: 'Surgical Autoclave biological indicator strips, sterile surgical gloves (7.0 & 7.5), Ksharasutra thread rolls', category: 'Medical Supplies & Linen', estimatedAmount: 64000, status: 'PO Issued', supplierAssigned: 'SurgiMed Healthcare Supplies' },
  { id: 'pr-3', prNumber: 'PR-2026-0083', department: 'Panchakarma Center', requestedBy: 'Dr. Anand K. Joshi', requestDate: '2026-10-10', itemDescription: 'Special Teak Wood Droni (Panchakarma Massage Table) replacement for Room 2', category: 'Herbal Raw Materials', estimatedAmount: 95000, status: 'Under Review', approvalRemarks: 'Quotations requested from certified Kerala artisan workshops.' },
  { id: 'pr-4', prNumber: 'PR-2026-0084', department: 'Dravyaguna Herbarium & Lab', requestedBy: 'Dr. Meenakshi Sundaram', requestDate: '2026-10-05', itemDescription: 'Binocular Student Microscopes (4 units) and botanical specimen jars', category: 'Lab Glassware', estimatedAmount: 78000, status: 'Goods Received', supplierAssigned: 'LabTech Scientific Corp', approvalRemarks: 'Verified by lab technician. Material entry logged.' },
  { id: 'pr-5', prNumber: 'PR-2026-0085', department: 'Hostel Administration', requestedBy: 'Shri Rakesh Agrawal', requestDate: '2026-10-02', itemDescription: 'Hostel Block A Solar Water Heater replacement backup heat coils (8 units)', category: 'Hostel Amenities', estimatedAmount: 52000, status: 'Goods Received', supplierAssigned: 'SunPower Renewable Systems' },
  { id: 'pr-6', prNumber: 'PR-2026-0086', department: 'Campus IT & Smart Classes', requestedBy: 'Dr. Rajeshwar Sharma', requestDate: '2026-10-11', itemDescription: 'Interactive Flat Panel 75" for Sushruta Lecture Hall', category: 'IT & Office Hardware', estimatedAmount: 145000, status: 'Submitted' },
  { id: 'pr-7', prNumber: 'PR-2026-0087', department: 'Hospital Nursing & Wards', requestedBy: 'Dr. Sunita Deshmukh', requestDate: '2026-10-06', itemDescription: 'Hospital grade bed linen, cotton mackintoshes and patient gowns (200 sets)', category: 'Medical Supplies & Linen', estimatedAmount: 48000, status: 'Approved', supplierAssigned: 'Rajasthan Handloom Nigam' },
  { id: 'pr-8', prNumber: 'PR-2026-0088', department: 'Ayurvedic Pharmacy', requestedBy: 'Vaidya Harishankar Pathak', requestDate: '2026-10-04', itemDescription: 'Empty amber glass bottles (450ml with pilfer-proof caps - 5000 units)', category: 'Herbal Raw Materials', estimatedAmount: 85000, status: 'PO Issued', supplierAssigned: 'Borosil Container Glass Ltd.' },
  { id: 'pr-9', prNumber: 'PR-2026-0089', department: 'Swasthavritta & Yoga Hall', requestedBy: 'Dr. Suresh M. Hegde', requestDate: '2026-10-01', itemDescription: 'Eco-friendly natural rubber yoga mats (60 units) for daily student practicals', category: 'Hostel Amenities', estimatedAmount: 24000, status: 'Goods Received', supplierAssigned: 'Arogya Wellness Supplies' },
  { id: 'pr-10', prNumber: 'PR-2026-0090', department: 'Sharir Rachana (Anatomy)', requestedBy: 'Prof. (Dr.) Vasant Vaidya', requestDate: '2026-09-28', itemDescription: 'Formalin preservation tank reconditioning & Dissection hall stainless steel trays', category: 'Lab Glassware', estimatedAmount: 110000, status: 'Goods Received', supplierAssigned: 'BioSteel Medical Systems' },
];

// 12 Assets & Maintenance Records
export const INITIAL_ASSETS: AssetRecord[] = [
  { id: 'ast-1', assetTag: 'AYU-AST-CLIN-01', name: 'Carved Teakwood Panchakarma Droni 01', category: 'Clinical / Panchakarma Tables', department: 'Panchakarma Center', location: 'Therapy Suite 1', purchaseDate: '2022-04-15', condition: 'Good', lastMaintenanceDate: '2026-08-10', nextMaintenanceDate: '2026-11-10', annualMaintenanceVendor: 'Vaidya Woodcrafts Kerala' },
  { id: 'ast-2', assetTag: 'AYU-AST-CLIN-02', name: 'Automatic Temperature Controlled Shirodhara Apparatus', category: 'Clinical / Panchakarma Tables', department: 'Panchakarma Center', location: 'Therapy Suite 3', purchaseDate: '2023-01-20', condition: 'Fair / Operational', lastMaintenanceDate: '2026-09-05', nextMaintenanceDate: '2026-12-05', annualMaintenanceVendor: 'AyurEquip Technologies' },
  { id: 'ast-3', assetTag: 'AYU-AST-PHAR-01', name: 'Heavy Duty Pulverizer & Disintegrator Machine (25 HP)', category: 'Dravyaguna Herbarium / Lab', department: 'Rasa Shastra & Pharmacy', location: 'Teaching Pharmacy Hall B', purchaseDate: '2021-11-10', condition: 'Maintenance Due', lastMaintenanceDate: '2026-04-12', nextMaintenanceDate: '2026-10-15', annualMaintenanceVendor: 'Apex Industrial Engineers' },
  { id: 'ast-4', assetTag: 'AYU-AST-OT-01', name: 'Shadowless Surgical LED OT Light with Camera Mount', category: 'Clinical / Panchakarma Tables', department: 'Shalya Tantra (Surgery)', location: 'Major Operation Theatre', purchaseDate: '2023-06-18', condition: 'Good', lastMaintenanceDate: '2026-09-15', nextMaintenanceDate: '2026-12-15', annualMaintenanceVendor: 'Medisys Healthcare' },
  { id: 'ast-5', assetTag: 'AYU-AST-AV-01', name: 'Smart Interactive Panel 86" with Audio System', category: 'Smart Classroom / AV', department: 'Academic Office', location: 'Dhanvantari Lecture Hall', purchaseDate: '2024-02-10', condition: 'Good', lastMaintenanceDate: '2026-07-20', nextMaintenanceDate: '2027-01-20', annualMaintenanceVendor: 'SmartClass Solutions' },
  { id: 'ast-6', assetTag: 'AYU-AST-IT-01', name: 'Campus Core Enterprise Server (HPE ProLiant DL380)', category: 'IT Server & Network', department: 'IT Administration', location: 'Campus Server Room 102', purchaseDate: '2023-08-01', condition: 'Good', lastMaintenanceDate: '2026-09-01', nextMaintenanceDate: '2026-12-01', annualMaintenanceVendor: 'Hewlett Packard Enterprise Services' },
  { id: 'ast-7', assetTag: 'AYU-AST-LAB-01', name: 'Compound Trinocluar Research Microscope with Digital Capture', category: 'Dravyaguna Herbarium / Lab', department: 'Dravyaguna Vijnana', location: 'Pharmacognosy Lab', purchaseDate: '2022-09-14', condition: 'Good', lastMaintenanceDate: '2026-06-18', nextMaintenanceDate: '2026-12-18', annualMaintenanceVendor: 'Olympus Scientific India' },
  { id: 'ast-8', assetTag: 'AYU-AST-GEN-01', name: '250 kVA Silent Diesel Generator Set (Automatic Mains Failure)', category: 'Campus Generator & Utilities', department: 'Campus Facilities', location: 'Power House Substation', purchaseDate: '2021-03-25', condition: 'Fair / Operational', lastMaintenanceDate: '2026-08-25', nextMaintenanceDate: '2026-11-25', annualMaintenanceVendor: 'Kirloskar Oil Engines AMC' },
  { id: 'ast-9', assetTag: 'AYU-AST-CLIN-03', name: 'Herbal Steam Bashpa Swedana Fiber Chamber (Horizontal)', category: 'Clinical / Panchakarma Tables', department: 'Panchakarma Center', location: 'Therapy Suite 2', purchaseDate: '2022-10-11', condition: 'Fair / Operational', lastMaintenanceDate: '2026-07-15', nextMaintenanceDate: '2026-10-30', annualMaintenanceVendor: 'AyurEquip Technologies' },
  { id: 'ast-10', assetTag: 'AYU-AST-PHAR-02', name: 'Rotary Tablet Pressing Machine (16 Station)', category: 'Dravyaguna Herbarium / Lab', department: 'Rasa Shastra & Pharmacy', location: 'Teaching Pharmacy Hall A', purchaseDate: '2023-03-15', condition: 'Good', lastMaintenanceDate: '2026-08-30', nextMaintenanceDate: '2026-11-30', annualMaintenanceVendor: 'Cadmach Machinery' },
  { id: 'ast-11', assetTag: 'AYU-AST-RO-01', name: 'Commercial 2000 LPH RO Drinking Water Plant', category: 'Campus Generator & Utilities', department: 'Campus Facilities', location: 'Utility Block North', purchaseDate: '2022-05-10', condition: 'Maintenance Due', lastMaintenanceDate: '2026-04-10', nextMaintenanceDate: '2026-10-10', annualMaintenanceVendor: 'Ion Exchange India Ltd.' },
  { id: 'ast-12', assetTag: 'AYU-AST-OT-02', name: 'High-Frequency C-Arm Surgical Imaging Unit', category: 'Clinical / Panchakarma Tables', department: 'Shalya Tantra (Surgery)', location: 'Orthopedic Shalya OT', purchaseDate: '2024-05-20', condition: 'Good', lastMaintenanceDate: '2026-08-01', nextMaintenanceDate: '2026-11-01', annualMaintenanceVendor: 'Siemens Healthineers' },
];

// 15 Campus Service Requests (Hostel, Mess, Transport, Grievances)
export const INITIAL_CAMPUS_SERVICES: CampusServiceRequest[] = [
  { id: 'csr-1', ticketNo: 'TKT-2026-041', category: 'Hostel Room Maintenance', requesterName: 'Rohan Deshmukh', requesterRole: 'Student', priority: 'Medium', assignedDepartment: 'Hostel Maintenance Wing', status: 'In Progress', dateLogged: '2026-10-10', description: 'Room H-104 ceiling fan regulator sparking and loose connection.', resolutionNotes: 'Electrician dispatched; regulator replaced with spare.' },
  { id: 'csr-2', ticketNo: 'TKT-2026-042', category: 'Mess & Food Quality', requesterName: 'Devendra Meena', requesterRole: 'Student', priority: 'High', assignedDepartment: 'Mess Committee', status: 'Open', dateLogged: '2026-10-11', description: 'Student mess dinner menu needs balanced Ayurvedic dietary options (Pathya Ahara) as discussed in student council.' },
  { id: 'csr-3', ticketNo: 'TKT-2026-043', category: 'Student Transport Route', requesterName: 'Pooja Verma', requesterRole: 'Student', priority: 'Low', assignedDepartment: 'Transport Department', status: 'Resolved', dateLogged: '2026-10-06', description: 'Route 3 College Bus arriving 15 minutes late at City Center stop due to morning metro construction.', resolutionNotes: 'Departure time shifted by 15 mins from terminal point to keep schedule.' },
  { id: 'csr-4', ticketNo: 'TKT-2026-044', category: 'Hostel Room Maintenance', requesterName: 'Sneha Patel', requesterRole: 'Student', priority: 'Urgent', assignedDepartment: 'Hostel Maintenance Wing', status: 'Resolved', dateLogged: '2026-10-09', description: 'Girls Hostel GH-210 hot water geyser tripping main circuit breaker.', resolutionNotes: 'Heating coil scale cleared and miniature circuit breaker upgraded.' },
  { id: 'csr-5', ticketNo: 'TKT-2026-045', category: 'Student Grievance Cell', requesterName: 'Prathamesh Gaikwad', requesterRole: 'Student', priority: 'Medium', assignedDepartment: 'Academic Grievance Committee', status: 'In Progress', dateLogged: '2026-10-08', description: 'Request for re-tallying of marks in Shalya Tantra Internal Assessment Paper 1.', resolutionNotes: 'Scrutiny committee scheduled for 14th October review.' },
  { id: 'csr-6', ticketNo: 'TKT-2026-046', category: 'Campus Security', requesterName: 'Dr. Suresh M. Hegde', requesterRole: 'Faculty', priority: 'Medium', assignedDepartment: 'Chief Security Officer', status: 'Open', dateLogged: '2026-10-11', description: 'Night lighting near the Botanical Garden pathway requires replacement of two LED floodlights.' },
  { id: 'csr-7', ticketNo: 'TKT-2026-047', category: 'Hostel Room Maintenance', requesterName: 'Aditya Kulkarni', requesterRole: 'Student', priority: 'Low', assignedDepartment: 'Hostel Maintenance Wing', status: 'Open', dateLogged: '2026-10-12', description: 'Study table drawer lock in room H-201 jammed.' },
  { id: 'csr-8', ticketNo: 'TKT-2026-048', category: 'Mess & Food Quality', requesterName: 'Dr. (Intern) Shalini Menon', requesterRole: 'Student', priority: 'Medium', assignedDepartment: 'Mess Committee', status: 'In Progress', dateLogged: '2026-10-09', description: 'Night canteen arrangements for duty interns in hospital casualty required after 11 PM.' },
  { id: 'csr-9', ticketNo: 'TKT-2026-049', category: 'Student Transport Route', requesterName: 'Dr. Meenakshi Sundaram', requesterRole: 'Faculty', priority: 'Low', assignedDepartment: 'Transport Department', status: 'Resolved', dateLogged: '2026-10-04', description: 'Bus arrangement requested for 40 students for field herbarium trip to Aravalli forest reserve on Saturday.', resolutionNotes: 'Two 32-seater college buses allocated with fuel approval.' },
  { id: 'csr-10', ticketNo: 'TKT-2026-050', category: 'Hostel Room Maintenance', requesterName: 'Kavya Pillai', requesterRole: 'Student', priority: 'Medium', assignedDepartment: 'Hostel Maintenance Wing', status: 'Resolved', dateLogged: '2026-10-07', description: 'Water pressure low in 2nd floor washrooms of Girls Hostel GH-208.', resolutionNotes: 'Overhead booster pump cleaned and filter cartridge replaced.' },
  { id: 'csr-11', ticketNo: 'TKT-2026-051', category: 'Campus Security', requesterName: 'Dr. Sunita Deshmukh', requesterRole: 'Staff', priority: 'High', assignedDepartment: 'Chief Security Officer', status: 'Resolved', dateLogged: '2026-10-05', description: 'Visitor pass verification at Hospital OPD entrance needs dedicated queue separation during peak morning rush.', resolutionNotes: 'Deployed security marshal with dedicated queue barriers.' },
  { id: 'csr-12', ticketNo: 'TKT-2026-052', category: 'Mess & Food Quality', requesterName: 'Yashvardhan Jain', requesterRole: 'Student', priority: 'Low', assignedDepartment: 'Mess Committee', status: 'Closed', dateLogged: '2026-10-01', description: 'Mess fee adjustment for authorized medical leave of 10 days.', resolutionNotes: 'Approved by Warden and Accounts. Rebate credited in fee ledger.' },
  { id: 'csr-13', ticketNo: 'TKT-2026-053', category: 'Student Grievance Cell', requesterName: 'Bhavna Chauhan', requesterRole: 'Student', priority: 'Medium', assignedDepartment: 'Academic Grievance Committee', status: 'Resolved', dateLogged: '2026-09-28', description: 'Request for special permission for library study hours extension till midnight during exams.', resolutionNotes: 'Approved. Library reading hall extended till 12:30 AM with security log.' },
  { id: 'csr-14', ticketNo: 'TKT-2026-054', category: 'Hostel Room Maintenance', requesterName: 'Dr. Rohit V. Saxena', requesterRole: 'Student', priority: 'Low', assignedDepartment: 'Hostel Maintenance Wing', status: 'Open', dateLogged: '2026-10-12', description: 'PG Hostel room 04 LAN port connection intermittently disconnecting.' },
  { id: 'csr-15', ticketNo: 'TKT-2026-055', category: 'Student Transport Route', requesterName: 'Sameer Qureshi', requesterRole: 'Student', priority: 'Medium', assignedDepartment: 'Transport Department', status: 'In Progress', dateLogged: '2026-10-11', description: 'Evening return shuttle bus frequency from Hospital complex to Main Campus Hostel.' },
];

// 25 Library Books (Samhitas, Classical commentaries, Modern textbooks)
export const INITIAL_LIBRARY: LibraryBook[] = [
  { id: 'lib-1', accessionNo: 'AYU-LIB-001', isbn: '978-81-7080-001-2', title: 'Charaka Samhita (Vaidya Jadavji Trikamji Acharya Edition with Chakrapani Tika)', author: 'Chakrapanidatta', category: 'Ayurveda Samhita & Commentaries', totalCopies: 12, availableCopies: 5, shelfLocation: 'Stack A - Row 1', status: 'Available' },
  { id: 'lib-2', accessionNo: 'AYU-LIB-002', isbn: '978-81-7080-002-9', title: 'Sushruta Samhita with Nibandhasangraha Commentary of Dalhana', author: 'Dalhanacharya & Gayadasa', category: 'Ayurveda Samhita & Commentaries', totalCopies: 10, availableCopies: 4, shelfLocation: 'Stack A - Row 2', status: 'Available' },
  { id: 'lib-3', accessionNo: 'AYU-LIB-003', isbn: '978-81-7080-003-6', title: 'Ashtanga Hridaya with Sarvangasundara Commentary of Arundatta & Hemadri', author: 'Vagbhata', category: 'Ayurveda Samhita & Commentaries', totalCopies: 15, availableCopies: 6, shelfLocation: 'Stack A - Row 3', status: 'Available' },
  { id: 'lib-4', accessionNo: 'AYU-LIB-004', isbn: '978-81-7080-004-3', title: 'Dravyaguna Vijnana (Vol I & II - Materia Medica)', author: 'Prof. P. V. Sharma', category: 'Dravyaguna & Pharmacognosy', totalCopies: 20, availableCopies: 2, shelfLocation: 'Stack B - Row 1', status: 'Low Copies' },
  { id: 'lib-5', accessionNo: 'AYU-LIB-005', isbn: '978-81-7080-005-0', title: 'Bhavaprakasha Nighantu with Hindi Commentary', author: 'Bhavamishra (Ed. Dr. G. S. Pandey)', category: 'Dravyaguna & Pharmacognosy', totalCopies: 14, availableCopies: 7, shelfLocation: 'Stack B - Row 2', status: 'Available' },
  { id: 'lib-6', accessionNo: 'AYU-LIB-006', isbn: '978-81-7080-006-7', title: 'Rasa Tarangini of Sri Sadananda Sharma', author: 'Kashinath Shastri', category: 'Ayurveda Samhita & Commentaries', totalCopies: 8, availableCopies: 3, shelfLocation: 'Stack B - Row 3', status: 'Available' },
  { id: 'lib-7', accessionNo: 'AYU-LIB-007', isbn: '978-81-7080-007-4', title: 'Bhaishajya Ratnavali (Illustrated Classical Formulations)', author: 'Kaviraj Govind Das Sen', category: 'Ayurveda Samhita & Commentaries', totalCopies: 10, availableCopies: 1, shelfLocation: 'Stack B - Row 4', status: 'Low Copies' },
  { id: 'lib-8', accessionNo: 'AYU-LIB-008', isbn: '978-81-7080-008-1', title: 'Panchakarma Illustrated Clinical Practical Manual', author: 'Dr. Pulak Kanti Kar', category: 'Ayurveda Samhita & Commentaries', totalCopies: 16, availableCopies: 8, shelfLocation: 'Stack C - Row 1', status: 'Available' },
  { id: 'lib-9', accessionNo: 'AYU-LIB-009', isbn: '978-81-7080-009-8', title: 'Madhava Nidanam with Rogavinishchaya Madhukosha Commentary', author: 'Madhavakara (Vijayarakshita & Srikanthadatta)', category: 'Ayurveda Samhita & Commentaries', totalCopies: 12, availableCopies: 5, shelfLocation: 'Stack C - Row 2', status: 'Available' },
  { id: 'lib-10', accessionNo: 'AYU-LIB-010', isbn: '978-81-7080-010-4', title: 'Sharangadhara Samhita with Dipika Commentary', author: 'Adhamalla & Kashiram', category: 'Ayurveda Samhita & Commentaries', totalCopies: 8, availableCopies: 4, shelfLocation: 'Stack C - Row 3', status: 'Available' },
  { id: 'lib-11', accessionNo: 'AYU-LIB-011', isbn: '978-01-9878-811-1', title: 'Harrison\'s Principles of Internal Medicine (21st Edition)', author: 'Joseph Loscalzo et al.', category: 'Anatomy & Modern Physiology', totalCopies: 6, availableCopies: 2, shelfLocation: 'Stack D - Row 1', status: 'Low Copies' },
  { id: 'lib-12', accessionNo: 'AYU-LIB-012', isbn: '978-01-9878-812-8', title: 'Bailey & Love\'s Short Practice of Surgery (28th Edition)', author: 'P. Ronan O\'Connell et al.', category: 'Anatomy & Modern Physiology', totalCopies: 5, availableCopies: 1, shelfLocation: 'Stack D - Row 2', status: 'Low Copies' },
  { id: 'lib-13', accessionNo: 'AYU-LIB-013', isbn: '978-01-9878-813-5', title: 'Guyton and Hall Textbook of Medical Physiology', author: 'John E. Hall', category: 'Anatomy & Modern Physiology', totalCopies: 8, availableCopies: 4, shelfLocation: 'Stack D - Row 3', status: 'Available' },
  { id: 'lib-14', accessionNo: 'AYU-LIB-014', isbn: '978-01-9878-814-2', title: 'BD Chaurasia\'s Human Anatomy (Vol 1-3)', author: 'BD Chaurasia', category: 'Anatomy & Modern Physiology', totalCopies: 18, availableCopies: 9, shelfLocation: 'Stack D - Row 4', status: 'Available' },
  { id: 'lib-15', accessionNo: 'AYU-LIB-015', isbn: '978-81-7080-015-9', title: 'Ayurvedic Pharmacopoeia of India (Part I & II complete set)', author: 'Pharmacopoeia Commission for Indian Medicine (PCIM&H)', category: 'Dravyaguna & Pharmacognosy', totalCopies: 4, availableCopies: 4, shelfLocation: 'Reference Desk Only', status: 'Available' },
  { id: 'lib-16', accessionNo: 'AYU-LIB-016', isbn: '978-81-7080-016-6', title: 'Research Methodology and Medical Statistics in Ayurveda', author: 'Dr. C. R. Jayanthi & Dr. B. K. Sahu', category: 'Research Methodology', totalCopies: 14, availableCopies: 6, shelfLocation: 'Stack E - Row 1', status: 'Available' },
  { id: 'lib-17', accessionNo: 'AYU-LIB-017', isbn: '978-81-7080-017-3', title: 'Clinical Examination in Kaya Chikitsa: An Integrated Approach', author: 'Prof. Sanjeev Rastogi', category: 'Ayurveda Samhita & Commentaries', totalCopies: 10, availableCopies: 3, shelfLocation: 'Stack E - Row 2', status: 'Available' },
  { id: 'lib-18', accessionNo: 'AYU-LIB-018', isbn: '978-81-7080-018-0', title: 'Kashyapa Samhita (Vriddha Jivakiya Tantra) with English Translation', author: 'Prof. P. V. Tewari', category: 'Ayurveda Samhita & Commentaries', totalCopies: 6, availableCopies: 2, shelfLocation: 'Stack A - Row 4', status: 'Low Copies' },
  { id: 'lib-19', accessionNo: 'AYU-LIB-019', isbn: '978-81-7080-019-7', title: 'Sahasrayogam: The Classical Treatment Compendium of Kerala', author: 'Dr. K. Nishteswar', category: 'Ayurveda Samhita & Commentaries', totalCopies: 8, availableCopies: 5, shelfLocation: 'Stack B - Row 5', status: 'Available' },
  { id: 'lib-20', accessionNo: 'AYU-LIB-020', isbn: '978-81-7080-020-3', title: 'Indian Medicinal Plants: An Illustrated Dictionary', author: 'C. P. Khare', category: 'Dravyaguna & Pharmacognosy', totalCopies: 5, availableCopies: 2, shelfLocation: 'Stack B - Row 6', status: 'Low Copies' },
  { id: 'lib-21', accessionNo: 'AYU-LIB-021', isbn: '978-81-7080-021-0', title: 'Journal of Research in Ayurvedic Sciences (Bound Archive 2018-2025)', author: 'CCRAS', category: 'Journals & Rare Manuscripts', totalCopies: 2, availableCopies: 2, shelfLocation: 'Archival Vault', status: 'Available' },
  { id: 'lib-22', accessionNo: 'AYU-LIB-022', isbn: '978-81-7080-022-7', title: 'AYU: International Quarterly Journal of Research in Ayurveda (Vol 35-44)', author: 'ITRA Jamnagar', category: 'Journals & Rare Manuscripts', totalCopies: 3, availableCopies: 3, shelfLocation: 'Archival Vault', status: 'Available' },
  { id: 'lib-23', accessionNo: 'AYU-LIB-023', isbn: '978-81-7080-023-4', title: 'Good Clinical Practice Guidelines for Clinical Trials in Ayurveda (CCRAS)', author: 'Ministry of Ayush', category: 'Research Methodology', totalCopies: 7, availableCopies: 4, shelfLocation: 'Stack E - Row 3', status: 'Available' },
  { id: 'lib-24', accessionNo: 'AYU-LIB-024', isbn: '978-81-7080-024-1', title: 'Ashtanga Sangraha with Shashilekha Commentary of Indu', author: 'Vagbhata (Ed. Shivprasad Sharma)', category: 'Ayurveda Samhita & Commentaries', totalCopies: 6, availableCopies: 3, shelfLocation: 'Stack A - Row 5', status: 'Available' },
  { id: 'lib-25', accessionNo: 'AYU-LIB-025', isbn: '978-81-7080-025-8', title: 'Ksharasutra Management of Fistula-in-ano: Clinical Evidence and Protocols', author: 'Prof. K. R. Sharma', category: 'Ayurveda Samhita & Commentaries', totalCopies: 9, availableCopies: 4, shelfLocation: 'Stack C - Row 4', status: 'Available' },
];

// 10 Research Projects & Community Outreach Records
export const INITIAL_RESEARCH: ResearchProject[] = [
  { id: 'res-p-1', projectCode: 'RES-AYU-2025-01', title: 'Clinical Evaluation of Shirodhara with Ksheerabala Taila in Generalized Anxiety Disorder and Sleep Quality', principalInvestigator: 'Dr. Anand K. Joshi', department: 'Panchakarma Department', fundingAgency: 'CCRAS Extra-Mural Research Grant', budget: 1450000, startDate: '2025-04-01', endDate: '2027-03-31', ethicsApprovalStatus: 'Ethics Approved', outreachBeneficiaries: 180, publicationCount: 2 },
  { id: 'res-p-2', projectCode: 'RES-AYU-2025-02', title: 'Phytochemical Standardization and DNA Barcoding of High-Altitude Guduchi (Tinospora cordifolia) Ecotypes', principalInvestigator: 'Dr. Meenakshi Sundaram', department: 'Dravyaguna Vijnana', fundingAgency: 'National Medicinal Plants Board (NMPB)', budget: 1820000, startDate: '2025-06-15', endDate: '2027-06-14', ethicsApprovalStatus: 'Ethics Approved', outreachBeneficiaries: 0, publicationCount: 1 },
  { id: 'res-p-3', projectCode: 'RES-AYU-2026-03', title: 'Efficacy of Ksharasutra versus Open Fistulectomy in Complex Recurrent Bhagandara: A Randomized Trial', principalInvestigator: 'Dr. Girish N. Bhatt', department: 'Shalya Tantra (Surgery)', fundingAgency: 'Institutional Research Fund', budget: 620000, startDate: '2026-01-10', endDate: '2027-12-31', ethicsApprovalStatus: 'Ethics Approved', outreachBeneficiaries: 75, publicationCount: 1 },
  { id: 'res-p-4', projectCode: 'RES-AYU-2026-04', title: 'Integrated Management of Osteoarthritis Knees (Sandhivata) using Janu Basti and Rasnasaptaka Kwatha in Rural Elderly Cohort', principalInvestigator: 'Prof. (Dr.) Vasant Vaidya', department: 'Kaya Chikitsa', fundingAgency: 'State Ayush Research Society', budget: 980000, startDate: '2026-02-01', endDate: '2028-01-31', ethicsApprovalStatus: 'Ethics Approved', outreachBeneficiaries: 340, publicationCount: 0 },
  { id: 'res-p-5', projectCode: 'RES-AYU-2026-05', title: 'Role of Shatavari Ghrita in Perimenopausal Syndrome: A Controlled Clinical Study', principalInvestigator: 'Dr. Sunita Deshmukh', department: 'Prasuti Tantra & Stri Roga', fundingAgency: 'Institutional Research Fund', budget: 450000, startDate: '2026-05-01', endDate: '2027-10-31', ethicsApprovalStatus: 'Under Institutional Ethics Review', outreachBeneficiaries: 110, publicationCount: 0 },
  { id: 'res-p-6', projectCode: 'RES-AYU-2026-06', title: 'Swarna Prashana Immunomodulatory Camp in Primary School Children: A Longitudinal Growth & Morbidity Survey', principalInvestigator: 'Dr. Shraddha Sen', department: 'Kaumarbhritya (Pediatrics)', fundingAgency: 'PMRG Community Outreach Initiative', budget: 350000, startDate: '2026-01-01', endDate: '2026-12-31', ethicsApprovalStatus: 'Ethics Approved', outreachBeneficiaries: 1420, publicationCount: 1 },
  { id: 'res-p-7', projectCode: 'RES-AYU-2026-07', title: 'Comparative Physicochemical & Heavy Metal Analysis of Classical Bhasmas using ICP-MS and XRD Spectroscopy', principalInvestigator: 'Dr. Hemant R. Patil', department: 'Rasa Shastra & Bhaishajya', fundingAgency: 'Ayush Centre of Excellence Scheme', budget: 2100000, startDate: '2026-03-15', endDate: '2028-03-14', ethicsApprovalStatus: 'Ethics Approved', outreachBeneficiaries: 0, publicationCount: 3 },
  { id: 'res-p-8', projectCode: 'RES-AYU-2026-08', title: 'Community-Based Screening for Metabolic Syndrome and Dinacharya Lifestyle Counseling in 10 Adopted Gram Panchayats', principalInvestigator: 'Dr. Suresh M. Hegde', department: 'Swasthavritta & Yoga', fundingAgency: 'Unnat Bharat Abhiyan Outreach', budget: 510000, startDate: '2025-11-01', endDate: '2026-10-31', ethicsApprovalStatus: 'Ethics Approved', outreachBeneficiaries: 2850, publicationCount: 2 },
  { id: 'res-p-9', projectCode: 'RES-AYU-2026-09', title: 'Ayurvedic Management of Diabetic Retinopathy (Timira) with Tarpana & Aschyotana Protocols', principalInvestigator: 'Dr. Radhika Nair', department: 'Shalakya Tantra (Eye/ENT)', fundingAgency: 'Institutional Seed Grant', budget: 480000, startDate: '2026-07-01', endDate: '2028-06-30', ethicsApprovalStatus: 'Under Institutional Ethics Review', outreachBeneficiaries: 60, publicationCount: 0 },
  { id: 'res-p-10', projectCode: 'RES-AYU-2026-10', title: 'Ancient Manuscripts Preservation and Digitization: Critical Edition of 17th Century Mewar Vaidya Granthas', principalInvestigator: 'Dr. Pallavi Kulkarni', department: 'Samhita & Siddhanta', fundingAgency: 'National Mission for Manuscripts (NMM)', budget: 750000, startDate: '2026-04-10', endDate: '2027-10-09', ethicsApprovalStatus: 'Protocol Submitted', outreachBeneficiaries: 45, publicationCount: 0 },
];

// 15 Institutional Evidence Documents (NCISM / University Preparation pack)
export const INITIAL_COMPLIANCE_DOCS: ComplianceDocument[] = [
  { id: 'doc-1', docCode: 'NCISM-EV-26-01', title: 'Annual Hospital Bed Occupancy & IPD Register Verification 2025-26', category: 'NCISM Annual Verification', department: 'Ayurveda Teaching Hospital', owner: 'Dr. Sunita Deshmukh', lastReviewDate: '2026-09-30', version: 'v3.2', status: 'Verified Ready', evidencePackRef: 'PACK-NCISM-HOSP-2026', simulatedSummary: 'Average bed occupancy verified at 71.4% with cross-checked ward registers and daily census.' },
  { id: 'doc-2', docCode: 'NCISM-EV-26-02', title: 'OPD Clinical Attendance & Prescription Audit Summary (Monthly)', category: 'NCISM Annual Verification', department: 'Ayurveda Teaching Hospital', owner: 'Dr. Sunita Deshmukh', lastReviewDate: '2026-10-05', version: 'v2.0', status: 'Verified Ready', evidencePackRef: 'PACK-NCISM-HOSP-2026', simulatedSummary: 'Daily OPD attendance logs with token cross-references; average 215 visits/day.' },
  { id: 'doc-3', docCode: 'NCISM-EV-26-03', title: 'Teacher Faculty Roster & MSR Norms Compliance Register', category: 'NCISM Annual Verification', department: 'Academic Office', owner: 'Dr. Meenakshi Sundaram', lastReviewDate: '2026-10-02', version: 'v4.1', status: 'Verified Ready', evidencePackRef: 'PACK-MSR-FAC-2026', simulatedSummary: 'All 14 statutory teaching departments staffed as per Minimum Standard Requirements (MSR).' },
  { id: 'doc-4', docCode: 'NCISM-EV-26-04', title: 'Herbal Garden Botanical Register (320 Species with Geo-Tags)', category: 'Herbal Garden Botanical Register', department: 'Dravyaguna Vijnana', owner: 'Dr. Meenakshi Sundaram', lastReviewDate: '2026-09-18', version: 'v1.8', status: 'Verified Ready', evidencePackRef: 'PACK-HERBAL-2026', simulatedSummary: 'Photographic herbarium catalogue, demonstration beds, and irrigation certification.' },
  { id: 'doc-5', docCode: 'NCISM-EV-26-05', title: 'Teaching Pharmacy Production & Quality Control Work Orders', category: 'NCISM Annual Verification', department: 'Rasa Shastra & Pharmacy', owner: 'Dr. Hemant R. Patil', lastReviewDate: '2026-10-01', version: 'v2.4', status: 'Verified Ready', evidencePackRef: 'PACK-PHARM-2026', simulatedSummary: 'Batch manufacturing records (BMR) for classical teaching formulations.' },
  { id: 'doc-6', docCode: 'NCISM-EV-26-06', title: 'University Affiliation Board of Studies Syllabus Compliance Dossier', category: 'University Board of Studies', department: 'Office of the Principal', owner: 'Prof. (Dr.) Vasant Vaidya', lastReviewDate: '2026-09-15', version: 'v1.5', status: 'Verified Ready', evidencePackRef: 'PACK-UNIV-BOS-2026', simulatedSummary: 'Elective course completion records, internal assessment mark audits, and board resolutions.' },
  { id: 'doc-7', docCode: 'NCISM-EV-26-07', title: 'Clinical Logbook Completion Register for BAMS Interns & Scholars', category: 'NCISM Annual Verification', department: 'Academic Office', owner: 'Dr. Anand K. Joshi', lastReviewDate: '2026-10-04', version: 'v2.1', status: 'Pending Internal Sign-off', evidencePackRef: 'PACK-LOGBOOK-2026', simulatedSummary: 'Supervised clinical postings and rotation certifications awaiting 3 HOD countersignatures.' },
  { id: 'doc-8', docCode: 'NCISM-EV-26-08', title: 'Faculty Bio-Metric Attendance Summary & Leave Ledger Preparation', category: 'Faculty Bio-Metric Audit Preparation', department: 'Campus HR', owner: 'Dr. Rajeshwar Sharma', lastReviewDate: '2026-10-08', version: 'v1.2', status: 'Verified Ready', evidencePackRef: 'PACK-HR-BIO-2026', simulatedSummary: 'Sample audit report prepared from HR attendance registers.' },
  { id: 'doc-9', docCode: 'NCISM-EV-26-09', title: 'Institutional Ethics Committee (IEC) Meeting Minutes & Approvals', category: 'NCISM Annual Verification', department: 'Research & Ethics Committee', owner: 'Prof. (Dr.) Vasant Vaidya', lastReviewDate: '2026-08-25', version: 'v2.0', status: 'Verified Ready', evidencePackRef: 'PACK-IEC-2026', simulatedSummary: 'Minutes of 4 statutory IEC sittings and approved clinical trials trial IDs.' },
  { id: 'doc-10', docCode: 'NCISM-EV-26-10', title: 'NABH Hospital Quality Manual & Standard Operating Procedures', category: 'Ayush Hospital Bed Occupancy Audit', department: 'Ayurveda Teaching Hospital', owner: 'Dr. Sunita Deshmukh', lastReviewDate: '2026-07-20', version: 'v3.0', status: 'Verified Ready', evidencePackRef: 'PACK-NABH-2026', simulatedSummary: 'Clinical audit schedules, infection control reports, and biomedical waste management returns.' },
  { id: 'doc-11', docCode: 'NCISM-EV-26-11', title: 'Pharmacovigilance Return for ASU Drugs (Quarterly ADR Register)', category: 'Pharmacovigilance Return', department: 'Rasa Shastra & Pharmacology', owner: 'Dr. Hemant R. Patil', lastReviewDate: '2026-10-02', version: 'v1.4', status: 'Verified Ready', evidencePackRef: 'PACK-PHARMACOVIG-2026', simulatedSummary: 'Adverse Drug Reaction monitoring peripheral centre return submitted to regional centre.' },
  { id: 'doc-12', docCode: 'NCISM-EV-26-12', title: 'Dissection Hall Cadaveric Procurement & Sharir Rachana Register', category: 'NCISM Annual Verification', department: 'Sharir Rachana', owner: 'Prof. (Dr.) Vasant Vaidya', lastReviewDate: '2026-06-30', version: 'v1.1', status: 'Verified Ready', evidencePackRef: 'PACK-ANAT-2026', simulatedSummary: 'Formalin embalming certificates, anatomy hall permits, and specimen display log.' },
  { id: 'doc-13', docCode: 'NCISM-EV-26-13', title: 'Biomedical Waste Disposal Barcoded Manifests & PCB Authorization', category: 'Ayush Hospital Bed Occupancy Audit', department: 'Hospital Administration', owner: 'Dr. Sunita Deshmukh', lastReviewDate: '2026-09-22', version: 'v2.2', status: 'Verified Ready', evidencePackRef: 'PACK-BMW-2026', simulatedSummary: 'State Pollution Control Board authorization valid till 2028 with monthly vendor receipts.' },
  { id: 'doc-14', docCode: 'NCISM-EV-26-14', title: 'Disability & Equal Opportunity Cell Institutional Policies', category: 'University Board of Studies', department: 'Campus Administration', owner: 'Shri Rakesh Agrawal', lastReviewDate: '2026-05-10', version: 'v1.0', status: 'Needs Update', evidencePackRef: 'PACK-POLICY-2026', simulatedSummary: 'Campus accessibility audit recommendations under infrastructure review.' },
  { id: 'doc-15', docCode: 'NCISM-EV-26-15', title: 'Fire Safety NOC & Campus Building Stability Certificate', category: 'NCISM Annual Verification', department: 'Campus Facilities', owner: 'Dr. Rajeshwar Sharma', lastReviewDate: '2026-08-14', version: 'v2.1', status: 'Verified Ready', evidencePackRef: 'PACK-INFRA-2026', simulatedSummary: 'Fire safety compliance certificate and municipal occupancy permissions.' },
];

// Initial System Notifications
export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  { id: 'notif-1', title: 'Low Stock Alert', message: 'Avipattikar Churna (BATCH-AVI-2603) has fallen below reorder level (24 remaining).', type: 'warning', timestamp: '10 mins ago', read: false, moduleLink: '/app/pharmacy' },
  { id: 'notif-2', title: 'Pending Clinical Logbook', message: 'Dr. Anand K. Joshi has 2 pending clinical logbook entries awaiting review.', type: 'info', timestamp: '35 mins ago', read: false, moduleLink: '/app/clinical-logbooks' },
  { id: 'notif-3', title: 'Fee Overdue Alert', message: '3 BAMS students have overdue fee balances totaling ₹2,40,000.', type: 'alert', timestamp: '1 hour ago', read: false, moduleLink: '/app/finance' },
  { id: 'notif-4', title: 'Expiring Medicine Flag', message: 'Rasnasaptaka Kwatha (BATCH-RAS-2508) expires in 34 days (15 Nov 2026).', type: 'warning', timestamp: '2 hours ago', read: true, moduleLink: '/app/pharmacy' },
  { id: 'notif-5', title: 'Panchakarma Schedule', message: '12 therapy sessions booked for today; 2 currently in progress.', type: 'info', timestamp: '3 hours ago', read: true, moduleLink: '/app/panchakarma' },
];

// Predefined AI Demonstration Prompts & Responses
export const AI_DEMO_KNOWLEDGE_BASE = [
  {
    query: "Summarise today's college operations.",
    response: `**Today's Operational Summary (Campus & Hospital Overview):**
- **Academics:** 12 classes scheduled across BAMS 2nd, 3rd, and Final Prof. Morning Dravyaguna theory attendance recorded at **89.2%**.
- **Hospital:** **15 OPD patients** queued, with 2 actively in consultation in Kaya Chikitsa and Panchakarma OPDs. Bed occupancy in IPD stands at **87.5% (7/8 active beds)**.
- **Panchakarma:** **12 therapy sessions** booked today, including Janu Basti, Abhyanga-Swedana, and Shirodhara.
- **Exceptions Requiring Attention:** 
  1. Pharmacy has **3 low-stock/near-expiry items** (Avipattikar Churna, Rasnasaptaka Kwatha).
  2. 3 students have overdue fee balance.
*Note: AI assistance provides assistive compilation. Authorised administrators and clinical staff review and decide.*`,
    sources: ['OPD Queue (Token #101-115)', 'IPD Bed Census (8 beds)', 'Panchakarma Bookings (PK-BK-26-01)', 'Pharmacy Master']
  },
  {
    query: "Which medicines require attention due to low stock or expiry?",
    response: `**Ayurveda Pharmacy Stock Exceptions Identified:**
1. **Rasnasaptaka Kwatha (BATCH-RAS-2508)**: 
   - Expiry Date: **15 Nov 2026** (34 days remaining).
   - Current Stock: 12 bottles. Action: Expedite OPD issue or process return to supplier.
2. **Jatyadi Taila (BATCH-JAT-2511)**:
   - Expiry Date: **28 Oct 2026** (Near expiry). Current Stock: 8 bottles.
3. **Avipattikar Churna (BATCH-AVI-2603)**:
   - Current Stock: 24 packets (Reorder threshold is 40). Action: Trigger procurement order with Baidyanath Ayurved.
4. **Mahasudarshan Churna (BATCH-MSD-2509)**:
   - Status: Expired batch quarantined in Return Store for disposal.`,
    sources: ['Pharmacy Item Master (ph-2, ph-3, ph-13, ph-19)', 'Stock Movement Register']
  },
  {
    query: "Show students with low attendance.",
    response: `**Students Below Statutory 75% Attendance Threshold:**
- **Devendra Meena (BAMS-23-005)**: 68.0% attendance (Batch 2023-28, 2nd Prof). Mentor: Dr. Anand K. Joshi.
- **Yashvardhan Jain (BAMS-21-027)**: 69.5% attendance (Batch 2021-26, Final Prof). Mentor: Dr. Suresh M. Hegde.
- **Rohan Deshmukh (BAMS-23-003)**: 71.2% attendance (Batch 2023-28, 2nd Prof). Mentor: Dr. Pallavi Kulkarni.
- **Prathamesh Gaikwad (BAMS-22-013)**: 73.0% attendance (Batch 2022-27, 3rd Prof). Mentor: Dr. Girish N. Bhatt.

*Recommended Action: Trigger automated mentor notifications and advisory letters to students and guardians as per University academic regulations.*`,
    sources: ['Student Master (std-3, std-5, std-13, std-27)', 'Daily Attendance Register (att-1 to att-30)']
  },
  {
    query: "Summarise outstanding student fees.",
    response: `**Fee Collection & Dues Status:**
- **Total Fees Invoiced:** ₹74,90,000
- **Total Fees Collected:** ₹69,50,000 (92.8% collection efficiency)
- **Total Outstanding Balance:** ₹5,40,000
- **Overdue Priority Accounts (Exceeded Grace Period):**
  1. *Yashvardhan Jain (BAMS-21-027)*: ₹90,000 overdue
  2. *Devendra Meena (BAMS-23-005)*: ₹85,000 overdue
  3. *Prathamesh Gaikwad (BAMS-22-013)*: ₹65,000 overdue
- **Pending (Within Due Date):** Nikhil Rane (₹50,000 due 15 Oct).`,
    sources: ['Fee Ledger Master (fee-1 to fee-30)', 'Accounts Reconciliation Sheet']
  },
  {
    query: "Prepare a sample evidence checklist for institutional review.",
    response: `**NCISM / Institutional Review Evidence Checklist (Draft Preparation):**
- [x] **Hospital IPD Census:** Daily bed occupancy compiled (Verified at 71.4% average).
- [x] **Hospital OPD Records:** Monthly token registrations and prescription logs mapped.
- [x] **Faculty MSR Compliance:** 14 statutory Ayurvedic departments staffed per norms.
- [x] **Herbal Garden Register:** 320 species botanical catalogue and sprinkler log ready.
- [ ] **Clinical Logbooks:** Intern & PG clinical posting logs (Pending sign-off by Shalya HOD).
- [x] **Teaching Pharmacy Records:** 12 batch production cards and raw drug store logs verified.
- [x] **Bio-Medical Waste:** Valid PCB authorization and manifest barcode receipts filed.
*Reminder: This checklist is a simulated preparatory tool. Official submission requires validated physical verification and principal authorisation.*`,
    sources: ['Institutional Document Register (doc-1 to doc-15)', 'MSR Assessment Norms 2026']
  },
  {
    query: "Summarise pending departmental approvals.",
    response: `**Pending Approvals Across Departments:**
1. **Admissions:** 5 fresh NEET applications submitted awaiting document scrutiny.
2. **Clinical Logbooks:** 2 student cases pending faculty supervisor sign-off (Aditya Kulkarni & Manish Tiwari).
3. **Panchakarma:** 1 patient session booking (Dilip Kumar Verma) pending consent verification.
4. **Procurement:** PR-2026-0083 for Teak Wood Droni (₹95,000) under quotation review.
5. **Campus Services:** 5 open service tickets (Hostel fan, mess menu, PG LAN connectivity).`,
    sources: ['Admissions Master', 'Logbook Master', 'Procurement Master', 'Campus Services Register']
  }
];
