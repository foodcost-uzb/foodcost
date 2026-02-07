import { NextRequest, NextResponse } from 'next/server';
import { verifyAdmin } from '@/lib/auth';
import { getSupabaseAdmin } from '@/lib/supabase/server';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
const MAX_SIZE = 4 * 1024 * 1024; // 4 MB
const ALLOWED_FOLDERS = ['cases', 'testimonials', 'general'];

export async function POST(request: NextRequest) {
  const admin = await verifyAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folder = formData.get('folder') as string | null;

    if (!file) {
      return NextResponse.json({ error: 'Файл не выбран' }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Допустимые форматы: JPEG, PNG, WebP, AVIF' },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'Максимальный размер файла — 4 МБ' },
        { status: 400 }
      );
    }

    const safeFolder = folder && ALLOWED_FOLDERS.includes(folder) ? folder : 'general';
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const filename = `${timestamp}-${random}.${ext}`;
    const path = `${safeFolder}/${filename}`;

    const buffer = await file.arrayBuffer();

    const supabase = getSupabaseAdmin();
    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(path, buffer, {
        contentType: file.type,
        cacheControl: '31536000',
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return NextResponse.json(
        { error: 'Ошибка загрузки файла' },
        { status: 500 }
      );
    }

    const { data: urlData } = supabase.storage
      .from('images')
      .getPublicUrl(path);

    return NextResponse.json({ url: urlData.publicUrl });
  } catch (err) {
    console.error('Upload error:', err);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}
