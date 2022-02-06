<template>
  <div>
    <b-container class="text-justify">
      <b-row align-h="center" class="mt-5">
        <b-col cols="12" lg="4">
          <b-form-group
            label="Ingrese su formula proposicional"
            label-class="h2 text-center"
          >
            <b-input type="text" v-model="input"></b-input>
          </b-form-group>
          <div class="text-center">
            <b-button
              :disabled="input === '' || input.includes(' ') ? true : false"
              variant="primary"
              class="mt-1"
              @click="dibujarTabla(input)"
              >Convertir</b-button
            >
          </div>
        </b-col>
      </b-row>
      <b-row align-h="center">
        <b-col cols="12" lg="4">
          <b-alert variant="danger" :show="show">{{ error }}</b-alert>
          <b-alert class="text-center my-3" variant="success" :show="showTabla">
            {{ eval }}
          </b-alert>
        </b-col>
      </b-row>
      <b-row align-h="center">
        <b-col v-if="showTabla" cols="12" lg="7" class="mt-5 mt-lg-0">
          <h5 style="color:yellow !important;" align="center">
            Tabla de Verdad:
          </h5>
          <b-table
            class="text-center"
            striped
            hover
            :items="items"
            :fields="fields"
          ></b-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  head() {
    return {

    };
  },
  data() {
    return {
      input: "",
      show: false,
      showTabla: false,
      error: "Error",
      items: [],
      fields: [],
      eval: ""
    };
  },
  methods: {
    dibujarTabla(formul) {
      let error;

      // Devuelve verdadero o falso si es una letra, a excepcion de 'v' que lo considerará como simbolo
      function esLetra(car) {
        let ascii = car.toLowerCase().charCodeAt(0);
        return ascii > 96 && ascii < 123 && ascii != 118;
      }

      // Devuelve verdadero o falso si el símbolo está dentro de los que se usaran
      function esSimbolo(car) {
        //ascii [94,118,170,26,29,40,41]
        // ^: conjuncion; v: disjuncion; ~: Negacion; →: condicional; ↔: Bicondicional
        let caracts = ["^", "v", "¬", "→", "↔", "(", ")"];
        for (let i = 0; i < caracts.length; i++) {
          if (car == caracts[i]) {
            return true;
          }
        }
        return false;
      }
      // Indica si la expresion tiene los caracteres que nos interesan
      function veriCaracs(cad) {
        for (let i = 0; i < cad.length; i++) {
          if (!esLetra(cad[i]) && !esSimbolo(cad[i])) {
            return false;
          }
        }
        return true;
      }
      // Indica el balance de los parentesis
      function balance(expr) {
        let pila = [];
        let balnceado = true;
        let indice = 0;
        while (indice < expr.length && balnceado) {
          let simbolo = expr[indice];
          if (simbolo == "(") {
            pila.push(simbolo);
          } else {
            if (simbolo == ")") {
              if (pila.length <= 0) balnceado = false;
              else pila.pop();
            }
          }
          indice = indice + 1;
        }
        if (balnceado && pila.length <= 0) return true;
        else return false;
      }
      // Transforma la expresion a posfija para evaluarla
      function posfija(exp) {
        let precedencia = { "¬": 4, "^": 3, v: 3, "→": 2, "↔": 1, "(": 0 };
        let pilaOp = [];
        let sufija = [];
        for (let i = 0; i < exp.length; i++) {
          if (esLetra(exp[i])) {
            sufija.push(exp[i]);
          } else {
            if (exp[i] == "(") {
              pilaOp.push(exp[i]);
            } else {
              if (exp[i] == ")") {
                let simTope = pilaOp.pop();
                while (simTope != "(") {
                  sufija.push(simTope);
                  simTope = pilaOp.pop();
                }
              } else {
                while (
                  pilaOp.length > 0 &&
                  precedencia[pilaOp[pilaOp.length - 1]] >= precedencia[exp[i]]
                ) {
                  sufija.push(pilaOp.pop());
                }
                pilaOp.push(exp[i]);
              }
            }
          }
        }
        while (pilaOp.length > 0) {
          sufija.push(pilaOp.pop());
        }
        return sufija.join("");
      }
      // Si no esta la atomica en la lista, la actualiza
      function actualizarAtomicas(atomicas, atom) {
        if (atomicas.indexOf(atom) == -1) atomicas.push(atom);
      }
      // Devuelve las atomicas de la expresion
      function atoms(exp) {
        let atomicas = [];
        for (let i = 0; i < exp.length; i++) {
          if (esLetra(exp[i]))
            actualizarAtomicas(atomicas, exp[i].toLowerCase());
        }
        return atomicas;
      }
      // Evalua una expresion con los valores de las atomicas modificadas a 'T' y 'F'
      function evaluar(exp) {
        let pilaOP = [];
        for (let i = 0; i < exp.length; i++) {
          if (exp[i] == "T" || exp[i] == "F") {
            pilaOP.push(exp[i]);
          } else {
            if (exp[i] == "¬") {
              let operando = pilaOP.pop();
              pilaOP.push(operando == "T" ? "F" : "T");
            } else {
              let atom2 = pilaOP.pop();
              let atom1 = pilaOP.pop();
              if (exp[i] == "^")
                pilaOP.push(atom1 == "T" && atom2 == "T" ? "T" : "F");
              else if (exp[i] == "v")
                pilaOP.push(atom1 == "T" || atom2 == "T" ? "T" : "F");
              else if (exp[i] == "→")
                pilaOP.push(atom1 == "T" && atom2 == "F" ? "F" : "T");
              else if (exp[i] == "↔") pilaOP.push(atom1 == atom2 ? "T" : "F");
            }
          }
        }
        return pilaOP.pop();
      }
      // Crea una matriz con los valores de 'T' y 'F' del tamaño que será la tabla de verdad
      function crear(numAtomicas) {
        let cols = Math.pow(2, numAtomicas);
        let fils = [];
        for (let i = 0; i < numAtomicas + 1; i++) {
          fils[i] = new Array();
        }

        for (let i = 0; i < numAtomicas; i++) {
          for (let j = 0; j < Math.pow(2, i); j++) {
            for (let k = 0; k < 2; k++) {
              for (let l = 0; l < Math.trunc(cols / Math.pow(2,(i + 1))); l++) {
                fils[i].push(k == 0 ? "T" : "F");
              }
            }
          }
        }
        return fils;
      }
      // Cambia los valores de las atomicas por 'T' y 'F' segun cada caso y evalua la expresión
      function cambiarAtomicas(exp, atomicas) {
        let matriz = crear(atomicas.length);
        let aux;
        for (let h = 0; h < matriz[0].length; h++) {
          aux = [];
          for (let i = 0; i < exp.length; i++) {
            let bandera = false;
            for (let j = 0; j < atomicas.length; j++) {
              if (exp[i].toLowerCase() == atomicas[j].toLowerCase()) {
                aux.push(matriz[j][h]);
                bandera = true;
              }
            }
            if (bandera == false) aux.push(exp[i]);
          }
          matriz[atomicas.length].push(evaluar(aux));
        }
        return matriz;
      }
      // Valida si la entrada al formulario es correcta segun los lineamientos del proyecto
      function validar(formul) {
        let exp = formul;

        if (veriCaracs(exp)) {
          if (balance(exp)) {
            let posfix = posfija(exp);
            atomicas = atoms(posfix);
            return cambiarAtomicas(posfix, atomicas);
          } else {
            error = "Verifica los parentesis";
          }
        } else {
          error = "Expresion no válida, consulte el manual de usuario";
        }
      }
      // Denomina si es una contingencia, tautología o contradiccion
      function denomina(salida, nElementos) {
        let bandera = salida[0];
        for (let j = 0; j < nElementos; j++) {
          if (bandera != salida[j]) {
            return "CONTINGENCIA: La columna resultante contiene valores verdaderos y falsos";
          }
        }
        if (bandera === "T") {
          return "TAUTOLOGÍA: La columna resultante contiene únicamente valores verdaderos";
        } else {
          return "CONTRADICCIÓN: La columna resultante contiene únicamente valores falsos";
        }
      }

      this.show = false;
      let tabla;
      let atomicas;
      let columna = [];
      let fila = [];

      try {
        tabla = validar(formul);
        atomicas = atoms(formul);

        for (let i = 0; i < tabla[0].length; i++) {
          tabla.forEach((element, j) => {
            columna.push(element[i]);
          });
          fila.push(columna);
          columna = [];
        }

        this.items = fila;
        this.fields = atomicas.map((e, i) => ({
          key: i.toString(),
          label: e
        }));
        this.fields.push({ key: atomicas.length.toString(), label: formul });

        this.items = fila.map(obj => {
          let rObj = {};
          fila[0].forEach((e, i) => {
            rObj[i] = obj[i];
          });
          return rObj;
        });

        console.log(this.eval);
        console.log(tabla[atomicas.length]);
        this.eval = denomina(tabla[atomicas.length], tabla[0].length);
        this.showTabla = true;
      } catch (err) {
        this.showTabla = false;
        this.show = true;
        this.error = error;
      }
    }
  },
  computed: {}
};
</script>

<style>
.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
table {
  min-width: 100%;
  margin: 20px;
  background-color: #208fcfc4;
  box-shadow: 0px 0px 10px;
  color: whitesmoke;
}
tr {
  height: 50px;
  border: 2px solid white;
  background-color: #ebff39dc;
}
tbody tr:nth-child(odd) {
  background-color: #edfa75d3;
  border: 2px solid white;
}
tr td,
tr th {
  border: 2px solid white;
}
</style>
