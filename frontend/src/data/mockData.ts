import { Package, Booking, Review, Employee, Activity, User } from '../types';

export const mockPackages: Package[] = [
  {
    id: '1',
    name: 'Classic Haircut & Style',
    description: 'Professional haircut with styling and finish',
    price: 45,
    duration: 60,
    category: 'Hair Care',
    image: 'https://images.pexels.com/photos/3992876/pexels-photo-3992876.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    features: ['Consultation', 'Wash & Cut', 'Styling', 'Finishing']
  },
  {
    id: '2',
    name: 'Luxury Facial Treatment',
    description: 'Deep cleansing facial with premium products',
    price: 85,
    duration: 90,
    category: 'Facial Care',
    image: 'https://images.pexels.com/photos/3985357/pexels-photo-3985357.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    features: ['Deep Cleansing', 'Exfoliation', 'Mask Treatment', 'Moisturizing']
  },
  {
    id: '3',
    name: 'Nail Art & Manicure',
    description: 'Complete nail care with artistic designs',
    price: 35,
    duration: 75,
    category: 'Nail Care',
    image: 'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    features: ['Nail Shaping', 'Cuticle Care', 'Polish Application', 'Art Design']
  },
  {
    id: '4',
    name: 'Full Body Massage',
    description: 'Relaxing full body massage therapy',
    price: 120,
    duration: 120,
    category: 'Wellness',
    image: 'https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    features: ['Swedish Massage', 'Aromatherapy', 'Hot Stones', 'Relaxation']
  },
  {
    id: '5',
    name: 'Hair Color & Highlights',
    description: 'Professional hair coloring with highlights',
    price: 95,
    duration: 180,
    category: 'Hair Care',
    image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    features: ['Color Consultation', 'Root Touch-up', 'Highlights', 'Toning']
  },
  {
    id: '6',
    name: 'Eyebrow & Lash Care',
    description: 'Complete eyebrow shaping and lash enhancement',
    price: 55,
    duration: 45,
    category: 'Beauty',
    image: 'https://images.pexels.com/photos/5069432/pexels-photo-5069432.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    features: ['Brow Shaping', 'Tinting', 'Lash Lift', 'Aftercare']
  }
];

