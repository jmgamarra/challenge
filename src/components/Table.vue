<template>
  <v-app>
    
    
    <v-container flex-grow:0 class="green lighten-5" style="margin-top:60px">
      <v-simple-table>
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Mantenimiento Personas</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialogNew" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="green light" v-bind="attrs" v-on="on">
                  <v-icon small> mdi-pencil </v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                  <template>
                    <v-form v-model="valid">
                      <v-container>
                        <v-row>
                          <v-col cols="10" sm="6" md="4">
                            <v-text-field
                              v-model="newItem.firstname"
                              label="Nombres"
                              :rules="rulName"
                              :counter="50"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="newItem.lastname"
                              label="Apellidos"
                              :rules="rulApe"
                              :counter="50"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="newItem.email"
                              label="Email"
                              :rules="rulEmail"
                              :counter="50"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="5" sm="6" md="4">
                            <v-text-field
                              v-model="newItem.birthDate"
                              label="Fec. Nacimiento"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-form>
                  </template>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn  color="blue darken-1" text @click="closeNewDialog">
                    Cancelar
                  </v-btn>
                  <v-btn  :disabled="!valid" color="blue darken-1" text @click="addItem">
                    Agregar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Id</th>
              <th class="text-left">Nombres</th>
              <th class="text-left">Apellidos</th>
              <th class="text-left">Email</th>
              <th class="text-left">Fec. Nacimiento</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in getPersonasState" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.firstname }}</td>
              <td>{{ item.lastname }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.birthDate }}</td>
              <row v-bind:persona="item" />
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <!-- <alrt :txt="text" :tipo="type" :show="showing" /> -->
      <!-- v-bind:tipo="type" v-bind:show="showing" -->
      <v-flex>
        <v-snackbar
          :color="oAlerta.color"
          v-model="oAlerta.showing"
          :timeout="oAlerta.timeout"
          :type="oAlerta.tipo"
        >
          {{ oAlerta.text }}
        </v-snackbar>
      </v-flex>
    </v-container>
  </v-app>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
import row from "./TableRow";
export default {
  components: {
    row,
  },
  data() {
    return {
      formTitle: "Nuevo",
      valid: false,
      dialogNew: false,
      newItem: {
        firstname: "",
        lastname: "",
        birthDate: "",
        email: "",
        id: 0,
      },
      oAlerta: {
        color: "black",
        text: "",
        type: "",
        showing: false,
        timeout: 2000,
      },

      rulName: [
        (v) => !!v || "Nombre es requerido",
        (v) => v.length <= 50 || "Solo puede tener 50 caracteres ",
      ],
      rulApe: [
        (v) => !!v || "Apellido es requerido",
        (v) => v.length <= 50 || "Solo puede tener 50 caracteres ",
      ],
      rulEmail: [
        (v) => !!v || "Email es requerido",
        (v) => v.length <= 50 || "Solo puede tener 50 caracteres ",
      ],
    };
  },
  name: "Table",

  methods: {
    ...mapActions(["setPersonasMutation", "addPersona", "chargeAlerta"]),
    closeNewDialog() {
      this.dialogNew = false;
      this.iniciar();
      //this.$refs.form.reset();
    },
    addItem() {
      if (this.valid == false) {
        this.$refs.form.validate()
        //console.log(this.valid);        
        this.mensa(
          "Debe corregir los datos ingresados",
          "warm",
          "yellow ligth"
        );
        
        return;
      }
      this.dialogNew = false;
      this.addPersona(this.newItem);      
      this.mensa("Usuario agregado", "success","green light");
      this.iniciar();
      //this.$refs.form.reset();
    },
    mensa(msg, tipo, color) {
      this.oAlerta.text = msg;
      this.oAlerta.type = tipo;
      this.oAlerta.showing = true;
      this.oAlerta.color = color;
    },
  iniciar(){
   this.firstname= "";
        this.lastname= "";
        this.birthDate= "";
        this.email= "";
        this.id= 0;
  }
  },
  computed: mapGetters(["getPersonasState"]),
  created() {
    this.setPersonasMutation();
  },
};
</script>
