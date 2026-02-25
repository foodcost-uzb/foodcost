import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import { verifyAdmin } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const admin = await verifyAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const source = searchParams.get('source');
  const search = searchParams.get('search');

  const supabase = getSupabaseAdmin();
  let query = supabase.from('leads').select('*').order('created_at', { ascending: false });

  if (status && status !== 'all') query = query.eq('status', status);
  if (source && source !== 'all') query = query.eq('source', source);
  if (search) {
    const s = search.replace(/[%_,()]/g, '');
    query = query.or(`name.ilike.%${s}%,phone.ilike.%${s}%,email.ilike.%${s}%`);
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, phone, email, message, source, utm } = body;

  if (!name || !phone) {
    return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 });
  }

  // Input length validation
  if (name.length > 200 || phone.length > 30 || (email && email.length > 200) || (message && message.length > 2000)) {
    return NextResponse.json({ error: 'Input too long' }, { status: 400 });
  }

  const allowedSources = ['form', 'callback', 'calculator'];
  const safeSource = allowedSources.includes(source) ? source : 'form';

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('leads')
    .insert({ name, phone, email: email || null, message: message || null, source: safeSource, utm_data: utm || null })
    .select()
    .single();

  if (error) return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 });

  // Send Telegram notification (non-blocking)
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (botToken && chatId) {
    const sourceLabel = safeSource === 'callback' ? 'Обратный звонок' : safeSource === 'calculator' ? 'Калькулятор' : 'Форма';
    const esc = (s: string) => s.replace(/[<>&]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c] || c));
    const text = [
      `📩 <b>Новая заявка с сайта</b>`,
      ``,
      `👤 <b>Имя:</b> ${esc(name)}`,
      `📞 <b>Телефон:</b> ${esc(phone)}`,
      email ? `📧 <b>Email:</b> ${esc(email)}` : null,
      message ? `💬 <b>Сообщение:</b> ${esc(message)}` : null,
      `📋 <b>Источник:</b> ${sourceLabel}`,
    ].filter(Boolean).join('\n');

    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
    }).catch(() => {});
  }

  return NextResponse.json(data, { status: 201 });
}
