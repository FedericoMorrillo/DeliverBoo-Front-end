<script>
import axios from 'axios';

export default {
  name: 'CheckoutComponent',
  data() {
    return {
      dropinInstance: null,
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

      // Richiedi il metodo di pagamento
      this.dropinInstance.requestPaymentMethod().then(payload => {
        // Invia il nonce di pagamento e il totale al server
        axios.post('http://localhost:8000/api/checkout', {
          payment_method_nonce: payload.nonce,
          total: this.total
        }).then(response => {
          if (response.data.success) {
            alert('Pagamento effettuato con successo. ID Transazione: ' + response.data.transaction_id);
          } else {
            alert('Pagamento non riuscito: ' + response.data.message);
          }
        }).catch(error => {
          console.error('Errore durante il processo di pagamento:', error);
        });
      }).catch(error => {
        console.error('Errore durante la richiesta del metodo di pagamento:', error);
      });
    }
  }
}
</script>

<template>
  <div id="app">
    <h1>Paga con Braintree</h1>
    <div id="dropin-container"></div>
    <button id="submit-button" @click="pay">Paga</button>
  </div>
</template>
