export const GENRES = [
'Fiction', 'Non-Fiction', 'Science Fiction', 'Fantasy', 'Mystery',
'Thriller', 'Romance', 'Horror', 'Biography', 'History',
'Self-Help', 'Philosophy', 'Poetry', 'Children', 'Graphic Novel', 'Other'];


const GENRE_COLORS = {
  'Fiction': '#4a7c59',
  'Non-Fiction': '#5c6bc0',
  'Science Fiction': '#0288d1',
  'Fantasy': '#7b1fa2',
  'Mystery': '#37474f',
  'Thriller': '#c0392b',
  'Romance': '#e91e63',
  'Horror': '#212121',
  'Biography': '#ef6c00',
  'History': '#6d4c41',
  'Self-Help': '#00897b',
  'Philosophy': '#558b2f',
  'Poetry': '#ad1457',
  'Children': '#f9a825',
  'Graphic Novel': '#1565c0',
  'Other': '#78909c'
};

export const genreColor = (genre) => GENRE_COLORS[genre] || '#78909c';