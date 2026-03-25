import type { Artist, Album, Song } from '@/services/music/types';

export const mockArtists: Artist[] = [
  { id: 'a1', name: 'The Beatles', albumCount: 3 },
  { id: 'a2', name: 'Pink Floyd', albumCount: 2 },
  { id: 'a3', name: 'Led Zeppelin', albumCount: 2 },
  { id: 'a4', name: 'Queen', albumCount: 2 },
  { id: 'a5', name: 'David Bowie', albumCount: 2 },
  { id: 'a6', name: 'Radiohead', albumCount: 2 },
  { id: 'a7', name: 'Nirvana', albumCount: 2 },
  { id: 'a8', name: 'Daft Punk', albumCount: 2 },
  { id: 'a9', name: 'Arctic Monkeys', albumCount: 2 },
  { id: 'a10', name: 'Kendrick Lamar', albumCount: 2 },
];

export const mockAlbums: Album[] = [
  // The Beatles
  { id: 'al1', title: 'Abbey Road', artistId: 'a1', artistName: 'The Beatles', year: 1969, songCount: 5 },
  { id: 'al2', title: 'Revolver', artistId: 'a1', artistName: 'The Beatles', year: 1966, songCount: 4 },
  { id: 'al3', title: 'Let It Be', artistId: 'a1', artistName: 'The Beatles', year: 1970, songCount: 4 },
  // Pink Floyd
  { id: 'al4', title: 'The Dark Side of the Moon', artistId: 'a2', artistName: 'Pink Floyd', year: 1973, songCount: 5 },
  { id: 'al5', title: 'Wish You Were Here', artistId: 'a2', artistName: 'Pink Floyd', year: 1975, songCount: 4 },
  // Led Zeppelin
  { id: 'al6', title: 'Led Zeppelin IV', artistId: 'a3', artistName: 'Led Zeppelin', year: 1971, songCount: 4 },
  { id: 'al7', title: 'Physical Graffiti', artistId: 'a3', artistName: 'Led Zeppelin', year: 1975, songCount: 4 },
  // Queen
  { id: 'al8', title: 'A Night at the Opera', artistId: 'a4', artistName: 'Queen', year: 1975, songCount: 4 },
  { id: 'al9', title: 'News of the World', artistId: 'a4', artistName: 'Queen', year: 1977, songCount: 4 },
  // David Bowie
  { id: 'al10', title: 'The Rise and Fall of Ziggy Stardust', artistId: 'a5', artistName: 'David Bowie', year: 1972, songCount: 4 },
  { id: 'al11', title: 'Heroes', artistId: 'a5', artistName: 'David Bowie', year: 1977, songCount: 4 },
  // Radiohead
  { id: 'al12', title: 'OK Computer', artistId: 'a6', artistName: 'Radiohead', year: 1997, songCount: 5 },
  { id: 'al13', title: 'Kid A', artistId: 'a6', artistName: 'Radiohead', year: 2000, songCount: 4 },
  // Nirvana
  { id: 'al14', title: 'Nevermind', artistId: 'a7', artistName: 'Nirvana', year: 1991, songCount: 5 },
  { id: 'al15', title: 'In Utero', artistId: 'a7', artistName: 'Nirvana', year: 1993, songCount: 4 },
  // Daft Punk
  { id: 'al16', title: 'Discovery', artistId: 'a8', artistName: 'Daft Punk', year: 2001, songCount: 5 },
  { id: 'al17', title: 'Random Access Memories', artistId: 'a8', artistName: 'Daft Punk', year: 2013, songCount: 4 },
  // Arctic Monkeys
  { id: 'al18', title: 'Whatever People Say I Am', artistId: 'a9', artistName: 'Arctic Monkeys', year: 2006, songCount: 4 },
  { id: 'al19', title: 'AM', artistId: 'a9', artistName: 'Arctic Monkeys', year: 2013, songCount: 5 },
  // Kendrick Lamar
  { id: 'al20', title: 'good kid, m.A.A.d city', artistId: 'a10', artistName: 'Kendrick Lamar', year: 2012, songCount: 5 },
  { id: 'al21', title: 'To Pimp a Butterfly', artistId: 'a10', artistName: 'Kendrick Lamar', year: 2015, songCount: 4 },
];

