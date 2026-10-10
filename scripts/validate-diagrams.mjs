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
const {projects} = readData('data/featured-projects.ts', {'./diagrams':{diagrams}});
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
const personal = diagrams.personalization.graphs[0];
assert.ok(personal.edges.filter(e=>e.to==='home').length===2, 'Personalization must merge both data paths');
assert.ok(!personal.stages.flat().some(n=>n.label.includes('Hackle')), 'Hackle must stay outside the data pipeline');
const garage = diagrams.garageArchitecture.graphs;
assert.deepEqual(Array.from(garage,g=>g.tone), ['rest','event']);
for(const project of projects){
  assert.ok(project.slides.length>=4);
  assert.equal(project.slides[0].kind,'overview');
  assert.ok(project.slides[0].diagram && project.slides[0].visualIntro, `${project.id}: summary must include architecture and intro`);
  assert.equal(project.slides.at(-1).kind,'media');
  project.slides.filter(s=>s.kind!=='media').forEach(slide=>assert.ok(slide.diagram, `${project.id}/${slide.label}: missing concrete diagram`));
}
assert.deepEqual(Array.from(projects, project=>project.id), ['my-garage','modoodoc','vacatio','nadaun']);
assert.equal(projects.find(project=>project.id==='modoodoc').slides.length,6);
assert.equal(projects.length,4);
console.log(`Validated ${Object.keys(diagrams).length} diagrams, ${graphCount} graphs, ${edgeCount} directed connections, and all ${projects.length} active project carousels.`);
