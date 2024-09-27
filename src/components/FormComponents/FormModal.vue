<template>
  <div class="form-modal-overlay" @dblclick.self="closeModal" ref="formModalOverlay">


    <div class="form-modal" ref="formModal">
      <div class="form-content" ref="formContent">
        <FormStepOne v-if="currentStep === 1" ref="formStep1" :mynext="isNext" :myprev="isPrev"/>
        <FormStepTwo v-if="currentStep === 2" ref="formStep2" :mynext="isNext" :myprev="isPrev"/>
        <FormStepThree v-if="currentStep === 3" ref="formStep3" :mynext="isNext" :myprev="isPrev"/>
      </div>
      
      <div class="form-footer">
        <div class="button-holder">
          <Transition name="fade">
            <button v-if="currentStep > 1" @click="previousPage" class="form-button">Previous</button>
          </Transition>
        </div>


        <div class="progress-bar">
          <div class="progress-bar-default" :class="{ 'progress-bar-one': currentStep === 1, 'progress-bar-two': currentStep === 2, 'progress-bar-three': currentStep === 3 }">
          </div>
        </div>


        <div class="button-holder">
          <Transition name="fade" mode="out-in">
            <button @click="handleClick" :key="currentStep < 3 ? 'nextButton' : 'submitButton'" class="form-button">
              <p v-if="currentStep < 3" class="buttonText">Next</p>
              <p v-if="currentStep === 3 && !isSubmit" class="buttonText buttonTextSubmit">Submit</p>
              <div v-if="currentStep === 3 && isSubmit" class="submitLogo">
                <img src="../../assets/SVG/Submit.svg" alt="Submitted" class="submitLogoImg">
              </div>
            </button>
          </Transition>


      </div>


      </div>
    </div>


  </div>
</template>


<script>
import { gsap } from 'gsap'
import FormStepOne from './FormStepOne.vue'
import FormStepTwo from './FormStepTwo.vue'
import FormStepThree from './FormStepThree.vue'
import { useFormStore } from '../../stores/form';

export default {
  components: {
    FormStepOne,
    FormStepTwo,
    FormStepThree
  },
  data() {
    return {
      currentStep: 1,
      isSubmit: false,
      isNext: false,
      isPrev: false,
    }
  },
  mounted() {
    this.$refs.formModal.style.height = 'auto';
    this.animation = gsap.fromTo(this.$refs.formModalOverlay, {
      opacity: 0,
    }, {
      opacity: 1,
      duration: 0.5,
      ease: 'ease',
    });
  },
  beforeDestroy() {
    this.animation.kill();
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    async handleClick() {
      const currentFormStep = this.$refs[`formStep${this.currentStep}`];
      console.log('Validating form step:', this.currentStep);
      if (currentFormStep && typeof currentFormStep.validateForm === 'function') {
        if (currentFormStep.validateForm()) {
          console.log('Validation successful');
          if (this.currentStep < 3) {
            this.nextPage();
          } else {
            await this.handleSubmit();
          }
        } else {
          console.log('Validation failed');
        }
      }
    },
    nextPage() {
      this.isNext = true
      this.transitionToNextStep();
      this.currentStep += 1
    },
    previousPage() {
      this.isPrev = true
        this.currentStep -= 1,
        this.transitionToPreviousStep();
    },
    
    async handleSubmit() {
      this.submitAnimation();
      setTimeout(() => {
        this.closeModal();
      }, 3000);
      const formStore = useFormStore(); 
      const formData = {
        fullName: formStore.fullName,
        email: formStore.email,
        phone: formStore.phone,
        countryCode: formStore.countryCode,
        subject: formStore.subject,
        reason: formStore.reason,
        message: formStore.message,
        preferredContact: formStore.preferredContact,
        meetingDate: formStore.meetingDate,
        budget: formStore.budget,
        attachment: formStore.attachment,

      };

      try {
        // Send the form data to your API
        const response = await fetch('/api/form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          console.log("Form submitted successfully!");
          formStore.resetForm(); // Reset the form after successful submission
        } else {
          console.error("Form submission failed:", response.statusText);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
    submitAnimation() {
      const formContext = gsap.context(() => {
        this.animation = gsap.to('.buttonTextSubmit', {
          opacity: 0,
          ease: 'ease',
          onComplete: () => {
            this.isSubmit = true
            this.$nextTick(() => {
              gsap.to('.submitLogo', {
                duration: 1,
                opacity: 1,
                scale: 1.8,
                ease: 'back.out(4)',
                onComplete: () => {
                  gsap.to(this.$refs.formModalOverlay, {
                    opacity: 0,
                    delay: 0.5,
                    duration: 1,
                    ease: 'ease',
                  })
                }
              })
            });
          }
        })
    })
    },
    transitionToNextStep() {
      const currentHeight = this.$refs.formModal.offsetHeight;
      this.$refs.formModal.style.height = `${currentHeight}px`;
      gsap.to(this.$refs.formModal, {
        height: 'auto',
        duration: 0.5,
        ease: 'power2.inOut',
      });
    },
    transitionToPreviousStep() {
      const currentHeight = this.$refs.formModal.offsetHeight;
      this.$refs.formModal.style.height = `${currentHeight}px`;
      gsap.to(this.$refs.formModal, {
        height: 'auto',
        duration: 0.5,
        ease: 'power2.inOut',
      });
    },
  }
}
</script>


<style scoped>
.form-modal-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}


.form-modal {
  position: relative;
  background-color: rgb(49, 52, 102);
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
  max-height: 90vh;
  overflow: visible;
  box-shadow: 0 2px 25px rgba(81, 63, 165, 0.3);
  box-sizing: border-box;
  padding-bottom: 60px;
  z-index: 1000;
}


.form-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1e1f38;
  padding: 10px;
  z-index: -1;
}


.button-holder {
  width: 20%;
}



.progress-bar {
  height: 10px;
  border-radius: 20px;
  width: 180px;
  background: #797fe9;
}
.progress-bar-default {
  transition: all 0.5s ease-in-out;
  height: 10px;
  border-radius: 20px;
  width: 0;
  background: rgb(43, 176, 253);
  box-shadow: 0px 2px 15px rgba(43, 176, 253,0.8);
}
.progress-bar-one {
  width: 33%;
}
.progress-bar-two {
  width: 66%;
}
.progress-bar-three {
  width: 100%;
}
.buttonText {
  margin: 0;
}
.submitLogo {
  width: 40px;
  height: 16px;
  opacity: 0;
  scale: 0;
}
.submitLogoImg {
  width: 16px;
  height: 16px;
}
</style>