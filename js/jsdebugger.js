function jsDebugger(){
	var errs, logs, main, ctr, errsc, logsc, frame;
	var ctrA=document.createElement('a'); 
	var lgc=0;
	var errc=0;
	var style={
		main:'position:absolute; z-index:800;  top:0px; left:0px; width:100%; background:#FFF; font-family:verdana; padding:2px 0px; display:none;',
		control:'position:fixed; z-index:700; bottom:0px; height:40px; width:50px; background:#fefefe; font-family:verdana; padding:5px; display:block; right:0px;',
		title:'font-size:12px; font-weight:bold;',
		text:'font-size:10px;',
		errs:{
			main:'background:#fde6e6; padding:5px; border-bottom:1px solid #cecece;',
			line:'font-size:10px; font-weight:bold;',
		},
		logs:{
			main:'font-size:10px; background:#eaeaea; padding:5px; border-bottom:1px solid #cecece;',
			time:'float:right; font-size:8px; clear:right;'
		}
	};
	function initErrs(){
		errs=document.createElement('div');
		main.appendChild(errs);
	}
	function initLogs(){
		logs=document.createElement('div');
		main.appendChild(logs);
	}

	function updateErrCount(){
		errc++;
		errsc.innerHTML='<b>'+errc.toString()+'</b>';
		errsc.innerHTML+=' errors';
	}

	function updateLogCount(){
		lgc++;
		logsc.innerHTML=lgc.toString()+' logs';
	}	

	function time(){
		var d = new Date()
		d= d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()+':'+d.getMilliseconds();
		return d;
	}
	
	function remove(){
		document.body.removeChild(ctr);
		document.body.removeChild(main);
	}
	
	function show(){
		main.style.display='block';
		ctr.style.display='none';
		window.scrollTo(0,1);
	}
	function hide(){
		main.style.display='none';
		ctr.style.display='block';
	}				
	this.load=function(){
		document.body.insertBefore(ctr,document.body.childNodes[0]);
		document.body.insertBefore(main,document.body.childNodes[0]);
	}
	
	this.init=function(){
		main = document.createElement('div');
		
		ctr = document.createElement('div');
		ctr.setAttribute('style',style.control);
		ctr.addEventListener('click',show,false);
		
		errsc = document.createElement('div');
		errsc.setAttribute('style',style.text +'color:red;');
		errsc.innerHTML='0 errors';

		logsc = document.createElement('div');
		logsc.setAttribute('style',style.text);
		logsc.innerHTML='0 logs';

		ctr.appendChild(errsc);
		ctr.appendChild(logsc);

		if(false){
			ctrA.setAttribute('href','javascript:void(0)');
			ctrA.setAttribute('style','font-size:10px; color:#000; display:block; text-align:right');
			ctrA.innerHTML='close';
			ctrA.addEventListener('click',remove,false);
			ctr.appendChild(ctrA);
		}
		
		main.setAttribute('style',style.main);
		main.addEventListener('click',hide,false);
		
		initErrs();
		initLogs();

		window.console.log=function(a){
			var log=document.createElement('div');
			log.setAttribute('style',style.logs.main);
			log.innerHTML='<span style="'+style.logs.time+'">'+time()+'</span> ';
			log.appendChild(document.createTextNode(a));
			main.appendChild(log);
			updateLogCount();
		}
		window.onerror=function(m,u,r){
			var err=document.createElement('div');
			err.setAttribute('style',style.errs.main);
			err.innerHTML+='<div style="'+style.text+' color:#f41500;">'+m+'</div>';
			err.innerHTML+='<div style="'+style.text+' color:#777;">'+u+'</div>';
			err.innerHTML+='<div style="'+style.text+' color:#155336;">at line: '+r+'</div>';
			main.appendChild(err);
			updateErrCount();
			return false;
		}
	}
}
var _jsdb = new jsDebugger(); _jsdb.init();
window.onload=function(){
	_jsdb.load();
}