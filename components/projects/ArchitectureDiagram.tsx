import { useId } from "react";
import type { FlowGraph, ProjectDiagram } from "@/types/portfolio";

function Flow({ graph }: { graph: FlowGraph }) {
  const nodeNames = new Map(
    graph.stages.flat().map((node) => [node.id, node.label]),
  );
  return (
    <section
      className={`flow-graph flow-${graph.tone || "rest"}`}
      aria-label={graph.title}
      data-flow={graph.id}
    >
      <h5>{graph.title}</h5>
      <div className={graph.scope ? "flow-scope" : "flow-body"}>
        {graph.scope && <p className="flow-scope-label">{graph.scope}</p>}
        {graph.stages.map((stage, rank) => {
          const next = graph.stages[rank + 1];
          const edges = next
            ? graph.edges.filter(
                (edge) =>
                  stage.some((node) => node.id === edge.from) &&
                  next.some((node) => node.id === edge.to),
              )
            : [];
          return (
            <div
              className="flow-rank"
              key={stage.map((node) => node.id).join("-")}
            >
              <div
                className="flow-stage"
                style={{
                  gridTemplateColumns: `repeat(${stage.length}, minmax(0, 1fr))`,
                }}
              >
                {stage.map((node) => (
                  <div
                    className={`flow-node flow-role-${node.role || "process"} ${node.emphasis ? "flow-highlight" : ""}`}
                    key={node.id}
                    data-node={node.id}
                  >
                    <span className="flow-role">
                      {
                        {
                          client: "클라이언트",
                          server: "서버",
                          data: "데이터",
                          process: "처리",
                          state: "상태",
                          measurement: "측정",
                        }[node.role || "process"]
                      }
                    </span>
                    <strong>{node.label}</strong>
                    {node.detail && <small>{node.detail}</small>}
                  </div>
                ))}
              </div>
              {next && (
                <svg
                  className="flow-connectors"
                  viewBox="0 0 100 32"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  {edges.map((edge) => {
                    const x1 =
                      ((stage.findIndex((node) => node.id === edge.from) +
                        0.5) /
                        stage.length) *
                      100;
                    const x2 =
                      ((next.findIndex((node) => node.id === edge.to) + 0.5) /
                        next.length) *
                      100;
                    return (
                      <g key={`${edge.from}-${edge.to}`}>
                        <path
                          d={`M ${x1} 1 C ${x1} 16, ${x2} 16, ${x2} 29`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                          vectorEffect="non-scaling-stroke"
                          strokeDasharray={
                            edge.kind === "event" || graph.tone === "event"
                              ? "4 3"
                              : undefined
                          }
                        />
                        <polygon
                          points={`${x2 - 1},24 ${x2},30 ${x2 + 1},24`}
                          fill="currentColor"
                        />
                      </g>
                    );
                  })}
                </svg>
              )}
            </div>
          );
        })}
      </div>
      <ul className="sr-only" aria-label="노드 간 연결">
        {graph.edges.map((edge) => (
          <li key={`${edge.from}-${edge.to}`}>
            {nodeNames.get(edge.from)} → {nodeNames.get(edge.to)}
            {edge.label ? ` (${edge.label})` : ""}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function ArchitectureDiagram({
  diagram,
}: {
  diagram: ProjectDiagram;
}) {
  const captionId = useId();
  return (
    <figure
      className={`project-diagram diagram-${diagram.layout || "flow"}`}
      aria-labelledby={captionId}
    >
      <figcaption id={captionId} className="diagram-title">
        {diagram.title}
      </figcaption>
      {diagram.layout === "paths" && (
        <div className="diagram-legend">
          <span>
            <i /> REST · 조회 / 변경
          </span>
          <span>
            <i /> SSE · 이벤트 / 동기화
          </span>
        </div>
      )}
      <div className="diagram-graphs">
        {diagram.graphs.map((graph) => (
          <Flow key={graph.id} graph={graph} />
        ))}
      </div>
      {diagram.metric && (
        <div className="diagram-metric">
          <span>{diagram.metric.label}</span>
          <strong>
            {diagram.metric.before} <span aria-hidden="true">→</span>{" "}
            {diagram.metric.after}
          </strong>
          <p>{diagram.metric.note}</p>
        </div>
      )}
      {diagram.aside && (
        <aside className="diagram-aside">
          <strong>{diagram.aside.title}</strong>
          <p>{diagram.aside.description}</p>
        </aside>
      )}
      {diagram.caption && <p className="diagram-caption">{diagram.caption}</p>}
    </figure>
  );
}
