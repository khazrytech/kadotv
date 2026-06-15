import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: "Missing TMDB ID" }, { status: 400 });
  }

  try {
    const TMDB_API_KEY = process.env.TMDB_API_KEY; 
    
    const res = await fetch(\https://api.themoviedb.org/3/movie/\?api_key=\&language=en-US\);
    
    if (!res.ok) {
      return NextResponse.json({ error: "Movie haijapatikana" }, { status: 404 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
