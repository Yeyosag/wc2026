import{useState,useEffect}from"react";
import{SD}from"./squads.js";
const GCOL={A:"#ef4444",B:"#f97316",C:"#eab308",D:"#22c55e",E:"#06b6d4",F:"#818cf8",G:"#ec4899",H:"#f59e0b",I:"#10b981",J:"#60a5fa",K:"#f43f5e",L:"#a855f7"};
const FLAGS={"México":"🇲🇽","Sudáfrica":"🇿🇦","Corea del Sur":"🇰🇷","República Checa":"🇨🇿","Canadá":"🇨🇦","Bosnia y Herzegovina":"🇧🇦","Catar":"🇶🇦","Suiza":"🇨🇭","Brasil":"🇧🇷","Marruecos":"🇲🇦","Haití":"🇭🇹","Escocia":"🏴󠁧󠁢󠁳󠁣󠁴󠁿","EE.UU.":"🇺🇸","Paraguay":"🇵🇾","Australia":"🇦🇺","Turquía":"🇹🇷","Alemania":"🇩🇪","Curaçao":"🇨🇼","Costa de Marfil":"🇨🇮","Ecuador":"🇪🇨","Países Bajos":"🇳🇱","Japón":"🇯🇵","Suecia":"🇸🇪","Túnez":"🇹🇳","Bélgica":"🇧🇪","Egipto":"🇪🇬","Irán":"🇮🇷","Nueva Zelanda":"🇳🇿","España":"🇪🇸","Cabo Verde":"🇨🇻","Arabia Saudita":"🇸🇦","Uruguay":"🇺🇾","Francia":"🇫🇷","Senegal":"🇸🇳","Irak":"🇮🇶","Noruega":"🇳🇴","Argentina":"🇦🇷","Argelia":"🇩🇿","Austria":"🇦🇹","Jordania":"🇯🇴","Portugal":"🇵🇹","RD Congo":"🇨🇩","Uzbekistán":"🇺🇿","Colombia":"🇨🇴","Inglaterra":"🏴󠁧󠁢󠁥󠁮󠁧󠁿","Croacia":"🇭🇷","Ghana":"🇬🇭","Panamá":"🇵🇦"};
const GROUPS={A:["México","Sudáfrica","Corea del Sur","República Checa"],B:["Canadá","Bosnia y Herzegovina","Catar","Suiza"],C:["Brasil","Marruecos","Haití","Escocia"],D:["EE.UU.","Paraguay","Australia","Turquía"],E:["Alemania","Curaçao","Costa de Marfil","Ecuador"],F:["Países Bajos","Japón","Suecia","Túnez"],G:["Bélgica","Egipto","Irán","Nueva Zelanda"],H:["España","Cabo Verde","Arabia Saudita","Uruguay"],I:["Francia","Senegal","Irak","Noruega"],J:["Argentina","Argelia","Austria","Jordania"],K:["Portugal","RD Congo","Uzbekistán","Colombia"],L:["Inglaterra","Croacia","Ghana","Panamá"]};
const TGRP={};Object.entries(GROUPS).forEach(([g,ts])=>ts.forEach(t=>TGRP[t]=g));
const ALL_TEAMS=Object.values(GROUPS).flat();
const MX_V=["Estadio Azteca","Estadio Akron","Estadio BBVA"];
const CA_V=["BMO Field","BC Place"];
const STADIUMS=[{name:"Estadio Azteca",city:"Ciudad de México",country:"México",flag:"🇲🇽",cap:87600,roof:"Abierto",special:"3 inauguraciones mundialistas: 1970, 1986 y 2026"},{name:"Estadio Akron",city:"Zapopan · Guadalajara",country:"México",flag:"🇲🇽",cap:49850,roof:"Abierto",special:"Solo etapa de grupos"},{name:"Estadio BBVA",city:"Monterrey",country:"México",flag:"🇲🇽",cap:53500,roof:"Abierto",special:""},{name:"MetLife Stadium",city:"East Rutherford · Nueva York",country:"EE.UU.",flag:"🇺🇸",cap:82500,roof:"Abierto",special:"🏆 SEDE DE LA FINAL — 19 Jul",isFinal:true},{name:"AT&T Stadium",city:"Arlington · Dallas",country:"EE.UU.",flag:"🇺🇸",cap:80000,roof:"Retráctil",special:"9 partidos · SEMIFINAL",isSemi:true},{name:"SoFi Stadium",city:"Inglewood · Los Ángeles",country:"EE.UU.",flag:"🇺🇸",cap:70000,roof:"Translúcido",special:"Partido inaugural EE.UU. (12 Jun)"},{name:"Levi's Stadium",city:"Santa Clara · San Francisco",country:"EE.UU.",flag:"🇺🇸",cap:68500,roof:"Abierto",special:""},{name:"Lumen Field",city:"Seattle",country:"EE.UU.",flag:"🇺🇸",cap:69000,roof:"Parcial",special:""},{name:"Gillette Stadium",city:"Foxborough · Boston",country:"EE.UU.",flag:"🇺🇸",cap:65000,roof:"Abierto",special:""},{name:"Hard Rock Stadium",city:"Miami Gardens · Miami",country:"EE.UU.",flag:"🇺🇸",cap:65000,roof:"Abierto",special:"🥉 Tercer Lugar — 18 Jul"},{name:"Mercedes-Benz Stadium",city:"Atlanta",country:"EE.UU.",flag:"🇺🇸",cap:71000,roof:"Retráctil",special:"SEMIFINAL",isSemi:true},{name:"Arrowhead Stadium",city:"Kansas City",country:"EE.UU.",flag:"🇺🇸",cap:76000,roof:"Abierto",special:""},{name:"Lincoln Financial Field",city:"Philadelphia",country:"EE.UU.",flag:"🇺🇸",cap:69000,roof:"Abierto",special:"Ceremonia especial 4 Jul"},{name:"NRG Stadium",city:"Houston",country:"EE.UU.",flag:"🇺🇸",cap:72000,roof:"Retráctil",special:"Ceremonia especial 4 Jul"},{name:"BMO Field",city:"Toronto",country:"Canadá",flag:"🇨🇦",cap:45500,roof:"Abierto",special:"Partido inaugural Canadá (12 Jun)"},{name:"BC Place",city:"Vancouver",country:"Canadá",flag:"🇨🇦",cap:54500,roof:"Retráctil inflable",special:""}];
const RAW=[[1,"A","México","Sudáfrica","2026-06-11","3:00 PM","Estadio Azteca","Ciudad de México","Fase de Grupos",1],[2,"A","Corea del Sur","República Checa","2026-06-11","10:00 PM","Estadio Akron","Guadalajara","Fase de Grupos",1],[3,"B","Canadá","Bosnia y Herzegovina","2026-06-12","3:00 PM","BMO Field","Toronto","Fase de Grupos",1],[4,"D","EE.UU.","Paraguay","2026-06-12","9:00 PM","SoFi Stadium","Los Ángeles","Fase de Grupos",1],[5,"B","Catar","Suiza","2026-06-13","3:00 PM","Levi's Stadium","San Francisco","Fase de Grupos",1],[6,"C","Brasil","Marruecos","2026-06-13","6:00 PM","MetLife Stadium","Nueva York / NJ","Fase de Grupos",1],[7,"C","Haití","Escocia","2026-06-13","9:00 PM","Gillette Stadium","Boston","Fase de Grupos",1],[8,"D","Australia","Turquía","2026-06-14","12:00 AM","BC Place","Vancouver","Fase de Grupos",1],[9,"E","Alemania","Curaçao","2026-06-14","1:00 PM","NRG Stadium","Houston","Fase de Grupos",1],[10,"F","Países Bajos","Japón","2026-06-14","4:00 PM","AT&T Stadium","Dallas","Fase de Grupos",1],[11,"E","Costa de Marfil","Ecuador","2026-06-14","7:00 PM","Lincoln Financial Field","Philadelphia","Fase de Grupos",1],[12,"F","Suecia","Túnez","2026-06-14","10:00 PM","Estadio BBVA","Monterrey","Fase de Grupos",1],[13,"H","España","Cabo Verde","2026-06-15","12:00 PM","Mercedes-Benz Stadium","Atlanta","Fase de Grupos",1],[14,"G","Bélgica","Egipto","2026-06-15","3:00 PM","Lumen Field","Seattle","Fase de Grupos",1],[15,"H","Arabia Saudita","Uruguay","2026-06-15","6:00 PM","Hard Rock Stadium","Miami","Fase de Grupos",1],[16,"G","Irán","Nueva Zelanda","2026-06-15","9:00 PM","SoFi Stadium","Los Ángeles","Fase de Grupos",1],[17,"I","Francia","Senegal","2026-06-16","3:00 PM","MetLife Stadium","Nueva York / NJ","Fase de Grupos",1],[18,"I","Irak","Noruega","2026-06-16","6:00 PM","Gillette Stadium","Boston","Fase de Grupos",1],[19,"J","Argentina","Argelia","2026-06-16","9:00 PM","Arrowhead Stadium","Kansas City","Fase de Grupos",1],[20,"J","Austria","Jordania","2026-06-17","12:00 AM","Levi's Stadium","San Francisco","Fase de Grupos",1],[21,"K","Portugal","RD Congo","2026-06-17","1:00 PM","NRG Stadium","Houston","Fase de Grupos",1],[22,"L","Inglaterra","Croacia","2026-06-17","4:00 PM","AT&T Stadium","Dallas","Fase de Grupos",1],[23,"L","Ghana","Panamá","2026-06-17","7:00 PM","BMO Field","Toronto","Fase de Grupos",1],[24,"K","Uzbekistán","Colombia","2026-06-17","10:00 PM","Estadio Azteca","Ciudad de México","Fase de Grupos",1],[25,"A","República Checa","Sudáfrica","2026-06-18","12:00 PM","Mercedes-Benz Stadium","Atlanta","Fase de Grupos",2],[26,"B","Suiza","Bosnia y Herzegovina","2026-06-18","3:00 PM","SoFi Stadium","Los Ángeles","Fase de Grupos",2],[27,"B","Canadá","Catar","2026-06-18","6:00 PM","BC Place","Vancouver","Fase de Grupos",2],[28,"A","México","Corea del Sur","2026-06-18","9:00 PM","Estadio Akron","Guadalajara","Fase de Grupos",2],[29,"D","EE.UU.","Australia","2026-06-19","3:00 PM","Lumen Field","Seattle","Fase de Grupos",2],[30,"C","Escocia","Marruecos","2026-06-19","6:00 PM","Gillette Stadium","Boston","Fase de Grupos",2],[31,"C","Brasil","Haití","2026-06-19","8:30 PM","Lincoln Financial Field","Philadelphia","Fase de Grupos",2],[32,"D","Turquía","Paraguay","2026-06-19","11:00 PM","Levi's Stadium","San Francisco","Fase de Grupos",2],[33,"F","Países Bajos","Suecia","2026-06-20","1:00 PM","NRG Stadium","Houston","Fase de Grupos",2],[34,"E","Alemania","Costa de Marfil","2026-06-20","4:00 PM","BMO Field","Toronto","Fase de Grupos",2],[35,"E","Ecuador","Curaçao","2026-06-20","8:00 PM","Arrowhead Stadium","Kansas City","Fase de Grupos",2],[36,"F","Túnez","Japón","2026-06-21","12:00 AM","Estadio BBVA","Monterrey","Fase de Grupos",2],[37,"H","España","Arabia Saudita","2026-06-21","12:00 PM","Mercedes-Benz Stadium","Atlanta","Fase de Grupos",2],[38,"G","Bélgica","Irán","2026-06-21","3:00 PM","SoFi Stadium","Los Ángeles","Fase de Grupos",2],[39,"H","Uruguay","Cabo Verde","2026-06-21","6:00 PM","Hard Rock Stadium","Miami","Fase de Grupos",2],[40,"G","Nueva Zelanda","Egipto","2026-06-21","9:00 PM","BC Place","Vancouver","Fase de Grupos",2],[41,"J","Argentina","Austria","2026-06-22","1:00 PM","AT&T Stadium","Dallas","Fase de Grupos",2],[42,"I","Francia","Irak","2026-06-22","5:00 PM","Lincoln Financial Field","Philadelphia","Fase de Grupos",2],[43,"I","Noruega","Senegal","2026-06-22","8:00 PM","MetLife Stadium","Nueva York / NJ","Fase de Grupos",2],[44,"J","Jordania","Argelia","2026-06-22","11:00 PM","Levi's Stadium","San Francisco","Fase de Grupos",2],[45,"K","Portugal","Uzbekistán","2026-06-23","1:00 PM","NRG Stadium","Houston","Fase de Grupos",2],[46,"L","Inglaterra","Ghana","2026-06-23","4:00 PM","Gillette Stadium","Boston","Fase de Grupos",2],[47,"L","Panamá","Croacia","2026-06-23","7:00 PM","BMO Field","Toronto","Fase de Grupos",2],[48,"K","Colombia","RD Congo","2026-06-23","10:00 PM","Estadio Akron","Guadalajara","Fase de Grupos",2],[49,"B","Suiza","Canadá","2026-06-24","3:00 PM","BC Place","Vancouver","Fase de Grupos",3],[50,"B","Bosnia y Herzegovina","Catar","2026-06-24","3:00 PM","Lumen Field","Seattle","Fase de Grupos",3],[51,"C","Escocia","Brasil","2026-06-24","6:00 PM","Hard Rock Stadium","Miami","Fase de Grupos",3],[52,"C","Marruecos","Haití","2026-06-24","6:00 PM","Mercedes-Benz Stadium","Atlanta","Fase de Grupos",3],[53,"A","República Checa","México","2026-06-24","9:00 PM","Estadio Azteca","Ciudad de México","Fase de Grupos",3],[54,"A","Sudáfrica","Corea del Sur","2026-06-24","9:00 PM","Estadio BBVA","Monterrey","Fase de Grupos",3],[55,"E","Curaçao","Costa de Marfil","2026-06-25","4:00 PM","Lincoln Financial Field","Philadelphia","Fase de Grupos",3],[56,"E","Ecuador","Alemania","2026-06-25","4:00 PM","MetLife Stadium","Nueva York / NJ","Fase de Grupos",3],[57,"F","Japón","Suecia","2026-06-25","7:00 PM","AT&T Stadium","Dallas","Fase de Grupos",3],[58,"F","Túnez","Países Bajos","2026-06-25","7:00 PM","Arrowhead Stadium","Kansas City","Fase de Grupos",3],[59,"D","Turquía","EE.UU.","2026-06-25","10:00 PM","SoFi Stadium","Los Ángeles","Fase de Grupos",3],[60,"D","Paraguay","Australia","2026-06-25","10:00 PM","Levi's Stadium","San Francisco","Fase de Grupos",3],[61,"I","Noruega","Francia","2026-06-26","3:00 PM","Gillette Stadium","Boston","Fase de Grupos",3],[62,"I","Senegal","Irak","2026-06-26","3:00 PM","BMO Field","Toronto","Fase de Grupos",3],[63,"H","Cabo Verde","Arabia Saudita","2026-06-26","8:00 PM","NRG Stadium","Houston","Fase de Grupos",3],[64,"H","Uruguay","España","2026-06-26","8:00 PM","Estadio Akron","Guadalajara","Fase de Grupos",3],[65,"G","Egipto","Irán","2026-06-26","11:00 PM","Lumen Field","Seattle","Fase de Grupos",3],[66,"G","Nueva Zelanda","Bélgica","2026-06-26","11:00 PM","BC Place","Vancouver","Fase de Grupos",3],[67,"L","Panamá","Inglaterra","2026-06-27","5:00 PM","MetLife Stadium","Nueva York / NJ","Fase de Grupos",3],[68,"L","Croacia","Ghana","2026-06-27","5:00 PM","Lincoln Financial Field","Philadelphia","Fase de Grupos",3],[69,"K","Colombia","Portugal","2026-06-27","7:30 PM","Hard Rock Stadium","Miami","Fase de Grupos",3],[70,"K","RD Congo","Uzbekistán","2026-06-27","7:30 PM","Mercedes-Benz Stadium","Atlanta","Fase de Grupos",3],[71,"J","Argelia","Austria","2026-06-27","10:00 PM","Arrowhead Stadium","Kansas City","Fase de Grupos",3],[72,"J","Jordania","Argentina","2026-06-27","10:00 PM","AT&T Stadium","Dallas","Fase de Grupos",3],[73,null,"2do A","2do B","2026-06-28","3:00 PM","SoFi Stadium","Los Ángeles","Ronda de 32",null],[74,null,"1ro E","Mejor 3ro","2026-06-29","4:30 PM","Gillette Stadium","Boston","Ronda de 32",null],[75,null,"1ro F","2do C","2026-06-29","9:00 PM","Estadio BBVA","Monterrey","Ronda de 32",null],[76,null,"1ro C","2do F","2026-06-29","1:00 PM","NRG Stadium","Houston","Ronda de 32",null],[77,null,"1ro I","Mejor 3ro","2026-06-30","5:00 PM","MetLife Stadium","Nueva York / NJ","Ronda de 32",null],[78,null,"2do E","2do I","2026-06-30","1:00 PM","AT&T Stadium","Dallas","Ronda de 32",null],[79,null,"1ro A","Mejor 3ro","2026-06-30","9:00 PM","Estadio Azteca","Ciudad de México","Ronda de 32",null],[80,null,"1ro L","Mejor 3ro","2026-07-01","12:00 PM","Mercedes-Benz Stadium","Atlanta","Ronda de 32",null],[81,null,"1ro D","Mejor 3ro","2026-07-01","8:00 PM","Levi's Stadium","San Francisco","Ronda de 32",null],[82,null,"1ro G","Mejor 3ro","2026-07-01","4:00 PM","Lumen Field","Seattle","Ronda de 32",null],[83,null,"2do K","2do L","2026-07-02","7:00 PM","BMO Field","Toronto","Ronda de 32",null],[84,null,"1ro H","2do J","2026-07-02","3:00 PM","SoFi Stadium","Los Ángeles","Ronda de 32",null],[85,null,"1ro B","Mejor 3ro","2026-07-02","11:00 PM","BC Place","Vancouver","Ronda de 32",null],[86,null,"1ro J","2do H","2026-07-03","6:00 PM","Hard Rock Stadium","Miami","Ronda de 32",null],[87,null,"1ro K","Mejor 3ro","2026-07-03","9:30 PM","Arrowhead Stadium","Kansas City","Ronda de 32",null],[88,null,"2do D","2do G","2026-07-03","2:00 PM","AT&T Stadium","Dallas","Ronda de 32",null],[89,null,"G73 vs G75","→","2026-07-04","5:00 PM","Lincoln Financial Field","Philadelphia","Octavos de Final",null],[90,null,"G74 vs G77","→","2026-07-04","1:00 PM","NRG Stadium","Houston","Octavos de Final",null],[91,null,"G76 vs G78","→","2026-07-05","4:00 PM","MetLife Stadium","Nueva York / NJ","Octavos de Final",null],[92,null,"G79 vs G80","→","2026-07-05","8:00 PM","Estadio Azteca","Ciudad de México","Octavos de Final",null],[93,null,"G83 vs G84","→","2026-07-06","3:00 PM","AT&T Stadium","Dallas","Octavos de Final",null],[94,null,"G81 vs G82","→","2026-07-06","8:00 PM","Lumen Field","Seattle","Octavos de Final",null],[95,null,"G86 vs G88","→","2026-07-07","12:00 PM","Mercedes-Benz Stadium","Atlanta","Octavos de Final",null],[96,null,"G85 vs G87","→","2026-07-07","4:00 PM","BC Place","Vancouver","Octavos de Final",null],[97,null,"G89 vs G90","→","2026-07-09","4:00 PM","Gillette Stadium","Boston","Cuartos de Final",null],[98,null,"G93 vs G94","→","2026-07-10","3:00 PM","SoFi Stadium","Los Ángeles","Cuartos de Final",null],[99,null,"G91 vs G92","→","2026-07-11","5:00 PM","Hard Rock Stadium","Miami","Cuartos de Final",null],[100,null,"G95 vs G96","→","2026-07-11","9:00 PM","Arrowhead Stadium","Kansas City","Cuartos de Final",null],[101,null,"G97 vs G98","→","2026-07-14","3:00 PM","AT&T Stadium","Dallas","Semifinal",null],[102,null,"G99 vs G100","→","2026-07-15","3:00 PM","Mercedes-Benz Stadium","Atlanta","Semifinal",null],[103,null,"Perdedor SF1","Perdedor SF2","2026-07-18","5:00 PM","Hard Rock Stadium","Miami","Tercer Lugar",null],[104,null,"Campeón SF1","Campeón SF2","2026-07-19","3:00 PM","MetLife Stadium","Nueva York / NJ","⚽ GRAN FINAL",null]];
const MATCHES=RAW.map(([id,group,home,away,date,time,venue,city,stage,md])=>({id,group,home,away,date,time,venue,city,stage,md}));
const STADIUM_GROUPS={};MATCHES.filter(m=>m.stage==="Fase de Grupos").forEach(m=>{if(!STADIUM_GROUPS[m.venue])STADIUM_GROUPS[m.venue]=new Set();STADIUM_GROUPS[m.venue].add(m.group);});
const fmtDate=d=>{const dt=new Date(d+"T12:00:00");return dt.toLocaleDateString("es-ES",{weekday:"long",day:"numeric",month:"long",year:"numeric"});};
const MONTHS={enero:1,febrero:2,marzo:3,abril:4,mayo:5,junio:6,julio:7,agosto:8,septiembre:9,octubre:10,noviembre:11,diciembre:12,jun:6,jul:7,ene:1,feb:2,mar:3,abr:4,ago:8,sep:9,oct:10,nov:11,dic:12};
const smartFilter=(q,matches)=>{
  if(!q.trim())return{list:matches,label:null};
  const ql=q.toLowerCase().trim();
  for(const[mon,num]of Object.entries(MONTHS)){if(ql.includes(mon)){const dm=ql.match(/\b(\d{1,2})\b/);const day=dm?parseInt(dm[1]):null;const mo=String(num).padStart(2,"0");if(day&&day<=31){const ds="2026-"+mo+"-"+String(day).padStart(2,"0");const r=matches.filter(m=>m.date===ds);if(r.length)return{list:r,label:"📅 "+day+" de "+mon};}const r=matches.filter(m=>m.date.startsWith("2026-"+mo));if(r.length)return{list:r,label:"📅 "+mon+" 2026"};}}
  if(["méx","mex","méxico","mexico"].some(k=>ql.startsWith(k)&&ql.length>=3))return{list:matches.filter(m=>MX_V.includes(m.venue)),label:"🇲🇽 Partidos en México"};
  if(["can","canadá","canada"].some(k=>ql.startsWith(k)&&ql.length>=3))return{list:matches.filter(m=>CA_V.includes(m.venue)),label:"🇨🇦 Partidos en Canadá"};
  if(["usa","ee.uu","estados","eeuu"].some(k=>ql.startsWith(k)&&ql.length>=2))return{list:matches.filter(m=>![...MX_V,...CA_V].includes(m.venue)),label:"🇺🇸 Partidos en EE.UU."};
  const gM=ql.match(/^(?:grupo\s+|group\s+)?([a-l])$/);if(gM){const g=gM[1].toUpperCase();return{list:matches.filter(m=>m.group===g),label:"Grupo "+g};}
  const stages=[["semifinal","Semifinal"],["gran final","GRAN FINAL"],["final","GRAN FINAL"],["cuartos","Cuartos de Final"],["octavos","Octavos de Final"],["ronda de 32","Ronda de 32"],["grupos","Fase de Grupos"],["tercer","Tercer Lugar"]];
  for(const[k,v]of stages){if(ql.includes(k)){const r=matches.filter(m=>m.stage.toLowerCase().includes(v.toLowerCase()));if(r.length)return{list:r,label:v};}}
  const list=matches.filter(m=>[m.home,m.away,m.venue,m.city,m.stage,m.group?"grupo "+m.group:""].join(" ").toLowerCase().includes(ql));
  return{list,label:'"'+q+'"'};
};
export default function App(){
  const[tab,setTab]=useState("schedule");
  const[q,setQ]=useState("");
  const[scores,setScores]=useState(()=>{try{const s=localStorage.getItem('wc2026_scores');return s?JSON.parse(s):{};}catch{return{};}});
  const[expTeam,setExpTeam]=useState(null);
  const[tSearch,setTSearch]=useState("");
  const[isMobile,setIsMobile]=useState(window.innerWidth<640);
  useEffect(()=>{const h=()=>setIsMobile(window.innerWidth<640);window.addEventListener("resize",h);return()=>window.removeEventListener("resize",h);},[]);
  const{list:filtered,label:searchLabel}=smartFilter(q,MATCHES);
  const byDate={};filtered.forEach(m=>{if(!byDate[m.date])byDate[m.date]=[];byDate[m.date].push(m);});
  const visTeams=ALL_TEAMS.filter(t=>!tSearch||t.toLowerCase().includes(tSearch.toLowerCase()));
  const posLabel={POR:"Porteros",DEF:"Defensas",MED:"Mediocampistas",DEL:"Delanteros"};
  const posCol={POR:"#06b6d4",DEF:"#22c55e",MED:"#f59e0b",DEL:"#ef4444"};
  const px=isMobile?"12px":"24px";
  const setScore=(id,side,val)=>setScores(p=>{const n={...p,[id]:{...p[id],[side]:val.replace(/\D/,"").slice(0,2)}};try{localStorage.setItem('wc2026_scores',JSON.stringify(n));}catch{}return n;});
  const Chip=({label,value,color})=>{const active=q===value;return(<button onClick={()=>setQ(active?"":value)} style={{display:"inline-flex",alignItems:"center",gap:5,padding:"9px 16px",border:"2px solid "+(active?color:color+"55"),borderRadius:999,background:active?color:color+"18",color:active?"white":color,cursor:"pointer",fontSize:isMobile?12:13,fontWeight:600,whiteSpace:"nowrap",transition:"all 0.15s",minHeight:40,boxShadow:active?"0 2px 12px "+color+"55":"none"}}>{label}</button>);};
  return(
    <div style={{minHeight:"100vh",background:"var(--color-background-tertiary)",fontFamily:"var(--font-sans)"}}>
      <div style={{background:"linear-gradient(135deg,#0f172a 0%,#1e1b4b 60%,#0f172a 100%)",borderBottom:"0.5px solid rgba(255,255,255,0.08)",padding:isMobile?"14px 12px 0":"20px 24px 0"}}>
        <div style={{maxWidth:1060,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
            <div style={{width:isMobile?44:56,height:isMobile?44:56,borderRadius:14,background:"linear-gradient(135deg,#1e40af,#7c3aed)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:isMobile?24:30,flexShrink:0}}>⚽</div>
            <div>
              <h1 style={{margin:0,fontSize:isMobile?18:24,fontWeight:700,color:"#ffffff",letterSpacing:-0.5}}>FIFA World Cup 2026™</h1>
              <p style={{margin:"2px 0 0",fontSize:isMobile?11:13,color:"rgba(255,255,255,0.75)"}}>🇲🇽 México · 🇨🇦 Canadá · 🇺🇸 EE.UU. · 11 Jun – 19 Jul 2026 · Creado por Ing. Sergio Arroyo — sergio@agenticgrowth.studio</p>
            </div>
          </div>
          <div style={{display:"flex",overflowX:"auto",WebkitOverflowScrolling:"touch",scrollbarWidth:"none",borderTop:"0.5px solid rgba(255,255,255,0.1)"}}>
            {[["schedule","📅",isMobile?"Cal.":"Calendario"],["groups","⚽","Grupos"],["stadiums","🏟️","Estadios"],["teams","🌎","Selecciones"]].map(([id,ic,lbl])=>(
              <button key={id} onClick={()=>setTab(id)} style={{flexShrink:0,flex:1,padding:isMobile?"10px 6px":"14px 8px",border:"none",borderBottom:"3px solid "+(tab===id?"#60a5fa":"transparent"),background:"transparent",color:tab===id?"#60a5fa":"rgba(255,255,255,0.55)",fontWeight:tab===id?700:400,cursor:"pointer",fontSize:isMobile?12:14,display:"flex",flexDirection:"column",alignItems:"center",gap:2,transition:"all 0.15s",minWidth:isMobile?60:0}}>
                <span style={{fontSize:isMobile?18:20}}>{ic}</span><span>{lbl}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div style={{maxWidth:1060,margin:"0 auto",padding:isMobile?"14px 12px":"24px"}}>
        {tab==="schedule"&&(
          <div>
            <div style={{background:"var(--color-background-primary)",borderRadius:16,border:"1.5px solid var(--color-border-secondary)",padding:"12px 16px",display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
              <span style={{fontSize:20,opacity:0.35,flexShrink:0}}>🔍</span>
              <input value={q} onChange={e=>setQ(e.target.value)} placeholder={isMobile?"Selección, estadio, fecha…":"Busca por selección, estadio, ciudad, fecha (ej: 22 de junio), fase o país sede…"} style={{flex:1,border:"none",background:"transparent",color:"var(--color-text-primary)",fontSize:isMobile?14:16,outline:"none",minWidth:0}}/>
              {q&&<button onClick={()=>setQ("")} style={{width:30,height:30,borderRadius:"50%",border:"none",background:"var(--color-background-secondary)",color:"var(--color-text-secondary)",cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>✕</button>}
            </div>
            <div style={{marginBottom:16}}>
              <p style={{margin:"0 0 8px",fontSize:11,fontWeight:700,color:"var(--color-text-secondary)",textTransform:"uppercase",letterSpacing:0.8}}>Accesos rápidos</p>
              <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:8}}>
                <Chip label="🇲🇽 México" value="México" color="#ef4444"/>
                <Chip label="🇨🇦 Canadá" value="Canadá" color="#dc2626"/>
                <Chip label="🇺🇸 EE.UU." value="EE.UU." color="#3b82f6"/>
                <Chip label="🏆 Final" value="Final" color="#f59e0b"/>
                <Chip label="⚡ Semifinales" value="semifinal" color="#8b5cf6"/>
                <Chip label="⚽ Cuartos" value="cuartos" color="#06b6d4"/>
                <Chip label="🔵 Octavos" value="octavos" color="#10b981"/>
              </div>
              <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
                {Object.keys(GROUPS).map(g=><Chip key={g} label={"Grupo "+g} value={"Grupo "+g} color={GCOL[g]}/>)}
              </div>
            </div>
            {q&&<div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14,flexWrap:"wrap",gap:8}}><span style={{fontSize:14,fontWeight:600,color:"var(--color-text-primary)"}}>{filtered.length} partido{filtered.length!==1?"s":""} — {searchLabel}</span><button onClick={()=>setQ("")} style={{fontSize:13,color:"#3b82f6",background:"none",border:"none",cursor:"pointer",fontWeight:600}}>Ver todos</button></div>}
            {Object.keys(byDate).sort().map(date=>(
              <div key={date} style={{marginBottom:24}}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                  <div style={{background:"var(--color-background-primary)",border:"0.5px solid var(--color-border-secondary)",borderRadius:10,padding:"5px 14px",flexShrink:0}}><span style={{fontSize:isMobile?12:14,fontWeight:600,color:"var(--color-text-primary)",textTransform:"capitalize"}}>{fmtDate(date)}</span></div>
                  <div style={{flex:1,height:"1px",background:"var(--color-border-tertiary)"}}/>
                  <span style={{fontSize:12,color:"var(--color-text-secondary)",fontWeight:600,flexShrink:0}}>{byDate[date].length} partidos</span>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:10}}>
                  {byDate[date].map(m=>{
                    const gc=m.group?GCOL[m.group]:"#94a3b8";
                    const isGroup=m.stage==="Fase de Grupos";
                    const sc=scores[m.id]||{};
                    return(
                      <div key={m.id} style={{background:"var(--color-background-primary)",borderRadius:14,border:"0.5px solid var(--color-border-tertiary)",overflow:"hidden",borderLeft:"5px solid "+gc}}>
                        {!isGroup&&<div style={{background:gc+"18",padding:"5px 14px",borderBottom:"1px solid "+gc+"25"}}><span style={{fontSize:11,fontWeight:700,color:gc,textTransform:"uppercase",letterSpacing:0.5}}>{m.stage} · #{m.id}</span></div>}
                        <div style={{padding:isMobile?"12px 14px":"14px 18px"}}>
                          {isGroup&&<div style={{display:"flex",alignItems:"center",gap:7,marginBottom:10}}><div style={{background:gc,borderRadius:7,padding:"2px 8px"}}><span style={{fontSize:11,fontWeight:700,color:"white"}}>GRUPO {m.group}</span></div><span style={{fontSize:11,color:"var(--color-text-secondary)"}}>Jornada {m.md} · #{m.id}</span></div>}
                          <div style={{display:"flex",alignItems:"center",marginBottom:12}}>
                            <div style={{flex:1,display:"flex",alignItems:"center",gap:isMobile?8:12,minWidth:0}}><span style={{fontSize:isMobile?28:34,lineHeight:1,flexShrink:0}}>{FLAGS[m.home]||"🏳️"}</span><span style={{fontSize:isMobile?13:16,fontWeight:700,color:"var(--color-text-primary)",overflow:"hidden",textOverflow:"ellipsis",lineHeight:1.2}}>{m.home}</span></div>
                            <div style={{padding:isMobile?"6px 10px":"7px 14px",background:"var(--color-background-secondary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:8,margin:"0 8px",flexShrink:0}}><span style={{fontSize:12,fontWeight:700,color:"var(--color-text-secondary)",letterSpacing:1}}>VS</span></div>
                            <div style={{flex:1,display:"flex",alignItems:"center",gap:isMobile?8:12,justifyContent:"flex-end",minWidth:0}}><span style={{fontSize:isMobile?13:16,fontWeight:700,color:"var(--color-text-primary)",textAlign:"right",overflow:"hidden",textOverflow:"ellipsis",lineHeight:1.2}}>{m.away}</span><span style={{fontSize:isMobile?28:34,lineHeight:1,flexShrink:0}}>{FLAGS[m.away]||"🏳️"}</span></div>
                          </div>
                          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",paddingTop:10,borderTop:"0.5px solid var(--color-border-tertiary)",flexWrap:"wrap",gap:8}}>
                            <div style={{display:"flex",gap:isMobile?8:16,flexWrap:"wrap"}}><span style={{fontSize:12,color:"var(--color-text-secondary)"}}>🏟️ {m.venue}</span><span style={{fontSize:12,color:"var(--color-text-secondary)"}}>📍 {m.city}</span></div>
                            <div style={{background:gc+"18",border:"1px solid "+gc+"35",borderRadius:8,padding:"6px 12px",display:"flex",alignItems:"center",gap:5,flexShrink:0}}><span style={{fontSize:13,fontWeight:700,color:gc}}>🕐 {m.time} ET</span></div>
                          </div>
                          <div style={{marginTop:12,paddingTop:12,borderTop:"1px dashed "+gc+"40",display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
                            <span style={{fontSize:12,fontWeight:600,color:"var(--color-text-secondary)"}}>⚽ Resultado:</span>
                            <div style={{display:"flex",alignItems:"center",gap:8,flex:1,justifyContent:"center"}}>
                              <div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:18}}>{FLAGS[m.home]||"🏳️"}</span><input type="text" inputMode="numeric" maxLength={2} value={sc.home||""} onChange={e=>setScore(m.id,"home",e.target.value)} placeholder="—" style={{width:48,height:44,textAlign:"center",fontSize:20,fontWeight:700,color:gc,background:"var(--color-background-secondary)",border:"2px solid "+(sc.home!==undefined&&sc.home!==""?gc:"var(--color-border-secondary)"),borderRadius:10,outline:"none",cursor:"text",fontFamily:"var(--font-sans)"}}/></div>
                              <span style={{fontSize:20,fontWeight:700,color:"var(--color-text-secondary)"}}>—</span>
                              <div style={{display:"flex",alignItems:"center",gap:6}}><input type="text" inputMode="numeric" maxLength={2} value={sc.away||""} onChange={e=>setScore(m.id,"away",e.target.value)} placeholder="—" style={{width:48,height:44,textAlign:"center",fontSize:20,fontWeight:700,color:gc,background:"var(--color-background-secondary)",border:"2px solid "+(sc.away!==undefined&&sc.away!==""?gc:"var(--color-border-secondary)"),borderRadius:10,outline:"none",cursor:"text",fontFamily:"var(--font-sans)"}}/><span style={{fontSize:18}}>{FLAGS[m.away]||"🏳️"}</span></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            {filtered.length===0&&q&&(<div style={{textAlign:"center",padding:"50px 20px"}}><div style={{fontSize:44,marginBottom:14}}>🔍</div><p style={{fontSize:17,margin:"0 0 8px",color:"var(--color-text-primary)",fontWeight:700}}>Sin resultados para "{q}"</p><p style={{fontSize:13,margin:"0 0 18px",color:"var(--color-text-secondary)"}}>Prueba con selección, estadio, ciudad, fecha (ej: 22 de junio) o fase</p><button onClick={()=>setQ("")} style={{padding:"11px 24px",border:"none",borderRadius:12,background:"#3b82f6",color:"white",cursor:"pointer",fontSize:14,fontWeight:700}}>Ver todos los partidos</button></div>)}
          </div>
        )}
        {tab==="groups"&&(
          <div>
            <p style={{color:"var(--color-text-secondary)",fontSize:13,margin:"0 0 16px"}}>12 grupos · Top 2 + 8 mejores terceros → Ronda de 32</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax("+(isMobile?"160px":"240px")+",1fr))",gap:12}}>
              {Object.entries(GROUPS).map(([g,teams])=>{const col=GCOL[g];return(
                <div key={g} style={{background:"var(--color-background-primary)",borderRadius:16,border:"1.5px solid "+col+"44",overflow:"hidden"}}>
                  <div style={{background:"linear-gradient(135deg,"+col+"33,"+col+"11)",padding:"12px 14px",borderBottom:"1px solid "+col+"33",display:"flex",alignItems:"center",gap:10}}>
                    <div style={{width:40,height:40,borderRadius:12,background:col,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:20,color:"white",flexShrink:0}}>{g}</div>
                    <div><div style={{fontWeight:700,fontSize:15,color:"var(--color-text-primary)"}}>Grupo {g}</div><div style={{fontSize:11,color:"var(--color-text-secondary)"}}>6 partidos</div></div>
                  </div>
                  <div style={{padding:"4px 14px"}}>
                    {teams.map((t,i)=>(<div key={t} style={{display:"flex",alignItems:"center",gap:7,padding:"8px 0",borderBottom:i<3?"0.5px solid var(--color-border-tertiary)":"none"}}>
                      <span style={{fontSize:18,lineHeight:1,flexShrink:0}}>{FLAGS[t]}</span>
                      <div style={{flex:1,minWidth:0}}><div style={{fontSize:12,fontWeight:600,color:"var(--color-text-primary)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t}</div>{(t==="México"||t==="Canadá"||t==="EE.UU.")&&<div style={{fontSize:10,color:col,fontWeight:600}}>🏠 Anfitrión</div>}</div>
                      <button onClick={()=>{setTab("schedule");setQ(t);}} style={{background:col,border:"none",color:"white",borderRadius:7,padding:"4px 8px",fontSize:11,cursor:"pointer",fontWeight:700,flexShrink:0}}>Ver</button>
                    </div>))}
                  </div>
                  <div style={{padding:"10px 14px",borderTop:"0.5px solid var(--color-border-tertiary)"}}><button onClick={()=>{setTab("schedule");setQ("Grupo "+g);}} style={{width:"100%",background:col,border:"none",color:"white",borderRadius:10,padding:"9px",fontSize:12,cursor:"pointer",fontWeight:700}}>Ver partidos del Grupo {g}</button></div>
                </div>
              );})}
            </div>
          </div>
        )}
        {tab==="stadiums"&&(
          <div>
            <p style={{color:"var(--color-text-secondary)",fontSize:13,margin:"0 0 16px"}}>16 estadios en 3 países. EE.UU. alberga 78 de los 104 partidos.</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax("+(isMobile?"100%":"290px")+",1fr))",gap:12}}>
              {STADIUMS.map(s=>{const accent=s.isFinal?"#f59e0b":s.isSemi?"#8b5cf6":null;const groups=[...(STADIUM_GROUPS[s.name]||new Set())].sort();return(
                <div key={s.name} style={{background:"var(--color-background-primary)",borderRadius:16,border:"1.5px solid "+(accent?accent+"66":"var(--color-border-tertiary)"),overflow:"hidden"}}>
                  {accent&&<div style={{background:accent+"20",padding:"6px 16px",borderBottom:"1px solid "+accent+"40",color:accent,fontWeight:700,fontSize:12}}>{s.isFinal?"🏆 SEDE DE LA FINAL · 19 JULIO 2026":"🏟️ SEDE DE SEMIFINAL"}</div>}
                  <div style={{padding:"16px"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                      <div style={{flex:1,paddingRight:8}}><div style={{fontWeight:700,fontSize:15,color:"var(--color-text-primary)",marginBottom:3}}>{s.name}</div><div style={{fontSize:12,color:"var(--color-text-secondary)"}}>{s.flag} {s.city}, {s.country}</div></div>
                      <div style={{textAlign:"right",flexShrink:0}}><div style={{fontSize:20,fontWeight:700,color:"var(--color-text-info)"}}>{s.cap.toLocaleString()}</div><div style={{fontSize:10,color:"var(--color-text-secondary)"}}>espectadores</div></div>
                    </div>
                    <div style={{display:"flex",gap:6,marginBottom:10,flexWrap:"wrap"}}><span style={{background:"var(--color-background-secondary)",borderRadius:6,padding:"3px 8px",fontSize:11,color:"var(--color-text-secondary)",border:"0.5px solid var(--color-border-tertiary)"}}>🏟️ {s.roof}</span></div>
                    {groups.length>0&&(<div style={{marginBottom:10}}><div style={{fontSize:11,fontWeight:700,color:"var(--color-text-secondary)",textTransform:"uppercase",letterSpacing:0.5,marginBottom:6}}>Grupos:</div><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{groups.map(g=>(<button key={g} onClick={()=>{setTab("schedule");setQ("Grupo "+g);}} style={{background:GCOL[g],border:"none",color:"white",borderRadius:7,padding:"4px 10px",fontSize:12,fontWeight:700,cursor:"pointer",minHeight:32}}>{g}</button>))}</div></div>)}
                    {s.special&&<div style={{background:"var(--color-background-secondary)",borderRadius:8,padding:"7px 10px",fontSize:12,color:"var(--color-text-secondary)",marginBottom:10}}>ℹ️ {s.special}</div>}
                    <button onClick={()=>{setTab("schedule");setQ(s.name);}} style={{width:"100%",background:"#3b82f6",border:"none",color:"white",borderRadius:12,padding:"12px",fontSize:14,cursor:"pointer",fontWeight:700,minHeight:48}}>🔍 Ver partidos en este estadio</button>
                  </div>
                </div>
              );})}
            </div>
          </div>
        )}
        {tab==="teams"&&(
          <div>
            <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:14,flexWrap:"wrap"}}>
              <div style={{flex:1,minWidth:180,background:"var(--color-background-primary)",border:"1.5px solid var(--color-border-secondary)",borderRadius:14,padding:"10px 14px",display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:18,opacity:0.4}}>🔍</span>
                <input placeholder="Buscar selección…" value={tSearch} onChange={e=>setTSearch(e.target.value)} style={{flex:1,border:"none",background:"transparent",color:"var(--color-text-primary)",fontSize:15,outline:"none"}}/>
              </div>
              <span style={{fontSize:12,color:"var(--color-text-secondary)"}}>{visTeams.length} selecciones</span>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax("+(isMobile?"100%":"280px")+",1fr))",gap:10}}>
              {visTeams.map(t=>{const g=TGRP[t],col=GCOL[g],isExp=expTeam===t,sd=SD[t];return(
                <div key={t} style={{background:"var(--color-background-primary)",borderRadius:16,border:"1.5px solid "+(isExp?col:"var(--color-border-tertiary)"),overflow:"hidden",transition:"border-color 0.2s"}}>
                  <div onClick={()=>setExpTeam(isExp?null:t)} style={{padding:"14px 16px",cursor:"pointer",display:"flex",alignItems:"center",gap:12,background:isExp?col+"10":"transparent",minHeight:72}}>
                    <span style={{fontSize:34,lineHeight:1,flexShrink:0}}>{FLAGS[t]}</span>
                    <div style={{flex:1,minWidth:0}}><div style={{fontWeight:700,fontSize:15,color:"var(--color-text-primary)",marginBottom:4}}>{t}</div><div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}><span style={{background:col,color:"white",borderRadius:6,padding:"2px 9px",fontSize:12,fontWeight:700}}>Grupo {g}</span>{(t==="México"||t==="Canadá"||t==="EE.UU.")&&<span style={{fontSize:11,color:"var(--color-text-secondary)"}}>🏠 Anfitrión</span>}</div></div>
                    <div style={{display:"flex",flexDirection:"column",gap:6,alignItems:"flex-end",flexShrink:0}}>
                      <button onClick={e=>{e.stopPropagation();setTab("schedule");setQ(t);}} style={{background:"var(--color-background-secondary)",border:"0.5px solid var(--color-border-secondary)",color:"var(--color-text-secondary)",borderRadius:8,padding:"5px 10px",fontSize:12,cursor:"pointer",minHeight:32}}>Partidos</button>
                      <span style={{color:isExp?col:"var(--color-text-secondary)",fontSize:13,transform:isExp?"rotate(180deg)":"none",transition:"transform 0.2s",display:"inline-block"}}>▼</span>
                    </div>
                  </div>
                  {isExp&&(<div style={{borderTop:"1.5px solid "+col+"33",padding:"14px 16px",background:col+"06"}}>
                    {sd?(<div>
                      <div style={{marginBottom:12,padding:"10px 12px",background:"var(--color-background-primary)",borderRadius:10,border:"0.5px solid var(--color-border-tertiary)"}}><span style={{fontSize:11,color:"var(--color-text-secondary)"}}>Director Técnico</span><div style={{fontSize:15,fontWeight:700,color:"var(--color-text-primary)",marginTop:2}}>👔 {sd[0]}</div></div>
                      {["POR","DEF","MED","DEL"].map(pos=>{const ps=sd[1].filter(p=>p[2]===pos);if(!ps.length)return null;const pc=posCol[pos];return(<div key={pos} style={{marginBottom:10}}>
                        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}><div style={{width:4,height:14,borderRadius:2,background:pc}}/><span style={{fontSize:11,fontWeight:700,color:pc,textTransform:"uppercase",letterSpacing:0.5}}>{posLabel[pos]} ({ps.length})</span></div>
                        {ps.map((p,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 10px",background:"var(--color-background-primary)",borderRadius:8,marginBottom:4,border:"0.5px solid var(--color-border-tertiary)"}}>
                          <div style={{width:26,height:26,borderRadius:7,background:pc+"22",border:"1px solid "+pc+"40",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:pc,flexShrink:0}}>{p[0]}</div>
                          <div style={{flex:1,minWidth:0}}><div style={{fontSize:13,fontWeight:600,color:"var(--color-text-primary)",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{p[1]}</div><div style={{fontSize:11,color:"var(--color-text-secondary)"}}>{p[3]}{p[4]?" · "+p[4]+" años":""}</div></div>
                        </div>))}
                      </div>);})}
                    </div>):(<div style={{textAlign:"center",padding:"20px",color:"var(--color-text-secondary)",fontSize:13}}>Plantilla no disponible aún</div>)}
                  </div>)}
                </div>
              );})}
            </div>
          </div>
        )}
      </div>
      <div style={{textAlign:"center",padding:"16px",color:"var(--color-text-secondary)",fontSize:11,borderTop:"0.5px solid var(--color-border-tertiary)",marginTop:16}}>FIFA World Cup 2026™ · 11 Jun – 19 Jul · 🇲🇽 🇨🇦 🇺🇸 · 104 partidos · 48 selecciones · 16 estadios</div>
    </div>
  );
}