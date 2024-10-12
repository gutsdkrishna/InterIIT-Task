// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ojarldoudzxbivbinjav.supabase.co'; // Replace with your Supabase URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qYXJsZG91ZHp4Yml2YmluamF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg2NzYxMzcsImV4cCI6MjA0NDI1MjEzN30.zD2O9i2IJvOGb-KkxJkYZeciI6rhPm2CrQ6c3zREzJ0'; // Replace with your Supabase anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
