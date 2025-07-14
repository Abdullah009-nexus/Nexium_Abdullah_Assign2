import axios from 'axios';
import * as cheerio from 'cheerio';

export async function scrapeBlog(url: string): Promise<string> {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    let text = '';
    $('p').each((_, el) => {
      text += $(el).text() + '\n';
    });

    return text.trim();
  } catch (err) {
    console.error('Error scraping blog:', err);
    return '';
  }
}
