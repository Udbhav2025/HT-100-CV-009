# Smart Classroom Attendance System - Frontend Prompt for Lovable

## Project Overview
Build a modern, responsive web application for an AI-powered classroom attendance system with real-time face recognition and anti-spoofing detection.

## Core Features

### 1. Live Monitoring Dashboard (Main View)
**Layout:**
- Split screen: 70% live camera feed, 30% alerts panel
- Camera feed shows real-time video with bounding boxes around detected faces
- Each face has a label showing: Name, Status (✅ Verified / 🚨 Suspicious / ⚠️ Challenge Pending)
- Color-coded boxes: Green (verified), Red (suspicious), Orange (challenge pending)

**Alerts Panel:**
- Real-time suspicious activity alerts
- Challenge prompts for students (e.g., "John Doe: Please turn your head left and right")
- Quick stats cards: Present count, Suspicious count, Total registered

**Controls:**
- Start/Stop monitoring buttons
- Save attendance report button
- Settings icon

### 2. Attendance Dashboard Tab
**Features:**
- Data table showing current session attendance
- Columns: Student ID, Name, Photo thumbnail, Entry Time, Exit Time, Status, Behavior Score
- Filter options: Present/Absent, Suspicious only
- Search bar to find specific students
- Export to CSV button
- Date picker to view historical attendance

**Visual Elements:**
- Status badges with icons (🟢 Present, 🔴 Left, ⚠️ Suspicious)
- Progress bar showing attendance percentage
- Time duration calculator (how long each student was present)

### 3. Suspicious Activity Log Tab
**Features:**
- Timeline view of all suspicious activities
- Each entry shows: Timestamp, Student name/photo, Activity type, Description, Status (Resolved/Pending)
- Action buttons: "Resolve", "View Details", "Send Challenge"
- Filter by date range and resolution status

### 4. Student Management Tab
**Features:**
- Grid/List view of all registered students
- Each card shows: Photo, Name, Student ID, Email, Phone, Total photos
- "Add Student" button (opens modal)
- Edit/Delete actions for each student
- View all photos for a student (gallery view)

**Add Student Modal:**
- Form fields: Student ID, Name, Email, Phone
- Photo upload section with drag-and-drop
- Photo type selector: Front, Left, Right, With Glasses, Without Glasses
- Multiple photo upload support
- Preview uploaded photos before saving

### 5. Analytics/Reports Tab
**Features:**
- Date range selector
- Statistics cards:
  - Total attendance rate (%)
  - Average class duration
  - Most punctual students
  - Suspicious activity count
- Charts:
  - Line chart: Daily attendance trend
  - Bar chart: Student attendance comparison
  - Pie chart: Status distribution (Present/Absent/Suspicious)
- Export detailed report button

### 6. Settings Tab
**Configuration Options:**
- Suspicion threshold slider (5-20)
- Recognition interval slider (10-60 frames)
- Challenge timeout slider (5-30 seconds)
- Absence timeout slider (5-30 seconds)
- Camera selection dropdown
- Notification preferences (email/SMS alerts)
- System status indicators (Camera, Database, AI Model)

## Design Requirements

