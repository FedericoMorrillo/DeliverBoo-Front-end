<script>
import axios from 'axios';

export default {
  name: 'CheckoutComponent',
  data() {
    return {
      dropinInstance: null,
      isLoading: false,
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
      this.isLoading = true;
      // Richiedi il metodo di pagamento
      this.dropinInstance.requestPaymentMethod().then(payload => {
        // Invia il nonce di pagamento e il totale al server
        axios.post('http://localhost:8000/api/checkout', {
          payment_method_nonce: payload.nonce,
          total: this.total
        }).then(response => {
          if (response.data.success) {
            this.$emit('confirmOrder');
            // this.isLoading = false;
            // alert('Pagamento effettuato con successo. ID Transazione: ' + response.data.transaction_id);
          } else {
            alert('Pagamento non riuscito: ' + response.data.message);
          }
        }).catch(error => {
          console.error('Errore durante il processo di pagamento:', error);
        });
      }).catch(error => {
        console.error('Errore durante la richiesta del metodo di pagamento:', error);
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
    <!-- Loader durante il pagamento -->
    <div v-if="isLoading" class="loader-overlay">
      <img src="/img/logo.jpeg" alt="Loader" class="loader-img" :class="{ 'rotate-animation': isLoading }">
    </div>
  </div>
</template>

<style scoped>
/* Stili per il loader */
.loader-overlay {
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  /* Opacità per rendere lo sfondo semi-trasparente */
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader-img {
  width: 50px;
  /* Dimensioni dell'immagine del loader */
  height: 50px;
}

.rotate-animation {
  animation: rotate 2s infinite linear;
  /* Durata, ripetizione e tipo di animazione */
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
    /* Angolo di partenza */
  }

  to {
    transform: rotate(360deg);
    /* Angolo di arrivo (completa una rotazione) */
  }
}
</style>