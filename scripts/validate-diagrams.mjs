import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

function readData(path, imports = {}) {
  const output = ts.transpileModule(fs.readFileSync(path, 'utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
  const dataModule = {exports:{}};
  vm.runInNewContext(output, {exports:dataModule.exports,module:dataModule,require:(name)=>{
    assert.ok(name in imports, `Unexpected runtime import: ${name}`);
    return imports[name];
  }});
  return dataModule.exports;
}
const {diagrams} = readData('data/diagrams.ts');
const {modoodoc} = readData('data/modoodoc.ts');
const {nadaun, nadaunLighthouse} = readData('data/nadaun.ts');
const {projects} = readData('data/featured-projects.ts', {'./diagrams':{diagrams}, './modoodoc':{modoodoc}, './nadaun':{nadaun}});
let graphCount = 0;
let edgeCount = 0;
for (const [key,diagram] of Object.entries(diagrams)) {
  assert.ok(diagram.graphs.length, `${key}: missing graph`);
  for (const graph of diagram.graphs) {
    const ranks = new Map();
    graph.stages.forEach((stage,rank)=>{
      assert.ok(stage.length > 0 && stage.length <= 2, `${graph.id}: mobile-readable branch count`);
      stage.forEach(node=>{
        assert.ok(!ranks.has(node.id), `${graph.id}: duplicate node ${node.id}`);
        ranks.set(node.id,rank);
      });
    });
    const seen = new Set();
    for(const edge of graph.edges){
      assert.ok(ranks.has(edge.from) && ranks.has(edge.to),`${graph.id}: missing edge endpoint`);
      assert.equal(ranks.get(edge.to),ranks.get(edge.from)+1,`${graph.id}: connection must advance exactly one visible stage`);
      const edgeId = `${edge.from}->${edge.to}`;
      assert.ok(!seen.has(edgeId),`${graph.id}: duplicate edge`);
      seen.add(edgeId);
      edgeCount++;
    }
    for(const [node,rank] of ranks){
      if(rank>0) assert.ok(graph.edges.some(e=>e.to===node),`${graph.id}: disconnected incoming node ${node}`);
      if(rank<graph.stages.length-1) assert.ok(graph.edges.some(e=>e.from===node),`${graph.id}: disconnected outgoing node ${node}`);
    }
    graphCount++;
  }
}
const mono = diagrams.monorepo.graphs[0];
assert.ok(mono.edges.some(e=>e.from==='web' && e.to==='server'));
assert.ok(mono.edges.some(e=>e.from==='admin' && e.to==='server'));
assert.ok(!mono.edges.some(e=>e.from==='web' && e.to==='admin'));
for(const project of projects){
  assert.ok(project.slides.length>=4);
  assert.equal(project.slides[0].kind,'overview');
  const hasVisual = slide => slide.diagram || slide.garageVisual || slide.modoodocVisual || slide.nadaunVisual || slide.experience || slide.verification || slide.image;
  assert.ok(hasVisual(project.slides[0]), `${project.id}: missing overview visual`);
  project.slides.forEach(slide=>assert.ok(hasVisual(slide) || slide.kind==='media', `${project.id}/${slide.label}: missing visual`));
}
assert.deepEqual(Array.from(projects, project=>project.id), ['my-garage','nadaun','modoodoc','vacatio']);
assert.equal(projects.find(project=>project.id==='modoodoc').slides.length,5);
assert.equal(projects.length,4);
console.log(`Validated ${Object.keys(diagrams).length} diagrams, ${graphCount} graphs, ${edgeCount} directed connections, and all ${projects.length} active project carousels.`);

assert.deepEqual(Array.from(modoodoc.slides, s=>s.label), ['Overview','DB Migration','Performance','Admin','Personalization']);
assert.equal(new Set(modoodoc.slides.map(s=>s.modoodocVisual)).size, 5);
assert.equal(modoodoc.slides[0].caseStudy, undefined);
modoodoc.slides.slice(1,4).forEach(s=>assert.ok(s.caseStudy?.problem && s.caseStudy?.solution && s.caseStudy?.result));
assert.equal(modoodoc.slides[4].sections.length, 2);
assert.equal(modoodoc.slides[4].caseStudy, undefined);
modoodoc.slides[4].sections.forEach(s=>assert.ok(s.caseStudy?.problem && s.caseStudy?.solution && s.caseStudy?.result));
assert.ok(!/80%|1:N|1 : N|9초|2초|20만|100만|HospitalListOptimizer|hospital_nearby|확인 예정|준비 중/.test(JSON.stringify(modoodoc)), 'Public company content must exclude internal identifiers and restricted metrics');

assert.deepEqual(Array.from(nadaun.slides,s=>s.label), ['Overview','CI/CD & Operations','Service Workflow','Authentication','Session Stability','Admin UX','Performance & SEO']);
assert.equal(nadaun.slides[0].caseStudy,undefined);
nadaun.slides.slice(1).forEach(s=>assert.ok(s.caseStudy?.problem && s.caseStudy?.solution && s.caseStudy?.result));
assert.deepEqual(Array.from(nadaunLighthouse.scores,s=>s.value),[95,98,73,92]);
assert.equal(nadaunLighthouse.lcp,'1.6초');
assert.equal(nadaunLighthouse.cls,'0');
assert.ok(!nadaun.slides.some(s=>s.label==='Gallery'));
nadaun.gallery.forEach(item=>assert.ok(fs.existsSync(`public${item.image}`)));