### Color Scheme
- Primary: Modern blue (#4F46E5 or similar)
- Success: Green (#10B981)
- Warning: Orange (#F59E0B)
- Danger: Red (#EF4444)
- Background: Light gray (#F9FAFB) or dark mode option
- Cards: White with subtle shadows

### Typography
- Headings: Bold, modern sans-serif (Inter, Poppins, or similar)
- Body: Clean, readable font
- Monospace for IDs and timestamps

### UI Components
- Modern card-based layout
- Smooth animations and transitions
- Loading states with skeleton screens
- Toast notifications for actions
- Confirmation modals for destructive actions
- Responsive design (mobile, tablet, desktop)

### Icons
Use modern icon library (Lucide, Heroicons, or similar):
- 📹 Camera
- 👥 Students
- 🚨 Alerts
- 📊 Analytics
- ⚙️ Settings
- ✅ Verified
- ⚠️ Warning
- 🔴 Danger

## Technical Specifications

### Pages/Routes
```
/ (or /dashboard) - Live Monitoring
/attendance - Attendance Dashboard
/suspicious - Suspicious Activity Log
/students - Student Management
/analytics - Reports & Analytics
/settings - System Settings
```

### API Endpoints (Backend Integration)

**Base URL:** `http://localhost:8000`

**Authentication:**
```
POST   /api/auth/register               - Register new user (admin only)
POST   /api/auth/login                  - Login and get JWT token
GET    /api/auth/me                     - Get current user info
GET    /api/auth/users                  - Get all users (admin only)
```

**Students:**
```
GET    /api/students                    - Get all students (requires auth)
GET    /api/students/{student_id}       - Get student details (requires auth)
POST   /api/students                    - Create new student (requires teacher role)
PUT    /api/students/{student_id}       - Update student (requires teacher role)
DELETE /api/students/{student_id}       - Delete student (requires teacher role)
```

**Photos:**
```
POST   /api/students/{student_id}/photos - Upload photo (multipart/form-data)
GET    /api/students/{student_id}/photos - Get student photos
DELETE /api/photos/{photo_id}            - Delete photo
```

**Attendance:**
```
GET  /api/attendance/today                                    - Get today's attendance
GET  /api/attendance/date/{date}                              - Get attendance by date (YYYY-MM-DD)
GET  /api/attendance/range?start_date=YYYY-MM-DD&end_date=... - Get attendance range
GET  /api/attendance/student/{student_id}                     - Get student attendance history
POST /api/attendance/entry                                    - Mark entry
POST /api/attendance/exit                                     - Mark exit
PUT  /api/attendance/suspicion                                - Update suspicion score
```

**Suspicious Activity:**
```
GET  /api/suspicious?resolved=false&limit=50 - Get suspicious activities
POST /api/suspicious/resolve                 - Resolve activity
```

**Statistics:**
```
GET /api/stats                        - Get overall statistics
GET /api/stats/student/{student_id}   - Get student statistics
```

**Camera/Monitoring:**
```
GET  /api/camera/status  - Get camera status
POST /api/camera/start   - Start monitoring
POST /api/camera/stop    - Stop monitoring
WS   /ws/camera          - WebSocket for real-time feed
```

### Authentication & State Management
- JWT token-based authentication
- Store token in localStorage/sessionStorage
- Include `Authorization: Bearer TOKEN` in all API requests
- Handle 401 errors by redirecting to login
- Real-time updates for camera feed and attendance
- WebSocket connection for live data
- Local state for forms and UI interactions
- Global state for user session and settings

### Key Interactions

1. **Live Monitoring:**
   - Auto-refresh camera feed (30 FPS)
   - Real-time face detection overlay
   - Instant alert notifications
   - Sound alert option for suspicious activity

2. **Student Management:**
   - Drag-and-drop photo upload
   - Bulk import option
   - Photo gallery with zoom
   - Quick edit inline

3. **Attendance:**
   - Click row to see detailed view
   - Export filtered results
   - Print-friendly view
   - Email report option

4. **Responsive Behavior:**
   - Mobile: Stack layout, hamburger menu
   - Tablet: Adaptive grid
   - Desktop: Full split-screen layout

## Special Features

### Real-time Notifications
- Browser notifications for suspicious activity
- In-app toast messages
- Sound alerts (optional)
- Email/SMS integration (future)

### Dark Mode
- Toggle in settings
- Persistent preference
- Smooth transition

### Accessibility
- ARIA labels
- Keyboard navigation
- Screen reader support
- High contrast mode option

### Performance
- Lazy loading for images
- Virtual scrolling for large lists
- Optimized camera feed rendering
- Debounced search inputs

## Sample Data Structure

### Student Object
```json
{
  "student_id": "STU001",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "photos": [
    {
      "photo_id": 1,
      "photo_path": "/photos/students/STU001/front.jpg",
      "photo_type": "front",
      "description": "Front facing photo"
    }
  ],
  "created_at": "2024-01-15T10:30:00Z"
}
```

### Attendance Record
```json
{
  "attendance_id": 1,
  "student_id": "STU001",
  "name": "John Doe",
  "date": "2024-01-20",
  "entry_time": "2024-01-20T09:00:00Z",
  "exit_time": "2024-01-20T11:30:00Z",
  "status": "present",
  "suspicion_score": 0.2,
  "notes": null
}
```

### Suspicious Activity
```json
{
  "activity_id": 1,
  "student_id": "STU001",
  "name": "John Doe",
  "timestamp": "2024-01-20T09:15:00Z",
  "activity_type": "static_behavior",
  "description": "No movement detected for 30 seconds",
  "resolved": false
}
```

## Priority Features (MVP)
1. Live monitoring with camera feed
2. Student list and basic management
3. Today's attendance view
4. Suspicious activity alerts
5. Basic settings

## Future Enhancements
- Multi-camera support
- Attention tracking (looking at board)
- Behavior analytics
- Integration with LMS
- Mobile app
- Advanced reporting

## Design Inspiration
- Modern SaaS dashboards (Linear, Vercel, Stripe)
- Security monitoring systems
- School management systems
- Clean, professional, easy to use

Build this as a modern, production-ready web application with smooth animations, intuitive UX, and real-time capabilities.
