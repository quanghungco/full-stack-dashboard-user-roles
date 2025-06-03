import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { identifier } = await req.json();
    
    // Check if user exists
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id')
      .or(`email.eq.${identifier},phone.eq.${identifier}`)
      .single();

    if (userError || !user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Generate OTP
    const otp = Math.random().toString().substr(2, 6);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Save OTP
    const { error: otpError } = await supabase
      .from('otp_codes')
      .insert({
        user_id: user.id,
        code: otp,
        expires_at: expiresAt.toISOString(),
      });

    if (otpError) {
      throw otpError;
    }

    // TODO: Send OTP via email or SMS
    console.log('OTP:', otp); // For development only

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send verification code' },
      { status: 500 }
    );
  }
}