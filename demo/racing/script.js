(new Image).src='car-crash.png';for(var i=1;9>i;++i)(new Image).src="car-front"+i+".png",(new Image).src="car-back"+i+".png";var d=13,e=3,f=0.95,g=1,j=document.getElementById("score");function k(){j.innerHTML=parseInt(j.innerHTML)+1} function l(a,b,c){this.speed=Math.random()*(g-f)+f;do this.b=b||Math.round(Math.random()*(e-0)+0);while(c&&this.b==c);b="back";1>=this.b&&(b="front",this.speed=3);this.a=document.createElement("img");a=a||"car-"+b+Math.round(7*Math.random()+1)+".png";this.a.setAttribute("src",a);this.a.style.width="0.5%";this.a.style.top="44.5%";this.a.style.left="50.5%";this.a.style.zIndex=1;document.body.appendChild(this.a)} l.prototype.move=function(){var a=parseFloat(this.a.style.top)+this.speed;this.a.style.top=a+"%";this.a.style.left=m[this.b](a)+"%";this.a.style.width=0.38461538461538464*a-16.615384615384617+"%";this.a.style.zIndex=parseInt(this.a.style.zIndex)+1;return 77<=a};var n=new l("car-blue.png",2);n.a.style.width=d+"%";n.a.style.top="77%";n.a.style.left="56%";n.a.style.zIndex=1E4; window.onkeydown=function(a){var b=parseFloat(n.a.style.left);switch(a.keyCode){case 37:if(2>=b)break;n.a.style.left=b-3+"%";n.b=p(b);break;case 39:if(84<=b)break;n.a.style.left=b+3+"%";n.b=p(b);break;case 38:q("accel"),clearTimeout(r),s(),k()}};var t=1E3,u=[],r=setTimeout(s,t); function s(){for(var a=[],b=0;b<u.length;++b){var c;if(c=u[b].b==n.b)c=5>Math.abs(parseFloat(u[b].a.style.top)-parseFloat(n.a.style.top));if(c){a=document.getElementById("bgsound");a.parentNode.removeChild(a);q("crash");n.a.setAttribute("src","car-crash.png");n.a.style.width=d+13+"%";n.a.style.left=parseFloat(n.a.style.left)-5+"%";clearTimeout(r);window.onkeydown=null;return}u[b].move()?(c=u[b].a,c.parentNode.removeChild(c)):a.push(u[b])}u=a;0.9<Math.random()&&(a=new l(null,null,u.length&&u[u.length- 1].b||null),u.push(a));k();n.b<=e/2&&k();t=Math.max(100,0.99*t);r=setTimeout(s,t)}var m={"0":function(a){return-1.4*a+112.8},1:function(a){return-0.6153846153846154*a+77.88461538461539},2:function(a){return 0.16923076923076924*a+42.96923076923077},3:function(a){return 0.8769230769230769*a+11.476923076923079}};function p(a){for(var b=Infinity,c=0,h=0;h<w.length;++h){var v=Math.abs(w[h]-a);v<b&&(b=v,c=h)}return c}var w=[m[0](77),m[1](77),m[2](77),m[3](77)]; function q(a){for(var b=document.getElementById("sounds").getElementsByTagName("audio"),c=0;c<b.length;++c)if(-1!=b[c].src.indexOf(a)){b[c].pause();b[c].currentTime=0;b[c].play();break}};