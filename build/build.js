!function(t){var e={};function i(r){if(e[r])return e[r].exports;var s=e[r]={i:r,l:!1,exports:{}};return t[r].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=t,i.c=e,i.d=function(t,e,r){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)i.d(r,s,function(e){return t[e]}.bind(null,s));return r},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=1)}([function(t,e){const i={0:{fill:"darkgreen",def:!0},1:{fill:"white"},2:{fill:"black"},3:{fill:"black",border:!0},4:{fill:"red"}};t.exports={BLACK_COLOR:"black",FLIP_ITERATIONS:10,FLIP_ITERATIONS_INTERVAL:15,CANVAS_SAGE_PIXELS_COUNT:1,CELLS_IN_ROW:8,BOARD_COLOR:"darkgreen",styles:i,NO_CHIP_MATRIX_VALUE:0,WHITE_CHIP_MATRIX_VALUE:1,BLACK_CHIP_MATRIX_VALUE:2,AVAILABLE_STEP_MATRIX_VALUE:3,BLACK_HOLE_MATRIX_VALUE:4,COMPUTER_THINK_TIMEOUT:1e3,COMPUTER_MODE:0,USER_MODE:1,RESULT_TEXTS:{white:"Congratulations, white, you won!",black:"Congratulations, black, you won!",draw:"It's draw. We have no winner"}}},function(t,e,i){"use strict";const r=i(2),s=i(4),n=new r(document.getElementsByTagName("canvas")[0]);n.init(),n.render();new s(n).initModel()},function(t,e,i){"use strict";const r=i(3),{styles:s,COMPUTER_MODE:n,USER_MODE:a,WHITE_CHIP_MATRIX_VALUE:h,RESULT_TEXTS:l}=i(0),o=document.getElementById("myself-mode"),c=document.getElementById("computer-mode"),u=document.getElementById("curr-player"),d=document.getElementById("black-counter"),p=document.getElementById("white-counter"),S=document.getElementById("game-result-text");t.exports=class extends r{constructor(t){super(t),this.whiteScore=0,this.blackScore=0}onModeChange(t){o.onclick=()=>{o.classList.add("selected"),c.classList.remove("selected"),t(a)},c.onclick=()=>{c.classList.add("selected"),o.classList.remove("selected"),t(n)}}setCurrPlayer(t){const{fill:e}=s[t];u.style.setProperty("background",e)}chipCounterIncrement(t,e){t===h?(this.whiteScore+=e,p.innerText=this.whiteScore):(this.blackScore+=e,d.innerText=this.blackScore)}handleGameFinish(){this.whiteScore>this.blackScore?S.innerText=l.white:this.blackScore>this.whiteScore?S.innerText=l.black:S.innerText=l.draw}}},function(t,e,i){"use strict";const{BLACK_COLOR:r,FLIP_ITERATIONS:s,FLIP_ITERATIONS_INTERVAL:n,CANVAS_SAGE_PIXELS_COUNT:a,CELLS_IN_ROW:h,BOARD_COLOR:l,styles:o}=i(0);t.exports=class{constructor(t){this.container=t,this.board=t.getContext("2d")}init(){const t=Math.min(window.innerWidth,window.innerHeight);this.size=.8*t,this.rectSize=this.size/h,this.board.canvas.width=this.size,this.board.canvas.height=this.size,this.board.fillStyle=l,this.board.strokeRect(0,0,this.size,this.size)}render(){this.board.fillStyle=l,this.board.strokeRect(0,0,this.size,this.size),this.board.fillStyle=r;for(let t=0;t<8;t++)for(let e=0;e<8;e++)this.board.strokeRect(t*this.rectSize,e*this.rectSize,this.rectSize,this.rectSize)}put(t,e,i){const{fill:r,def:s,border:n}=o[i],a=t+1,h=e+1;return this.board.fillStyle=r,this.board.beginPath(),this.board.arc(this.rectSize*(h-.5),this.rectSize*(a-.5),this.rectSize/2-2,0,2*Math.PI,!0),n?this.board.stroke():this.board.fill(),this}remove(t,e){const i=t+1,r=e+1;this.board.fillStyle="darkgreen",this.board.beginPath(),this.board.arc(this.rectSize*(r-.5),this.rectSize*(i-.5),this.rectSize/2-1,0,2*Math.PI,!0),this.board.fill()}changeColor(t,e,i,r){const h=o[i].fill,l=o[r].fill,c=t+1,u=e+1;let d=s;const p=setInterval(()=>{let t=d/s;if(this.board.fillStyle="darkgreen",this.board.beginPath(),this.board.arc(this.rectSize*(u-.5),this.rectSize*(c-.5),this.rectSize/2-a,0,2*Math.PI,!0),this.board.fill(),this.board.fillStyle=h,t=--d/s,this.board.beginPath(),this.board.ellipse(this.rectSize*(u-.5),this.rectSize*(c-.5),this.rectSize/2*t-a<0?0:this.rectSize/2*t-a,this.rectSize/2-a<0?0:this.rectSize/2-a,0,0,2*Math.PI,!0),this.board.fill(),0===d){clearInterval(p);const t=setInterval(()=>{let e=++d/s;this.board.fillStyle=l,e=++d/s,this.board.beginPath(),this.board.ellipse(this.rectSize*(u-.5),this.rectSize*(c-.5),this.rectSize/2*e-a<0?0:this.rectSize/2*e-a,this.rectSize/2-a<0?0:this.rectSize/2-a,0,0,2*Math.PI,!0),this.board.fill(),d===s&&clearInterval(t)},n)}},n);return this}onBoardClick(t){return this.container.addEventListener("click",e=>{const i=e.pageX-(this.container.offsetLeft+this.container.clientLeft),r=e.pageY-(this.container.offsetTop+this.container.clientTop),s=Math.ceil(i/this.rectSize)-1,n=Math.ceil(r/this.rectSize)-1;t({rowIndex:n,columnIndex:s})}),this}}},function(t,e,i){"use strict";const r=i(5),{CELLS_IN_ROW:s,COMPUTER_MODE:n,NO_CHIP_MATRIX_VALUE:a,WHITE_CHIP_MATRIX_VALUE:h,BLACK_CHIP_MATRIX_VALUE:l,AVAILABLE_STEP_MATRIX_VALUE:o,BLACK_HOLE_MATRIX_VALUE:c,COMPUTER_THINK_TIMEOUT:u}=i(0),d=1,p=2,S=[-1,0,1],f=S.map(t=>S.map(e=>[t,e])).flat().filter(([t,e])=>t||e);t.exports=class{constructor(t){this.countChipsTotal=0,this.availableSteps=[],this.input=t,this.gameFinished=!1,this.currPlayer=l,this.computerMode=!1,this.isOneOfPlayersStuck=!1,this.input.onModeChange(e=>{this.countChipsTotal=0,this.availableSteps=[],this.input=t,this.gameFinished=!1,this.computerMode=e===n,this.currPlayer=l,this.isOneOfPlayersStuck=!1,this.input.whiteScore=0,this.input.blackScore=0,this.input.init(),this.input.render(),this.initModel(),this.tryComputerStep()}),this.input.onBoardClick(({rowIndex:t,columnIndex:e})=>{this.computerMode&&this.currPlayer===l||this.makeStep(t,e)})}makeStep(t,e){const i=this.availableSteps.find(i=>i.rowIndex===t&&i.columnIndex===e);if(!i)return;++this.countChipsTotal>=Math.pow(s,2)&&(this.gameFinished=!0),this.input.chipCounterIncrement(this.currPlayer,1),this.availableSteps.splice(this.availableSteps.indexOf(i),1),this.matrix[t][e]=this.currPlayer,this.input.put(t,e,this.currPlayer);const r=1===this.currPlayer?2:1;i.willChanged.forEach(([t,e])=>{this.matrix[t][e]=this.currPlayer,this.input.changeColor(t,e,this.currPlayer===h?l:h,this.currPlayer),this.input.chipCounterIncrement(this.currPlayer,1),this.input.chipCounterIncrement(r,-1)}),this.gameFinished?this.input.handleGameFinish():this.prepareForNextStep()}initModel(){this.matrix=new Array(8).fill(null).map(()=>new Array(8).fill(a)),r.black.forEach(({row:t,column:e})=>this.matrix[t][e]=l),r.white.forEach(({row:t,column:e})=>this.matrix[t][e]=h);const t=[Math.floor(5*Math.random()),Math.floor(6*Math.random())].map(t=>t<3?t:t+2);this.matrix[t[0]][t[1]]=c,this.matrix.map((t,e)=>t.map((t,i)=>this.input.put(e,i,t))),this.prepareForNextStep(),this.input.chipCounterIncrement(l,r.black.length),this.input.chipCounterIncrement(h,r.white.length),this.countChipsTotal+=r.black.length+r.white.length}prepareForNextStep(){this.changeCurrPlayer(),this.removeOldAvailableSteps(),this.setNewAvailableSteps(),this.tryComputerStep()}changeCurrPlayer(){this.currPlayer=this.currPlayer===h?l:h,this.input.setCurrPlayer(this.currPlayer)}removeOldAvailableSteps(){this.availableSteps.forEach(({rowIndex:t,columnIndex:e})=>this.input.remove(t,e))}setNewAvailableSteps(){if(this.calculateAvailableSteps(),this.availableSteps.length)this.isOneOfPlayersStuck=!1;else{if(!this.isOneOfPlayersStuck)return this.isOneOfPlayersStuck=!0,this.prepareForNextStep();this.input.handleGameFinish()}this.availableSteps.forEach(({rowIndex:t,columnIndex:e})=>{this.input.put(t,e,o)})}tryComputerStep(){if(!this.gameFinished&&this.computerMode&&this.currPlayer===l){this.availableSteps[Math.floor(Math.random()*this.availableSteps.length)];const t=this.getBestMoveIndex(this.availableSteps,!1),e=this.availableSteps[t];setTimeout(()=>{this.makeStep(e.rowIndex,e.columnIndex)},u)}}getBestMoveIndex(t,e){const{whiteScore:i,blackScore:r}=this.input,s=t.map(({willChanged:t})=>e?r-i-1-2*t.length:r-i+1+2*t.length),n=Math.min(...s);return s.findIndex(t=>t===n)}calculateAvailableSteps(){const t=[],e=1===this.currPlayer?2:1;this.matrix.forEach((i,r)=>i.forEach((i,s)=>{if(i===a){const i=[];let n=!1;f.forEach(([t,a])=>{let h=d;const l=[];for(const[o,u]of function*([t,e],[i,r]){for(t+=i,e+=r;t>=0&&t<8&&e>=0&&e<8;)yield[t,e],t+=i,e+=r}([r,s],[t,a])){const t=this.matrix[o][u];if(h===d){if(t!==e)break;h=p,l.push([o,u])}else{if(t===this.currPlayer){n=!0,l.forEach(t=>i.push(t));break}if(t!==e||t===c)break;l.push([o,u])}}}),n&&t.push({rowIndex:r,columnIndex:s,willChanged:i})}})),this.availableSteps=t}}},function(t){t.exports=JSON.parse('{"black":[{"row":3,"column":4},{"row":4,"column":3}],"white":[{"row":3,"column":3},{"row":4,"column":4}]}')}]);