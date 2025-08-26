import {getSupabaseDataClient} from "$lib/utils/getSupabaseDataClient";
import {timestamptzToISOtz} from "$lib/timestamptzToISOtz";
import {PUBLIC_DEV} from "$lib";

export async function GET() {
    const supabase = getSupabaseDataClient();

    const {data: lastCardDate, error: selerror} = await supabase
        .from('nifties')
        .select('created_at')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

    if (selerror || !lastCardDate) {
        if (PUBLIC_DEV) console.error(selerror);
        return new Response('Had a skill issue getting last card\'s creation date.', {status: 500});
    }

    return new Response(
        `
		<?xml version="1.0" encoding="UTF-8" ?>
		<urlset
			xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
		>
            <url>
            <loc>https://www.ohthatsuseful.com</loc>
            <changefreq>monthly</changefreq>    
            <priority>1.0</priority>
            <lastmod>${timestamptzToISOtz(lastCardDate.created_at)}</lastmod>
            </url>            
            <url>
            <loc>https://www.ohthatsuseful.com/contact</loc>
            <changefreq>monthly</changefreq>    
            <priority>0.5</priority>
            </url>
		</urlset>`.trim(),
        {
            headers: {
                'Content-Type': 'application/xml'
            }
        }
    );
}