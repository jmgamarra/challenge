<template>
  <div class="row">
    <v-dialog v-model="dialogEdit" max-width="500px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="blue light" v-bind="attrs" v-on="on" @click="editItem()">
          <v-icon small> mdi-pencil </v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.firstname"
                  label="Nombres"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.lastname"
                  label="Apellidos"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.email"
                  label="Email"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
      <v-text-field
                  v-model="editedItem.birthDate"
                  label="Fec. Nacimiento"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeEditDialog">
            Cancelar
          </v-btn>
          <v-btn color="blue darken-1" text @click="updateItem">
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <template>
      <v-row justify="center">
        <v-dialog v-model="dialogDelete" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-on="on" v-bind="attrs" color="red light">
              <v-icon small> mdi-delete </v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="headline"
              >Estas seguro de eliminar la persona?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDeleteDialog"
                >Cancelar</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItem">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
    <template>
      <v-snackbar
        v-model="alerta.showing"
        :timeout="alerta.timeout"
        color="success"
      >
        {{ alerta.text }}
      </v-snackbar>
    </template>

  </div>
  
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["persona"],
  data() {
    return {
      formTitle: "Editar",
      dialogDelete: false,
      dialogEdit: false,
      
    
      editedItem: {
        firstname: "",
        lastname: "",
        birthDate: "",
        email: "",
        id: 0,
      },
      alerta: {
        showing: "",
        text: "",
        timeout: 0,
      },
    };
  },
  methods: {
    ...mapActions(["removePersona", "editPersona", "chargeAlerta"]),
    editItem() {
      this.dialogNew = false;
      this.editedItem = Object.assign({}, this.persona);
    },
    updateItem() {
      this.editPersona(this.editedItem);
      this.dialogNew = false;
      this.alerta = {
        showing: true,
        text: "Se actualizó la persona ",
      };
      this.chargeAlerta(this.alerta);
      this.closeEditDialog();
    },
    deleteItem() {
      this.dialogDelete = false;
      this.removePersona(this.persona);
      this.closeDeleteDialog();
    },
    closeDeleteDialog() {
      this.dialogDelete = false;
    },
    closeEditDialog() {
      this.dialogEdit = false;
    },
    addEvent() {
      this.start = new Date(this.start).toISOString().substring(0, 10);
      this.end = new Date(this.end).toISOString().substring(0, 10);

      this.events.push({
        name: this.name,
        details: this.details,
        start: this.start,
        end: this.end,
        color: this.color,
      });
    },
  },
};
</script>