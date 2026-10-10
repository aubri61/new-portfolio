export type FlowNode = {
  id: string;
  label: string;
  detail?: string;
  role?: "client" | "server" | "data" | "process" | "state" | "measurement";
  emphasis?: boolean;
};
export type FlowEdge = {
  from: string;
  to: string;
  label?: string;
  kind?: "request" | "event" | "data";
};
export type FlowGraph = {
  id: string;
  title: string;
  scope?: string;
  stages: FlowNode[][];
  edges: FlowEdge[];
  tone?: "rest" | "event";
};
export type ProjectDiagram = {
  title: string;
  layout?: "flow" | "compare" | "paths";
  graphs: FlowGraph[];
  aside?: { title: string; description: string };
  metric?: { label: string; before: string; after: string; note: string };
  caption?: string;
};
export type ProjectSlide = {
  kind:
    | "media"
    | "overview"
    | "architecture"
    | "engineering"
    | "problem"
    | "personalization"
    | "experiment";
  label: string;
  title: string;
  description: string;
  points: string[];
  image?: string;
  imageAlt?: string;
  visualIntro?: string;
  diagram?: ProjectDiagram;
  note?: string;
  code?: { language: string; content: string };
};
export type Project = {
  id: string;
  name: string;
  englishName: string;
  category: string;
  featured?: boolean;
  description: string;
  role: string;
  period: string;
  stack: string[];
  link?: { label: string; url: string };
  slides: ProjectSlide[];
  todos: string[];
};
export type Experience = {
  company: string;
  period: string;
  role: string;
  description: string;
  stack: string[];
  details: string[];
};
export type OtherProject = {
  videoUrl?: string;
  name: string;
  category: string;
  period: string;
  description: string;
  stack: string[];
  image?: string;
  link?: { label: string; url: string };
  todo?: string;
};
