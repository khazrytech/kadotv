// ─── Hero Carousel ────────────────────────────────────────────────────────────
export const heroData = [
  {
    id: 'dark-knight',
    title: 'The Dark Knight',
    tag: 'Action Movie',
    description: "Christopher Nolan's iconic masterpiece — now streaming in 4K Dolby Vision.",
    image: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=1920&q=80',
  },
  {
    id: 'dune2',
    title: 'Dune: Part Two',
    tag: 'Action Sci-Fi',
    description: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators.',
    image: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=1920&q=80',
  },
  {
    id: 'gladiator',
    title: 'Gladiator II',
    tag: 'Epic Action',
    description: 'A former Roman General sets out to exact vengeance against the corrupt emperor.',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&q=80',
  },
  {
    id: 'inception',
    title: 'Inception',
    tag: 'Action Thriller',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology.',
    image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=1920&q=80',
  },
  {
    id: 'oppenheimer',
    title: 'Oppenheimer',
    tag: 'Action Drama',
    description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&q=80',
  },
  {
    id: 'avatar',
    title: 'Avatar: The Way of Water',
    tag: 'Sci-Fi Epic',
    description: 'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora.',
    image: 'https://images.unsplash.com/photo-1610296669228-602fa827fc1f?w=1920&q=80',
  },
];

// ─── Section Cards (Homepage) ─────────────────────────────────────────────────
export const sectionCards = [
  {
    title: 'Blockbuster Movies',
    category: 'Movies',
    copy: 'Thousands of titles from action thrillers to Oscar-winning dramas. New releases every week.',
    tags: ['Action', 'Drama', '4K HDR', 'Dolby Atmos'],
  },
  {
    title: 'Live Sports Arena',
    category: 'Sports',
    copy: 'Football, Basketball, Tennis, MMA and more — live as they happen, no delay.',
    tags: ['Football', 'NBA', 'Tennis', 'MMA', 'F1'],
  },
  {
    title: 'Premium Series',
    category: 'Series',
    copy: 'Binge award-winning originals and international series with new episodes weekly.',
    tags: ['Drama', 'Sci-Fi', 'Crime', 'Comedy'],
  },
];

