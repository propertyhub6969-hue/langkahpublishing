const GENRES = [
  'Fiksi', 'Puisi', 'Non-Fiksi', 'Esai', 'Sastra Anak',
  'Memoar', 'Antologi', 'Terjemahan', 'Biografi', 'Cerpen',
];

export default function Strip() {
  return (
    <div className="strip">
      <div className="strip-inner">
        {GENRES.map((g) => (
          <span key={g}>{g}</span>
        ))}
      </div>
    </div>
  );
}
