import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      return NextResponse.json({ success: false, error: 'Failed to fetch URL' }, { status: 500 });
    }

    const html = await res.text();
    const $ = cheerio.load(html);

    // Extract text from all <p> tags
    const paragraphs = $('p').map((_, el) => $(el).text()).get();
    const fullText = paragraphs.join(' ');

    if (!fullText.trim()) {
      return NextResponse.json({ success: false, error: 'No content found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, fullText });
  } catch (err) {
    console.error('Scraping Error:', err);
    return NextResponse.json({ success: false, error: 'Scraping failed' }, { status: 500 });
  }
}
