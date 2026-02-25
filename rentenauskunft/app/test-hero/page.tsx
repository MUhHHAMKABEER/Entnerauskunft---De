export default function TestHeroPage() {
  return (
    <div className="min-h-screen bg-slate-100 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-center mb-12 text-slate-900">
          Hero-Bilder Layout Test - 15 Varianten
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Variante 1 - Klassisch versetzt diagonal */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-center mb-4">
              <span className="inline-block px-4 py-2 bg-renten-blue text-white rounded-lg font-bold text-lg">
                #1
              </span>
              <p className="text-sm text-slate-600 mt-2">Diagonal versetzt</p>
            </div>
            <div className="relative h-[300px] bg-renten-blue rounded-lg overflow-hidden">
              <div className="absolute top-4 right-4 w-[180px] h-[140px] rounded-lg overflow-hidden border-4 border-renten-accent shadow-xl">
                <img src="/hero1.jpg" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-4 left-4 w-[180px] h-[140px] rounded-lg overflow-hidden border-4 border-renten-accent shadow-xl">
                <img src="/hero2.jpg" alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Variante 2 - Überlappend rechts */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-center mb-4">
              <span className="inline-block px-4 py-2 bg-renten-blue text-white rounded-lg font-bold text-lg">
                #2
              </span>
              <p className="text-sm text-slate-600 mt-2">Überlappend rechts</p>
            </div>
            <div className="relative h-[300px] bg-renten-blue rounded-lg overflow-hidden">
              <div className="absolute top-8 right-8 w-[200px] h-[150px] rounded-lg overflow-hidden border-4 border-renten-accent shadow-xl z-10">
                <img src="/hero1.jpg" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="absolute top-24 right-16 w-[200px] h-[150px] rounded-lg overflow-hidden border-4 border-renten-accent shadow-xl">
                <img src="/hero2.jpg" alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Variante 3 - Vertikal gestapelt versetzt */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-center mb-4">
              <span className="inline-block px-4 py-2 bg-renten-blue text-white rounded-lg font-bold text-lg">
                #3
              </span>
              <p className="text-sm text-slate-600 mt-2">Vertikal gestapelt</p>
            </div>
            <div className="relative h-[300px] bg-renten-blue rounded-lg overflow-hidden">
              <div className="absolute top-6 right-12 w-[220px] h-[120px] rounded-lg overflow-hidden border-4 border-renten-accent shadow-xl">
                <img src="/hero1.jpg" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-6 right-6 w-[220px] h-[120px] rounded-lg overflow-hidden border-4 border-renten-accent shadow-xl">
                <img src="/hero2.jpg" alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Variante 4 - L-Form */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-center mb-4">
              <span className="inline-block px-4 py-2 bg-renten-blue text-white rounded-lg font-bold text-lg">
                #4
              </span>
              <p className="text-sm text-slate-600 mt-2">L-Form</p>
            </div>
            <div className="relative h-[300px] bg-renten-blue rounded-lg overflow-hidden">
              <div className="absolute top-4 right-4 w-[160px] h-[180px] rounded-lg overflow-hidden border-4 border-renten-accent shadow-xl">
                <img src="/hero1.jpg" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-4 right-4 w-[240px] h-[100px] rounded-lg overflow-hidden border-4 border-renten-accent shadow-xl">
                <img src="/hero2.jpg" alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Variante 5 - Groß + Klein */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-center mb-4">
              <span className="inline-block px-4 py-2 bg-renten-blue text-white rounded-lg font-bold text-lg">
                #5
              </span>
              <p className="text-sm text-slate-600 mt-2">Groß + Klein</p>
            </div>
            <div className="relative h-[300px] bg-renten-blue rounded-lg overflow-hidden">
              <div className="absolute top-6 right-6 w-[240px] h-[200px] rounded-lg overflow-hidden border-4 border-renten-accent shadow-xl">
                <img src="/hero1.jpg" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-6 left-6 w-[140px] h-[100px] rounded-lg overflow-hidden border-4 border-renten-accent shadow-xl">
                <img src="/hero2.jpg" alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Variante 6 - Gedreht überlappend */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-center mb-4">
              <span className="inline-block px-4 py-2 bg-renten-blue text-white rounded-lg font-bold text-lg">
                #6
              </span>
              <p className="text-sm text-slate-600 mt-2">Gedreht überlappend</p>
            </div>
            <div className="relative h-[300px] bg-renten-blue rounded-lg overflow-hidden">
              <div className="absolute top-8 right-12 w-[200px] h-[150px] rounded-lg overflow-hidden border-4 border-renten-accent shadow-xl transform rotate-6 z-10">
                <img src="/hero1.jpg" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-8 right-6 w-[200px] h-[150px] rounded-lg overflow-hidden border-4 border-renten-accent shadow-xl transform -rotate-6">
                <img src="/hero2.jpg" alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Variante 7 - Treppe rechts */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-center mb-4">
              <span className="inline-block px-4 py-2 bg-renten-blue text-white rounded-lg font-bold text-lg">
                #7
              </span>
              <p className="text-sm text-slate-600 mt-2">Treppe rechts</p>
            </div>
            <div className="relative h-[300px] bg-renten-blue rounded-lg overflow-hidden">
              <div className="absolute top-6 right-20 w-[200px] h-[130px] rounded-lg overflow-hidden border-4 border-renten-accent shadow-xl">
                <img src="/hero1.jpg" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="absolute top-32 right-6 w-[200px] h-[130px] rounded-lg overflow-hidden border-4 border-renten-accent shadow-xl">
                <img src="/hero2.jpg" alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Variante 8 - Zentriert versetzt */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-center mb-4">
              <span className="inline-block px-4 py-2 bg-renten-blue text-white rounded-lg font-bold text-lg">
                #8
              </span>
              <p className="text-sm text-slate-600 mt-2">Zentriert versetzt</p>
            </div>
            <div className="relative h-[300px] bg-renten-blue rounded-lg overflow-hidden">
              <div className="absolute top-6 left-1/2 -translate-x-1/2 translate-x-8 w-[200px] h-[140px] rounded-lg overflow-hidden border-4 border-renten-accent shadow-xl z-10">
                <img src="/hero1.jpg" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 -translate-x-8 w-[200px] h-[140px] rounded-lg overflow-hidden border-4 border-renten-accent shadow-xl">
                <img src="/hero2.jpg" alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Variante 9 - Asymmetrisch groß */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-center mb-4">
              <span className="inline-block px-4 py-2 bg-renten-blue text-white rounded-lg font-bold text-lg">
                #9
              </span>
              <p className="text-sm text-slate-600 mt-2">Asymmetrisch groß</p>
            </div>
            <div className="relative h-[300px] bg-renten-blue rounded-lg overflow-hidden">
              <div className="absolute top-4 right-4 w-[260px] h-[180px] rounded-lg overflow-hidden border-4 border-renten-accent shadow-xl">
                <img src="/hero1.jpg" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-4 left-4 w-[180px] h-[120px] rounded-lg overflow-hidden border-4 border-renten-accent shadow-xl">
                <img src="/hero2.jpg" alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Variante 10 - Seitlich versetzt */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-center mb-4">
              <span className="inline-block px-4 py-2 bg-renten-blue text-white rounded-lg font-bold text-lg">
                #10
              </span>
              <p className="text-sm text-slate-600 mt-2">Seitlich versetzt</p>
            </div>
            <div className="relative h-[300px] bg-renten-blue rounded-lg overflow-hidden">
              <div className="absolute top-12 right-4 w-[200px] h-[140px] rounded-lg overflow-hidden border-4 border-renten-accent shadow-xl">
                <img src="/hero1.jpg" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="absolute top-24 right-20 w-[200px] h-[140px] rounded-lg overflow-hidden border-4 border-renten-accent shadow-xl">
                <img src="/hero2.jpg" alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Variante 11 - Kompakt überlappend */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-center mb-4">
              <span className="inline-block px-4 py-2 bg-renten-blue text-white rounded-lg font-bold text-lg">
                #11
              </span>
              <p className="text-sm text-slate-600 mt-2">Kompakt überlappend</p>
            </div>
            <div className="relative h-[300px] bg-renten-blue rounded-lg overflow-hidden">
              <div className="absolute top-1/2 -translate-y-1/2 right-12 w-[220px] h-[160px] rounded-lg overflow-hidden border-4 border-renten-accent shadow-xl z-10">
                <img src="/hero1.jpg" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 translate-y-8 right-4 w-[220px] h-[160px] rounded-lg overflow-hidden border-4 border-renten-accent shadow-xl">
                <img src="/hero2.jpg" alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Variante 12 - Ecken diagonal */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-center mb-4">
              <span className="inline-block px-4 py-2 bg-renten-blue text-white rounded-lg font-bold text-lg">
                #12
              </span>
              <p className="text-sm text-slate-600 mt-2">Ecken diagonal</p>
            </div>
            <div className="relative h-[300px] bg-renten-blue rounded-lg overflow-hidden">
              <div className="absolute top-6 right-6 w-[190px] h-[140px] rounded-lg overflow-hidden border-4 border-renten-accent shadow-xl">
                <img src="/hero1.jpg" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-6 left-6 w-[190px] h-[140px] rounded-lg overflow-hidden border-4 border-renten-accent shadow-xl">
                <img src="/hero2.jpg" alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Variante 13 - Horizontal nebeneinander */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-center mb-4">
              <span className="inline-block px-4 py-2 bg-renten-blue text-white rounded-lg font-bold text-lg">
                #13
              </span>
              <p className="text-sm text-slate-600 mt-2">Horizontal nebeneinander</p>
            </div>
            <div className="relative h-[300px] bg-renten-blue rounded-lg overflow-hidden">
              <div className="absolute top-1/2 -translate-y-1/2 right-4 w-[140px] h-[200px] rounded-lg overflow-hidden border-4 border-renten-accent shadow-xl">
                <img src="/hero1.jpg" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 translate-y-6 right-32 w-[140px] h-[200px] rounded-lg overflow-hidden border-4 border-renten-accent shadow-xl">
                <img src="/hero2.jpg" alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Variante 14 - Gedreht Treppe */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-center mb-4">
              <span className="inline-block px-4 py-2 bg-renten-blue text-white rounded-lg font-bold text-lg">
                #14
              </span>
              <p className="text-sm text-slate-600 mt-2">Gedreht Treppe</p>
            </div>
            <div className="relative h-[300px] bg-renten-blue rounded-lg overflow-hidden">
              <div className="absolute top-8 right-16 w-[200px] h-[140px] rounded-lg overflow-hidden border-4 border-renten-accent shadow-xl transform rotate-3">
                <img src="/hero1.jpg" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-8 right-6 w-[200px] h-[140px] rounded-lg overflow-hidden border-4 border-renten-accent shadow-xl transform -rotate-3">
                <img src="/hero2.jpg" alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Variante 15 - Großes Overlap */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-center mb-4">
              <span className="inline-block px-4 py-2 bg-renten-blue text-white rounded-lg font-bold text-lg">
                #15
              </span>
              <p className="text-sm text-slate-600 mt-2">Großes Overlap</p>
            </div>
            <div className="relative h-[300px] bg-renten-blue rounded-lg overflow-hidden">
              <div className="absolute top-6 right-6 w-[240px] h-[170px] rounded-lg overflow-hidden border-4 border-renten-accent shadow-xl z-10">
                <img src="/hero1.jpg" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-6 right-12 w-[240px] h-[170px] rounded-lg overflow-hidden border-4 border-renten-accent shadow-xl">
                <img src="/hero2.jpg" alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-600">
            Wähle eine Nummer (#1 bis #15) für das Hero-Layout
          </p>
        </div>
      </div>
    </div>
  );
}
