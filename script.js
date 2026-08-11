const state={legs:[
 {pv:440,level:12},{pv:450,level:5},{pv:300,level:8},{pv:0,level:0},{pv:0,level:0},{pv:0,level:0}
]};

const $=id=>document.getElementById(id);
const money=n=>new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",minimumFractionDigits:2,maximumFractionDigits:2}).format(Number(n)||0);
const val=id=>{let n=parseFloat($(id).value);return Number.isFinite(n)?n:0};

function render(){
 const box=$("legs");box.innerHTML="";
 state.legs.forEach((leg,i)=>{
  const el=document.createElement("div");el.className="leg";
  el.innerHTML=`<div class="leg-head"><span class="leg-name">Leg ${String.fromCharCode(65+i)}</span><button class="remove" data-remove="${i}">Remove</button></div>
  <div class="leg-grid">
   <label>Leg PV<input class="lpv" data-i="${i}" type="number" min="0" step="0.01" value="${leg.pv||""}"></label>
   <label>Leg Level (%)<input class="llvl" data-i="${i}" type="number" min="0" max="100" step="0.01" value="${leg.level||""}"></label>
   <div class="result" id="res${i}"><span>GAP % / Income</span><strong id="r${i}">—</strong></div>
  </div>`;
  box.appendChild(el);
 });
 document.querySelectorAll(".lpv").forEach(x=>x.oninput=e=>{state.legs[e.target.dataset.i].pv=parseFloat(e.target.value)||0;calc()});
 document.querySelectorAll(".llvl").forEach(x=>x.oninput=e=>{state.legs[e.target.dataset.i].level=parseFloat(e.target.value)||0;calc()});
 document.querySelectorAll("[data-remove]").forEach(x=>x.onclick=()=>{state.legs.splice(+x.dataset.remove,1);render()});
 calc();
}


function renderNetwork() {
  const yl = val("yourLevel");
  const ypv = val("yourPV");

  $("treeYourLevel").textContent = `${yl}%`;
  $("treeYourPV").textContent = ypv;

  $("networkLegs").innerHTML = state.legs.slice(0, 6).map((leg, i) => `
    <div class="network-leg">
      <div class="network-node ${leg.pv > 0 ? "active" : ""}" data-network-index="${i}">
        <span class="leg-label">LEG ${i + 1}</span>
        <span class="leg-pv-display">${leg.pv > 0 ? leg.pv : "—"} PV</span>
        <span class="leg-level-display">${leg.level > 0 ? leg.level + "%" : "PV / %"}</span>
      </div>
    </div>
  `).join("");
}

function calc(){
 renderNetwork();
 const yl=val("yourLevel"),ypv=val("yourPV"),bv=val("bv");
 const own=ypv*(yl/100)*bv;let legs=0;let lines=[];
 lines.push(`Own Income = ${ypv} PV × ${yl}% × ${bv} BV = ${money(own)}`);
 state.legs.forEach((l,i)=>{
  const gap=yl-l.level,inc=l.pv*(gap/100)*bv;legs+=inc;
  const r=$("r"+i),res=$("res"+i);
  if(r)r.textContent=`${gap.toFixed(2)}% / ${money(inc)}`;
  if(res)res.classList.toggle("bad",gap<0);
  if(l.pv>0)lines.push(`Leg ${String.fromCharCode(65+i)} = ${l.pv} PV × (${yl}% − ${l.level}%) × ${bv} BV = ${money(inc)}`);
 });
 $("ownIncome").textContent=money(own);$("legIncome").textContent=money(legs);$("totalIncome").textContent=money(own+legs);
 $("breakdown").innerHTML=lines.map(x=>`<div class="line">${x}</div>`).join("");
}

["yourLevel","yourPV","bv"].forEach(id=>$(id).oninput=calc);

$("addLeg").onclick=()=>{if(state.legs.length<6){state.legs.push({pv:0,level:0});render()}else alert("Maximum 6 legs already added.")};

$("resetBtn").onclick=()=>{
 $("yourLevel").value=16;$("yourPV").value=550;$("bv").value=20;
 state.legs=[{pv:440,level:12},{pv:450,level:5},{pv:300,level:8},{pv:0,level:0},{pv:0,level:0},{pv:0,level:0}];render();
};

$("saveBtn").onclick=()=>{
 localStorage.setItem("pbCalculator",JSON.stringify({
  yourLevel:$("yourLevel").value,yourPV:$("yourPV").value,bv:$("bv").value,legs:state.legs
 }));
 alert("Calculation saved in this browser.");
};

$("loadBtn").onclick=()=>{
 const s=localStorage.getItem("pbCalculator");if(!s){alert("No saved calculation found.");return}
 const d=JSON.parse(s);$("yourLevel").value=d.yourLevel;$("yourPV").value=d.yourPV;$("bv").value=d.bv;
 state.legs=d.legs||[];render();alert("Saved calculation loaded.");
};

$("csvBtn").onclick=()=>{
 const yl=val("yourLevel"),ypv=val("yourPV"),bv=val("bv");
 let rows=[["Item","PV","Level %","GAP %","Income"]];
 rows.push(["Own",ypv,yl,"",ypv*(yl/100)*bv]);
 state.legs.forEach((l,i)=>{if(l.pv>0)rows.push([`Leg ${String.fromCharCode(65+i)}`,l.pv,l.level,yl-l.level,l.pv*((yl-l.level)/100)*bv])});
 const csv=rows.map(r=>r.map(v=>`"${String(v).replaceAll('"','""')}"`).join(",")).join("\n");
 const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));a.download="performance-bonus-calculation.csv";a.click();URL.revokeObjectURL(a.href);
};

$("printBtn").onclick=()=>window.print();

$("themeBtn").onclick=()=>{
 document.body.classList.toggle("dark");
 localStorage.setItem("pbDark",document.body.classList.contains("dark"));
};
if(localStorage.getItem("pbDark")==="true")document.body.classList.add("dark");

render();


document.addEventListener("click", (e) => {
  const node = e.target.closest("[data-network-index]");
  if (!node) return;
  const index = Number(node.dataset.networkIndex);
  const input = document.querySelector(`.lpv[data-i="${index}"]`);
  if (input) {
    input.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => input.focus(), 350);
  }
});
