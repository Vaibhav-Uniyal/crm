import { useEffect, useMemo } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  MarkerType,
  Handle,
  Position,
} from "@xyflow/react";
import { motion } from "framer-motion";

function FlowNode({ data }) {
  const active = data.active;
  const complete = data.complete;

  return (
    <div
      animate={
        active
          ? {
              boxShadow: `0 0 30px ${data.color || "#6366f1"}60`,
              scale: 1.05,
            }
          : { scale: 1 }
      }
      className={`px-6 py-5 rounded-xl border min-w-[180px] text-center transition-colors ${
        active
          ? "border-indigo-400 bg-indigo-500/20"
          : complete
            ? "border-emerald-500/50 bg-emerald-500/10"
            : "border-white/10 bg-zinc-900/80"
      }`}
    >
      <Handle type="target" position={data.targetPosition || Position.Left} className="!bg-zinc-600 !w-2 !h-2" />
      <div className="text-xl font-bold text-white tracking-wide">{data.label}</div>
      {data.sublabel && (
        <div
          initial={{ opacity: 0 }}
          animate={{ opacity: active ? 1 : 0.5 }}
          className="text-sm text-zinc-400 mt-2 font-medium"
        >
          {data.sublabel}
        </div>
      )}
      {active && (
        <div
          className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-cyan-400"
          animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
      <Handle type="source" position={data.sourcePosition || Position.Right} className="!bg-zinc-600 !w-2 !h-2" />
    </div>
  );
}

const nodeTypes = { custom: FlowNode };

export default function ReactFlowWorkflow({
  nodes: nodeDefs,
  edges: edgeDefs,
  activeNodeId,
  completedNodeIds = [],
  height = 480,
}) {
  const isActive = (id) => activeNodeId && activeNodeId.split(",").includes(id);
  const isComplete = (id) => completedNodeIds && completedNodeIds.some((c) => c.split(",").includes(id));

  const initialNodes = useMemo(
    () =>
      nodeDefs.map((n) => ({
        id: n.id,
        type: "custom",
        position: n.position,
        data: {
          label: n.label,
          sublabel: n.sublabel,
          color: n.color,
          targetPosition: n.targetPosition,
          sourcePosition: n.sourcePosition,
          active: isActive(n.id),
          complete: isComplete(n.id),
        },
      })),
    [nodeDefs, activeNodeId, completedNodeIds]
  );

  const initialEdges = useMemo(
    () =>
      edgeDefs.map((e) => ({
        id: e.id,
        source: e.source,
        target: e.target,
        animated: isActive(e.source) || isComplete(e.source),
        style: {
          stroke: isComplete(e.source) || isActive(e.source) ? "#6366f1" : "#3f3f46",
          strokeWidth: isActive(e.source) ? 2.5 : 1.5,
        },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#6366f1" },
      })),
    [edgeDefs, activeNodeId, completedNodeIds]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((n) => ({
        ...n,
        data: {
          ...n.data,
          active: isActive(n.id),
          complete: isComplete(n.id),
        },
      }))
    );
    setEdges((eds) =>
      eds.map((e) => ({
        ...e,
        animated: isActive(e.source) || isComplete(e.source),
        style: {
          ...e.style,
          stroke: isComplete(e.source) || isActive(e.source) ? "#6366f1" : "#3f3f46",
          strokeWidth: isActive(e.source) ? 2.5 : 1.5,
        },
      }))
    );
  }, [activeNodeId, completedNodeIds, setNodes, setEdges]);

  return (
    <div className="w-full" style={{ height }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.1 }}
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
        nodesConnectable={false}
        panOnDrag={false}
        zoomOnScroll={false}
      />
    </div>
  );
}
