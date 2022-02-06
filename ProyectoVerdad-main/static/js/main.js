// Devuelve verdadero o falso si es una letra, a excepcion de 'v' que lo considerará como simbolo
function esLetra(car)
{
  let ascii = car.toLowerCase().charCodeAt(0);
  return ascii > 96 && ascii < 123 && ascii != 118
}
// Devuelve verdadero o falso si el símbolo está dentro de los que se usaran
function esSimbolo(car)
{
  //ascii [94,118,170,26,29,40,41]
  // ^: conjuncion; v: disjuncion; ~: Negacion; →: condicional; ↔: Bicondicional
  let caracts = ['^','v','¬','→','↔','(',')']
  for(let i=0;i<caracts.length;i++)
  {
    if( car == caracts[i])
    {
      return true
    }
  }
  return false
}
// Indica si la expresion tiene los caracteres que nos interesan
function veriCaracs(cad)
{
  for(let i=0;i<cad.length;i++)
  {
    if( !esLetra(cad[i]) && !esSimbolo(cad[i]))
    {
      return false
    }
  }
  return true
}
// Indica el balance de los parentesis
function balance(expr)
{
  let pila = []
  let balnceado = true
  let indice = 0
  while(indice < expr.length && balnceado )
  {
    let simbolo = expr[indice]
    if( simbolo == '(')
    {
      pila.push(simbolo)
    }
    else
    {
      if(simbolo == ')')
      {
        if( pila.length <= 0 )
          balnceado = false
        else
          pila.pop()
      }
    }
    indice = indice + 1
  }
  if(balnceado && pila.length<=0)
    return true
  else
    return false
}
// Transforma la expresion a posfija para evaluarla
function posfija(exp)
{
  let precedencia = {'¬':4,'^':3,'v':3,'→':2,'↔':1,'(':0} 
  let pilaOp = []
  let sufija = []
  for(let i = 0;i<exp.length;i++)
  {
    if(esLetra(exp[i]))
    {
      sufija.push(exp[i])
    }
    else
    {
      if(exp[i] == '(')
      {
        pilaOp.push(exp[i])
      }
      else
      {
        if(exp[i] == ')')
        {
          let simTope = pilaOp.pop()
          while(simTope != '(')
          {
            sufija.push(simTope)
            simTope = pilaOp.pop()
          }
        }
        else
        {
          while( pilaOp.length>0 && precedencia[pilaOp[pilaOp.length-1]]>= precedencia[exp[i]])
          {
            sufija.push(pilaOp.pop())
          }
          pilaOp.push(exp[i])
        }
      }
    }
  }
  while(pilaOp.length > 0)
  {
    sufija.push(pilaOp.pop())
  }
  return sufija.join("")
}
// Si no esta la atomica en la lista, la actualiza
function actualizarAtomicas(atomicas, atom)
{
  if(atomicas.indexOf(atom) == -1)
    atomicas.push(atom)
}
// Devuelve las atomicas de la expresion
function atoms(exp)
{
  let atomicas = []
  for(let i = 0; i<exp.length;i++)
  {
    if(esLetra(exp[i]))
      actualizarAtomicas(atomicas,exp[i].toLowerCase())
  }
  return atomicas
}
// Evalua una expresion con los valores de las atomicas modificadas a 'T' y 'F'
function evaluar(exp)
{
   let pilaOP = []
   for(let i = 0; i<exp.length;i++)
   {
     if (exp[i] == 'T' || exp[i] == 'F')
     {
       pilaOP.push(exp[i])
     }
     else
     {
       if( exp[i] == '¬' )
       {
         let operando = pilaOP.pop()
         pilaOP.push((operando == 'T') ? 'F':'T')
       }        
       else
       {
         let atom2 = pilaOP.pop()
         let atom1 = pilaOP.pop()
         if (exp[i] == '^')
          pilaOP.push((atom1=='T' && atom2 == 'T')? 'T':'F')
        else if (exp[i] == 'v')
          pilaOP.push((atom1=='T' || atom2=='T')?'T':'F')
        else if (exp[i] == '→')
          pilaOP.push((atom1=='T' && atom2=='F')?'F':'T')
        else if (exp[i] == '↔')
          pilaOP.push((atom1 == atom2) ? 'T':'F')
       }
     }
   }
   return pilaOP.pop()
}
// Crea una matriz con los valores de 'T' y 'F' del tamaño que será la tabla de verdad
function crear(numAtomicas)
{
  let cols = Math.pow(2,numAtomicas)
  let fils = []
  for (let i = 0; i<numAtomicas+1;i++)
  {
    fils[i] = new Array()
  }

  for(let i = 0; i<numAtomicas;i++)
  {
    for(let j = 0; j<Math.pow(2,i);j++)
    {
      for(let k = 0; k<2;k++)
      {
        for(let l = 0;l<Math.trunc(cols/Math.pow(2,(i+1)));l++)
        {
          fils[i].push((k==0) ? 'T':'F')
        }
      }
    }
  }
  return fils
}
// Cambia los valores de las atomicas por 'T' y 'F' segun cada caso y evalua la expresión
function cambiarAtomicas(exp,atomicas)
{
  let matriz = crear(atomicas.length)
  let aux
  for(let h = 0; h<matriz[0].length;h++)
  {
    aux = []
    for(let i =0; i<exp.length;i++)
    {
      let bandera = false
      for(let j = 0;j<atomicas.length;j++)
      {
        if( exp[i].toLowerCase() == atomicas[j].toLowerCase() )
        {
          aux.push(matriz[j][h])
          bandera = true
        }
      }
      if (bandera == false)
        aux.push(exp[i])
    }
    matriz[atomicas.length].push(evaluar(aux))
    
  }
  return matriz
}
// Valida si la entrada al formulario es correcta segun los lineamientos del proyecto
function validar(formul)
{
  let exp = formul.textfield.value

  if(veriCaracs(exp))
    {
      if(balance(exp))
      {
        posfix = posfija(exp)
        atomicas = atoms(posfix)
        return cambiarAtomicas(posfix,atomicas)
      }
      else
        alert("Verifica los parentesis")
    }
  else
    alert("Expresion no válida, consulte el manual de usuario")
}
// Borra la tabla por si hay alguna en pantalla
function delTabla()
{
  // Borra los encabezados
  $('#TABLA thead td').remove()
  // Borra el cuerpo de la tabla
  $('#TABLA tbody tr').remove()

  $('#A').remove()
}
// Denomina si es una contingencia, tautología o contradiccion
function denomina(salida,nElementos)
{
  bandera = salida[0]
  for(let j = 0; j<nElementos;j++)
  {
    if(bandera != salida[j])
    {
      return "CONTINGENCIA: La columna resultante contiene valores verdaderos y falsos";
    }
  }
  if(bandera == 'T')
    return "TAUTOLOGÍA: La columna resultante contiene únicamente valores verdaderos";
  else
    return "CONTRADICCIÓN: La columna resultante contiene únicamente valores falsos";

}
// Valida si la entrada es correcta y dibuja la tabla
function dibujaTabla(formul)
{
  delTabla()
  let tabla = validar(formul)
  let atomicas = atoms(formul.textfield.value)

  const $cabecerasTabla = document.querySelector("#cabecerasTabla")
  const $tr = document.createElement("tr")
  for(let i = 0;i<atomicas.length;i++)
  {
    let $tdNombre = document.createElement("td");
    $tdNombre.textContent = atomicas[i].toString().toUpperCase()
    $tr.appendChild($tdNombre)
  }
  let $tdNombre = document.createElement("td");
  $tdNombre.textContent = "Salida"
  $tr.appendChild($tdNombre)
  $cabecerasTabla.appendChild($tr);
  const $cuerpoTabla = document.querySelector("#cuerpoTabla")
  for(let i = 0; i<tabla[0].length;i++)
  {
    const $tr = document.createElement("tr")
    for(let j = 0; j<tabla.length;j++)
    {
      let $tdNombre = document.createElement("td");
      $tdNombre.textContent = tabla[j][i]
      $tr.appendChild($tdNombre)
    }
    $cuerpoTabla.appendChild($tr);
  }
  let str =denomina(tabla[atomicas.length],tabla[0].length)
  document.getElementById("Anuncio").insertAdjacentHTML('afterend',str+'</div>')
}
