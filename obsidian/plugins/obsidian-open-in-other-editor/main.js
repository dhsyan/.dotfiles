var P=Object.create;var p=Object.defineProperty;var y=Object.getOwnPropertyDescriptor;var S=Object.getOwnPropertyNames;var x=Object.getPrototypeOf,_=Object.prototype.hasOwnProperty;var $=(e,i)=>{for(var t in i)p(e,t,{get:i[t],enumerable:!0})},v=(e,i,t,n)=>{if(i&&typeof i=="object"||typeof i=="function")for(let a of S(i))!_.call(e,a)&&a!==t&&p(e,a,{get:()=>i[a],enumerable:!(n=y(i,a))||n.enumerable});return e};var b=(e,i,t)=>(t=e!=null?P(x(e)):{},v(i||!e||!e.__esModule?p(t,"default",{value:e,enumerable:!0}):t,e)),D=e=>v(p({},"__esModule",{value:!0}),e);var O={};$(O,{default:()=>c,execa:()=>A});module.exports=D(O);var l=require("obsidian"),h=b(require("os")),w=require("child_process");var g=require("obsidian"),d=class extends g.PluginSettingTab{constructor(t,n){super(t,n);this.plugin=n}display(){let{containerEl:t}=this;t.empty(),new g.Setting(t).setName("vscode").setDesc("macOS only").addText(n=>n.setPlaceholder("Absolute path").setValue(this.plugin.settingConfig.vscode_path).onChange(async a=>{this.plugin.settingConfig.vscode_path=a,await this.plugin.doSaveSettingConfig()}))}};function C(e){let{exec:i}=require("child_process");i(e,(t,n,a)=>{if(t){console.error(`run cmd err: ${t}, ${n}, ${a}`);return}console.log(`run cmd: ${e}`)})}async function A(e,i){let t=N(e,i),n=(0,w.spawn)(t.file,t.args);return new Promise((a,o)=>{n.on("exit",(s,r)=>{a({exitCode:s,signal:r})}),n.on("error",s=>{o(s)}),n.stdout.on("data",s=>console.log(s.toString())),n.stdin&&n.stdin.on("error",s=>{o(s)})})}function N(e,i){return{file:e,args:i}}var c=class extends l.Plugin{constructor(){super(...arguments);this.settingConfig={vscode_path:"",gvim_path:""}}async doLoadSettingConfig(){this.settingConfig={...this.settingConfig,...await this.loadData()}}async doSaveSettingConfig(){await this.saveData(this.settingConfig)}async onload(){await this.doLoadSettingConfig(),this.addCommand({id:"open-in-other-editor-gvim",name:"Open current active file in gVim",callback:()=>{this.open("gvim")}}),this.addCommand({id:"open-in-other-editor-vscode",name:"Open current active file in VScode",callback:()=>{this.open("code")}}),this.addCommand({id:"open-in-other-editor-nvim-qt",name:"Open current active file in nvim",callback:()=>{this.open("nvim-qt")}}),this.addSettingTab(new d(app,this))}onunload(){}open(t){var r;let n=(r=this.app.workspace.getActiveFile())==null?void 0:r.path;if(!n){console.warn("no active file in workspace");return}let{adapter:a}=this.app.vault,{basePath:o}=a,s=h.platform();if(["darwin"].includes(s)){let m={code:this.settingConfig.vscode_path,gvim:this.settingConfig.gvim_path};return this.macopen(o,n,m[t])}else h.type()==="Windows_NT"?C(`cd /d "${o}" && ${t} "./${n}"`):C(`cd "${o}" && ${t} "./${n}"`)}macopen(t,n,a){let{path:{join:o}}=this.app.vault.adapter,s=o(t,n);(async function(r,m){if(!r)return new l.Notice("Please save absolute path to vscode into settings",7e3);let{err:f,access:k}=await m.vault.adapter.fsPromises.stat(r).then(u=>({access:u,err:null})).catch(u=>({err:u}));if(f)return console.log({err:f});await A(r,[s])})(a,this.app)}};