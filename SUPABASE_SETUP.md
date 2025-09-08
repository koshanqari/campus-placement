# Supabase Integration Setup Guide

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login and create a new project
3. Choose a region close to your users (Asia Pacific for India)
4. Wait for the project to be created

## Step 2: Get Project Credentials

1. Go to your project dashboard
2. Navigate to **Settings** → **API**
3. Copy the following:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **anon public** key (starts with `eyJ...`)

## Step 3: Update Configuration

1. Open `script-supabase.js`
2. Replace the placeholder values:
   ```javascript
   const SUPABASE_URL = 'YOUR_SUPABASE_PROJECT_URL';
   const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
   ```
3. With your actual credentials:
   ```javascript
   const SUPABASE_URL = 'https://your-project-id.supabase.co';
   const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   ```

## Step 4: Create Database Table

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Run this SQL query:

```sql
-- Create the attendance_ppt table
CREATE TABLE attendance_ppt (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    questions TEXT,
    college TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create unique index on phone to prevent duplicates
CREATE UNIQUE INDEX idx_attendance_ppt_phone ON attendance_ppt(phone);

-- Enable Row Level Security
ALTER TABLE attendance_ppt ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public inserts
CREATE POLICY "Allow public inserts" ON attendance_ppt
    FOR INSERT WITH CHECK (true);
```

## Step 5: Test the Integration

1. Open `index.html` in your browser
2. Fill out the form with test data
3. Submit the form
4. Check your Supabase dashboard → **Table Editor** → `attendance_ppt` to see the data

## Step 6: Security (Optional but Recommended)

For production, consider adding more restrictive RLS policies:

```sql
-- More secure policy (adjust as needed)
DROP POLICY "Allow public inserts" ON attendance_ppt;

CREATE POLICY "Allow authenticated inserts" ON attendance_ppt
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');
```

## Troubleshooting

### Common Issues:

1. **CORS Error**: Make sure your domain is added to Supabase allowed origins
2. **Duplicate Phone Error**: This is expected behavior - the form prevents duplicate phone number registrations
3. **Network Error**: Check your internet connection and Supabase project status

### Testing:

- Use different phone numbers for testing
- Check browser console for error messages
- Verify data appears in Supabase table editor

## Database Schema

| Column Name | Type        | Constraints                   |
|-------------|-------------|-------------------------------|
| id          | UUID        | Primary Key, auto-generated   |
| name        | text        | not null                      |
| email       | text        | not null                      |
| phone       | text        | not null, unique              |
| questions   | text        | nullable                      |
| college     | text        | nullable                      |
| created_at  | timestamptz | default now()                 |

## Features Implemented

✅ **Form Validation**: Client-side validation for all fields
✅ **Duplicate Prevention**: Phone number uniqueness constraint
✅ **Error Handling**: User-friendly error messages
✅ **Success Feedback**: Confirmation message on successful submission
✅ **Loading States**: Visual feedback during submission
✅ **Data Security**: Row Level Security enabled
✅ **Hardcoded College**: Automatically sets college to 'NIT Srinagar'
