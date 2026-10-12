import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserPersona,
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
  NotificationItem,
} from '../types';
import {
  INITIAL_PERSONAS,
  INITIAL_FACULTY,
  INITIAL_STUDENTS,
  INITIAL_ADMISSIONS,
  INITIAL_ATTENDANCE,
  INITIAL_TIMETABLE,
  INITIAL_EXAMS,
  INITIAL_RESULTS,
  INITIAL_LOGBOOKS,
  INITIAL_PATIENTS,
  INITIAL_OPD,
  INITIAL_IPD,
  INITIAL_PHARMACY,
  INITIAL_STOCK_MOVEMENTS,
  INITIAL_PANCHAKARMA,
  INITIAL_FEES,
  INITIAL_PROCUREMENT,
  INITIAL_ASSETS,
  INITIAL_CAMPUS_SERVICES,
  INITIAL_LIBRARY,
  INITIAL_RESEARCH,
  INITIAL_COMPLIANCE_DOCS,
  INITIAL_NOTIFICATIONS,
} from '../mock/mockData';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

interface DemoContextType {
  // Auth state
  currentUser: UserPersona;
  isAuthenticated: boolean;
  login: (username: string, password: string) => { success: boolean; error?: string };
  loginAsPersona: (personaId: string) => void;
  logout: () => void;

  // Personas
  personas: UserPersona[];

  // Entities & Collections
  students: Student[];
  faculty: FacultyStaff[];
  admissions: AdmissionApplication[];
  attendance: AttendanceRecord[];
  timetable: TimetableEntry[];
  exams: Examination[];
  results: StudentResult[];
  logbooks: ClinicalLogbookEntry[];
  patients: Patient[];
  opdVisits: OpdVisit[];
  ipdAdmissions: IpdAdmission[];
  pharmacyItems: PharmacyItem[];
  stockMovements: StockMovement[];
  panchakarmaBookings: PanchakarmaBooking[];
  fees: FeeLedgerItem[];
  procurement: ProcurementRequest[];
  assets: AssetRecord[];
  campusServices: CampusServiceRequest[];
  library: LibraryBook[];
  research: ResearchProject[];
  compliance: ComplianceDocument[];
  notifications: NotificationItem[];

  // Mutations
  updateAdmissionStatus: (id: string, status: AdmissionApplication['status'], remarks?: string) => void;
  addAdmission: (app: Partial<AdmissionApplication>) => void;
  addStudent: (student: Partial<Student>) => void;
  markAttendance: (recordId: string, status: AttendanceRecord['status']) => void;
  addTimetableEntry: (entry: Partial<TimetableEntry>) => void;
  updateLogbookStatus: (id: string, status: ClinicalLogbookEntry['status'], feedback?: string) => void;
  addLogbookEntry: (entry: Partial<ClinicalLogbookEntry>) => void;
  addPatient: (patient: Partial<Patient>) => Patient;
  updateOpdStatus: (id: string, queueStatus: OpdVisit['queueStatus']) => void;
  registerOpdVisit: (visit: Partial<OpdVisit>) => void;
  dischargeIpd: (id: string, summary: string) => void;
  admitIpd: (adm: Partial<IpdAdmission>) => void;
  addPharmacyItem: (item: Partial<PharmacyItem>) => void;
  dispensePharmacyItem: (itemId: string, quantity: number, patientName: string) => boolean;
  bookPanchakarma: (booking: Partial<PanchakarmaBooking>) => void;
  updatePanchakarmaStatus: (id: string, status: PanchakarmaBooking['sessionStatus']) => void;
  recordFeePayment: (feeId: string, amount: number) => void;
  updateProcurementStatus: (id: string, status: ProcurementRequest['status']) => void;
  addProcurementRequest: (req: Partial<ProcurementRequest>) => void;
  updateAssetStatus: (id: string, condition: AssetRecord['condition']) => void;
  updateCampusTicketStatus: (ticketId: string, status: CampusServiceRequest['status'], notes?: string) => void;
  addCampusTicket: (ticket: Partial<CampusServiceRequest>) => void;
  issueReturnBook: (bookId: string, action: 'issue' | 'return') => void;
  updateComplianceStatus: (docId: string, status: ComplianceDocument['status']) => void;

