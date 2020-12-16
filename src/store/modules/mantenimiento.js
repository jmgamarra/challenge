import axios from 'axios';
const resource_uri='http://localhost:3000/users';


const state = {
    personas: [],    
    alerta:{
      
    }
  };
  const getters = {
    //getPersonasState: (listado) => (state.datosPersonas = listado)
    getPersonasState: (state) => (state.personas )
  }
  
  const actions = {
    async setPersonasMutation({ commit }) {
      try {
        const response = await axios.get(resource_uri)       
        commit('setPersonasState', response.data);
      } catch (error) {
        console.log(error);
      }
  
    },
    async addPersona( { commit }, persona) {
      try {
        const new_id=state.personas.length+1;
        persona.id=new_id;
        console.log(persona);
        const response = await axios.post(resource_uri, persona);
        commit('newPersona', response.data);        
      } catch (error) {
        console.log(error);
      }
      
  },
  async editPersona( { commit }, persona) {
    try {
      const response = await axios.put(`${resource_uri}${persona.id}`, persona);
      commit('updPersona', persona);
    } catch (error) {
      console.log(error);
    }
      
  },
  async removePersona( { commit }, persona) {
    try {      
      await axios.delete(`${resource_uri}${'/'}${persona.id}`);
      commit('delPersona', persona);
    } catch (error) {
      console.log(error);
    }      
  },
  async mensajealerta({ commit },msg){    
    var obj = {
            showing: true,
            text: msg,
            type:'success'
          };          
          commit('setAlerta', obj);
        }
  };
  const mutations = {
    setPersonasState: (state, lista) => (state.personas = lista),
    newPersona: (state, persona) => state.personas.unshift(persona),
    updPersona: (state, updatedPerson) => {
        const index = state.personas.findIndex(t => t.id === updatedPerson.id);
        if(index !== -1) {
            state.personas.splice(index, 1, updatedPerson);
        }        
    },
    delPersona: (state, persona) => state.personas = state.personas.filter(t => persona.id !== t.id),
  };
  export default {
    state,
    getters,
    actions,
    mutations
  };