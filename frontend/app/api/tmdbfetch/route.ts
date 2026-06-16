import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: "Missing TMDB ID" }, { status: 400 });
  }

  try {
    const TMDB_API_KEY = process.env.TMDB_API_KEY;
    
    // URL ya kupata maelezo ya muvi kutoka TMDB
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`;
    const res = await fetch(url);
    
    if (!res.ok) {
      return NextResponse.json({ error: "Movie haijapatikana" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}