  // Notification management
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Reset & Toasts
  resetDemoData: () => void;
  toasts: ToastMessage[];
  showToast: (message: string, type?: ToastMessage['type']) => void;
  dismissToast: (id: string) => void;
}

const STORAGE_KEYS = {
  AUTH: 'pmrg_demo_auth_state',
  PERSONA: 'pmrg_demo_active_persona',
  STATE: 'pmrg_demo_erp_state_v1',
};

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const DemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
    } catch {
      return false;
    }
  });

  const [currentUser, setCurrentUser] = useState<UserPersona>(() => {
    try {
      const savedPersonaId = localStorage.getItem(STORAGE_KEYS.PERSONA);
      const found = INITIAL_PERSONAS.find((p) => p.id === savedPersonaId);
      return found || INITIAL_PERSONAS[0];
    } catch {
      return INITIAL_PERSONAS[0];
    }
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: ToastMessage['type'] = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // ERP Datasets
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STATE + '_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [faculty] = useState<FacultyStaff[]>(INITIAL_FACULTY);

  const [admissions, setAdmissions] = useState<AdmissionApplication[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STATE + '_admissions');
    return saved ? JSON.parse(saved) : INITIAL_ADMISSIONS;
  });

  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STATE + '_attendance');
    return saved ? JSON.parse(saved) : INITIAL_ATTENDANCE;
  });

  const [timetable, setTimetable] = useState<TimetableEntry[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STATE + '_timetable');
    return saved ? JSON.parse(saved) : INITIAL_TIMETABLE;
  });

  const [exams] = useState<Examination[]>(INITIAL_EXAMS);
  const [results] = useState<StudentResult[]>(INITIAL_RESULTS);

  const [logbooks, setLogbooks] = useState<ClinicalLogbookEntry[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STATE + '_logbooks');
    return saved ? JSON.parse(saved) : INITIAL_LOGBOOKS;
  });

  const [patients, setPatients] = useState<Patient[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STATE + '_patients');
    return saved ? JSON.parse(saved) : INITIAL_PATIENTS;
  });

  const [opdVisits, setOpdVisits] = useState<OpdVisit[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STATE + '_opd');
    return saved ? JSON.parse(saved) : INITIAL_OPD;
  });

  const [ipdAdmissions, setIpdAdmissions] = useState<IpdAdmission[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STATE + '_ipd');
    return saved ? JSON.parse(saved) : INITIAL_IPD;
  });

  const [pharmacyItems, setPharmacyItems] = useState<PharmacyItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STATE + '_pharmacy');
    return saved ? JSON.parse(saved) : INITIAL_PHARMACY;
  });

  const [stockMovements, setStockMovements] = useState<StockMovement[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STATE + '_movements');
    return saved ? JSON.parse(saved) : INITIAL_STOCK_MOVEMENTS;
  });

  const [panchakarmaBookings, setPanchakarmaBookings] = useState<PanchakarmaBooking[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STATE + '_panchakarma');
    return saved ? JSON.parse(saved) : INITIAL_PANCHAKARMA;
  });

  const [fees, setFees] = useState<FeeLedgerItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STATE + '_fees');
    return saved ? JSON.parse(saved) : INITIAL_FEES;
  });

  const [procurement, setProcurement] = useState<ProcurementRequest[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STATE + '_procurement');
    return saved ? JSON.parse(saved) : INITIAL_PROCUREMENT;
  });

  const [assets, setAssets] = useState<AssetRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STATE + '_assets');
    return saved ? JSON.parse(saved) : INITIAL_ASSETS;
  });

  const [campusServices, setCampusServices] = useState<CampusServiceRequest[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STATE + '_campus');
    return saved ? JSON.parse(saved) : INITIAL_CAMPUS_SERVICES;
  });

  const [library, setLibrary] = useState<LibraryBook[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STATE + '_library');
    return saved ? JSON.parse(saved) : INITIAL_LIBRARY;
  });

  const [research] = useState<ResearchProject[]>(INITIAL_RESEARCH);

  const [compliance, setCompliance] = useState<ComplianceDocument[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STATE + '_compliance');
    return saved ? JSON.parse(saved) : INITIAL_COMPLIANCE_DOCS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AUTH, isAuthenticated ? 'true' : 'false');
    localStorage.setItem(STORAGE_KEYS.PERSONA, currentUser.id);
  }, [isAuthenticated, currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STATE + '_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STATE + '_admissions', JSON.stringify(admissions));
  }, [admissions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STATE + '_attendance', JSON.stringify(attendance));
  }, [attendance]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STATE + '_pharmacy', JSON.stringify(pharmacyItems));
  }, [pharmacyItems]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STATE + '_panchakarma', JSON.stringify(panchakarmaBookings));
  }, [panchakarmaBookings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STATE + '_fees', JSON.stringify(fees));
  }, [fees]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STATE + '_opd', JSON.stringify(opdVisits));
  }, [opdVisits]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STATE + '_ipd', JSON.stringify(ipdAdmissions));
  }, [ipdAdmissions]);

  // Auth Functions
  const login = (username: string, password: string) => {
    if (username.trim().toLowerCase() === 'admin' && password === 'Admin@123') {
      setIsAuthenticated(true);
      setCurrentUser(INITIAL_PERSONAS[0]);
      showToast(`Welcome back, ${INITIAL_PERSONAS[0].name}!`, 'success');
      return { success: true };
    }

    // Also support role names as usernames for convenient demo access
    const matchedPersona = INITIAL_PERSONAS.find(
      (p) => p.username.toLowerCase() === username.trim().toLowerCase()
    );
    if (matchedPersona && password === 'Admin@123') {
      setIsAuthenticated(true);
      setCurrentUser(matchedPersona);
      showToast(`Logged in as ${matchedPersona.name} (${matchedPersona.roleTitle})`, 'success');
      return { success: true };
    }

    return {
      success: false,
      error: 'Invalid credentials. Use demo username: admin and password: Admin@123',
    };
  };

  const loginAsPersona = (personaId: string) => {
    const persona = INITIAL_PERSONAS.find((p) => p.id === personaId) || INITIAL_PERSONAS[0];
    setIsAuthenticated(true);
    setCurrentUser(persona);
    showToast(`Switched persona to: ${persona.name} (${persona.roleTitle})`, 'info');
  };

  const logout = () => {
    setIsAuthenticated(false);
    showToast('Signed out of demo session.', 'info');
  };

  // Mutation Handlers
  const updateAdmissionStatus = (id: string, status: AdmissionApplication['status'], remarks?: string) => {
    setAdmissions((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status, remarks: remarks || app.remarks } : app))
    );
    showToast(`Application ${id} status updated to ${status}.`, 'success');
  };

  const addAdmission = (appData: Partial<AdmissionApplication>) => {
    const newId = `ADM-2026-${String(admissions.length + 1).padStart(3, '0')}`;
    const newApp: AdmissionApplication = {
      id: newId,
      applicantName: appData.applicantName || 'New Applicant',
      neetRollNo: appData.neetRollNo || 'NEET-UG-26-9999',
      neetScore: appData.neetScore || 450,
      program: appData.program || 'BAMS (UG)',
      category: appData.category || 'General',
      submissionDate: new Date().toISOString().split('T')[0],
      status: 'Submitted',
      phone: appData.phone || '+91 98000 00000',
      email: appData.email || 'applicant@mail.com',
      hscPercentage: appData.hscPercentage || 80,
      documentsVerified: false,
      remarks: appData.remarks || 'Application registered via portal.',
    };
    setAdmissions((prev) => [newApp, ...prev]);
    showToast(`New admission application registered: ${newId}`, 'success');
  };

  const addStudent = (studentData: Partial<Student>) => {
    const newId = `std-${students.length + 1}`;
    const rollNo = `BAMS-23-${String(students.length + 1).padStart(3, '0')}`;
    const newStudent: Student = {
      id: newId,
      rollNo,
      name: studentData.name || 'New Student',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      program: studentData.program || 'BAMS (UG)',
      batch: studentData.batch || '2023-28',
      currentSemester: studentData.currentSemester || '2nd Prof',
      attendancePercent: studentData.attendancePercent || 85,
      feeStatus: studentData.feeStatus || 'Paid',
      balanceFee: studentData.balanceFee || 0,
      mentorName: studentData.mentorName || 'Prof. (Dr.) Vasant Vaidya',
      email: studentData.email || 'student@ayustudent.in',
      phone: studentData.phone || '+91 98000 00000',
      bloodGroup: studentData.bloodGroup || 'B+',
      hostelRoom: studentData.hostelRoom || 'Hostel Block A',
      clinicalPostingDept: studentData.clinicalPostingDept || 'Kaya Chikitsa',
    };
    setStudents((prev) => [newStudent, ...prev]);
    showToast(`Enrolled student ${newStudent.name} (Roll: ${rollNo})`, 'success');
  };

  const markAttendance = (recordId: string, status: AttendanceRecord['status']) => {
    setAttendance((prev) =>
      prev.map((rec) => (rec.id === recordId ? { ...rec, status } : rec))
    );
    showToast(`Attendance marked as ${status}.`, 'info');
  };

  const addTimetableEntry = (entry: Partial<TimetableEntry>) => {
    const newId = `tt-${timetable.length + 1}`;
    const newEntry: TimetableEntry = {
      id: newId,
      day: entry.day || 'Monday',
      timeSlot: entry.timeSlot || '09:00 - 10:00 AM',
      subject: entry.subject || 'Ayurveda Samhita',
      facultyId: entry.facultyId || 'fac-1',
      facultyName: entry.facultyName || 'Prof. (Dr.) Vasant Vaidya',
      batch: entry.batch || '2023-28',
      semester: entry.semester || '2nd Prof',
      room: entry.room || 'Lecture Hall 1 (Dhanvantari)',
      type: entry.type || 'Theory',
    };
    setTimetable((prev) => [...prev, newEntry]);
    showToast('New lecture scheduled successfully.', 'success');
  };

  const updateLogbookStatus = (id: string, status: ClinicalLogbookEntry['status'], feedback?: string) => {
    setLogbooks((prev) =>
      prev.map((log) => (log.id === id ? { ...log, status, supervisorFeedback: feedback || log.supervisorFeedback } : log))
    );
    showToast(`Logbook entry updated to: ${status}`, 'success');
  };

  const addLogbookEntry = (entry: Partial<ClinicalLogbookEntry>) => {
    const newId = `log-${logbooks.length + 1}`;
    const newEntry: ClinicalLogbookEntry = {
      id: newId,
      studentId: entry.studentId || 'std-11',
      studentName: entry.studentName || 'Aditya Kulkarni',
      batch: entry.batch || '2022-27',
      postingDepartment: entry.postingDepartment || 'Kaya Chikitsa OPD',
      facultySupervisor: entry.facultySupervisor || 'Prof. (Dr.) Vasant Vaidya',
      caseTitle: entry.caseTitle || 'Clinical Observation Case',
      fictionalPatientRef: entry.fictionalPatientRef || `PT-ANON-${Math.floor(1000 + Math.random() * 9000)}`,
      procedureType: entry.procedureType || 'Rogi Pariksha (Ashtavidha)',
      date: new Date().toISOString().split('T')[0],
      clinicalNotes: entry.clinicalNotes || 'Observation case logged by student.',
      status: 'Pending Review',
    };
    setLogbooks((prev) => [newEntry, ...prev]);
    showToast('Clinical case logged. Submitted to faculty supervisor.', 'success');
  };

  const addPatient = (patData: Partial<Patient>): Patient => {
    const newId = `pat-${patients.length + 1}`;
    const uhid = `AY-HOSP-26-${String(patients.length + 101).padStart(4, '0')}`;
    const newPat: Patient = {
      id: newId,
      uhid,
      name: patData.name || 'New Patient',
      age: patData.age || 45,
      gender: patData.gender || 'Male',
      contact: patData.contact || '+91 99000 00000',
      address: patData.address || 'Sample Address, Kota',
      registrationDate: new Date().toISOString().split('T')[0],
      bloodGroup: patData.bloodGroup || 'B+',
      prakriti: patData.prakriti || 'Vata-Pitta',
      status: 'Active',
      lastVisitDate: new Date().toISOString().split('T')[0],
      totalVisits: 1,
    };
    setPatients((prev) => [newPat, ...prev]);
    showToast(`Patient registered: ${newPat.name} (UHID: ${uhid})`, 'success');
    return newPat;
  };

  const updateOpdStatus = (id: string, queueStatus: OpdVisit['queueStatus']) => {
    setOpdVisits((prev) =>
      prev.map((visit) => (visit.id === id ? { ...visit, queueStatus } : visit))
    );
    showToast(`OPD Queue: Token status updated to ${queueStatus}`, 'info');
  };

  const registerOpdVisit = (visit: Partial<OpdVisit>) => {
    const nextToken = opdVisits.length > 0 ? Math.max(...opdVisits.map((v) => v.tokenNo)) + 1 : 101;
    const newVisit: OpdVisit = {
      id: `opd-${opdVisits.length + 1}`,
      tokenNo: nextToken,
      uhid: visit.uhid || 'AY-HOSP-26-0101',
      patientName: visit.patientName || 'Registered Patient',
      age: visit.age || 50,
      gender: visit.gender || 'Male',
      department: visit.department || 'Kaya Chikitsa (General Medicine)',
      practitionerName: visit.practitionerName || 'Prof. (Dr.) Vasant Vaidya',
      queueStatus: 'Waiting',
      visitTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      chiefComplaint: visit.chiefComplaint || 'Consultation requested',
      illustrativeNotes: visit.illustrativeNotes || 'Initial check-in completed.',
      prescribedMedicines: visit.prescribedMedicines || [],
      recommendedPanchakarma: visit.recommendedPanchakarma,
    };
    setOpdVisits((prev) => [...prev, newVisit]);
    showToast(`OPD Token #${nextToken} generated for ${newVisit.patientName}`, 'success');
  };

  const dischargeIpd = (id: string, summary: string) => {
    setIpdAdmissions((prev) =>
      prev.map((adm) =>
        adm.id === id
          ? {
              ...adm,
              admissionStatus: 'Discharged',
              dischargeSummary: summary || 'Completed treatment course. Discharged in stable condition.',
            }
          : adm
      )
    );
    showToast('IPD Discharge processed. Summary generated.', 'success');
  };

  const admitIpd = (adm: Partial<IpdAdmission>) => {
    const newIpdNo = `IPD-26-${String(ipdAdmissions.length + 41).padStart(4, '0')}`;
    const newAdm: IpdAdmission = {
      id: `ipd-${ipdAdmissions.length + 1}`,
      ipdNo: newIpdNo,
      uhid: adm.uhid || 'AY-HOSP-26-0101',
      patientName: adm.patientName || 'Admitted Patient',
      department: adm.department || 'Kaya Chikitsa',
      doctorInCharge: adm.doctorInCharge || 'Prof. (Dr.) Vasant Vaidya',
      ward: adm.ward || 'Male Ward',
      bedNo: adm.bedNo || 'M-BED-10',
      admissionDate: new Date().toISOString().split('T')[0],
      expectedDischargeDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      admissionStatus: 'Admitted',
      primaryDiagnosis: adm.primaryDiagnosis || 'Acute Vata Vyadhi',
      dailyRoundsNote: adm.dailyRoundsNote || 'Admission vitals monitored.',
    };
    setIpdAdmissions((prev) => [newAdm, ...prev]);
    showToast(`IPD Admission logged: Bed ${newAdm.bedNo} assigned.`, 'success');
  };

  const addPharmacyItem = (itemData: Partial<PharmacyItem>) => {
    const newItem: PharmacyItem = {
      id: `ph-${pharmacyItems.length + 1}`,
      itemCode: itemData.itemCode || `AYU-MED-0${pharmacyItems.length + 1}`,
      name: itemData.name || 'Classical Formulation',
      classicalReference: itemData.classicalReference || 'Sharngadhara Samhita',
      category: itemData.category || 'Churna',
      batchNo: itemData.batchNo || `BATCH-NEW-${Date.now().toString().slice(-4)}`,
      quantity: Number(itemData.quantity) || 50,
      unit: itemData.unit || 'Packets (100g)',
      supplier: itemData.supplier || 'Approved Ayurvedic Pharmacy',
      purchaseCost: Number(itemData.purchaseCost) || 120,
      mrp: Number(itemData.mrp) || 180,
      expiryDate: itemData.expiryDate || '2028-12-31',
      reorderLevel: Number(itemData.reorderLevel) || 30,
      status: 'Adequate',
    };
    setPharmacyItems((prev) => [newItem, ...prev]);
    showToast(`Added ${newItem.name} to pharmacy inventory.`, 'success');
  };

  const dispensePharmacyItem = (itemId: string, qty: number, patientName: string): boolean => {
    const targetItem = pharmacyItems.find((i) => i.id === itemId);
    if (!targetItem || targetItem.quantity < qty) {
      showToast('Insufficient stock for dispensing.', 'error');
      return false;
    }

    setPharmacyItems((prev) =>
      prev.map((i) => {
        if (i.id === itemId) {
          const newQty = i.quantity - qty;
          const status = newQty <= 0 ? 'Expired' : newQty <= i.reorderLevel ? 'Low Stock' : 'Adequate';
          return { ...i, quantity: newQty, status };
        }
        return i;
      })
    );

    const newMovement: StockMovement = {
      id: `sm-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      itemId: targetItem.id,
      itemName: targetItem.name,
      batchNo: targetItem.batchNo,
      type: 'OPD Dispensing',
      quantity: qty,
      unit: targetItem.unit,
      referenceDoc: `DISP-${Date.now().toString().slice(-5)}`,
      patientOrSupplier: patientName,
    };
    setStockMovements((prev) => [newMovement, ...prev]);

    showToast(`Dispensed ${qty} ${targetItem.unit} of ${targetItem.name} to ${patientName}`, 'success');
    return true;
  };

  const bookPanchakarma = (bookingData: Partial<PanchakarmaBooking>) => {
    const newId = `pk-${panchakarmaBookings.length + 1}`;
    const newBooking: PanchakarmaBooking = {
      id: newId,
      bookingCode: `PK-BK-26-${String(panchakarmaBookings.length + 1).padStart(2, '0')}`,
      patientId: bookingData.patientId || 'pat-1',
      patientName: bookingData.patientName || 'Registered Patient',
      fictionalPatientRef: bookingData.fictionalPatientRef || 'PT-ANON-7750',
      therapyType: bookingData.therapyType || 'Abhyanga & Swedana',
      therapistName: bookingData.therapistName || 'Therapist Somnath',
      roomNo: bookingData.roomNo || 'Therapy Suite 1 (Snana)',
      date: bookingData.date || new Date().toISOString().split('T')[0],
      timeSlot: bookingData.timeSlot || '10:00 AM - 11:15 AM',
      consentStatus: 'Signed & Recorded',
      sessionStatus: 'Scheduled',
      consumables: bookingData.consumables || 'Ksheerabala Taila 200ml, Nadi Sweda herbs',
      charges: Number(bookingData.charges) || 1500,
      clinicalReviewStatus: 'Reviewed by Vaidya',
      notes: bookingData.notes || 'Panchakarma session scheduled.',
    };
    setPanchakarmaBookings((prev) => [newBooking, ...prev]);
    showToast(`Panchakarma session booked: ${newBooking.therapyType} for ${newBooking.patientName}`, 'success');
  };

  const updatePanchakarmaStatus = (id: string, status: PanchakarmaBooking['sessionStatus']) => {
    setPanchakarmaBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, sessionStatus: status } : b))
    );
    showToast(`Panchakarma session marked as ${status}.`, 'info');
  };

  const recordFeePayment = (feeId: string, amount: number) => {
    setFees((prev) =>
      prev.map((f) => {
        if (f.id === feeId) {
          const newPaid = f.amountPaid + amount;
          const newBal = Math.max(0, f.totalDue - newPaid);
          const newStatus = newBal === 0 ? 'Paid' : 'Partial';
          const receiptNo = `REC-26-${Math.floor(1000 + Math.random() * 9000)}`;
          return {
            ...f,
            amountPaid: newPaid,
            balanceDue: newBal,
            status: newStatus,
            lastPaymentDate: new Date().toISOString().split('T')[0],
            receiptNo,
          };
        }
        return f;
      })
    );
    showToast(`Payment of ₹${amount.toLocaleString('en-IN')} recorded successfully.`, 'success');
  };

  const updateProcurementStatus = (id: string, status: ProcurementRequest['status']) => {
    setProcurement((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status } : p))
    );
    showToast(`Purchase Request ${id} status: ${status}`, 'info');
  };

  const addProcurementRequest = (req: Partial<ProcurementRequest>) => {
    const newPrNo = `PR-2026-${String(procurement.length + 81).padStart(4, '0')}`;
    const newPr: ProcurementRequest = {
      id: `pr-${procurement.length + 1}`,
      prNumber: newPrNo,
      department: req.department || 'Hospital Administration',
      requestedBy: req.requestedBy || currentUser.name,
      requestDate: new Date().toISOString().split('T')[0],
      itemDescription: req.itemDescription || 'Requisition item',
      category: req.category || 'Medical Supplies & Linen',
      estimatedAmount: Number(req.estimatedAmount) || 25000,
      status: 'Submitted',
      supplierAssigned: req.supplierAssigned,
    };
    setProcurement((prev) => [newPr, ...prev]);
    showToast(`Purchase requisition ${newPrNo} submitted for approval.`, 'success');
  };

  const updateAssetStatus = (id: string, condition: AssetRecord['condition']) => {
    setAssets((prev) =>
      prev.map((a) => (a.id === id ? { ...a, condition } : a))
    );
    showToast(`Asset condition updated to: ${condition}`, 'info');
  };

  const updateCampusTicketStatus = (ticketId: string, status: CampusServiceRequest['status'], notes?: string) => {
    setCampusServices((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status, resolutionNotes: notes || t.resolutionNotes } : t))
    );
    showToast(`Campus service ticket marked as ${status}.`, 'info');
  };

  const addCampusTicket = (ticket: Partial<CampusServiceRequest>) => {
    const nextTicketNo = `TKT-2026-${String(campusServices.length + 41).padStart(3, '0')}`;
    const newTicket: CampusServiceRequest = {
      id: `csr-${campusServices.length + 1}`,
      ticketNo: nextTicketNo,
      category: ticket.category || 'Hostel Room Maintenance',
      requesterName: ticket.requesterName || currentUser.name,
      requesterRole: ticket.requesterRole || 'Student',
      priority: ticket.priority || 'Medium',
      assignedDepartment: ticket.assignedDepartment || 'Hostel Maintenance Wing',
      status: 'Open',
      dateLogged: new Date().toISOString().split('T')[0],
      description: ticket.description || 'Request logged via student portal.',
    };
    setCampusServices((prev) => [newTicket, ...prev]);
    showToast(`Service ticket ${nextTicketNo} logged.`, 'success');
  };

  const issueReturnBook = (bookId: string, action: 'issue' | 'return') => {
    setLibrary((prev) =>
      prev.map((b) => {
        if (b.id === bookId) {
          if (action === 'issue' && b.availableCopies > 0) {
            const avail = b.availableCopies - 1;
            return { ...b, availableCopies: avail, status: avail === 0 ? 'Reserved' : avail <= 2 ? 'Low Copies' : 'Available' };
          } else if (action === 'return' && b.availableCopies < b.totalCopies) {
            const avail = b.availableCopies + 1;
            return { ...b, availableCopies: avail, status: avail <= 2 ? 'Low Copies' : 'Available' };
          }
        }
        return b;
      })
    );
    showToast(`Book circulation record updated (${action === 'issue' ? 'Issued' : 'Returned'}).`, 'success');
  };

  const updateComplianceStatus = (docId: string, status: ComplianceDocument['status']) => {
    setCompliance((prev) =>
      prev.map((d) => (d.id === docId ? { ...d, status } : d))
    );
    showToast(`Institutional document review status updated to: ${status}`, 'info');
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read.', 'info');
  };

  const resetDemoData = () => {
    localStorage.removeItem(STORAGE_KEYS.STATE + '_students');
    localStorage.removeItem(STORAGE_KEYS.STATE + '_admissions');
    localStorage.removeItem(STORAGE_KEYS.STATE + '_attendance');
    localStorage.removeItem(STORAGE_KEYS.STATE + '_timetable');
    localStorage.removeItem(STORAGE_KEYS.STATE + '_logbooks');
    localStorage.removeItem(STORAGE_KEYS.STATE + '_patients');
    localStorage.removeItem(STORAGE_KEYS.STATE + '_opd');
    localStorage.removeItem(STORAGE_KEYS.STATE + '_ipd');
    localStorage.removeItem(STORAGE_KEYS.STATE + '_pharmacy');
    localStorage.removeItem(STORAGE_KEYS.STATE + '_movements');
    localStorage.removeItem(STORAGE_KEYS.STATE + '_panchakarma');
    localStorage.removeItem(STORAGE_KEYS.STATE + '_fees');
    localStorage.removeItem(STORAGE_KEYS.STATE + '_procurement');
    localStorage.removeItem(STORAGE_KEYS.STATE + '_assets');
    localStorage.removeItem(STORAGE_KEYS.STATE + '_campus');
    localStorage.removeItem(STORAGE_KEYS.STATE + '_library');
    localStorage.removeItem(STORAGE_KEYS.STATE + '_compliance');

    setStudents(INITIAL_STUDENTS);
    setAdmissions(INITIAL_ADMISSIONS);
    setAttendance(INITIAL_ATTENDANCE);
    setTimetable(INITIAL_TIMETABLE);
    setLogbooks(INITIAL_LOGBOOKS);
    setPatients(INITIAL_PATIENTS);
    setOpdVisits(INITIAL_OPD);
    setIpdAdmissions(INITIAL_IPD);
    setPharmacyItems(INITIAL_PHARMACY);
    setStockMovements(INITIAL_STOCK_MOVEMENTS);
    setPanchakarmaBookings(INITIAL_PANCHAKARMA);
    setFees(INITIAL_FEES);
    setProcurement(INITIAL_PROCUREMENT);
    setAssets(INITIAL_ASSETS);
    setCampusServices(INITIAL_CAMPUS_SERVICES);
    setLibrary(INITIAL_LIBRARY);
    setCompliance(INITIAL_COMPLIANCE_DOCS);
    setNotifications(INITIAL_NOTIFICATIONS);

    showToast('Demo sample data restored to initial factory state.', 'info');
  };

  return (
    <DemoContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        login,
        loginAsPersona,
        logout,
        personas: INITIAL_PERSONAS,
        students,
        faculty,
        admissions,
        attendance,
        timetable,
        exams,
        results,
        logbooks,
        patients,
        opdVisits,
        ipdAdmissions,
        pharmacyItems,
        stockMovements,
        panchakarmaBookings,
        fees,
        procurement,
        assets,
        campusServices,
        library,
        research,
        compliance,
        notifications,
        updateAdmissionStatus,
        addAdmission,
        addStudent,
        markAttendance,
        addTimetableEntry,
        updateLogbookStatus,
        addLogbookEntry,
        addPatient,
        updateOpdStatus,
        registerOpdVisit,
        dischargeIpd,
        admitIpd,
        addPharmacyItem,
        dispensePharmacyItem,
        bookPanchakarma,
        updatePanchakarmaStatus,
        recordFeePayment,
        updateProcurementStatus,
        addProcurementRequest,
        updateAssetStatus,
        updateCampusTicketStatus,
        addCampusTicket,
        issueReturnBook,
        updateComplianceStatus,
        markNotificationRead,
        markAllNotificationsRead,
        resetDemoData,
        toasts,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
};
