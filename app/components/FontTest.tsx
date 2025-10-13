'use client';

export default function FontTest() {
  return (
    <div className="fixed top-20 right-4 bg-white p-4 rounded-lg shadow-lg border z-50">
      <h3 className="text-sm font-bold mb-2">Font Test:</h3>
      <p className="text-xs font-sans">Inter Font (Default)</p>
      <p className="text-xs font-aloevera">Aloevera Font (Custom)</p>
      <p className="text-xs font-aloevera font-bold">Aloevera Bold</p>
    </div>
  );
}