export const mockSongs: Song[] = [
  // Abbey Road
  { id: 's1', title: 'Come Together', artistId: 'a1', artistName: 'The Beatles', albumId: 'al1', albumTitle: 'Abbey Road', trackNumber: 1, duration: 259 },
  { id: 's2', title: 'Something', artistId: 'a1', artistName: 'The Beatles', albumId: 'al1', albumTitle: 'Abbey Road', trackNumber: 2, duration: 182 },
  { id: 's3', title: 'Here Comes the Sun', artistId: 'a1', artistName: 'The Beatles', albumId: 'al1', albumTitle: 'Abbey Road', trackNumber: 3, duration: 185 },
  { id: 's4', title: 'Because', artistId: 'a1', artistName: 'The Beatles', albumId: 'al1', albumTitle: 'Abbey Road', trackNumber: 4, duration: 165 },
  { id: 's5', title: 'Golden Slumbers', artistId: 'a1', artistName: 'The Beatles', albumId: 'al1', albumTitle: 'Abbey Road', trackNumber: 5, duration: 91 },
  // Revolver
  { id: 's6', title: 'Taxman', artistId: 'a1', artistName: 'The Beatles', albumId: 'al2', albumTitle: 'Revolver', trackNumber: 1, duration: 159 },
  { id: 's7', title: 'Eleanor Rigby', artistId: 'a1', artistName: 'The Beatles', albumId: 'al2', albumTitle: 'Revolver', trackNumber: 2, duration: 126 },
  { id: 's8', title: 'Here, There and Everywhere', artistId: 'a1', artistName: 'The Beatles', albumId: 'al2', albumTitle: 'Revolver', trackNumber: 3, duration: 145 },
  { id: 's9', title: 'Tomorrow Never Knows', artistId: 'a1', artistName: 'The Beatles', albumId: 'al2', albumTitle: 'Revolver', trackNumber: 4, duration: 178 },
  // Let It Be
  { id: 's10', title: 'Two of Us', artistId: 'a1', artistName: 'The Beatles', albumId: 'al3', albumTitle: 'Let It Be', trackNumber: 1, duration: 214 },
  { id: 's11', title: 'Let It Be', artistId: 'a1', artistName: 'The Beatles', albumId: 'al3', albumTitle: 'Let It Be', trackNumber: 2, duration: 243 },
  { id: 's12', title: 'Across the Universe', artistId: 'a1', artistName: 'The Beatles', albumId: 'al3', albumTitle: 'Let It Be', trackNumber: 3, duration: 228 },
  { id: 's13', title: 'Get Back', artistId: 'a1', artistName: 'The Beatles', albumId: 'al3', albumTitle: 'Let It Be', trackNumber: 4, duration: 190 },
  // The Dark Side of the Moon
  { id: 's14', title: 'Speak to Me / Breathe', artistId: 'a2', artistName: 'Pink Floyd', albumId: 'al4', albumTitle: 'The Dark Side of the Moon', trackNumber: 1, duration: 238 },
  { id: 's15', title: 'Time', artistId: 'a2', artistName: 'Pink Floyd', albumId: 'al4', albumTitle: 'The Dark Side of the Moon', trackNumber: 2, duration: 413 },
  { id: 's16', title: 'Money', artistId: 'a2', artistName: 'Pink Floyd', albumId: 'al4', albumTitle: 'The Dark Side of the Moon', trackNumber: 3, duration: 382 },
  { id: 's17', title: 'Us and Them', artistId: 'a2', artistName: 'Pink Floyd', albumId: 'al4', albumTitle: 'The Dark Side of the Moon', trackNumber: 4, duration: 469 },
  { id: 's18', title: 'Eclipse', artistId: 'a2', artistName: 'Pink Floyd', albumId: 'al4', albumTitle: 'The Dark Side of the Moon', trackNumber: 5, duration: 130 },
  // Wish You Were Here
  { id: 's19', title: 'Shine On You Crazy Diamond (I-V)', artistId: 'a2', artistName: 'Pink Floyd', albumId: 'al5', albumTitle: 'Wish You Were Here', trackNumber: 1, duration: 810 },
  { id: 's20', title: 'Welcome to the Machine', artistId: 'a2', artistName: 'Pink Floyd', albumId: 'al5', albumTitle: 'Wish You Were Here', trackNumber: 2, duration: 450 },
  { id: 's21', title: 'Have a Cigar', artistId: 'a2', artistName: 'Pink Floyd', albumId: 'al5', albumTitle: 'Wish You Were Here', trackNumber: 3, duration: 307 },
  { id: 's22', title: 'Wish You Were Here', artistId: 'a2', artistName: 'Pink Floyd', albumId: 'al5', albumTitle: 'Wish You Were Here', trackNumber: 4, duration: 334 },
  // Led Zeppelin IV
  { id: 's23', title: 'Black Dog', artistId: 'a3', artistName: 'Led Zeppelin', albumId: 'al6', albumTitle: 'Led Zeppelin IV', trackNumber: 1, duration: 296 },
  { id: 's24', title: 'Rock and Roll', artistId: 'a3', artistName: 'Led Zeppelin', albumId: 'al6', albumTitle: 'Led Zeppelin IV', trackNumber: 2, duration: 220 },
  { id: 's25', title: 'Stairway to Heaven', artistId: 'a3', artistName: 'Led Zeppelin', albumId: 'al6', albumTitle: 'Led Zeppelin IV', trackNumber: 3, duration: 482 },
  { id: 's26', title: 'When the Levee Breaks', artistId: 'a3', artistName: 'Led Zeppelin', albumId: 'al6', albumTitle: 'Led Zeppelin IV', trackNumber: 4, duration: 427 },
  // Physical Graffiti
  { id: 's27', title: 'Custard Pie', artistId: 'a3', artistName: 'Led Zeppelin', albumId: 'al7', albumTitle: 'Physical Graffiti', trackNumber: 1, duration: 253 },
  { id: 's28', title: 'Kashmir', artistId: 'a3', artistName: 'Led Zeppelin', albumId: 'al7', albumTitle: 'Physical Graffiti', trackNumber: 2, duration: 508 },
  { id: 's29', title: 'Trampled Under Foot', artistId: 'a3', artistName: 'Led Zeppelin', albumId: 'al7', albumTitle: 'Physical Graffiti', trackNumber: 3, duration: 338 },
  { id: 's30', title: 'Ten Years Gone', artistId: 'a3', artistName: 'Led Zeppelin', albumId: 'al7', albumTitle: 'Physical Graffiti', trackNumber: 4, duration: 393 },
  // A Night at the Opera
  { id: 's31', title: 'Bohemian Rhapsody', artistId: 'a4', artistName: 'Queen', albumId: 'al8', albumTitle: 'A Night at the Opera', trackNumber: 1, duration: 354 },
  { id: 's32', title: 'Love of My Life', artistId: 'a4', artistName: 'Queen', albumId: 'al8', albumTitle: 'A Night at the Opera', trackNumber: 2, duration: 219 },
  { id: 's33', title: "You're My Best Friend", artistId: 'a4', artistName: 'Queen', albumId: 'al8', albumTitle: 'A Night at the Opera', trackNumber: 3, duration: 170 },
  { id: 's34', title: 'Death on Two Legs', artistId: 'a4', artistName: 'Queen', albumId: 'al8', albumTitle: 'A Night at the Opera', trackNumber: 4, duration: 223 },
  // News of the World
  { id: 's35', title: 'We Will Rock You', artistId: 'a4', artistName: 'Queen', albumId: 'al9', albumTitle: 'News of the World', trackNumber: 1, duration: 122 },
  { id: 's36', title: 'We Are the Champions', artistId: 'a4', artistName: 'Queen', albumId: 'al9', albumTitle: 'News of the World', trackNumber: 2, duration: 179 },
  { id: 's37', title: 'Sheer Heart Attack', artistId: 'a4', artistName: 'Queen', albumId: 'al9', albumTitle: 'News of the World', trackNumber: 3, duration: 207 },
  { id: 's38', title: 'Spread Your Wings', artistId: 'a4', artistName: 'Queen', albumId: 'al9', albumTitle: 'News of the World', trackNumber: 4, duration: 271 },
  // Ziggy Stardust
  { id: 's39', title: 'Starman', artistId: 'a5', artistName: 'David Bowie', albumId: 'al10', albumTitle: 'The Rise and Fall of Ziggy Stardust', trackNumber: 1, duration: 256 },
  { id: 's40', title: 'Ziggy Stardust', artistId: 'a5', artistName: 'David Bowie', albumId: 'al10', albumTitle: 'The Rise and Fall of Ziggy Stardust', trackNumber: 2, duration: 194 },
  { id: 's41', title: 'Suffragette City', artistId: 'a5', artistName: 'David Bowie', albumId: 'al10', albumTitle: 'The Rise and Fall of Ziggy Stardust', trackNumber: 3, duration: 206 },
  { id: 's42', title: 'Rock n Roll Suicide', artistId: 'a5', artistName: 'David Bowie', albumId: 'al10', albumTitle: 'The Rise and Fall of Ziggy Stardust', trackNumber: 4, duration: 181 },
  // Heroes
  { id: 's43', title: 'Heroes', artistId: 'a5', artistName: 'David Bowie', albumId: 'al11', albumTitle: 'Heroes', trackNumber: 1, duration: 372 },
  { id: 's44', title: 'Beauty and the Beast', artistId: 'a5', artistName: 'David Bowie', albumId: 'al11', albumTitle: 'Heroes', trackNumber: 2, duration: 228 },
  { id: 's45', title: 'Sons of the Silent Age', artistId: 'a5', artistName: 'David Bowie', albumId: 'al11', albumTitle: 'Heroes', trackNumber: 3, duration: 211 },
  { id: 's46', title: 'V-2 Schneider', artistId: 'a5', artistName: 'David Bowie', albumId: 'al11', albumTitle: 'Heroes', trackNumber: 4, duration: 189 },
  // OK Computer
  { id: 's47', title: 'Paranoid Android', artistId: 'a6', artistName: 'Radiohead', albumId: 'al12', albumTitle: 'OK Computer', trackNumber: 1, duration: 383 },
  { id: 's48', title: 'Karma Police', artistId: 'a6', artistName: 'Radiohead', albumId: 'al12', albumTitle: 'OK Computer', trackNumber: 2, duration: 264 },
  { id: 's49', title: 'No Surprises', artistId: 'a6', artistName: 'Radiohead', albumId: 'al12', albumTitle: 'OK Computer', trackNumber: 3, duration: 229 },
  { id: 's50', title: 'Lucky', artistId: 'a6', artistName: 'Radiohead', albumId: 'al12', albumTitle: 'OK Computer', trackNumber: 4, duration: 282 },
  { id: 's51', title: 'Exit Music (For a Film)', artistId: 'a6', artistName: 'Radiohead', albumId: 'al12', albumTitle: 'OK Computer', trackNumber: 5, duration: 265 },
  // Kid A
  { id: 's52', title: 'Everything in Its Right Place', artistId: 'a6', artistName: 'Radiohead', albumId: 'al13', albumTitle: 'Kid A', trackNumber: 1, duration: 252 },
  { id: 's53', title: 'Kid A', artistId: 'a6', artistName: 'Radiohead', albumId: 'al13', albumTitle: 'Kid A', trackNumber: 2, duration: 290 },
  { id: 's54', title: 'Idioteque', artistId: 'a6', artistName: 'Radiohead', albumId: 'al13', albumTitle: 'Kid A', trackNumber: 3, duration: 309 },
  { id: 's55', title: 'How to Disappear Completely', artistId: 'a6', artistName: 'Radiohead', albumId: 'al13', albumTitle: 'Kid A', trackNumber: 4, duration: 342 },
  // Nevermind
  { id: 's56', title: 'Smells Like Teen Spirit', artistId: 'a7', artistName: 'Nirvana', albumId: 'al14', albumTitle: 'Nevermind', trackNumber: 1, duration: 301 },
  { id: 's57', title: 'Come as You Are', artistId: 'a7', artistName: 'Nirvana', albumId: 'al14', albumTitle: 'Nevermind', trackNumber: 2, duration: 219 },
  { id: 's58', title: 'Lithium', artistId: 'a7', artistName: 'Nirvana', albumId: 'al14', albumTitle: 'Nevermind', trackNumber: 3, duration: 257 },
  { id: 's59', title: 'In Bloom', artistId: 'a7', artistName: 'Nirvana', albumId: 'al14', albumTitle: 'Nevermind', trackNumber: 4, duration: 255 },
  { id: 's60', title: 'Polly', artistId: 'a7', artistName: 'Nirvana', albumId: 'al14', albumTitle: 'Nevermind', trackNumber: 5, duration: 174 },
  // In Utero
  { id: 's61', title: 'Heart-Shaped Box', artistId: 'a7', artistName: 'Nirvana', albumId: 'al15', albumTitle: 'In Utero', trackNumber: 1, duration: 281 },
  { id: 's62', title: 'Rape Me', artistId: 'a7', artistName: 'Nirvana', albumId: 'al15', albumTitle: 'In Utero', trackNumber: 2, duration: 154 },
  { id: 's63', title: 'Pennyroyal Tea', artistId: 'a7', artistName: 'Nirvana', albumId: 'al15', albumTitle: 'In Utero', trackNumber: 3, duration: 221 },
  { id: 's64', title: 'All Apologies', artistId: 'a7', artistName: 'Nirvana', albumId: 'al15', albumTitle: 'In Utero', trackNumber: 4, duration: 230 },
  // Discovery
  { id: 's65', title: 'One More Time', artistId: 'a8', artistName: 'Daft Punk', albumId: 'al16', albumTitle: 'Discovery', trackNumber: 1, duration: 320 },
  { id: 's66', title: 'Aerodynamic', artistId: 'a8', artistName: 'Daft Punk', albumId: 'al16', albumTitle: 'Discovery', trackNumber: 2, duration: 212 },
  { id: 's67', title: 'Digital Love', artistId: 'a8', artistName: 'Daft Punk', albumId: 'al16', albumTitle: 'Discovery', trackNumber: 3, duration: 301 },
  { id: 's68', title: 'Harder, Better, Faster, Stronger', artistId: 'a8', artistName: 'Daft Punk', albumId: 'al16', albumTitle: 'Discovery', trackNumber: 4, duration: 224 },
  { id: 's69', title: 'Something About Us', artistId: 'a8', artistName: 'Daft Punk', albumId: 'al16', albumTitle: 'Discovery', trackNumber: 5, duration: 232 },
  // Random Access Memories
  { id: 's70', title: 'Get Lucky', artistId: 'a8', artistName: 'Daft Punk', albumId: 'al17', albumTitle: 'Random Access Memories', trackNumber: 1, duration: 369 },
  { id: 's71', title: 'Instant Crush', artistId: 'a8', artistName: 'Daft Punk', albumId: 'al17', albumTitle: 'Random Access Memories', trackNumber: 2, duration: 337 },
  { id: 's72', title: 'Lose Yourself to Dance', artistId: 'a8', artistName: 'Daft Punk', albumId: 'al17', albumTitle: 'Random Access Memories', trackNumber: 3, duration: 353 },
  { id: 's73', title: 'Giorgio by Moroder', artistId: 'a8', artistName: 'Daft Punk', albumId: 'al17', albumTitle: 'Random Access Memories', trackNumber: 4, duration: 544 },
  // Whatever People Say I Am
  { id: 's74', title: 'I Bet You Look Good on the Dancefloor', artistId: 'a9', artistName: 'Arctic Monkeys', albumId: 'al18', albumTitle: 'Whatever People Say I Am', trackNumber: 1, duration: 173 },
  { id: 's75', title: 'Fake Tales of San Francisco', artistId: 'a9', artistName: 'Arctic Monkeys', albumId: 'al18', albumTitle: 'Whatever People Say I Am', trackNumber: 2, duration: 177 },
  { id: 's76', title: 'A Certain Romance', artistId: 'a9', artistName: 'Arctic Monkeys', albumId: 'al18', albumTitle: 'Whatever People Say I Am', trackNumber: 3, duration: 324 },
  { id: 's77', title: 'Mardy Bum', artistId: 'a9', artistName: 'Arctic Monkeys', albumId: 'al18', albumTitle: 'Whatever People Say I Am', trackNumber: 4, duration: 175 },
  // AM
  { id: 's78', title: 'Do I Wanna Know?', artistId: 'a9', artistName: 'Arctic Monkeys', albumId: 'al19', albumTitle: 'AM', trackNumber: 1, duration: 272 },
  { id: 's79', title: 'R U Mine?', artistId: 'a9', artistName: 'Arctic Monkeys', albumId: 'al19', albumTitle: 'AM', trackNumber: 2, duration: 201 },
  { id: 's80', title: 'Why\'d You Only Call Me When You\'re High?', artistId: 'a9', artistName: 'Arctic Monkeys', albumId: 'al19', albumTitle: 'AM', trackNumber: 3, duration: 163 },
  { id: 's81', title: 'Arabella', artistId: 'a9', artistName: 'Arctic Monkeys', albumId: 'al19', albumTitle: 'AM', trackNumber: 4, duration: 207 },
  { id: 's82', title: 'Snap Out of It', artistId: 'a9', artistName: 'Arctic Monkeys', albumId: 'al19', albumTitle: 'AM', trackNumber: 5, duration: 193 },
  // good kid, m.A.A.d city
  { id: 's83', title: 'Bitch, Don\'t Kill My Vibe', artistId: 'a10', artistName: 'Kendrick Lamar', albumId: 'al20', albumTitle: 'good kid, m.A.A.d city', trackNumber: 1, duration: 310 },
  { id: 's84', title: 'Money Trees', artistId: 'a10', artistName: 'Kendrick Lamar', albumId: 'al20', albumTitle: 'good kid, m.A.A.d city', trackNumber: 2, duration: 385 },
  { id: 's85', title: 'Swimming Pools (Drank)', artistId: 'a10', artistName: 'Kendrick Lamar', albumId: 'al20', albumTitle: 'good kid, m.A.A.d city', trackNumber: 3, duration: 313 },
  { id: 's86', title: 'm.A.A.d city', artistId: 'a10', artistName: 'Kendrick Lamar', albumId: 'al20', albumTitle: 'good kid, m.A.A.d city', trackNumber: 4, duration: 350 },
  { id: 's87', title: 'Poetic Justice', artistId: 'a10', artistName: 'Kendrick Lamar', albumId: 'al20', albumTitle: 'good kid, m.A.A.d city', trackNumber: 5, duration: 305 },
  // To Pimp a Butterfly
  { id: 's88', title: 'King Kunta', artistId: 'a10', artistName: 'Kendrick Lamar', albumId: 'al21', albumTitle: 'To Pimp a Butterfly', trackNumber: 1, duration: 234 },
  { id: 's89', title: 'Alright', artistId: 'a10', artistName: 'Kendrick Lamar', albumId: 'al21', albumTitle: 'To Pimp a Butterfly', trackNumber: 2, duration: 219 },
  { id: 's90', title: 'These Walls', artistId: 'a10', artistName: 'Kendrick Lamar', albumId: 'al21', albumTitle: 'To Pimp a Butterfly', trackNumber: 3, duration: 305 },
  { id: 's91', title: 'The Blacker the Berry', artistId: 'a10', artistName: 'Kendrick Lamar', albumId: 'al21', albumTitle: 'To Pimp a Butterfly', trackNumber: 4, duration: 332 },
];
