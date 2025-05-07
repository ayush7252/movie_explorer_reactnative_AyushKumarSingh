const BollywoodData = [
  {
    id: 1,
    name: "3 Idiots",
    image: "https://m.media-amazon.com/images/M/MV5BNzc4ZWQ3NmYtODE0Ny00YTQ4LTlkZWItNTBkMGQ0MmUwMmJlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    type: "Comedy-Drama",
    year: "2009",
    rating: "8.4",
    actor: "Aamir Khan",
    description: "3 Idiots is a heartwarming journey of friendship, innovation, and following one's dreams against societal pressures. Set in an Indian engineering college, it highlights the struggles of students navigating rigid academic systems. Through humor, emotional moments, and inspirational messaging, the film questions traditional education norms and encourages thinking differently. A timeless classic.",
    views: "950k"
  },
  {
    id: 2,
    name: "Dangal",
    image: "https://m.media-amazon.com/images/M/MV5BMTQ4MzQzMzM2Nl5BMl5BanBnXkFtZTgwMTQ1NzU3MDI@._V1_.jpg",
    type: "Biography",
    year: "2016",
    rating: "8.3",
    actor: "Aamir Khan",
    description: "Dangal showcases the true story of Mahavir Singh Phogat, who trains his daughters to become world-class wrestlers. Battling societal norms and personal challenges, the film portrays resilience, empowerment, and determination. It offers inspiring performances and emphasizes the importance of gender equality, perseverance, and belief in one's abilities.",
    views: "870k"
  },
  {
    id: 3,
    name: "Zindagi Na Milegi Dobara",
    image: "https://m.media-amazon.com/images/M/MV5BOGIzYzg5NzItNDRkYS00NmIzLTk3NzQtZWYwY2VlZDhiYWQ4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    type: "Adventure-Drama",
    year: "2011",
    rating: "8.2",
    actor: "Hrithik Roshan",
    description: "Zindagi Na Milegi Dobara is a celebration of life, friendship, and self-discovery. Three childhood friends embark on a road trip across Spain, facing their deepest fears and embracing new experiences. The movie beautifully captures emotions, freedom, and the importance of living in the moment, accompanied by breathtaking visuals and soulful music.",
    views: "740k"
  },
  {
    id: 4,
    name: "Gully Boy",
    image: "https://bollyspice.com/wp-content/uploads/2025/02/IMG_4966-scaled.jpeg",
    type: "Musical-Drama",
    year: "2019",
    rating: "8.0",
    actor: "Ranveer Singh",
    description: "Gully Boy is an inspiring tale of an underdog rising from the slums of Mumbai to achieve his dreams of becoming a successful rapper. Drawing inspiration from real-life artists, the film beautifully portrays struggles, passion, and ambition. It powerfully captures urban India's music culture and the spirit of never giving up.",
    views: "680k"
  },
  {
    id: 5,
    name: "Shershaah",
    image: "https://upload.wikimedia.org/wikipedia/en/9/91/Shershaah_film_poster.jpg",
    type: "War-Biography",
    year: "2021",
    rating: "8.4",
    actor: "Sidharth Malhotra",
    description: "Shershaah chronicles the brave journey of Captain Vikram Batra during the Kargil War. Filled with patriotism, sacrifice, and love, the film highlights his heroic deeds and personal life. It leaves a lasting impact with powerful performances and stunning action sequences, celebrating the indomitable spirit of Indian soldiers and their valor.",
    views: "810k"
  },
  {
    id: 6,
    name: "Pathaan",
    image: "https://m.media-amazon.com/images/M/MV5BZjA3YTI1ZTItZGY5Ni00MzQyLTg2NDYtMzc3NGY5NzEwYmQxXkEyXkFqcGc@._V1_.jpg",
    type: "Action",
    year: "2023",
    rating: "7.0",
    actor: "Shah Rukh Khan",
    description: "Pathaan delivers high-octane action, thrilling chases, and a gripping narrative. Featuring espionage and patriotism, the movie follows a secret agent on a dangerous mission to protect his nation. Stylish action sequences, international locations, and charismatic performances make this a treat for fans of fast-paced, larger-than-life entertainment.",
    views: "920k"
  },
  {
    id: 7,
    name: "Kabir Singh",
    image: "https://upload.wikimedia.org/wikipedia/en/d/dc/Kabir_Singh.jpg",
    type: "Romance-Drama",
    year: 2019,
    rating: 7.1,
    actor: "Shahid Kapoor",
    description: "Kabir Singh is an intense love story about a brilliant yet self-destructive surgeon struggling with life after a heartbreak. Portraying raw emotions, obsession, and vulnerability, the movie explores complex relationships and personal downfall. Despite controversies, it became a major commercial success, known for its impactful performances and memorable music.",
    views: "860k"
  },
  {
    id: 8,
    name: "Drishyam 2",
    image: "https://upload.wikimedia.org/wikipedia/en/9/9e/Drishyam_2_2022_film_poster.jpg",
    type: "Thriller",
    year: 2022,
    rating: 8.2,
    actor: "Ajay Devgn",
    description: "Drishyam 2 continues the gripping saga of a father protecting his family at all costs. Clever twists, suspenseful storytelling, and intense performances keep viewers hooked throughout. The sequel effectively builds on its predecessor, offering a compelling crime thriller that challenges perceptions of morality, truth, and justice in extraordinary circumstances.",
    views: "790k"
  },
  {
    id: 9,
    name: "Brahmāstra",
    image: "https://m.media-amazon.com/images/M/MV5BMDIxMWZjODAtNmRjOC00OGExLWJjZTAtMmQ1MzRmYjhlNjk3XkEyXkFqcGc@._V1_.jpg",
    type: "Fantasy-Adventure",
    year: 2022,
    rating: 5.6,
    actor: "Ranbir Kapoor",
    description: "Brahmāstra is a visually grand fantasy adventure blending Indian mythology with modern storytelling. Centered around powerful ancient weapons and a hidden world, the film embarks on a mystical journey filled with romance, action, and spectacular visuals. Despite mixed reviews, it opened doors for a new genre of Indian cinema.",
    views: "840k"
  },
  {
    id: 10,
    name: "Animal",
    image: "https://m.media-amazon.com/images/M/MV5BZThmNDg1NjUtNWJhMC00YjA3LWJiMjItNmM4ZDQ5ZGZiN2Y2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    type: "Action-Drama",
    year: 2023,
    rating: 7.6,
    actor: "Ranbir Kapoor",
    description: "Animal is an emotional action-drama exploring the intense bond between a father and son, set against a backdrop of violence and crime. With layered storytelling, complex character arcs, and gripping action sequences, it delves deep into themes of loyalty, love, and internal battles. The film offers a fresh cinematic experience.",
    views: "730k"
  }
];

export default BollywoodData;
