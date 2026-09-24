const fs = require('fs');
let content = fs.readFileSync('src/components/admin/HomepageEditor.jsx', 'utf8');

const servicesListUI = `
              <div className="space-y-4">
                <label className="block text-xs font-bold text-slate-300 mb-2">Categorized Services Items</label>
                {servicesList.map((srv, idx) => (
                  <div key={srv.id} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-cyan-400">SERVICE #{idx + 1}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input type="text" value={srv.title} onChange={(e) => { const u = [...servicesList]; u[idx].title = e.target.value; setServicesList(u); }} className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-white text-xs font-bold" />
                      <input type="text" value={srv.tag} onChange={(e) => { const u = [...servicesList]; u[idx].tag = e.target.value; setServicesList(u); }} className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-300 font-mono text-xs" />
                    </div>
                    <textarea rows={2} value={srv.desc} onChange={(e) => { const u = [...servicesList]; u[idx].desc = e.target.value; setServicesList(u); }} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-300 text-xs" />
                  </div>
                ))}
              </div>`;

const packagesListUI = `
              <div className="space-y-4">
                <label className="block text-xs font-bold text-slate-300 mb-2">Retainer Packages Items</label>
                {packagesList.map((pkg, idx) => (
                  <div key={pkg.id} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-purple-400">PACKAGE #{idx + 1}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input type="text" value={pkg.name} onChange={(e) => { const u = [...packagesList]; u[idx].name = e.target.value; setPackagesList(u); }} className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-white text-xs font-bold" />
                      <input type="text" value={pkg.fee} onChange={(e) => { const u = [...packagesList]; u[idx].fee = e.target.value; setPackagesList(u); }} className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-emerald-400 font-mono text-xs font-bold" />
                    </div>
                    <input type="text" value={pkg.tagline} onChange={(e) => { const u = [...packagesList]; u[idx].tagline = e.target.value; setPackagesList(u); }} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-300 text-xs" />
                    <textarea rows={2} value={pkg.features.join(', ')} onChange={(e) => { const u = [...packagesList]; u[idx].features = e.target.value.split(',').map(s=>s.trim()); setPackagesList(u); }} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-300 text-xs" placeholder="Comma separated features" />
                  </div>
                ))}
              </div>`;

const whyUsListUI = `
              <div className="space-y-4">
                <label className="block text-xs font-bold text-slate-300 mb-2">Why Us Feature Points</label>
                {whyUsList.map((wu, idx) => (
                  <div key={wu.id} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-emerald-400">FEATURE #{idx + 1}</span>
                    </div>
                    <input type="text" value={wu.title} onChange={(e) => { const u = [...whyUsList]; u[idx].title = e.target.value; setWhyUsList(u); }} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white text-xs font-bold" />
                    <textarea rows={2} value={wu.desc} onChange={(e) => { const u = [...whyUsList]; u[idx].desc = e.target.value; setWhyUsList(u); }} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-300 text-xs" />
                  </div>
                ))}
              </div>`;

const processListUI = `
              <div className="space-y-4">
                <label className="block text-xs font-bold text-slate-300 mb-2">Workflow Steps</label>
                {processList.map((stp, idx) => (
                  <div key={stp.step} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-indigo-400">STEP {stp.step}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input type="text" value={stp.title} onChange={(e) => { const u = [...processList]; u[idx].title = e.target.value; setProcessList(u); }} className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-white text-xs font-bold" />
                      <input type="text" value={stp.time} onChange={(e) => { const u = [...processList]; u[idx].time = e.target.value; setProcessList(u); }} className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-300 font-mono text-xs" />
                    </div>
                    <textarea rows={2} value={stp.desc} onChange={(e) => { const u = [...processList]; u[idx].desc = e.target.value; setProcessList(u); }} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-300 text-xs" />
                  </div>
                ))}
              </div>`;

content = content.replace(
  /<div>\s*<label className="block text-xs font-bold text-slate-300 mb-2">Services Subtext<\/label>\s*<textarea rows=\{2\} value=\{servSubtext\}[^>]*><\/textarea>\s*<\/div>/,
  `<div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Services Subtext</label>
                <textarea rows={2} value={servSubtext} onChange={(e) => setServSubtext(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-200 text-xs"></textarea>
              </div>
              ${servicesListUI}`
);

content = content.replace(
  /<div>\s*<label className="block text-xs font-bold text-slate-300 mb-2">Packages Subtitle<\/label>\s*<textarea rows=\{2\} value=\{pkgSubtext\}[^>]*><\/textarea>\s*<\/div>/,
  `<div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Packages Subtitle</label>
                <textarea rows={2} value={pkgSubtext} onChange={(e) => setPkgSubtext(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-200 text-xs"></textarea>
              </div>
              ${packagesListUI}`
);

content = content.replace(
  /<div>\s*<label className="block text-xs font-bold text-slate-300 mb-2">Section Subtext<\/label>\s*<textarea rows=\{2\} value=\{whySubtext\}[^>]*><\/textarea>\s*<\/div>/,
  `<div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Section Subtext</label>
                <textarea rows={2} value={whySubtext} onChange={(e) => setWhySubtext(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-200 text-xs"></textarea>
              </div>
              ${whyUsListUI}`
);

content = content.replace(
  /<div>\s*<label className="block text-xs font-bold text-slate-300 mb-2">Process Section Subtext<\/label>\s*<textarea rows=\{2\} value=\{procSubtext\}[^>]*><\/textarea>\s*<\/div>/,
  `<div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Process Section Subtext</label>
                <textarea rows={2} value={procSubtext} onChange={(e) => setProcSubtext(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-200 text-xs"></textarea>
              </div>
              ${processListUI}`
);

fs.writeFileSync('src/components/admin/HomepageEditor.jsx', content);
console.log('UI appended for all 4 lists!');
