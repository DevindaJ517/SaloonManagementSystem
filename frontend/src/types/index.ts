export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'admin' | 'head_employee' | 'employee';
  avatar?: string;
  activityStatus: 'good' | 'bad' | 'neutral';
  joinDate: string;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  category: string;
  image: string;
  features: string[];
}

export interface Booking {
  id: string;
  userId: string;
  packageId: string;
  employeeId?: string;
  date: string;
  time: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'no_show';
  contactMethod: 'whatsapp' | 'email';
  contactInfo: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentMethod?: 'cash' | 'bank';
  notes?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  userId: string;
  packageId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'head_employee' | 'employee';
  avatar?: string;
  skills: string[];
  attendance: AttendanceRecord[];
  totalEarnings: number;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  checkIn?: string;
  checkOut?: string;
}

export interface Activity {
  id: string;
  userId: string;
  type: 'booking' | 'review' | 'payment' | 'no_show';
  description: string;
  date: string;
  status: 'positive' | 'negative' | 'neutral';
}