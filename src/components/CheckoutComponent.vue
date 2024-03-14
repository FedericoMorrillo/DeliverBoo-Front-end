<script>
import axios from 'axios';

export default {
  name: 'CheckoutComponent',
  data() {
    return {
      dropinInstance: null,
      loading: false, // Aggiungi una variabile di stato per il loader
    }
  },
  props: ['total',],
  mounted() {
    // Ottieni il client token dal server
    axios.get('http://localhost:8000/api/payment/token').then(response => {
      const clientToken = response.data.token;

      // Inizializza la Drop-in UI con il client token ricevuto
      braintree.dropin.create({
        authorization: clientToken,
        container: '#dropin-container'
      }).then(instance => {
        this.dropinInstance = instance;
      }).catch(error => {
        console.error('Errore durante l\'inizializzazione di Braintree:', error);
      });
    }).catch(error => {
      console.error('Errore durante il recupero del client token:', error);
    });
  },
  methods: {
    pay() {
      if (!this.dropinInstance) {
        alert('Il sistema di pagamento non è stato inizializzato correttamente.');
        return;
      }

      // Attiva il loader
      this.loading = true;

      // Richiedi il metodo di pagamento
      this.dropinInstance.requestPaymentMethod().then(payload => {
        // Invia il nonce di pagamento e il totale al server
        axios.post('http://localhost:8000/api/checkout', {
          payment_method_nonce: payload.nonce,
          total: this.total
        }).then(response => {
          if (response.data.success) {
            this.$emit('confirmOrder');
            alert('Pagamento effettuato con successo. ID Transazione: ' + response.data.transaction_id);
          } else {
            alert('Pagamento non riuscito: ' + response.data.message);
          }
        }).catch(error => {
          console.error('Errore durante il processo di pagamento:', error);
        }).finally(() => {
          // Disattiva il loader
          this.loading = false;
        });
      }).catch(error => {
        console.error('Errore durante la richiesta del metodo di pagamento:', error);
        // Disattiva il loader anche in caso di errore
        this.loading = false;
      });
    }
  }
}
</script>

<template>
  <div id="app" class="d-flex flex-column h-100">
    <h2>Dati di pagamento</h2>
    <div id="dropin-container"></div>
    <div class="text-end mt-auto">
      <button id="submit-button" class="btn btn-success fs-4" @click="pay">Conferma e paga</button>
    </div>
    <!-- Aggiungi il loader -->
    <div v-if="loading" class="loader-overlay">
      <div class="loader"></div>
    </div>
  </div>
</template>

<style scoped>
.loader-overlay {
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