// ─── Movies ───────────────────────────────────────────────────────────────────
export const movies = [
  { id: 'dark-knight', title: 'The Dark Knight', genre: 'Action', year: 2008, rating: 9.0, duration: '2h 32m', image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&q=80', description: 'When the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.', featured: true },
  { id: 'interstellar', title: 'Interstellar', genre: 'Sci-Fi', year: 2014, rating: 8.6, duration: '2h 49m', image: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=600&q=80', description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.", featured: true },
  { id: 'inception', title: 'Inception', genre: 'Thriller', year: 2010, rating: 8.8, duration: '2h 28m', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&q=80', description: 'A thief who steals corporate secrets through the use of dream-sharing technology.', featured: false },
  { id: 'parasite', title: 'Parasite', genre: 'Drama', year: 2019, rating: 8.5, duration: '2h 12m', image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&q=80', description: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family.', featured: false },
  { id: 'oppenheimer', title: 'Oppenheimer', genre: 'Drama', year: 2023, rating: 8.9, duration: '3h 0m', image: 'https://images.unsplash.com/photo-1559393619-6d82f0f12fbc?w=600&q=80', description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.', featured: true },
  { id: 'gladiator', title: 'Gladiator', genre: 'Action', year: 2000, rating: 8.5, duration: '2h 35m', image: 'https://images.unsplash.com/photo-1605806616949-1e87b487fc2f?w=600&q=80', description: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family.', featured: false },
  { id: 'avatar', title: 'Avatar: The Way of Water', genre: 'Sci-Fi', year: 2022, rating: 7.6, duration: '3h 12m', image: 'https://images.unsplash.com/photo-1610296669228-602fa827fc1f?w=600&q=80', description: 'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora.', featured: false },
  { id: 'dune2', title: 'Dune: Part Two', genre: 'Sci-Fi', year: 2024, rating: 8.7, duration: '2h 46m', image: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=600&q=80', description: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators.', featured: true },
];

// ─── Series ───────────────────────────────────────────────────────────────────
export const series = [
  { id: 'breaking-bad', title: 'Breaking Bad', genre: 'Crime', seasons: 5, episodes: 62, rating: 9.5, image: 'https://images.unsplash.com/photo-1605106702734-205df224ecce?w=600&q=80', description: 'A chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing meth with a former student.', featured: true, newEpisode: false },
  { id: 'house-of-dragon', title: 'House of the Dragon', genre: 'Fantasy', seasons: 2, episodes: 18, rating: 8.4, image: 'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?w=600&q=80', description: 'The prequel to Game of Thrones, set 200 years before the events of that series.', featured: true, newEpisode: true },
  { id: 'the-boys', title: 'The Boys', genre: 'Action', seasons: 4, episodes: 40, rating: 8.7, image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80', description: 'A group of vigilantes set out to take down corrupt superheroes who abuse their superpowers.', featured: false, newEpisode: true },
  { id: 'stranger-things', title: 'Stranger Things', genre: 'Sci-Fi', seasons: 5, episodes: 42, rating: 8.7, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80', description: 'When a young boy disappears, his mother and friends uncover a series of extraordinary mysteries.', featured: false, newEpisode: false },
  { id: 'succession', title: 'Succession', genre: 'Drama', seasons: 4, episodes: 39, rating: 8.8, image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=80', description: 'The Roy family controls one of the biggest media and entertainment conglomerates in the world.', featured: false, newEpisode: false },
  { id: 'chernobyl', title: 'Chernobyl', genre: 'Drama', seasons: 1, episodes: 5, rating: 9.4, image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80', description: 'The true story of the 1986 nuclear disaster — one of the worst man-made catastrophes in history.', featured: true, newEpisode: false },
];

// ─── Sports / Live Fixtures ───────────────────────────────────────────────────
export const liveMatches = [
  { id: 'ucl-final', sport: 'Football', league: 'UEFA Champions League', teamA: 'Real Madrid', teamB: 'Man City', scoreA: 2, scoreB: 1, time: "73'", isLive: true, image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&q=80' },
  { id: 'nba-finals', sport: 'Basketball', league: 'NBA Finals', teamA: 'Boston Celtics', teamB: 'Golden State', scoreA: 88, scoreB: 91, time: "Q3 5:22", isLive: true, image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=80' },
  { id: 'wimbledon', sport: 'Tennis', league: 'Wimbledon', teamA: 'C. Alcaraz', teamB: 'N. Djokovic', scoreA: 2, scoreB: 1, time: "Set 3", isLive: true, image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=600&q=80' },
];

export const upcomingFixtures = [
  { id: 'epl-1', sport: 'Football', league: 'Premier League', teamA: 'Arsenal', teamB: 'Liverpool', date: 'Jun 7, 2025', time: '17:30', image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&q=80' },
  { id: 'f1-monaco', sport: 'F1', league: 'Formula 1', teamA: 'Monaco Grand Prix', teamB: '', date: 'Jun 8, 2025', time: '14:00', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&q=80' },
  { id: 'mma-ufc', sport: 'MMA', league: 'UFC 310', teamA: 'I. Topuria', teamB: 'M. Chandler', date: 'Jun 9, 2025', time: '23:00', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
  { id: 'nba-2', sport: 'Basketball', league: 'NBA Finals - Game 6', teamA: 'Boston Celtics', teamB: 'Golden State', date: 'Jun 10, 2025', time: '21:00', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=80' },
];

export const sportsCategories = [
  { label: 'Football', icon: '⚽' },
  { label: 'Basketball', icon: '🏀' },
  { label: 'Tennis', icon: '🎾' },
  { label: 'Formula 1', icon: '🏎️' },
  { label: 'MMA/UFC', icon: '🥊' },
  { label: 'Cricket', icon: '🏏' },
];

// ─── Subscription Plans ───────────────────────────────────────────────────────
export const plans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    currency: 'USD',
    period: 'month',
    color: 'from-slate-600 to-slate-800',
    features: [
      'SD quality (480p)',
      '1 screen at a time',
      'Limited content library',
      'Ads supported',
      'No live sports',
    ],
    missing: ['HD / 4K streaming', 'Live Sports', 'Download offline', 'Multi-screen'],
  },
  {
    id: 'basic',
    name: 'Basic',
    price: 7.99,
    currency: 'USD',
    period: 'month',
    color: 'from-blue-600 to-violet-700',
    popular: false,
    features: [
      'Full HD (1080p)',
      '2 screens at a time',
      'Full movies & series library',
      'Ad-free experience',
      'Some live sports',
    ],
    missing: ['4K Ultra HD', 'Download offline', 'All live sports'],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 14.99,
    currency: 'USD',
    period: 'month',
    color: 'from-violet-600 via-fuchsia-600 to-pink-600',
    popular: true,
    features: [
      '4K Ultra HD + Dolby Vision',
      '4 screens simultaneously',
      'Complete content library',
      'ALL live sports events',
      'Download for offline viewing',
      'Early access to new releases',
      'Multi-language audio & subtitles',
    ],
    missing: [],
  },
];

// ─── Genres ──────────────────────────────────────────────────────────────────
export const movieGenres = ['All', 'Action', 'Drama', 'Sci-Fi', 'Thriller', 'Comedy', 'Horror', 'Romance'];
export const seriesGenres = ['All', 'Crime', 'Drama', 'Sci-Fi', 'Fantasy', 'Action', 'Comedy', 'Reality'];

// ─── Watch History (mock) ─────────────────────────────────────────────────────
export const watchHistory = [
  { ...movies[0], progress: 72 },
  { ...series[0], progress: 45 },
  { ...movies[1], progress: 30 },
  { ...series[2], progress: 88 },
];