export const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@salon.com',
    phone: '+1234567890',
    role: 'admin',
    password: 'admin123',
    activityStatus: 'good',
    joinDate: '2023-01-01',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  {
    id: '2',
    name: 'Head Employee',
    email: 'head@salon.com',
    phone: '+1234567891',
    role: 'head_employee',
    password: 'head123',
    activityStatus: 'good',
    joinDate: '2023-02-01',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  {
    id: '3',
    name: 'Employee One',
    email: 'employee@salon.com',
    phone: '+1234567892',
    role: 'employee',
    password: 'emp123',
    activityStatus: 'good',
    joinDate: '2023-03-01',
    avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  {
    id: '4',
    name: 'John Customer',
    email: 'user@example.com',
    phone: '+1234567893',
    role: 'user',
    password: 'user123',
    activityStatus: 'good',
    joinDate: '2023-04-01',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  {
    id: '5',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    phone: '+1234567894',
    role: 'user',
    password: 'user123',
    activityStatus: 'neutral',
    joinDate: '2023-05-01',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  {
    id: '6',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '+1234567895',
    role: 'user',
    password: 'user123',
    activityStatus: 'bad',
    joinDate: '2023-06-01',
    avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  }
];

export const mockBookings: Booking[] = [
  {
    id: '1',
    userId: '4',
    packageId: '1',
    employeeId: '3',
    date: '2024-01-15',
    time: '10:00',
    status: 'completed',
    contactMethod: 'whatsapp',
    contactInfo: '+1234567893',
    paymentStatus: 'paid',
    paymentMethod: 'cash',
    notes: 'Customer was satisfied',
    createdAt: '2024-01-10'
  },
  {
    id: '2',
    userId: '4',
    packageId: '2',
    date: '2024-01-20',
    time: '14:00',
    status: 'approved',
    contactMethod: 'email',
    contactInfo: 'user@example.com',
    paymentStatus: 'pending',
    createdAt: '2024-01-18'
  },
  {
    id: '3',
    userId: '4',
    packageId: '3',
    date: '2024-01-25',
    time: '16:00',
    status: 'pending',
    contactMethod: 'whatsapp',
    contactInfo: '+1234567893',
    paymentStatus: 'pending',
    createdAt: '2024-01-22'
  },
  {
    id: '4',
    userId: '5',
    packageId: '4',
    employeeId: '2',
    date: '2024-01-12',
    time: '11:00',
    status: 'completed',
    contactMethod: 'email',
    contactInfo: 'sarah@example.com',
    paymentStatus: 'paid',
    paymentMethod: 'bank',
    notes: 'Excellent service',
    createdAt: '2024-01-08'
  },
  {
    id: '5',
    userId: '6',
    packageId: '1',
    date: '2024-01-18',
    time: '15:00',
    status: 'no_show',
    contactMethod: 'whatsapp',
    contactInfo: '+1234567895',
    paymentStatus: 'pending',
    notes: 'Customer did not arrive',
    createdAt: '2024-01-15'
  },
  {
    id: '6',
    userId: '5',
    packageId: '5',
    date: '2024-01-28',
    time: '13:00',
    status: 'pending',
    contactMethod: 'email',
    contactInfo: 'sarah@example.com',
    paymentStatus: 'pending',
    createdAt: '2024-01-25'
  }
];

export const mockReviews: Review[] = [
  {
    id: '1',
    userId: '4',
    packageId: '1',
    rating: 5,
    comment: 'Excellent service! The haircut was exactly what I wanted.',
    createdAt: '2024-01-16'
  },
  {
    id: '2',
    userId: '4',
    packageId: '2',
    rating: 4,
    comment: 'Great facial treatment, very relaxing and professional.',
    createdAt: '2024-01-21'
  },
  {
    id: '3',
    userId: '5',
    packageId: '4',
    rating: 5,
    comment: 'Amazing massage! I felt so relaxed afterwards.',
    createdAt: '2024-01-13'
  }
];

export const mockEmployees: Employee[] = [
  {
    id: '2',
    name: 'Head Employee',
    email: 'head@salon.com',
    phone: '+1234567891',
    role: 'head_employee',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    skills: ['Hair Cutting', 'Coloring', 'Facial Treatments', 'Management'],
    attendance: [],
    totalEarnings: 3200
  },
  {
    id: '3',
    name: 'Employee One',
    email: 'employee@salon.com',
    phone: '+1234567892',
    role: 'employee',
    avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    skills: ['Hair Cutting', 'Styling', 'Nail Care'],
    attendance: [],
    totalEarnings: 2100
  }
];

export const mockActivities: Activity[] = [
  {
    id: '1',
    userId: '4',
    type: 'booking',
    description: 'Booked Classic Haircut & Style',
    date: '2024-01-10',
    status: 'positive'
  },
  {
    id: '2',
    userId: '4',
    type: 'payment',
    description: 'Completed payment for haircut service',
    date: '2024-01-15',
    status: 'positive'
  },
  {
    id: '3',
    userId: '4',
    type: 'review',
    description: 'Left 5-star review for haircut service',
    date: '2024-01-16',
    status: 'positive'
  },
  {
    id: '4',
    userId: '5',
    type: 'booking',
    description: 'Booked Full Body Massage',
    date: '2024-01-08',
    status: 'positive'
  },
  {
    id: '5',
    userId: '5',
    type: 'payment',
    description: 'Completed payment via bank transfer',
    date: '2024-01-12',
    status: 'positive'
  },
  {
    id: '6',
    userId: '6',
    type: 'no_show',
    description: 'Did not arrive for scheduled appointment',
    date: '2024-01-18',
    status: 'negative'
  }
];