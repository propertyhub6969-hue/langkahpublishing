// Preset warna sampul buku — dipakai baik di server (public site) maupun
// client (form admin), jadi file ini TIDAK boleh mengimpor modul Node (fs, path).
export const COVER_PRESETS = {
  copper: { label: 'Copper', css: 'linear-gradient(160deg, #c8925e, #a8734a)' },
  navy: { label: 'Midnight Navy', css: 'linear-gradient(160deg, #16283a, #0f1d2d)' },
  slate: { label: 'Deep Slate', css: 'linear-gradient(160deg, #51606f, #384752)' },
  taupe: { label: 'Soft Taupe', css: 'linear-gradient(160deg, #a99a8a, #857a63)' },
  steel: { label: 'Steel Blue', css: 'linear-gradient(160deg, #2c4459, #1a2e3f)' },
  sand: { label: 'Warm Sand', css: 'linear-gradient(160deg, #d4a575, #b8845a)' },
  ocean: { label: 'Ocean', css: 'linear-gradient(160deg, #3d5568, #2a3d4c)' },
  bronze: { label: 'Bronze', css: 'linear-gradient(160deg, #8f7256, #6b5540)' },
};

export function coverCss(presetKey) {
  return (COVER_PRESETS[presetKey] || COVER_PRESETS.copper).css;
}
