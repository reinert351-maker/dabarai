
import React, { useState, useEffect, useRef } from 'react';
import { mapBiblicalNetwork } from '../services/gemini';
import { StudyItem } from '../types';
import * as d3 from 'd3';
import { Share2, Loader2, Sparkles, BookmarkPlus, Zap, Network as NetworkIcon, Info } from 'lucide-react';

const DabarNetwork: React.FC<{ onSave?: (item: Omit<StudyItem, 'id' | 'timestamp'>) => void, onActionXp?: (amt: number, reason: string) => void }> = ({ onSave, onActionXp }) => {
  const [reference, setReference] = useState('');
  const [isMapping, setIsMapping] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [nodes, setNodes] = useState<any[]>([]);
  const [links, setLinks] = useState<any[]>([]);

  const handleMap = async (e?: React.FormEvent, customRef?: string) => {
    if (e) e.preventDefault();
    const targetRef = customRef || reference;
    if (!targetRef.trim()) return;

    setIsMapping(true);
    setAnalysis(null);
    onActionXp?.(40, 'Mapeamento do Cânon');
    
    try {
      const data = await mapBiblicalNetwork(targetRef);
      setAnalysis(data);
      
      const lines = data.split('\n').filter(l => l.includes(':'));
      const newNodes = [{ id: targetRef, group: 1, label: targetRef }];
      const newLinks: any[] = [];

      lines.forEach((line, i) => {
        const parts = line.split(':');
        const nodeLabel = parts[0].trim();
        newNodes.push({ id: nodeLabel, group: 2, label: nodeLabel });
        newLinks.push({ source: targetRef, target: nodeLabel, value: 1 });
      });

      setNodes(newNodes);
      setLinks(newLinks);
    } catch (err) {
      setAnalysis("Erro ao mapear conexões.");
    } finally {
      setIsMapping(false);
    }
  };

  useEffect(() => {
    if (nodes.length === 0 || !svgRef.current) return;

    const width = 800;
    const height = 600;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(150))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
      .attr("stroke", "#f59e0b")
      .attr("stroke-opacity", 0.3)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 1);

    const node = svg.append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .call(d3.drag<any, any>()
        .on("start", (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on("end", (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        })
      )
      .on("click", (event, d) => {
        setReference(d.id);
        handleMap(undefined, d.id);
      });

    node.append("circle")
      .attr("r", (d: any) => d.group === 1 ? 25 : 15)
      .attr("fill", (d: any) => d.group === 1 ? "#f59e0b" : "#1e293b")
      .attr("stroke", "#f59e0b")
      .attr("stroke-width", 2);

    node.append("text")
      .text((d: any) => d.label)
      .attr("x", 0)
      .attr("y", 30)
      .attr("text-anchor", "middle")
      .attr("fill", "#f8fafc")
      .attr("font-size", "10px")
      .attr("font-weight", "bold")
      .attr("class", "uppercase tracking-widest pointer-events-none");

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    return () => simulation.stop();
  }, [nodes, links]);

  const handleSave = () => {
    if (analysis && onSave) {
      onSave({
        title: `Teia do Logos: ${reference}`,
        content: analysis,
        type: 'Connection'
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-700 pb-20 px-4">
      <div className="bg-sacred-soft/40 border-2 border-sacred p-10 md:p-16 rounded-[4rem] shadow-2xl text-center space-y-8 relative overflow-hidden">
        <div className="flex flex-col items-center gap-6 relative z-10">
          <div className="w-20 h-20 bg-accent rounded-[2rem] flex items-center justify-center text-sacred shadow-accent invert animate-pulse">
            <NetworkIcon size={40} />
          </div>
          <h2 className="text-4xl md:text-7xl font-divine font-black text-white uppercase tracking-tighter italic leading-none">Teia do Logos</h2>
          <p className="text-sacred-soft text-lg md:text-xl font-serif italic max-w-2xl mx-auto leading-relaxed">
            Navegue interativamente pela intertextualidade sagrada. Clique nos nós para explorar novas conexões.
          </p>
        </div>

        <form onSubmit={handleMap} className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto relative z-10">
          <input 
            type="text" 
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            placeholder="Ex: João 1:1 ou Isaías 53" 
            className="flex-1 bg-sacred/50 border-2 border-sacred rounded-2xl px-8 py-5 text-sacred font-bold focus:outline-none focus:border-accent text-lg"
          />
          <button 
            type="submit" 
            disabled={isMapping}
            className="px-12 py-5 bg-accent text-sacred rounded-2xl font-black text-xs uppercase tracking-widest hover:opacity-90 transition-all shadow-accent invert flex items-center justify-center gap-3"
          >
            {isMapping ? <Loader2 className="animate-spin" /> : <Zap />}
            Lançar Teia
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        <div className="xl:col-span-8 bg-sacred-soft border-2 border-sacred rounded-[4rem] overflow-hidden shadow-2xl relative min-h-[600px] flex items-center justify-center">
          {isMapping ? (
             <div className="flex flex-col items-center gap-6 text-center">
                <Loader2 className="animate-spin text-accent" size={60} />
                <p className="text-[10px] font-black text-sacred-soft uppercase tracking-[0.5em] animate-pulse">Tecendo fios intertextuais...</p>
             </div>
          ) : nodes.length > 0 ? (
            <svg ref={svgRef} width="100%" height="600" viewBox="0 0 800 600" className="cursor-move"></svg>
          ) : (
            <div className="flex flex-col items-center gap-6 text-center opacity-30">
               <NetworkIcon size={100} />
               <p className="text-xs font-black uppercase tracking-widest">Aguardando referência para mapear o Cânon.</p>
            </div>
          )}
        </div>

        <div className="xl:col-span-4 space-y-8">
           {analysis && (
             <div className="bg-sacred-soft/60 border-2 border-sacred p-8 rounded-[3.5rem] shadow-2xl animate-in slide-in-from-right-8 h-full flex flex-col">
                <div className="flex items-center justify-between mb-8 border-b border-sacred pb-6">
                   <div className="flex items-center gap-4">
                      <Sparkles className="text-accent" size={24} />
                      <h3 className="text-xl font-black text-sacred uppercase tracking-tighter italic">Relatório da Teia</h3>
                   </div>
                   <button onClick={handleSave} className="p-3 bg-accent text-sacred rounded-xl hover:opacity-90 transition-all invert shadow-xl">
                      <BookmarkPlus size={20} />
                   </button>
                </div>
                <div className="flex-1 overflow-y-auto no-scrollbar prose prose-invert max-w-none text-sacred font-serif text-lg leading-relaxed whitespace-pre-wrap italic">
                   {analysis}
                </div>
                <div className="mt-8 p-4 bg-sacred border border-sacred rounded-2xl flex items-center gap-3">
                   <Info size={16} className="text-accent" />
                   <span className="text-[9px] font-black text-sacred-soft uppercase tracking-widest">Clique nos círculos para navegar</span>
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default DabarNetwork;
