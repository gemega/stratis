function handleMouseDown(e){
  e.preventDefault();
  if(e.target == document.getElementById('click_area')) {
        addClickCoords(); 
    }
}
 var puntos = [];
function addClickCoords(e){
  var cursorX;
  var cursorY;
  var punto = [];
  if (e===undefined) e= window.event;
    cursorX = e.screenX;
    cursorY = e.screenY;
    punto.push(cursorX);
    punto.push(cursorY);
    puntos.push(punto);
    numPuntos = puntos.length;
}
function queForma(numero){
  if (numero===3){
    //with 3 points you get a triangle
    checaTriangulo();
  }else if(numero===4){
    //with 4 points it could be a square
    checaCuadrado();
  }else if(numero>=2){
    //at least 2 points to determine the distance between them
    checaDistancia();
  }else{
    alert("Se necesitan al menos dos puntos");
  }
  puntos.length=0;
  numPuntos=0;
}
function checaTriangulo(){
  punto1=puntos[0];
  punto2=puntos[1];
  punto3=puntos[2];
  x1=punto1[0];
  y1=punto1[1];
  x2=punto2[0];
  y2=punto2[1];
  x3=punto3[0];
  y3=punto3[1];
  //length of each side
  var a=Math.sqrt(Math.pow((x2-x1),2)+Math.pow((y2-y1),2));
  var b=Math.sqrt(Math.pow((x3-x1),2)+Math.pow((y3-y1),2));
  var c=Math.sqrt(Math.pow((x3-x2),2)+Math.pow((y3-y2),2));
  //determine the type of triangle
  if(a==c||b==c||a==b){
    type="isosceles";
    alert("Isosceles!")
  }else{
    type="other";
    alert("Just another triangle");
  }
  var perimetro=(a+b+c)/2;
  //this is one way to calculate the triangle's area given its 3 points' coordinates (Heron's calculation)
  var area=Math.sqrt(perimetro*((perimetro-a)*(perimetro-b)*(perimetro-c)));
  //the string with the points
  var stringPuntos="("+x1+","+y1+"),("+x2+","+y2+"),("+x3+","+y3+")";
  //encode in base 64
  var encString=window.btoa(stringPuntos);
  //form the request
  servicio="https://warm-thicket-98293.herokuapp.com/triangle?area="+area+"&type="+type+"&points="+encString;
  httpGetAsync(servicio);
}
function checaCuadrado(){
  //as in the triangle, we check for the dimensions
  punto1=puntos[0];
  punto2=puntos[1];
  punto3=puntos[2];
  punto4=puntos[3];
  x1=punto1[0];
  y1=punto1[1];
  x2=punto2[0];
  y2=punto2[1];
  x3=punto3[0];
  y3=punto3[1];
  x4=punto4[0];
  y4=punto4[1];
  var a=Math.sqrt(Math.pow((x2-x1),2)+Math.pow((y2-y1),2));
  var b=Math.sqrt(Math.pow((x3-x1),2)+Math.pow((y3-y1),2));
  var c=Math.sqrt(Math.pow((x4-x3),2)+Math.pow((y4-y3),2));
  var d=Math.sqrt(Math.pow((x4-x2),2)+Math.pow((y4-y2),2));
  //if all sides are equal in length, it's a square
  if(a==b&&b==c&&c==d&&a==d){
   var area=Math.pow(a,2);
   alert("Squared thoughts:"+area);
   var stringPuntos="("+x1+","+y1+"),("+x2+","+y2+"),("+x3+","+y3+"),("+x4+","+y4+")";
   var encString=window.btoa(stringPuntos);
   servicio="https://warm-thicket-98293.herokuapp.com/square?area="+area+"&points="+encString;
   httpGetAsync(servicio);
  }else{
    //if it is not a square, check the distance traveled
    checaDistancia();
  }
}
function checaDistancia(){
  var recorrido = 0;
  for(j=0;j<numPuntos;j++){
      var x2 = puntos[(j+1)][0];
      var y2 = puntos[(j+1)][1];
      var x1 = puntos[j][0];
      var y1 = puntos[j][1];
      var distancia = Math.sqrt(Math.pow((x2-x1),2)+Math.pow((y2-y1),2));
      recorrido=recorrido+distancia;
      document.getElementById('result').value=recorrido;
  }
}
//making the xhr request
function httpGetAsync(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
      //if everything is ok, get the response
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
          document.getElementById('result').value=xmlHttp.responseText; 
          }
    }
    xmlHttp.open("GET", theUrl, true);  
    xmlHttp.send(null);
}
//enable register of right click
document.addEventListener('contextmenu', handleMouseDown);
//register click
document.addEventListener('click', handleMouseDown);